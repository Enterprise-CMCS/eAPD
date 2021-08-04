// eslint-disable-next-line import/prefer-default-export
export class ActivityPage {
  // eslint-disable-next-line class-methods-use-this
  checkTinyMCE(id, expectedValue) {
    cy.get(`[id="${id}"]`).should('have.value', expectedValue);
  }

  // eslint-disable-next-line class-methods-use-this
  checkTextField(className, expectedValue, index) {
    if (Number.isInteger(index)) {
      cy.get(`[class="${className}"]`)
        .eq(index)
        .should('have.value', expectedValue);
    } else {
      cy.get(`[class="${className}"]`).should('have.value', expectedValue);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkInputField(name, expectedValue) {
    cy.findByLabelText(name).should('have.value', expectedValue);
  }

  // eslint-disable-next-line class-methods-use-this
  checkDate(string, month, day, year) {
    cy.contains(string)
      .parent()
      .next('div')
      .within(() => {
        cy.findByLabelText('Month').should('have.value', month || '');
        cy.findByLabelText('Day').should('have.value', day || '');
        cy.findByLabelText('Year').should('have.value', year || '');
      });
  }

  // eslint-disable-next-line class-methods-use-this
  checkDeleteButton(alert, heading, check) {
    cy.contains(alert).should('not.exist');
    cy.contains('Delete').click();
    cy.contains(heading).should('exist');
    cy.contains('Cancel').click();
    cy.contains(heading).should('not.exist');
    cy.contains(alert).should('not.exist');
    cy.contains(check).should('exist');

    cy.contains('Delete').click();
    cy.contains(heading).should('exist');
    cy.get('[class="ds-c-button ds-c-button--danger"]').click();
    cy.contains(heading).should('not.exist');
    cy.contains(alert).should('exist');
    cy.contains(check).should('not.exist');
  }

  // eslint-disable-next-line class-methods-use-this
  checkOutcomeOutput(outcome, metric) {
    cy.contains(outcome).should('exist');
    cy.contains(metric).should('exist');
  }

  // eslint-disable-next-line class-methods-use-this
  checkMetricFunctionality() {
    cy.findByRole('button', { name: /Add another metric/i }).click();
    for (let i = 0; i < 2; i += 1) {
      cy.get('[class="ds-c-review"]')
        .eq(i)
        .within(() => {
          cy.contains('Delete').should('exist');
        });
    }
    cy.contains('Delete').click();
    cy.contains('Delete Metric?').should('exist');
    cy.contains('Cancel').click();
    cy.contains('Delete Metric?').should('not.exist');
    cy.get('[class="ds-u-margin-right--2"]').eq(2).should('exist');
    cy.contains('Delete').click();
    cy.contains('Delete Metric?').should('exist');
    cy.get('[class="ds-c-button ds-c-button--danger"]').click();
    cy.contains('Delete').should('not.exist');
    cy.get('[class="ds-u-margin-right--2"]').eq(2).should('not.exist');
    cy.contains('Delete').should('not.exist');
    cy.findByRole('button', { name: /Done/i }).click();
  }

  // eslint-disable-next-line class-methods-use-this
  checkMilestoneOutput(name, dateRange) {
    cy.contains(name).should('exist');
    cy.contains(dateRange).should('exist');
  }

  // eslint-disable-next-line class-methods-use-this
  checkStateStaffFFY(years, expectedValue) {
    for (let i = 0; i < years.length; i += 1) {
      cy.contains(`FFY ${years[i]} Cost`)
        .next('div')
        .within(() => {
          cy.findByLabelText('Cost with benefits').should(
            'have.value',
            expectedValue
          );
          cy.findByLabelText('Number of FTEs').should(
            'have.value',
            expectedValue
          );
          cy.contains('Total: $0').should('exist');
        });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkFFYinputCostFields(years, expectedValue) {
    for (let i = 0; i < years.length; i += 1) {
      cy.findByLabelText(`FFY ${years[i]} Cost`).should(
        'have.value',
        expectedValue
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkFFYcosts(years, expectedValue) {
    cy.then(() => {
      for (let i = 0; i < years.length; i += 1) {
        cy.contains(`FFY ${years[i]} Cost: $${expectedValue}`).should('exist');
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  checkOtherStateExpensesOutput(category, years, expectedValue) {
    cy.contains(category).should('exist');
    this.checkFFYcosts(years, expectedValue);
  }

  // eslint-disable-next-line class-methods-use-this
  checkPrivateContractorOutput(
    name,
    description,
    dateRange,
    totalCost,
    years,
    expectedValue
  ) {
    cy.contains(name).should('exist');
    cy.contains(description).should('exist');
    cy.contains(dateRange).should('exist');
    cy.contains(totalCost).should('exist');
    this.checkFFYcosts(years, expectedValue);
  }
}
