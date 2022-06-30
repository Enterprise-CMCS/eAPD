import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  waitFor
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import { plain as StatePersonForm } from './StatePersonForm';

const defaultProps = {
  activityIndex: 42,
  index: 1,
  item: {
    title: 'Project Assistant',
    description:
      'Coordination and document management support daily administrative support such as meeting minutes and scribe, manages project library, scheduling, and correspondence tracking.',
    years: {
      2022: {
        amt: 100,
        perc: 1
      },
      2023: {
        amt: 125,
        perc: 2
      }
    },
    key: '1bf11abc'
  },
  savePersonnel: jest.fn(),
  setFormValid: jest.fn()
};

const setup = async (props = {}) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const util = await act(async () => {
    renderWithConnection(<StatePersonForm {...defaultProps} {...props} />);
  });
  const user = userEvent.setup();
  return {
    util,
    user
  };
};

describe('the StatePersonForm component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly with default props', async () => {
    await setup();
    expect(screen.getByLabelText(/Personnel title/i)).toHaveValue(
      defaultProps.item.title
    );
    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      defaultProps.item.description
    );
    expect(screen.getAllByLabelText(`Cost with benefits`)[0]).toHaveValue(
      `${defaultProps.item.years[2022].amt}`
    );
    expect(screen.getAllByLabelText(`Number of FTEs`)[0]).toHaveValue(
      `${defaultProps.item.years[2022].perc}`
    );
    expect(screen.getAllByLabelText(`Cost with benefits`)[1]).toHaveValue(
      `${defaultProps.item.years[2023].amt}`
    );
    expect(screen.getAllByLabelText(`Number of FTEs`)[1]).toHaveValue(
      `${defaultProps.item.years[2023].perc}`
    );
  });

  test('renders error when no title is provided', async () => {
    const { user } = await setup({});

    const input = screen.getByRole('textbox', { name: /title/i });

    await user.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    await user.tab();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByText(/Provide a personnel title./i);
    expect(error).toBeInTheDocument();
  });

  test('renders error when no description is provided', async () => {
    const { user } = await setup({});

    const input = screen.getByRole('textbox', { name: /description/i });

    await user.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    await user.tab();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByText(/Provide a personnel description./i);
    expect(error).toBeInTheDocument();
  });

  test('renders error when no number is provided for cost', async () => {
    const { user } = await setup({});

    const input = screen.getAllByLabelText(`Cost with benefits`);

    await user.clear(input[0]);
    await waitFor(() => {
      expect(input[0]).toHaveFocus();
    });
    await user.tab();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByText(
      'Please provide a FTE cost greater than or equal to $0.'
    );
    expect(error).toBeInTheDocument();
  });

  test('renders error when a negative number is provided for cost', async () => {
    const { user } = await setup({});

    const input = screen.getAllByLabelText(`Number of FTEs`);

    await user.clear(input[0]);
    await waitFor(() => {
      expect(input[0]).toHaveFocus();
    });
    await user.type(input[0], '-1');
    await user.tab();
    expect(input[0]).toHaveValue('0');

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(2);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(true);
  });

  test('renders error when no number of FTEs is provided', async () => {
    const { user } = await setup({});

    const input = screen.getAllByLabelText(`Number of FTEs`);

    await user.clear(input[0]);
    await waitFor(() => {
      expect(input[0]).toHaveFocus();
    });
    await user.tab();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByText(
      'Provide a FTE number greater than or equal to 0.'
    );
    expect(error).toBeInTheDocument();
  });
});
