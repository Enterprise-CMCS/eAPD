import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  within,
  waitFor,
  fireEvent
} from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';

import axios from '../../../util/api';
import ApdStateProfileMedicaidOffice from './ApdStateProfileMedicaidOffice';
import {
  setMedicaidDirectorEmail,
  setMedicaidDirectorName,
  setMedicaidDirectorPhoneNumber,
  setMedicaidOfficeAddress1,
  setMedicaidOfficeAddress2,
  setMedicaidOfficeCity,
  setMedicaidOfficeState,
  setMedicaidOfficeZip
} from '../../../redux/actions/editApd';

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

const initialState = {
  adminCheck: false,
  apd: {
    data: {
      keyStatePersonnel: {
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
      }
    }
  }
};

const setup = (props = {}, options = {}) => renderWithConnection(<ApdStateProfileMedicaidOffice {...props} />, options);

describe('<ApdStateProfileMedicaidOffice />', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  describe('apd state profile, Medicaid office component', () => {
    it('renders correctly', async () => {
      console.log = jest.fn();
        log('lol')
      });
    })
})
