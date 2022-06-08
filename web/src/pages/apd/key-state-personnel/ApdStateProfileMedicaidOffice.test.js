import React from 'react';
import {
  renderWithConnection,
  screen
} from 'apd-testing-library';
import MockAdapter from 'axios-mock-adapter';

import Joi from 'joi';
import axios from '../../../util/api';
import ApdStateProfileMedicaidOffice from './ApdStateProfileMedicaidOffice';

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException'});

const initialState = {
  apd: {
    data: {
      keyStatePersonnel: {
        medicaidDirector: {
          email: '',
          name: '',
          phone: ''
        },
        medicaidOffice: {
          address1: '',
          address2: '',
          city: '',
          state: '',
          zip: ''
        },
        keyPersonnel: []
      }
    },
    adminCheck: true
  },
  user: {
    data: {
      state: {
        id:"ak",
        name:"Alaska"
      }
    }
  }
}

const setup = (props = {}, options = {}) => renderWithConnection(<ApdStateProfileMedicaidOffice {...props} />, options);

describe('<ApdStateProfileMedicaidOffice />', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  describe('sets up Key State Medicaid Director and Office', () => {
    it('renders successfully', async () => {
      setup({}, { initialState });
    })
  });
});