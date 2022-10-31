const { getAllActiveRoles } = require('../../db/roles');
const { states } = require('../../util/states');

exports.seed = async knex => {
  const [{ id: noPermissionsId }] = await getAllActiveRoles(
    ['eAPD No Permissions'],
    { db: knex }
  );
  const [{ id: adminRoleId }] = await getAllActiveRoles(['eAPD Tester'], {
    db: knex
  });
  const [{ id: fedAdminRoleId }] = await getAllActiveRoles(
    ['eAPD Federal Admin'],
    { db: knex }
  );
  const [{ id: stateAdminRoleId }] = await getAllActiveRoles(
    ['eAPD State Admin'],
    { db: knex }
  );
  const [{ id: stateStaffRoleId }] = await getAllActiveRoles(
    ['eAPD State Staff'],
    { db: knex }
  );

  const adminAffiliations = states.map(state => ({
    user_id: 'all-permissions',
    state_id: state.id,
    role_id: adminRoleId,
    status: 'approved',
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
  }));

  await knex('auth_affiliations').insert(adminAffiliations);
  await knex('auth_affiliations').insert([
    {
      id: 4000,
      user_id: 2010,
      state_id: 'ak',
      status: 'requested'
    },
    {
      id: 4001,
      user_id: 2020,
      state_id: 'md',
      role_id: stateStaffRoleId,
      status: 'approved',
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    },
    {
      id: 4003,
      user_id: 'fed-admin',
      state_id: 'fd',
      role_id: fedAdminRoleId,
      status: 'approved',
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    },
    {
      id: 4004,
      user_id: 'state-admin',
      state_id: 'ak',
      role_id: stateAdminRoleId,
      status: 'approved',
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    },
    {
      id: 4005,
      user_id: 'state-admin-match',
      state_id: 'ak',
      role_id: null,
      status: 'requested'
    },
    {
      id: 4006,
      user_id: 'state-admin',
      state_id: 'md',
      role_id: stateStaffRoleId,
      status: 'approved',
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    },
    {
      id: 4007,
      user_id: 'no-permissions',
      state_id: 'wy',
      role_id: noPermissionsId,
      status: 'approved',
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    }
  ]);
  await knex('okta_users').del();
  await knex('okta_users').insert([
    {
      user_id: 2010,
      email: '2010@email.com'
    },
    {
      user_id: 2020,
      email: '2020@email.com'
    },
    {
      user_id: 'all-permissions',
      email: 'all-permissions@email.com'
    },
    {
      user_id: 'no-permissions',
      email: 'no-permissions@email.com'
    },
    {
      user_id: 'fed-admin',
      email: 'fedadmin@email.com'
    },
    {
      user_id: 'state-admin',
      email: 'stateadmin@email.com'
    },
    {
      user_id: 'state-admin-match',
      email: 'stateadminmatch@email.com'
    }
  ]);
};
