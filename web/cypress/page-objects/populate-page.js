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
        cy.findByLabelText('Month').type(list[0]);
        cy.findByLabelText('Day').type(list[1]);
        cy.findByLabelText('Year').type(list[2]);
      });
  };

  fillTextField = (className, string, index) => {
    if (Number.isInteger(index)) {
      cy.get(`[class="${className}"]`).eq(index).type(string);
    } else {
      cy.get(`[class="${className}"]`).type(string);
    }
  };

  fillInputField = (id, string) => {
    cy.findByLabelText(id).type(string);
  };

  fillActivityOverview = (
    shortOverview,
    startDate,
    endDate,
    detailedDesc,
    justifications
  ) => {
    cy.setTinyMceContent('activity-short-overview-field', shortOverview);

    this.fillDate('Start date', startDate);

    this.fillDate('End date', endDate);

    cy.setTinyMceContent('activity-description-field', detailedDesc);
    cy.setTinyMceContent('activity-alternatives-field', justifications);
  };

  fillOutcomeForm = (outcome, metric1, metric2) => {
    this.fillTextField('ds-c-field', outcome, 0);
    this.fillTextField('ds-c-field', metric1, 1);
    cy.findByRole('button', { name: /Add Metric/ }).click();
    this.fillTextField('ds-c-field', metric2, 2);
    cy.findByRole('button', { name: /Done/i }).click();
  };

  fillMilestoneForm = (milestone, date) => {
    this.fillInputField('Name', milestone);
    cy.get('[class="ds-c-fieldset"]').within(() => {
      this.fillDate('Target completion date', date);
    });
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
    cy.setTinyMceContent(`contractor-description-field-${index}`, desc);
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
    cy.findByRole('button', { name: /Done/i }).click();
  };

  fillCostAllocation = (mainDesc, FFYDescriptions, FFYCosts, years) => {
    cy.setTinyMceContent('cost-allocation-methodology-field', mainDesc);

    for (let i = 0; i < years.length; i += 1) {
      cy.setTinyMceContent(
        `cost-allocation-narrative-${years[i]}-other-sources-field`,
        FFYDescriptions[i]
      );
      this.fillTextField('ds-c-field ds-c-field--currency', FFYCosts[i], i);
      // this.budgetPage.checkActivityTotalCostTable();
    }
  };

  fillQuarter = (
    quarter,
    stateValue,
    contractorValue,
    stateTotal,
    contractorTotal
  ) => {
    const index = quarter - 1;
    const index2 = index + 4;
    cy.get('[class="ds-c-field budget-table--input__number"]')
      .eq(index)
      .type(stateValue);
    // const stateCheck = Math.ceil(stateValue * 0.01 * stateTotal);
    // const converted = this.budgetPage.addCommas(stateCheck);
    // this.activityPage.checkTextField(
    //   'budget-table--number',
    //   `$${converted}`,
    //   index
    // );

    cy.get('[class="ds-c-field budget-table--input__number"]')
      .eq(index2)
      .type(contractorValue);
    const ceilCheck = Math.ceil(contractorValue * 0.01 * contractorTotal);
    const converted3 = this.budgetPage.addCommas(ceilCheck);

    const floorCheck = Math.ceil(contractorValue * 0.01 * contractorTotal);
    const converted4 = this.budgetPage.addCommas(floorCheck);

    cy.get('[class="budget-table--number"]')
      .eq(index2)
      .contains(`$${converted3}` || `$${converted4}`);
  };
}

export default PopulatePage;
