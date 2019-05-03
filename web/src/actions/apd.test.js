import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import u from 'updeep';

import * as actions from './apd';
import * as notificationActions from './notification';
import axios from '../util/api';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios);

describe('apd actions', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

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
    expect(actions.addKeyPerson()).toEqual({
      type: actions.ADD_APD_KEY_PERSON
    });
  });

  it('removeApdKeyPerson should create REMOVE_APD_KEY_PERSON action', () => {
    expect(actions.removeKeyPerson('id')).toEqual({
      type: actions.REMOVE_APD_KEY_PERSON,
      index: 'id'
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

  it('selectApdOnLoad should create SET_SELECT_APD_ON_LOAD action if user is not an admin', async () => {
    const store = mockStore({ user: { data: { role: 'not an admin' } } });

    await store.dispatch(actions.selectApdOnLoad());

    expect(store.getActions()).toEqual([
      {
        type: actions.SET_SELECT_APD_ON_LOAD
      }
    ]);
  });

  it('selectApdOnLoad should do nothing if user is an admin', async () => {
    const store = mockStore({ user: { data: { role: 'admin' } } });

    await store.dispatch(actions.selectApdOnLoad());

    expect(store.getActions()).toEqual([]);
  });

  it('selectAPD should create SELECT_APD action, redirect to /apd, and saves APD ID to local storage', async () => {
    const apd = { id: 'apd-id', selected: 'apd goes here' };
    fetchMock.onGet('/apds/apd-id').reply(200, apd);

    const deserialize = sinon.stub().returns('deserialized apd');

    const state = { apd: { byId: { apdID: 'hello there' } } };
    const store = mockStore(state);

    const global = { localStorage: { setItem: sinon.stub() } };
    const pushRoute = route => ({ type: 'FAKE_PUSH', pushRoute: route });

    const expectedActions = [
      { type: actions.SELECT_APD, apd: 'deserialized apd' },
      { type: actions.UPDATE_BUDGET, state },
      { type: 'FAKE_PUSH', pushRoute: '/apd' }
    ];

    await store.dispatch(
      actions.selectApd('apd-id', { deserialize, global, pushRoute })
    );

    expect(store.getActions()).toEqual(expectedActions);
    expect(global.localStorage.setItem.calledWith('last-apd-id', 'apdID'));
    expect(deserialize.calledWith(apd)).toEqual(true);
  });

  it('createRequest should create CREATE_APD_REQUEST action', () => {
    expect(actions.createRequest()).toEqual({
      type: actions.CREATE_APD_REQUEST
    });
  });

  it('createSuccess should create CREATE_APD_SUCCESS action', () => {
    expect(actions.createSuccess()).toEqual({
      type: actions.CREATE_APD_SUCCESS
    });
  });

  it('createFailure should create CREATE_APD_FAILURE action', () => {
    expect(actions.createFailure()).toEqual({
      type: actions.CREATE_APD_FAILURE
    });
  });

  describe('create APD', () => {
    // TODO: But for real.
    it('adds the new APD to the store and switches to it on success', () => {
      const newapd = { id: 'bloop' };
      fetchMock.onPost('/apds').reply(200, newapd);

      const apd = { id: 'apd-id' };
      const deserialize = sinon.stub().returns(apd);

      fetchMock.onGet('/apds/apd-id').reply(200, apd);

      const pushRoute = route => ({ type: 'FAKE_PUSH', pushRoute: route });
      const state = {
        apd: {
          byId: {
            bloop: { hello: 'world' }
          }
        }
      };
      const store = mockStore(state);

      const expectedActions = [
        { type: actions.CREATE_APD_REQUEST },
        { type: actions.CREATE_APD_SUCCESS, data: apd },
        { type: actions.SELECT_APD, apd: { id: 'apd-id' } },
        { type: actions.UPDATE_BUDGET, state },
        { type: 'FAKE_PUSH', pushRoute: '/apd' }
      ];

      return store
        .dispatch(actions.createApd({ deserialize, pushRoute }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('does not do very much if it fails, either', () => {
      fetchMock.onPost('/apds').reply(403);
      const store = mockStore();

      const expectedActions = [
        { type: actions.CREATE_APD_REQUEST },
        { type: actions.CREATE_APD_FAILURE }
      ];

      return store.dispatch(actions.createApd()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('delete an APD', () => {
    it('should handle an API error', () => {
      const store = mockStore();
      fetchMock.onDelete('/apds/apd-id').reply(400);

      return store.dispatch(actions.deleteApd('apd-id')).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.DELETE_APD_REQUEST },
          { type: actions.DELETE_APD_FAILURE }
        ]);
      });
    });

    it('should handle an API success', () => {
      const store = mockStore();
      const fetch = sinon.stub().returns({ type: 'apd fetch' });
      fetchMock.onDelete('/apds/apd-id').reply(200);

      return store.dispatch(actions.deleteApd('apd-id', { fetch })).then(() => {
        expect(store.getActions()).toEqual([
          { type: actions.DELETE_APD_REQUEST },
          { type: actions.DELETE_APD_SUCCESS },
          { type: 'apd fetch' }
        ]);
      });
    });
  });

  it('updateBudget should create UPDATE_BUDGET action', () => {
    const state = { this: 'is', my: 'state ' };
    const store = mockStore(state);

    const expectedActions = [{ type: actions.UPDATE_BUDGET, state }];

    store.dispatch(actions.updateBudget());

    expect(store.getActions()).toEqual(expectedActions);
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

    describe('creates GET_APD_SUCCESS after successful APD fetch', () => {
      it('does not select an APD by default', () => {
        const store = mockStore({ apd: { selectAPDOnLoad: false } });
        fetchMock
          .onGet('/apds')
          .reply(200, [
            { foo: 'bar', status: 'draft' },
            { foo: 'bar', status: 'archived' }
          ]);

        const expectedActions = [
          { type: actions.GET_APD_REQUEST },
          {
            type: actions.GET_APD_SUCCESS,
            // expected the archived APD to have been removed
            data: [{ foo: 'bar', status: 'draft' }]
          }
        ];

        return store.dispatch(actions.fetchApd()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('does not select an APD if there is no local storage', () => {
        const store = mockStore({ apd: { selectAPDOnLoad: true } });
        fetchMock.onGet('/apds').reply(200, [{ foo: 'bar' }]);

        const expectedActions = [
          { type: actions.GET_APD_REQUEST },
          { type: actions.GET_APD_SUCCESS, data: [{ foo: 'bar' }] }
        ];

        const global = {};

        return store.dispatch(actions.fetchApd({ global })).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('does not select an APD if local storage does not contain a last APD ID', () => {
        const store = mockStore({ apd: { selectAPDOnLoad: true } });
        fetchMock.onGet('/apds').reply(200, [{ foo: 'bar' }]);

        const expectedActions = [
          { type: actions.GET_APD_REQUEST },
          { type: actions.GET_APD_SUCCESS, data: [{ foo: 'bar' }] }
        ];

        const global = {
          localStorage: { getItem: sinon.stub().returns(null) }
        };

        return store.dispatch(actions.fetchApd({ global })).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it('selects an APD if local storage contains a last APD ID', async () => {
        const state = {
          apd: { selectAPDOnLoad: true }
        };
        const store = mockStore(state);
        fetchMock.onGet('/apds').reply(200, [{ foo: 'bar' }]);

        const pushRoute = route => ({ type: 'FAKE_PUSH', pushRoute: route });

        const select = sinon.stub().returns({ type: 'SELECT_MOCK' });

        const expectedActions = [
          { type: actions.GET_APD_REQUEST },
          { type: actions.GET_APD_SUCCESS, data: [{ foo: 'bar' }] },
          { type: 'SELECT_MOCK' }
        ];

        const global = {
          localStorage: {
            getItem: sinon.stub().returns('7'),
            setItem: sinon.spy()
          }
        };

        await store.dispatch(actions.fetchApd({ global, pushRoute, select }));

        expect(store.getActions()).toEqual(expectedActions);
        expect(select.calledWith('7', { global, pushRoute })).toEqual(true);
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

  describe('fetch APD data if needed (async)', () => {
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
    const serialize = sinon.mock();
    const serializedApd = {
      activities: [
        {
          alternatives: 'alternatives approach',
          contractorResources: 'contractors',
          costAllocation: 'give us those dollars',
          costAllocationNarrative: 'cost allocation narrative',
          description: 'activity description',
          expenses: 'paper, pens, airplanes, and bouncy castles',
          fundingSource: 'funding source',
          goals: 'build the best Medicaid IT system ever seen',
          id: 'activity 1',
          key: 'activity 1',
          name: 'activity name',
          schedule: 'before the heat death of the universe',
          standardsAndConditions: 'florp',
          statePersonnel: 'the people who work here',
          summary: 'activity summary',
          quarterlyFFP: 'we want money a little at a time'
        },
        {
          alternatives: 'alternatives approach 2',
          costAllocationDesc: 'cost allocation methodology 2',
          description: 'activity description 2',
          fundingSource: 'funding source 2',
          id: 'activity 2',
          key: 'activity 2',
          name: 'activity 2 name',
          otherFundingDesc: 'other funding sources 2',
          summary: 'activity summary 2'
        }
      ],
      federalCitations: 'CFR 395.2362.472462.2352.36 (b) three',
      id: 'id-to-update',
      incentivePayments: 'money to do good work',
      narrativeHIE: 'HIE narrative text',
      narrativeHIT: 'HIT narrative text',
      narrativeMMIS: 'MMIS narrative text',
      programOverview: 'APD overview text',
      pointsOfContact: 'people to call if stuff goes sour',
      previousActivityExpenses: 'money we spent last time',
      previousActivitySummary: 'other activities happened in the past',
      stateProfile: 'we like long walks on the beach',
      summary: 'apd summary',
      years: ['1992', '1993']
    };

    const state = {
      notification: { open: false, queue: [] },
      apd: {
        data: {
          id: 'id-to-update'
        }
      },
      activities: {},
      dirty: {
        data: {
          apd: {},
          activities: {
            byKey: {}
          }
        },
        dirty: true
      }
    };

    beforeEach(() => {
      serialize.resetBehavior();
      serialize.resetHistory();

      // Create a new cloned object for each test because
      // the APD action mutates the returned value.  If
      // we don't reset, each test begins with the results
      // of the previous test's mutations. 😬
      serialize.returns(JSON.parse(JSON.stringify(serializedApd)));

      state.dirty.dirty = true;
      fetchMock.reset();
    });

    it('creates save request but does not actually send save if not dirty', () => {
      state.dirty.dirty = false;
      const store = mockStore(state);
      fetchMock.onPut('/apds/id-to-update').reply(403, [{ foo: 'bar' }]);

      const expectedActions = [
        { type: actions.SAVE_APD_REQUEST },
        {
          type: notificationActions.ADD_NOTIFICATION,
          message: 'Save successful!'
        }
      ];

      return store.dispatch(actions.saveApd({ serialize })).catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(serialize.calledWith(state.apd.data, state.activities)).toEqual(
          true
        );
      });
    });

    it('creates save request and save failure actions if the save fails', () => {
      const store = mockStore(state);
      fetchMock.onPut('/apds/id-to-update').reply(403, [{ foo: 'bar' }]);

      const expectedActions = [
        { type: actions.SAVE_APD_REQUEST },
        { type: actions.SAVE_APD_FAILURE }
      ];

      return store.dispatch(actions.saveApd({ serialize })).catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(serialize.calledWith(state.apd.data, state.activities)).toEqual(
          true
        );
      });
    });

    describe('successful saves when APD props are dirty', () => {
      const defaultDirtyObject = {
        // these get reversed in the process of removing the clean ones
        activities: [{ id: 'activity 2' }, { id: 'activity 1' }],
        id: 'id-to-update',
        pointsOfContact: 'people to call if stuff goes sour',
        summary: 'apd summary',
        years: ['1992', '1993']
      };

      Object.entries({
        'no prop': undefined,
        federalCitations: 'CFR 395.2362.472462.2352.36 (b) three',
        incentivePayments: 'money to do good work',
        narrativeHIE: 'HIE narrative text',
        narrativeHIT: 'HIT narrative text',
        narrativeMMIS: 'MMIS narrative text',
        programOverview: 'APD overview text',
        previousActivityExpenses: 'money we spent last time',
        previousActivitySummary: 'other activities happened in the past',
        stateProfile: 'we like long walks on the beach'
      }).forEach(([prop, content]) => {
        it(`saves correctly when ${prop} is dirty`, () => {
          const store = mockStore(
            u({ dirty: { data: { apd: { [prop]: true } } } }, state)
          );
          fetchMock
            .onPut(
              '/apds/id-to-update',
              content
                ? {
                    ...defaultDirtyObject,
                    [prop]: content
                  }
                : defaultDirtyObject
            )
            .reply(200, { foo: 'bar' });

          const expectedActions = [
            { type: actions.SAVE_APD_REQUEST },
            { type: actions.SAVE_APD_SUCCESS, data: { foo: 'bar' } }
          ];

          return store.dispatch(actions.saveApd({ serialize })).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(
              serialize.calledWith(state.apd.data, state.activities)
            ).toEqual(true);
          });
        });
      });
    });

    describe('successful saves when APD activity props are dirty', () => {
      const defaultDirtyObject = {
        activities: [
          {
            alternatives: 'alternatives approach',
            description: 'activity description',
            fundingSource: 'funding source',
            id: 'activity 1',
            key: 'activity 1',
            name: 'activity name',
            summary: 'activity summary'
          },
          { id: 'activity 2' }
        ],
        id: 'id-to-update',
        pointsOfContact: 'people to call if stuff goes sour',
        summary: 'apd summary',
        years: ['1992', '1993']
      };

      Object.entries({
        'no prop': undefined,
        contractorResources: 'contractors',
        costAllocation: 'give us those dollars',
        costAllocationNarrative: 'cost allocation narrative',
        expenses: 'paper, pens, airplanes, and bouncy castles',
        goals: 'build the best Medicaid IT system ever seen',
        schedule: 'before the heat death of the universe',
        standardsAndConditions: 'florp',
        statePersonnel: 'the people who work here',
        quarterlyFFP: 'we want money a little at a time'
      }).forEach(([prop, content]) => {
        it(`saves correctly when activity ${prop} is dirty`, () => {
          const store = mockStore(
            u(
              {
                dirty: {
                  data: {
                    activities: { byKey: { 'activity 1': { [prop]: true } } }
                  }
                }
              },
              state
            )
          );
          fetchMock
            .onPut(
              '/apds/id-to-update',
              content
                ? u(
                    { activities: { 0: { [prop]: content } } },
                    defaultDirtyObject
                  )
                : defaultDirtyObject
            )
            .reply(200, { foo: 'bar' });

          const expectedActions = [
            { type: actions.SAVE_APD_REQUEST },
            { type: actions.SAVE_APD_SUCCESS, data: { foo: 'bar' } }
          ];

          return store.dispatch(actions.saveApd({ serialize })).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            expect(
              serialize.calledWith(state.apd.data, state.activities)
            ).toEqual(true);
          });
        });
      });
    });
  });

  describe('submit an APD', () => {
    const budget = {
      activities: {
        'activity-key': {
          quarterlyFFP: 'quarterly ffp'
        }
      },
      combined: 'overall combined',
      federalShareByFFYQuarter: 'federal share, ffy quarter',
      hie: {
        hello: 'from hie',
        combined: 'hie combined'
      },
      hit: {
        also: 'from hit',
        combined: 'hit combined'
      },
      hitAndHie: {
        combined: 'hit and hie combined'
      },
      mmis: {
        greetings: 'from mmis',
        combined: 'mmis combined'
      },
      mmisByFFP: 'mmis by ffp'
    };

    beforeEach(() => {
      fetchMock.reset();
    });

    it('sets a notification if the preceding save fails', () => {
      const store = mockStore({
        activities: {
          byKey: { 'activity-key': { name: 'number one best activity' } }
        },
        apd: { data: { id: 'id-to-update' } },
        budget,
        notification: { open: false, queue: [] }
      });

      const save = () => () =>
        Promise.reject(new Error('preceding save failed (set by test)'));
      const spy = jest.spyOn(axios, 'post');

      const expectedActions = [
        {
          type: notificationActions.ADD_NOTIFICATION,
          message: 'Submit failed (not-sure-why)'
        }
      ];

      return store.dispatch(actions.submitAPD(save)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(spy).not.toHaveBeenCalled();
      });
    });

    it('sets a notification if the submission fails', () => {
      const store = mockStore({
        activities: {
          byKey: { 'activity-key': { name: 'number one best activity' } }
        },
        apd: { data: { id: 'id-to-update' } },
        budget,
        notification: { open: false, queue: [] }
      });
      const save = () => () => Promise.resolve();
      const spy = jest.spyOn(axios, 'post');

      fetchMock.onPost('/apds/id-to-update/versions').reply(403);

      const expectedActions = [
        { type: actions.SUBMIT_APD_REQUEST },
        {
          type: notificationActions.ADD_NOTIFICATION,
          message: 'Submit failed (not-sure-why)'
        },
        { type: actions.SUBMIT_APD_FAILURE }
      ];

      return store.dispatch(actions.submitAPD(save)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(spy).toHaveBeenCalled();
      });
    });

    it('sets a notification if the submission succeeds', () => {
      const store = mockStore({
        activities: {
          byKey: { 'activity-key': { name: 'number one best activity' } }
        },
        apd: { data: { id: 'id-to-update' } },
        budget,
        notification: { open: false, queue: [] }
      });
      const save = () => () => Promise.resolve();
      const spy = jest.spyOn(axios, 'post');

      fetchMock.onPost('/apds/id-to-update/versions').reply(204);

      const expectedActions = [
        { type: actions.SUBMIT_APD_REQUEST },
        {
          type: notificationActions.ADD_NOTIFICATION,
          message: 'Submission successful!'
        },
        { type: actions.SUBMIT_APD_SUCCESS }
      ];

      beforeEach(() => {
        fetchMock.reset();
      });

      return store.dispatch(actions.submitAPD(save)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls[0][1]).toMatchObject({
          tables: {
            activityQuarterlyFederalShare: {
              'number one best activity': 'quarterly ffp'
            },
            summaryBudgetTable: {
              hie: { hello: 'from hie', combined: 'hie combined' },
              hit: { also: 'from hit', combined: 'hit combined' },
              mmis: { greetings: 'from mmis', combined: 'mmis combined' },
              total: 'overall combined'
            },
            federalShareByFFYQuarter: 'federal share, ffy quarter',
            programBudgetTable: {
              hitAndHie: {
                hie: 'hie combined',
                hit: 'hit combined',
                hitAndHie: 'hit and hie combined'
              },
              mmis: 'mmis by ffp'
            }
          }
        });
      });
    });
  });

  describe('withdraw an APD submission', () => {
    beforeEach(() => {
      fetchMock.reset();
    });

    it('sets a notification if the withdrawal fails', () => {
      const store = mockStore({
        apd: { data: { id: 'id-to-update' } },
        notification: { open: false, queue: [] }
      });
      const spy = jest.spyOn(axios, 'delete');

      fetchMock.onDelete('/apds/id-to-update/versions').reply(403);

      const expectedActions = [
        { type: actions.WITHDRAW_APD_REQUEST },
        {
          type: notificationActions.ADD_NOTIFICATION,
          message: 'Withdraw failed (not-sure-why)'
        },
        { type: actions.WITHDRAW_APD_FAILURE }
      ];

      return store.dispatch(actions.withdrawApd()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(spy).toHaveBeenCalled();
      });
    });

    it('dispatches an action if the submission succeeds', () => {
      const store = mockStore({
        apd: { data: { id: 'id-to-update' } }
      });
      const spy = jest.spyOn(axios, 'delete');

      fetchMock.onDelete('/apds/id-to-update/versions').reply(204);

      const expectedActions = [
        { type: actions.WITHDRAW_APD_REQUEST },
        { type: actions.WITHDRAW_APD_SUCCESS }
      ];

      beforeEach(() => {
        fetchMock.reset();
      });

      return store.dispatch(actions.withdrawApd()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
