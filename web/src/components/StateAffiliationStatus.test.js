import React from 'react';
import StateAffiliationStatus from './StateAffiliationStatus';
import { renderWithConnection } from '../shared/apd-testing-library';
import { STATE_AFFILIATION_STATUSES } from '../constants';

jest.mock('../util/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}));

let props;
let renderUtils;

describe('<StateAffiliationStatus />', () => {
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
      renderUtils = renderWithConnection(<StateAffiliationStatus {...props} />, {
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
      const { getByTestId } = renderUtils;
      expect(getByTestId('eAPDlogo')).toBeTruthy();
    });

    it('should display introduction', () => {
      const { queryByText } = renderUtils;
      expect(
        queryByText(
          /The CMS HITECH APD app is the new way to create and manage/i
        )
      ).toBeTruthy();
    });

    it('should display the pending message', () => {
      const { getByAltText, getByText } = renderUtils;
      expect(getByAltText(/Puzzle Piece Icon/i)).toBeTruthy();
      expect(
        getByText(/Approval Pending From State Administrator/i)
      ).toBeTruthy();
    });
  });

  describe('denied state', () => {
    beforeEach(() => {
      renderUtils = renderWithConnection(<StateAffiliationStatus {...props} />, {
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
      const { getByAltText, getByText } = renderUtils;
      expect(getByAltText(/Puzzle Piece Icon/i)).toBeTruthy();
      expect(getByText(/Approval Has Been Denied/i)).toBeTruthy();
    });
  });

  describe('revoked state', () => {
    beforeEach(() => {
      renderUtils = renderWithConnection(<StateAffiliationStatus {...props} />, {
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
      const { getByAltText, getByText } = renderUtils;
      expect(getByAltText(/Puzzle Piece Icon/i)).toBeTruthy();
      expect(getByText(/Approval Permissions Revoked/i)).toBeTruthy();
    });
  });

});
