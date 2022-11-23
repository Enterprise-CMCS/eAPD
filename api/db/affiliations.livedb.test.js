const tap = require('tap');
const knex = require('./knex');

const {
  getAffiliationMatches,
  updateAuthAffiliation
} = require('./affiliations');

const setupDB = async (oktaUsers, authAffiliations) => {
  await knex('okta_users').insert(oktaUsers);
  await knex('auth_affiliations').insert(authAffiliations);
};

tap.test(
  'database wrappers / affiliations with live db',
  async affiliations => {
    affiliations.test(
      'only returns pending state admins and approved state staff',
      async test => {
        const stateStaffRoleId = await knex('auth_roles')
          .where({ name: 'eAPD State Staff' })
          .first()
          .then(role => role.id);

        const stateAdminRoleId = await knex('auth_roles')
          .where({ name: 'eAPD State Admin' })
          .first()
          .then(role => role.id);

        const OKTA_USERS = {
          stateAdminApproved: {
            user_id: 'stateadmin1',
            email: 'stateAdminApproved@email.com',
            displayName: 'should not be returned',
            login: 'test1'
          },
          stateAdminPending: {
            user_id: 'stateadmin2',
            email: 'stateAdminPending@email.com',
            displayName: 'should be returned',
            login: 'test2'
          },
          stateStaffRevoked: {
            user_id: 'statestaff1',
            email: 'stateStaffRevoked@email.com',
            displayName: 'shoould not be returned',
            login: 'test3'
          },
          stateStaffApproved: {
            user_id: 'statestaff2',
            email: 'stateStaffApproved@email.com',
            displayName: 'should be returned',
            login: 'test4'
          }
        };

        const AUTH_AFFILIATIONS = {
          stateAdminApproved: {
            user_id: 'stateadmin1',
            state_id: 'ak',
            role_id: stateAdminRoleId,
            status: 'approved',
            username: 'test1'
          },
          stateAdminPending: {
            user_id: 'stateadmin2',
            state_id: 'ak',
            role_id: stateAdminRoleId,
            status: 'requested',
            username: 'test2'
          },
          stateStaffRevoked: {
            user_id: 'statestaff1',
            state_id: 'ak',
            role_id: stateStaffRoleId,
            status: 'revoked',
            username: 'test3'
          },
          stateStaffApproved: {
            user_id: 'statestaff2',
            state_id: 'ak',
            role_id: stateStaffRoleId,
            status: 'approved',
            username: 'test4'
          }
        };

        await knex('auth_affiliations').delete();
        await knex('okta_users').delete();

        const oktaUsers = [
          OKTA_USERS.stateAdminApproved,
          OKTA_USERS.stateAdminPending,
          OKTA_USERS.stateStaffRevoked,
          OKTA_USERS.stateStaffApproved
        ];
        const authAffiliations = [
          AUTH_AFFILIATIONS.stateAdminApproved,
          AUTH_AFFILIATIONS.stateAdminPending,
          AUTH_AFFILIATIONS.stateStaffRevoked,
          AUTH_AFFILIATIONS.stateStaffApproved
        ];

        await setupDB(oktaUsers, authAffiliations);

        const results = await getAffiliationMatches({ stateId: 'ak' });

        test.same(results.length, 2);
        test.notHas(AUTH_AFFILIATIONS.stateAdminApproved);
        test.notHas(AUTH_AFFILIATIONS.stateStaffRevoked);
      }
    );
    affiliations.test(
      'throws an error if a user attempts to assign an elevated role',
      async test => {
        const stateStaffRoleId = await knex('auth_roles')
          .where({ name: 'eAPD State Staff' })
          .first()
          .then(role => role.id);

        const stateAdminRoleId = await knex('auth_roles')
          .where({ name: 'eAPD State Admin' })
          .first()
          .then(role => role.id);

        const systemAdminRoleId = await knex('auth_roles')
          .where({ name: 'eAPD System Admin' })
          .first()
          .then(role => role.id);

        const OKTA_USERS = {
          stateAdmin: {
            user_id: 'stateadmin1',
            email: 'stateAdmin@email.com',
            login: 'test1'
          },
          stateStaff: {
            user_id: 'statestaff1',
            email: 'stateStaff@email.com',
            displayName: 'should not be returned',
            login: 'test3'
          }
        };

        const AUTH_AFFILIATIONS = {
          stateAdmin: {
            user_id: 'stateadmin1',
            state_id: 'ak',
            role_id: stateAdminRoleId,
            status: 'approved',
            username: 'test1'
          },
          stateStaff: {
            user_id: 'statestaff1',
            state_id: 'ak',
            role_id: stateStaffRoleId,
            status: 'revoked',
            username: 'test3'
          }
        };

        const oktaUsers = [OKTA_USERS.stateAdmin, OKTA_USERS.stateStaff];
        const authAffiliations = [
          AUTH_AFFILIATIONS.stateAdmin,
          AUTH_AFFILIATIONS.stateStaff
        ];

        await knex('auth_affiliations').delete();
        await knex('okta_users').delete();

        await setupDB(oktaUsers, authAffiliations);

        const { id: affiliationId } = await knex('auth_affiliations')
          .where({ user_id: 'statestaff1' })
          .first();

        const results = await updateAuthAffiliation({
          affiliationId: affiliationId,
          newRoleId: systemAdminRoleId,
          newStatus: 'approved',
          changedBy: 'stateadmin1',
          changedByRole: 'eAPD State Admin',
          stateId: 'ak'
          // ffy: blah
        });

        console.log('yep1234511', results);
      }
    );

    affiliations.teardown(async () => {
      await knex.destroy();
      return null;
    });
  }
);
