// eslint-disable-next-line import/prefer-default-export
export class BudgetPage {
  // eslint-disable-next-line class-methods-use-this
  checkTotalComputableMedicaidCost(expectedValue) {
    cy.contains('Total Computable Medicaid Cost')
      .parent()
      .should('contain', `$${expectedValue}`);
  }

  // eslint-disable-next-line class-methods-use-this
  checkActivityTotalCostTable(
    activityValue,
    otherFundingValue,
    medicaidValue,
    index
  ) {
    cy.get('[class="budget-table activity-budget-table"]')
      .eq(index)
      .within(() => {
        cy.contains('Activity Total Cost')
          .parent()
          .should('contain', `$${activityValue}`);
        cy.contains('Other Funding')
          .parent()
          .should('contain', `$${otherFundingValue}`);
        this.checkTotalComputableMedicaidCost(medicaidValue);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  checkSubtotalTable(title, otherFundingAmount, keyPersonnelAmount) {
    let subtotal = 0;
    if (title === 'State Staff') {
      cy.contains(title)
        .parent()
        .next()
        .should('contain', `$${keyPersonnelAmount}`);
      cy.contains('Other Funding Amount')
        .parent()
        .should('contain', `$${otherFundingAmount}`);
      subtotal = otherFundingAmount + keyPersonnelAmount;
    } else {
      cy.contains(title)
        .parent()
        .next()
        .should('contain', `$${otherFundingAmount}`);
      subtotal = otherFundingAmount;
    }

    cy.contains(`${title} Subtotal`).parent().should('contain', `$${subtotal}`);
  }

  // eslint-disable-next-line class-methods-use-this
  checkSplitFunctionality() {
    cy.get('[class="ds-c-field"]').parent().click();
    cy.contains('90-10').should('exist');
    cy.contains('75-25').should('exist');
    cy.contains('50-50').should('exist');

    cy.get('[class="ds-c-field"]')
      .find(':selected')
      .should('have.value', '90-10');
  }

  // eslint-disable-next-line class-methods-use-this
  costSplitTableRow(fedOrState, split, value, total) {
    cy.contains(fedOrState)
      .parent()
      .within(() => {
        cy.get('[class="budget-table--number"]')
          .eq(0)
          .should('contain', `$${value}`);
        cy.get('[class="budget-table--number ds-u-padding--0"]').should(
          'have.text',
          '×'
        );
        cy.get('[class="budget-table--number ds-u-text-align--left"]').should(
          'contain',
          `${split}%`
        );
        cy.get('[class="budget-table--number"]').eq(1).should('contain', '=');
        cy.get('[class="budget-table--number"]')
          .eq(2)
          .should('contain', `$${total}`);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  checkCostSplitTable(federal, state, federalVal, stateVal, expectedMedicaid) {
    cy.get('[class="budget-table activity-budget-table"]')
      .eq(2)
      .within(() => {
        let fedTotal = 0;
        let stateTotal = 0;

        fedTotal = federal * 0.01 * federalVal;
        stateTotal = state * 0.01 * stateVal;

        this.checkTotalComputableMedicaidCost(expectedMedicaid);
        this.costSplitTableRow('Federal Share', federal, federalVal, fedTotal);
        this.costSplitTableRow('State Share', state, stateVal, stateTotal);
      });
  }
}
