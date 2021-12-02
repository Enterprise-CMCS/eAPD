import ExecutiveSummaryPage from '../../page-objects/executive-summary-page';

export const testDefaultExecutiveSummary = years => {
  let summaryPage;

  before(() => {
    summaryPage = new ExecutiveSummaryPage();
  });

  it('should display the default values for Executive Summary page', () => {
    cy.goToExecutiveSummary();
    cy.url().should('contain', '/executive-summary');
    cy.findByRole('heading', { name: /^Executive Summary$/i });

    // Activities Summary
    summaryPage
      .getActivityName(0)
      .should('have.text', 'Activity 1: Program Administration');

    summaryPage
      .getActivityDates(0)
      .should(
        'have.text',
        'Start Date - End Date: Date not specified - Date not specified'
      );

    summaryPage
      .getActivityCost(0)
      .should('have.text', 'Total Cost of Activity: $0');

    summaryPage
      .getActivityMedicaidCost(0)
      .should(
        'have.text',
        'Total Computable Medicaid Cost: $0 ($0 Federal share)'
      );

    // Repeat for all FFYs
    years.forEach(year => {
      summaryPage
        .getActivityMedicaidCost(0, year)
        .should(
          'have.text',
          `FFY ${year}: $0 | Total Computable Medicaid Cost: $0 ($0 Federal share)`
        );
    });

    summaryPage.clickActivityEdit(0);
    cy.location('pathname').should($pathname => {
      expect($pathname).to.contain('/activity/0/overview');
    });
    cy.goToExecutiveSummary();

    // Total Cost of Activities
    let expected = 'Federal Fiscal Years Requested: FFY ';
    for (let i = 0; i < years.length; i += 1) {
      if (i === 0) expected += years[i];
      else expected += `, ${years[i]}`;
    }
    summaryPage.getRequestedFiscalYears().should('have.text', expected);

    summaryPage
      .getTotalMedicaidCost()
      .should(
        'have.text',
        'Total Computable Medicaid Cost: $0 ($0 Federal share)'
      );

    summaryPage
      .getTotalFundingRequest()
      .should('have.text', 'Total Funding Request: $0');

    years.forEach(year => {
      summaryPage
        .getTotalYearCost(year)
        .should(
          'have.text',
          `FFY ${year}: $0 | $0 Total Computable Medicaid Cost | $0 Federal share`
        );
    });

    cy.log('Default values in HIT + HIE and MMIS table');
    const costCategories = ['HIT + HIE', 'MMIS'];

    costCategories.forEach(category => {
      years.forEach(year => {
        summaryPage.getTableRows(category, year).each($el => {
          cy.wrap($el).should('have.text', '$0');
        });
      });

      summaryPage.getTableRows(category).each($el => {
        cy.wrap($el).should('have.text', '$0');
      });
    });
  });

  // TODO: export view tests
};

export const testExecutiveSummaryWithData = () => {
  //   const summaryPage = new ExecutiveSummaryPage();
  //   let executiveSummaryURL;
  // TODO: test with data
};
