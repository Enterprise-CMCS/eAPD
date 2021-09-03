const tap = require('tap');
const knex = require('./knex')
const {generateMatches} = require('./certifications')

const setupDB = async (certifications, oktaUsers, authAffiliations) =>{
  await knex('state_admin_certifications').insert(certifications)
  await knex('okta_users').insert(oktaUsers)
  await knex('auth_affiliations').insert(authAffiliations)
}

const OKTA_USERS = {
  emailMatch: {
    user_id: 'emailMatch',
    email: 'matchme@email.com',
    displayName:'Not a match',
    secondEmail: '',
    primaryPhone: '',
    mobilePhone: '',
    login: 'emailmatchusername'
  },
  nameMatch: {
    user_id: 'nameMatch',
    email: 'idontmatch@email.com',
    displayName:'Match Flynn',
    secondEmail: '',
    primaryPhone: '',
    mobilePhone: '',
    login: 'namematchusername'
  },

}

const AUTH_AFFILIATIONS = {
  emailMatch: {
    user_id: 'emailMatch',
    state_id: 'ak',
    status: 'approved',
    username: 'emailmatchusername'
  },
  nameMatch: {
    user_id: 'nameMatch',
    state_id: 'ak',
    status: 'approved',
    username: 'namematchusername'
  }

}

