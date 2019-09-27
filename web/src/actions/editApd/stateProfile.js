import { EDIT_APD } from './symbols';

export const setMedicaidDirectorEmail = email => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidDirector/email',
  value: email
});

export const setMedicaidDirectorName = name => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidDirector/name',
  value: name
});

export const setMedicaidDirectorPhoneNumber = phone => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidDirector/phone',
  value: phone
});

export const setMedicaidOfficeAddress1 = address => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidOffice/address1',
  value: address
});

export const setMedicaidOfficeAddress2 = address => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidOffice/address2',
  value: address
});

export const setMedicaidOfficeCity = city => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidOffice/city',
  value: city
});

export const setMedicaidOfficeState = state => ({
  type: EDIT_APD,
  path: '/stateProfile/medicaidOffice/state',
  value: state
});

export const setMedicaidOfficeZip = zip => {
  return {
    type: EDIT_APD,
    path: '/stateProfile/medicaidOffice/zip',
    value: zip
  };
};
