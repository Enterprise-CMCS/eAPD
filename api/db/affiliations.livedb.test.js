import tap from 'tap';
import knex from './knex.js';
import {
  getAffiliationMatches,
  updateAuthAffiliation
} from './affiliations.js';
import { thisFFY } from '@cms-eapd/common';

const setupDB = async (oktaUsers, authAffiliations) => {
  await knex('okta_users').insert(oktaUsers);
  await knex('auth_affiliations').insert(authAffiliations);
};

const setupDBCertifications = async certifications => {
  await knex('state_admin_certifications').insert(certifications);
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
            state_id: 'na',
            role_id: stateAdminRoleId,
            status: 'approved',
            username: 'test1'
          },
          stateAdminPending: {
            user_id: 'stateadmin2',
            state_id: 'na',
            role_id: stateAdminRoleId,
            status: 'requested',
            username: 'test2'
          },
          stateStaffRevoked: {
            user_id: 'statestaff1',
            state_id: 'na',
            role_id: stateStaffRoleId,
            status: 'revoked',
            username: 'test3'
          },
          stateStaffApproved: {
            user_id: 'statestaff2',
            state_id: 'na',
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

        const results = await getAffiliationMatches({ stateId: 'na' });

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
            state_id: 'na',
            role_id: stateAdminRoleId,
            status: 'approved',
            username: 'test1'
          },
          stateStaff: {
            user_id: 'statestaff1',
            state_id: 'na',
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

        let results;
        try {
          results = await updateAuthAffiliation({
            affiliationId,
            newRoleId: systemAdminRoleId,
            newStatus: 'approved',
            changedBy: 'stateadmin1',
            changedByRole: 'eAPD State Admin',
            stateId: 'na',
            ffy: thisFFY
          });
        } catch (e) {
          results = e.message;
        }

        test.same(results, 'User is attempting to assign an invalid role');
      }
    );

    affiliations.test(
      'throws an error if a user assigns a state admin role without a matching certification',
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
          stateAdmin: {
            user_id: 'stateadmin1',
            email: 'stateAdmin@email.com',
            login: 'test1'
          },
          fedAdmin: {
            user_id: 'fedadmin1',
            email: 'fedAdmin@email.com',
            login: 'test2'
          }
        };

        const AUTH_AFFILIATIONS = {
          stateAdmin: {
            user_id: 'stateadmin1',
            state_id: 'na',
            role_id: stateStaffRoleId,
            status: 'approved',
            username: 'test1'
          }
        };

        const oktaUsers = [OKTA_USERS.stateAdmin, OKTA_USERS.stateStaff];
        const authAffiliations = [
          AUTH_AFFILIATIONS.stateAdmin,
          AUTH_AFFILIATIONS.stateStaff
        ];

        await knex('auth_affiliations').delete();
        await knex('okta_users').delete();
        await knex('state_admin_certifications').delete();

        await setupDB(oktaUsers, authAffiliations);

        const { id: affiliationId } = await knex('auth_affiliations')
          .where({ user_id: 'stateadmin1' })
          .first();

        let results;
        try {
          results = await updateAuthAffiliation({
            affiliationId,
            newRoleId: stateAdminRoleId,
            newStatus: 'approved',
            changedBy: 'fedadmin1',
            changedByRole: 'eAPD Federal Admin',
            stateId: 'na',
            ffy: thisFFY
          });
        } catch (e) {
          results = e.message;
        }

        test.same(
          results,
          'Unable to update affiliation: missing certification'
        );
      }
    );

    affiliations.test(
      'throws an error if a user assigns a state admin role without an active and valid certification',
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
          stateAdmin: {
            user_id: 'stateadmin1',
            email: 'stateAdmin@email.com',
            login: 'test1'
          },
          fedAdmin: {
            user_id: 'fedadmin1',
            email: 'fedAdmin@email.com',
            login: 'test2'
          }
        };

        const AUTH_AFFILIATIONS = {
          stateAdmin: {
            user_id: 'stateadmin1',
            state_id: 'na',
            role_id: stateStaffRoleId,
            status: 'approved',
            username: 'test1'
          }
        };

        const oktaUsers = [OKTA_USERS.stateAdmin, OKTA_USERS.stateStaff];
        const authAffiliations = [
          AUTH_AFFILIATIONS.stateAdmin,
          AUTH_AFFILIATIONS.stateStaff
        ];

        const stateAdminCertifications = [
          {
            state: 'na',
            ffy: '2020',
            name: 'stateadmin1',
            email: 'stateAdmin@email.com',
            fileUrl: 'abc123',
            uploadedBy: 'fedadmin1',
            uploadedOn: new Date()
          }
        ];

        await knex('auth_affiliations').delete();
        await knex('okta_users').delete();
        await knex('state_admin_certifications').delete();

        await setupDB(oktaUsers, authAffiliations);
        await setupDBCertifications(stateAdminCertifications);

        const { id: affiliationId } = await knex('auth_affiliations')
          .where({ user_id: 'stateadmin1' })
          .first();

        let results;
        try {
          results = await updateAuthAffiliation({
            affiliationId,
            newRoleId: stateAdminRoleId,
            newStatus: 'approved',
            changedBy: 'fedadmin1',
            changedByRole: 'eAPD Federal Admin',
            stateId: 'na',
            ffy: thisFFY
          });
        } catch (e) {
          results = e.message;
        }

        test.same(
          results,
          'Unable to update affiliation: no current certifications'
        );
      }
    );

    affiliations.teardown(async () => {
      await knex.destroy();
      return null;
    });
  }
);
