/* eslint-disable radix */
import { addCommas, convertDollarStrToNum } from './helper';

class BudgetPage {
  checkTotalComputableMedicaidCost = ({
    label = 'Activity Total Computable Medicaid Cost',
    totalMedicaidCost
  }) => {
    cy.get('[class="budget-table--subtotal budget-table--row__header"]')
      .contains(label)
      .parent()
      .should('contain', `$${addCommas(totalMedicaidCost)}`);
  };

  checkActivityTotalCostTable = ({
    activityTotalCost,
    otherFunding,
    index
  } = {}) => {
    const totalMedicaidCost = activityTotalCost - otherFunding;
    cy.get('[class="budget-table activity-budget-table"]')
      .eq(index)
      .within(() => {
        cy.contains('Activity Total Cost')
          .parent()
          .should('contain', `$${addCommas(activityTotalCost)}`);
        cy.contains('Other Funding')
          .parent()
          .should('contain', `$${addCommas(otherFunding)}`);
        cy.contains('Total Computable Medicaid Cost')
          .parent()
          .should('contain', `$${addCommas(totalMedicaidCost)}`);
      });
  };

  checkSubtotalTable = ({ title, costs, otherFundingAmount } = {}) => {
    const subtotal = costs > 0 ? costs - otherFundingAmount : 0;
    cy.get('.budget-table--row__header')
      .contains(title)
      .parent()
      .nextUntil('.budget-table--row__header')
      .then($rows => {
        expect($rows.length).to.be.at.least(2);
        const secondToLastIndex = $rows.length - 2;
        const lastIndex = $rows.length - 1;
        cy.wrap($rows)
          .eq(secondToLastIndex)
          .children()
          .then($cells => {
            cy.wrap($cells.eq(0)).should('contain', 'Other Funding Amount');
            cy.wrap($cells.eq(1)).should('have.text', '-');
            cy.wrap($cells.eq(2)).shouldBeCloseTo(otherFundingAmount);
          });
        cy.wrap($rows)
          .eq(lastIndex)
          .children()
          .then($cells => {
            cy.wrap($cells.eq(0)).should('contain', `${title} Subtotal`);
            cy.wrap($cells.eq(1)).shouldBeCloseTo(subtotal);
          });
      });
  };

  checkTableRow = ({ title, costs, ftes = null } = {}) => {
    cy.contains(title)
      .parent()
      .within(() => {
        cy.contains(`$${addCommas(costs)}`).should('exist');
        if (ftes) {
          cy.contains(`${ftes} FTE`).should('exist');
        }
      });
  };

  checkSplitFunctionality = () => {
    cy.get('[class="ds-c-field"]').parent().click();
    cy.contains('90-10').should('exist');
    cy.contains('75-25').should('exist');
    cy.contains('50-50').should('exist');

    cy.get('[class="ds-c-field"]')
      .find(':selected')
      .should('have.value', '90-10');
  };

  checkCostSplitTable = ({ federalShare, stateShare, totalMedicaidCost }) => {
    if (federalShare + stateShare !== 100) {
      throw new Error('Activity Table Calculation Failure');
    }

    const fedTotal = federalShare * 0.01 * totalMedicaidCost;
    const stateTotal = stateShare * 0.01 * totalMedicaidCost;

    cy.get('[class="budget-table--subtotal budget-table--row__header"]')
      .contains(/^Total Computable Medicaid Cost$/i)
      .parent()
      .should('contain', `$${addCommas(totalMedicaidCost)}`)
      .next()
      .children($cells => {
        cy.wrap($cells.eq(0)).should('contain', 'Federal Share');
        cy.wrap($cells.eq(1)).shouldBeCloseTo(totalMedicaidCost);
        cy.wrap($cells.eq(3)).should('have.text', `${federalShare}%`);
        cy.wrap($cells.eq(5)).shouldBeCloseTo(fedTotal);
      })
      .next()
      .children($cells => {
        cy.wrap($cells.eq(0)).should('contain', 'State Share');
        cy.wrap($cells.eq(1)).shouldBeCloseTo(totalMedicaidCost);
        // cell 2 is X
        cy.wrap($cells.eq(3)).should('have.text', `${stateShare}%`);
        // cell 4 is =
        cy.wrap($cells.eq(5)).shouldBeCloseTo(stateTotal);
      });
  };

  checkFFYtotals = ({
    years,
    activityName,
    totalCost,
    otherFunding,
    totalMedicaidCost,
    fundingSplit,
    federalShare,
    state,
    stateShare
  }) => {
    cy.contains(`FFY ${years[0]}-${years[years.length - 1]} Totals`)
      .next()
      .within(() => {
        cy.contains(
          `${activityName} activity is $${addCommas(totalCost)}`
        ).should('exist');
        cy.contains(`other funding of $${addCommas(otherFunding)}`).should(
          'exist'
        );
        cy.contains(`Medicaid cost is $${addCommas(totalMedicaidCost)}`).should(
          'exist'
        );
        cy.contains(fundingSplit).should('exist');
        cy.contains(`federal share of $${addCommas(federalShare)}`).should(
          'exist'
        );
        cy.contains(`${state} share of $${addCommas(stateShare)}`).should(
          'exist'
        );

        years.forEach(year => {
          cy.contains(year).should('exist');
        });
      });
  };

