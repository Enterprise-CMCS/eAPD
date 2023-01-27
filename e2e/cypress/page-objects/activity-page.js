import BudgetPage from './budget-page.js';
import { addCommas, getDateRange } from './helper.js';

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

  checkError = (className, expectedLength) => {
    cy.get(`[class="${className}]`).should('have.length', expectedLength);
  };

  checkInputField = (name, expectedValue) => {
    cy.findByLabelText(name).should('have.value', expectedValue);
  };

  checkDate = (string, month = '', day = '', year = '') => {
    cy.contains(string)
      .parent()
      .next('div')
      .within(() => {
        cy.findByLabelText('Month').should('have.value', month);
        cy.findByLabelText('Day').should('have.value', day);
        cy.findByLabelText('Year').should('have.value', year);
      });
  };

  checkDeleteButton = (alert, heading, check) => {
    cy.contains(alert).should('not.exist');
    cy.contains('Delete').click();
    cy.contains(heading).should('exist');
    cy.get('button[id="dialog-cancel"]').click({ force: true });
    cy.contains(heading).should('not.exist');
    cy.contains(alert).should('not.exist');
    cy.contains(check).should('exist');

    cy.contains('Delete').click();
    cy.contains(heading).should('exist');
    cy.get('button[id="dialog-delete"]').click({ force: true });
    cy.waitForSave();

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
    cy.findByRole('button', { name: /Add Metric to Outcome/i }).click();
    cy.get('[class="ds-c-review"]')
      .eq(0)
      .within(() => {
        cy.contains('Remove').should('exist');
      });
    cy.get('[class="ds-c-review"]')
      .eq(1)
      .within(() => {
        cy.contains('Remove').should('exist');
      });

    cy.get('div.ds-c-review > div > button.ds-c-button').eq(1).click();
    cy.contains('Delete Metric?').should('not.exist');

    cy.get('div.ds-c-review > div > button.ds-c-button').should('not.exist');
    cy.findByRole('button', { name: /Save/i }).click();
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

  checkHourlyCosts = ({ years, FFYcosts }) => {
    cy.then(() => {
      years.forEach((year, i) => {
        const convert = addCommas(FFYcosts[i][1]);
        cy.contains(
          `FFY ${year} Cost:Number of Hours:${FFYcosts[i][0]}Hourly Rate: $${convert}/hour`
        ).should('exist');
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
    FFYcosts,
    hourly
  }) => {
    const dateRange = getDateRange(start, end);

    cy.contains(name).should('exist');
    cy.contains(description).should('exist');
    cy.contains(`Full Contract Term: ${dateRange}`).should('exist');
    cy.contains(`Total Contract Cost: $${addCommas(totalCosts)}`).should(
      'exist'
    );
    if (hourly) {
      this.checkHourlyCosts({ years, FFYcosts });
    } else {
      this.checkFFYcosts({ years, FFYcosts });
    }
  };
}

export default ActivityPage;
