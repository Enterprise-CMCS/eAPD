import {
  setActivityStandardAndConditionDoesNotSupportExplanation,
  setActivityStandardAndConditionSupportExplanation
} from './standardsAndConditions';
import { EDIT_APD } from '../editApd/symbols';

describe('APD activity edit actions for activity standards and conditions section', () => {
  it('dispatches an action for setting an activity explanation for not supporting the standards and conditions', () => {
    expect(
      setActivityStandardAndConditionDoesNotSupportExplanation(
        37,
        'new non-support'
      )
    ).toEqual({
      type: EDIT_APD,
      path: '/activities/37/activityOverview/standardsAndConditions/doesNotSupport',
      value: 'new non-support'
    });
  });

  it('dispatches an action for setting an activity explanation for supporting the standards and conditions', () => {
    expect(
      setActivityStandardAndConditionSupportExplanation(37, 'new support')
    ).toEqual({
      type: EDIT_APD,
      path: '/activities/37/activityOverview/standardsAndConditions/supports',
      value: 'new support'
    });
  });
});
