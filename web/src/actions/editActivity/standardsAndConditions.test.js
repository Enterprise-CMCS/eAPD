import {
  setActivityStandardsBusinessResults,
  setActivityStandardsDocumentation,
  setActivityStandardsIndustryStandards,
  setActivityStandardsInteroperability,
  setActivityStandardsKeyPersonnel,
  setActivityStandardsLeverage,
  setActivityStandardsMITA,
  setActivityStandardsMinimizeCost,
  setActivityStandardsMitigationStrategy,
  setActivityStandardsModularity,
  setActivityStandardsReporting
} from './standardsAndConditions';
import { EDIT_APD } from '../editApd/symbols';

describe('APD activity edit actions for activity standards and conditions section', () => {
  it('dispatches an action for setting an activity business result standard', () => {
    expect(setActivityStandardsBusinessResults(37, 'new result')).toEqual({
      type: EDIT_APD,
      path: '/activities/37/standardsAndConditions/businessResults',
      value: 'new result'
    });
  });

  it('dispatches an action for setting an activity documentation standard', () => {
    expect(setActivityStandardsDocumentation(37, 'new doc')).toEqual({
      type: EDIT_APD,
      path: '/activities/37/standardsAndConditions/documentation',
      value: 'new doc'
    });
  });

  it('dispatches an action for setting an activity industry standards standard', () => {
    expect(setActivityStandardsIndustryStandards(37, 'new standards')).toEqual({
      type: EDIT_APD,
      path: '/activities/37/standardsAndConditions/industryStandards',
      value: 'new standards'
    });
  });

  it('dispatches an action for setting an activity interoperability standard', () => {
    expect(setActivityStandardsInteroperability(37, 'new interop')).toEqual({
      type: EDIT_APD,
      path: '/activities/37/standardsAndConditions/interoperability',
      value: 'new interop'
    });
  });

  it('dispatches an action for setting an activity key personnel standard', () => {
    expect(setActivityStandardsKeyPersonnel(37, 'new people')).toEqual({
      type: EDIT_APD,
      path: '/activities/37/standardsAndConditions/keyPersonnel',
      value: 'new people'
    });
  });

  it('dispatches an action for setting an activity leverage standard', () => {
    expect(setActivityStandardsLeverage(37, 'new leverage')).toEqual({
      type: EDIT_APD,
      path: '/activities/37/standardsAndConditions/leverage',
      value: 'new leverage'
    });
  });

  it('dispatches an action for setting an activity minimize-cost standard', () => {
    expect(setActivityStandardsMinimizeCost(37, 'new minimum')).toEqual({
      type: EDIT_APD,
      path: '/activities/37/standardsAndConditions/minimizeCost',
      value: 'new minimum'
    });
  });

  it('dispatches an action for setting an activity MITA standard', () => {
    expect(setActivityStandardsMITA(37, 'new mita')).toEqual({
      type: EDIT_APD,
      path: '/activities/37/standardsAndConditions/mita',
      value: 'new mita'
    });
  });

  it('dispatches an action for setting an activity mitigation strategy standard', () => {
    expect(
      setActivityStandardsMitigationStrategy(37, 'new mitigation')
    ).toEqual({
      type: EDIT_APD,
      path: '/activities/37/standardsAndConditions/mitigationStrategy',
      value: 'new mitigation'
    });
  });

  it('dispatches an action for setting an activity modularity standard', () => {
    expect(setActivityStandardsModularity(37, 'new modules')).toEqual({
      type: EDIT_APD,
      path: '/activities/37/standardsAndConditions/modularity',
      value: 'new modules'
    });
  });

  it('dispatches an action for setting an activity reporting standard', () => {
    expect(setActivityStandardsReporting(37, 'new report')).toEqual({
      type: EDIT_APD,
      path: '/activities/37/standardsAndConditions/reporting',
      value: 'new report'
    });
  });
});
