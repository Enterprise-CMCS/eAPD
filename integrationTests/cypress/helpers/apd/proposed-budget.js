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

  it.only('should have the default values for Proposed Budget', () => {
    cy.goToProposedBudget();

    cy.url().should('include', '/proposed-budget');
    cy.findByRole('heading', { level: 2, name: 'Proposed Budget' });

    proposedBudgetPage.verifyComputableMedicaidCostByFFY({
      years,
      expected: budgetData.defaultCombinedActivityCost
    });

    // proposedBudgetPage.verifyActvityBreakdown({
    //   years,
    //   activityList,
    //   expected: budgetData.defaultActivityBreakdown
    // });

    proposedBudgetPage.verifySummaryBudgetTables({
      years: [...years, 'total'],
      expected: budgetData.defaultSummaryBudget,
      expectedTotals: budgetData.defaultSummaryBudgetTotals
    });

    // proposedBudgetPage.verifySummaryBudgetTableTotal({
    //   expected: budgetData.defaultSummaryBudgetTable.totals
    // });

    proposedBudgetPage.verifyQuarterlyFederalShareByActivity({
      years,
      expected: budgetData.defaultQFSByActivity
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByTotals({
      expectedHITandHIETotal: budgetData.defaultHITandHIETotal,
      expectedMMISTotal: budgetData.defaultMMISTotal
    });

    // proposedBudgetPage.verifyEQIPFormByFFY({
    //   years,
    //   expected: budgetData.defaultEQIP
    // });
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
      name: /Activity Schedule Summary/i,
      timeout: 10000
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

    proposedBudgetPage.verifyComputableMedicaidCostByFFY({
      years,
      expected: budgetData.populatedCombinedActivityCost
    });

    proposedBudgetPage.verifyActvityBreakdown({
      years,
      activityList,
      expected: budgetData.populatedActivityBreakdown
    });

    proposedBudgetPage.verifySummaryBudgetTables({
      years: [...years, 'total'],
      expected: budgetData.populatedSummaryBudget,
      expectedTotals: budgetData.populatedSummaryBudgetTotals
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByActivity({
      years,
      expected: budgetData.populatedQFSByActivity
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByTotals({
      expectedHITandHIETotal: budgetData.populatedHITandHIETotal,
      expectedMMISTotal: budgetData.populatedMMISTotal
    });

    proposedBudgetPage.fillInEQIPFormByFFY({
      years,
      expected: budgetData.dataEQIP
    });

    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.waitForSave();
  });

  it.only('should export the correct values for Proposed Budget Export View', () => {
    cy.goToExportView();

    proposedBudgetPage.verifyComputableMedicaidCostByFFY({
      years,
      expected: budgetData.populatedCombinedActivityCost
    });

    proposedBudgetPage.verifyActvityBreakdown({
      years,
      activityList,
      expected: budgetData.populatedActivityBreakdown
    });

    proposedBudgetPage.verifySummaryBudgetTables({
      years: [...years, 'total'],
      expected: budgetData.populatedSummaryBudget,
      expectedTotals: budgetData.populatedSummaryBudgetTotals
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByActivity({
      years,
      expected: budgetData.populatedQFSByActivity
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByTotals({
      expectedHITandHIETotal: budgetData.populatedHITandHIETotal,
      expectedMMISTotal: budgetData.populatedMMISTotal
    });

    // proposedBudgetPage.verifyEQIPViewByFFY({
    //   years,
    //   expected: budgetData.dataEQIP
    // });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
