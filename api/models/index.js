import { APD_TYPE } from '@cms-eapd/common';

import { default as Budget } from './budget.js';
import { default as APD } from './apd.js';
import { default as MMISBudget } from './mmisBudget.js';
import { default as HITECHBudget } from './hitechBudget.js';
import { default as MMIS } from './mmis.js';
import { default as HITECH } from './hitech.js';
export { Budget, APD, MMISBudget, HITECHBudget, MMIS, HITECH };

export const getApdModel = apdType => {
  let model;
  switch (apdType) {
    case APD_TYPE.HITECH:
      model = HITECH;
      break;
    case APD_TYPE.MMIS:
      model = MMIS;
      break;
    default:
      model = APD;
  }
  return model;
};

export const getBudgetModel = apdType => {
  let model;
  switch (apdType) {
    case APD_TYPE.HITECH:
      model = HITECHBudget;
      break;
    case APD_TYPE.MMIS:
      model = MMISBudget;
      break;
    default:
      model = Budget;
  }
  return model;
};
