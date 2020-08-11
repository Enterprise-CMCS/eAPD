import { LOCATION_CHANGE } from 'connected-react-router';
import { APD_ACTIVITIES_CHANGE } from '../actions/editApd/symbols';
import { NAVIGATION_SCROLL_TO_WAYPOINT } from '../actions/app/symbols';

import staticItems from './nav.items';
import reducer, { flatten } from './nav';

describe('staticItems', () => {
  it('defines the apd resources within the app', () => {
    const labels = staticItems.map(item => item.label);
    expect(labels).toEqual([
      "Key State Personnel",
      "Program Summary",
      "Results of Previous Activities",
      "Program Activities",
      "Activity Schedule Summary",
      "Proposed Budget",
      "Assurances and Compliance",
      "Executive Summary",
      "Export and Submit",
    ]);
  });

  it('defines a path without a fragment for eacht items[0].url', () => {
    // getContinuePreviousLinks() uses this feature of the data to ignore links
    // with #fragments in their URL. A URL #fragment indicates a particular
    // section of a resource.
    staticItems.forEach(item => {
      if (!item.items || !item.items.length) return;
      const hash = item.items[0].url.split('#')[2];
      expect(hash).toBeFalsy();
    });
  });
});

describe('nav reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer();
  });

  it('has an initial state', () => {
    expect(state.activities).toEqual([]);
    expect(state.continueLink).toBeFalsy();
    expect(state.items.length).toEqual(9);
    expect(state.key).toBeFalsy();
    expect(state.previousLink).toBeFalsy();
  });

  describe(`action.type: ${APD_ACTIVITIES_CHANGE}`, () => {
    it('updates nav.activities', () => {
      const action = {
        type: APD_ACTIVITIES_CHANGE,
        activities: [
          { name: 'Activity overview' },
          { name: 'Objectives and key results' },
          { name: 'FFP and budget' }
        ]
      };

      const nextState = reducer(state, action);
      expect(nextState.activities.length > 0).toBe(true);
    });
  });

  describe(`action.type: ${LOCATION_CHANGE}`, () => {
    it('updates nav.items', () => {
      const payload = {
        payload: {
          location: {
            pathname: '/apd/proposed-budget',
            hash: '#budget-summary-table'
          }
        }
      };
      const nextState = reducer(state, { type: LOCATION_CHANGE, ...payload });
      expect(nextState.items[5].items[2].selected).toBe(true);
      expect(nextState.items[5].selected).toBe(true);
      expect(nextState.items[5].defaultCollapsed).toBe(false);
    });

    it('updates nav.{continueLink,previousLink}', () => {
      const payload = {
        payload: {
          location: {
            pathname: '/apd/program-summary',
          }
        }
      };
      const nextState = reducer(state, { type: LOCATION_CHANGE, ...payload });
      expect(nextState.continueLink.url).toEqual('/apd/previous-activities');
      expect(nextState.previousLink.url).toEqual('/apd/state-profile');
    });
  });
});
