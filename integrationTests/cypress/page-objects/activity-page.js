import BudgetPage from './budget-page';
import { addCommas, getDateRange } from './helper';

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

  checkOutcomeOutput = ({ outcome, metrics }) => {
    cy.contains(outcome).should('exist');
    metrics.forEach(metric => {
      cy.contains(metric).should('exist');
    });
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

  checkMilestoneOutput = ({ milestone, targetDate }) => {
    cy.contains(milestone).should('exist');
    cy.contains(targetDate).should('exist');
  };

  checkStateStaffFFY = ({ years, expectedValue }) => {
    years.forEach((year, index) => {
      cy.contains(`FFY ${year} Cost`)
        .next('div')
        .within(() => {
          const { cost, fte, total } = expectedValue[index];
          cy.findByLabelText('Cost with benefits').should('have.value', cost);
          cy.findByLabelText('Number of FTEs').should('have.value', fte);
          cy.contains(`Total: $${total}`).should('exist');
        });
    });
  };

  checkStateStaffOutput = ({ name, years, cost, fte }) => {
    cy.contains(name).should('exist');

    years.forEach(year => {
      cy.contains(`FFY ${year}`)
        .parent()
        .within(() => {
          cy.contains(`Cost: $${addCommas(cost)}`).should('exist');
          cy.contains(`FTEs: ${fte}`).should('exist');
          cy.contains(`Total: $${addCommas(cost * fte)}`);
        });
    });
  };

  checkFFYinputCostFields = ({ years, FFYcosts }) => {
    years.forEach((year, index) => {
      cy.findByLabelText(`FFY ${year} Cost`).should(
        'have.value',
        FFYcosts[index]
      );
    });
  };

  checkFFYcosts = ({ years, FFYcosts }) => {
    cy.then(() => {
      years.forEach((year, i) => {
        const convert = addCommas(FFYcosts[i]);
        cy.contains(`FFY ${year} Cost: $${convert}`).should('exist');
      });
    });
  };

  checkOtherStateExpensesOutput = ({ category, years, FFYcosts }) => {
    cy.contains(category).should('exist');
    this.checkFFYcosts({ years, FFYcosts });
  };

  checkPrivateContractorOutput = ({
    name,
    description,
    start,
    end,
    totalCosts,
    years,
    FFYcosts
  }) => {
    const dateRange = getDateRange(start, end);

    cy.contains(name).should('exist');
    cy.contains(description).should('exist');
    cy.contains(`Full Contract Term: ${dateRange}`).should('exist');
    cy.contains(`Total Contract Cost: $${addCommas(totalCosts)}`).should(
      'exist'
    );
    this.checkFFYcosts({ years, FFYcosts });
  };
}

export default ActivityPage;
