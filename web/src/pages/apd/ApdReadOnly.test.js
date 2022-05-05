const mongoose = require('mongoose');

import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';

const { apd } = require('../../../../api/seeds/development/apds'); //dont use this, use ak-apd.json instead
const mongo = require('../../../../api/db/mongodb');

import ApdViewOnly from './ApdReadOnly';

let newApd;
let APD;

const setup = () => {
  renderWithConnection(<ApdViewOnly {...newApd} />);
};

describe('<ApdViewOnly/>', () => {
  jest.before(async () => {
    await mongo.setup();
    APD = mongoose.model('APD');
  });

  jest.beforeEach(async () => {
    newApd = new APD({
      status: 'draft',
      stateId: 'md',
      id: 46,
      ...apd
    });
    newApd = await newApd.save();
  });

  test('renders correctly', () => {
    setup();
    // screen.getByText('Export');
  });
});
