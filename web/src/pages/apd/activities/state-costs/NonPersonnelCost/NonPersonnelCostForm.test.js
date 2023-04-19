import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { APD_TYPE } from '@cms-eapd/common';

import NonPersonnelCostForm from './NonPersonnelCostForm';

const defaultProps = {
  index: 123,
  activityIndex: 42,
  item: {
    category: 'Hardware, software, and licensing',
    description: 'Test description',
    years: {
      2022: '100',
      2023: '200'
    },
    key: '123abc23'
  },
  saveNonPersonnelCost: jest.fn(),
  setFormValid: jest.fn()
};

const hitechApd = {
  initialState: {
    apd: {
      data: {
        apdType: APD_TYPE.HITECH
      }
    }
  }
};

const mmisApd = {
  initialState: { apd: { data: { apdType: APD_TYPE.MMIS } } }
};

const setup = async (props = {}, options = {}) => {
  let utils;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    utils = renderWithConnection(
      <NonPersonnelCostForm {...defaultProps} {...props} />,
      options
    );
  });
  const user = userEvent.setup();
  return {
    utils,
    user
  };
};

describe('the NonPersonnelCostForm component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly with default props', async () => {
    await setup();
    expect(screen.getByLabelText(/Category/i)).toHaveValue(
      defaultProps.item.category
    );
    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      defaultProps.item.description
    );
    Object.keys(defaultProps.item.years).forEach(year => {
      expect(screen.getByLabelText(`FFY ${year} Cost`)).toHaveValue(
        defaultProps.item.years[year]
      );
    });
  });

  test('renders error when no category is selected', async () => {
    const { user } = await setup({});

    expect(screen.getAllByRole('option').length).toBe(6);

    user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Select an option' })
    );

    await waitFor(() => {
      expect(
        screen.getByRole('option', { name: 'Select an option' }).selected
      ).toBe(true);
    });

    screen.getByRole('combobox').blur();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);
    });

    const error = await screen.findByText('Select a category.');
    expect(error).toBeInTheDocument();
  });

  test('renders error when no description is provided', async () => {
    const { user } = await setup({});

    const input = screen.getByRole('textbox', { name: /description/i });

    user.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    user.tab();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByText(
      /Provide a description of the selected non-personal category./i
    );
    expect(error).toBeInTheDocument();
  });

  test('renders error when no number is provided for cost', async () => {
    const { user } = await setup({});

    const input = screen.getByLabelText(`FFY 2022 Cost`);

    user.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    user.tab();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByText('Provide an annual cost.');
    expect(error).toBeInTheDocument();
  });

  test('renders error when no number is provided for cost', async () => {
    const { user } = await setup({});

    const input = screen.getByLabelText(`FFY 2023 Cost`);

    user.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    user.tab();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByText('Provide an annual cost.');
    expect(error).toBeInTheDocument();
  });
});

describe('Selection removes "Administrative operations" for in MMIS apd', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('shows "Administrative operations" on HITECH APD', async () => {
    await setup({}, hitechApd);

    expect(screen.getAllByRole('option').length).toBe(6);

    const dropdown = screen.getByRole('combobox');

    await waitFor(() => {
      dropdown.click();
    });

    expect(
      await screen.findByText('Administrative operations')
    ).toBeInTheDocument();
  });

  it('shows default list on MMIS APD', async () => {
    await setup({}, mmisApd);

    expect(screen.getAllByRole('option').length).toBe(6);

    const dropdown = screen.getByRole('combobox');

    await waitFor(() => {
      dropdown.click();
    });

    expect(
      screen.queryByText('Administrative operations')
    ).not.toBeInTheDocument();
  });
});
