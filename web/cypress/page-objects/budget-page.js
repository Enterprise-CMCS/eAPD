class BudgetPage {
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
    let fedTotal = 0;
    let stateTotal = 0;

    fedTotal = federal * 0.01 * federalVal;
    stateTotal = state * 0.01 * stateVal;

    this.checkTotalComputableMedicaidCost(expectedMedicaid);
    this.costSplitTableRow('Federal Share', federal, federalVal, fedTotal);
    this.costSplitTableRow('State Share', state, stateVal, stateTotal);
  }

  // eslint-disable-next-line class-methods-use-this
  checkFFYtotals(
    years,
    activityName,
    totalCost,
    otherFundingCost,
    medicaidCost,
    split,
    federalShare,
    state,
    stateShare
  ) {
    cy.contains(`FFY ${years[0]}-${years[years.length - 1]} Totals`)
      .next()
      .within(() => {
        cy.contains(`${activityName} activity is $${totalCost}`).should(
          'exist'
        );
        cy.contains(`other funding of $${otherFundingCost}`).should('exist');
        cy.contains(`Medicaid cost is $${medicaidCost}`).should('exist');
        cy.contains(split).should('exist');
        cy.contains(`federal share of $${federalShare}`).should('exist');
        cy.contains(`${state} share of $${stateShare}`).should('exist');

        for (let i = 0; i < years.length; i += 1) {
          cy.contains(years[i]).should('exist');
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  checkSubtotal(expectedValue) {
    cy.get('[class="budget-table--number budget-table--subtotal"]').should(
      'contain',
      expectedValue
    );
  }

  // eslint-disable-next-line class-methods-use-this
  quarterTableInputRow(row, defaultOrExport, expectedValue, expectedSubtotal) {
    cy.contains(row)
      .parent()
      .within(() => {
        if (defaultOrExport === 'default') {
          for (let i = 0; i < 4; i += 1) {
            cy.get('[class="ds-c-field budget-table--input__number"]')
              .eq(i)
              .should('have.value', expectedValue);
          }
        } else {
          for (let i = 0; i < 4; i += 1) {
            cy.get('[class="budget-table--number"]')
              .eq(i)
              .should('contain', `${expectedValue} %`);
          }
        }
        this.checkSubtotal(`+${expectedSubtotal}%`);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  quarterTableSubtotalRow(row, expectedValue, expectedSubtotal) {
    cy.contains(row)
      .parent()
      .next()
      .within(() => {
        for (let i = 0; i < 4; i += 1) {
          cy.get('[class="budget-table--number"]')
            .eq(i)
            .should('contain', `$${expectedValue}`);
        }
        this.checkSubtotal(`$${expectedSubtotal}`);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  quarterTableBottomRow(expectedValue, expectedSubtotal) {
    cy.contains('Total Enhanced FFP')
      .parent()
      .within(() => {
        for (let i = 0; i < 4; i += 1) {
          cy.get('[class="budget-table--number budget-table--total"]')
            .eq(i)
            .should('contain', `$${expectedValue}`);
        }
        this.checkSubtotal(`$${expectedSubtotal}`);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  checkQuarterTable(defaultOrExport, expectedValue, expectedSubtotal) {
    this.quarterTableInputRow(
      'State Staff and Expenses (In-House Costs)',
      defaultOrExport,
      expectedValue,
      expectedSubtotal
    );
    this.quarterTableSubtotalRow(
      'State Staff and Expenses (In-House Costs)',
      expectedValue,
      expectedSubtotal
    );

    this.quarterTableInputRow(
      'Private Contractor Costs',
      defaultOrExport,
      expectedValue,
      expectedSubtotal
    );
    this.quarterTableSubtotalRow(
      'Private Contractor Costs',
      expectedValue,
      expectedSubtotal
    );

    this.quarterTableBottomRow(expectedValue, expectedSubtotal);
  }
}

export default BudgetPage;
