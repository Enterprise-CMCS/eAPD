class ActivityPage {
  checkTinyMCE = (id, expectedValue) => {
    cy.get(`[id="${id}"]`).should('have.value', expectedValue);
  };

  checkTextField = (className, expectedValue, index) => {
    if (Number.isInteger(index)) {
      cy.get(`[class="${className}"]`)
        .eq(index)
        .should('have.value', expectedValue);
    } else {
      cy.get(`[class="${className}"]`).should('have.value', expectedValue);
    }
  };

  checkInputField = (name, expectedValue) => {
    cy.findByLabelText(name).should('have.value', expectedValue);
  };

  checkDate = (string, month, day, year) => {
    cy.contains(string)
      .parent()
      .next('div')
      .within(() => {
        cy.findByLabelText('Month').should('have.value', month || '');
        cy.findByLabelText('Day').should('have.value', day || '');
        cy.findByLabelText('Year').should('have.value', year || '');
      });
  };

  checkDeleteButton = (alert, heading, check) => {
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
  };

  checkOutcomeOutput = (outcome, metric) => {
    cy.contains(outcome).should('exist');
    cy.contains(metric).should('exist');
  };

  checkMetricFunctionality = () => {
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
  };

  checkMilestoneOutput = (name, dateRange) => {
    cy.contains(name).should('exist');
    cy.contains(dateRange).should('exist');
  };

  checkStateStaffFFY = (years, expectedValue) => {
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
  };

  checkStateStaffOutput = (name, years, cost, numFTEs) => {
    cy.contains(name).should('exist');

    for (let i = 0; i < years.length; i += 1) {
      cy.contains(`FFY ${years[i]}`)
        .parent()
        .within(() => {
          cy.contains(`Cost: $${cost}`).should('exist');
          cy.contains(`FTEs: ${numFTEs}`).should('exist');
          cy.contains(`Total: $${cost * numFTEs}`);
        });
    }
  };

  checkFFYinputCostFields = (years, expectedValue) => {
    for (let i = 0; i < years.length; i += 1) {
      cy.findByLabelText(`FFY ${years[i]} Cost`).should(
        'have.value',
        expectedValue
      );
    }
  };

  checkFFYcosts = (years, expectedValue) => {
    cy.then(() => {
      for (let i = 0; i < years.length; i += 1) {
        cy.contains(`FFY ${years[i]} Cost: $${expectedValue}`).should('exist');
      }
    });
  };

  checkOtherStateExpensesOutput = (category, years, expectedValue) => {
    cy.contains(category).should('exist');
    this.checkFFYcosts(years, expectedValue);
  };

  checkPrivateContractorOutput = (
    name,
    description,
    dateRange,
    totalCost,
    years,
    expectedValue
  ) => {
    cy.contains(name).should('exist');
    cy.contains(description).should('exist');
    cy.contains(dateRange).should('exist');
    cy.contains(totalCost).should('exist');
    this.checkFFYcosts(years, expectedValue);
  };

  checkAddActivityButton = () => {
    cy.contains('Add another activity').click();
    cy.url().should('include', '/activities');
    cy.contains('Activity 2').should('exist');
    cy.contains('Delete').click();
    cy.findByRole('button', { name: /Delete Activity/i }).click();
    cy.contains('Activity 2').should('not.exist');
  };
}

export default ActivityPage;
