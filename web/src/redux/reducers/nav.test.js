import { LOCATION_CHANGE } from 'connected-react-router';
import { APD_ACTIVITIES_CHANGE } from '../actions/editApd/symbols';

import staticItems, { getItems } from './nav.items';
import reducer, { getContinuePreviousLinks } from './nav';

describe('staticItems', () => {
  it('defines the apd resources for hitech within the app', () => {
    const labels = staticItems('0123456789abcdef01234567', 'HITECH').map(
      item => item.label
    );
    expect(labels).toEqual([
      'APD Overview',
      'Key State Personnel',
      'Results of Previous Activities',
      'Activities',
      'Activity Schedule Summary',
      'Proposed Budget',
      'Assurances and Compliance',
      'Executive Summary',
      'Export and Submit'
    ]);
  });

  it('defines the apd resources for mmis within the app', () => {
    const labels = staticItems('0123456789abcdef01234567', 'MMIS').map(
      item => item.label
    );
    expect(labels).toEqual([
      'APD Overview',
      'State Priorities and Scope of APD',
      'Key State Personnel',
      'Results of Previous Activities',
      'Activities',
      'Activity Schedule Summary',
      'Proposed Budget',
      'Security Planning',
      'Assurances and Compliance',
      'Executive Summary',
      'Export and Submit'
    ]);
  });

  it('defines a path without a fragment for each items[0].url', () => {
    // getContinuePreviousLinks() uses this feature of the data to ignore links
    // with #fragments in their URL. A URL #fragment indicates a particular
    // section of a resource.
    staticItems('0123456789abcdef01234567').forEach(item => {
      if (!item.items || !item.items.length) return;
      const hash = item.items[0].url.split('#')[2];
      expect(hash).toBeFalsy();
    });
  });
});

describe('getContinuePreviousLinks()', () => {
  test('first apd page', () => {
    const { continueLink, previousLink } = getContinuePreviousLinks(
      '1',
      '/apd/0123456789abcdef01234567/apd-overview',
      staticItems('0123456789abcdef01234567', 'HITECH')
    );
    expect(continueLink.url).toEqual(
      '/apd/0123456789abcdef01234567/state-profile'
    );
    expect(previousLink).toBeFalsy();
  });

  test('activities list page hitech', () => {
    const apdId = '0123456789abcdef01234567';
    const apdType = 'HITECH';
    const url = '/apd/0123456789abcdef01234567/activities';
    const activities = [{ name: 'Thing X' }, { name: 'Thing Y' }];
    const items = getItems({ apdId, apdType, activities, url });
    const { continueLink, previousLink } = getContinuePreviousLinks(
      apdId,
      url,
      items
    );
    expect(continueLink.url).toEqual(
      '/apd/0123456789abcdef01234567/schedule-summary'
    );
    expect(previousLink.url).toEqual(
      '/apd/0123456789abcdef01234567/previous-activities'
    );
  });

  test('activities list page mmis', () => {
    const apdId = '0123456789abcdef01234567';
    const apdType = 'MMIS';
    const url = '/apd/0123456789abcdef01234567/activities';
    const activities = [{ name: 'Thing X' }, { name: 'Thing Y' }];
    const items = getItems({ apdId, apdType, activities, url });
    const { continueLink, previousLink } = getContinuePreviousLinks(
      apdId,
      url,
      items
    );
    expect(continueLink.url).toEqual(
      '/apd/0123456789abcdef01234567/schedule-summary'
    );
    expect(previousLink.url).toEqual(
      '/apd/0123456789abcdef01234567/previous-activities'
    );
  });

  test('activity page hitech', () => {
    const apdId = '0123456789abcdef01234567';
    const apdType = 'HITECH';
    const url = '/apd/0123456789abcdef01234567/activity/0/ffp';
    const activities = [{ name: 'Thing X' }, { name: 'Thing Y' }];
    const items = getItems({ apdId, apdType, activities, url });
    const { continueLink, previousLink } = getContinuePreviousLinks(
      apdId,
      url,
      items
    );
    expect(continueLink.url).toEqual(
      '/apd/0123456789abcdef01234567/activity/1/overview'
    );
    expect(previousLink.url).toEqual(
      '/apd/0123456789abcdef01234567/activity/0/cost-allocation'
    );
  });

  test('activity page mmis', () => {
    const apdId = '0123456789abcdef01234567';
    const apdType = 'MMIS';
    const url = '/apd/0123456789abcdef01234567/activity/0/ffp';
    const activities = [{ name: 'Thing X' }, { name: 'Thing Y' }];
    const items = getItems({ apdId, apdType, activities, url });
    const { continueLink, previousLink } = getContinuePreviousLinks(
      apdId,
      url,
      items
    );
    expect(continueLink.url).toEqual(
      '/apd/0123456789abcdef01234567/activity/1/overview'
    );
    expect(previousLink.url).toEqual(
      '/apd/0123456789abcdef01234567/activity/0/cost-allocation'
    );
  });

  test('schedule summary page', () => {
    const apdId = '0123456789abcdef01234567';
    const apdType = 'HITECH';
    const url = '/apd/0123456789abcdef01234567/schedule-summary';
    const activities = [{ name: 'Thing X' }, { name: 'Thing Y' }];
    const items = getItems({ apdId, apdType, activities, url });
    const { continueLink, previousLink } = getContinuePreviousLinks(
      apdId,
      url,
      items
    );
    expect(continueLink.url).toEqual(
      '/apd/0123456789abcdef01234567/proposed-budget'
    );
    expect(previousLink.url).toEqual(
      '/apd/0123456789abcdef01234567/activities'
    );
  });

  test('last apd page', () => {
    const { continueLink, previousLink } = getContinuePreviousLinks(
      '1',
      '/apd/0123456789abcdef01234567/export',
      staticItems('0123456789abcdef01234567', 'HITECH')
    );
    expect(continueLink).toBeFalsy();
    expect(previousLink.url).toEqual(
      '/apd/0123456789abcdef01234567/executive-summary'
    );
  });
});

describe('nav reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer({
      apdId: '0123456789abcdef01234567',
      apdType: null,
      activities: [],
      continueLink: null,
      items: staticItems('0123456789abcdef01234567', 'HITECH'),
      previousLink: null
    });
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
          { name: 'Outcomes and metrics' },
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
            pathname: '/apd/0123456789abcdef01234567/proposed-budget',
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
            pathname: '/apd/0123456789abcdef01234567/apd-overview'
          }
        }
      };
      const nextState = reducer(state, { type: LOCATION_CHANGE, ...payload });
      expect(nextState.continueLink.url).toEqual(
        '/apd/0123456789abcdef01234567/state-profile'
      );
    });
  });
});
