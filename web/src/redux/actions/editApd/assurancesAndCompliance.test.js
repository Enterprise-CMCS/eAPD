import { EDIT_APD } from './symbols';
import {
  setComplyingWithProcurement,
  setComplyingWithRecordsAccess,
  setComplyingWithSecurity,
  setComplyingWithSoftwareRights,
  setComplyingWithIndependentVV,
  setJustificationForProcurement,
  setJustificationForRecordsAccess,
  setJustificationForSecurity,
  setJustificationForSoftwareRights,
  setJustificationForIndependentVV
} from './assurancesAndCompliance';

describe('APD edit actions for assurance and compliance', () => {
  it('dispatches an action for setting whether the APD is in compliance with a procurement citation', () => {
    expect(setComplyingWithProcurement(7, false)).toEqual({
      type: EDIT_APD,
      path: '/assurancesAndCompliances/procurement/7/checked',
      value: false
    });
  });

  it('dispatches an actino for setting the justification for a procurement citation', () => {
    expect(setJustificationForProcurement(9, 'this is some text')).toEqual({
      type: EDIT_APD,
      path: '/assurancesAndCompliances/procurement/9/explanation',
      value: 'this is some text'
    });
  });

  it('dispatches an action for setting whether the APD is in compliance with a records access citation', () => {
    expect(setComplyingWithRecordsAccess(7, false)).toEqual({
      type: EDIT_APD,
      path: '/assurancesAndCompliances/recordsAccess/7/checked',
      value: false
    });
  });

  it('dispatches an actino for setting the justification for a records access citation', () => {
    expect(setJustificationForRecordsAccess(9, 'this is some text')).toEqual({
      type: EDIT_APD,
      path: '/assurancesAndCompliances/recordsAccess/9/explanation',
      value: 'this is some text'
    });
  });

  it('dispatches an action for setting whether the APD is in compliance with a security citation', () => {
    expect(setComplyingWithSecurity(7, false)).toEqual({
      type: EDIT_APD,
      path: '/assurancesAndCompliances/security/7/checked',
      value: false
    });
  });

  it('dispatches an actino for setting the justification for a security citation', () => {
    expect(setJustificationForSecurity(9, 'this is some text')).toEqual({
      type: EDIT_APD,
      path: '/assurancesAndCompliances/security/9/explanation',
      value: 'this is some text'
    });
  });

  it('dispatches an action for setting whether the APD is in compliance with a software rights citation', () => {
    expect(setComplyingWithSoftwareRights(7, false)).toEqual({
      type: EDIT_APD,
      path: '/assurancesAndCompliances/softwareRights/7/checked',
      value: false
    });
  });

  it('dispatches an actino for setting the justification for a software rights citation', () => {
    expect(setJustificationForSoftwareRights(9, 'this is some text')).toEqual({
      type: EDIT_APD,
      path: '/assurancesAndCompliances/softwareRights/9/explanation',
      value: 'this is some text'
    });
  });

  it('dispatches an action for setting whether the APD is in compliance with a independent verification and validation citation', () => {
    expect(setComplyingWithIndependentVV(7, false)).toEqual({
      type: EDIT_APD,
      path: '/assurancesAndCompliances/independentVV/7/checked',
      value: false
    });
  });

  it('dispatches an action for setting the justification for a independent verification and validation citation', () => {
    expect(setJustificationForIndependentVV(9, 'this is some text')).toEqual({
      type: EDIT_APD,
      path: '/assurancesAndCompliances/independentVV/9/explanation',
      value: 'this is some text'
    });
  });
});
