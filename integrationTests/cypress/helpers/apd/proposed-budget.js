import ProposedBudgetPage from '../../page-objects/proposed-budget-page';
import ActivitySchedulePage from '../../page-objects/activity-schedule-page';

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
  });

  it('should have the default values for Proposed Budget', () => {
    cy.goToProposedBudget();

    cy.url().should('include', '/proposed-budget');
    cy.findByRole('heading', { level: 2, name: 'Proposed Budget' });

    proposedBudgetPage.verifyComputableMedicaidCostByFFY({
      years,
      expected: budgetData.defaultSummaryBudgetByActivity
    });

    proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
      years,
      activityList,
      expected: budgetData.defaultActivityBreakdown
    });

    proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
      years: [...years, 'total'],
      expected: budgetData.defaultSummaryBudgetTable.byTypes
    });

    proposedBudgetPage.verifySummaryBudgetTableTotal({
      expected: budgetData.defaultSummaryBudgetTable.totals
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
      years,
      expected: budgetData.defaultQuarterlyFederalShare
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
      expected: budgetData.defaultQuarterlyFederalShare
    });

    proposedBudgetPage.verifyEQIPFormByFFY({
      years,
      expected: budgetData.defaultEQIP
    });
  });

  it('should display the default values for Proposed Budget in export view', () => {
    cy.goToExportView();

    proposedBudgetPage.verifyComputableMedicaidCostByFFY({
      years,
      expected: budgetData.defaultSummaryBudgetByActivity
    });

    proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
      years,
      activityList,
      expected: budgetData.defaultActivityBreakdown
    });

    proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
      years: [...years, 'total'],
      expected: budgetData.defaultSummaryBudgetTable.byTypes
    });

    proposedBudgetPage.verifySummaryBudgetTableTotal({
      expected: budgetData.defaultSummaryBudgetTable.totals
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
      years,
      expected: budgetData.defaultQuarterlyFederalShare
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
      expected: budgetData.defaultQuarterlyFederalShare
    });

    proposedBudgetPage.verifyEQIPViewByFFY({
      years,
      expected: budgetData.defaultEQIP
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
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
  });

  it('should have the correct values for Proposed Budget', () => {
    cy.goToProposedBudget();
    cy.url().should('include', '/proposed-budget');
    cy.findByRole('heading', { level: 2, name: 'Proposed Budget' });

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

    cy.log('Quarterly Federal Share by FFP, FFY tables');
    proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
      years,
      expected: budgetData.dataQuarterlyFederalShare
    });

    cy.log('Quarterly Federal Share by FFP, Total tables');
    proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
      expected: budgetData.dataQuarterlyFederalShare
    });

    cy.log('Estimated Quarterly Incentive Payments, FFY tables');
    proposedBudgetPage.verifyEQIPViewByFFY({
      years,
      expected: budgetData.dataEQIP
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
