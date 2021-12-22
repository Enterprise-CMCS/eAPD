/* eslint-disable radix */
import { addCommas, convertDollarStrToNum } from './helper';

class BudgetPage {
  checkTotalComputableMedicaidCost = ({
    label = 'Activity Total Computable Medicaid Cost',
    totalComputableMedicaidCost
  }) => {
    cy.get('[class="budget-table--subtotal budget-table--row__header"]')
      .contains(label)
      .parent()
      .should('contain', `$${addCommas(totalComputableMedicaidCost)}`);
  };

  checkActivityTotalCostTable = ({
    activityTotalCosts,
    otherFunding,
    totalComputableMedicaidCost,
    index
  } = {}) => {
    cy.get('[class="budget-table activity-budget-table"]')
      .eq(index)
      .within(() => {
        cy.contains('Activity Total Cost')
          .parent()
          .should('contain', `$${addCommas(activityTotalCosts)}`);
        cy.contains('Other Funding')
          .parent()
          .should('contain', `$${addCommas(otherFunding)}`);
        cy.contains('Total Computable Medicaid Cost')
          .parent()
          .should('contain', `$${addCommas(totalComputableMedicaidCost)}`);
      });
  };

  checkSubtotalTable = ({ title, subtotal, otherFunding } = {}) => {
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
            cy.wrap($cells.eq(2)).shouldBeCloseTo(otherFunding);
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

  checkTableRow = ({ title, costs, salary = null, ftes = null } = {}) => {
    cy.contains(title)
      .parent()
      .within(() => {
        cy.contains(`$${addCommas(costs)}`).should('exist');
        if (salary) {
          cy.contains(`$${addCommas(salary)}`).should('exist');
        }
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

  checkCostSplitTable = ({
    federalSharePercentage,
    federalShareAmount,
    stateSharePercentage,
    stateShareAmount,
    totalComputableMedicaidCost
  }) => {
    cy.wrap(federalSharePercentage + stateSharePercentage).should('equal', 1);

    cy.get('[class="budget-table--subtotal budget-table--row__header"]')
      .contains(/^Total Computable Medicaid Cost$/i)
      .parent()
      .should('contain', `$${addCommas(totalComputableMedicaidCost)}`)
      .next()
      .children($cells => {
        cy.wrap($cells.eq(0)).should('contain', 'Federal Share');
        cy.wrap($cells.eq(1)).shouldBeCloseTo(totalComputableMedicaidCost);
        // cell 2 is X
        cy.wrap($cells.eq(3)).should(
          'have.text',
          `${federalSharePercentage * 100}%`
        );
        // cell 4 is =
        cy.wrap($cells.eq(5)).shouldBeCloseTo(federalShareAmount);
      })
      .next()
      .children($cells => {
        cy.wrap($cells.eq(0)).should('contain', 'State Share');
        cy.wrap($cells.eq(1)).shouldBeCloseTo(totalComputableMedicaidCost);
        // cell 2 is X
        cy.wrap($cells.eq(3)).should(
          'have.text',
          `${stateSharePercentage * 100}%`
        );
        // cell 4 is =
        cy.wrap($cells.eq(5)).shouldBeCloseTo(stateShareAmount);
      });
  };

  checkFFYtotals = ({
    years,
    activityIndex,
    activityName,
    totalCost,
    totalOtherFunding,
    totalTotalMedicaidCost,
    fundingSplit,
    totalFederalShare,
    state,
    totalStateShare
  }) => {
    cy.contains(
      `Activity ${activityIndex + 1} Budget for FFY ${years[years.length - 1]}`
    )
      .parent()
      .parent()
      .next()
      .should('contain', `FFY ${years[0]}-${years[years.length - 1]} Totals`)
      .next()
      .within(() => {
        cy.contains(
          `${activityName} activity is $${addCommas(totalCost)}`
        ).should('exist');
        cy.contains(`other funding of $${addCommas(totalOtherFunding)}`).should(
          'exist'
        );
        cy.contains(
          `Medicaid cost is $${addCommas(totalTotalMedicaidCost)}`
        ).should('exist');
        cy.contains(fundingSplit).should('exist');
        cy.contains(`federal share of $${addCommas(totalFederalShare)}`).should(
          'exist'
        );
        cy.contains(`${state} share of $${addCommas(totalStateShare)}`).should(
          'exist'
        );

        years.forEach(year => {
          cy.contains(year).should('exist');
        });
      });
  };

  checkSubtotalValue = expectedValue => {
    cy.get(
      '[class="budget-table--number budget-table--subtotal"]'
    ).shouldBeCloseTo(expectedValue);
  };

  checkSubtotalString = expectedValue => {
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
        this.checkSubtotalString(`+${subtotalPercentage}%`);
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
            .shouldBeCloseTo(quarterCost);
        });
        this.checkSubtotalValue(subtotalCosts);
      });
  };

