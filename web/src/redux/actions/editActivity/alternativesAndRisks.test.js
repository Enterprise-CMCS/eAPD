import {
  setAlternativeAnalysis,
  setCostBenefitAnalysis,
  setFeasibilityStudy,
  setRequirementsAnalysis,
  setForseeableRisks
} from './alternativesAndRisks';
import { EDIT_APD } from '../editApd';

describe('APD activity edit actions for alternatives and risks', () => {
  it('dispatches an action for setting an alternative analysis', () => {
    expect(setAlternativeAnalysis(12, 'do the other thing')).toEqual({
      type: EDIT_APD,
      path: '/activities/12/analysisOfAlternativesAndRisks/alternativeAnalysis',
      value: 'do the other thing'
    });
  });

  it('dispatches an action for setting the cost benefit analysis', () => {
    expect(setCostBenefitAnalysis(20, 'it would be good to do it')).toEqual({
      type: EDIT_APD,
      path: '/activities/20/analysisOfAlternativesAndRisks/costBenefitAnalysis',
      value: 'it would be good to do it'
    });
  });

  it('dispatches an action for setting a feasibility study', () => {
    expect(setFeasibilityStudy(0, 'it is doable')).toEqual({
      type: EDIT_APD,
      path: '/activities/0/analysisOfAlternativesAndRisks/feasibilityStudy',
      value: 'it is doable'
    });
  });

  it('dispatches an action for setting the requirements analysis', () => {
    expect(setRequirementsAnalysis(4, 'do it correctly')).toEqual({
      type: EDIT_APD,
      path: '/activities/4/analysisOfAlternativesAndRisks/requirementsAnalysis',
      value: 'do it correctly'
    });
  });

  it('dispatches an action for setting the forseeable risks', () => {
    expect(setForseeableRisks(34, 'it could go wrong')).toEqual({
      type: EDIT_APD,
      path: '/activities/34/analysisOfAlternativesAndRisks/forseeableRisks',
      value: 'it could go wrong'
    });
  });
});
