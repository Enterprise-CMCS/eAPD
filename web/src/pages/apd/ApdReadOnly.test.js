import React from 'react';
import { renderWithConnection } from 'apd-testing-library';

import ApdReadOnly from './ApdReadOnly';

const setup = () => {
  renderWithConnection(<ApdReadOnly />);
};

describe('<ApdReadOnly/>', () => {
  test('renders correctly', () => {
    setup();
  });
});
