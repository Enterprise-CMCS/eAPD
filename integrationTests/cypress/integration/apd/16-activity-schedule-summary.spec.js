// E2E tests for activity schedule summary

import ExportPage from '../../page-objects/export-page';
import ActivitySchedulePage from '../../page-objects/activity-schedule-page';

/* eslint no-return-assign: "off" */

const testActivityListOver = page => {
  cy.get('@data').then(data => {
    data.activityOverview.forEach((activity, index) => {
      const activityId = index + 1; // Activity Id is 1-base and index is 0-based
      const activityName = `Activity ${activityId}: ${activity.name} Milestones`;
      const activityRange = `${activity.startDate.join(
        '/'
      )} - ${activity.endDate.join('/')}`;

      cy.log(`Activity is called ${activityName}`);
      page.getActivityScheduleOverviewName(index).should('eq', activityName);
      cy.log(`Activity date range is "${activityRange}"`);
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
    cy.log({ milestones });
    milestones.forEach(({ names, dates }, index) => {
      const activityId = index + 1; // Activity Id is 1-base and index is 0-based
      const activityName = `Activity ${activityId}: ${data.activityOverview[index].name} Milestones`;
      cy.log(`Milestone is called "${activityName}"`);
      page
        .getActivityScheduleMilestoneTableName(index)
        .should('eq', activityName);

      cy.log(`Activity ${activityId} milestones are correct`);
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

describe('Activity Schedule Summary', () => {
  const schedulePage = new ActivitySchedulePage();
  const exportPage = new ExportPage();

  // Reuse existing APD
  let apdURL;

  before(() => {
    cy.useStateStaff();
    cy.contains('HITECH IAPD').click();
    cy.url().should('contain', '/apd');
    cy.location('pathname').then(pathname => (apdURL = pathname));
  });

  describe('Filled out values in Activity Schedule Summary', () => {
    let apdActivityScheduleURL;

    // Navigate to activity schedule page
    before(() => {
      cy.useStateStaff(apdURL);
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Activity Schedule Summary/i)
        .click();
      cy.url().should('contain', '/schedule-summary');
      cy.location('pathname').then(
        pathname => (apdActivityScheduleURL = pathname)
      );
    });

    beforeEach(() => {
      cy.useStateStaff(apdActivityScheduleURL);
      // Check that the page has loaded
      cy.findByRole('heading', { name: /^Activity Schedule Summary$/i });
      cy.fixture('activity-overview-template.json').as('data');
    });

    describe('Activities Overview', () => {
      it('The correct number of activities in the Activity List Overview', () => {
        cy.get('@data').then(data => {
          schedulePage
            .getAllActivityScheduleOverviews()
            .should('have.length', data.activityOverview.length);
        });
      });

      it('Activity List Overview should show the correct name and date range', () => {
        testActivityListOver(schedulePage);
      });
    });

    describe('Milestones', () => {
      it('Only one activity in Milestone Tables', () => {
        cy.get('@data').then(data => {
          schedulePage
            .getAllActivityScheduleMilestoneTables()
            .should('have.length', data.milestones.length);
        });
      });

      it('Activity Milestones should sow the correct names and dates', () => {
        testActivityMilestone(schedulePage);
      });
    });
  });

  describe('Filled out values in Export View', () => {
    // Get URL for export view
    let apdExportURL;

    // Navigate to activity schedule page
    before(() => {
      cy.useStateStaff(apdURL);

      // Navigate to export data page
      cy.goToExportView();
      cy.url().should('contain', '/print');
      cy.location('pathname').then(pathname => (apdExportURL = pathname));
    });

    beforeEach(() => {
      cy.useStateStaff(apdExportURL);
      // Check that the page has loaded
      cy.findByRole('heading', { name: /^Activity Schedule Summary$/i });
      cy.fixture('activity-overview-template.json').as('data');
    });

    describe('Activities Overview', () => {
      it('Only one activity in the Activity List Overview', () => {
        cy.get('@data').then(data => {
          exportPage
            .getAllActivityScheduleOverviews()
            .should('have.length', data.activityOverview.length);
        });
      });

      it('Activity List Overview should show the correct name and date range', () => {
        testActivityListOver(exportPage);
      });
    });

    describe('Milestones', () => {
      it('Only one activity in Milestone Tables', () => {
        cy.get('@data').then(data => {
          exportPage
            .getAllActivityScheduleMilestoneTables()
            .should('have.length', data.milestones.length);
        });
      });

      it('Activity Milestones should show the correct names and dates', () => {
        testActivityMilestone(exportPage);
      });
    });
  });
});
