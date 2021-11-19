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
  const schedulePage = new ActivitySchedulePage();

  beforeEach(() => {
    cy.goToActivityScheduleSummary();
    cy.url().should('contain', '/schedule-summary');
  });

  describe('Activities Overview', () => {
    it('Only one activity in the Activity List Overview', () => {
      schedulePage.getAllActivityScheduleOverviews().should('have.length', 1);
    });

    it('Activity is called "Activity 1: Program Administration Milestones"', () => {
      // Activity 1 has index 0
      schedulePage
        .getActivityScheduleOverviewName(0)
        .should('eq', 'Activity 1: Program Administration Milestones');
    });

    it('Activity date range is "Date not specified - Date not specified"', () => {
      schedulePage
        .getActivityScheduleOverviewDates(0)
        .should('eq', 'Date not specified - Date not specified');
    });
  });

  describe('Milestones', () => {
    it('Only one activity in Milestone Tables', () => {
      schedulePage
        .getAllActivityScheduleMilestoneTables()
        .should('have.length', 1);
    });

    it('Milestone is called "Activity 1: Program Administration Milestones"', () => {
      // Activity 1 has index 0
      schedulePage
        .getActivityScheduleMilestoneTableName(0)
        .should('eq', 'Activity 1: Program Administration Milestones');
    });

    it('Activity 1 milestones are empty', () => {
      // Get the first milestone for Activity 1
      schedulePage.getAllActivityScheduleMilestones(0).should('not.exist');
    });
  });
};

export const testDefaultActivityScheduleSummaryExportView = () => {
  const exportPage = new ExportPage();

  describe('Activities Overview', () => {
    it('Only one activity in the Activity List Overview', () => {
      exportPage.getAllActivityScheduleOverviews().should('have.length', 1);
    });

    it('Activity is called "Activity 1: Program Administration Milestones"', () => {
      // Activity 1 has index 0
      exportPage
        .getActivityScheduleOverviewName(0)
        .should('eq', 'Activity 1: Program Administration Milestones');
    });

    it('Activity date range is "Date not specified - Date not specified"', () => {
      exportPage
        .getActivityScheduleOverviewDates(0)
        .should('eq', 'Date not specified - Date not specified');
    });
  });

  describe('Milestones', () => {
    it('Only one activity in Milestone Tables', () => {
      exportPage
        .getAllActivityScheduleMilestoneTables()
        .should('have.length', 1);
    });

    it('Milestone is called "Activity 1: Program Administration Milestones"', () => {
      // Activity 1 has index 0
      exportPage
        .getActivityScheduleMilestoneTableName(0)
        .should('eq', 'Activity 1: Program Administration Milestones');
    });

    it('Activity 1 milestones are empty', () => {
      // Get the first milestone for Activity 1
      exportPage.getAllActivityScheduleMilestones(0).should('not.exist');
    });
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
    cy.goToActivityScheduleSummary();
  });

  it('should be on the correct page', () => {
    cy.url().should('include', '/schedule-summary');
    cy.findByRole('heading', {
      name: /Activity Schedule Summary/i
    }).should('exist');
  });

  it('should display the correct values for the Activity Schedule Summary', () => {
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
