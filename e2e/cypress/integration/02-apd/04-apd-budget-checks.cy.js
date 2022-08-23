// <reference types="cypress" />
import { testKeyStatePersonnelWithData } from '../../helpers/apd/key-state-personnel';
import { testProposedBudgetWithData } from '../../helpers/apd/proposed-budget';
import { addHITActivity } from '../../helpers/apd/activity/add-HIT-activity';
import { addHIEActivity } from '../../helpers/apd/activity/add-HIE-activity';
import { addMMISActivity } from '../../helpers/apd/activity/add-MMIS-activity';
import {
  checkBudgetAndFFP,
  checkProposedBudget
} from '../../helpers/apd/budget-checks';
import FillOutActivityPage from '../../page-objects/fill-out-activity-page';

// Tests an APD by adding data and checking the results
describe('APD with Data', { tags: ['@apd', '@data', '@slow'] }, () => {
  let apdUrl;
  let apdId;
  let budgetData;
  let fillOutActivityPage;
  const years = [];

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  before(function () {
    fillOutActivityPage = new FillOutActivityPage();

    cy.useStateStaff();

    cy.findByRole('button', { name: /Create new/i }).click();
    cy.findByRole(
      'heading',
      { name: /APD Overview/i },
      { timeout: 100000 }
    ).should('exist');
    cy.location('pathname').then(pathname => {
      apdUrl = pathname.replace('/apd-overview', '');
      apdId = apdUrl.split('/').pop();
    });

    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );

    cy.fixture('budget-checks-test.json').then(data => {
      budgetData = data;
    });
  });

  beforeEach(() => {
    cy.visit(apdUrl);
  });

  // after(() => {
  //   cy.deleteAPD(apdId);
  // });

  describe('Budget Checks', () => {
    it('Checks Key State Personnel Budgets', () => {
      cy.goToKeyStatePersonnel();
      cy.url().should('include', '/state-profile');

      cy.fixture('users').then(userData => {
        cy.findByRole('button', { name: /Add Primary Contact/i }).click();

        cy.get('[data-cy="key-person-0__name"]').clear().type(userData[1].name);

        cy.get('[data-cy="key-person-0__email"]')
          .clear()
          .type(userData[1].email);

        cy.get('[data-cy="key-person-0__position"]')
          .clear()
          .type(userData[1].username);

        cy.get('input[type="radio"][value="no"]').check({ force: true }).blur();
        cy.findByRole('button', { name: /Save/i }).click();
      });

      checkBudgetAndFFP(years, budgetData.afterKeyPersonnelNoCosts, 0);
      checkProposedBudget(
        years,
        budgetData.afterKeyPersonnelNoCosts,
        [0, 0],
        'HIT'
      );

      cy.goToKeyStatePersonnel();
      cy.url().should('include', '/state-profile');

      cy.findByRole('button', { name: /Add Key Personnel/i }).click();

      cy.fixture('users').then(userData => {
        cy.get('[data-cy="key-person-1__name"]').clear().type(userData[3].name);

        cy.get('[data-cy="key-person-1__email"]')
          .clear()
          .type(userData[3].email);

        cy.get('[data-cy="key-person-1__position"]')
          .clear()
          .type(userData[3].username);

        cy.get('input[type="radio"][value="yes"]')
          .check({ force: true })
          .blur();

        cy.get('[data-cy="key-person-1-0__cost"]').type('100000');
        cy.get('[data-cy="key-person-1-0__fte"]').type('0.5');
        cy.get('[data-cy="key-person-1-1__cost"]').type('100000');
        cy.get('[data-cy="key-person-1-1__fte"]').type('0.5').blur();

        cy.findByRole('button', { name: /Save/i }).click();
      });

      checkBudgetAndFFP(years, budgetData.afterKeyPersonnelWithCosts, 0);
      checkProposedBudget(
        years,
        budgetData.afterKeyPersonnelWithCosts,
        [50000, 50000],
        'HIT'
      );
    });

    it('Checks State Staff Budget', () => {
      // Adds state staff to HIT activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(0).click();
      cy.findAllByText('State Staff and Expenses').eq(0).click();

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.fillStateStaff(years, data.staff, true);
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffHIT, 0);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffHIT,
        [353000, 377000],
        'HIT'
      );

      // Adds state staff to HIE activity
      cy.goToActivityDashboard();
      cy.findByRole('button', { name: 'Add Activity' }).click();
      cy.get('#activities').findAllByText('Edit').eq(1).click();

      cy.findByRole('radio', { name: /HIE/i }).check({ force: true });
      cy.findAllByText('State Staff and Expenses').eq(1).click();

      cy.fixture('HIE-activity-template.json').then(data => {
        fillOutActivityPage.fillStateStaff(years, data.staff, true);
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffHIE, 1);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffHIE,
        [463012, 488102],
        'HIE'
      );

      // Adds state staff to MMIS activity
      cy.goToActivityDashboard();
      cy.findByRole('button', { name: 'Add Activity' }).click();
      cy.get('#activities').findAllByText('Edit').eq(2).click();

      cy.findByRole('radio', { name: /MMIS/i }).check({ force: true });
      cy.findAllByText('State Staff and Expenses').eq(2).click();

      cy.fixture('MMIS-activity-template.json').then(data => {
        fillOutActivityPage.fillStateStaff(years, data.staff, true);
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffMMIS, 2);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffMMIS,
        [547924, 660170],
        'MMIS'
      );

      // Adds state staff to a no FFP activity
      cy.goToActivityDashboard();
      cy.findByRole('button', { name: 'Add Activity' }).click();
      cy.get('#activities').findAllByText('Edit').eq(3).click();

      cy.findAllByText('State Staff and Expenses').eq(3).click();

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.fillStateStaff(years, data.staff, true);
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffNoFFP, 3);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffNoFFP,
        [850924, 987170],
        'noFFP'
      );
    });
  });
});
