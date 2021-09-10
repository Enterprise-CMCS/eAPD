// E2E tests for activity schedule summary

import ExportPage from '../../page-objects/export-page';
import ActivitySchedulePage from '../../page-objects/activity-schedule-page';

/* eslint no-return-assign: "off" */

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
    });

    describe('Activities Overview', () => {
      it('Only one activity in the Activity List Overview', () => {
        schedulePage.getAllActivityOverviews().should('have.length', 2);
      });

      it('Activity is called "Activity 1: Program Administration Milestones"', () => {
        // Activity 1 has index 0
        schedulePage
          .getActivityOverviewName(0)
          .should('eq', 'Activity 1: Program Administration Milestones');
      });

      it('Activity date range is "7/14/2021 - 3/12/2024"', () => {
        schedulePage
          .getActivityOverviewDates(0)
          .should('eq', '7/14/2021 - 3/12/2024');
      });

      it('Activity is called "Activity 2: Claims Data Analytics Milestones"', () => {
        // Activity 2 has index 1
        schedulePage
          .getActivityOverviewName(1)
          .should('eq', 'Activity 2: Claims Data Analytics Milestones');
      });

      it('Activity date range is "2/24/2032 - 8/28/2034"', () => {
        schedulePage
          .getActivityOverviewDates(1)
          .should('eq', '2/24/2032 - 8/28/2034');
      });
    });

    describe('Milestones', () => {
      it('Only one activity in Milestone Tables', () => {
        schedulePage.getAllMilestoneTables().should('have.length', 2);
      });

      it('Milestone is called "Activity 1: Program Administration Milestones"', () => {
        // Activity 1 has index 0
        schedulePage
          .getMilestoneTableName(0)
          .should('eq', 'Activity 1: Program Administration Milestones');
      });

      it('Activity 1 milestones are correct', () => {
        // Get the milestones for Activity 1
        schedulePage.getAllActivityMilestones(0).should('have.length', 1);
        schedulePage
          .getActivityMilestoneName(0, 0)
          .should('eq', 'Environmental Scan Completion');
        schedulePage.getActivityMilestoneDates(0, 0).should('eq', '3/2/2022');
      });

      it('Milestone is called "Activity 2: Claims Data Analytics Milestones"', () => {
        // Activity 2 has index 1
        schedulePage
          .getMilestoneTableName(1)
          .should('eq', 'Activity 2: Claims Data Analytics Milestones');
      });

      it('Activity 2 milestones are correct', () => {
        // Get the milestones for Activity 2
        schedulePage.getAllActivityMilestones(1).should('have.length', 2);
        schedulePage
          .getActivityMilestoneName(1, 0)
          .should('eq', 'Completion by the due date');
        schedulePage.getActivityMilestoneDates(1, 0).should('eq', '12/6/2022');
        schedulePage
          .getActivityMilestoneName(1, 1)
          .should('eq', 'Follows the 3 guiding principles');
        schedulePage.getActivityMilestoneDates(1, 1).should('eq', '3/5/2023');
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
    });

    describe('Activities Overview', () => {
      it('Only one activity in the Activity List Overview', () => {
        exportPage.getAllActivityScheduleOverviews().should('have.length', 2);
      });

      it('Activity is called "Activity 1: Program Administration Milestones"', () => {
        // Activity 1 has index 0
        exportPage
          .getActivityScheduleOverviewName(0)
          .should('eq', 'Activity 1: Program Administration Milestones');
      });

      it('Activity date range is "7/14/2021 - 3/12/2024"', () => {
        exportPage
          .getActivityScheduleOverviewDates(0)
          .should('eq', '7/14/2021 - 3/12/2024');
      });

      it('Activity is called "Activity 2: Claims Data Analytics Milestones"', () => {
        // Activity 2 has index 1
        exportPage
          .getActivityScheduleOverviewName(1)
          .should('eq', 'Activity 2: Claims Data Analytics Milestones');
      });

      it('Activity date range is "2/24/2032 - 8/28/2034"', () => {
        exportPage
          .getActivityScheduleOverviewDates(1)
          .should('eq', '2/24/2032 - 8/28/2034');
      });
    });

    describe('Milestones', () => {
      it('Only one activity in Milestone Tables', () => {
        exportPage
          .getAllActivityScheduleMilestoneTables()
          .should('have.length', 2);
      });

      it('Milestone is called "Activity 1: Program Administration Milestones"', () => {
        // Activity 1 has index 0
        exportPage
          .getActivityScheduleMilestoneTableName(0)
          .should('eq', 'Activity 1: Program Administration Milestones');
      });

      it('Activity 1 milestones are correct', () => {
        // Get the milestones for Activity 1
        exportPage.getAllActivityScheduleMilestones(0).should('have.length', 1);
        exportPage
          .getActivityScheduleMilestoneName(0, 0)
          .should('eq', 'Environmental Scan Completion');
        exportPage
          .getActivityScheduleMilestoneDates(0, 0)
          .should('eq', '3/2/2022');
      });

      it('Milestone is called "Activity 2: Claims Data Analytics Milestones"', () => {
        // Activity 2 has index 1
        exportPage
          .getActivityScheduleMilestoneTableName(1)
          .should('eq', 'Activity 2: Claims Data Analytics Milestones');
      });

      it('Activity 2 milestones are correct', () => {
        // Get the milestones for Activity 2
        exportPage.getAllActivityScheduleMilestones(1).should('have.length', 2);
        exportPage
          .getActivityScheduleMilestoneName(1, 0)
          .should('eq', 'Completion by the due date');
        exportPage
          .getActivityScheduleMilestoneDates(1, 0)
          .should('eq', '12/6/2022');
        exportPage
          .getActivityScheduleMilestoneName(1, 1)
          .should('eq', 'Follows the 3 guiding principles');
        exportPage
          .getActivityScheduleMilestoneDates(1, 1)
          .should('eq', '3/5/2023');
      });
    });
  });
});
