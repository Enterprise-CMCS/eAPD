// E2E tests for the executive summary page after filling out activities.

import ExecutiveSummaryPage from "../../page-objects/executive-summary-page";

/* eslint no-return-assign: "off" */
/* eslint func-names: "off" */
/* eslint prefer-arrow-callback: "off" */
/* eslint one-var: "off" */

const addCommas = string => {
  if (string) {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '0';
};

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
    cy.get('[type="checkbox"][checked]').each((_, i, list) =>
      years.push(list[i].value)
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

    let totalActivityCostsByYear, totalActivityCosts,
        totalActivityMedicaidByYear, totalActivityMedicaid,
        fedShares, totalActivityFedSharesByYear, totalActivityFedShares;

    describe('Fixture values in Activities Summary', function () {
      
      it('Fixture names', function () {
        this.data.activityOverview.forEach((activity, i) => {
          summaryPage.getActivityName(i).should('have.text', 
            `Activity ${i + 1}: ${activity.name}`)
        });
      });

      it('Fixture dates', function () {
        const createDate = dateArray => {
          return `${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`
        }

        this.data.activityOverview.forEach((activity, i) => {
          summaryPage.getActivityDates(i)
            .should('have.text', 
              `Start date - End date: ${createDate(activity.startDate)} - `
              + `${createDate(activity.endDate)}`);
        });
      });

      it('Fixture total costs', function () {
        totalActivityCostsByYear = this.data.totals.map(total => 
          total.staff.map((val, i) => 
          val + total.expenses[i] + total.contractors[i]));
        
        totalActivityCosts = 
          totalActivityCostsByYear.map(total => total.reduce((a, b) => a + b));

        totalActivityCosts.forEach((total, i) => {
          summaryPage.getActivityCost(i)
            .should('have.text', 
            `Total cost of activity: $${addCommas(total)}`);
        });
        
      });
      
      it('Fixture Medicaid costs & Federal Shares', function () {
        // All totals are seperated by activity

        totalActivityMedicaidByYear = this.data.totals.map(total => 
          total.staff.map((val, i) => 
          val + total.expenses[i] + total.contractors[i] - total.other[i]));
        totalActivityMedicaid = 
          totalActivityMedicaidByYear.map(total => total.reduce((a, b) => a + b));

        fedShares = this.data.totals.map(total => total.fedShare);
        totalActivityFedSharesByYear = totalActivityMedicaidByYear.map((yearlyTotals, i) =>
          yearlyTotals.map((total, j) => Math.ceil(total * fedShares[i][j])));
        totalActivityFedShares = 
          totalActivityFedSharesByYear.map(total => total.reduce((a, b) => a + b));
        
        for(let i = 0; i < totalActivityMedicaid.length; i += 1) {
          summaryPage.getActivityMedicaidCost(i)
            .should('have.text', 
            `Total Computable Medicaid Cost: `
            + `$${addCommas(totalActivityMedicaid[i])} `
            + `($${addCommas(totalActivityFedShares[i])} Federal share)`);
          
          // Break down by FFY
          for(let j = 0; j < years.length; j += 1) {
            summaryPage.getActivityMedicaidCost(i, years[j])
              .should('have.text', 
              `FFY ${years[j]}: $${addCommas(totalActivityCostsByYear[i][j])} | `
              + `Total Computable Medicaid Cost: `
              + `$${addCommas(totalActivityMedicaidByYear[i][j])} `
              + `($${addCommas(totalActivityFedSharesByYear[i][j])} Federal share)`);
          }
        }
      });
    });

    let totalCostsByYear, totalMedicaidByYear, totalFedShareByYear,
        totalMedicaidCost, totalFedShareCost, totalFundingRequest;

    describe('Total Cost', function () {

      it('Total Medicaid cost/Federal share is correct', function () {
        totalMedicaidCost = totalActivityMedicaid.reduce((a, b) => a + b);
        totalFedShareCost = totalActivityFedShares.reduce((a, b) => a + b);

        summaryPage.getTotalMedicaidCost()
          .should('have.text', 'Total Computable Medicaid Cost: '
          + `$${addCommas(totalMedicaidCost)} `
          + `($${addCommas(totalFedShareCost)} Federal share)`);
      });

      it('Total Funding Request is correct', function () {
        totalFundingRequest = totalActivityCosts.reduce((a, b) => a + b);
        summaryPage.getTotalFundingRequest()
          .should('have.text', 
          `Total funding request: $${addCommas(totalFundingRequest)}`);
      });

      it('Each FFY costs correct amount', function () {
        const calcTotalByYear = (totalActivityByYear) => {
          const result = [];
          for(let j = 0; j < totalActivityByYear.length; j += 1) {
            let total = 0;
            for(let i = 0; i < years.length; i += 1) {
              total += totalActivityByYear[i][j];
            }
            result.push(total);
          }
          return result;
        }

        totalCostsByYear = calcTotalByYear(totalActivityCostsByYear);
        totalMedicaidByYear = calcTotalByYear(totalActivityMedicaidByYear);
        totalFedShareByYear = calcTotalByYear(totalActivityFedSharesByYear);

        years.forEach((year, i) => {
          summaryPage.getTotalYearCost(year)
            .should('have.text', 
            `FFY ${year}: $${addCommas(totalCostsByYear[i])} | `
            + `$${addCommas(totalMedicaidByYear[i])} Total Computable Medicaid Cost | `
            + `$${addCommas(totalFedShareByYear[i])} Federal share`);
        });
      });
    });

    describe('Fixture values in HIT + HIE and MMIS table', function () {
      // Both activities are HIT, not HIE or MMIS
      const sources = ['hit', 'combined'];
      const payers = ['fed', 'state'];

      it(`All HIT + HIE rows have fixture values`, function () {

        sources.forEach(source => {
          summaryPage.getCategoryCells(source, 'fed').each(($el, i) => {
            if (i < totalFedShareByYear.length)
              cy.wrap($el).should('have.text', 
                `$${addCommas(totalFedShareByYear[i])}`);
            else
              cy.wrap($el).should('have.text', `$${addCommas(totalFedShareCost)}`);
          });

          summaryPage.getCategoryCells(source, 'state').each(($el, i) => {
            if (i < totalFedShareByYear.length)
              cy.wrap($el).should('have.text', 
                `$${addCommas(totalMedicaidByYear[i] - totalFedShareByYear[i])}`);
            else
              cy.wrap($el).should('have.text', 
                `$${addCommas(totalMedicaidCost - totalFedShareCost)}`);
          });
        });
        
        payers.forEach(payer => {
          summaryPage.getCategoryCells('hie', payer).each($el => {
            cy.wrap($el).should('have.text', '$0');
          });
        });

      });

      it('All MMIS rows are $0', function () {
        years.forEach(year => {
          summaryPage.getTableRows('MMIS', year)
            .each($el => {
              cy.wrap($el).should('have.text', '$0');
            });
        });

        summaryPage.getTableRows('MMIS')
          .each($el => {
            cy.wrap($el).should('have.text', '$0');
        });
      });
      
    });
  });
 
})
