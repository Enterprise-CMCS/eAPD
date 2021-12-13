import React from 'react';
import { renderWithConnection, screen } from '../shared/apd-testing-library';
import userEvent from '@testing-library/user-event';

import ApdSummary from './ApdSummary';

jest.mock('../util/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}));

const defaultProps = {
  addApdYear: jest.fn(),
  removeApdYear: jest.fn(),
  setHIE: jest.fn(),
  setHIT: jest.fn(),
  setMMIS: jest.fn(),
  setOverview: jest.fn()
};

const setup = (props = {}) => {
  return renderWithConnection(<ApdSummary {...defaultProps} {...props} />, {
    initialState: {
      apd: {
        data: {
          id: 123,
          name: 'Test APD',
          activities: [],
          keyPersonnel: [],
          incentivePayments: {
            ehAmt: {
              2020: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
              },
              2021: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
              }
            },
            ehCt: {
              2020: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
              },
              2021: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
              }
            },
            epAmt: {
              2020: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
              },
              2021: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
              }
            },
            epCt: {
              2020: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
              },
              2021: {
                1: 0,
                2: 0,
                3: 0,
                4: 0
              }
            }
          },
          previousActivityExpenses: {
            2020: {
              hithie: {
                federalActual: 0,
                totalApproved: 0
              },
              mmis: {
                90: { federalActual: 0, totalApproved: 0 },
                75: { federalActual: 0, totalApproved: 0 },
                50: { federalActual: 0, totalApproved: 0 }
              }
            },
            2021: {
              hithie: {
                federalActual: 0,
                totalApproved: 0
              },
              mmis: {
                90: { federalActual: 0, totalApproved: 0 },
                75: { federalActual: 0, totalApproved: 0 },
                50: { federalActual: 0, totalApproved: 0 }
              }
            }
          },
          narrativeHIE: 'about hie',
          narrativeHIT: 'about hit',
          narrativeMMIS: 'about mmis',
          programOverview: 'about the program',
          years: ['2020', '2021'],
          yearOptions: ['2020', '2021', '2022']
        },
        byId: {
          123: {
            name: 'Test APD'
          }
        }
      }
    }
  });
};

describe('APD overview component', () => {
  test('dispatches on text change', () => {
    setup();

    userEvent.type(screen.getByLabelText('Introduction'), ' it is really cool');
    expect(screen.getByLabelText('Introduction')).toHaveValue(
      'about the program it is really cool'
    );
  });

  test('user can add a year', () => {
    setup();
    expect(screen.getByLabelText('2020')).toBeChecked();
    expect(screen.getByLabelText('2021')).toBeChecked();
    expect(screen.getByLabelText('2022')).not.toBeChecked();

    userEvent.click(screen.getByLabelText('2022'));
    expect(screen.getByLabelText('2022')).toBeChecked();
  });

  test('user can attempt to delete a year and cancel', async () => {
    setup();
    expect(screen.getByLabelText('2021')).toBeChecked();
    userEvent.click(screen.getByLabelText('2021'));

    await screen.findByRole('alertdialog');
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByLabelText('2021')).toBeChecked();
  });

  test('user can delete a year', async () => {
    setup();
    expect(screen.getByLabelText('2021')).toBeChecked();
    userEvent.click(screen.getByLabelText('2021'));

    await screen.findByRole('alertdialog');
    userEvent.click(screen.getByRole('button', { name: 'Delete FFY' }));

    expect(screen.getByLabelText('2021')).not.toBeChecked();
  });
});
