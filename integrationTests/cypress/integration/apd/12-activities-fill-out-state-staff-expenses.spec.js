/// <reference types="cypress" />

import ActivitiesStateStaffExpensesPage from '../../page-objects/activities-state-staff-expenses-page';

// Tests filling out state staff & expenses for the activities section

/* eslint func-names: "off", prefer-arrow-callback: "off", no-return-assign: "off",
  no-loop-func: "off" */

describe('filling out staff & expenses for activities', function () {
  const staffExpensesPage = new ActivitiesStateStaffExpensesPage();

  let dashboardUrl;

  before(() => {
    cy.useStateStaff();
    cy.contains('HITECH IAPD').click();
    cy.goToActivityDashboard();

    cy.url().should('include', '/activities');
    cy.location('pathname').then(pathname => {
      dashboardUrl = pathname;
    });
  });

  beforeEach(function () {
    cy.fixture('activity-overview-template.json').as('data');
    cy.useStateStaff(dashboardUrl);
  });

  // Repeat tests for two activities.
  describe(`Activity 1`, function () {
    beforeEach(function () {
      cy.findAllByText('State staff and expenses').eq(0).click({ force: true });
    });

    describe('State staff', function () {
      it('Create two new state staff', function () {
        staffExpensesPage.addStaff();
        staffExpensesPage.addStaff();
      });

      it('Fill in data for staff', function () {
        for (let i = 0; i < 2; i += 1) {
          const staff = this.data.staff[i];
          staffExpensesPage.fillStaff(
            i,
            staff.title,
            staff.description,
            staff.costs,
            staff.ftes
          );
        }
      });

      it('Verify data for staff after editing', function () {
        for (let i = 0; i < 2; i += 1) {
          const staff = this.data.staff[i];
          staffExpensesPage.verifyStaff(
            i,
            staff.title,
            staff.description,
            staff.costs,
            staff.ftes
          );
        }
      });

      it('Delete the first staff', function () {
        staffExpensesPage.deleteStaff(0);
      });

      it('Pressing delete at delete confirmation model did delete staff', () => {
        // If there is just one delete button, then staff has been deleted.
        cy.findAllByRole('button', { name: /Delete/i }).should(
          'have.length',
          1
        );
      });

      it('Confirm the second staff created is now the first staff', function () {
        const staff = this.data.staff[1];
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

    describe('State expenses', function () {
      it('Create two new state expenses', function () {
        staffExpensesPage.addExpense();
        staffExpensesPage.addExpense();
      });

      it('Fill in data for expenses', function () {
        for (let i = 0; i < 2; i += 1) {
          const expense = this.data.expenses[i];
          staffExpensesPage.fillExpense(
            i,
            expense.category,
            expense.costs,
            expense.description
          );
        }
      });

      it('Verify data for expenses after editing', function () {
        for (let i = 0; i < 2; i += 1) {
          const expense = this.data.expenses[i];
          staffExpensesPage.verifyExpense(
            i,
            expense.category,
            expense.costs,
            expense.description
          );
        }
      });

      it('Delete the first expense', function () {
        staffExpensesPage.deleteExpense(0);
      });

      it('Pressing delete at delete confirmation model did delete expense', () => {
        // If there are just two delete buttons, then an expense has been deleted;
        // the other delete button is from the remaining staff.
        cy.findAllByRole('button', { name: /Delete/i }).should(
          'have.length',
          2
        );
      });

      it('Confirm the second expense created is now the first expense', function () {
        const expense = this.data.expenses[1];
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

  // Activity 2 will not involve deleting data, but will use different data.
  describe('Activity 2', function () {
    beforeEach(function () {
      cy.findAllByText('State staff and expenses').eq(1).click({ force: true });
    });

    describe('State staff', function () {
      it('Create two new state staff', function () {
        staffExpensesPage.addStaff();
        staffExpensesPage.addStaff();
      });

      it('Fill in data for staff', function () {
        for (let i = 0; i < 2; i += 1) {
          // Different activities should have different datasets
          const staff = this.data.staff[i + 2];
          staffExpensesPage.fillStaff(
            i,
            staff.title,
            staff.description,
            staff.costs,
            staff.ftes
          );
        }
      });

      it('Verify data for staff after editing', function () {
        for (let i = 0; i < 2; i += 1) {
          const staff = this.data.staff[i + 2];
          staffExpensesPage.verifyStaff(
            i,
            staff.title,
            staff.description,
            staff.costs,
            staff.ftes
          );
        }
      });
    });

    describe('State expenses', function () {
      it('Create two new state expenses', function () {
        staffExpensesPage.addExpense();
        staffExpensesPage.addExpense();
      });

      it('Fill in data for expenses', function () {
        for (let i = 0; i < 2; i += 1) {
          const expense = this.data.expenses[i + 2];
          staffExpensesPage.fillExpense(
            i,
            expense.category,
            expense.costs,
            expense.description
          );
        }
      });

      it('Verify data for expenses after editing', function () {
        for (let i = 0; i < 2; i += 1) {
          const expense = this.data.expenses[i + 2];
          staffExpensesPage.verifyExpense(
            i,
            expense.category,
            expense.costs,
            expense.description
          );
        }
        cy.goToActivityDashboard();
      });
    });
  });
});
