class ActivitySchedulePage {
  getAllActivityScheduleOverviews() {
    return cy
      .contains('thead', /Activity List Overview/i)
      .parent()
      .find('tbody>tr');
  }

  getActivityScheduleOverview(index) {
    return this.getAllActivityScheduleOverviews().eq(index);
  }

  // Assumes the name is in the first column of the overview
  getActivityScheduleOverviewName(index) {
    return this.getActivityScheduleOverview(index)
      .find('td')
      .first()
      .invoke('text');
  }

  getActivityScheduleOverviewNameList() {
    const activityNames = [];
    this.getAllActivityScheduleOverviews().each($el => {
      cy.wrap($el)
        .find('td')
        .first()
        .invoke('text')
        .then(text => {
          activityNames.push(text);
        });
    });
    return activityNames;
  }

  // Assumes dates are in the last column
  getActivityScheduleOverviewDates(index) {
    return this.getActivityScheduleOverview(index)
      .find('td')
      .last()
      .invoke('text');
  }

  // Get the milestone tables for all activities.
  getAllActivityScheduleMilestoneTables() {
    return cy
      .findByRole('heading', { name: /^Milestone Tables by Activity$/i })
      .parent()
      .findAllByRole('table');
  }

  // Return all milestone rows for a given activity.
  getAllActivityScheduleMilestones(activityIndex) {
    return this.getAllActivityScheduleMilestoneTables()
      .eq(activityIndex)
      .find('tbody>tr'); // returns undefined if no milestone was added
  }

  // Assumes the name is the last row in the table header
  getActivityScheduleMilestoneTableName(activityIndex) {
    return this.getAllActivityScheduleMilestoneTables()
      .eq(activityIndex)
      .find('thead>tr')
      .last()
      .invoke('text');
  }

  // Assumes names are in the last column
  getActivityScheduleMilestoneName(activityIndex, milestoneIndex) {
    return this.getAllActivityScheduleMilestones(activityIndex)
      .eq(milestoneIndex)
      .children()
      .first()
      .invoke('text');
  }

  // Assumes dates are in the last column
  getActivityScheduleMilestoneDates(activityIndex, milestoneIndex) {
    return this.getAllActivityScheduleMilestones(activityIndex)
      .eq(milestoneIndex)
      .children()
      .last()
      .invoke('text');
  }
}

export default ActivitySchedulePage;
