import ActivityPage from '../../../page-objects/activity-page';
import ActivitiesStateStaffExpensesPage from '../../../page-objects/activities-state-staff-expenses-page';

export const testDefaultStateStaffAndExpenses = years => {
  let activityPage;

  before(() => {
    activityPage = new ActivityPage();
  });

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

    cy.findByRole('button', { name: /Add State Staff/i }).click();
    cy.waitForSave();

    activityPage.checkInputField('Personnel title', '');
    activityPage.checkInputField('Description', '');
    activityPage.checkStateStaffFFY(years, '');

    cy.findByRole('button', { name: /Done/i }).click();

    activityPage.checkStateStaffOutput(
      'Personnel title not specified',
      years,
      0,
      0
    );

    activityPage.checkDeleteButton(
      'State staff have not been added for this activity.',
      'Delete State Staff Expenses?',
      'Personnel title not specified'
    );

    cy.findByRole('button', { name: /Add State Expense/i }).click();
    cy.waitForSave();
    activityPage.checkInputField('Description', '');
    activityPage.checkFFYinputCostFields(years, '');
    cy.findByRole('button', { name: /Done/i }).click();

    activityPage.checkOtherStateExpensesOutput(
      'Category not specified',
      years,
      [0, 0]
    );

    activityPage.checkDeleteButton(
      'Other state expenses have not been added for this activity.',
      'Delete Other State Expense?',
      'Category not specified'
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
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', {
        name: /State Staff and Expenses/i,
        level: 3
      }).should('exist');
    });

    describe('State staff', () => {
      it('Create two new state staff', () => {
        staffExpensesPage.addStaff();
        staffExpensesPage.addStaff();
      });

      it('Fill in data for staff', () => {
        const stateStaff = activityData.staff.slice(0, 2);
        stateStaff.forEach((staff, i) => {
          staffExpensesPage.fillStaff(
            i,
            staff.title,
            staff.description,
            staff.costs,
            staff.ftes
          );
          cy.waitForSave();
        });
      });

      it('Verify data for staff after editing', () => {
        const stateStaff = activityData.staff.slice(0, 2);
        stateStaff.forEach((staff, i) => {
          staffExpensesPage.verifyStaff(
            i,
            staff.title,
            staff.description,
            staff.costs,
            staff.ftes
          );
        });
      });

      it('Delete the first staff', () => {
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
      });

      it('Pressing delete at delete confirmation model did delete staff', () => {
        // If there is just one delete button, then staff has been deleted.
        cy.findAllByRole('button', { name: /Delete/i }).should(
          'have.length',
          1
        );
      });

      it('Confirm the second staff created is now the first staff', () => {
        const staff = activityData.staff[1];
        // Check that the first staff on the page (index 0) has the second
        // staff's info
        staffExpensesPage.verifyStaff(
          0,
          staff.title,
          staff.description,
          staff.costs,
          staff.ftes
        );
      });
    });

    describe('State expenses', () => {
      it('Create two new state expenses', () => {
        staffExpensesPage.addExpense();
        staffExpensesPage.addExpense();
      });

      it('Fill in data for expenses', () => {
        const expenses = activityData.expenses.slice(0, 2);
        expenses.forEach((expense, i) => {
          staffExpensesPage.fillExpense(
            i,
            expense.category,
            expense.costs,
            expense.description
          );
          cy.waitForSave();
        });
      });

      it('Verify data for expenses after editing', () => {
        const expenses = activityData.expenses.slice(0, 2);
        expenses.forEach((expense, i) => {
          staffExpensesPage.verifyExpense(
            i,
            expense.category,
            expense.costs,
            expense.description
          );
        });
      });

      it('Delete the first expense', () => {
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
      });

      it('Pressing delete at delete confirmation model did delete expense', () => {
        // If there are just two delete buttons, then an expense has been deleted;
        // the other delete button is from the remaining staff.
        cy.findAllByRole('button', { name: /Delete/i }).should(
          'have.length',
          2
        );
      });

      it('Confirm the second expense created is now the first expense', () => {
        const expense = activityData.expenses[1];
        // Check that the first expense on the page (index 0) has the second
        // expense's info
        staffExpensesPage.verifyExpense(
          0,
          expense.category,
          expense.costs,
          expense.description
        );
      });
    });
  });

  describe('Activity 2', () => {
    beforeEach(() => {
      cy.goToStateStaffAndExpenses(1);
      cy.findByRole('heading', {
        name: /Activity 2:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', {
        name: /State Staff and Expenses/i,
        level: 3
      }).should('exist');
    });

    describe('State staff', () => {
      it('Create two new state staff', () => {
        staffExpensesPage.addStaff();
        staffExpensesPage.addStaff();
      });

      it('Fill in data for staff', () => {
        const stateStaff = activityData.staff.slice(2);
        stateStaff.forEach((staff, i) => {
          staffExpensesPage.fillStaff(
            i,
            staff.title,
            staff.description,
            staff.costs,
            staff.ftes
          );
          cy.waitForSave();
        });
      });

      it('Verify data for staff after editing', () => {
        const stateStaff = activityData.staff.slice(2);
        stateStaff.forEach((staff, i) => {
          staffExpensesPage.verifyStaff(
            i,
            staff.title,
            staff.description,
            staff.costs,
            staff.ftes
          );
        });
      });
    });

    describe('State expenses', () => {
      it('Create two new state expenses', () => {
        staffExpensesPage.addExpense();
        staffExpensesPage.addExpense();
      });

      it('Fill in data for expenses', () => {
        const expenses = activityData.expenses.slice(2);
        expenses.forEach((expense, i) => {
          staffExpensesPage.fillExpense(
            i,
            expense.category,
            expense.costs,
            expense.description
          );
          cy.waitForSave();
        });
      });

      it('Verify data for expenses after editing', () => {
        const expenses = activityData.expenses.slice(2);
        expenses.forEach((expense, i) => {
          staffExpensesPage.verifyExpense(
            i,
            expense.category,
            expense.costs,
            expense.description
          );
        });
      });
    });
  });
};

export const testStateStaffAndExpensesExportViewWithData = () => {};
