import ActivityPage from '../../../page-objects/activity-page';
import BudgetPage from '../../../page-objects/budget-page';
import PopulatePage from '../../../page-objects/populate-page';

export const testDefaultCostAllocationAndOtherFunding = years => {
  let budgetPage;
  let activityPage;

  before(() => {
    budgetPage = new BudgetPage();
    activityPage = new ActivityPage();
  });

  beforeEach(() => {
    cy.goToCostAllocationAndOtherFunding(0);
    cy.findByRole('heading', { name: /Cost Allocation/i, level: 3 }).should(
      'exist'
    );
  });

  it('should display the default values for Cost Allocation and Other Funding', () => {
    cy.waitForTinyMCELoaded('cost-allocation-methodology-field');
    activityPage.checkTinyMCE('cost-allocation-methodology-field', '');

    cy.then(() => {
      years.forEach((year, i) => {
        activityPage.checkTinyMCE(
          `cost-allocation-narrative-${year}-other-sources-field`,
          ''
        );
        activityPage.checkTextField('ds-c-field ds-c-field--currency', 0, i);
        budgetPage.checkActivityTotalCostTable(0, 0, 0, i);
      });
    });
  });
};

export const testDefaultCostAllocationAndOtherFundingExportView = () => {};

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
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', { name: /Cost Allocation/i, level: 3 }).should(
        'exist'
      );
    });

    it('fills out cost allocation page for activity 1', () => {
      const allocation = activityData.costAllocation[0];

      populatePage.fillCostAllocation(
        allocation.description,
        allocation.FFYdescriptions,
        allocation.costs,
        years
      );
      cy.waitForSave();

      // Deleted the first one from each catagory
      const staff = activityData.staff[1];
      const expenses = activityData.expenses[1];
      const contractor = activityData.privateContractors[1];

      years.forEach((year, i) => {
        const FFYtotal =
          staff.costs[i] * staff.ftes[i] +
          expenses.costs[i] +
          contractor.FFYcosts[i];
        budgetPage.checkActivityTotalCostTable(
          FFYtotal,
          allocation.costs[i],
          i
        );
      });
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

      populatePage.fillCostAllocation(
        allocation.description,
        allocation.FFYdescriptions,
        allocation.costs,
        years
      );
      cy.waitForSave();

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

        const FFYtotal = staffTotal + expenseTotal + contractorTotal;

        budgetPage.checkActivityTotalCostTable(
          FFYtotal,
          allocation.costs[i],
          i
        );
      });
    });
  });
};

export const testCostAllocationAndOtherFundingExportViewWithData = () => {};
