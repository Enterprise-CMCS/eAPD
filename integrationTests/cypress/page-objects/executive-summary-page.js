/* eslint class-methods-use-this: "off" */

class ExecutiveSummaryPage {
  // 0 based indexing
  getActivitySummary = (index) => {
    return cy.get('#executive-summary-summary')
      .parent()
      .contains('div', `Activity ${index + 1}:`)
  };

  getActivityName = (index) => {
    return cy.get('#executive-summary-summary')
      .parent()
      .contains(`Activity ${index + 1}:`)
  }

  getActivityDates = (index) => {
    return this.getActivitySummary(index)
      .contains('li', /Start date - End date:/i)
  }

  getActivityCost = (index) => {
    return this.getActivitySummary(index)
      .contains('li', /Total cost of activity:/i)
  }

  getActivityMedicaidCost = (index, year) => {
    if(year) {
      return this.getActivitySummary(index)
        .contains('li', `FFY ${year}:`)
    }
    return this.getActivitySummary(index)
      .contains('li', /Total Computable Medicaid Cost:/i)
  }

  clickActivityEdit = (index) => {
    this.getActivitySummary(index)
      .parent()
      .findByRole('button', { name:/Edit/i })
      .click()
  }

  getTotalCostDiv = () => {
    return cy.get('#executive-summary-summary')
      .parent()
      .findByRole('heading', { name: /Total cost/i })
      .parent()
  };

  getRequestedFiscalYears = () => {
    return this.getTotalCostDiv()
      .contains('li', /Federal Fiscal Years requested:/i);
  }

  getTotalMedicaidCost = () => {
    return this.getTotalCostDiv()
      .contains('li', /Total Computable Medicaid Cost:/i);
  }

  getTotalFundingRequest = () => {
    return this.getTotalCostDiv()
      .contains('li', /Total Funding Request:/i);
  }

  getTotalYearCost = (year) => {
    return this.getTotalCostDiv()
      .contains('li', `FFY ${year}:`);
  }

  getTableRows = (costCategory, year) => {
    cy.contains('table', costCategory)
      .as('table')
    if(year) {
      return cy.get('@table')
        .contains(`FFY ${year}`)
        .siblings()
    }
    return cy.get('@table')
      .contains(/^Total$/i)
      .siblings()
  }

}

export default ExecutiveSummaryPage;
