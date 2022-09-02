import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  within,
  waitFor,
  fireEvent
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import ContractorForm from './ContractorResourceForm';

const defaultProps = {
  activityIndex: 43,
  index: 1,
  item: {
    description: 'They cleaned up the latrines after the Battle of Hastings',
    end: '1066-10-15',
    useHourly: false,
    hourly: {
      1066: {
        hours: 10,
        rate: 100
      },
      1067: {
        hours: 20,
        rate: 200
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
  let utils;
  await act(
    async () =>
      (utils = renderWithConnection(
        <ContractorForm {...defaultProps} {...props} />
      ))
  );
  await waitFor(() => screen.findByText(/Private Contractor or Vendor Name/i));
  const user = userEvent.setup();
  return {
    utils,
    user
  };
};

const verifyDateField = (text, expectValue) => {
  const fieldset = within(screen.getByText(text).closest('fieldset')); // eslint-disable-line testing-library/no-node-access
  expect(fieldset.getByLabelText('Month')).toHaveValue(expectValue.month);
  expect(fieldset.getByLabelText('Day')).toHaveValue(expectValue.day);
  expect(fieldset.getByLabelText('Year')).toHaveValue(expectValue.year);
  fireEvent.blur(screen.getByText(text).closest('fieldset')); // eslint-disable-line testing-library/no-node-access
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
  fireEvent.blur(
    // eslint-disable-next-line testing-library/no-node-access
    screen.getByText(/This is an hourly resource/i).closest('fieldset')
  );
};

describe('the ContractorResourceForm component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders correctly with yearly', async () => {
    jest.setTimeout(30000);
    await setup();
    expect(
      screen.getByLabelText(/Private Contractor or Vendor Name/i)
    ).toHaveValue(defaultProps.item.name);
    fireEvent.blur(screen.getByLabelText(/Private Contractor or Vendor Name/i));
    expect(
      screen.getByLabelText(
        /Procurement Methodology and Description of Services/i
      )
    ).toHaveValue(defaultProps.item.description);
    fireEvent.blur(
      screen.getByLabelText(
        /Procurement Methodology and Description of Services/i
      )
    );
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
    fireEvent.blur(screen.getByLabelText(/Total Contract Cost/i));
    verifyHourlyField('no');
    expect(screen.queryByLabelText(/^FFY 1066$/i)).toBeNull();
    expect(screen.queryByLabelText(/^FFY 1067$/i)).toBeNull();
    expect(screen.getByLabelText(/FFY 1066 Cost/i)).toHaveValue('300');
    fireEvent.blur(screen.getByLabelText(/FFY 1066 Cost/i));
    expect(screen.getByLabelText(/FFY 1067 Cost/i)).toHaveValue('400');
    fireEvent.blur(screen.getByLabelText(/FFY 1067 Cost/i));

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    // TODO: not sure why this is failing
    await waitFor(async () => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(2);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(true);
  });

  test('renders correctly with hourly', async () => {
    jest.setTimeout(30000);
    await setup({
      ...defaultProps,
      item: {
        ...defaultProps.item,
        hourly: {
          1066: { hours: 20, rate: 100 },
          1067: { hours: 15, rate: 200 }
        },
        useHourly: true,
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

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    // TODO: not sure why this is failing
    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(2);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(true);
  });

  // TODO: these tests are too long running, need to figure out a way to make them quicker
  test('renders errors when fields are empty', async () => {
    const { user } = await setup({
      ...defaultProps,
      item: { useHourly: null, years: { 1066: null, 1067: null } }
    });

    // name
    const nameInput = screen.getByLabelText(
      /Private Contractor or Vendor Name/i
    );
    await user.click(nameInput);
    await waitFor(() => {
      expect(nameInput).toHaveFocus();
    });

    // description doesn't load in tests

    // start date - month, day, year
    const startFieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/Contract start date/i).closest('fieldset')
    );
    await user.tab();
    await waitFor(() => {
      expect(startFieldset.getByLabelText('Month')).toHaveFocus();
    });
    await user.tab();
    await waitFor(() => {
      expect(startFieldset.getByLabelText('Day')).toHaveFocus();
    });
    await user.tab();
    await waitFor(() => {
      expect(startFieldset.getByLabelText('Year')).toHaveFocus();
    });

    // end date - month, day, year
    const endFieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/Contract end date/i).closest('fieldset')
    );
    await user.tab();
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Month')).toHaveFocus();
    });
    await user.tab();
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Day')).toHaveFocus();
    });
    await user.tab();
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Year')).toHaveFocus();
    });

    // total contract cost
    await user.tab();
    await waitFor(() => {
      expect(screen.getByLabelText(/Total Contract Cost/i)).toHaveFocus();
    });

    // useHourly
    await user.tab();
    const fieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/This is an hourly resource/i).closest('fieldset')
    );
    await waitFor(() => {
      expect(fieldset.getByLabelText('Yes')).toHaveFocus();
    });

    // cancel
    await user.tab();

    await waitFor(async () => {
      expect(await screen.findAllByRole('alert')).toHaveLength(5);
    });
  });

  test('renders error when name is null', async () => {
    const { user } = await setup({});

    const input = screen.getByRole('textbox', { name: /name/i });

    await user.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    await user.tab();

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
    const { user } = await setup({
      ...defaultProps,
      item: { ...defaultProps.item, start: '' }
    });

    const startFieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/Contract start date/i).closest('fieldset')
    );

    // await user.type(startFieldset.getByLabelText('Month'), '-1');
    await user.click(startFieldset.getByLabelText('Month'));
    await waitFor(() => {
      expect(startFieldset.getByLabelText('Month')).toHaveFocus();
    });
    await user.tab(); // tab to day
    await user.tab(); // tab to year
    await user.tab(); // tab out of component

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    await waitFor(() => {
      expect(screen.getAllByText(/Provide a start date/i)).toHaveLength(2);
    });
  });

  test('renders error when end date is null', async () => {
    const { user } = await setup({
      ...defaultProps,
      item: { ...defaultProps.item, end: '' }
    });

    const endFieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/Contract end date/i).closest('fieldset')
    );

    // await user.type(endFieldset.getByLabelText('Month'), '-1');
    await user.click(endFieldset.getByLabelText('Month'));
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Month')).toHaveFocus();
    });
    await user.tab(); // day
    await user.tab(); // year
    await user.tab(); // tab out of the field

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    await waitFor(async () => {
      expect(await screen.findAllByText(/Provide an end date/i)).toHaveLength(
        2
      );
    });
  });

  test('renders error when end date is before start date', async () => {
    const { user } = await setup({
      ...defaultProps,
      item: { ...defaultProps.item, end: '1066-10-10' }
    });

    const endFieldset = within(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByText(/Contract end date/i).closest('fieldset')
    );

    await user.click(endFieldset.getByLabelText('Month'));
    await waitFor(() => {
      expect(endFieldset.getByLabelText('Month')).toHaveFocus();
    });
    await user.tab(); // day
    await user.tab(); // year
    await user.tab(); // tab out of the field

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
    const { user } = await setup({});

    const input = screen.getByLabelText(/Total Contract Cost/i);

    await user.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    await user.tab();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    const error = await screen.findByText(/Provide a contract cost/i);
    expect(error).toBeInTheDocument();
  });

  test('renders error when total cost is -1', async () => {
    const { user } = await setup({});

    const input = screen.getByLabelText(/Total Contract Cost/i);

    await user.clear(input);
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
    fireEvent.change(input, { target: { value: '-1' } });
    await user.tab();

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(3);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    await waitFor(() => {
      expect(
        screen.getByText(/contract cost greater than or equal to/i)
      ).toBeTruthy();
    });
  });

  test('renders error when useHourly is null', async () => {
    const { user } = await setup({
      ...defaultProps,
      item: {
        ...defaultProps.item,
        useHourly: null
      }
    });

    const input = screen
      .getByText(/This is an hourly resource/i)
      // eslint-disable-next-line testing-library/no-node-access
      .closest('fieldset');

    await user.click(screen.getByLabelText(/Total Contract Cost/i));
    await user.tab();
    await waitFor(() => {
      expect(within(input).getByLabelText('Yes')).toHaveFocus();
    });
    await user.tab();
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
    const { user } = await setup({
      ...defaultProps,
      item: {
        ...defaultProps.item,
        hourly: {
          1066: { hours: null, rate: null },
          1067: { hours: null, rate: null }
        },
        useHourly: null
      }
    });

    const input = screen
      .getByText(/This is an hourly resource/i)
      // eslint-disable-next-line testing-library/no-node-access
      .closest('fieldset');

    await user.click(within(input).getByLabelText('Yes'));
    // you need to go back up so that the fields appear and it doesn't just tab to cancel
    await user.click(screen.getByLabelText(/Total Contract Cost/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/Total Contract Cost/i)).toHaveFocus();
    });
    await user.tab(); // hourly resource radio button
    await user.tab(); // hours 1066
    await user.tab(); // rates 1066
    await user.tab(); // hours 1067
    await user.tab(); // rates 1067
    await user.tab(); // out of hourly costs

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    expect(
      await screen.findAllByText(/number of hours greater than or equal/i)
    ).toHaveLength(2);
    expect(
      await screen.findAllByText(/hourly rate greater than or equal/i)
    ).toHaveLength(2);
  });

  test('renders error when useHourly is no and yearly costs are null', async () => {
    const { user } = await setup({
      ...defaultProps,
      item: {
        ...defaultProps.item,
        useHourly: null,
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

    await user.click(within(input).getByLabelText('No'));
    // you need to go back up so that the fields appear and it doesn't just tab to cancel
    await user.click(screen.getByLabelText(/Total Contract Cost/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/Total Contract Cost/i)).toHaveFocus();
    });
    await user.tab(); // hourly resource radio button
    await user.tab(); // cost 1066
    await user.tab(); // cost 1067
    await user.tab(); // out of yearly costs

    await waitFor(() => {
      expect(defaultProps.setFormValid).toHaveBeenCalledTimes(1);
    });
    expect(defaultProps.setFormValid).toHaveBeenLastCalledWith(false);

    expect(
      await screen.findAllByText(/an annual cost greater than/i)
    ).toHaveLength(2);
  });
});
