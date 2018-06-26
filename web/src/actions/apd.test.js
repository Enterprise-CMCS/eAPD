import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './apd';
import * as notificationActions from './notification';
import axios from '../util/api';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios);

describe('apd actions', () => {
  it('requestApd should create GET_APD_REQUEST action', () => {
    expect(actions.requestApd()).toEqual({ type: actions.GET_APD_REQUEST });
  });

  it('receiveApd should create GET_APD_SUCCESS action', () => {
    const data = { name: 'foo' };
    expect(actions.receiveApd(data)).toEqual({
      type: actions.GET_APD_SUCCESS,
      data
    });
  });

  it('failApd should create GET_APD_FAILURE action', () => {
    expect(actions.failApd('foo')).toEqual({
      type: actions.GET_APD_FAILURE,
      error: 'foo'
    });
  });

  it('addApdKeyPerson should create ADD_APD_KEY_PERSON action', () => {
    expect(actions.addApdKeyPerson()).toEqual({
      type: actions.ADD_APD_KEY_PERSON
    });
  });

  it('removeApdKeyPerson should create REMOVE_APD_KEY_PERSON action', () => {
    expect(actions.removeApdKeyPerson('id')).toEqual({
      type: actions.REMOVE_APD_KEY_PERSON,
      id: 'id'
    });
  });

  it('requestSave should create SAVE_APD_REQUEST action', () => {
    expect(actions.requestSave()).toEqual({ type: actions.SAVE_APD_REQUEST });
  });

  it('saveSuccess should create SAVE_APD_SUCCESS action', () => {
    expect(actions.saveSuccess()).toEqual({ type: actions.SAVE_APD_SUCCESS });
  });

  it('saveFailure should create SAVE_APD_FAILURE action', () => {
    expect(actions.saveFailure()).toEqual({ type: actions.SAVE_APD_FAILURE });
  });

  it('updateBudget should create UPDATE_BUDGET action', () => {
    const state = { this: 'is', my: 'state ' };
    const store = mockStore(state);

    const expectedActions = [
      {
        type: actions.UPDATE_BUDGET,
        state
      }
    ];

    store.dispatch(actions.updateBudget());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('updateBudgetQuarterlyShare should create UPDATE_BUDGET_QUARTERLY_SHARE action', () => {
    expect(actions.updateBudgetQuarterlyShare('updates')).toEqual({
      type: actions.UPDATE_BUDGET_QUARTERLY_SHARE,
      updates: 'updates'
    });
  });

  describe('update APD', () => {
    it('creates UPDATE_APD action and does not update the budget if the APD years did not change', () => {
      const store = mockStore({});
      const updates = {};
      store.dispatch(actions.updateApd(updates));

      const expectedActions = [
        {
          type: actions.UPDATE_APD,
          updates
        }
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates UPDATE_APD action and UPDATE_BUDGET if the APD years changed', () => {
      const store = mockStore({});
      const updates = { years: true };
      store.dispatch(actions.updateApd(updates));

      const expectedActions = [
        {
          type: actions.UPDATE_APD,
          updates
        },
        {
          type: actions.UPDATE_BUDGET,
          state: {}
        }
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('fetchApd (async)', () => {
    afterEach(() => {
      fetchMock.reset();
    });

    it('creates GET_APD_SUCCESS and UPDATE_BUDGET after successful APD fetch', () => {
      const store = mockStore({});
      fetchMock.onGet('/apds').reply(200, [{ foo: 'bar' }]);

      const expectedActions = [
        { type: actions.GET_APD_REQUEST },
        { type: actions.GET_APD_SUCCESS, data: [{ foo: 'bar' }] },
        { type: actions.UPDATE_BUDGET, state: {} }
      ];

      return store.dispatch(actions.fetchApd()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates GET_APD_FAILURE after unsuccessful APD fetch', () => {
      const store = mockStore({});
      fetchMock.onGet('/apds').reply(403, 'foo');

      const expectedActions = [
        { type: actions.GET_APD_REQUEST },
        { type: actions.GET_APD_FAILURE, error: 'foo' }
      ];

      return store.dispatch(actions.fetchApd()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('fetch APD data if needed (async)', async () => {
    it('fetches data if it is not already loaded', async () => {
      const store = mockStore({
        apd: {
          loaded: false
        }
      });

      const expectedActions = [{ type: actions.GET_APD_REQUEST }];

      await store.dispatch(actions.fetchApdDataIfNeeded());
      expect(store.getActions()).toEqual(
        expect.arrayContaining(expectedActions)
      );
    });

    it('does not fetch data if it is already loaded', async () => {
      const store = mockStore({
        apd: {
          loaded: true
        }
      });

      await store.dispatch(actions.fetchApdDataIfNeeded());
      expect(store.getActions()).toEqual([]);
    });
  });

  describe('save APD to API', () => {
    const state = {
      notification: { open: false, queue: [] },
      apd: {
        data: {
          id: 'id-to-update',
          hieNarrative: 'HIE narrative text',
          hitNarrative: 'HIT narrative text',
          mmisNarrative: 'MMIS narrative text',
          previousActivityExpenses: {
            1066: {
              hie: 'battle of hastings',
              hit: 'moop moop'
            }
          },
          previousActivitySummary: 'other activities happened in the past',
          overview: 'APD overview text',
          years: ['1992', '1993'],
          stateProfile: {
            medicaidDirector: 'an object goes here',
            medicaidOffice: 'an object goes here'
          }
        }
      },
      activities: {
        byId: {
          '1': {
            name: 'activity name',
            fundingSource: 'funding source',
            descShort: 'activity summary',
            descLong: 'activity description',
            altApproach: 'alternatives approach',
            costAllocationDesc: 'cost allocation methodology',
            previousActivitySummary: 'other activities happened in the past',
            previousActivityExpenses: [
              {
                year: 1066,
                hie: 'battle of hastings',
                hit: 'moop moop'
              }
            ],
            otherFundingDesc: 'other funding sources',
            costAllocation: {
              '1993': { ffp: { federal: 90, state: 10 }, other: 0 },
              '1994': { ffp: { federal: 70, state: 20 }, other: 10 }
            },
            goals: [
              { desc: 'goal 1 description', obj: 'objective 1' },
              { desc: 'goal 2 description', obj: 'objective 2' }
            ],
            milestones: [
              { name: 'milestone 1', start: 'start 1', end: 'end 1' },
              { name: 'milestone 2', start: 'start 2', end: 'end 2' }
            ],
            statePersonnel: [
              {
                title: 'title 1',
                desc: 'description 1',
                years: {
                  '1993': { amt: 100, perc: 100 },
                  '1994': { amt: 200, perc: 40 }
                }
              }
            ],
            contractorResources: [
              {
                name: 'name 1',
                desc: 'description 1',
                years: { '1993': 100, '1994': 200 }
              }
            ],
            expenses: [
              {
                category: 'category 1',
                desc: 'description 1',
                years: { '1993': 100, '1994': 200 }
              },
              {
                category: 'category 2',
                desc: 'description 2',
                years: { '1993': 300, '1994': 400 }
              }
            ],
            standardsAndConditions: {
              bizResults: 'business results',
              documentation: 'documentation',
              industry: 'industry standards',
              interoperability: 'interoperability',
              keyPersonnel: 'key personnel',
              leverage: 'leverage',
              minimizeCost: 'minimize cost',
              mitigation: 'mitigation',
              modularity: 'modularity',
              mita: 'mita',
              reporting: 'reporting'
            }
          }
        }
      }
    };

    beforeEach(() => {
      fetchMock.reset();
    });

    it('creates save request and save failure actions if the save fails', () => {
      const store = mockStore(state);
      fetchMock.onPut('/apds/id-to-update').reply(403, [{ foo: 'bar' }]);

      const expectedActions = [
        { type: actions.SAVE_APD_REQUEST },
        {
          type: notificationActions.ADD_NOTIFICATION,
          message: 'Save failed (not-sure-why)'
        },
        { type: actions.SAVE_APD_FAILURE }
      ];

      store.dispatch(actions.saveApd()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates save request and save success actions if the save succeeds', () => {
      const store = mockStore(state);
      fetchMock.onPut('/apds/id-to-update').reply(200, [{ foo: 'bar' }]);

      const expectedActions = [
        { type: actions.SAVE_APD_REQUEST },
        {
          type: notificationActions.ADD_NOTIFICATION,
          message: 'Save successful!'
        },
        { type: actions.SAVE_APD_SUCCESS }
      ];

      store.dispatch(actions.saveApd()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
