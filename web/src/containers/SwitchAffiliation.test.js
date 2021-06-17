import React from 'react'
import { renderWithConnection, screen } from 'apd-testing-library';

import SwitchAffiliation from './SwitchAffiliation';

const defaultProps = {
  currentStateId: 'md',
  availableAffiliations: ['md', 'ak']
};

const setup = (props = {}) => {
  return renderWithConnection(
    <SwitchAffiliation {...defaultProps} {...props} />
  );
};
describe('Switch Affiliation component', () => {
  test('loads title', async () => {
    setup();  
    expect(screen.getByRole('heading')).toHaveTextContent('State Affiliation');
  });
});