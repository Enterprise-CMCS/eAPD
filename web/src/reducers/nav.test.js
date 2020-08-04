import { LOCATION_CHANGE } from 'connected-react-router';
import { APD_ACTIVITIES_CHANGE } from '../actions/editApd/symbols';
import { NAVIGATION_SCROLL_TO_WAYPOINT } from '../actions/app/symbols';

import reducer, { links, getSelectedId } from './nav';

describe('links', () => {
  it('defines the resources within the app', () => {
    const labels = links.map(link => link.label);
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
    links.forEach(link => {
      if (!link.items || !link.items.length) return;
      const hash = link.items[0].url.split('#')[2];
      expect(hash).toBeFalsy();
    });
  });
});

describe('getSelectedId()', () => {
  it('uses location.hash to determine the selected nav id', () => {
    const result = getSelectedId({ hash: '#element-id', pathname: 'whatever' });
    expect(result).toEqual('element-id-nav');
  });

  it('uses location.pathname if hash is not present', () => {
    const result = getSelectedId({ pathname: '/you/are/here' });
    expect(result).toEqual('you-are-here-nav');
  });
});

describe('nav reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer();
  });

  it('has an initial state', () => {
    expect(state.links.length).toEqual(9);
    expect(state.continueLink).toBeFalsy();
    expect(state.previousLink).toBeFalsy();
    expect(state.selectedId).toBe('apd-state-profile-nav');
  });

  describe(`action.type: ${APD_ACTIVITIES_CHANGE}`, () => {
    it('updates nav.links using the list of activities', () => {
      const action = {
        type: APD_ACTIVITIES_CHANGE,
        activities: [
          { name: 'Activity overview' },
          { name: 'Objectives and key results' },
          { name: 'FFP and budget' }
        ]
      };

      const nextState = reducer(state, action);
      expect(nextState.links.length > 0).toBeTruthy();

      const activities = nextState.links.find(link => link.label === "Program Activities").items
      expect(activities.length > 0).toBeTruthy();
    });
  });

  describe(`action.type: ${LOCATION_CHANGE}`, () => {
    it('updates nav.selectedId using the URL fragment/hash/#', () => {
      const payload = {
        payload: {
          location: {
            pathname: '/path/to/resource',
            hash: '#element-id'
          }
        }
      };
      const nextState = reducer(state, { type: LOCATION_CHANGE, ...payload });
      expect(nextState.selectedId)
        .toEqual('element-id-nav');  // id of link, used by <Nav /> component
    });

    it('updates nav.selectedId using the URL path', () => {
      const payload = {
        payload: {
          location: {
            pathname: '/path/to/resource',
            hash: null
          }
        }
      };
      const nextState = reducer(state, { type: LOCATION_CHANGE, ...payload });
      expect(nextState.selectedId)
        .toEqual('path-to-resource-nav');  // id of link, used by <Nav /> component
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

  describe(`action.type: ${NAVIGATION_SCROLL_TO_WAYPOINT}, dispatched by <Waypoint />`, () => {
    it('updates nav.selectedId', () => {
      const payload = { waypointId: 'prev-activities-outline' };
      const action = { type: NAVIGATION_SCROLL_TO_WAYPOINT, ...payload };
      const nextState = reducer(state, action);
      expect(nextState.selectedId).toEqual('prev-activities-outline-nav');
    });
  });
});
