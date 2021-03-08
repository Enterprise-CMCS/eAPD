import React from 'react';
import StateDashboard from './StateDashboard';
import { renderWithConnection, screen, userEvent } from '../shared/apd-testing-library';
import mockAxios from '../util/api';
import { STATE_AFFILIATION_STATUSES } from '../constants';

jest.mock('../util/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}));

let props;

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

describe('<StateDashboard />', () => {
  beforeEach(() => {
    props = {
      apds: [],
      fetching: false,
      createApd: jest.fn(),
      deleteApd: jest.fn(),
      selectApd: jest.fn(),
      route: '/apd'
    };
  });
  describe('pending state', () => {
    beforeEach(() => {
      renderWithConnection(<StateDashboard {...props} />, {
        initialState: {
          user: {
            data: {
              state: { id: 'mo' },
              affiliations: [
                { state_id: 'mo', status: STATE_AFFILIATION_STATUSES.REQUESTED }
              ]
            }
          }
        }
      });
    });

    it('should display the eAPD Logo', () => {
      expect(screen.getByTestId('eAPDlogo')).toBeInTheDocument();
    });

    it('should display introduction, but not instruction', () => {
      expect(
        screen.queryByText(
          /The CMS HITECH APD app is the new way to create and manage/i
        )
      ).toBeInTheDocument();
      expect(screen.queryByText(/All your state's APDs are listed here./i)).not.toBeInTheDocument();
    });

    it("shouldn't display the create APD button", () => {
      expect(screen.queryByRole('button', { name: /create/i })).not.toBeInTheDocument();
    });

    it("shouldn't display the empty APD message", () => {
      expect(screen.queryByText(/You have not created any APDs./i)).not.toBeInTheDocument();
    });

    it('should display the pending message', () => {
      expect(screen.getByAltText(/Puzzle Piece Icon/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Approval Pending From State Administrator/i)
      ).toBeInTheDocument();
    });
  });

  describe('denied state', () => {
    beforeEach(() => {
      renderWithConnection(<StateDashboard {...props} />, {
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

    it('should display the denied message', () => {
      expect(screen.getByAltText(/Puzzle Piece Icon/i)).toBeInTheDocument();
      expect(screen.getByText(/Approval Has Been Denied/i)).toBeInTheDocument();
    });
  });

  describe('revoked state', () => {
    beforeEach(() => {
      renderWithConnection(<StateDashboard {...props} />, {
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

    it('should display the revoked message', () => {
      expect(screen.getByAltText(/Puzzle Piece Icon/i)).toBeInTheDocument();
      expect(screen.getByText(/Approval Permissions Revoked/i)).toBeInTheDocument();
    });
  });

  describe('default state, no apds', () => {
    beforeEach(() => {
      mockAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));
      renderWithConnection(
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

    it('should display the introduction and instructions', () => {
      expect(
        screen.queryByText(
          /The CMS HITECH APD app is the new way to create and manage/i
        )
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/All your state's APDs are listed here./i)
      ).not.toBeInTheDocument();
    });

    it('should handle clicking the create APD button', async () => {
      mockAxios.post.mockImplementation(() => Promise.resolve({ data: apd }));
      const name = /Create new/i;
      const createNewButton = screen.queryByRole('button', { name });
      expect(createNewButton).toBeInTheDocument();
      userEvent.click(createNewButton)
      // expect(props.createApd).toHaveBeenCalled();
    });

    it('should display the empty APD message', () => {
      expect(
        screen.queryByText(/You have not created any APDs./i)
      ).toBeInTheDocument();
    });

    it("shouldn't display the pending message", () => {
      expect(
        screen.queryByAltText(/Puzzle Piece Icon/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Approval Pending From State Administrator/i)
      ).not.toBeInTheDocument();
    });
  });

  describe('default state with apds', () => {
    beforeEach(() => {
      mockAxios.get.mockImplementation(() => Promise.resolve({ data: [apd] }));
      renderWithConnection(
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

    it('should display the APD', () => {
      expect(screen.getByText(apd.name)).toBeInTheDocument();
      expect(screen.getByText(updatedStr)).toBeInTheDocument();
      expect(screen.getByText(createdStr)).toBeInTheDocument();
    });

    it('should allow the user to click on the APD to edit', () => {
      const apdName = screen.getByText(apd.name);
      expect(apdName).toBeInTheDocument();
      // userEvent.click(apdName);
      // expect(props.selectApd).toHaveBeenCalledWith(apd.id, props.route);
    });

    it('should allow the user to click the delete APD button', () => {
      window.confirm = jest.fn(() => {});
      const deleteButton = screen.getByText(/Delete/i);
      expect(deleteButton).toBeInTheDocument();
      userEvent.click(deleteButton);
      // expect(props.deleteApd).toHaveBeenCalledWith(apd);
    });
  });
});
