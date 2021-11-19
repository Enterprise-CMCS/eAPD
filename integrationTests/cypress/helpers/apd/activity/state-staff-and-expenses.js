import ActivitiesStateStaffExpensesPage from '../../../page-objects/activities-state-staff-expenses-page';

export const testDefaultStateStaffAndExpenses = () => {
  beforeEach(() => {
    cy.goToStateStaffAndExpenses(0);
    cy.findByRole('heading', {
      name: /State Staff and Expenses/i,
      level: 3
    }).should('exist');
  });

  it('should display the default state staff and expenses', () => {
    cy.contains('State staff have not been added for this activity.').should(
      'exist'
    );
  });
};

export const testDefaultStateStaffAndExpensesExportView = () => {};

export const testStateStaffAndExpensesWithData = () => {
  let staffExpensesPage;
  let activityData;

  before(() => {
    staffExpensesPage = new ActivitiesStateStaffExpensesPage();
  });

  beforeEach(() => {
    cy.fixture('activity-overview-template.json').then(data => {
      activityData = data;
    });
  });

  describe('Activity 1', () => {
    beforeEach(() => {
      cy.goToStateStaffAndExpenses(0);
    });

    it('fills out state staff and expenses in activity 1', () => {
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', {
        name: /State Staff and Expenses/i,
        level: 3
      }).should('exist');

      cy.log('State Staff');
      staffExpensesPage.addStaff();
      staffExpensesPage.addStaff();

      const stateStaff = activityData.staff.slice(0, 2);
      stateStaff.forEach((staff, i) => {
        staffExpensesPage.fillStaff(
          i,
          staff.title,
          staff.description,
          staff.costs,
          staff.ftes
        );

        staffExpensesPage.verifyStaff(
          i,
          staff.title,
          staff.description,
          staff.costs,
          staff.ftes
        );
      });

      cy.findByRole('heading', { name: /^State Staff$/i })
        .next()
        .next()
        .children()
        .then(children => {
          if (children.length > 1) {
            staffExpensesPage.deleteStaff(0);
            cy.waitForSave();
          }
        });

      cy.findAllByRole('button', { name: /Delete/i }).should('have.length', 1);

      // Check that the first staff on the page (index 0) has the second
      // staff's info
      staffExpensesPage.verifyStaff(
        0,
        stateStaff[1].title,
        stateStaff[1].description,
        stateStaff[1].costs,
        stateStaff[1].ftes
      );

      cy.log('State Expenses');
      staffExpensesPage.addExpense();
      staffExpensesPage.addExpense();

      const expenses = activityData.expenses.slice(0, 2);
      expenses.forEach((expense, i) => {
        staffExpensesPage.fillExpense(
          i,
          expense.category,
          expense.costs,
          expense.description
        );

        staffExpensesPage.verifyExpense(
          i,
          expense.category,
          expense.costs,
          expense.description
        );
      });

      cy.findByRole('heading', { name: /^Other State Expenses$/i })
        .next()
        .next()
        .children()
        .then(children => {
          if (children.length > 1) {
            staffExpensesPage.deleteExpense(0);
            cy.waitForSave();
          }
        });

      // If there are just two delete buttons, then an expense has been deleted;
      // the other delete button is from the remaining staff.
      cy.findAllByRole('button', { name: /Delete/i }).should('have.length', 2);

      staffExpensesPage.verifyExpense(
        0,
        expenses[1].category,
        expenses[1].costs,
        expenses[1].description
      );
    });

    // TODO: Add test for export view
  });

  describe('Activity 2', () => {
    beforeEach(() => {
      cy.goToStateStaffAndExpenses(1);
    });

    it('fills out state staff and expenses in activity 2', () => {
      cy.findByRole('heading', {
        name: /Activity 2:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', {
        name: /State Staff and Expenses/i,
        level: 3
      }).should('exist');

      cy.log('State Staff');
      staffExpensesPage.addStaff();
      staffExpensesPage.addStaff();

      const stateStaff = activityData.staff.slice(2);
      stateStaff.forEach((staff, i) => {
        staffExpensesPage.fillStaff(
          i,
          staff.title,
          staff.description,
          staff.costs,
          staff.ftes
        );
        staffExpensesPage.verifyStaff(
          i,
          staff.title,
          staff.description,
          staff.costs,
          staff.ftes
        );
      });

      cy.log('State Expenses');
      staffExpensesPage.addExpense();
      staffExpensesPage.addExpense();

      const expenses = activityData.expenses.slice(2);
      expenses.forEach((expense, i) => {
        staffExpensesPage.fillExpense(
          i,
          expense.category,
          expense.costs,
          expense.description
        );
        staffExpensesPage.verifyExpense(
          i,
          expense.category,
          expense.costs,
          expense.description
        );
      });
    });

    // TODO: Add test for export view
  });
};
