import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import Router from 'react-router-dom';

import ApdApplication, {
  mapStateToProps,
  mapDispatchToProps
} from './ApdApplication';
import { setApdToSelectOnLoad, selectApd } from '../redux/actions/app';
import apd from '../fixtures/ak-apd.json';
import budget from '../fixtures/ak-budget.json';

import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

const user = {
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
      },
      activities: ['edit-document']
    }
  }
};

const setup = (props = {}, options = {}) => {
  jest
    .spyOn(Router, 'useParams')
    .mockReturnValue({ apdId: '0123456789abcdef01234567' });
  return renderWithConnection(<ApdApplication {...props} />, options);
};

describe('apd (application) component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetLDMocks();
    mockFlags({ adminCheckFlag: true });
  });

  it('renders correctly for non-admin, APD already selected', () => {
    setup(null, {
      initialState: {
        ...user,
        ...apd,
        ...budget
      },
      initialHistory: ['/apd/0123456789abcdef01234567']
    });

    expect(screen.getByText(/HITECH IAPD | FFY 2020-2021/)).toBeTruthy();
  });

  it('renders correct for non-admin, APD selected in URL', () => {
    const { history } = setup(null, {
      initialState: {
        ...user
      },
      initialHistory: ['/apd/0123456789abcdef01234567']
    });

    expect(history.length).toEqual(1);
    expect(history.location.pathname).toEqual('/apd/0123456789abcdef01234567');
  });

  it('renders correctly for non-admin, no APD selected', () => {
    const useParams = jest.fn().mockReturnValue({});
    const { history } = setup(
      {
        useParams
      },
      {
        initialState: {
          ...user
        },
        initialHistory: ['/apd']
      }
    );

    expect(history.length).toEqual(2);
    expect(history.location.pathname).toEqual('/');
  });

  it('renders correctly for admin', () => {
    const { history } = setup(null, {
      initialState: {
        user: {
          data: {
            role: 'eAPD Federal Admin',
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
      initialHistory: ['/apd/0123456789abcdef01234567']
    });
    expect(history.length).toEqual(1);
    expect(history.location.pathname).toEqual('/');
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: {
          created: 'creation date',
          id: '0123456789abcdef01234567',
          name: 'florp',
          years: ['dinkus', 'dorkus', 'durkus']
        }
      },
      user: {
        data: {
          state: 'place',
          role: 'eAPD Federal Admin',
          activities: ['edit-document']
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      apdId: '0123456789abcdef01234567',
      isAdmin: true,
      isEditor: true,
      place: 'place',
      userRole: 'eAPD Federal Admin'
    });

    state.apd.data.id = null;
    delete state.apd.data.years;
    state.user.data.role = 'test role';

    expect(mapStateToProps(state)).toEqual({
      apdId: null,
      isAdmin: false,
      isEditor: true,
      place: 'place',
      userRole: 'test role'
    });
  });

  test('maps dispatch to props', () => {
    jest.restoreAllMocks();
    expect(mapDispatchToProps).toEqual({
      selectApd,
      setApdToSelectOnLoad
    });
  });
});