  checkSubtotal = expectedValue => {
    cy.get('[class="budget-table--number budget-table--subtotal"]').should(
      'contain',
      expectedValue
    );
  };

  quarterTablePercentageRow = ({
    isExportView = false,
    rowHeader,
    quarterPercentage = [],
    subtotalPercentage
  }) => {
    cy.contains(rowHeader)
      .parent()
      .within(() => {
        if (isExportView) {
          quarterPercentage.forEach((quarterPercent, i) => {
            cy.get('[class="budget-table--number"]')
              .eq(i)
              .should('contain', `${quarterPercent} %`);
          });
        } else {
          quarterPercentage.forEach((quarterPercent, i) => {
            cy.get('[class="ds-c-field budget-table--input__number"]')
              .eq(i)
              .should('have.value', quarterPercent);
          });
        }
        this.checkSubtotal(`+${subtotalPercentage}%`);
      });
  };

  quarterTableCostRow = ({ rowHeader, quarterCosts = [], subtotalCosts }) => {
    cy.contains(rowHeader)
      .parent()
      .next()
      .within(() => {
        quarterCosts.forEach((quarterCost, i) => {
          cy.get('[class="budget-table--number"]')
            .eq(i)
            .should('contain', `$${quarterCost}`);
        });
        this.checkSubtotal(`$${subtotalCosts}`);
      });
  };

  quarterTableFFPTotalRow = ({ quarterFFPs = [], totalFFP }) => {
    cy.contains('Total Enhanced FFP')
      .parent()
      .within(() => {
        quarterFFPs.forEach((quarterFFP, i) => {
          cy.get('[class="budget-table--number budget-table--total"]')
            .eq(i)
            .should('contain', `$${quarterFFP}`);
        });
        this.checkSubtotal(`$${totalFFP}`);
      });
  };

  checkQuarterTable = ({
    isExportView = false,
    stateQuarterlyPercentage = ['', '', '', ''],
    stateSubtotalPercentage = 0,
    stateQuarterlyCost = [0, 0, 0, 0],
    stateSubtotalCost = 0,
    contractorQuarterlyPercentage = ['', '', '', ''],
    contractorSubtotalPercentage = 0,
    contractorQuarterlyCost = [0, 0, 0, 0],
    contractorSubtotalCost = 0,
    quarterFFPs = [0, 0, 0, 0],
    totalFFP = 0
  } = {}) => {
    this.quarterTablePercentageRow({
      isExportView,
      rowHeader: 'State Staff and Expenses (In-House Costs)',
      quarterPercentage: stateQuarterlyPercentage,
      subtotalPercentage: stateSubtotalPercentage
    });
    this.quarterTableCostRow({
      rowHeader: 'State Staff and Expenses (In-House Costs)',
      quarterCosts: stateQuarterlyCost,
      subtotalCosts: stateSubtotalCost
    });

    this.quarterTablePercentageRow({
      isExportView,
      rowHeader: 'Private Contractor Costs',
      quarterPercentage: contractorQuarterlyPercentage,
      subtotalPercentage: contractorSubtotalPercentage
    });
    this.quarterTableCostRow({
      rowHeader: 'Private Contractor Costs',
      quarterCosts: contractorQuarterlyCost,
      subtotalCosts: contractorSubtotalCost
    });

    this.quarterTableFFPTotalRow({ quarterFFPs, totalFFP });
  };

  // Indexes for subtotals
  checkSubtotalRows = ({ year, activityIndex }) => {
    cy.findAllByText(`Activity ${activityIndex + 1} Budget for FFY ${year}`)
      .parent()
      .within(() => {
        cy.get('[data-cy="subtotal"]').should($td => {
          const staffTotal = convertDollarStrToNum($td.eq(0).text());
          const expensesTotal = convertDollarStrToNum($td.eq(1).text());
          const contractorTotal = convertDollarStrToNum($td.eq(2).text());

          const calculatedTotal = staffTotal + expensesTotal + contractorTotal;

          const expectedMedicaidTotal = convertDollarStrToNum($td.eq(3).text());

          if (calculatedTotal !== expectedMedicaidTotal) {
            throw new Error('Subtotal rows do not add up');
          }
        });
      });
  };

  computeFFYtotal = (staff, expenses, contractor) => {
    return staff + expenses + contractor;
  };

  checkEachQuarterSubtotal = () => {
    cy.get('[class="budget-table"]').within(() => {
      cy.get('[data-cy="subtotal"]').should($td => {
        for (let quarter = 0; quarter < 4; quarter += 1) {
          const subtotal = convertDollarStrToNum($td.eq(quarter).text());
          const subtotal2 = convertDollarStrToNum($td.eq(quarter + 4).text());

          const sum = convertDollarStrToNum($td.eq(quarter + 8).text());

          expect(subtotal + subtotal2).to.be.closeTo(sum, 5);
        }
      });
    });
  };
}

export default BudgetPage;