  quarterTableFFPTotalRow = ({ quarterFFPs = [], totalFFP }) => {
    cy.contains('Total Enhanced FFP')
      .parent()
      .within(() => {
        quarterFFPs.forEach((quarterFFP, i) => {
          cy.get('[class="budget-table--number budget-table--total"]')
            .eq(i)
            .shouldBeCloseTo(quarterFFP);
        });
        this.checkSubtotalValue(totalFFP);
      });
  };

  checkQuarterSubtotal = ({
    stateQuarterlyCosts,
    contractorQuarterlyCosts
  } = {}) => {
    cy.get('[class="budget-table"]').within(() => {
      cy.get('[data-cy="subtotal"]').then($td => {
        expect($td.length).to.equal(12);
        for (let quarter = 0; quarter < 4; quarter += 1) {
          cy.wrap($td.eq(quarter)).shouldBeCloseTo(
            stateQuarterlyCosts[quarter],
            5
          );
          cy.wrap($td.eq(quarter + 4)).shouldBeCloseTo(
            contractorQuarterlyCosts[quarter],
            5
          );
        }
      });
    });
  };

  checkSubtotalPercentage = ({
    stateSubtotalPercentage,
    contractorSubtotalPercentage
  } = {}) => {
    cy.get('[class="budget-table"]').within(() => {
      cy.get('[class="budget-table--number budget-table--subtotal"]')
        .eq(0)
        .should('contain', `+${stateSubtotalPercentage}%`);
      cy.get('[class="budget-table--number budget-table--subtotal"]')
        .eq(2)
        .should('contain', `+${contractorSubtotalPercentage}%`);
    });
  };

  checkSubtotalCost = ({ stateSubtotalCost, contractorSubtotalCost } = {}) => {
    cy.get('[class="budget-table"]').within(() => {
      cy.get('[class="budget-table--number budget-table--subtotal"]')
        .eq(1)
        .shouldBeCloseTo(stateSubtotalCost);
      cy.get('[class="budget-table--number budget-table--subtotal"]')
        .eq(3)
        .shouldBeCloseTo(contractorSubtotalCost);
    });
  };

  checkQuarterTable = ({
    isExportView = false,
    stateQuarterlyPercentage = ['', '', '', ''],
    stateSubtotalPercentage = 0,
    stateQuarterlyCosts = [0, 0, 0, 0],
    stateSubtotalCost = 0,
    contractorQuarterlyPercentage = ['', '', '', ''],
    contractorSubtotalPercentage = 0,
    contractorQuarterlyCosts = [0, 0, 0, 0],
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
      quarterCosts: stateQuarterlyCosts,
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
      quarterCosts: contractorQuarterlyCosts,
      subtotalCosts: contractorSubtotalCost
    });

    this.quarterTableFFPTotalRow({ quarterFFPs, totalFFP });
  };

  // Indexes for subtotals
  checkSubtotalRows = () => {
    cy.get('[data-cy="subtotal"]').should($td => {
      const staffTotal = convertDollarStrToNum($td.eq(0).text());
      const expensesTotal = convertDollarStrToNum($td.eq(1).text());
      const contractorTotal = convertDollarStrToNum($td.eq(2).text());
      const expectedMedicaidTotal = convertDollarStrToNum($td.eq(3).text());

      const expectedTCMC = staffTotal + expensesTotal + contractorTotal;

      expect(expectedTCMC).to.be.closeTo(expectedMedicaidTotal, 5);
    });
  };

  computeFFYtotal = (staff, expenses, contractor) => {
    return staff + expenses + contractor;
  };

  checkEachQuarterSubtotal = () => {
    cy.get('[class="budget-table"]').within(() => {
      cy.get('[data-cy="subtotal"]').should($td => {
        for (let quarter = 0; quarter < 4; quarter += 1) {
          const stateSubtotal = convertDollarStrToNum($td.eq(quarter).text());
          const contractorSubtotal = convertDollarStrToNum(
            $td.eq(quarter + 4).text()
          );
          const subtotal = convertDollarStrToNum($td.eq(quarter + 8).text());

          const expectedSubtotal = stateSubtotal + contractorSubtotal;
          expect(expectedSubtotal).to.be.closeTo(subtotal, 5);
        }
      });
    });
  };
}

export default BudgetPage;
