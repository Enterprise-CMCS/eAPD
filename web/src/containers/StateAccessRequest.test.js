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
    expect(getByLabelText('Select your State Affiliation.')).toBeTruthy();
  });
  
  it('renders the input when entered', () => {
    const { getByLabelText } = setup();
    const input = getByLabelText('Select your State Affiliation.');
    fireEvent.change(input, { target: { value: 'Al' } });
    expect(input.value).toBe('Al');    
  })
  
  it('renders the selection badge when an item is picked', () => {
    const { getByText, getByLabelText } = setup();
    const input = getByLabelText('Select your State Affiliation.');
    fireEvent.change(input, { target: { value: 'Alabama' } });
    fireEvent.click(getByText('Alabama'));
    expect(getByText('Alabama')).toBeTruthy();
  })
  
  it('renders the no results on an invalid entry', () => {
    const { getByText, getByLabelText } = setup();
    const input = getByLabelText('Select your State Affiliation.');
    fireEvent.change(input, { target: { value: 'invalid123' } });
    expect(getByText('No results')).toBeTruthy();
  })
  
  it('renders the selection badge when an item is picked', () => {
    const { getByText, getByLabelText } = setup();
    const input = getByLabelText('Select your State Affiliation.');
    fireEvent.change(input, { target: { value: 'Alabama' } });
    fireEvent.click(getByText('Alabama'));
    fireEvent.click(getByText('Remove Alabama'));
    expect(getByText('Alabama')).toBeNull();
  })
  
  it('renders the submit button as disabled until a selection is made', () => {
    const { getByText, getByLabelText } = setup();    
    const input = getByLabelText('Select your State Affiliation.');
    expect(getByText('Submit')).toHaveAttribute('disabled');
    fireEvent.change(input, { target: { value: 'Al' } });
    fireEvent.click(getByText('Alabama'));
    expect(getByText('Submit')).not.toHaveAttribute('disabled');    
  })
});
