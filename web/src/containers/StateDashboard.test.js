import React from 'react';
import StateDashboard from './StateDashboard';
import { renderWithConnection } from '../shared/apd-testing-library';
import mockAxios from '../util/api';
import { STATE_AFFILIATION_STATUSES } from '../constants';

jest.mock('../util/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}));

const data = {
  stateAdmins: [{ email: 'mo-state-admin@mo.gov'}]
}

mockAxios.get.mockImplementation(() => Promise.resolve({ data }));

let renderUtils;

const apd = {
  id: '1',
  name: 'Sample APD',
  updated: '2020-07-27 17:50:02.834242+00',
  created: '2020-07-28 20:20:56.835976+00',
  state: 'MO',
  status: 'draft'
};
const createdStr = 'July 27, 2020';
const updatedStr = 'July 28, 2020, 3:20 PM EDT';

let initialProps = {
  apds: [],
  fetching: false,
  createApd: jest.fn(),
  deleteApd: jest.fn(),
  selectApd: jest.fn(),
  stateAdmins: [{ email: 'mo-state-admin@mo.gov' }],
  route: '/apd',
  state: { id: 'mo' },
  stateStatus: STATE_AFFILIATION_STATUSES.REQUESTED
};

const setup = (props) =>
  renderWithConnection(<StateDashboard {...initialProps} {...props} />, {});

describe('<StateDashboard />', () => {
  describe('pending state', () => {
    it('should display the eAPD Logo', () => {
      const { getByTestId } = setup();
      expect(getByTestId('eAPDlogo')).toBeTruthy();
    });

    xit('should display introduction, but not instruction', () => {
      const { queryByText } = renderUtils;
      expect(
        queryByText(
          /The CMS HITECH APD app is the new way to create and manage/i
        )
      ).toBeTruthy();
      expect(queryByText(/All your state's APDs are listed here./i)).toBeNull();
    });

    xit("shouldn't display the create APD button", () => {
      const { queryByRole } = renderUtils;
      expect(queryByRole('button', { name: /create/i })).toBeNull();
    });

    xit("shouldn't display the empty APD message", () => {
      const { queryByText } = renderUtils;
      expect(queryByText(/You have not created any APDs./i)).toBeNull();
    });

    xit('should display the pending message', () => {
      const { getByAltText, getByText } = renderUtils;
      expect(getByAltText(/Puzzle Piece Icon/i)).toBeTruthy();
      expect(
        getByText(/Approval Pending From State Administrator/i)
      ).toBeTruthy();
      expect(getByText("State Administrator", { selector: 'a' }).href).toBe("mailto:mo-state-admin@mo.gov")
    });
  });

  describe('denied state', () => {
    beforeEach(() => {
      renderUtils = renderWithConnection(<StateDashboard {...props} />, {
        initialState: {
          user: {
            data: {
              state: { id: 'mo' },
              affiliations: [
                { state_id: 'mo', status: STATE_AFFILIATION_STATUSES.DENIED }
              ]
            }
          }
        }
      });
    });

    xit('should display the denied message', () => {
      const { getByAltText, getByText } = renderUtils;
      expect(getByAltText(/Puzzle Piece Icon/i)).toBeTruthy();
      expect(getByText(/Approval Has Been Denied/i)).toBeTruthy();
    });
  });

  describe('revoked state', () => {
    beforeEach(() => {
      renderUtils = renderWithConnection(<StateDashboard {...props} />, {
        initialState: {
          user: {
            data: {
              state: { id: 'mo' },
              affiliations: [
                { state_id: 'mo', status: STATE_AFFILIATION_STATUSES.REVOKED }
              ]
            }
          }
        }
      });
    });

    xit('should display the revoked message', () => {
      const { getByAltText, getByText } = renderUtils;
      expect(getByAltText(/Puzzle Piece Icon/i)).toBeTruthy();
      expect(getByText(/Approval Permissions Revoked/i)).toBeTruthy();
    });
  });

  describe('default state, no apds', () => {
    beforeEach(() => {
      mockAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));
      renderUtils = renderWithConnection(
        <StateDashboard {...props} pending={false} />,
        {
          initialState: {
            user: {
              data: {
                state: { id: 'mo' },
                affiliations: [
                  {
                    state_id: 'mo',
                    status: STATE_AFFILIATION_STATUSES.APPROVED
                  }
                ]
              }
            }
          }
        }
      );
    });

    xit('should display the introduction and instructions', () => {
      const { queryByText } = renderUtils;
      expect(
        queryByText(
          /The CMS HITECH APD app is the new way to create and manage/i
        )
      ).toBeTruthy();
      expect(queryByText(/All your state's APDs are listed here./i)).toBeNull();
    });

    xit('should handle clicking the create APD button', async () => {
      mockAxios.post.mockImplementation(() => Promise.resolve({ data: apd }));
      const { queryByRole } = renderUtils;
      expect(queryByRole('button', { name: /Create new/i })).toBeTruthy();
      // fireEvent.click(queryByRole('button', { name: /Create new/i }));
      // expect(props.createApd).toHaveBeenCalled();
    });

    xit('should display the empty APD message', () => {
      const { queryByText } = renderUtils;
      expect(queryByText(/You have not created any APDs./i)).toBeTruthy();
    });

    xit("shouldn't display the pending message", () => {
      const { queryByAltText, queryByText } = renderUtils;
      expect(queryByAltText(/Puzzle Piece Icon/i)).toBeNull();
      expect(
        queryByText(/Approval Pending From State Administrator/i)
      ).toBeNull();
    });
  });

  describe('default state with apds', () => {
    beforeEach(() => {
      mockAxios.get.mockImplementation(() => Promise.resolve({ data: [apd] }));
      renderUtils = renderWithConnection(
        <StateDashboard {...props} pending={false} />,
        {
          initialState: {
            user: {
              data: {
                state: { id: 'mo' },
                affiliations: [
                  {
                    state_id: 'mo',
                    status: STATE_AFFILIATION_STATUSES.APPROVED
                  }
                ]
              }
            },
            apd: {
              byId: {
                [apd.id]: {
                  ...apd,
                  created: createdStr,
                  updated: updatedStr
                }
              }
            }
          }
        }
      );
    });

    xit('should display the APD', () => {
      const { getByText } = renderUtils;
      expect(getByText(apd.name)).toBeTruthy();
      expect(getByText(updatedStr)).toBeTruthy();
      expect(getByText(createdStr)).toBeTruthy();
    });

    xit('should allow the user to click on the APD to edit', () => {
      const { getByText } = renderUtils;
      expect(getByText(apd.name)).toBeTruthy();
      // fireEvent.click(getByText(apd.name));
      // expect(props.selectApd).toHaveBeenCalledWith(apd.id, props.route);
    });

    xit('should allow the user to click the delete APD button', () => {
      const { getByText } = renderUtils;
      expect(getByText(/Delete/i)).toBeTruthy();
      // fireEvent.click(getByText(/Delete/i));
      // expect(props.deleteApd).toHaveBeenCalledWith(apd);
    });
  });
});
