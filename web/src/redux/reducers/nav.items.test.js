import staticItems, { getItems } from './nav.items';

describe('getItems', () => {
  describe('activities nav items', () => {
    it('returns with activites dashboard as the first item', () => {
      const apdId = '0123456789abcdef01234567';
      const apdType = 'MMIS';
      const url = '/apd/0123456789abcdef01234567/activities';
      const activities = [{ name: 'Thing X' }, { name: 'Thing Y' }];
      const items = getItems({ apdId, apdType, activities, url });

      const activitiesNavItem = items.find(i => i.label === 'Activities');
      const activitiesDashboard = activitiesNavItem.items[0];
      expect(activitiesDashboard.label).toBe('Activities Dashboard');
      expect(activitiesDashboard.url).toBe(`/apd/${apdId}/activities`);
    });

    it('returns with each activity in the activities items', () => {
      const apdId = '0123456789abcdef01234567';
      const apdType = 'MMIS';
      const url = '/apd/0123456789abcdef01234567/activities';
      const activities = [{ name: 'Thing X' }, { name: 'Thing Y' }];
      const items = getItems({ apdId, apdType, activities, url });

      const activitiesNavItem = items.find(i => i.label === 'Activities');

      // activities nav items always include Activities Dashboard as the first item
      expect(activitiesNavItem.items.length).toBe(activities.length + 1);
      const firstActivity = activitiesNavItem.items[1];
      expect(firstActivity.label).toBe('Activity 1: Thing X');
      const secondActivity = activitiesNavItem.items[2];
      expect(secondActivity.label).toBe('Activity 2: Thing Y');
    });

    it('returns with activities dashboard as the only item when activities is empty', () => {
      const apdId = '0123456789abcdef01234567';
      const apdType = 'MMIS';
      const url = '/apd/0123456789abcdef01234567/activities';
      const activities = [];
      const items = getItems({ apdId, apdType, activities, url });

      const activitiesNavItem = items.find(i => i.label === 'Activities');
      expect(activitiesNavItem.items.length).toBe(1);
      const activitiesDashboard = activitiesNavItem.items[0];
      expect(activitiesDashboard.label).toBe('Activities Dashboard');
    });

    it("sets the activity as selected when that activity's url is passed in", () => {
      // the 0 indicates the activity index in the list of activites
      const firstActivityUrl = '/apd/0123456789abcdef01234567/activity/0/ffp';
      const apdId = '0123456789abcdef01234567';
      const apdType = 'MMIS';
      const activities = [{ name: 'Thing X' }, { name: 'Thing Y' }];
      const items = getItems({
        apdId,
        apdType,
        activities,
        url: firstActivityUrl
      });

      const activitiesNavItem = items.find(i => i.label === 'Activities');
      expect(activitiesNavItem.selected).toBe(true);

      const firstActivity = activitiesNavItem.items[1];
      expect(firstActivity.selected).toBe(true);
      const activitiesDashboard = activitiesNavItem.items[0];
      expect(activitiesDashboard.selected).toBe(false);
      const secondActivity = activitiesNavItem.items[2];
      expect(secondActivity.selected).toBe(false);
    });

    it("sets the activity as selected when that activity's Activities Dashboard url is passed in", () => {
      const activitiesDashboardUrl = '/apd/0123456789abcdef01234567/activities';
      const apdId = '0123456789abcdef01234567';
      const apdType = 'MMIS';
      const activities = [{ name: 'Thing X' }, { name: 'Thing Y' }];
      const items = getItems({
        apdId,
        apdType,
        activities,
        url: activitiesDashboardUrl
      });

      const activitiesNavItem = items.find(i => i.label === 'Activities');
      expect(activitiesNavItem.selected).toBe(true);

      const activitiesDashboard = activitiesNavItem.items[0];
      expect(activitiesDashboard.selected).toBe(true);
      const firstActivity = activitiesNavItem.items[1];
      expect(firstActivity.selected).toBe(false);
      const secondActivity = activitiesNavItem.items[2];
      expect(secondActivity.selected).toBe(false);
    });
  });
});
