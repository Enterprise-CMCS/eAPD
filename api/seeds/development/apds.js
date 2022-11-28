import akAPD from './01-akAPD';
import akAPDNoActivities from './02-akAPDNoActivities';

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
