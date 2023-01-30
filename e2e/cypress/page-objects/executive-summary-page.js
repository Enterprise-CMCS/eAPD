/* eslint class-methods-use-this: "off" */
import { getDateRange } from './helper.js';

class ExecutiveSummaryPage {
  // 0 based indexing
  checkActivitySummary = ({
    index,
    years,
    activityName,
    shortOverview,
    startDate,
    endDate,
    activityTotalCosts,
    totalComputableMedicaidCost,
    federalShareAmount,
    ffys
  }) => {
    cy.get('#executive-summary-summary')
      .parent()
      .contains('h4', `Activity ${index + 1}: ${activityName}`)
      .next()
      .within(() => {
        if (shortOverview) {
          cy.contains(shortOverview);
        }
        cy.contains('Start Date - End Date:')
          .parent()
          .should('contain', getDateRange(startDate, endDate));
        cy.contains('Total Cost of Activity:')
          .next()
          .shouldBeCloseTo(activityTotalCosts);
        cy.contains('Total Computable Medicaid Cost:')
          .parent()
          .siblings($el => {
            cy.wrap($el[1]).shouldBeCloseTo(totalComputableMedicaidCost);
            cy.wrap($el[3]).shouldBeCloseTo(federalShareAmount);
          });
        ffys.forEach(
          (
            {
              activityTotalCosts: ffyATC,
              totalComputableMedicaidCost: ffyTCMC,
              federalShareAmount: ffyFSA
            },
            i
          ) => {
            cy.contains('strong', `FFY ${years[i]}`)
              .parent()
              .siblings($el => {
                cy.wrap($el[1]).shouldBeCloseTo(ffyATC);
                cy.wrap($el[4]).shouldBeCloseTo(ffyTCMC);
                cy.wrap($el[6]).shouldBeCloseTo(ffyFSA);
              });
          }
        );
      });
  };

  checkTotalCostSummary = ({
    years,
    totalCost,
    totalTotalMedicaidCost,
    totalFederalShare,
    ffys
  }) => {
    cy.get('#executive-summary-summary')
      .parent()
      .contains('h4', 'Total Cost')
      .next()
      .within(() => {
        cy.contains('Federal Fiscal Years Requested:')
          .parent()
          .should('contain', years.join(', '));
        cy.contains('Total Computable Medicaid Cost:')
          .parent()
          .siblings($el => {
            cy.wrap($el[1]).shouldBeCloseTo(totalTotalMedicaidCost);
            cy.wrap($el[3]).shouldBeCloseTo(totalFederalShare);
          });
        cy.contains('Total Funding Request:').next().shouldBeCloseTo(totalCost);
        ffys.forEach(
          (
            {
              activityTotalCosts,
              totalComputableMedicaidCost,
              federalShareAmount
            },
            i
          ) => {
            cy.contains('strong', `FFY ${years[i]}`)
              .parent()
              .siblings($el => {
                cy.wrap($el[1]).shouldBeCloseTo(activityTotalCosts);
                cy.wrap($el[4]).shouldBeCloseTo(totalComputableMedicaidCost);
                cy.wrap($el[6]).shouldBeCloseTo(federalShareAmount);
              });
          }
        );
      });
  };

  getTableRows = ({ title, year }) => {
    cy.contains('table', title).as('table');
    if (year) {
      return cy.get('@table').contains(`FFY ${year}`).siblings();
    }
    return cy
      .get('@table')
      .contains(/^Total$/i)
      .siblings();
  };
}

export default ExecutiveSummaryPage;
