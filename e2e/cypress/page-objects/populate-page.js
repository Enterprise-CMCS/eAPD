import ActivityPage from './activity-page.js';
import BudgetPage from './budget-page.js';

class PopulatePage {
  budgetPage = new BudgetPage();

  activityPage = new ActivityPage();

  fillDate = (string, list) => {
    cy.findAllByText(string)
      .parent()
      .next()
      .within(() => {
        cy.findByLabelText('Month').clear().type(list[0]);
        cy.findByLabelText('Day').clear().type(list[1]);
        cy.findByLabelText('Year').clear().type(list[2]).blur();
      });
  };

  fillTextField = (className, string, index) => {
    if (Number.isInteger(index)) {
      cy.get(`[class="${className}"]`).eq(index).type(string).blur();
    } else {
      cy.get(`[class="${className}"]`).clear().type(string).blur();
    }
  };

  fillInputField = (id, string) => {
    cy.findByLabelText(id).clear().type(string);
  };

  fillActivityOverview = ({
    shortOverview,
    detailedDescription,
    supportingJustifications,
    supportsMedicaid
  } = {}) => {
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.setTinyMceContent('activity-short-overview-field', shortOverview);
    cy.setTinyMceContent('activity-description-field', detailedDescription);
    cy.setTinyMceContent(
      'activity-alternatives-field',
      supportingJustifications
    );
    cy.setTinyMceContent(
      'standards-and-conditions-supports-field',
      supportsMedicaid
    );
  };

  fillOutcomeForm = ({ outcome, metrics } = {}) => {
    cy.findByRole('button', { name: /Add Outcome/i }).click();
    this.fillTextField('ds-c-field', outcome, 0);
    cy.findByRole('button', { name: /Add Metric to Outcome/i }).click();
    metrics.forEach((metric, index) => {
      this.fillTextField('ds-c-field', metric, index + 1);
      if (index < metrics.length - 1) {
        cy.findByRole('button', { name: /Add Metric to Outcome/i }).click();
      }
    });
    cy.get('button[id="form-and-review-list--done-btn"]').click();
    // cy.findByRole('button', { name: /Save/i }).click();
  };

  fillMilestoneForm = ({ milestone, targetDate } = {}) => {
    this.fillInputField('Name', milestone);
    cy.get('[class="ds-c-fieldset"]')
      .eq(2)
      .within(() => {
        this.fillDate('Target completion date', targetDate);
      });
    cy.get('button[id="form-and-review-list--done-btn"]').click();
    // cy.findByRole('button', { name: /Save/i }).click();
  };

  fillContractorForm = ({
    years,
    name,
    description,
    start,
    end,
    totalCosts,
    hourly = false,
    FFYcosts,
    index
  } = {}) => {
    this.fillTextField('ds-c-field', name);

    this.fillDate('Contract start date', start);
    this.fillDate('Contract end date', end);

    this.fillTextField(
      'ds-c-field ds-c-field--currency ds-c-field--medium',
      totalCosts,
      0
    );

    if (hourly) {
      cy.findByRole('radio', { name: /Yes/i }).click({ force: true });
      years.forEach((year, i) => {
        this.fillTextField('ds-c-field ds-c-field--medium', FFYcosts[i][0], i);

        this.fillTextField(
          'ds-c-field ds-c-field--currency ds-c-field--medium',
          FFYcosts[i][1],
          i + 1
        );
      });
    } else {
      years.forEach((year, i) => {
        this.fillTextField(
          'ds-c-field ds-c-field--currency ds-c-field--medium',
          FFYcosts[i],
          i + 1
        );
      });
    }

    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.setTinyMceContent(`contractor-description-field-${index}`, description);

    cy.findByRole('button', { name: /Save/i }).click();
  };

  fillCostAllocation = ({
    description,
    FFYdescriptions,
    costs,
    years
  } = {}) => {
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.setTinyMceContent('cost-allocation-methodology-field', description);

    years.forEach((year, i) => {
      cy.setTinyMceContent(
        `cost-allocation-narrative-${year}-other-sources-field`,
        FFYdescriptions[i]
      );
      this.fillTextField('ds-c-field ds-c-field--currency', costs[i], i);
    });
  };

  fillQuarter = ({ quarter, stateValue, contractorValue } = {}) => {
    const contractorInput = quarter + 4;

    cy.get('[class="budget-table"]').within(() => {
      cy.get('[class="ds-c-field budget-table--input__number"]')
        .eq(quarter)
        .clear()
        .type(stateValue);

      cy.get('[class="ds-c-field budget-table--input__number"]')
        .eq(contractorInput)
        .clear()
        .type(contractorValue);
    });
  };
}
export default PopulatePage;
