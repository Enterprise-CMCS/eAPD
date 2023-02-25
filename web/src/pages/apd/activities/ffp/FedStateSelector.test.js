import React from 'react';
import { render, screen, waitFor } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';

import FedStateSelector from './FedStateSelector';

const defaultProps = {
  ffy: '2023',
  ffp: {
    federal: 0,
    state: 0,
    fundingCategory: null
  },
  setFederalStateSplit: jest.fn()
};

const setup = async (props = {}) => {
  /* eslint react/prop-types: 0 */
  const Wrapper = props => {
    const formMethods = useForm();

    return <FormProvider {...formMethods}>{props.children}</FormProvider>;
  };

  // eslint-ignore-next-line testing-library/render-result-naming-convention, testing-library/render-result-naming-convention
  render(
    <Wrapper>
      <FedStateSelector {...defaultProps} {...props} />
    </Wrapper>
  );
  const user = userEvent.setup();
  return { user };
};

describe('the FedStateSelector component', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('renders correctly', async () => {
    await setup();

    expect(screen.getAllByRole('option').length).toBe(4);
    expect(
      screen.getByRole('option', { name: 'Select an option' }).selected
    ).toBe(true);
  });

  it('handles selecting 90-10', async () => {
    const { user } = await setup();

    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '90-10' })
    );
    screen.getByRole('combobox').blur();
    await waitFor(() => {
      expect(screen.getByRole('option', { name: '90-10' }).selected).toBe(true);
    });

    expect(defaultProps.setFederalStateSplit).toHaveBeenCalledWith(
      '2023',
      90,
      10
    );
  });

  it('handles selecting 75-25', async () => {
    const { user } = await setup();

    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '75-25' })
    );
    screen.getByRole('combobox').blur();
    await waitFor(() => {
      expect(screen.getByRole('option', { name: '75-25' }).selected).toBe(true);
    });

    expect(defaultProps.setFederalStateSplit).toHaveBeenCalledWith(
      '2023',
      75,
      25
    );
  });

  it('handles selecting 50-50', async () => {
    const { user } = await setup();

    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '50-50' })
    );
    screen.getByRole('combobox').blur();
    await waitFor(() => {
      expect(screen.getByRole('option', { name: '50-50' }).selected).toBe(true);
    });

    expect(defaultProps.setFederalStateSplit).toHaveBeenCalledWith(
      '2023',
      50,
      50
    );
  });

  it('loads existing values for 90-10', async () => {
    await setup({
      ffp: {
        federal: 90,
        state: 10
      }
    });

    expect(screen.getByRole('option', { name: '90-10' }).selected).toBe(true);
  });

  it('loads existing values for 75-25', async () => {
    await setup({
      ffp: {
        federal: 75,
        state: 25
      }
    });

    expect(screen.getByRole('option', { name: '75-25' }).selected).toBe(true);
  });

  it('loads existing values for 50-50', async () => {
    await setup({
      ffp: {
        federal: 50,
        state: 50
      }
    });

    expect(screen.getByRole('option', { name: '50-50' }).selected).toBe(true);
  });

  it('loads existing values for 50-50 and handles switching to 75-25', async () => {
    const { user } = await setup({
      ffp: {
        federal: 50,
        state: 50
      }
    });

    await user.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '75-25' })
    );
    screen.getByRole('combobox').blur();

    expect(defaultProps.setFederalStateSplit).toHaveBeenCalledWith(
      '2023',
      75,
      25
    );
  });
});
