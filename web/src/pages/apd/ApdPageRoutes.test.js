import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import ApdPageRoutes from './ApdPageRoutes';
import apd from '../../fixtures/ak-apd.json';
import budget from '../../fixtures/ak-budget.json';
import Router from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useRouteMatch: jest.fn()
}));

const setup = (options = {}) => {
  jest
    .spyOn(Router, 'useRouteMatch')
    .mockReturnValue({ path: '/apd/0123456789abcdef01234567' });
  jest
    .spyOn(Router, 'useParams')
    .mockReturnValue({ apdId: '0123456789abcdef01234567', activityIndex: 0 });
  return renderWithConnection(
    <ApdPageRoutes apdId="0123456789abcdef01234567" />,
    {
      initialState: {
        user: {
          data: {
            state: {
              id: 'na',
              name: 'New Apdland',
              medicaid_office: {
                medicaidDirector: {
                  name: 'Cornelius Fudge',
                  email: 'c.fudge@ministry.magic',
                  phone: '5551234567'
                },
                medicaidOffice: {
                  address1: '100 Round Sq',
                  address2: '',
                  city: 'Cityville',
                  state: 'AK',
                  zip: '12345'
                }
              }
            }
          }
        },
        ...apd,
        ...budget
      },
      ...options
    }
  );
};

describe('<ApdPageRoutes /> component', () => {
  it('redirects on /apd/0123456789abcdef01234567', () => {
    setup({
      initialHistory: ['/apd/0123456789abcdef01234567']
    });
    expect(screen.getByText(/APD Overview/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/0123456789abcdef01234567/apd-overview', () => {
    setup({
      initialHistory: ['/apd/0123456789abcdef01234567/apd-overview']
    });
    expect(screen.getByText(/APD Overview/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/0123456789abcdef01234567/state-profile', () => {
    setup({
      initialHistory: ['/apd/0123456789abcdef01234567/state-profile']
    });
    expect(screen.getByText(/Key State Personnel/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/0123456789abcdef01234567/previous-activities', () => {
    setup({
      initialHistory: ['/apd/0123456789abcdef01234567/previous-activities']
    });
    expect(screen.getByText(/Results of Previous Activities/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/0123456789abcdef01234567/schedule-summary', () => {
    setup({
      initialHistory: ['/apd/0123456789abcdef01234567/schedule-summary']
    });
    expect(screen.getByText(/Activity Schedule Summary/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/0123456789abcdef01234567/proposed-budget', () => {
    setup({
      initialHistory: ['/apd/0123456789abcdef01234567/proposed-budget']
    });
    expect(screen.getByText(/Proposed Budget/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/0123456789abcdef01234567/assurances-and-compliance', () => {
    setup({
      initialHistory: [
        '/apd/0123456789abcdef01234567/assurances-and-compliance'
      ]
    });
    expect(screen.getByText(/Assurances and Compliance/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/0123456789abcdef01234567/executive-summary', () => {
    setup({
      initialHistory: ['/apd/0123456789abcdef01234567']
    });
    expect(screen.getByText(/APD Overview/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/0123456789abcdef01234567/export', () => {
    setup({
      initialHistory: ['/apd/0123456789abcdef01234567/export']
    });
    expect(
      screen.getByRole('button', { name: 'Continue to Review' })
    ).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/0123456789abcdef01234567/activities', () => {
    setup({
      initialHistory: ['/apd/0123456789abcdef01234567/activities']
    });
    expect(screen.getByText('Activities')).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  // it('renders as expected for /apd/0123456789abcdef01234567/activity/0', () => {
  //   setup({
  //     initialHistory: ['/apd/0123456789abcdef01234567/activity/0']
  //   });
  //   expect(
  //     screen.getByText(/Activity 1: Program Administration/i)
  //   ).toBeTruthy();
  //   expect(screen.queryByText(/HITECH IAPD | FFY 2020-2021/)).toBeNull();
  // });
});
