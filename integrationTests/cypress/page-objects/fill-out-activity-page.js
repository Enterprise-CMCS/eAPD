import PopulatePage from './populate-page';
import StaffExpensesPage from './activities-state-staff-expenses-page';

const { _ } = Cypress;

const populatePage = new PopulatePage();
const staffExpensesPage = new StaffExpensesPage();

class FillOutActivityPage {
  // Activity Overview
  fillActivityOverview = (overviewData = {}) => {
    populatePage.fillDate('Start date', overviewData.startDate);
    populatePage.fillDate('End date', overviewData.endDate);

    cy.setTinyMceContent(
      'activity-short-overview-field',
      overviewData.shortOverview
    );
    cy.setTinyMceContent(
      'activity-description-field',
      overviewData.detailedDescription
    );
    cy.setTinyMceContent(
      'activity-alternatives-field',
      overviewData.supportingJustifications
    );
    cy.setTinyMceContent(
      'standards-and-conditions-supports-field',
      overviewData.supportsMedicaid
    );
  };

  fillOutcomesAndMilestones = (outcomes, milestones = {}) => {
    cy.findByRole('heading', {
      name: /Outcomes and Metrics/i,
      level: 3
    }).should('exist');

    _.forEach(outcomes.names, (name, i) => {
      populatePage.fillOutcomeForm({
        outcome: outcomes.names[i],
        metrics: outcomes.metrics[i]
      });

      cy.findByRole('button', { name: /Add Milestone/i }).click();
      populatePage.fillMilestoneForm({
        milestone: milestones.names[i],
        targetDate: milestones.dates[i]
      });
    });
  };

  fillStateStaffAndExpenses = (staffList, expenseList = {}) => {
    cy.findByRole('heading', {
      name: /State Staff and Expenses/i,
      level: 3
    }).should('exist');

    _.forEach(staffList, (staff, i) => {
      staffExpensesPage.addStaff();
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

    _.forEach(expenseList, (expense, i) => {
      staffExpensesPage.addExpense();
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
  };

  fillPrivateContactors = (contractorList, years = {}) => {
    cy.findByRole('heading', {
      name: /Private Contractor Costs/i,
      level: 3
    }).should('exist');

    _.forEach(contractorList, (contractor, i) => {
      cy.findByRole('button', { name: /Add Contractor/i }).click();
      populatePage.fillTextField('ds-c-field', contractor.name);

      populatePage.fillDate('Contract start date', contractor.start);
      populatePage.fillDate('Contract end date', contractor.end);

      populatePage.fillTextField(
        'ds-c-field ds-c-field--currency ds-c-field--medium',
        contractor.totalCosts,
        0
      );

      if (contractor.hourly) {
        cy.findByRole('radio', { name: /Yes/i }).click({ force: true });
        // years is empty for some reason
        _.forEach(years, (year, index) => {
          populatePage.fillTextField(
            'ds-c-field ds-c-field--medium',
            contractor.FFYcosts[index][0],
            index
          );

          populatePage.fillTextField(
            'ds-c-field ds-c-field--currency ds-c-field--medium',
            contractor.FFYcosts[index][1],
            index + 1
          );
        });
      } else {
        _.forEach(years, (year, index) => {
          populatePage.fillTextField(
            'ds-c-field ds-c-field--currency ds-c-field--medium',
            contractor.FFYcosts[index],
            index + 1
          );
        });
      }

      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.setTinyMceContent(
        `contractor-description-field-${i}`,
        contractor.description
      );

      cy.findByRole('button', { name: /Done/i }).click();
    });
  };

  fillCostAllocation = (allocation, years = {}) => {
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.setTinyMceContent(
      'cost-allocation-methodology-field',
      allocation.description
    );

    _.forEach(years, (year, i) => {
      cy.setTinyMceContent(
        `cost-allocation-narrative-${year}-other-sources-field`,
        allocation.FFYdescriptions[i]
      );
      populatePage.fillTextField(
        'ds-c-field ds-c-field--currency',
        allocation.costs[i],
        i
      );
    });
  };
}
export default FillOutActivityPage;
