import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  within,
  waitFor
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import { plain as ContractorForm } from './ContractorResourceForm';

const defaultProps = {
  activityIndex: 43,
  index: 1,
  item: {
    description: 'They cleaned up the latrines after the Battle of Hastings',
    end: '1066-10-15',
    hourly: {
      useHourly: false,
      data: {
        1066: {
          hours: 10,
          rate: 100
        },
        1067: {
          hours: 20,
          rate: 200
        }
      }
    },
    id: 'contractor 1',
    key: 'key 1',
    name: 'Honey Dipper Dan',
    start: '1066-10-14',
    totalCost: 12345,
    years: {
      1066: 300,
      1067: 400
    }
  },
  saveContractor: jest.fn(),
  setFormValid: jest.fn()
};

const setup = async (props = {}) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const renderUtils = await act(async () => {
    renderWithConnection(<ContractorForm {...defaultProps} {...props} />);
  });
  return renderUtils;
};

const verifyDateField = (text, expectValue) => {
  const fieldset = within(screen.getByText(text).closest('fieldset')); // eslint-disable-line testing-library/no-node-access
  expect(fieldset.getByLabelText('Month')).toHaveValue(expectValue.month);
  expect(fieldset.getByLabelText('Day')).toHaveValue(expectValue.day);
  expect(fieldset.getByLabelText('Year')).toHaveValue(expectValue.year);
};

const verifyHourlyField = expectValue => {
  const fieldset = within(
    screen.getByText(/This is an hourly resource/i).closest('fieldset') // eslint-disable-line testing-library/no-node-access
  );
  if (expectValue == 'yes') {
    expect(fieldset.getByLabelText('Yes')).toBeChecked();
    expect(fieldset.getByLabelText('No')).not.toBeChecked();
  }
  if (expectValue == 'no') {
    expect(fieldset.getByLabelText('Yes')).not.toBeChecked();
    expect(fieldset.getByLabelText('No')).toBeChecked();
  }
};

