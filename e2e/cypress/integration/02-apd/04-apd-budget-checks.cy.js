// <reference types="cypress" />
import {
  checkBudgetAndFFP,
  checkProposedBudget
} from '../../helpers/apd/budget-checks.js';
import FillOutActivityPage from '../../page-objects/fill-out-activity-page.js';

const { _ } = Cypress;

// Tests an APD by adding data and checking the results
describe('APD with Data', { tags: ['@apd', '@data', '@slow'] }, () => {
  let apdUrl;
  let apdId;
  const years = [];

  let fillOutActivityPage;

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  before(function () {
    fillOutActivityPage = new FillOutActivityPage();

    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.useStateStaff();
    cy.visit('/');

    cy.findAllByText('Create new').click();
    cy.findByLabelText('APD Name').clear().type('HITECH IAPD').blur();
    cy.findByRole('checkbox', { name: /Annual Update/i }).click();
    cy.findByRole('button', { name: /Create an APD/i }).click();

    cy.findByRole(
      'heading',
      { name: /APD Overview/i },
      { timeout: 100000 }
    ).should('exist');
    cy.location('pathname').then(pathname => {
      apdUrl = pathname.replace('/apd-overview', '');
      apdId = apdUrl.split('/').pop();
    });

    cy.get('[data-cy=yearList]').within(() => {
      cy.get('[type="checkbox"][checked]').each((_, index, list) =>
        years.push(list[index].value)
      );
    });
  });

  beforeEach(function () {
    cy.wrap(apdUrl).as('apdUrl');
    cy.wrap(apdId).as('apdId');
    cy.wrap(years).as('years');

    cy.fixture('budget-checks-test.json').as('budgetData');
    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.useStateStaff();
    cy.visit(apdUrl);
  });

  after(function () {
    cy.visit('/');
    cy.deleteAPD(this.apdId);
  });

  describe('Budget Checks', function () {
    it('Creates activities and sets fed state split on each one', function () {
      const years = this.years;
      // HIT Activity
      cy.goToBudgetAndFFP(0);

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
      cy.waitForSave();

      cy.goToBudgetAndFFP(1);

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
      cy.waitForSave();

      cy.goToBudgetAndFFP(2);

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

      cy.goToBudgetAndFFP(3);

      _.forEach(years, (years, i) => {
        if (i === 0) {
          cy.get('select.ds-c-field').eq(i).select('50-50');
        } else {
          cy.get('select.ds-c-field').eq(i).select('50-50');
        }
      });
      cy.waitForSave();
    });

    it('Checks Key State Personnel Budgets', function () {
      const years = this.years;
      const budgetData = this.budgetData;

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

    it('Checks State Staff Budget', function () {
      const years = this.years;
      const budgetData = this.budgetData;

      // Adds state staff to HIT activity
      cy.goToStateStaffAndExpenses(0);

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.fillStateStaff(years, data.staff);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffHIT, 0);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffHIT,
        [353000, 377000],
        'HIT'
      );

      // Adds state staff to HIE activity
      cy.goToStateStaffAndExpenses(1);

      cy.fixture('HIE-activity-template.json').then(data => {
        fillOutActivityPage.fillStateStaff(years, data.staff);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffHIE, 1);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffHIE,
        [545512, 573102],
        'HIE'
      );

      // Adds state staff to MMIS activity
      cy.goToStateStaffAndExpenses(2);

      cy.fixture('MMIS-activity-template.json').then(data => {
        fillOutActivityPage.fillStateStaff(years, data.staff);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffMMIS, 2);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffMMIS,
        [684174, 771920],
        'MMIS'
      );

      // Adds state staff to a no FFP activity
      cy.goToStateStaffAndExpenses(3);

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.fillStateStaff(years, data.staff);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateStaffNoFFP, 3);
      checkProposedBudget(
        years,
        budgetData.afterStateStaffNoFFP,
        [987174, 1098920],
        'noFFP'
      );
    });

    it('Checks Other State Expense Budget', function () {
      const years = this.years;
      const budgetData = this.budgetData;

      // Adds Other State Expense to HIT activity
      cy.goToStateStaffAndExpenses(0);

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.fillStateExpenses(years, data.expenses);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateExpenseHIT, 0);
      checkProposedBudget(
        years,
        budgetData.afterStateExpenseHIT,
        [1022174, 1133920],
        'HIT'
      );

      // Adds Other State Expense to HIE activity
      cy.goToStateStaffAndExpenses(1);

      cy.fixture('HIE-activity-template.json').then(data => {
        fillOutActivityPage.fillStateExpenses(years, data.expenses);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateExpenseHIE, 1);
      checkProposedBudget(
        years,
        budgetData.afterStateExpenseHIE,
        [1062674, 1174120],
        'HIE'
      );

      // Adds Other State Expense to MMIS activity
      cy.goToStateStaffAndExpenses(2);

      cy.fixture('MMIS-activity-template.json').then(data => {
        fillOutActivityPage.fillStateExpenses(years, data.expenses);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateExpenseMMIS, 2);
      checkProposedBudget(
        years,
        budgetData.afterStateExpenseMMIS,
        [1138674, 1276620],
        'MMIS'
      );

      // Adds Other State Expense to a no FFP activity
      cy.goToStateStaffAndExpenses(3);

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.fillStateExpenses(years, data.expenses);
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterStateExpenseNoFFP, 3);
      checkProposedBudget(
        years,
        budgetData.afterStateExpenseNoFFP,
        [1173674, 1311620],
        'noFFP'
      );
    });

    it('Checks Private Contractors Budget', function () {
      const years = this.years;
      const budgetData = this.budgetData;

      // Adds Private Contractor to HIT activity
      cy.goToPrivateContractorCosts(0);

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.addPrivateContractors(
          data.privateContractors,
          years
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterContractorHIT, 0);
      checkProposedBudget(
        years,
        budgetData.afterContractorHIT,
        [1203674, 1341620],
        'HIT'
      );

      // Adds Private Contractor to HIE activity
      cy.goToPrivateContractorCosts(1);

      cy.fixture('HIE-activity-template.json').then(data => {
        fillOutActivityPage.addPrivateContractors(
          data.privateContractors,
          years
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterContractorHIE, 1);
      checkProposedBudget(
        years,
        budgetData.afterContractorHIE,
        [1245174, 1383120],
        'HIE'
      );

      // Adds Private Contractor to MMIS activity
      cy.goToPrivateContractorCosts(2);

      cy.fixture('MMIS-activity-template.json').then(data => {
        fillOutActivityPage.addPrivateContractors(
          data.privateContractors,
          years
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterContractorMMIS, 2);
      checkProposedBudget(
        years,
        budgetData.afterContractorMMIS,
        [1278174, 1420120],
        'MMIS'
      );

      // Adds Private Contractor to a no FFP activity
      cy.goToPrivateContractorCosts(3);

      cy.fixture('HIT-activity-template.json').then(data => {
        fillOutActivityPage.addPrivateContractors(
          data.privateContractors,
          years
        );
        cy.waitForSave();
      });

      checkBudgetAndFFP(years, budgetData.afterContractorNoFFP, 3);
      checkProposedBudget(
        years,
        budgetData.afterContractorNoFFP,
        [1308174, 1450120],
        'noFFP'
      );
    });
  });
});
