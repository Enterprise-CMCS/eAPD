const { roleToActivityMappings } = require('../../util/roles');

// 10xx IDs refer to activities
// 11xx IDs refer to roles

// For testing, put in our hard-coded stuff so we know what IDs to expect.
const activities = [
  { id: 1001, name: 'view-users' },
  { id: 1002, name: 'view-roles' },
  { id: 1003, name: 'export-document' },
  { id: 1004, name: 'create-draft' },
  { id: 1005, name: 'edit-document' },
  { id: 1006, name: 'view-document' },
  { id: 1007, name: 'view-affiliations' },
  { id: 1008, name: 'edit-affiliations' },
  { id: 1009, name: 'view-state-admins' },
  { id: 1010, name: 'edit-state-admins' },
  { id: 1011, name: 'view-state-certifications' },
  { id: 1012, name: 'edit-state-certifications' }
];
exports.activities = activities;

const roles = [
  { id: 1101, isActive: true, name: 'eAPD Admin' },
  { id: 1102, isActive: true, name: 'eAPD Federal Admin' },
  { id: 1103, isActive: false, name: 'eAPD Federal Leadership' },
  { id: 1104, isActive: false, name: 'eAPD Federal Analyst' },
  { id: 1105, isActive: false, name: 'eAPD Federal SME' },
  { id: 1106, isActive: true, name: 'eAPD State Admin' },
  { id: 1107, isActive: true, name: 'eAPD State Staff' },
  { id: 1108, isActive: true, name: 'eAPD State Contractor' },
  { id: 1109, isActive: false, name: 'eAPD State SME' },
  { id: 1110, isActive: true, name: 'eAPD System Admin' }
];
exports.roles = roles;

// grant 'eAPD Admin' role all activities
const adminRole = roles.find(role => role.name === 'eAPD Admin');
const adminActivities = activities.map(activity => ({
  role_id: adminRole.id,
  activity_id: activity.id
}));

// 'eAPD Federal Admin'
const federalAdminRole = roles.find(role => role.name === 'eAPD Federal Admin');
const federalAdminActivities = roleToActivityMappings['eAPD Federal Admin'].map(
  activityName => ({
    role_id: federalAdminRole.id,
    activity_id: activities.find(activity => activity.name === activityName).id
  })
);

// 'eAPD State Admin'
const stateAdminRole = roles.find(role => role.name === 'eAPD State Admin');
const stateAdminActivities = roleToActivityMappings['eAPD State Admin'].map(
  activityName => ({
    role_id: stateAdminRole.id,
    activity_id: activities.find(activity => activity.name === activityName).id
  })
);

exports.seed = async knex => {
  await knex('auth_activities').insert(activities);
  await knex('auth_roles').insert(roles);
  await knex('auth_role_activity_mapping').insert(adminActivities);
  await knex('auth_role_activity_mapping').insert(federalAdminActivities);
  await knex('auth_role_activity_mapping').insert(stateAdminActivities);
};
