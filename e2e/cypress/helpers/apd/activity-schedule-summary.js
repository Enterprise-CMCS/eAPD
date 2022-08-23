import ExportPage from '../../page-objects/export-page';
import ActivitySchedulePage from '../../page-objects/activity-schedule-page';

const testActivityListOver = page => {
  cy.get('@data').then(data => {
    data.activityOverview.forEach((activity, index) => {
      const activityId = index + 1; // Activity Id is 1-base and index is 0-based
      const activityName = `Activity ${activityId}: ${activity.name} Milestones`;
      const activityRange = `${activity.startDate.join(
        '/'
      )} - ${activity.endDate.join('/')}`;

      page.getActivityScheduleOverviewName(index).should('eq', activityName);
      page.getActivityScheduleOverviewDates(index).should('eq', activityRange);
    });
  });
};

const testActivityMilestone = page => {
  cy.get('@data').then(data => {
    const [first, ...rest] = data.milestones;
    // You need to remove the first elements from the first milestone
    // because they were delete in previous tests
    const milestones = [
      { names: first.names.slice(1), dates: first.dates.slice(1) },
      ...rest
    ];
    milestones.forEach(({ names, dates }, index) => {
      const activityId = index + 1; // Activity Id is 1-base and index is 0-based
      const activityName = `Activity ${activityId}: ${data.activityOverview[index].name} Milestones`;
      page
        .getActivityScheduleMilestoneTableName(index)
        .should('eq', activityName);

      page
        .getAllActivityScheduleMilestones(index)
        .should('have.length', names.length);
      names.forEach((name, nameIndex) => {
        page
          .getActivityScheduleMilestoneName(index, nameIndex)
          .should('eq', name);
        page
          .getActivityScheduleMilestoneDates(index, nameIndex)
          .should('eq', dates[nameIndex].join('/'));
      });
    });
  });
};

export const testDefaultActivityScheduleSummary = () => {
  it('should have the default values for Activity Schedule Summary', () => {
    const schedulePage = new ActivitySchedulePage();

    cy.goToActivityScheduleSummary();
    cy.url().should('contain', '/schedule-summary');
    cy.findByRole('heading', { name: 'Activity Schedule Summary' }).should(
      'exist'
    );

    schedulePage.getAllActivityScheduleOverviews().should('have.length', 1);

    // Activity List
    schedulePage
      .getActivityScheduleOverviewName(0)
      .should('eq', 'Activity 1: Program Administration Milestones');

    schedulePage
      .getActivityScheduleOverviewDates(0)
      .should('eq', 'Date not specified - Date not specified');

    // Milestones
    schedulePage
      .getAllActivityScheduleMilestoneTables()
      .should('have.length', 1);

    schedulePage
      .getActivityScheduleMilestoneTableName(0)
      .should('eq', 'Activity 1: Program Administration Milestones');

    schedulePage.getAllActivityScheduleMilestones(0).should('not.exist');
  });

  it('should have the default values for Activity Schedule Summary in the export view', () => {
    const exportPage = new ExportPage();
    cy.goToExportView();

    // Activity List
    exportPage.getAllActivityScheduleOverviews().should('have.length', 1);

    exportPage
      .getActivityScheduleOverviewName(0)
      .should('eq', 'Activity 1: Program Administration Milestones');

    exportPage
      .getActivityScheduleOverviewDates(0)
      .should('eq', 'Dates not specified');

    // Milestones
    exportPage.getAllActivityScheduleMilestoneTables().should('have.length', 1);

    exportPage
      .getActivityScheduleMilestoneTableName(0)
      .should('eq', 'Activity 1: Program Administration Milestones');

    exportPage
      .getAllActivityScheduleMilestones(0)
      .should('contain', 'No milestones to display.');

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testActivityScheduleSummaryWithData = () => {
  let schedulePage;
  let exportPage;

  before(() => {
    schedulePage = new ActivitySchedulePage();
    exportPage = new ExportPage();
  });

  beforeEach(() => {
    cy.fixture('activity-overview-template.json').as('data');
  });

  it('should display the correct values for the Activity Schedule Summary', () => {
    cy.goToActivityScheduleSummary();
    cy.url().should('include', '/schedule-summary');
    cy.findByRole('heading', {
      name: /Activity Schedule Summary/i
    }).should('exist');

    cy.get('@data').then(data => {
      schedulePage
        .getAllActivityScheduleOverviews()
        .should('have.length', data.activityOverview.length);

      testActivityListOver(schedulePage);

      schedulePage
        .getAllActivityScheduleMilestoneTables()
        .should('have.length', data.milestones.length);

      testActivityMilestone(schedulePage);
    });
  });

  it('should display the correct values for the Activity Schedule Summary Export View', () => {
    cy.goToExportView();
    cy.get('@data').then(data => {
      exportPage
        .getAllActivityScheduleOverviews()
        .should('have.length', data.activityOverview.length);
      testActivityListOver(exportPage);

      exportPage
        .getAllActivityScheduleMilestoneTables()
        .should('have.length', data.milestones.length);
      testActivityMilestone(exportPage);

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
  });
};
