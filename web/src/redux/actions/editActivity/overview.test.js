import { EDIT_APD } from '../editApd/symbols';

import {
  setActivityAlternatives,
  setActivityDescription,
  setActivityOverview
} from './overview';

describe('APD activity edit actions for activity overview section', () => {
  it('dispatches an action for setting an activity statement of alternatives', () => {
    expect(setActivityAlternatives(17, 'new alternatives')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/activityOverview/alternatives',
      value: 'new alternatives'
    });
  });

  it('dispatches an action for setting an activity description', () => {
    expect(setActivityDescription(17, 'new description')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/activityOverview/description',
      value: 'new description'
    });
  });

  it('dispatches an action for setting an activity overview', () => {
    expect(setActivityOverview(17, 'new overview')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/activityOverview/summary',
      value: 'new overview'
    });
  });
});
