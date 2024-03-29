// APD Types
export const APD_TYPE = {
  HITECH: 'HITECH',
  MMIS: 'MMIS'
};

export const BUDGET_TYPE = {
  HITECH: 'HITECHBudget',
  HITECH_BUDGET: 'HITECHBudget',
  MMIS: 'MMISBudget',
  MMIS_BUDGET: 'MMISBudget'
};

export const FUNDING_CATEGORY_TYPE = {
  DDI: 'DDI',
  MANDO: 'MO',
  MANDOALT: 'M&O'
};
export const FUNDING_CATEGORY_TYPE_KEY_LOOKUP = {
  DDI: 'ddi',
  MO: 'mando'
};

export const FUNDING_CATEGORY_LABEL_MAPPING = {
  DDI: 'Design, Development, and Installation (DDI)',
  MANDO: 'Maintenance & Operations (M&O)',
  MO: 'Maintenance & Operations (M&O)'
};

export const MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING = {
  waiverSupportSystems: '1115 or Waiver Support Systems',
  assetVerificationSystem: 'Asset Verification System',
  claimsProcessing: 'Claims Processing',
  decisionSupportSystemDW: 'Decision Support System & Data Warehouse',
  electronicVisitVerification: 'Electronic Visit Verification (EVV)',
  encounterProcessingSystemMCS:
    'Encounter Processing System (EPS) & Managed Care System',
  financialManagement: 'Financial Management',
  healthInformationExchange: 'Health Information Exchange (HIE)',
  longTermServicesSupports: 'Long Term Services & Supports (LTSS)',
  memberManagement: 'Member Management',
  pharmacyBenefitManagementPOS:
    'Pharmacy Benefit Management (PBM) & Point of Sale (POS)',
  programIntegrity: 'Program Integrity',
  providerManagement: 'Provider Management',
  thirdPartyLiability: 'Third Party Liability (TPL)',
  other: 'Other',
  otherMedicaidBusinessAreas: 'Other Medicaid Business Area(s)'
};

export const UPDATE_STATUS_LABEL_MAPPING = {
  annualUpdate: 'Annual Update',
  asNeededUpdate: 'As-Needed Update'
};

function returnArrayOfCheckBoxes(obj) {
  var array = Object.keys(obj),
    index = array.indexOf(obj.otherMedicaidBusinessAreas);
  array.splice(index, 1);
  return array;
}

export const MEDICAID_BUSINESS_AREAS_CHECKBOXES = returnArrayOfCheckBoxes(
  MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING
);

export const AFFILIATION_STATUSES = {
  APPROVED: 'approved',
  REVOKED: 'revoked',
  DENIED: 'denied',
  REQUESTED: 'requested'
};

export const DATE_EXTREMES = {
  min: '1960-01-01',
  max: '2151-12-31'
};
