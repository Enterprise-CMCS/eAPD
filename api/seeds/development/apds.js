import hitech from './01-hitech.js';
import hitechNoActivities from './02-hitechNoActivities.js';
import mmis from './03-mmis.js';
import mmisNoActivities from './04-mmisNoActivities.js';

export const data = [
  {
    ...hitech,
    stateId: 'ak',
    status: 'draft'
  },
  {
    ...hitechNoActivities,
    stateId: 'ak',
    status: 'draft'
  },
  {
    ...mmis,
    stateId: 'ak',
    status: 'draft'
  },
  {
    ...mmisNoActivities,
    stateId: 'ak',
    status: 'draft'
  }
];

export { hitech, hitechNoActivities, mmis, mmisNoActivities };
