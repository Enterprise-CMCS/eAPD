import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import ApdPageRoutes from './ApdPageRoutes';
import apd from '../fixtures/ak-apd.json';
import budget from '../fixtures/ak-budget.json';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ apdId: 1, activityIndex: 0 })
}));

const setup = (options = {}) => {
  const useRouteMatch = jest.fn().mockReturnValue({ path: '/apd/1' });
  return renderWithConnection(
    <ApdPageRoutes useRouteMatch={useRouteMatch} apdId={1} />,
    {
      initialState: {
        user: {
          data: {
            state: {
              id: 'ak',
              name: 'Alaska',
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
  it('redirects on /apd/1', () => {
    setup({
      initialHistory: ['/apd/1']
    });
    expect(screen.getByText(/APD Overview/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/1/apd-overview', () => {
    setup({
      initialHistory: ['/apd/1/apd-overview']
    });
    expect(screen.getByText(/APD Overview/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/1/state-profile', () => {
    setup({
      initialHistory: ['/apd/1/state-profile']
    });
    expect(screen.getByText(/Key State Personnel/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/1/previous-activities', () => {
    setup({
      initialHistory: ['/apd/1/previous-activities']
    });
    expect(screen.getByText(/Results of Previous Activities/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/1/schedule-summary', () => {
    setup({
      initialHistory: ['/apd/1/schedule-summary']
    });
    expect(screen.getByText(/Activity Schedule Summary/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/1/proposed-budget', () => {
    setup({
      initialHistory: ['/apd/1/proposed-budget']
    });
    expect(screen.getByText(/Proposed Budget/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/1/assurances-and-compliance', () => {
    setup({
      initialHistory: ['/apd/1/assurances-and-compliance']
    });
    expect(screen.getByText(/Assurances and Compliance/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/1/executive-summary', () => {
    setup({
      initialHistory: ['/apd/1']
    });
    expect(screen.getByText(/APD Overview/)).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/1/export', () => {
    setup({
      initialHistory: ['/apd/1/export']
    });
    expect(
      screen.getByRole('button', { name: 'Continue to Review' })
    ).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/1/activities', () => {
    setup({
      initialHistory: ['/apd/1/activities']
    });
    expect(screen.getByText('Activities')).toBeTruthy();
    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders as expected for /apd/1/activity/0', () => {
    setup({
      initialHistory: ['/apd/1/activity/0']
    });
    expect(
      screen.queryByText(/Activity 1: Program Administration/i)
    ).toBeTruthy();
    expect(screen.queryByText(/HITECH IAPD | FFY 2020-2021/)).toBeNull();
  });
});
