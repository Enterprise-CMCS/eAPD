import ExecutiveSummaryPage from '../../page-objects/executive-summary-page';

export const testDefaultExecutiveSummary = years => {
  let summaryPage;

  before(() => {
    summaryPage = new ExecutiveSummaryPage();
  });

  beforeEach(() => {
    cy.goToExecutiveSummary();
  });

  it('should go to the correct page', () => {
    cy.url().should('contain', '/executive-summary');
    cy.findByRole('heading', { name: /^Executive Summary$/i });
  });

  describe('Default values in Activities Summary', () => {
    it('Default name', () => {
      summaryPage
        .getActivityName(0)
        .should('have.text', 'Activity 1: Program Administration');
    });
    it('Default dates', () => {
      summaryPage
        .getActivityDates(0)
        .should(
          'have.text',
          'Start Date - End Date: Date not specified - Date not specified'
        );
    });
    it('Default total cost', () => {
      summaryPage
        .getActivityCost(0)
        .should('have.text', 'Total Cost of Activity: $0');
    });
    it('Default Medicaid costs & Federal Shares', () => {
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
    });
    it('Clicking edit navigates to activity overview page for activity', () => {
      summaryPage.clickActivityEdit(0);
      cy.location('pathname').should($pathname => {
        expect($pathname).to.contain('/activity/0/overview');
      });
    });
  });

  describe('Total Cost', () => {
    it('Shows that the selected fiscal years were requested', () => {
      let expected = 'Federal Fiscal Years Requested: FFY ';
      for (let i = 0; i < years.length; i += 1) {
        if (i === 0) expected += years[i];
        else expected += `, ${years[i]}`;
      }
      summaryPage.getRequestedFiscalYears().should('have.text', expected);
    });

    it('Total Medicaid cost/Federal share is $0', () => {
      summaryPage
        .getTotalMedicaidCost()
        .should(
          'have.text',
          'Total Computable Medicaid Cost: $0 ($0 Federal share)'
        );
    });

    it('Total Funding Request is $0', () => {
      summaryPage
        .getTotalFundingRequest()
        .should('have.text', 'Total Funding Request: $0');
    });

    it('Each FFY costs $0', () => {
      years.forEach(year => {
        summaryPage
          .getTotalYearCost(year)
          .should(
            'have.text',
            `FFY ${year}: $0 | $0 Total Computable Medicaid Cost | $0 Federal share`
          );
      });
    });
  });

  describe('Default values in HIT + HIE and MMIS table', () => {
    const costCategories = ['HIT + HIE', 'MMIS'];

    costCategories.forEach(category => {
      it(`All ${category} rows are $0`, () => {
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
  });
};

export const testDefaultExecutiveSummaryExportView = () => {};

export const testExecutiveSummaryWithData = () => {
  //   const summaryPage = new ExecutiveSummaryPage();
  //   let executiveSummaryURL;
};

export const testExecutiveSummaryExportViewWithData = () => {};
