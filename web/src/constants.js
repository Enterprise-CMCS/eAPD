import React from 'react';

export const APD_STATUS = {
  DRAFT: Symbol('draft'),
  SUBMITTED: Symbol('submitted'),
  IN_REVIEW: Symbol('in review'),
  STATE_RESPONSE: Symbol('awaiting state response'),
  IN_CLEARANCE: Symbol('in clearance'),
  APPROVED: Symbol('approved'),
  DISAPPROVED: Symbol('disapproved'),
  WITHDRAWN: Symbol('withdrawn')
};

export const APD_EVENTS = {
  EXPORT: 'EXPORT'
};

export const DASHBOARD_TASK_BUTTON_TEXT = {
  [APD_STATUS.DRAFT]: 'Open',
  [APD_STATUS.SUBMITTED]: 'View',
  [APD_STATUS.IN_REVIEW]: 'View',
  [APD_STATUS.STATE_RESPONSE]: 'View',
  [APD_STATUS.IN_CLEARANCE]: 'View',
  [APD_STATUS.APPROVED]: 'Approval Letter',
  [APD_STATUS.DISAPPROVED]: 'Disapproval Letter',
  [APD_STATUS.WITHDRAWN]: 'View'
};

export const TABLE_HEADERS = {
  actual: 'Actual FFP Expenditures',
  approvedTotal: 'Approved Total Computable Medicaid',
  approved: (p = 90) => `Approved ${p}% FFP`,
  federal: (p = 90) => (
    <span>
      Federal share <strong>{p}%</strong> FFP
    </span>
  ),
  ffy: y => `FFY ${y}`,
  total: <span>Total computable (Federal + state)</span>
};

export const MFA_FACTOR_TYPES = {
  CALL: 'call-OKTA',
  EMAIL: 'email-OKTA',
  SMS: 'sms-OKTA',
  PUSH: 'push-OKTA',
  OKTA: 'token:software:totp-OKTA'
};

export const MFA_FACTORS = {
  [MFA_FACTOR_TYPES.CALL]: {
    displayName: 'Call',
    factorType: 'call',
    provider: 'OKTA',
    active: true,
    findType: f => f.provider === 'OKTA' && f.factorType === 'call'
  },
  [MFA_FACTOR_TYPES.EMAIL]: {
    displayName: 'Email',
    factorType: 'email',
    provider: 'OKTA',
    active: true,
    findType: f => f.provider === 'OKTA' && f.factorType === 'email'
  },
  [MFA_FACTOR_TYPES.SMS]: {
    displayName: 'SMS Text',
    factorType: 'sms',
    provider: 'OKTA',
    active: true,
    findType: f => f.provider === 'OKTA' && f.factorType === 'sms'
  },
  [MFA_FACTOR_TYPES.PUSH]: {
    displayName: 'Okta Push',
    factorType: 'push',
    provider: 'OKTA',
    active: false,
    findType: f => f.provider === 'OKTA' && f.factorType === 'push'
  },
  [MFA_FACTOR_TYPES.OKTA]: {
    displayName: 'Software Token',
    factorType: 'token:software:totp',
    provider: 'OKTA',
    active: true,
    findType: f =>
      f.provider === 'OKTA' && f.factorType === 'token:software:totp'
  }
};
