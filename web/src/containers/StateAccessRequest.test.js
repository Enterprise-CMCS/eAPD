import React from 'react';
import { renderWithConnection, fireEvent, axe } from 'apd-testing-library';
import StateAccessRequest from './StateAccessRequest';

const defaultProps = {
  errorMessage: null,
  saveAction: jest.fn(),
  fetching: false
};

// https://testing-library.com/docs/example-input-event/
const setup = (props = {}) =>
  renderWithConnection(<StateAccessRequest {...defaultProps} {...props} />);

describe('<StateAccessRequest />', () => {
  it('should not fail any accessibility tests', async () => {
    const { container } = setup();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('title rendered', () => {
    const { getAllByText } = setup();
    expect(getAllByText(/Verify Your Identity/i).length).toBeGreaterThan(0);
  });

  it('allows the user to select the first item', () => {
    const { getByText } = setup();
    fireEvent.click(getByText(/Submit/i));
    expect(defaultProps.saveAction).toHaveBeenCalledWith(['al']);
  });

  it('allows the users to select any item', () => {
    const { getByLabelText, getByText } = setup();
    fireEvent.change(getByLabelText(/Select Affiliation/i), {
      target: { value: 'mo' }
    });
    fireEvent.click(getByText(/Submit/i));
    expect(defaultProps.saveAction).toHaveBeenCalledWith(['mo']);
  });

  test('Back to Login button renders', () => {
    const { getByText } = setup();
    expect(getByText(/Back to Login/i)).toBeTruthy();
  });
});
