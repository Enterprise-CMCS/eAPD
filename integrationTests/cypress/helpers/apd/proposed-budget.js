import ProposedBudgetPage from '../../page-objects/proposed-budget-page';
import ActivitySchedulePage from '../../page-objects/activity-schedule-page';
import ExportPage from '../../page-objects/export-page';

export const testDefaultProposedBudget = years => {
  let proposedBudgetPage;
  let activityList;
  let budgetData;

  before(() => {
    proposedBudgetPage = new ProposedBudgetPage();
    const activityPage = new ActivitySchedulePage();
    cy.goToActivityScheduleSummary();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    activityList = activityPage.getActivityScheduleOverviewNameList();
  });

  beforeEach(() => {
    cy.fixture('proposed-budget-test.json').then(data => {
      budgetData = data;
    });
    cy.goToProposedBudget();
  });

  it('should go to the correct page', () => {
    cy.url().should('include', '/proposed-budget');
    cy.findByRole('heading', { level: 2, name: 'Proposed Budget' });
  });

  describe('Default values in Summary Budget by Activity', () => {
    it('should have default values of $0 for Total Computable Medicaid Cost', () => {
      proposedBudgetPage.verifyComputableMedicaidCostByFFY({
        years,
        expected: budgetData.defaultSummaryBudgetByActivity
      });
    });

    it('should have default values of $0 for Activity Breakdown', () => {
      proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
        years,
        activityList,
        expected: budgetData.defaultActivityBreakdown
      });
    });
  });

  describe('Default values for Summary Budget Table by Expense Type', () => {
    it('should have default values of $0 for Expense Type tables', () => {
      proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
        years: [...years, 'total'],
        expected: budgetData.defaultSummaryBudgetTable.byTypes
      });
    });

    it('should have default values of $0 for Activities Totals table', () => {
      proposedBudgetPage.verifySummaryBudgetTableTotal({
        expected: budgetData.defaultSummaryBudgetTable.totals
      });
    });
  });

  describe('Default values for Quarterly Federal Share by FFP', () => {
    it('should have default values of $0 for FFY tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
        years,
        expected: budgetData.defaultQuarterlyFederalShare
      });
    });

    it('should have default values of $0 for Total tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
        expected: budgetData.defaultQuarterlyFederalShare
      });
    });
  });

  describe('Default values for Estimated Quarterly Incentive Payments', () => {
    it('should have default values for FFY tables', () => {
      proposedBudgetPage.verifyEQIPFormByFFY({
        years,
        expected: budgetData.defaultEQIP
      });
    });
  });
};

export const testDefaultProposedBudgetExportView = years => {
  let proposedBudgetPage;
  let activityList;
  let budgetData;

  before(() => {
    proposedBudgetPage = new ProposedBudgetPage();
    const exportPage = new ExportPage();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    activityList = exportPage.getActivityScheduleOverviewNameList();
  });

  beforeEach(() => {
    cy.fixture('proposed-budget-test.json').then(data => {
      budgetData = data;
    });
  });

  describe('Default values in Summary Budget by Activity', () => {
    it('should have default values of $0 for Total Computable Medicaid Cost', () => {
      proposedBudgetPage.verifyComputableMedicaidCostByFFY({
        years,
        expected: budgetData.defaultSummaryBudgetByActivity
      });
    });

    it('should have default values of $0 for Activity Breakdown', () => {
      proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
        years,
        activityList,
        expected: budgetData.defaultActivityBreakdown
      });
    });
  });

  describe('Default values for Summary Budget Table by Expense Type', () => {
    it('should have default values of $0 for Expense Type Tables', () => {
      proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
        years: [...years, 'total'],
        expected: budgetData.defaultSummaryBudgetTable.byTypes
      });
    });

    it('should have default values of $0 for Activities Totals table', () => {
      proposedBudgetPage.verifySummaryBudgetTableTotal({
        expected: budgetData.defaultSummaryBudgetTable.totals
      });
    });
  });

  describe('Default values for Quarterly Federal Share by FFP', () => {
    it('should have default values of $0 for FFY tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
        years,
        expected: budgetData.defaultQuarterlyFederalShare
      });
    });

    it('should have default values of $0 for Total tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
        expected: budgetData.defaultQuarterlyFederalShare
      });
    });
  });

  describe('Default values for Estimated Quarterly Incentive Payments', () => {
    it('should have default values for FFY tables', () => {
      proposedBudgetPage.verifyEQIPViewByFFY({
        years,
        expected: budgetData.defaultEQIP
      });
    });
  });
};

