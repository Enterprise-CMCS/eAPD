import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as StateProfile,
  mapStateToProps,
  mapDispatchToProps
} from './ApdStateProfileMedicaidOffice';

import {
  setMedicaidDirectorEmail,
  setMedicaidDirectorName,
  setMedicaidDirectorPhoneNumber,
  setMedicaidOfficeAddress1,
  setMedicaidOfficeAddress2,
  setMedicaidOfficeCity,
  setMedicaidOfficeState,
  setMedicaidOfficeZip
} from '../../../actions/editApd';

describe('apd state profile, Medicaid office component', () => {
  const props = {
    defaultStateID: 'mn',
    stateProfile: {
      medicaidDirector: {
        name: 'name',
        email: 'email',
        phone: 'phone'
      },
      medicaidOffice: {
        address1: 'address 1',
        address2: 'address 2',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }
    },
    setEmail: jest.fn(),
    setName: jest.fn(),
    setPhone: jest.fn(),
    setAddress1: jest.fn(),
    setAddress2: jest.fn(),
    setCity: jest.fn(),
    setState: jest.fn(),
    setZip: jest.fn()
  };

  beforeEach(() => {
    props.setEmail.mockClear();
    props.setName.mockClear();
    props.setPhone.mockClear();
    props.setAddress1.mockClear();
    props.setAddress2.mockClear();
    props.setCity.mockClear();
    props.setState.mockClear();
    props.setZip.mockClear();
  });

  test('renders correctly', () => {
    expect(shallow(<StateProfile {...props} />)).toMatchSnapshot();
  });

  [
    {
      testName: 'director name change',
      fieldName: 'apd-state-profile-mdname',
      action: props.setName
    },
    {
      testName: 'director email change',
      fieldName: 'apd-state-profile-mdemail',
      action: props.setEmail
    },
    {
      testName: 'director phone number change',
      fieldName: 'apd-state-profile-mdphone',
      action: props.setPhone
    },
    {
      testName: 'office address line 1 change',
      fieldName: 'apd-state-profile-addr1',
      action: props.setAddress1
    },
    {
      testName: 'office address line 2 change',
      fieldName: 'apd-state-profile-addr2',
      action: props.setAddress2
    },
    {
      testName: 'office city change',
      fieldName: 'apd-state-profile-city',
      action: props.setCity
    },
    {
      testName: 'office state change',
      fieldName: 'apd-state-profile-state',
      action: props.setState
    },
    {
      testName: 'office zip change',
      fieldName: 'apd-state-profile-zip',
      action: props.setZip
    }
  ].forEach(({ testName, fieldName, action }) => {
    test(`dispatches on ${testName}`, () => {
      const component = shallow(<StateProfile {...props} />);

      component
        .findWhere(c => c.prop('name') === fieldName)
        .first()
        .simulate('change', { target: { value: 'new text' } });

      expect(action).toHaveBeenCalledWith('new text');
    });
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            stateProfile: 'this is the state, from the side'
          }
        },
        user: {
          data: {
            state: { id: 'mn' }
          }
        }
      })
    ).toEqual({
      defaultStateID: 'mn',
      stateProfile: 'this is the state, from the side'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setEmail: setMedicaidDirectorEmail,
      setName: setMedicaidDirectorName,
      setPhone: setMedicaidDirectorPhoneNumber,
      setAddress1: setMedicaidOfficeAddress1,
      setAddress2: setMedicaidOfficeAddress2,
      setCity: setMedicaidOfficeCity,
      setState: setMedicaidOfficeState,
      setZip: setMedicaidOfficeZip
    });
  });
});
