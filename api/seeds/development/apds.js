import hitech from './01-hitech.js';
import hitechNoActivities from './02-hitechNoActivities.js';
import mmis from './03-mmis.js';
import mmisNoActivities from './04-mmisNoActivities.js';

export const data = [
  {
    ...hitech,
    stateId: 'na',
    status: 'draft'
  },
  {
    ...hitechNoActivities,
    stateId: 'na',
    status: 'draft'
  },
  {
    ...mmis,
    stateId: 'na',
    status: 'draft'
  },
  {
    ...mmisNoActivities,
    stateId: 'na',
    status: 'draft'
  }
];

export { hitech, hitechNoActivities, mmis, mmisNoActivities };
