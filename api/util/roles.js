// AFAICT, the boolean values here are not used for anything, yet.
export const activities = {
  'view-users': false,
  'view-roles': false,
  'export-document': false,
  'create-draft': false,
  'edit-document': false,
  'view-document': true,
  'view-affiliations': true,
  'edit-affiliations': true,
  'view-state-admins': true,
  'edit-state-admins': true,
  'edit-state-certifications': true,
  'view-state-certifications': true
};

export const roles = {
  'eAPD Admin': false,
  'eAPD System Admin': true,
  'eAPD Federal Admin': true,
  'eAPD Federal Leadership': false,
  'eAPD Federal Analyst': false,
  'eAPD Federal SME': false,
  'eAPD State Admin': true,
  'eAPD State Staff': true,
  'eAPD State Contractor': true,
  'eAPD State SME': false
};

export const roleToActivityMappings = {
  'eAPD System Admin': [
    'view-users',
    'view-roles',
    'view-document',
    'view-affiliations',
    'view-state-admins'
  ],
  'eAPD Federal Admin': [
    'view-roles',
    'view-state-admins',
    'edit-state-admins',
    'view-affiliations',
    'edit-affiliations',
    'edit-state-certifications',
    'view-state-certifications'
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

export const activeRoles = [
  'eAPD System Admin',
  'eAPD Federal Admin',
  'eAPD State Admin',
  'eAPD State Staff',
  'eAPD State Contractor'
];
