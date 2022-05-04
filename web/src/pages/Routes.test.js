import React from 'react';
import { renderWithConnection } from 'apd-testing-library';

import Routes from './Routes';

describe('Routes component', () => {
  test('renders correctly', () => {
    const { container } = renderWithConnection(<Routes />);
    expect(container).toMatchSnapshot();
  });
});
