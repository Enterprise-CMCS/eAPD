import React from 'react'
import { renderWithConnection, screen, fireEvent } from 'apd-testing-library';

import SwitchAffiliation from './SwitchAffiliation';

const defaultProps = {
  currentStateId: 'md',
  availableAffiliations: ['md', 'ak']
};

const setup = (props = {}) => {
  return renderWithConnection(
    <SwitchAffiliation {...defaultProps} {...props} />,
    {
      initialState: { 
        user: {
          data: {
            states: ['md', 'ak'],
            state: { name: 'Maryland', id: 'md' }
          }
        } 
      }
    }
  );
};
describe('Switch Affiliation component', () => {
  test('renders correct title', async () => {
    setup();  
    expect(screen.getByRole('heading')).toHaveTextContent('State Affiliation');
  });
  test('renders correct legend', async () => {
    setup();  
    expect(screen.queryByText('Please select your state affiliation')).toBeTruthy();
  });
  test('renders correct set of radio options', async () => {
    setup();
    expect(screen.getByLabelText('Maryland')).toBeTruthy();
    expect(screen.getByLabelText('Alaska')).toBeTruthy();
  })
  test('renders submit button', async () => {
    setup();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeTruthy();
  })
  test('renders cancel button', async () => {
    setup();
    expect(screen.getByRole('button', {name: 'Cancel'})).toBeTruthy();
  })
  test('renders current state as default selected', async () => {
    setup();
    expect(screen.getByLabelText('Maryland')).toBeChecked();
    expect(screen.getByLabelText('Alaska')).not.toBeChecked();
  })
  test('allows different states to be selected', async () => {
    setup();
    expect(screen.getByLabelText('Maryland')).toBeChecked();
    fireEvent.click(screen.getByLabelText('Alaska'));
    expect(screen.getByLabelText('Alaska')).toBeChecked();
    expect(screen.getByLabelText('Maryland')).not.toBeChecked();
  })
});