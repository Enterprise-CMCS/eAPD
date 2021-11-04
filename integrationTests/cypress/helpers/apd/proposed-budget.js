import ProposedBudgetPage from '../../page-objects/proposed-budget-page';
import ActivitySchedulePage from '../../page-objects/activity-schedule-page';
import ExportPage from '../../page-objects/export-page';
import expectedFixture from '../../fixtures/proposed-budget-test.json';

export const testDefaultProposedBudget = years => {
  let proposedBudgetPage;
  let activityList;

  before(() => {
    proposedBudgetPage = new ProposedBudgetPage();
    const activityPage = new ActivitySchedulePage();
    cy.goToActivityScheduleSummary();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    activityList = activityPage.getActivityScheduleOverviewNameList();
  });

  beforeEach(() => {
    cy.goToProposedBudget();
  });

  it('should go to the correct page', () => {
    cy.url().should('include', '/proposed-budget');
    cy.findByRole('heading', { level: 2, name: 'Proposed Budget' });
    cy.log(`years: ${JSON.stringify(years)}`);
  });

  describe('Default values in Summary Budget by Activity', () => {
    it('should have default values of $0 for Total Computable Medicaid Cost', () => {
      proposedBudgetPage.verifyComputableMedicaidCostByFFY({
        years,
        expected: expectedFixture.defaultSummaryBudgetByActivity
      });
    });

    it('should have default values of $0 for Activity Breakdown', () => {
      proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
        years,
        activityList,
        expected: expectedFixture.defaultActivityBreakdown
      });
    });
  });

  describe('Default values for Summary Budget Table by Expense Type', () => {
    it('should have default values of $0 for Expense Type Tables', () => {
      proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
        years,
        expected: expectedFixture.defaultSummaryBudgetTable.byTypes
      });
    });

    it('should have default values of $0 for Activities Totals table', () => {
      proposedBudgetPage.verifySummaryBudgetTableTotal({
        expected: expectedFixture.defaultSummaryBudgetTable.totals
      });
    });
  });

  describe('Default values for Quarterly Federal Share by FFP', () => {
    it('should have default values of $0 for FFY tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
        years,
        expected: expectedFixture.defaultQuarterlyFederalShare
      });
    });

    it('should have default values of $0 for Total tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
        expected: expectedFixture.defaultQuarterlyFederalShare
      });
    });
  });

  describe('Default values for Estimated Quarterly Incentive Payments', () => {
    it('should have default values for FFY tables', () => {
      proposedBudgetPage.verifyEQIPFormByFFY({
        years,
        expected: expectedFixture.defaultEQIPForm
      });
    });
  });
};

export const testDefaultProposedBudgetExportView = years => {
  let proposedBudgetPage;
  let activityList;

  before(() => {
    proposedBudgetPage = new ProposedBudgetPage();
    const exportPage = new ExportPage();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    activityList = exportPage.getActivityScheduleOverviewNameList();
  });

  describe('Default values in Summary Budget by Activity', () => {
    it('should have default values of $0 for Total Computable Medicaid Cost', () => {
      proposedBudgetPage.verifyComputableMedicaidCostByFFY({
        years,
        expected: expectedFixture.defaultSummaryBudgetByActivity
      });
    });

    it('should have default values of $0 for Activity Breakdown', () => {
      proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
        years,
        activityList,
        expected: expectedFixture.defaultActivityBreakdown
      });
    });
  });

  describe('Default values for Summary Budget Table by Expense Type', () => {
    it('should have default values of $0 for Expense Type Tables', () => {
      proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
        years,
        expected: expectedFixture.defaultSummaryBudgetTable.byTypes
      });
    });

    it('should have default values of $0 for Activities Totals table', () => {
      proposedBudgetPage.verifySummaryBudgetTableTotal({
        expected: expectedFixture.defaultSummaryBudgetTable.totals
      });
    });
  });

  describe('Default values for Quarterly Federal Share by FFP', () => {
    it('should have default values of $0 for FFY tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
        years,
        expected: expectedFixture.defaultQuarterlyFederalShare
      });
    });

    it('should have default values of $0 for Total tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
        expected: expectedFixture.defaultQuarterlyFederalShare
      });
    });
  });

  describe('Default values for Estimated Quarterly Incentive Payments', () => {
    it('should have default values for FFY tables', () => {
      proposedBudgetPage.verifyEQIPViewByFFY({
        years,
        expected: expectedFixture.defaultEQIPView
      });
    });
  });
};

export const testProposedBudgetWithData = () => {};

export const testProposedBudgetExportViewWithData = () => {};
