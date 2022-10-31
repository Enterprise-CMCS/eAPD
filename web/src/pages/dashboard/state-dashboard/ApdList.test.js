import React from 'react';
import ApdList from './ApdList';
import {
  renderWithConnection,
  screen
} from '../../../shared/apd-testing-library';
import mockAxios from '../../../util/api';
import { AFFILIATION_STATUSES } from '../../../constants';

jest.mock('../../../util/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}));

let options;
let props;
const defaultProps = {
  apds: [],
  fetching: false,
  createApd: jest.fn(),
  deleteApd: jest.fn(),
  selectApd: jest.fn(),
  route: '/apd',
  error: undefined
};

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

const setup = (props = {}, options = {}) => {
  return renderWithConnection(
    <ApdList {...defaultProps} {...props} />,
    options
  );
};

describe('<ApdList />', () => {
  describe('no apds', () => {
    beforeEach(() => {
      mockAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));
      props = { pending: false };
      options = {
        initialState: {
          user: {
            data: {
              state: { id: 'mo' },
              states: { mo: AFFILIATION_STATUSES.APPROVED },
              activities: ['view-document', 'edit-document']
            }
          }
        }
      };
    });

    it('should display the introduction and instructions', () => {
      setup(props, options);
      expect(
        screen.getByText(
          /The eAPD is designed to help you create and manage your HITECH Advanced Planning Documents/i
        )
      ).toBeTruthy();
    });

    it('should handle clicking the create APD button', async () => {
      mockAxios.post.mockImplementation(() => Promise.resolve({ data: apd }));
      setup(props, options);
      expect(screen.getByRole('link', { name: /Create new/i })).toBeTruthy();
    });

    it('should display the empty APD message', () => {
      setup(props, options);
      expect(screen.getByText(/You have not created any APDs./i)).toBeTruthy();
    });

    it("shouldn't display the pending message", () => {
      setup(props, options);
      expect(screen.queryByAltText(/Puzzle Piece Icon/i)).toBeNull();
      expect(
        screen.queryByText(/Approval Pending From State Administrator/i)
      ).toBeNull();
    });
  });

  describe('default state with apds', () => {
    beforeEach(() => {
      mockAxios.get.mockImplementation(() => Promise.resolve({ data: [apd] }));
      props = { pending: false };
      options = {
        initialState: {
          user: {
            data: {
              state: { id: 'mo' },
              states: { state_id: AFFILIATION_STATUSES.APPROVED },
              activities: ['view-document', 'edit-document']
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
      };
    });

    it('should display the APD', () => {
      setup(props, options);
      expect(screen.getByText(apd.name)).toBeTruthy();
      expect(screen.getByText(updatedStr)).toBeTruthy();
      expect(screen.getByText(createdStr)).toBeTruthy();
    });

    it('should allow the user to click on the APD to edit', () => {
      setup(props, options);
      expect(screen.getByText(apd.name)).toBeTruthy();
    });

    it('should allow the user to click the delete APD button', () => {
      setup(props, options);
      expect(screen.getByText(/Delete/i)).toBeTruthy();
    });
  });
  describe('federal admin viewing state dashboard', () => {
    beforeEach(() => {
      props = {};
      options = {
        initialState: {
          user: {
            data: {
              state: { id: 'mo' },
              affiliations: [
                { state_id: 'mo', status: AFFILIATION_STATUSES.APPROVED }
              ],
              activities: ['not-view-document', 'not-edit-document']
            }
          }
        }
      };
    });

    it('should not display the create apd button', () => {
      setup(props, options);
      expect(screen.queryByText('Create new')).toBeNull();
    });
  });

  // Deleted tests here because the role is not the relevant factor.  This is driven by
  // activities, so changing those is more important than a specific role.
});
