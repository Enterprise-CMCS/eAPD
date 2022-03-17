import React from 'react';
import {
  renderWithConnection,
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

const setup = (props = {}) => {
  return renderWithConnection(<ContractorForm {...defaultProps} {...props} />);
};

const verifyDateField = (text, expectValue) => {
  const fieldset = within(screen.getByText(text).closest('fieldset'));
  expect(fieldset.getByLabelText('Month')).toHaveValue(expectValue.month);
  expect(fieldset.getByLabelText('Day')).toHaveValue(expectValue.day);
  expect(fieldset.getByLabelText('Year')).toHaveValue(expectValue.year);
};

const verifyHourlyField = expectValue => {
  const fieldset = within(
    screen.getByText(/This is an hourly resource/i).closest('fieldset')
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
  test('renders correctly', () => {
    setup();
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
  });

  test('renders error when name is null', async () => {
    setup({});

    const input = screen.getByRole('textbox', { name: /name/i });

    userEvent.clear(input);
    userEvent.tab();

    expect(defaultProps.setFormValid).toHaveBeenCalledWith(false);

    await waitFor(() =>
      expect(
        screen.findByText('Provide a private contractor or vendor name.')
      ).toBeTruthy()
    );
  });

  test('renders error when name is empty string', async () => {
    setup({});

    const input = screen.getByRole('textbox', { name: /name/i });

    userEvent.clear(input);
    userEvent.type(input, '');
    userEvent.tab();

    expect(defaultProps.setFormValid).toHaveBeenCalledWith(false);

    await waitFor(() =>
      expect(
        screen.getByText('Provide a private contractor or vendor name.')
      ).toBeTruthy()
    );
  });

  test('renders error when description is null', async () => {
    await setup({
      ...defaultProps,
      item: {
        ...defaultProps.item,
        description: null
      }
    });

    userEvent.click(
      screen.getByLabelText(
        /Procurement Methodology and Description of Services/i
      )
    );
    userEvent.click(document.body);

    await waitFor(() => {
      expect(
        screen.findByText(
          /Provide a procurement methodology and description of services/i
        )
      ).toBeTruthy();
    });
  });

  test('renders error when start date is null', async () => {
    setup({});

    const fieldset = within(
      screen.getByText(/Contract start date/i).closest('fieldset')
    );

    userEvent.clear(fieldset.getByLabelText('Month'));
    userEvent.click(document.body);

    await waitFor(() => {
      expect(screen.getByText(/Provide a start date/i)).toBeTruthy();
    });
  });

  test('renders error when total cost is null', async () => {
    setup({});

    const input = screen.getByLabelText(/Total Contract Cost/i);

    userEvent.clear(input);
    userEvent.tab();

    await waitFor(() =>
      expect(defaultProps.setFormValid).toHaveBeenCalledWith(false)
    );

    await waitFor(() =>
      expect(
        screen.findByText(
          /Provide a contract cost greater than or equal to $0/i
        )
      ).toBeTruthy()
    );
  });
});
