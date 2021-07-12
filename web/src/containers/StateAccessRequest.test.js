import React from 'react';
import { renderWithConnection, fireEvent, axe } from '../shared/apd-testing-library';
import StateAccessRequest from './StateAccessRequest';

const defaultProps = {
  errorMessage: null,
  saveAction: jest.fn(),
  fetching: false,
  secondaryButtonText: "Back to Login"
};


// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>  renderWithConnection(<StateAccessRequest {...defaultProps} {...props} />);
let setupWithCustomState;

describe('<StateAccessRequest />', () => {
  it('should not fail any accessibility tests', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders correct title when no existing affiliations', () => {
    setupWithCustomState = renderWithConnection(<StateAccessRequest />,
      {
        initialState: {
          user: {
            data: {
              state: { id: 'mo' },
              affiliations: []
            }
          }
        }
      }
    );

  const { getByRole } = setupWithCustomState;
  expect(getByRole('heading', { name: 'Verify Your Identity' })).toBeTruthy();
  });

  it('renders correct title(s) with existing affiliations', () => {
    setupWithCustomState = renderWithConnection(<StateAccessRequest />,
        {
          initialState: {
            user: {
              data: {
                affiliations: [
                  {
                    state_id: 'mo',
                  }
                ]
              }
            }
          }
        }
      );

    const { getByRole, getByText } = setupWithCustomState;
    expect(getByRole('heading', { name: 'Manage Account' })).toBeTruthy();
    expect(getByText('Existing Affiliations')).toBeTruthy();
  });

  it('renders existing affiliations', () => {
    setupWithCustomState = renderWithConnection(<StateAccessRequest />,
        {
          initialState: {
            user: {
              data: {
                affiliations: [
                  {
                    state_id: 'az',
                    status: 'approved'
                  },
                  {
                    state_id: 'md',
                    status: 'revoked'
                  },
                  {
                    state_id: 'ak',
                    status: 'requested'
                  }
                ]
              }
            }
          }
        }
      );

    const { getByText } = setupWithCustomState;
    expect(getByText('Active')).toBeTruthy();
    expect(getByText('Arizona')).toBeTruthy();
    expect(getByText('Revoked')).toBeTruthy();
    expect(getByText('Maryland')).toBeTruthy();
    expect(getByText('Pending')).toBeTruthy();
    expect(getByText('Alaska')).toBeTruthy();
  });

  it('renders message when no affiliations exist per status', () => {
    setupWithCustomState = renderWithConnection(<StateAccessRequest />,
        {
          initialState: {
            user: {
              data: {
                affiliations: [
                  {
                    state_id: 'ak',
                    status: 'requested'
                  },
                  {
                    state_id: 'ak',
                    status: 'revoked'
                  }
                ]
              }
            }
          }
        }
      );

    const { getByText } = setupWithCustomState;
    expect(getByText('No active affiliations')).toBeTruthy();
  });

  it('renders label', () => {
    const { getByLabelText } = setup();
    expect(getByLabelText('Select your State Affiliation')).toBeTruthy();
  });

  test('Secondary button renders the right text', () => {
    const { getByText } = setup();
    expect(getByText(/Back to Login/i)).toBeTruthy();
  });

  test('Back to Login button renders', () => {
    const { getByText } = setup({secondaryButtonText:"This is a secondary button"});
    expect(getByText(/This is a secondary button/i)).toBeTruthy();
  });

  it('renders the input when entered', () => {
    const { getByLabelText } = setup();
    const input = getByLabelText('Select your State Affiliation');
    fireEvent.change(input, { target: { value: 'Al' } });
    expect(input.value).toBe('Al');
  });

  it('renders the selection badge when an item is picked', () => {
    const { getByText, getByLabelText } = setup();
    const input = getByLabelText('Select your State Affiliation');
    fireEvent.change(input, { target: { value: 'Alabama' } });
    fireEvent.click(getByText('Alabama'));
    expect(getByText('Alabama')).toBeTruthy();
  });

  it('renders the no results on an invalid entry', () => {
    const { getByText, getByLabelText } = setup();
    const input = getByLabelText('Select your State Affiliation');
    fireEvent.change(input, { target: { value: 'invalid123999' } });
    expect(getByText('No results')).toBeTruthy();
  });

  it('properly removes a selection', () => {
    const { getByText, getByLabelText, getByRole, queryByText } = setup();
    const input = getByLabelText('Select your State Affiliation');
    fireEvent.change(input, { target: { value: 'Alabama' } });
    fireEvent.click(getByText('Alabama'));
    fireEvent.click(getByRole('button', { name: 'Remove Alabama' }));
    expect(queryByText('Alabama')).toBeNull();
  });

  it('renders the submit button as disabled until a selection is made', () => {
    const { getByText, getByLabelText } = setup();
    const input = getByLabelText('Select your State Affiliation');
    expect(getByText('Submit')).toHaveAttribute('disabled');
    fireEvent.change(input, { target: { value: 'Al' } });
    fireEvent.click(getByText('Alabama'));
    expect(getByText('Submit')).not.toHaveAttribute('disabled');
  });
});
