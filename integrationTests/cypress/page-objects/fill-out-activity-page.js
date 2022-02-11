import populatePage from './populate-page';
import staffExpensesPage from './activities-state-staff-expenses-page';

class FillOutActivityPage {
  // Activity Overview
  fillActivityOverview = ({ overviewData } = {}) => {
    this.fillDate('Start date', overviewData.startDate);
    this.fillDate('End date', overviewData.endDate);

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

  fillOutcomesAndMilestones = ({ outcomes, milestones } = {}) => {
    cy.findByRole('heading', {
      name: /Outcomes and Metrics/i,
      level: 3
    }).should('exist');

    Cypress._.times(outcomes.names.length(), i => {
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

  fillStateStaffAndExpenses = ({ staff, expenses } = {}) => {
    cy.findByRole('heading', {
      name: /State Staff and Expenses/i,
      level: 3
    }).should('exist');

    staffExpensesPage.addStaff();
    staffExpensesPage.addStaff();

    staff.forEach(i => {
      // see what i is before you run this
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

    staffExpensesPage.addExpense();
    staffExpensesPage.addExpense();

    expenses.forEach(i => {
      staffExpensesPage.fillExpense(
        i,
        expenses.category,
        expenses.costs,
        expenses.description
      );
      staffExpensesPage.verifyExpense(
        i,
        expenses.category,
        expenses.costs,
        expenses.description
      );
    });
  };
}
export default FillOutActivityPage;
