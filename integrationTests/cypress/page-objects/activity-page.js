import BudgetPage from './budget-page';

class ActivityPage {
  budgetPage = new BudgetPage();

  checkTinyMCE = (id, expectedValue) => {
    cy.get(`[id="${id}"]`).should('have.value', expectedValue);
  };

  checkTextField = (className, expectedValue, index) => {
    // I CHANGED THIS TO 'CONTAIN' FROM 'HAVE.VALUE' FOR populatePage.fillQuarters()
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

  checkOutcomeOutput = (outcome, metric1, metric2) => {
    cy.contains(outcome).should('exist');
    cy.contains(metric1).should('exist');
    if (metric2 != null) {
      cy.contains(metric2).should('exist');
    }
  };

  checkMetricFunctionality = () => {
    cy.findByRole('button', { name: /Add Metric/i }).click();
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
    years.forEach(year => {
      cy.contains(`FFY ${year} Cost`)
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
    });
  };

  checkStateStaffOutput = (name, years, cost, numFTEs) => {
    cy.contains(name).should('exist');

    years.forEach(year => {
      cy.contains(`FFY ${year}`)
        .parent()
        .within(() => {
          cy.contains(`Cost: $${cost}`).should('exist');
          cy.contains(`FTEs: ${numFTEs}`).should('exist');
          cy.contains(`Total: $${cost * numFTEs}`);
        });
    });
  };

  checkFFYinputCostFields = (years, expectedValue) => {
    years.forEach(year => {
      cy.findByLabelText(`FFY ${year} Cost`).should(
        'have.value',
        expectedValue
      );
    });
  };

  checkFFYcosts = (years, expectedValues) => {
    cy.then(() => {
      years.forEach((year, i) => {
        const convert = this.budgetPage.addCommas(expectedValues[i]);
        cy.contains(`FFY ${year} Cost: $${convert}`).should('exist');
      });
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
    const convert = this.budgetPage.addCommas(totalCost);
    cy.contains(name).should('exist');
    cy.contains(description).should('exist');
    cy.contains(dateRange).should('exist');
    cy.contains(`${convert}`).should('exist');
    this.checkFFYcosts(years, expectedValue);
  };
}

export default ActivityPage;