tap.test('state_admin_certification_match generation tests', async sacMatchGenerationTest => {
  let stateStaffRoleId
  let fedAdminRoleId

  sacMatchGenerationTest.before (async () =>{
    stateStaffRoleId = await knex('auth_roles')
      .where({ name: 'eAPD State Staff' })
      .first()
      .then(role => role.id);

    fedAdminRoleId = await knex('auth_roles')
      .where({ name: 'eAPD Federal Admin' })
      .first()
      .then(role => role.id);
  })

  sacMatchGenerationTest.beforeEach(async () =>{
    await knex('state_admin_certification_match').delete()
    await knex('state_admin_certifications').delete()
    await knex('auth_affiliations').delete()
    await knex('okta_users').delete()
  })

  sacMatchGenerationTest.test('matches based on an email', async t =>{
    // insert a state admin certification
    const certifications = {
      email: 'matchme@email.com',
      name: 'Cant match me Flynn',
      state: 'ak',
      fileUrl: '/auth/certifications/files/whatever.pdf',
    }
    const oktaUsers = OKTA_USERS.emailMatch

    const authAffiliations = { role_id: stateStaffRoleId, ...AUTH_AFFILIATIONS.emailMatch}

    await setupDB(certifications, oktaUsers, authAffiliations)

    const certificationId = await knex('state_admin_certifications')
      .where(certifications)
      .first()
      .then(certification => certification.id);

    await generateMatches(certifications.email, certifications.name, certifications.state, certificationId, {db:knex} )

    const matches = await knex('state_admin_certification_match').where('state_admin_certification_id', certificationId)

    t.same(matches.length, 1)
    t.same(matches[0].user_id, oktaUsers.user_id)
    t.same(matches[0].status, 'pending')
  })

  sacMatchGenerationTest.test('matches based on a name', async t =>{
    // insert a state admin certification
    const certifications = {
      email: 'cantmatchme@email.com',
      name: 'Match Flynn',
      state: 'ak',
      fileUrl: '/auth/certifications/files/whatever.pdf',
    }

    const oktaUsers = OKTA_USERS.nameMatch

    const authAffiliations = { role_id: stateStaffRoleId, ...AUTH_AFFILIATIONS.nameMatch}

    await setupDB(certifications, oktaUsers, authAffiliations)

    const certificationId = await knex('state_admin_certifications')
      .where(certifications)
      .first()
      .then(certification => certification.id);

    await generateMatches(certifications.email, certifications.name, certifications.state, certificationId, {db:knex} )

    const matches = await knex('state_admin_certification_match').where('state_admin_certification_id', certificationId)

    t.same(matches.length, 1)
    t.same(matches[0].user_id, oktaUsers.user_id)
    t.same(matches[0].status, 'pending')
  })

  sacMatchGenerationTest.test('fails to find any matches', async t =>{
    // insert a state admin certification
    const certifications = {
      email: 'nomatches@email.com',
      name: 'No Match Flynn',
      state: 'ak',
      fileUrl: '/auth/certifications/files/whatever.pdf',
    }

    const oktaUsers = OKTA_USERS.nameMatch

    const authAffiliations = { role_id: stateStaffRoleId, ...AUTH_AFFILIATIONS.nameMatch}

    await setupDB(certifications, oktaUsers, authAffiliations)

    const certificationId = await knex('state_admin_certifications')
      .where(certifications)
      .first()
      .then(certification => certification.id);

    await generateMatches(certifications.email, certifications.name, certifications.state, certificationId, {db:knex} )

    const matches = await knex('state_admin_certification_match').where('state_admin_certification_id', certificationId)

    t.same(matches.length, 0)
  })

  sacMatchGenerationTest.test('matches based on an email and a name', async t =>{
    // insert a state admin certification
    const certifications = {
      email: 'matchme@email.com',
      name: 'Match Flynn',
      state: 'ak',
      fileUrl: '/auth/certifications/files/whatever.pdf',
    }
    const oktaUsers = [OKTA_USERS.nameMatch, OKTA_USERS.emailMatch]


    const authAffiliations = [
      {role_id: stateStaffRoleId, ...AUTH_AFFILIATIONS.emailMatch},
      {role_id: stateStaffRoleId, ...AUTH_AFFILIATIONS.nameMatch},
    ]

    await setupDB(certifications, oktaUsers, authAffiliations)

    const certificationId = await knex('state_admin_certifications')
      .where(certifications)
      .first()
      .then(certification => certification.id);

    await generateMatches(certifications.email, certifications.name, certifications.state, certificationId, {db:knex} )

    const matches = await knex('state_admin_certification_match').where('state_admin_certification_id', certificationId)

    t.same(matches.length, 2)
  })

  sacMatchGenerationTest.test('does not generate new matches when run a second time', async t =>{
    // insert a state admin certification
    const certifications = {
      email: 'matchme@email.com',
      name: 'Cant match me Flynn',
      state: 'ak',
      fileUrl: '/auth/certifications/files/whatever.pdf',
    }
    const oktaUsers = OKTA_USERS.emailMatch

    const authAffiliations = { role_id: stateStaffRoleId, ...AUTH_AFFILIATIONS.emailMatch}

    await setupDB(certifications, oktaUsers, authAffiliations)

    const certificationId = await knex('state_admin_certifications')
      .where(certifications)
      .first()
      .then(certification => certification.id);

    await generateMatches(certifications.email, certifications.name, certifications.state, certificationId, {db:knex} )

    await generateMatches(certifications.email, certifications.name, certifications.state, certificationId, {db:knex} )

    const matches = await knex('state_admin_certification_match').where('state_admin_certification_id', certificationId)

    t.same(matches.length, 1)
    t.same(matches[0].user_id, oktaUsers.user_id)
    t.same(matches[0].status, 'pending')
  })

  sacMatchGenerationTest.test('does not match federal admins', async t =>{
    // insert a state admin certification
    const certifications = {
      email: 'matchme@email.com',
      name: 'Cant match me Flynn',
      state: 'ak',
      fileUrl: '/auth/certifications/files/whatever.pdf',
    }
    const oktaUsers = OKTA_USERS.emailMatch

    const authAffiliations = { role_id: fedAdminRoleId, ...AUTH_AFFILIATIONS.emailMatch}

    await setupDB(certifications, oktaUsers, authAffiliations)

    const certificationId = await knex('state_admin_certifications')
      .where(certifications)
      .first()
      .then(certification => certification.id);

    await generateMatches(certifications.email, certifications.name, certifications.state, certificationId, {db:knex} )

    const matches = await knex('state_admin_certification_match').where('state_admin_certification_id', certificationId)

    t.same(matches.length, 0)
  })

  sacMatchGenerationTest.teardown(() =>{
    knex.destroy()
    return null
  })
})



