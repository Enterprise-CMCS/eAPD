// AFAICT, the boolean values here are not used for anything, yet.
const activities = {
  'view-users': false,
  'view-roles': false,
  'submit-federal-response': false,
  'submit-clearance': false,
  'edit-comments': false,
  'export-document': false,
  'submit-document': false,
  'submit-state-response': false,
  'create-draft': false,
  'edit-document': false,
  'edit-response': false,
  'view-document': true,
  'view-affiliations': true,
  'edit-affiliations': true,
  'view-state-admins': true,
  'edit-state-admins': true
};

const roles = {
  'eAPD Admin': false,
  'eAPD Federal Admin': true,
  'eAPD Federal Leadership': false,
  'eAPD Federal Analyst': false,
  'eAPD Federal SME': false,
  'eAPD State Admin': true,
  'eAPD State Staff': true,
  'eAPD State Contractor': true,
  'eAPD State SME': false
};

const roleToActivityMappings = {
  'eAPD Federal Admin': [
    'view-users',
    'view-roles',
    'view-state-admins',
    'edit-state-admins',
    'view-affiliations',
    'edit-affiliations',
    'view-document',
    'edit-document'
  ],
  'eAPD State Admin': [
    'view-roles',
    'view-affiliations',
    'edit-affiliations',
    'create-draft',
    'view-document',
    'edit-document',
    'export-document'
  ],
  'eAPD State Staff': [
    'create-draft',
    'view-document',
    'edit-document',
    'export-document'
  ],
  'eAPD State Contractor': [
    'create-draft',
    'view-document',
    'edit-document',
    'export-document'
  ]
};

const activeRoles = [
  'eAPD Federal Admin',
  'eAPD State Admin',
  'eAPD State Staff',
  'eAPD State Contractor'
];

module.exports = {
  activities,
  roles,
  roleToActivityMappings,
  activeRoles
};
