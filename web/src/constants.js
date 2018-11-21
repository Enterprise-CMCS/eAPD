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
  actual: 'Actual',
  approved: 'Approved',
  federal: (p = 90) => (
    <span>
      Federal share <strong>{p}%</strong> FFP
    </span>
  ),
  ffy: y => `FFY ${y}`,
  total: (
    <span>
      Total computable
      <br />
      (Federal + state)
    </span>
  )
};
