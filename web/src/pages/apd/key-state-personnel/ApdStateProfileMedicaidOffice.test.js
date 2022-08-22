import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';

import axios from '../../../util/api';
import ApdStateProfileMedicaidOffice from './ApdStateProfileMedicaidOffice';

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

const initialState = {
  apd: {
    data: {
      keyStatePersonnel: {
        medicaidDirector: {
          email: 'ashby@gmail.com',
          name: 'Ashby',
          phone: '1111'
        },
        medicaidOffice: {
          address1: '123 Wayfarer Way',
          address2: '',
          city: 'Space',
          state: '',
          zip: '12345'
        },
        keyPersonnel: []
      }
    },
    adminCheck: false
  },
  user: {
    data: {
      state: {
        id: 'al',
        name: 'Alaska'
      }
    }
  }
};

const setup = (props = {}, options = {}) =>
  renderWithConnection(<ApdStateProfileMedicaidOffice {...props} />, options);

describe('<ApdStateProfileMedicaidOffice />', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  describe('sets up Key State Medicaid Director and Office', () => {
    it('renders successfully', async () => {
      setup({}, { initialState });

      expect(screen.getByLabelText('Name')).toHaveValue('Ashby');

      expect(screen.getByLabelText('Email address')).toHaveValue(
        'ashby@gmail.com'
      );

      expect(screen.getByLabelText('Phone number')).toHaveValue('1111');

      expect(screen.getByLabelText('Address')).toHaveValue('123 Wayfarer Way');

      expect(screen.getByLabelText('City')).toHaveValue('Space');

      expect(screen.getByLabelText('State')).toHaveValue('AL');

      expect(screen.getByLabelText('ZIP Code')).toHaveValue('12345');
    });
  });
});
