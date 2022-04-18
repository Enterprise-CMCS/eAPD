import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';

import ApdSummary from './ReadOnlyApd';

describe('APD Summary/viewOnly component', () => {
  test('renders the correct message when there was nothing entered', () => {
    const props = {
      narrativeHIE: '',
      narrativeHIT: '',
      narrativeMMIS: '',
      programOverview: ''
    };
    renderWithConnection(<ApdSummary {...props} />);

    expect(screen.queryAllByText('No response was provided')).toHaveLength(4);
  });
});
