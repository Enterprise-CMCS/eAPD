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
    // cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
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
    cy.findByRole('heading', {
      name: /Activity Schedule Summary/i
    }).should('exist');
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

  it('should have the correct values for Proposed Budget', () => {
    cy.log('Summary Budget by Activity, Total Computable Medicaid Cost');
    proposedBudgetPage.verifyComputableMedicaidCostByFFY({
      years,
      expected: budgetData.dataSummaryBudgetByActivity
    });

    cy.log('Summary Budget by Activity, Activity Breakdown');
    proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
      years,
      activityList,
      expected: budgetData.dataActivityBreakdown
    });

    cy.log('Summary Budget Table by Expense Type, Expense Type tables');
    proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
      years: [...years, 'total'],
      expected: budgetData.dataSummaryBudgetTable.byTypes
    });

    cy.log('Summary Budget Table by Expense Type, Activities Totals table');
    proposedBudgetPage.verifySummaryBudgetTableTotal({
      expected: budgetData.dataSummaryBudgetTable.totals
    });

    cy.log('Quarterly Federal Share by FFY, FFY tables');
    proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
      years,
      expected: budgetData.dataQuarterlyFederalShare
    });

    cy.log('Quarterly Federal Share by FFY, Total tables');
    proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
      expected: budgetData.dataQuarterlyFederalShare
    });

    cy.log('Estimated Quarterly Incentive Payments, FFY tables');
    proposedBudgetPage.fillInEQIPFormByFFY({
      years,
      expected: budgetData.dataEQIP
    });
  });

  it('should export the correct values for Proposed Budget Export View', () => {
    cy.goToExportView();

    // cy.log('Summary Budget by Activity, Total Computable Medicaid Cost');
    // proposedBudgetPage.verifyComputableMedicaidCostByFFY({
    //   years,
    //   expected: budgetData.dataSummaryBudgetByActivity
    // });

    // cy.log('Summary Budget by Activity, Activity Breakdown');
    // proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
    //   years,
    //   activityList,
    //   expected: budgetData.dataActivityBreakdown
    // });

    // cy.log('Summary Budget Table by Expense Type, Expense Type tables');
    // proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
    //   years: [...years, 'total'],
    //   expected: budgetData.dataSummaryBudgetTable.byTypes
    // });

    // cy.log('Summary Budget Table by Expense Type, Activities Totals table');
    // proposedBudgetPage.verifySummaryBudgetTableTotal({
    //   expected: budgetData.dataSummaryBudgetTable.totals
    // });

    // cy.log('Quarterly Federal Share by FFP, FFY tables');
    // proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
    //   years,
    //   expected: budgetData.dataQuarterlyFederalShare
    // });

    // cy.log('Quarterly Federal Share by FFP, Total tables');
    // proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
    //   expected: budgetData.dataQuarterlyFederalShare
    // });

    // cy.log('Estimated Quarterly Incentive Payments, FFY tables');
    // proposedBudgetPage.verifyEQIPViewByFFY({
    //   years,
    //   expected: budgetData.dataEQIP
    // });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
