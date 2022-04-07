import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import NonPersonnelCostForm from './NonPersonnelCostForm';

const defaultProps = {
  index: 123,
  activityIndex: 42,
  item: {
    category: 'Hardware, software, and licensing',
    description: 'Test description',
    years: {
      2022: '100',
      2023: '200',
    },
    key: "123abc23"    
  },
  saveNonPersonnelCost: jest.fn(),
  setFormValid: jest.fn()
};

const setup = async (props = {}) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const renderUtils = await act(async () => {
    renderWithConnection(<NonPersonnelCostForm {...defaultProps} {...props} />);
  });
  return renderUtils;
};

describe('the ContractorResourceForm component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  test('renders correctly with default props', async () => {
    await setup();
    expect(screen.getByLabelText(/Category/i)).toHaveValue(defaultProps.item.category);
    expect(screen.getByLabelText(/Description/i)).toHaveValue(defaultProps.item.description);
    Object.keys(defaultProps.item.years).forEach(year => {
      expect(screen.getByLabelText(`FFY ${year} Cost`)).toHaveValue(defaultProps.item.years[year]);
    })
  });
  
  test('renders error when no category is selected', async () => {
    await setup({});

    expect(screen.getAllByRole('option').length).toBe(7)

    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Select an option' }),
    )

    expect(screen.getByRole('option', { name: 'Select an option' }).selected).toBe(true)

    const dropdown = screen.getByRole('combobox');

    await waitFor(() => {
      dropdown.blur();
    });

    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByText('Select a category.');
    expect(error).toBeInTheDocument();
  });
  
  test('renders error when no description is provided', async () => {
    await setup({});
    
    const input = screen.getByRole('textbox', { name: /description/i });
    
    userEvent.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    userEvent.tab();
    
    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);
    
    const error = await screen.findByText(
      /Provide a description of the selected non-personal category./i
    );
    expect(error).toBeInTheDocument();
  });
  
  test('renders error when no number is provided for cost', async () => {
    await setup({});
    
    const input = screen.getByLabelText(`FFY 2022 Cost`);
    
    userEvent.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    userEvent.tab();
    
    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);
    
    const error = await screen.findByText('Provide an annual cost greater than $0.');
    expect(error).toBeInTheDocument();
  });
  
  test('renders error when no number is provided for cost', async () => {
    await setup({});
    
    const input = screen.getByLabelText(`FFY 2023 Cost`);
    
    userEvent.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    userEvent.tab();
    
    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);
    
    const error = await screen.findByText('Provide an annual cost greater than $0.');
    expect(error).toBeInTheDocument();
  });
});