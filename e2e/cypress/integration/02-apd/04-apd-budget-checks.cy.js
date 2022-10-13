// <reference types="cypress" />
import {
  checkBudgetAndFFP,
  checkProposedBudget
} from '../../helpers/apd/budget-checks';
import FillOutActivityPage from '../../page-objects/fill-out-activity-page';

const { _ } = Cypress;

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
    cy.updateFeatureFlags({ validation: true });

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
    cy.updateFeatureFlags({ validation: true });
    cy.visit(apdUrl);
  });

  after(() => {
    cy.deleteAPD(apdId);
  });

  describe('Budget Checks', () => {
    it('Creates activities and sets fed state split on each one', () => {
      // HIT Activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(0).click();
      cy.findAllByText('Budget and FFP').eq(0).click();

      _.forEach(years, (years, i) => {
        if (i === 0) {
          cy.get('select.ds-c-field').eq(i).select('50-50');
        } else {
          cy.get('select.ds-c-field').eq(i).select('90-10');
        }
      });
      cy.waitForSave();

      // HIE Activity
      cy.goToActivityDashboard();
      cy.findByRole('button', { name: 'Add Activity' }).click();
      cy.waitForSave();
      cy.get('#activities').findAllByText('Edit').eq(1).click();

      cy.findByRole('radio', { name: /HIE/i }).check({ force: true });
      cy.findAllByText('Budget and FFP').eq(1).click();

      _.forEach(years, (years, i) => {
        if (i === 0) {
          cy.get('select.ds-c-field').eq(i).select('75-25');
        } else {
          cy.get('select.ds-c-field').eq(i).select('50-50');
        }
      });
      cy.waitForSave();

      // MMIS Activity
      cy.goToActivityDashboard();
      cy.findByRole('button', { name: 'Add Activity' }).click();
      cy.waitForSave();
      cy.get('#activities').findAllByText('Edit').eq(2).click();

      cy.findByRole('radio', { name: /MMIS/i }).check({ force: true });
      cy.findAllByText('Budget and FFP').eq(2).click();

      _.forEach(years, (years, i) => {
        if (i === 0) {
          cy.get('select.ds-c-field').eq(i).select('50-50');
        } else {
          cy.get('select.ds-c-field').eq(i).select('75-25');
        }
      });
      cy.waitForSave();

      // No FFP Activity
      cy.goToActivityDashboard();
      cy.findByRole('button', { name: 'Add Activity' }).click();
      cy.waitForSave();
      cy.get('#activities').findAllByText('Edit').eq(3).click();
      cy.findAllByText('Budget and FFP').eq(3).click();

      _.forEach(years, (years, i) => {
        if (i === 0) {
          cy.get('select.ds-c-field').eq(i).select('50-50');
        } else {
          cy.get('select.ds-c-field').eq(i).select('50-50');
        }
      });
      cy.waitForSave();
    });

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
        cy.waitForSave();
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
        cy.waitForSave();
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
        fillOutActivityPage.fillStateStaff(years, data.staff, false, true);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffHIT, 0);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffHIT,
        [136000, 138000],
        'HIT'
      );

      // Adds state staff to HIE activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(1).click();

      cy.findAllByText('State Staff and Expenses').eq(1).click();

      cy.fixture('HIE-activity-template.json').then(data => {
        fillOutActivityPage.fillStateStaff(years, data.staff, false, true);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffHIE, 1);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffHIE,
        [218500, 223000],
        'HIE'
      );

      // Adds state staff to MMIS activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(2).click();

      cy.findAllByText('State Staff and Expenses').eq(2).click();

      cy.fixture('MMIS-activity-template.json').then(data => {
        fillOutActivityPage.fillStateStaff(years, data.staff, false, true);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffMMIS, 2);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffMMIS,
        [272250, 249750],
        'MMIS'
      );

      // Adds state staff to a no FFP activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(3).click();

      cy.findAllByText('State Staff and Expenses').eq(3).click();

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.fillStateStaff(years, data.staff, false, true);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffNoFFP, 3);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffNoFFP,
        [358250, 337750],
        'noFFP'
      );
    });

    it('Checks Other State Expense Budget', () => {
      // Adds Other State Expense to HIT activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(0).click();
      cy.findAllByText('State Staff and Expenses').eq(0).click();

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.fillStateExpenses(
          years,
          data.expenses,
          false,
          true
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateExpenseHIT, 0);
      checkProposedBudget(
        years,
        budgetData.afterStateExpenseHIT,
        [398250, 377750],
        'HIT'
      );

      // Adds Other State Expense to HIE activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(1).click();
      cy.findAllByText('State Staff and Expenses').eq(1).click();

      cy.fixture('HIE-activity-template.json').then(data => {
        fillOutActivityPage.fillStateExpenses(
          years,
          data.expenses,
          false,
          true
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateExpenseHIE, 1);
      checkProposedBudget(
        years,
        budgetData.afterStateExpenseHIE,
        [438250, 417750],
        'HIE'
      );

      // Adds Other State Expense to MMIS activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(2).click();
      cy.findAllByText('State Staff and Expenses').eq(2).click();

      cy.fixture('MMIS-activity-template.json').then(data => {
        fillOutActivityPage.fillStateExpenses(
          years,
          data.expenses,
          false,
          true
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateExpenseMMIS, 2);
      checkProposedBudget(
        years,
        budgetData.afterStateExpenseMMIS,
        [513250, 517750],
        'MMIS'
      );

      // Adds Other State Expense to a no FFP activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(3).click();
      cy.findAllByText('State Staff and Expenses').eq(3).click();

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.fillStateExpenses(
          years,
          data.expenses,
          false,
          true
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateExpenseNoFFP, 3);
      checkProposedBudget(
        years,
        budgetData.afterStateExpenseNoFFP,
        [553250, 557750],
        'noFFP'
      );
    });

    it('Checks Private Contractors Budget', () => {
      // Adds Private Contractor to HIT activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(0).click();
      cy.findAllByText('Private Contractor Costs').eq(0).click();

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.addPrivateContractors(
          data.privateContractors,
          years,
          false,
          true
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterContractorHIT, 0);
      checkProposedBudget(
        years,
        budgetData.afterContractorHIT,
        [578250, 582750],
        'HIT'
      );

      // Adds Private Contractor to HIE activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(1).click();
      cy.findAllByText('Private Contractor Costs').eq(1).click();

      cy.fixture('HIE-activity-template.json').then(data => {
        fillOutActivityPage.addPrivateContractors(
          data.privateContractors,
          years,
          false,
          true
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterContractorHIE, 1);
      checkProposedBudget(
        years,
        budgetData.afterContractorHIE,
        [618250, 622750],
        'HIE'
      );

      // Adds Private Contractor to MMIS activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(2).click();
      cy.findAllByText('Private Contractor Costs').eq(2).click();

      cy.fixture('MMIS-activity-template.json').then(data => {
        fillOutActivityPage.addPrivateContractors(
          data.privateContractors,
          years,
          false,
          true
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterContractorMMIS, 2);
      checkProposedBudget(
        years,
        budgetData.afterContractorMMIS,
        [648250, 657750],
        'MMIS'
      );

      // Adds Private Contractor to a no FFP activity
      cy.goToActivityDashboard();
      cy.get('#activities').findAllByText('Edit').eq(3).click();
      cy.findAllByText('Private Contractor Costs').eq(3).click();

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.addPrivateContractors(
          data.privateContractors,
          years,
          false,
          true
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterContractorNoFFP, 3);
      checkProposedBudget(
        years,
        budgetData.afterContractorNoFFP,
        [673250, 682750],
        'noFFP'
      );
    });
  });
});