export const testProposedBudgetWithData = years => {
  let proposedBudgetPage;
  let activityList;
  let budgetData;

  before(() => {
    proposedBudgetPage = new ProposedBudgetPage();
    const activityPage = new ActivitySchedulePage();
    cy.goToActivityScheduleSummary();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    activityList = activityPage.getActivityScheduleOverviewNameList();
  });

  beforeEach(() => {
    cy.fixture('proposed-budget-test.json').then(data => {
      budgetData = data;
    });
    cy.goToProposedBudget();
  });

  it('should go to the correct page', () => {
    cy.url().should('include', '/proposed-budget');
    cy.findByRole('heading', { level: 2, name: 'Proposed Budget' });
  });

  describe('Summary Budget by Activity', () => {
    it('should have the correct values for Total Computable Medicaid Cost', () => {
      proposedBudgetPage.verifyComputableMedicaidCostByFFY({
        years,
        expected: budgetData.dataSummaryBudgetByActivity
      });
    });

    it('should have the correct values for Activity Breakdown', () => {
      proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
        years,
        activityList,
        expected: budgetData.dataActivityBreakdown
      });
    });
  });

  describe('Summary Budget Table by Expense Type', () => {
    it('should have the correct values for Expense Type tables', () => {
      proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
        years: [...years, 'total'],
        expected: budgetData.dataSummaryBudgetTable.byTypes
      });
    });

    it('should have the correct values for Activities Totals table', () => {
      proposedBudgetPage.verifySummaryBudgetTableTotal({
        expected: budgetData.dataSummaryBudgetTable.totals
      });
    });
  });

  describe('Quarterly Federal Share by FFP', () => {
    it('should have the correct values for FFY tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
        years,
        expected: budgetData.dataQuarterlyFederalShare
      });
    });

    it('should have the correct values for Total tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
        expected: budgetData.dataQuarterlyFederalShare
      });
    });
  });
};

export const testProposedBudgetExportViewWithData = years => {
  let proposedBudgetPage;
  let activityList;
  let budgetData;

  before(() => {
    proposedBudgetPage = new ProposedBudgetPage();
    const exportPage = new ExportPage();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    activityList = exportPage.getActivityScheduleOverviewNameList();
  });

  beforeEach(() => {
    cy.fixture('proposed-budget-test.json').then(data => {
      budgetData = data;
    });
  });

  describe('Summary Budget by Activity', () => {
    it('should have the correct values for Total Computable Medicaid Cost', () => {
      proposedBudgetPage.verifyComputableMedicaidCostByFFY({
        years,
        expected: budgetData.dataSummaryBudgetByActivity
      });
    });

    it('should have the correct values for Activity Breakdown', () => {
      proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
        years,
        activityList,
        expected: budgetData.dataActivityBreakdown
      });
    });
  });

  describe('Summary Budget Table by Expense Type', () => {
    it('should have the correct values for Expense Type tables', () => {
      proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
        years: [...years, 'total'],
        expected: budgetData.dataSummaryBudgetTable.byTypes
      });
    });

    it('should have the correct values for Activities Totals table', () => {
      proposedBudgetPage.verifySummaryBudgetTableTotal({
        expected: budgetData.dataSummaryBudgetTable.totals
      });
    });
  });

  describe('Quarterly Federal Share by FFP', () => {
    it('should have the correct values for FFY tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
        years,
        expected: budgetData.dataQuarterlyFederalShare
      });
    });

    it('should have the correct values for Total tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
        expected: budgetData.dataQuarterlyFederalShare
      });
    });
  });
};
