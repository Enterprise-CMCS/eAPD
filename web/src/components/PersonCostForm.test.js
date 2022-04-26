import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import PersonCostForm from './PersonCostForm';

const defaultProps = {
  value: {
    2022: {
      amt: 100,
      perc: 1
    },
    2023: {
      amt: 125,
      perc: 2
    }
  },
  setCost: jest.fn(),
  setFTE: jest.fn(),
  setFormValid: jest.fn()
};

const setup = async (props = {}) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const renderUtils = await act(async () => {
    renderWithConnection(<PersonCostForm {...defaultProps} {...props} />);
  });
  return renderUtils;
};

describe('the PersonCostForm component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  test('renders correctly with default props', async () => {
    await setup();
    expect(screen.getAllByLabelText(`Cost with benefits`)[0]).toHaveValue(`${defaultProps.value[2022].amt}`);
    expect(screen.getAllByLabelText(`Number of FTEs`)[0]).toHaveValue(`${defaultProps.value[2022].perc}`);
    expect(screen.getAllByLabelText(`Cost with benefits`)[1]).toHaveValue(`${defaultProps.value[2023].amt}`);
    expect(screen.getAllByLabelText(`Number of FTEs`)[1]).toHaveValue(`${defaultProps.value[2023].perc}`);
  });
  
  test('renders error when no number is provided for cost', async () => {
    await setup({});
    
    const input = screen.getAllByLabelText(`Cost with benefits`);
    
    userEvent.clear(input[0]);
    await waitFor(() => {
      expect(input[0]).toHaveFocus();
    });
    userEvent.tab();
    
    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);
    
    const error = await screen.findByText('Please provide a FTE cost greater than or equal to $0.');
    expect(error).toBeInTheDocument();
  });
  
  test('renders error when a negative number is provided for cost', async () => {
    await setup({});
    
    const input = screen.getAllByLabelText(`Number of FTEs`);
    
    userEvent.clear(input[0]);
    await waitFor(() => {
      expect(input[0]).toHaveFocus();
    });
    userEvent.type(input, {target: {value: '-1'}})
    userEvent.tab();
    
    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);
    
    const error = await screen.findByText('Provide a FTE number greater than or equal to 0.');
    expect(error).toBeInTheDocument();
  });
  
  test('renders error when no number of FTEs is provided', async () => {
    await setup({});
    
    const input = screen.getAllByLabelText(`Number of FTEs`);
    
    userEvent.clear(input[0]);
    await waitFor(() => {
      expect(input[0]).toHaveFocus();
    });
    userEvent.tab();
    
    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);
    
    const error = await screen.findByText('Provide a FTE number greater than or equal to 0.');
    expect(error).toBeInTheDocument();
  });
});