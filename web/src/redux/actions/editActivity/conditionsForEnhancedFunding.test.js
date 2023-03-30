import {
  setEnhancedFundingQualification,
  setEnhancedFundingJustification
} from './conditionsForEnhancedFunding';
import { EDIT_APD } from '../editApd';

describe('APD activity edit actions for conditions for enhanced funding', () => {
  it('dispatches an action for setting the enhanced funding qualification', () => {
    expect(setEnhancedFundingQualification(12, 'do the other thing')).toEqual({
      type: EDIT_APD,
      path: '/activities/12/conditionsForEnhancedFunding/enhancedFundingQualification',
      value: 'do the other thing'
    });
  });

  it('dispatches an action for setting the enhanced funding justification', () => {
    expect(
      setEnhancedFundingJustification(20, 'it would be good to do it')
    ).toEqual({
      type: EDIT_APD,
      path: '/activities/20/conditionsForEnhancedFunding/enhancedFundingJustification',
      value: 'it would be good to do it'
    });
  });
});
