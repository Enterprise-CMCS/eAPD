import ActivityPage from '../../../page-objects/activity-page';
import BudgetPage from '../../../page-objects/budget-page';
import FillOutActivityPage from '../../../page-objects/fill-out-activity-page';

const { _ } = Cypress;

export const testDefaultMMISActivity = function () {
  let activityPage;
  let budgetPage;
  let fillOutActivityPage;

  context('Check Default Activity', function () {
    before(function () {
      activityPage = new ActivityPage();
      budgetPage = new BudgetPage();
      fillOutActivityPage = new FillOutActivityPage();
    });

    beforeEach(function () {
      cy.fixture('default-mmis-activity-template.json').as('defaultData');
    });

    // describe('Check default activity values', function () {
    //   it('')
    // })
  });
};
