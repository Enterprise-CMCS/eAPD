class ActivitySchedulePage {
  getAllActivityOverviews = () => {
    return cy.contains('thead', /Activity List Overview/i)
      .parent()
      .find('tbody>tr')
  };

  getActivityOverview = (index) => {
    return this.getAllActivityOverviews().eq(index);
  }

  // Assumes the name is in the first column of the overview
  getActivityOverviewName = (index) => {
    return this.getActivityOverview(index)
      .find('td')
      .first()
      .invoke('text')
  };

  // Assumes dates are in the last column
  getActivityOverviewDates = (index) => {
    return this.getActivityOverview(index)
      .find('td')
      .last()
      .invoke('text')
  };

  // Get the milestone tables for all activities.
  getAllMilestoneTables = () => {
    return cy.findByRole('heading', { name: /^Milestone Tables by Activity$/i })
      .parent()
      .findAllByRole('table');
  };

  // Return all milestone rows for a given activity.
  getAllActivityMilestones = (activityIndex) => {
    return this.getAllMilestoneTables()
      .eq(activityIndex)
      .find('tbody>tr'); // returns undefined if no milestone was added
  };

  // Assumes the name is the last row in the table header
  getMilestoneTableName = (activityIndex) => {
    return this.getAllMilestoneTables()
      .eq(activityIndex)
      .find('thead>tr')
      .last()
      .invoke('text')
  };

  // Assumes names are in the last column
  getActivityMilestoneName = (activityIndex, milestoneIndex) => {
    return this.getAllActivityMilestones(activityIndex)
      .eq(milestoneIndex)
      .first()
      .invoke('text');
  };

  // Assumes dates are in the last column
  getActivityMilestoneDates = (activityIndex, milestoneIndex) => {
    return this.getAllActivityMilestones(activityIndex)
      .eq(milestoneIndex)
      .last()
      .invoke('text');
  };
}

export default ActivitySchedulePage