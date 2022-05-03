import { EDIT_APD } from './symbols';
import {
  setMedicaidDirectorEmail,
  setMedicaidDirectorName,
  setMedicaidDirectorPhoneNumber,
  setMedicaidOfficeAddress1,
  setMedicaidOfficeAddress2,
  setMedicaidOfficeCity,
  setMedicaidOfficeState,
  setMedicaidOfficeZip
} from './stateProfile';

describe('APD edit actions for Medicaid director and office', () => {
  it('dispatches an action for setting the Medicaid director email', () => {
    expect(setMedicaidDirectorEmail('email address')).toEqual({
      type: EDIT_APD,
      path: '/keyStatePersonnel/medicaidDirector/email',
      value: 'email address'
    });
  });

  it('dispatches an action for setting the Medicaid director name', () => {
    expect(setMedicaidDirectorName('name')).toEqual({
      type: EDIT_APD,
      path: '/keyStatePersonnel/medicaidDirector/name',
      value: 'name'
    });
  });

  it('dispatches an action for setting the Medicaid director phone number', () => {
    expect(setMedicaidDirectorPhoneNumber('phone number')).toEqual({
      type: EDIT_APD,
      path: '/keyStatePersonnel/medicaidDirector/phone',
      value: 'phone number'
    });
  });

  it('dispatches an action for setting the Medicaid office address line 1', () => {
    expect(setMedicaidOfficeAddress1('address 1')).toEqual({
      type: EDIT_APD,
      path: '/keyStatePersonnel/medicaidOffice/address1',
      value: 'address 1'
    });
  });

  it('dispatches an action for setting the Medicaid office address line 2', () => {
    expect(setMedicaidOfficeAddress2('address 2')).toEqual({
      type: EDIT_APD,
      path: '/keyStatePersonnel/medicaidOffice/address2',
      value: 'address 2'
    });
  });

  it('dispatches an action for setting the Medicaid office city', () => {
    expect(setMedicaidOfficeCity('city')).toEqual({
      type: EDIT_APD,
      path: '/keyStatePersonnel/medicaidOffice/city',
      value: 'city'
    });
  });

  it('dispatches an action for setting the Medicaid office state', () => {
    expect(setMedicaidOfficeState('state')).toEqual({
      type: EDIT_APD,
      path: '/keyStatePersonnel/medicaidOffice/state',
      value: 'state'
    });
  });

  it('dispatches an action for setting the Medicaid office zip code', () => {
    expect(setMedicaidOfficeZip('zip code')).toEqual({
      type: EDIT_APD,
      path: '/keyStatePersonnel/medicaidOffice/zip',
      value: 'zip code'
    });
  });
});
