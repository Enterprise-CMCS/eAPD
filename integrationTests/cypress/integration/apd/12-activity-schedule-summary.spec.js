// E2E tests for activity schdule summary

import ExportPage from "../../page-objects/export-page";
import ActivitySchedulePage from "../../page-objects/activity-schedule-page";

/* eslint no-return-assign: "off" */

describe('Activity Schedule Summary', () => {
  const schedulePage = new ActivitySchedulePage();
  const exportPage = new ExportPage();

  // Create APD as state staff
  let apdURL;

  before(() => {
    cy.useStateStaff();
    cy.findByRole('button', { name: /Create new/i }).click();
    cy.url().should('contain', '/apd');
    cy.location('pathname').then(pathname => apdURL = pathname);
  });

  describe('Default Values in Activity Schedules', () => {
    let apdActivityScheduleURL;

    // Navigate to activity schedule page
    before(() => {
      cy.useStateStaff(apdURL);
      cy.get('a.ds-c-vertical-nav__label')
        .contains(/Activity Schedule Summary/i).click();
      cy.url().should('contain', '/schedule-summary');
      cy.location('pathname').then(pathname => apdActivityScheduleURL = pathname);
    });

    beforeEach(() => {
      cy.useStateStaff(apdActivityScheduleURL);
      // Check that the page has loaded
      cy.findByRole('heading', { name: /^Activity Schedule Summary$/i })
    });

    describe('Activities Overview', () => {
      it('Only one activity in the Activity List Overview', () => {
        schedulePage.getAllActivityOverviews()
          .should('have.length', 1);
      });
  
      it('Activity is called "Activity 1: Program Administration Milestones"', () => {
        // Activity 1 has index 0
        schedulePage.getActivityOverviewName(0)
          .should('eq', 'Activity 1: Program Administration Milestones');
      });
  
      it('Activity date range is "Date not specified - Date not specified"', () => {
        schedulePage.getActivityOverviewDates(0)
          .should('eq', 'Date not specified - Date not specified');
      });
    })

    describe('Milestones', () => {
      it('Only one activity in Milestone Tables', () => {
        schedulePage.getAllMilestoneTables()
          .should('have.length', 1);
      });
  
      it('Milestone is called "Activity 1: Program Administration Milestones"', () => {
        // Activity 1 has index 0
        schedulePage.getMilestoneTableName(0)
          .should('eq', 'Activity 1: Program Administration Milestones');
      });
  
      it('Activity 1 milestones are blank', () => {
        // Get the first milestone for Activity 1
        schedulePage.getAllActivityMilestones(0)
        .should('have.length', 0);
      });
    })

  });

  describe('Default Values in Export View', () => {
    // Get URL for export view
    let apdExportURL;

    // Navigate to activity schedule page
    before(() => {
      cy.useStateStaff(apdURL);

      // Navigate to export data page
      cy.get('a.ds-c-vertical-nav__label').contains(/Export and Submit/i).click();
      cy.findByRole('button', { name: /Continue to Review/i }).click();
      cy.url().should('contain', '/print');
      cy.location('pathname').then(pathname => apdExportURL = pathname);
    });

    beforeEach(() => {
      cy.useStateStaff(apdExportURL);
      // Check that the page has loaded
      cy.findByRole('heading', { name: /^Activity Schedule Summary$/i })
    });
    
    describe('Activities Overview', () => {
      it('Only one activity in the Activity List Overview', () => {
        exportPage.getAllActivityScheduleOverviews()
          .should('have.length', 1);
      });
  
      it('Activity is called "Activity 1: Program Administration Milestones"', () => {
        // Activity 1 has index 0
        exportPage.getActivityScheduleOverviewName(0)
          .should('eq', 'Activity 1: Program Administration Milestones');
      });
  
      it('Activity date range is "Date not specified - Date not specified"', () => {
        exportPage.getActivityScheduleOverviewDates(0)
          .should('eq', 'Date not specified - Date not specified');
      });
    })

    describe('Milestones', () => {
      it('Only one activity in Milestone Tables', () => {
        exportPage.getAllActivityScheduleMilestoneTables()
          .should('have.length', 1);
      });
  
      it('Milestone is called "Activity 1: Program Administration Milestones"', () => {
        // Activity 1 has index 0
        exportPage.getActivityScheduleMilestoneTableName(0)
          .should('eq', 'Activity 1: Program Administration Milestones');
      });
  
      it('Activity 1 milestones are blank', () => {
        // Get the first milestone for Activity 1
        exportPage.getAllActivityScheduleMilestones(0)
          .should('have.length', 0);
      });
    })

  });
 
})
