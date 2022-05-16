import React from 'react';
import {
  renderWithConnection,
  act,
  screen
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import { plain as ApdOverview } from './ApdOverview';

jest.mock('../../../util/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}));

const defaultProps = {
  addApdYear: jest.fn(),
  name: 'apd #1',
  narrativeHIE: 'narrative HIE',
  narrativeHIT: 'narrative HIT',
  narrativeMMIS: 'narrative MMIS',
  programOverview: '',
  removeApdYear: jest.fn(),
  setHIE: jest.fn(),
  setHIT: jest.fn(),
  setMMIS: jest.fn(),
  setName: jest.fn(),
  setOverview: jest.fn(),
  years: ['2022','2023'],
  yearOptions: ['2022','2023','2024']
};

const setup = async (props = {}) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const renderUtils = await act(async () => {
    renderWithConnection(<ApdOverview {...defaultProps} {...props} />, {
      initialState: {
        apd: {
          data: {
            activities: []
          }
        }
      }
    });
  });
  return renderUtils;
};

describe('APD overview component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  test('dispatches on text change', async () => {
    await setup();

    userEvent.type(screen.getByLabelText('Introduction'), 'it is really cool');
    expect(screen.getByLabelText('Introduction')).toHaveValue(
      'it is really cool'
    );
  });

  test('user can add a year', async () => {
    await setup();
    expect(screen.getByLabelText('2022')).toBeChecked();
    expect(screen.getByLabelText('2023')).toBeChecked();
    expect(screen.getByLabelText('2024')).not.toBeChecked();

    userEvent.click(screen.getByLabelText('2024'));
    expect(screen.getByLabelText('2024')).toBeChecked();
  });

  test('user can attempt to delete a year and cancel', async () => {
    await setup();
    expect(screen.getByLabelText('2022')).toBeChecked();
    userEvent.click(screen.getByLabelText('2022'));

    await screen.findByRole('alertdialog');
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByLabelText('2022')).toBeChecked();
  });

  test('user can delete a year', async () => {
    await setup();
    expect(screen.getByLabelText('2022')).toBeChecked();
    userEvent.click(screen.getByLabelText('2022'));

    await screen.findByRole('alertdialog');
    userEvent.click(screen.getByRole('button', { name: 'Delete FFY' }));

    expect(screen.getByLabelText('2022')).not.toBeChecked();
  });
});
