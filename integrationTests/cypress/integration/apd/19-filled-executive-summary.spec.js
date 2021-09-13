// E2E tests for the executive summary page after filling out activities.

import ExecutiveSummaryPage from "../../page-objects/executive-summary-page";
import data from "../../fixtures/activity-overview-template.json"

// const data = require('../../fixtures/activity-overview-template.json');

/* eslint no-return-assign: "off" */
/* eslint func-names: "off" */
/* eslint prefer-arrow-callback: "off" */

describe('Activity Schedule Summary', function () {
  const summaryPage = new ExecutiveSummaryPage();

  // Reuse existing APD
  let apdURL;
  const years = [];

  before(function () {
    cy.useStateStaff();
    cy.contains('HITECH IAPD').click();
    cy.url().should('contain', '/apd');
    cy.location('pathname').then(pathname => apdURL = pathname);

    // Gets list of available years
    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );
  });

  beforeEach(function () {
    cy.fixture('activity-overview-template.json').as('data');
  });

  describe('Fixture Values in Executive Summary', function () {
    let apdSummaryURL;

    // Navigate to executive summary page
    before(function () {
      cy.useStateStaff(apdURL);
      cy.goToExecutiveSummary();
      cy.url().should('contain', '/executive-summary');
      cy.location('pathname').then(pathname => apdSummaryURL = pathname);
    });

    beforeEach(function () {
      cy.useStateStaff(apdSummaryURL);
      // Check that the page has loaded
      cy.findByRole('heading', { name: /^Executive Summary$/i })
    });

    describe('Fixture values in Activities Summary', function () {
      
      it('Fixture names', function () {
        this.data.activityOverview.forEach((activity, index) => {
          summaryPage.getActivityName(index).should('have.text', 
            `Activity ${index + 1}: ${activity.name}`)
        });
      });

      it('Fixture dates', function () {
        const createDate = dateArray => {
          return `${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`
        }

        this.data.activityOverview.forEach((activity, index) => {
          summaryPage.getActivityDates(index)
            .should('have.text', 
              `Start date - End date: ${createDate(activity.startDate)} - `
              + `${createDate(activity.endDate)}`);
        });
      });

      it('Fixture costs', function () {
        /*
        // Activity 1 has staff #2, Activity 2 has staff #3-4
        const staff = [
          this.data.staff.slice(1, 2),
          this.data.staff.slice(2)
        ];
        const expenses = [
          this.data.expenses.slice(1, 2).map(a => a.costs),
          this.data.expenses.slice(2).map(a => a.costs)
        ];
        const contractors = [
          [this.data.privateContractors[0].FFYcosts[1]],
          this.data.privateContractors[1].FFYcosts
        ];
        cy.log(staff);
        cy.log(expenses);
        cy.log(contractors);
        // Create an array of arrays of costs for each activity such that
        // costs[x][y] is the cost of activity x in FFY y
        const costs = [[], []];
        for(let i = 0; i < costs.length; i += 1) {
          for (let j = 0; j < years.length; j += 1) {
            costs[i][j] += staff[i][j] + expenses[i][j] + contractors[i][j];
          }
        }
        */

        it('Fixture total costs', function () {
          summaryPage.getActivityCost(0)
          .should('have.text', 
            'Total cost of activity: $0');
        });
        
      });
      
      /*
      it('Fixture Medicaid costs & Federal Shares', function () {
        summaryPage.getActivityMedicaidCost(0)
          .should('have.text', 
          'Total Computable Medicaid Cost: $0 ($0 Federal share)');
        
          // Repeat for all FFYs
          years.forEach(year => {
          summaryPage.getActivityMedicaidCost(0, year)
            .should('have.text', 
            `FFY ${year}: $0 | Total Computable Medicaid Cost: $0 ($0 Federal share)`);
        })
      });
      it('Clicking edit navigates to activity overview page for activity', function () {
        summaryPage.clickActivityEdit(0);
        cy.location('pathname').should(($pathname) => {
          expect($pathname).to.contain('/activity/0/overview');
        });
      });
      */
      
    });
/*
    describe('Total Cost', function () {
      it('Shows that the selected fiscal years were requested', function () {
        let expected = 'Federal Fiscal Years requested: FFY ';
        for (let i = 0; i < years.length; i += 1) {
          if (i === 0) expected += years[i];
          else expected += `, ${years[i]}`;
        }
        summaryPage.getRequestedFiscalYears()
          .should('have.text', expected);
      });

      it('Total Medicaid cost/Federal share is $0', function () {
        summaryPage.getTotalMedicaidCost()
          .should('have.text', 'Total Computable Medicaid Cost: $0 ($0 Federal share)');
      });

      it('Total Funding Request is $0', function () {
        summaryPage.getTotalFundingRequest()
          .should('have.text', 'Total funding request: $0');
      });

      it('Each FFY costs $0', function () {
        years.forEach(year => {
          summaryPage.getTotalYearCost(year)
            .should('have.text', 
            `FFY ${year}: $0 | $0 Total Computable Medicaid Cost | $0 Federal share`);
        });
      });
    });

    describe('Fixture values in HIT + HIE and MMIS table', function () {
      const costCategories = ['HIT + HIE', 'MMIS'];
      
      costCategories.forEach(category => {
        it(`All ${category} rows are $0`, function () {
          years.forEach(year => {
            summaryPage.getTableRows(category, year)
              .each($el => {
                cy.wrap($el).should('have.text', '$0');
              });
          });
  
          summaryPage.getTableRows(category)
            .each($el => {
              cy.wrap($el).should('have.text', '$0');
          });
        });
      })
      
    });
    */
  });
 
})