describe('the ContractorResourceForm component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly with yearly', async () => {
    await setup();
    expect(
      screen.getByLabelText(/Private Contractor or Vendor Name/i)
    ).toHaveValue(defaultProps.item.name);
    expect(
      screen.getByLabelText(
        /Procurement Methodology and Description of Services/i
      )
    ).toHaveValue(defaultProps.item.description);
    verifyDateField('Contract start date', {
      month: '10',
      day: '14',
      year: '1066'
    });
    verifyDateField('Contract end date', {
      month: '10',
      day: '15',
      year: '1066'
    });
    expect(screen.getByLabelText(/Total Contract Cost/i)).toHaveValue('12,345');
    verifyHourlyField('no');
    expect(screen.getByLabelText(/FFY 1066 Cost/i)).toHaveValue('300');
    expect(screen.getByLabelText(/FFY 1067 Cost/i)).toHaveValue('400');
    expect(screen.queryByLabelText(/^FFY 1066$/i)).toBeNull();
    expect(screen.queryByLabelText(/^FFY 1067$/i)).toBeNull();

    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(true);
  });

  test('renders correctly with hourly', async () => {
    await setup({
      ...defaultProps,
      item: {
        ...defaultProps.item,
        hourly: {
          data: {
            1066: { hours: 20, rate: 100 },
            1067: { hours: 15, rate: 200 }
          },
          useHourly: true
        },
        years: {
          1066: 2000,
          1067: 3000
        }
      }
    });
    expect(
      screen.getByLabelText(/Private Contractor or Vendor Name/i)
    ).toHaveValue(defaultProps.item.name);
    expect(
      screen.getByLabelText(
        /Procurement Methodology and Description of Services/i
      )
    ).toHaveValue(defaultProps.item.description);
    verifyDateField('Contract start date', {
      month: '10',
      day: '14',
      year: '1066'
    });
    verifyDateField('Contract end date', {
      month: '10',
      day: '15',
      year: '1066'
    });
    expect(screen.getByLabelText(/Total Contract Cost/i)).toHaveValue('12,345');
    verifyHourlyField('yes');
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/FFY 1066 Cost/i).closest('label').nextSibling
    ).toHaveTextContent('$2,000');
    expect(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/FFY 1067 Cost/i).closest('label').nextSibling
    ).toHaveTextContent('$3,000');
    expect(screen.queryByLabelText(/^FFY 1066$/i)).toBeNull();
    expect(screen.queryByLabelText(/^FFY 1067$/i)).toBeNull();

    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(true);
  });

  test('renders errors when fields are empty', async () => {
    await setup({
      ...defaultProps,
      item: { hourly: { useHourly: null }, years: { 1066: null, 1067: null } }
    });

    // name
    const nameInput = screen.getByLabelText(
      /Private Contractor or Vendor Name/i
    );
    userEvent.click(nameInput);
    await waitFor(() => {
      expect(nameInput).toHaveFocus();
    });

    // description doesn't load in tests

    // start date - month, day, year
    const startFieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/Contract start date/i).closest('fieldset')
    );
    userEvent.tab();
    await waitFor(() => {
      expect(startFieldset.getByLabelText('Month')).toHaveFocus();
    });
    userEvent.tab();
    await waitFor(() => {
      expect(startFieldset.getByLabelText('Day')).toHaveFocus();
    });
    userEvent.tab();
    await waitFor(() => {
      expect(startFieldset.getByLabelText('Year')).toHaveFocus();
    });

    // end date - month, day, year
    const endFieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/Contract end date/i).closest('fieldset')
    );
    userEvent.tab();
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Month')).toHaveFocus();
    });
    userEvent.tab();
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Day')).toHaveFocus();
    });
    userEvent.tab();
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Year')).toHaveFocus();
    });

    // total contract cost
    userEvent.tab();
    await waitFor(() => {
      expect(screen.getByLabelText(/Total Contract Cost/i)).toHaveFocus();
    });

    // useHourly
    userEvent.tab();
    const fieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/This is an hourly resource/i).closest('fieldset')
    );
    await waitFor(() => {
      expect(fieldset.getByLabelText('Yes')).toHaveFocus();
    });

    // cancel
    userEvent.tab();

    await waitFor(async () => {
      expect(await screen.findAllByRole('alert')).toHaveLength(5);
    });
  });

  test('renders error when name is null', async () => {
    await setup({});

    const input = screen.getByRole('textbox', { name: /name/i });

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
      /Provide a private contractor or vendor name/i
    );
    expect(error).toBeInTheDocument();
  });

  test('renders error when start date is null', async () => {
    await setup({
      ...defaultProps,
      item: { ...defaultProps.item, start: '' }
    });

    const startFieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/Contract start date/i).closest('fieldset')
    );

    // userEvent.type(startFieldset.getByLabelText('Month'), '-1');
    userEvent.click(startFieldset.getByLabelText('Month'));
    await waitFor(() => {
      expect(startFieldset.getByLabelText('Month')).toHaveFocus();
    });
    userEvent.tab(); // day
    userEvent.tab(); // year
    userEvent.tab(); // tab out of the field

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    await waitFor(() => {
      expect(screen.getAllByText(/Provide a start date/i)).toHaveLength(2);
    });
  });

  test('renders error when end date is null', async () => {
    await setup({
      ...defaultProps,
      item: { ...defaultProps.item, end: '' }
    });

    const endFieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/Contract end date/i).closest('fieldset')
    );

    // userEvent.type(endFieldset.getByLabelText('Month'), '-1');
    userEvent.click(endFieldset.getByLabelText('Month'));
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Month')).toHaveFocus();
    });
    userEvent.tab(); // day
    userEvent.tab(); // year
    userEvent.tab(); // tab out of the field

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    await waitFor(() => {
      expect(screen.getAllByText(/Provide an end date/i)).toHaveLength(2);
    });
  });

  test('renders error when end date is before start date', async () => {
    await setup({
      ...defaultProps,
      item: { ...defaultProps.item, end: '1066-10-10' }
    });

    const endFieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/Contract end date/i).closest('fieldset')
    );

    userEvent.click(endFieldset.getByLabelText('Month'));
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Month')).toHaveFocus();
    });
    userEvent.tab(); // day
    userEvent.tab(); // year
    userEvent.tab(); // tab out of the field

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    await waitFor(() => {
      expect(
        screen.getAllByText(/Provide an end date that is after the start date/i)
      ).toHaveLength(2);
    });
  });

  test('renders error when total cost is null', async () => {
    await setup({});

    const input = screen.getByLabelText(/Total Contract Cost/i);

    userEvent.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    userEvent.tab();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(2);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByText(/Provide a contract cost/i);
    expect(error).toBeInTheDocument();
  });

  test('renders error when total cost is -1', async () => {
    await setup({});

    const input = screen.getByLabelText(/Total Contract Cost/i);

    userEvent.clear(input);
    userEvent.type(input, '-1');
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    userEvent.tab();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(2);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    await waitFor(() => {
      expect(
        screen.getByText(/contract cost greater than or equal to/i)
      ).toBeTruthy();
    });
  });

  test('renders error when useHourly is null', async () => {
    await setup({
      ...defaultProps,
      item: {
        ...defaultProps.item,
        hourly: { ...defaultProps.item.hourly, useHourly: null }
      }
    });

    const input = screen
      .getByText(/This is an hourly resource/i)
      // eslint-disable-next-line testing-library/no-node-access
      .closest('fieldset');

    userEvent.click(screen.getByLabelText(/Total Contract Cost/i));
    userEvent.tab();
    await waitFor(() => {
      expect(within(input).getByLabelText('Yes')).toHaveFocus();
    });
    userEvent.tab();
    await waitFor(() => {
      expect(within(input).getByLabelText('Yes')).not.toHaveFocus();
    });

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findAllByText(/Must select hourly or yearly/i);
    expect(error).toHaveLength(2);
  });

  test('renders error when useHourly is yes and hours and rates are null', async () => {
    await setup({
      ...defaultProps,
      item: {
        ...defaultProps.item,
        hourly: {
          data: {
            1066: { hours: null, rate: null },
            1067: { hours: null, rate: null }
          },
          useHourly: null
        }
      }
    });

    const input = screen
      .getByText(/This is an hourly resource/i)
      // eslint-disable-next-line testing-library/no-node-access
      .closest('fieldset');

    userEvent.click(within(input).getByLabelText('Yes'));
    userEvent.tab(); // hours 1066
    userEvent.tab(); // rates 1066
    userEvent.tab(); // hours 1067
    userEvent.tab(); // rates 1067
    userEvent.tab(); // out of hourly costs

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    expect(
      await screen.findAllByText(/number of hours greater than or equal to/i)
    ).toHaveLength(2);
    expect(
      await screen.findAllByText(/hourly rate greater than/i)
    ).toHaveLength(2);
  });

  test('renders error when useHourly is no and yearly costs are null', async () => {
    await setup({
      ...defaultProps,
      item: {
        ...defaultProps.item,
        hourly: {
          ...defaultProps.item.hourly,
          useHourly: null
        },
        years: {
          1066: null,
          1067: null
        }
      }
    });

    const input = screen
      .getByText(/This is an hourly resource/i)
      // eslint-disable-next-line testing-library/no-node-access
      .closest('fieldset');

    userEvent.click(within(input).getByLabelText('No'));
    userEvent.tab(); // cost 1066
    userEvent.tab(); // cost 1067
    userEvent.tab(); // out of yearly costs

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    expect(
      await screen.findAllByText(/an annual cost greater than/i)
    ).toHaveLength(2);
  });
});
