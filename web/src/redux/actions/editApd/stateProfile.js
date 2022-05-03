import { EDIT_APD } from './symbols';

/**
 * Set the state Medicaid director's email address
 * @param {String} email Email address
 */
export const setMedicaidDirectorEmail = email => ({
  type: EDIT_APD,
  path: '/keyStatePersonnel/medicaidDirector/email',
  value: email
});

/**
 * Set the state Medicaid director's email address
 * @param {String} name Name
 */
export const setMedicaidDirectorName = name => ({
  type: EDIT_APD,
  path: '/keyStatePersonnel/medicaidDirector/name',
  value: name
});

/**
 * Set the state Medicaid director's phone number
 * @param {String} phone Phone number
 */
export const setMedicaidDirectorPhoneNumber = phone => ({
  type: EDIT_APD,
  path: '/keyStatePersonnel/medicaidDirector/phone',
  value: phone
});

/**
 * Set the state Medicaid office address, line 1
 * @param {String} address Address, line 1
 */
export const setMedicaidOfficeAddress1 = address => ({
  type: EDIT_APD,
  path: '/keyStatePersonnel/medicaidOffice/address1',
  value: address
});

/**
 * Set the state Medicaid office address, line 2
 * @param {String} address Address, line 2
 */
export const setMedicaidOfficeAddress2 = address => ({
  type: EDIT_APD,
  path: '/keyStatePersonnel/medicaidOffice/address2',
  value: address
});

/**
 * Set the state Medicaid office city
 * @param {String} city City
 */
export const setMedicaidOfficeCity = city => ({
  type: EDIT_APD,
  path: '/keyStatePersonnel/medicaidOffice/city',
  value: city
});

/**
 * Set the state Medicaid office state
 * @param {String} state State
 */
export const setMedicaidOfficeState = state => ({
  type: EDIT_APD,
  path: '/keyStatePersonnel/medicaidOffice/state',
  value: state
});

/**
 * Set the state Medicaid office ZIP code
 * @param {String} zip ZIP
 */
export const setMedicaidOfficeZip = zip => {
  return {
    type: EDIT_APD,
    path: '/keyStatePersonnel/medicaidOffice/zip',
    value: zip
  };
};
