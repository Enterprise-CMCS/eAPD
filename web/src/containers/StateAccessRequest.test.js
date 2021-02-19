import React from 'react';
import { renderWithConnection, fireEvent } from 'apd-testing-library';
import StateAccessRequest from './StateAccessRequest';

let props;
let renderUtils;

describe('<StateAccessRequest />', () => {
  beforeEach(() => {
    props = {
      errorMessage: null,
      saveAction: jest.fn(),
      cancelAction: jest.fn(),
      fetching: false
    };
    renderUtils = renderWithConnection(<StateAccessRequest {...props} />);
  });

  it('title rendered', () => {
    const { getAllByText } = renderUtils;
    expect(getAllByText(/Verify Your Identity/i).length).toBeGreaterThan(0);
  });

  it('allows the user to select the first item', () => {
    const { getByText } = renderUtils;
    fireEvent.click(getByText(/Submit/i));
    expect(props.saveAction).toHaveBeenCalledWith(['al']);
  });

  it('allows the users to select any item', () => {
    const { getByLabelText, getByText } = renderUtils;
    fireEvent.change(getByLabelText(/Select your State Affiliation/i), {
      target: { value: 'mo' }
    });
    fireEvent.click(getByText(/Submit/i));
    expect(props.saveAction).toHaveBeenCalledWith(['mo']);
  });

  it('allows the user to cancel the request', () => {
    const { getByText } = renderUtils;
    fireEvent.click(getByText(/Cancel/i));
    expect(props.cancelAction).toHaveBeenCalled();
  });
});
