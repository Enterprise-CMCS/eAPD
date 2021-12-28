import ActivityPage from '../../../page-objects/activity-page';
import BudgetPage from '../../../page-objects/budget-page';
import PopulatePage from '../../../page-objects/populate-page';
import ExportPage from '../../../page-objects/export-page';

export const testDefaultCostAllocationAndOtherFunding = years => {
  let budgetPage;
  let activityPage;

  before(() => {
    budgetPage = new BudgetPage();
    activityPage = new ActivityPage();
  });

  it('should display the default values for Cost Allocation and Other Funding', () => {
    cy.goToCostAllocationAndOtherFunding(0);

    cy.findByRole('heading', {
      name: /^Activity 1:/i,
      level: 2
    }).should('exist');
    cy.findByRole('heading', { name: /Cost Allocation/i, level: 3 }).should(
      'exist'
    );
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    activityPage.checkTinyMCE('cost-allocation-methodology-field', '');

    cy.then(() => {
      years.forEach((year, i) => {
        activityPage.checkTinyMCE(
          `cost-allocation-narrative-${year}-other-sources-field`,
          ''
        );
        activityPage.checkTextField('ds-c-field ds-c-field--currency', 0, i);
        budgetPage.checkActivityTotalCostTable({
          activityTotalCosts: 0,
          otherFunding: 0,
          totalComputableMedicaidCost: 0,
          index: i
        });
      });
    });

    cy.waitForSave();
  });

  it('should display the default activity overview in the export view', () => {
    const exportPage = new ExportPage();

    cy.goToExportView();

    exportPage.checkCostAllocationAndOtherFunding({
      activityHeader: 'Activity 1: Program Administration',
      years,
      description: '',
      FFYdescriptions: ['', ''],
      costs: [0, 0]
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testCostAllocationAndOtherFundingWithData = years => {
  let populatePage;
  let budgetPage;

  let activityData;

  before(() => {
    populatePage = new PopulatePage();
    budgetPage = new BudgetPage();
  });

  beforeEach(() => {
    cy.fixture('activity-overview-template.json').then(data => {
      activityData = data;
    });
  });

  describe('Activity 1', () => {
    beforeEach(() => {
      cy.goToCostAllocationAndOtherFunding(0);
    });

    it('fills out cost allocation page for activity 1', () => {
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', { name: /Cost Allocation/i, level: 3 }).should(
        'exist'
      );
      const allocation = activityData.costAllocation[0];

      populatePage.fillCostAllocation({
        ...allocation,
        years
      });

      // Deleted the first one from each catagory
      const staff = activityData.staff[1];
      const expenses = activityData.expenses[1];
      const contractor = activityData.privateContractors[1];

      years.forEach((year, i) => {
        const activityTotalCosts =
          staff.costs[i] * staff.ftes[i] +
          expenses.costs[i] +
          contractor.FFYcosts[i];
        budgetPage.checkActivityTotalCostTable({
          activityTotalCosts,
          otherFunding: allocation.costs[i],
          totalComputableMedicaidCost: activityTotalCosts - allocation.costs[i],
          index: i
        });
      });

      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.waitForSave();
    });

    it('should display the default activity overview in the export view', () => {
      const exportPage = new ExportPage();
      cy.goToExportView();

      const { name } = activityData.activityOverview[0];
      const costAllocation = activityData.costAllocation[0];

      exportPage.checkCostAllocationAndOtherFunding({
        activityHeader: `Activity 1: ${name}`,
        years,
        ...costAllocation
      });

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
  });

  describe('Activity 2', () => {
    beforeEach(() => {
      cy.goToCostAllocationAndOtherFunding(1);
      cy.findByRole('heading', {
        name: /^Activity 2:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', { name: /Cost Allocation/i, level: 3 }).should(
        'exist'
      );
    });

    it('fills out cost allocation page for activity 2', () => {
      const allocation = activityData.costAllocation[1];

      populatePage.fillCostAllocation({
        ...allocation,
        years
      });

      const staff1 = activityData.staff[2];
      const staff2 = activityData.staff[3];
      const expense1 = activityData.expenses[2];
      const expense2 = activityData.expenses[3];
      const contractor1 = activityData.privateContractors[2];
      const contractor2 = activityData.privateContractors[3];

      years.forEach((year, i) => {
        const staffTotal =
          staff1.costs[i] * staff1.ftes[i] + staff2.costs[i] * staff2.ftes[i];

        const expenseTotal = expense1.costs[i] + expense2.costs[i];

        const contractorTotal =
          contractor1.FFYcosts[i] +
          contractor2.FFYcosts[i][0] * contractor2.FFYcosts[i][1];

        const activityTotalCosts = staffTotal + expenseTotal + contractorTotal;

        budgetPage.checkActivityTotalCostTable({
          activityTotalCosts,
          otherFunding: allocation.costs[i],
          totalComputableMedicaidCost: activityTotalCosts - allocation.costs[i],
          index: i
        });
      });

      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.waitForSave();
    });

    it('should display the default activity overview in the export view', () => {
      const exportPage = new ExportPage();
      cy.goToExportView();

      const { name } = activityData.activityOverview[1];
      const costAllocation = activityData.costAllocation[1];

      exportPage.checkCostAllocationAndOtherFunding({
        activityHeader: `Activity 2: ${name}`,
        years,
        ...costAllocation
      });

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
  });
};
