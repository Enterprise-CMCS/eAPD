import akAPD from './01-akAPD.js';
import akAPDNoActivities from './02-akAPDNoActivities.js';

export const data = [
  {
    stateId: 'ak',
    status: 'draft',
    ...akAPD
  },
  {
    stateId: 'ak',
    status: 'draft',
    ...akAPDNoActivities
  }
];

export { akAPD, akAPDNoActivities };
