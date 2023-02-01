import { EDIT_APD } from '../editApd/symbols';

import {
  setActivityAlternatives,
  setActivityDescription,
  setActivityOverview,
  setActivityProblemStatement,
  setActivityProposedSolution,
  setActivitySnapshot
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

  it('dispatches an action for setting an activity problem statement', () => {
    expect(setActivityProblemStatement(17, 'new problem statement')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/activityOverview/problemStatement',
      value: 'new problem statement'
    });
  });

  it('dispatches an action for setting an activity proposed solution', () => {
    expect(setActivityProposedSolution(17, 'new proposed solution')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/activityOverview/proposedSolution',
      value: 'new proposed solution'
    });
  });

  it('dispatches an action for setting an activity snapshot', () => {
    expect(setActivitySnapshot(17, 'new snapshot')).toEqual({
      type: EDIT_APD,
      path: '/activities/17/activityOverview/activitySnapshot',
      value: 'new snapshot'
    });
  });
});
