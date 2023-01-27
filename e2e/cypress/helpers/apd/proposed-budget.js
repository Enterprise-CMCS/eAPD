import ProposedBudgetPage from '../../page-objects/proposed-budget-page.js';
import ActivitySchedulePage from '../../page-objects/activity-schedule-page.js';

export const testDefaultProposedBudget = function () {
  let proposedBudgetPage;

  before(function () {
    proposedBudgetPage = new ProposedBudgetPage();
  });

  beforeEach(function () {
    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.fixture('proposed-budget-test.json').as('budgetData');

    cy.useStateStaff();
    cy.visit(this.apdUrl);
    const activityPage = new ActivitySchedulePage();
    cy.goToActivityScheduleSummary();
    cy.wrap(activityPage.getActivityScheduleOverviewNameList()).as(
      'activityList'
    );
  });

  it('should have the default values for Proposed Budget', function () {
    const years = this.years;
    cy.goToProposedBudget();

    cy.url().should('include', '/proposed-budget');
    cy.findByRole('heading', { level: 2, name: 'Proposed Budget' });

    proposedBudgetPage.verifyComputableMedicaidCostByFFY({
      years,
      expected: this.budgetData.defaultCombinedActivityCost
    });

    proposedBudgetPage.verifyActvityBreakdown({
      years,
      activityList: this.activityList,
      expected: this.budgetData.defaultActivityBreakdown
    });

    proposedBudgetPage.verifySummaryBudgetTables({
      years: [...years, 'total'],
      expected: this.budgetData.defaultSummaryBudget,
      expectedTotals: this.budgetData.defaultSummaryBudgetTotals
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByActivity({
      years,
      expected: this.budgetData.defaultQFSByActivity
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByTotals({
      expectedHITandHIETotal: this.budgetData.defaultHITandHIETotal,
      expectedMMISTotal: this.budgetData.defaultMMISTotal
    });

    proposedBudgetPage.verifyEQIPFormByFFY({
      years,
      expected: this.budgetData.defaultEQIP
    });
  });

  it('should display the default values for Proposed Budget in export view', function () {
    const years = this.years;
    cy.goToExportView();

    proposedBudgetPage.verifyComputableMedicaidCostByFFY({
      years,
      expected: this.budgetData.defaultCombinedActivityCost
    });

    proposedBudgetPage.verifyActvityBreakdown({
      years,
      activityList: this.activityList,
      expected: this.budgetData.defaultActivityBreakdown
    });

    proposedBudgetPage.verifySummaryBudgetTables({
      years: [...years, 'total'],
      expected: this.budgetData.defaultSummaryBudget,
      expectedTotals: this.budgetData.defaultSummaryBudgetTotals
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByActivity({
      years,
      expected: this.budgetData.defaultQFSByActivity
    });

    proposedBudgetPage.verifyQuarterlyFederalShareByTotals({
      expectedHITandHIETotal: this.budgetData.defaultHITandHIETotal,
      expectedMMISTotal: this.budgetData.defaultMMISTotal
    });

    proposedBudgetPage.verifyEQIPFormByFFY({
      years,
      expected: this.budgetData.defaultEQIP
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testProposedBudgetWithData = function () {
  let proposedBudgetPage;

  before(function () {
    proposedBudgetPage = new ProposedBudgetPage();
  });

  beforeEach(function () {
    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.fixture('proposed-budget-test.json').as('budgetData');

    cy.useStateStaff();
    cy.visit(this.apdUrl);
    const activityPage = new ActivitySchedulePage();
    cy.goToActivityScheduleSummary();
    cy.wrap(activityPage.getActivityScheduleOverviewNameList()).as(
      'activityList'
    );
  });

  it('should have the correct values for Proposed Budget', function () {
    const years = this.years;
    const activityList = this.activityList;
    const budgetData = this.budgetData;

    cy.goToProposedBudget();

    cy.url().should('include', '/proposed-budget');
    cy.findByRole('heading', { level: 2, name: 'Proposed Budget' });

    proposedBudgetPage.verifyComputableMedicaidCostByFFY({
      years,
      expected: this.budgetData.populatedCombinedActivityCost
    });

    proposedBudgetPage.verifyActvityBreakdown({
      years,
      activityList: activityList,
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

  it('should export the correct values for Proposed Budget Export View', function () {
    const years = this.years;
    const activityList = this.activityList;
    const budgetData = this.budgetData;

    cy.goToExportView();

    proposedBudgetPage.verifyComputableMedicaidCostByFFY({
      years,
      expected: budgetData.populatedCombinedActivityCost
    });

    proposedBudgetPage.verifyActvityBreakdown({
      years,
      activityList: activityList,
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

    proposedBudgetPage.verifyEQIPFormByFFY({
      years,
      expected: budgetData.populatedEQIP
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
