/* eslint-disable radix */
import { addCommas } from './helper';

const { _ } = Cypress;

class BudgetPage {
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

  checkActivityTotalCostTableNew = ({ expectedTable, index } = {}) => {
    cy.log(JSON.stringify(expectedTable));
    cy.get('[class="budget-table activity-budget-table"]')
      .eq(index)
      .then(table => {
        cy.get(table)
          .getActivityTable()
          .then(tableData => {
            _.forEach(expectedTable, row => {
              expect(tableData).to.deep.include(row);
            });
            // cy.log(JSON.stringify(tableData));
            // expect(tableData).to.deep.include(expectedTable);
          });
      });
  };

  checkSplitFunctionality = () => {
    cy.get('[data-cy="cost-allocation-dropdown"]').parent().click();
    cy.contains('Select an option').should('exist');

    cy.contains('90-10').should('exist');
    cy.contains('75-25').should('exist');
    cy.contains('50-50').should('exist');

    cy.get('[data-cy="cost-allocation-dropdown"]')
      .find(':selected')
      .should('have.value', '0-100');

    cy.get('[data-cy="cost-allocation-dropdown"]').blur();

    cy.get('[data-cy="cost-allocation-dropdown"]').next();
    cy.contains('Select a federal-state split.').should('exist');

    cy.get('[data-cy="cost-allocation-dropdown"]').select('90-10');
    cy.get('[data-cy="cost-allocation-dropdown"]').blur();

    cy.contains('Select a federal-state split.').should('not.exist');
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
}

export default BudgetPage;
