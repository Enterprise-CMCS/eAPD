import ActivityPage from './activity-page';
import BudgetPage from './budget-page';

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
        cy.findByLabelText('Year').clear().type(list[2]);
      });
  };

  fillTextField = (className, string, index) => {
    if (Number.isInteger(index)) {
      cy.get(`[class="${className}"]`).eq(index).clear().type(string);
      cy.waitForSave();
    } else {
      cy.get(`[class="${className}"]`).clear().type(string);
      cy.waitForSave();
    }
  };

  fillInputField = (id, string) => {
    cy.findByLabelText(id).clear().type(string);
    cy.waitForSave();
  };

  fillActivityOverview = (
    shortOverview,
    startDate,
    endDate,
    detailedDesc,
    justifications
  ) => {
    cy.setTinyMceContent('activity-short-overview-field', shortOverview);
    cy.waitForSave();

    this.fillDate('Start date', startDate);

    this.fillDate('End date', endDate);

    cy.setTinyMceContent('activity-description-field', detailedDesc);
    cy.waitForSave();
    cy.setTinyMceContent('activity-alternatives-field', justifications);
    cy.waitForSave();
  };

  fillOutcomeForm = (outcome, metric1, metric2) => {
    this.fillTextField('ds-c-field', outcome, 0);
    this.fillTextField('ds-c-field', metric1, 1);
    cy.findByRole('button', { name: /Add Metric/ }).click();
    cy.waitForSave();
    this.fillTextField('ds-c-field', metric2, 2);
    cy.waitForSave();
    cy.findByRole('button', { name: /Done/i }).click();
  };

  fillMilestoneForm = (milestone, date) => {
    this.fillInputField('Name', milestone);
    cy.get('[class="ds-c-fieldset"]').within(() => {
      this.fillDate('Target completion date', date);
    });
    cy.waitForSave();
    cy.findByRole('button', { name: /Done/i }).click();
  };

  fillContractorForm = (
    name,
    desc,
    startDate,
    endDate,
    totalCost,
    FFYcosts,
    index
  ) => {
    this.fillTextField('ds-c-field', name);
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.setTinyMceContent(`contractor-description-field-${index}`, desc);
    cy.waitForSave();
    this.fillDate('Contract start date', startDate);
    this.fillDate('Contract end date', endDate);

    this.fillTextField(
      'ds-c-field ds-c-field--currency ds-c-field--medium',
      totalCost,
      0
    );

    this.fillTextField(
      'ds-c-field ds-c-field--currency ds-c-field--medium',
      FFYcosts[0],
      1
    );

    this.fillTextField(
      'ds-c-field ds-c-field--currency ds-c-field--medium',
      FFYcosts[1],
      2
    );
    cy.waitForSave();
    cy.findByRole('button', { name: /Done/i }).click();
  };

  fillCostAllocation = (mainDesc, FFYDescriptions, FFYCosts, years) => {
    cy.setTinyMceContent('cost-allocation-methodology-field', mainDesc);
    cy.waitForSave();

    years.forEach((year, i) => {
      cy.setTinyMceContent(
        `cost-allocation-narrative-${year}-other-sources-field`,
        FFYDescriptions[i]
      );
      cy.waitForSave();
      this.fillTextField('ds-c-field ds-c-field--currency', FFYCosts[i], i);
    });
    cy.waitForSave();
  };

  fillQuarter = (quarter, stateValue, contractorValue) => {
    const contractorInput = quarter + 4;

    cy.get('[class="budget-table"]').within(() => {
      cy.get('[class="ds-c-field budget-table--input__number"]')
        .eq(quarter)
        .clear()
        .type(stateValue);
      cy.waitForSave();

      cy.get('[class="ds-c-field budget-table--input__number"]')
        .eq(contractorInput)
        .clear()
        .type(contractorValue);
    });
  };

  checkQuarterSubtotal = (
    stateString,
    contractorString,
    expectedState,
    expectedContractor
  ) => {
    const stateVal = this.budgetPage.convertStringToNum(stateString);
    const contractorVal = this.budgetPage.convertStringToNum(contractorString);

    expect(stateVal).to.be.closeTo(expectedState, 5);
    expect(contractorVal).to.be.closeTo(expectedContractor, 5);
  };

  checkPercentageSubtotal = (staff, contractor) => {
    cy.get('[class="budget-table"]').within(() => {
      cy.get('[class="budget-table--number budget-table--subtotal"]')
        .eq(0)
        .should('contain', `+${staff}%`);
      cy.get('[class="budget-table--number budget-table--subtotal"]')
        .eq(2)
        .should('contain', `+${contractor}%`);
    });
  };
}
export default PopulatePage;
