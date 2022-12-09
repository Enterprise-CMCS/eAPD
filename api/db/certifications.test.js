const tap = require('tap');
const knex = require('./knex');
const {
  getStateAdminCertifications,
  archiveStateAdminCertification
} = require('./certifications');

const setupDB = async (certifications, oktaUsers, authAffiliations) => {
  await knex('okta_users').insert(oktaUsers);
  await knex('auth_affiliations').insert(authAffiliations);
  await knex('state_admin_certifications').insert(certifications);
};

const OKTA_USERS = {
  emailMatch: {
    user_id: 'emailMatch',
    email: 'matchme@email.com',
    displayName: 'Not a match',
    login: 'emailmatchusername'
  },
  nameMatch: {
    user_id: 'nameMatch',
    email: 'idontmatch@email.com',
    displayName: 'Match Flynn',
    login: 'namematchusername'
  }
};

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
};

// This query is not that complicated, except for the part where it guesses how many matches
// might exist for a given state admin certifications. As a result that is what the tests focus on.
tap.test(
  'certifications query tests',
  { timeout: 300000 },
  async sacQueryTest => {
    let stateStaffRoleId;
    let fedAdminRoleId;
    let stateAdminRoleId;

    sacQueryTest.before(async () => {
      stateStaffRoleId = await knex('auth_roles')
        .where({ name: 'eAPD State Staff' })
        .first()
        .then(role => role.id);

      fedAdminRoleId = await knex('auth_roles')
        .where({ name: 'eAPD Federal Admin' })
        .first()
        .then(role => role.id);

      stateAdminRoleId = await knex('auth_roles')
        .where({ name: 'eAPD State Admin' })
        .first()
        .then(role => role.id);
    });

    sacQueryTest.beforeEach(async () => {
      await knex('state_admin_certifications_audit').delete();
      await knex('state_admin_certifications').delete();
      await knex('auth_affiliations').delete();
      await knex('okta_users').delete();
    });

    sacQueryTest.test('query returns all expected fields', async t => {
      // insert a state admin certification
      const certifications = {
        email: 'matchme@email.com',
        name: 'Cant match me Flynn',
        state: 'ak',
        fileUrl: '/auth/certifications/files/whatever.pdf',
        uploadedBy: 'unitTest',
        uploadedOn: new Date(),
        ffy: 2022,
        status: 'active'
      };

      const expectedFields = [
        'id',
        'name',
        'email',
        'state',
        'affiliationId',
        'fileUrl',
        'ffy',
        'potentialMatches'
      ];
      const oktaUsers = OKTA_USERS.emailMatch;

      const authAffiliations = {
        role_id: stateStaffRoleId,
        ...AUTH_AFFILIATIONS.emailMatch
      };

      await setupDB(certifications, oktaUsers, authAffiliations);

      const results = await getStateAdminCertifications();
      t.same(results.length, 1);
      // every expected field needs to be there
      t.ok(
        expectedFields.every(field => {
          return Object.keys(results[0]).includes(field);
        })
      );
      // if every expected field is there, this will fail if there are extra fields
      t.ok(Object.keys(results[0]).length === expectedFields.length);
    });

    sacQueryTest.test('potentialMatches based on an email', async t => {
      // insert a state admin certification
      const certifications = {
        email: 'matchme@email.com',
        name: 'Cant match me Flynn',
        state: 'ak',
        fileUrl: '/auth/certifications/files/whatever.pdf',
        uploadedBy: 'unitTest',
        uploadedOn: new Date(),
        ffy: 2022,
        status: 'active'
      };
      const oktaUsers = OKTA_USERS.emailMatch;

      const authAffiliations = {
        role_id: stateStaffRoleId,
        ...AUTH_AFFILIATIONS.emailMatch
      };

      await setupDB(certifications, oktaUsers, authAffiliations);

      const results = await getStateAdminCertifications();
      t.same(results.length, 1);
      t.same(results[0].potentialMatches, 1);
    });

    sacQueryTest.test('potentialMatches based on a name', async t => {
      // insert a state admin certification
      const certifications = {
        email: 'cantmatchme@email.com',
        name: 'Match Flynn',
        state: 'ak',
        fileUrl: '/auth/certifications/files/whatever.pdf',
        uploadedBy: 'unitTest',
        uploadedOn: new Date(),
        ffy: 2022,
        status: 'active'
      };

      const oktaUsers = OKTA_USERS.nameMatch;

      const authAffiliations = {
        role_id: stateStaffRoleId,
        ...AUTH_AFFILIATIONS.nameMatch
      };

      await setupDB(certifications, oktaUsers, authAffiliations);

      const results = await getStateAdminCertifications();
      t.same(results.length, 1);
      t.same(results[0].potentialMatches, 1);
    });

    sacQueryTest.test('fails to find any potentialMatches', async t => {
      // insert a state admin certification
      const certifications = {
        email: 'nomatches@email.com',
        name: 'No Match Flynn',
        state: 'ak',
        fileUrl: '/auth/certifications/files/whatever.pdf',
        uploadedBy: 'unitTest',
        uploadedOn: new Date(),
        ffy: 2022,
        status: 'active'
      };

      const oktaUsers = OKTA_USERS.nameMatch;

      const authAffiliations = {
        role_id: stateStaffRoleId,
        ...AUTH_AFFILIATIONS.nameMatch
      };

      await setupDB(certifications, oktaUsers, authAffiliations);

      const results = await getStateAdminCertifications();
      t.same(results.length, 1);
      t.same(results[0].potentialMatches, 0);
    });

    sacQueryTest.test(
      'potentialMatches based on an email and a name',
      async t => {
        // insert a state admin certification
        const certifications = {
          email: 'matchme@email.com',
          name: 'Match Flynn',
          state: 'ak',
          fileUrl: '/auth/certifications/files/whatever.pdf',
          uploadedBy: 'unitTest',
          uploadedOn: new Date(),
          ffy: 2022,
          status: 'active'
        };
        const oktaUsers = [OKTA_USERS.nameMatch, OKTA_USERS.emailMatch];

        const authAffiliations = [
          { role_id: stateStaffRoleId, ...AUTH_AFFILIATIONS.emailMatch },
          { role_id: stateStaffRoleId, ...AUTH_AFFILIATIONS.nameMatch }
        ];

        await setupDB(certifications, oktaUsers, authAffiliations);

        const results = await getStateAdminCertifications();
        t.same(results.length, 1);
        t.same(results[0].potentialMatches, 2);
      }
    );

    sacQueryTest.test(
      'does not find a federal admin as a potentialMatch',
      async t => {
        // insert a state admin certification
        const certifications = {
          email: 'matchme@email.com',
          name: 'Cant match me Flynn',
          state: 'ak',
          fileUrl: '/auth/certifications/files/whatever.pdf',
          uploadedBy: 'unitTest',
          uploadedOn: new Date(),
          ffy: 2022,
          status: 'active'
        };
        const oktaUsers = OKTA_USERS.emailMatch;

        const authAffiliations = {
          role_id: fedAdminRoleId,
          ...AUTH_AFFILIATIONS.emailMatch
        };

        await setupDB(certifications, oktaUsers, authAffiliations);

        const results = await getStateAdminCertifications();
        t.same(results.length, 1);
        t.same(results[0].potentialMatches, 0);
      }
    );

    sacQueryTest.test(
      'finds existing approved state admins as a potentialMatch',
      async t => {
        // insert a state admin certification
        const certifications = {
          email: 'matchme@email.com',
          name: 'Cant match me Flynn',
          state: 'ak',
          fileUrl: '/auth/certifications/files/whatever.pdf',
          uploadedBy: 'unitTest',
          uploadedOn: new Date(),
          ffy: 2022,
          status: 'active'
        };
        const oktaUsers = OKTA_USERS.emailMatch;

        const authAffiliations = {
          role_id: stateAdminRoleId,
          ...AUTH_AFFILIATIONS.emailMatch
        };

        await setupDB(certifications, oktaUsers, authAffiliations);

        const results = await getStateAdminCertifications();
        t.same(results.length, 1);
        t.same(results[0].potentialMatches, 1);
      }
    );

    sacQueryTest.test(
      'returns an error when attempting to archive a matched certification',
      async t => {
        const certifications = {
          id: '1001',
          email: 'matchme@email.com',
          name: 'Cant match me Flynn',
          state: 'ak',
          fileUrl: '/auth/certifications/files/whatever.pdf',
          uploadedBy: 'unitTest',
          uploadedOn: new Date(),
          ffy: 2022,
          affiliationId: '1234',
          status: 'active'
        };

        const authAffiliations = [
          {
            id: '1234',
            role_id: stateStaffRoleId,
            ...AUTH_AFFILIATIONS.emailMatch
          }
        ];

        const oktaUsers = OKTA_USERS.emailMatch;

        await setupDB(certifications, oktaUsers, authAffiliations);

        const results = await archiveStateAdminCertification({
          id: '1001',
          archived_by: 'emailMatch'
        });

        t.same(results.error, 'certification is already matched');
      }
    );

    sacQueryTest.test(
      'returns an error when attempting to archive an already archived certification',
      async t => {
        const certifications = {
          id: '1001',
          email: 'matchme@email.com',
          name: 'Cant match me Flynn',
          state: 'ak',
          fileUrl: '/auth/certifications/files/whatever.pdf',
          uploadedBy: 'unitTest',
          uploadedOn: new Date(),
          ffy: 2022,
          affiliationId: null,
          status: 'archived'
        };

        const authAffiliations = [
          {
            id: '1234',
            role_id: stateStaffRoleId,
            ...AUTH_AFFILIATIONS.emailMatch
          }
        ];

        const oktaUsers = OKTA_USERS.emailMatch;

        await setupDB(certifications, oktaUsers, authAffiliations);

        const results = await archiveStateAdminCertification({
          id: '1001',
          archived_by: 'emailMatch'
        });

        t.same(results.error, 'certification is already archived');
      }
    );

    sacQueryTest.test(
      'updates a certification to archived with valid data',
      async t => {
        const certifications = {
          id: '1001',
          email: 'matchme@email.com',
          name: 'Cant match me Flynn',
          state: 'ak',
          fileUrl: '/auth/certifications/files/whatever.pdf',
          uploadedBy: 'unitTest',
          uploadedOn: new Date(),
          ffy: 2022,
          affiliationId: null,
          status: 'active'
        };

        const authAffiliations = [
          {
            id: '1234',
            role_id: stateStaffRoleId,
            ...AUTH_AFFILIATIONS.emailMatch
          }
        ];

        const oktaUsers = OKTA_USERS.emailMatch;

        await setupDB(certifications, oktaUsers, authAffiliations);

        await archiveStateAdminCertification({
          id: '1001',
          archived_by: 'emailMatch'
        });

        const results = await knex('state_admin_certifications')
          .select('status')
          .where('id', certifications.id)
          .first()
          .then(row => row);

        t.same(results.status, 'archived');
      }
    );

    sacQueryTest.teardown(async () => {
      await knex.destroy();
      return null;
    });
  }
);
