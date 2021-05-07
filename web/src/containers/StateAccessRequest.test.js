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

  it('renders title', () => {
    const { getByRole } = setup();
    expect(getByRole('heading', { name: 'Verify Your Identity' })).toBeTruthy();
  });

  it('renders label', () => {
    const { getByLabelText } = setup();
    expect(getByLabelText('Select Affiliation(s)')).toBeTruthy();
  });

  // Need to brainstorm best way to test the interactions of the autocomplete
  xit('allows the user to select the first item', () => {
    const { getByText } = setup();
    fireEvent.click(getByText(/Submit/i));
    expect(defaultProps.saveAction).toHaveBeenCalledWith([{name: 'Alabama', id: 'al'}]);
  });

  xit('allows the users to select any item', () => {
    const { getByLabelText, getByText } = setup();
    fireEvent.change(getByLabelText(/Select Affiliation(s)/i), {
      target: { value: 'mo' }
    });
    fireEvent.click(getByText(/Submit/i));
    expect(defaultProps.saveAction).toHaveBeenCalledWith(['mo']);
  });
});
