const {generateMatches} = require('../../db/certifications')

exports.seed = async knex =>{
  await knex('state_admin_certifications').insert(
    [{
      email: 'Wheatgreaser@email.com',
      name: 'Wheatgreaser Flynn',
      state: 'ak',
      fileUrl: '/auth/certifications/files/Wheatgreaser.pdf',
    },
    {
      email: 'Horsepicker@email.com',
      name: 'Horsepicker Mitchell',
      state: 'ak',
      fileUrl: '/auth/certifications/files/Horsepicker.pdf',
    },
    {
      email: 'Pickuptrigger@email.com',
      name: 'Pickuptrigger Hunnicutt',
      state: 'ak',
      fileUrl: '/auth/certifications/files/Pickuptrigger.pdf',
    },

    {
      email: 'Dirtbaler@email.com',
      name: 'Dirtbaler Wynne',
      state: 'ak',
      fileUrl: '/auth/certifications/files/Dirtbaler.pdf',
    },
  ])

  const payloads = [
    {
      email: 'Dirtbaler@email.com',
      name: 'FOO BAR',
      state: 'ak',
      matchField: 'email',
      matchValue: 'Dirtbaler@email.com'
    },
    {
      email: 'Pickuptrigger1234@email.com',
      name: 'Pickuptrigger Hunnicutt',
      state: 'ak',
      matchField: 'name',
      matchValue: 'Pickuptrigger Hunnicutt'
    },
    {
      email: 'Horsepicker@email.com',
      name: 'Horsepicker Mitchell',
      state: 'ak',
      matchField: 'email',
      matchValue: 'Horsepicker@email.com'
    },
    {
      email: 'Wheatgreaser@email.com',
      name: 'Wheatgreaser Flynn',
      state: 'ak',
      matchField: 'name',
      matchValue: 'Wheatgreaser Flynn'
    }

  ]
  await Promise.all(payloads.map( async payload =>{
    const cert = await knex('state_admin_certifications').select('id').where(payload.matchField, payload.matchValue).first()
    await generateMatches(payload.email, payload.name, payload.state, cert.id, {db:knex})
  }))
  const numMatches = await knex('state_admin_certification_match').count("id").first();

  // do it again bc this should be idempotent and won't make duplicates
  await Promise.all(payloads.map( async payload =>{
    const cert = await knex('state_admin_certifications').select('id').where(payload.matchField, payload.matchValue).first()
    await generateMatches(payload.email, payload.name, payload.state, cert.id, {db:knex})
  }))
  if (numMatches.count !== (await knex('state_admin_certification_match').count("id").first()).count){
    console.log('***************************************************')
    console.log('Something went wrong with match creation')
    console.log('***************************************************')
  }



}

