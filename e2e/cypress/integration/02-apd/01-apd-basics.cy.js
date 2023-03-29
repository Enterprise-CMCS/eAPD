import BudgetPage from '../../page-objects/budget-page.js';
import ActivityPage from '../../page-objects/activity-page.js';
import ActivitySchedulePage from '../../page-objects/activity-schedule-page.js';
import ExportPage from '../../page-objects/export-page.js';
import ProposedBudgetPage from '../../page-objects/proposed-budget-page.js';
import FillOutActivityPage from '../../page-objects/fill-out-activity-page.js';
import { testApdName } from '../../helpers/apd/apd-name.js';
import { testApdNavigation } from '../../helpers/apd/apd-navigation.js';

/// <reference types="cypress" />

// Tests performing basic APD tasks

/* eslint-disable no-return-assign */
/* eslint-disable prefer-arrow-callback */

Cypress.session.clearAllSavedSessions();

describe('APD Basics', { tags: ['@apd', '@default'] }, function () {
  let apdUrl;
  const years = [];

  before(function () {
    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.useStateStaff();
    cy.visit('/');

    cy.findAllByText('Create new').click();
    cy.findByLabelText('APD Name').clear().type('HITECH IAPD').blur();
    cy.findByRole('checkbox', { name: /Annual Update/i }).click();
    cy.findByRole('button', { name: /Create an APD/i }).click();

    cy.log('announces success of creating APD and user dismisses');
    cy.get('.ds-c-alert--success').should('exist');
    cy.get('.tempMessage').contains(
      'You have successfully created an APD. Close this message and continue to fill out the rest of the APD.'
    );
    cy.get('.tempMsgBtn').click();
    cy.get('.ds-c-alert--success').should('not.exist');

    cy.findByRole(
      'heading',
      { name: /APD Overview/i },
      { timeout: 100000 }
    ).should('exist');
    cy.location('pathname').then(pathname => {
      apdUrl = pathname.replace('/apd-overview', '');
    });

    cy.get('[data-cy=yearList]').within(() => {
      cy.get('[type="checkbox"][checked]').each((_, index, list) =>
        years.push(list[index].value)
      );
    });

    cy.findByText('Update Type').should('exist');
    cy.findByRole('checkbox', { name: /Annual Update/i }).should('be.checked');
  });

  beforeEach(function () {
    cy.wrap(apdUrl).as('apdUrl');
    cy.wrap(years).as('years');

    cy.updateFeatureFlags({ enableMmis: false, adminCheckFlag: true });
    cy.useStateStaff();
    cy.visit(apdUrl);
  });

  describe('Create APD', function () {
    it('checks fields on newly created APD', function () {
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      const today = new Date();
      const title = 'HITECH IAPD';

      cy.get('#apd-header-info').contains(
        `Created: ${today.toLocaleDateString('en-us', options)}`
      );

      cy.get('#apd-header-info').contains(
        `Created: ${today.toLocaleDateString('en-us', options)}`
      );

      // APD Header
      cy.get(`[data-cy='apd-name-header']`).contains(`${title}`);

      // APD Summary text box
      cy.findByLabelText('APD Name').should('have.value', `${title}`);

      cy.get('[data-cy=yearList]').within(() => {
        cy.get('[type="checkbox"][checked]').should('have.length', 2);
      });

      cy.get('[id="program-introduction-field"]').should('have.value', '');
    });
  });

  describe('APD Name', function () {
    testApdName();
  });

  describe('Navigation', function () {
    testApdNavigation();
  });

  describe('tests admin check validation errors', function () {
    it('tests non-subform validation errors', function () {
      cy.contains('Export and Submit').click();
      cy.findByRole('button', { name: /Run Administrative Check/i }).click({
        force: true
      });

      cy.goToApdOverview();
      cy.get('[data-cy="validationError"]')
        .contains('Provide a brief introduction to the state program.')
        .should('exist');
      cy.get('[data-cy="validationError"]')
        .contains('Provide a summary of HIT-funded activities.')
        .should('exist');

      cy.goToKeyStatePersonnel();
      cy.findAllByText('Provide the name of the State Medicaid Director.');
      cy.findAllByText(
        'Provide the email address of the State Medicaid Director.'
      );
      cy.findAllByText(
        'Provide a valid phone number for the State Medicaid Director.'
      );
      cy.findAllByText(
        'Provide a mailing street address for the Medicaid office.'
      );
      cy.findAllByText('Provide a city name.');
      cy.findAllByText('Provide a zip code.');

      cy.goToActivityOverview(0);
      cy.get('[data-cy="validationError"]')
        .contains('Provide a short overview of the activity.')
        .should('exist');
      cy.findAllByText('Provide a start date.');
      cy.get('[data-cy="validationError"]')
        .contains('Provide details to explain this activity.')
        .should('exist');
      cy.get('[data-cy="validationError"]')
        .contains(
          'Provide a description about how this activity will support the Medicaid standards and conditions.'
        )
        .should('exist');

      cy.goToCostAllocationAndOtherFunding(0);
      cy.get('[data-cy="validationError"]')
        .contains('Provide a description of the cost allocation methodology.')
        .should('exist');

      cy.goToBudgetAndFFP(0);
      cy.findAllByText('Select a federal-state split.');
      cy.findAllByText(
        'State Staff and Expenses (In-House Costs) quarterly percentages must total 100%'
      );
      cy.findAllByText(
        'Private Contractor Costs quarterly percentages must total 100%'
      );

      cy.goToAssurancesAndCompliance();
      cy.findAllByText('Select yes or no');
    });
  });

  describe('Subforms', function () {
    let activityPage;
    let budgetPage;
    let schedulePage;
    let exportPage;
    let proposedBudgetPage;
    let fillOutActivityPage;

    before(function () {
      activityPage = new ActivityPage();
      budgetPage = new BudgetPage();
      schedulePage = new ActivitySchedulePage();
      exportPage = new ExportPage();
      proposedBudgetPage = new ProposedBudgetPage();
      fillOutActivityPage = new FillOutActivityPage();
    });

    it('should handle entering data', function () {
      const keyPersons = [
        {
          name: 'Jean Luc Picard',
          email: 'jpicard@gmail.com',
          position: 'Captain'
        },
        {
          name: 'William Riker',
          email: 'riker@gmail.com',
          position: 'First Officer'
        },
        {
          name: 'Data Soong',
          email: 'data@gmail.com',
          position: 'Second Officer'
        }
      ];

      cy.log('Key State Personnel');
      cy.goToKeyStatePersonnel();
      cy.findByRole('button', { name: /Add Primary Contact/i }).click();
      cy.findByRole('button', { name: /Add Primary Contact/i }).should(
        'not.exist'
      );
      cy.findByRole('button', { name: /Cancel/i }).click();

      cy.get('.form-and-review-list')
        .contains(
          'Primary Point of Contact has not been added for this activity.'
        )
        .should('exist');

      cy.findByRole('button', { name: /Add Primary Contact/i }).click();

      cy.get('[data-cy="key-person-0__name"]').focus().blur();
      cy.contains('Provide a name for the point of contact.').should('exist');
      cy.get('[data-cy="key-person-0__email"]').focus().blur();
      cy.contains('Provide an email address for the point of contact.').should(
        'exist'
      );
      cy.get('[data-cy="key-person-0__position"]').focus().blur();
      cy.contains('Provide a role for the point of contact.').should('exist');
      cy.get('input[type="radio"][value="no"]').focus().blur();
      cy.contains('Indicate whether or not this person has costs.').should(
        'exist'
      );

      cy.get('.ds-c-tooltip__container').should('exist');
      cy.get('.ds-c-tooltip__container').trigger('mouseover');
      cy.contains('All fields are required before saving.');
      cy.get('.ds-c-tooltip__container').trigger('mouseout');
      cy.findByRole('button', { name: /Save/i }).should('be.disabled');

      cy.get('[data-cy="key-person-0__name"]').type(keyPersons[0].name);

      cy.findByRole('button', { name: /Save/i }).should('be.disabled');

      cy.get('[data-cy="key-person-0__email"]').type(keyPersons[0].email);
      cy.get('[data-cy="key-person-0__position"]').type(keyPersons[0].position);

      cy.findByRole('button', { name: /Save/i }).should('be.disabled');

      cy.get('input[type="radio"][value="no"]').check({ force: true }).blur();
      cy.get('[data-cy="key-person-0__name"]').focus().blur();

      cy.get('.ds-c-tooltip__container').should('not.exist');
      cy.findByRole('button', { name: /Save/i })
        .should('not.be.disabled')
        .click();

      // Get div for the element containing user data as an alias
      cy.get('.form-and-review-list')
        .findByRole('heading', { name: /1.*/i })
        .parent()
        .parent()
        .as('primaryContactVals');
      // Check for default values
      cy.get('@primaryContactVals')
        .contains(keyPersons[0].name)
        .should('exist');
      cy.get('@primaryContactVals')
        .find('li')
        .should($lis => {
          expect($lis).to.have.length(2);
          expect($lis.eq(0)).to.contain('Primary APD Point of Contact');
          expect($lis.eq(1)).to.contain(keyPersons[0].position);
        });
      // Protects against edge case of having '$' in name or role
      cy.get('@primaryContactVals')
        .contains('Total cost:')
        .next()
        .shouldHaveValue(0);

      cy.get('@primaryContactVals').contains('Delete').should('not.exist');
      cy.get('@primaryContactVals').contains('Edit').should('exist');

      cy.findByRole('button', { name: /Add Key Personnel/i }).click();

      cy.get('[data-cy="key-person-1__name"]').type(keyPersons[1].name);
      cy.get('[data-cy="key-person-1__email"]').type(keyPersons[1].email);
      cy.get('[data-cy="key-person-1__position"]').type(keyPersons[1].position);
      cy.get('input[type="radio"][value="no"]').check({ force: true }).blur();

      cy.findByRole('button', { name: /Save/i }).click();

      // Check for default values
      cy.get('.form-and-review-list')
        .findByRole('heading', { name: /2.*/i })
        .parent()
        .parent()
        .as('personnelVals1');
      cy.get('@personnelVals1').contains(keyPersons[1].name).should('exist');
      cy.get('@personnelVals1')
        .find('li')
        .should($lis => {
          expect($lis).to.have.length(1);
          expect($lis.eq(0)).to.contain(keyPersons[1].position);
        });
      cy.get('@personnelVals1')
        .contains('Total cost:')
        .next()
        .shouldHaveValue(0);

      cy.get('@personnelVals1').contains('Delete').should('exist');
      cy.get('@personnelVals1').contains('Edit').should('exist');

      cy.get('.form-and-review-list')
        .findAllByRole('button', { name: /Edit/i })
        .eq(1)
        .click();

      cy.get('[data-cy="key-person-1__name"]').type('Test cancel');

      cy.get('.form-and-review-list')
        .findByRole('button', { name: /Cancel/i })
        .click();

      cy.get('.ds-c-review__heading')
        .contains(keyPersons[1].name)
        .should('exist');

      cy.findByRole('button', { name: /Add Key Personnel/i }).click();
      cy.get('[data-cy="key-person-2__name"]').type(keyPersons[2].name);
      cy.get('[data-cy="key-person-2__email"]').type(keyPersons[2].email);
      cy.get('[data-cy="key-person-2__position"]').type(keyPersons[2].position);
      // Have to force check; cypress does not think radio buttons are visible
      cy.get('input[type="radio"][value="yes"]').check({ force: true });

      cy.get('[data-cy="key-person-2-0__cost"]').type('100000');
      cy.get('[data-cy="key-person-2-0__fte"]').type('0.5');
      cy.get('[data-cy="key-person-2-1__cost"]').type('100000');
      cy.get('[data-cy="key-person-2-1__fte"]').type('0.5').blur();

      cy.findByRole('button', { name: /Save/i }).click();

      // Check for default values
      cy.get('.form-and-review-list')
        .findByRole('heading', { name: /3.*/i })
        .parent()
        .parent()
        .as('personnelVals2');
      cy.get('@personnelVals2').contains(keyPersons[2].name).should('exist');
      cy.get('@personnelVals2')
        .find('li')
        .should($lis => {
          expect($lis).to.have.length(1);
          expect($lis.eq(0)).to.contain([keyPersons.position]);
        });

      // Check that FFY, FTE, and Total cost for each applicable year is 0.
      this.years.forEach(year => {
        cy.get('@personnelVals2').should(
          'contain',
          `FFY ${year} Cost: $100,000 | FTE: 0.5 | Total: $50,000`
        );
      });

      cy.log('Done');

      cy.get('@personnelVals2').contains('Delete').should('exist');
      cy.get('@personnelVals2').contains('Edit').should('exist');

      cy.log('Activity Dashboard');
      cy.goToActivityDashboard();

      // Testing add activity button at end of Activitiy
      cy.contains('Add Activity').click();
      cy.contains('Activity 2').should('exist');
      cy.contains('Delete').should('exist');
      cy.contains('Delete').click();
      cy.findByRole('button', { name: /Delete Activity/i }).click();
      cy.waitForSave();
      cy.contains('Activity 2').should('not.exist');

      const outcomes = [
        {
          outcome: 'This is an outcome.',
          metrics: ['One metric, ah ha ha', 'Two metrics, ah ha ha']
        }
      ];

      const milestones = [
        {
          milestoneName: "Miles's Milestone",
          dateMonth: 1,
          dateDay: 2,
          dateYear: 2023
        }
      ];

      cy.log('Activity Schedule and Milestones');
      cy.goToActivitySchedule(0);

      cy.wrap(milestones).each((element, index) => {
        cy.findByRole('button', { name: /Add Milestone/i }).click();
        cy.findByRole('button', { name: /Add Milestone/i }).should('not.exist');

        cy.get(`[data-cy=milestone-${index}]`).click().should('have.value', '');

        cy.findByRole('button', { name: /Cancel/i }).click();

        cy.get('.form-and-review-list')
          .contains('Add milestone(s) for this activity.')
          .should('exist');

        cy.findByRole('button', { name: /Add Milestone/i }).click();

        cy.get(`[data-cy=milestone-${index}]`)
          .click()
          .type(element.milestoneName);

        cy.get(`.ds-c-field--month`).eq(2).click().type(element.dateMonth);

        cy.get(`.ds-c-field--day`).eq(2).click().type(element.dateDay);

        cy.get(`.ds-c-field--year`).eq(2).click().type(element.dateYear).blur();

        cy.findByRole('button', { name: /Save/i }).click();

        cy.waitForSave();

        cy.get('.form-and-review-list')
          .eq(0)
          .findAllByRole('button', { name: /Edit/i })
          .click();

        cy.get(`[data-cy='milestone-${index}']`)
          .click()
          .clear()
          .type(`Test cancel`);

        cy.get('.form-and-review-list')
          .eq(0)
          .findByRole('button', { name: /Cancel/i })
          .click();

        activityPage.checkMilestoneOutput({
          milestone: element.milestoneName,
          targetDate: '1/2/2023'
        });
      });

      cy.log('Outcomes and Metrics');
      cy.goToOutcomesAndMetrics(0);

      cy.wrap(outcomes).each((element, index) => {
        cy.findByRole('button', { name: /Add Outcome/i }).click();

        cy.findByRole('button', { name: /Add Outcome/i }).should('not.exist');
        cy.get(`[data-cy='outcome-${index}']`)
          .click()
          .should('have.value', '')
          .blur()
          .should('have.class', 'ds-c-field--error');

        cy.findByRole('button', { name: /Save/i }).should('be.disabled');

        cy.findByRole('button', { name: /Cancel/i }).click();

        cy.get('.form-and-review-list')
          .contains('Add at least one outcome for this activity.')
          .should('exist');

        cy.findByRole('button', { name: /Add Outcome/i }).click();

        cy.get(`[data-cy='outcome-${index}']`)
          .click()
          .type(`${element.outcome}`)
          .blur()
          .should('not.have.class', 'ds-c-field--error');

        cy.findByRole('button', { name: /Save/i }).should('not.be.disabled');

        if (Array.isArray(element.metrics)) {
          cy.wrap(element.metrics).each((metric, i) => {
            cy.findByRole('button', { name: /Add Metric to Outcome/i }).click();

            cy.get(`[data-cy=metric-${index}-${i}]`)
              .click()
              .should('have.value', '');

            cy.get(`[data-cy=metric-${index}-${i}]`)
              .click()
              .type(`${metric}`)
              .blur()
              .should('not.have.class', 'ds-c-field--error');

            cy.findByRole('button', { name: /Save/i }).should(
              'not.be.disabled'
            );
          });
        }

        cy.findByRole('button', { name: /Save/i }).click();

        cy.get('.form-and-review-list')
          .eq(0)
          .findAllByRole('button', { name: /Edit/i })
          .click();

        cy.get(`[data-cy='outcome-${index}']`)
          .click()
          .clear()
          .type(`Test cancel`);

        cy.findByRole('button', { name: /Add Metric to Outcome/i }).click();

        cy.get(`[data-cy=metric-${index}-0]`).click().type('do not save this');

        cy.get('.form-and-review-list')
          .eq(0)
          .findByRole('button', { name: /Cancel/i })
          .click();

        activityPage.checkOutcomeOutput({
          outcome: element.outcome,
          metrics: element.metrics
        });
      });

      cy.contains('Edit').click();

      cy.get('[class="ds-c-review"]')
        .eq(1)
        .within(() => {
          cy.contains('Remove').should('exist');
        });

      cy.get('[class="ds-c-review"]')
        .eq(0)
        .within(() => {
          cy.contains('Remove').should('exist').click();
        });

      cy.findByRole('button', { name: /Save/i })
        .should('not.be.disabled')
        .click();

      cy.get('[class="ds-c-review"]').should('have.length', 1);

      cy.log('State Staff and Expenses');
      cy.goToStateStaffAndExpenses(0);

      cy.findByRole('button', { name: /Add State Staff/i }).click();

      cy.findByRole('button', { name: /Cancel/i }).click();

      cy.get('.form-and-review-list')
        .contains('State staff have not been added for this activity.')
        .should('exist');

      cy.findByRole('button', { name: /Add State Staff/i }).click();

      activityPage.checkInputField('Personnel title', '');
      activityPage.checkInputField('Description', '');
      activityPage.checkStateStaffFFY({
        years: this.years,
        expectedValue: this.years.map(() => ({
          cost: '',
          fte: '',
          total: 0
        }))
      });

      cy.findByRole('button', { name: /Save/i }).should('be.disabled');

      cy.findByRole('button', { name: /Cancel/i }).click();

      const staffList = [
        {
          title: 'Test State Staff',
          description:
            'Director of staffing and organizing staff for staffing needs and roles.',
          costs: [100000, 100000],
          ftes: [1, 1]
        }
      ];

      fillOutActivityPage.fillStateStaff(this.years, staffList);

      cy.get('.form-and-review-list')
        .eq(0)
        .findAllByRole('button', { name: /Edit/i })
        .click();

      cy.findByLabelText('Personnel title').clear().blur();
      cy.contains('Provide a personnel title.').should('exist');

      cy.findByLabelText('Description').clear().blur();
      cy.contains('Provide a personnel description.').should('exist');

      this.years.forEach(year => {
        cy.get(`[name="[${year}].amt"`).clear().blur();
        cy.contains(
          'Please provide a FTE cost greater than or equal to $0.'
        ).should('exist');
        cy.get(`[name="[${year}].perc"`).clear().blur();
        cy.contains('Provide a FTE number greater than or equal to 0.').should(
          'exist'
        );
      });

      cy.get('.form-and-review-list')
        .eq(0)
        .findByRole('button', { name: /Cancel/i })
        .click();

      activityPage.checkStateStaffOutput({
        name: 'Test State Staff',
        years: this.years,
        cost: 100000,
        fte: 1
      });

      cy.findByRole('button', { name: /Add State Expense/i }).click();

      cy.findByRole('button', { name: /Cancel/i }).click();

      cy.get('.form-and-review-list')
        .contains('Add other state expense(s) for this activity.')
        .should('exist');

      cy.findByRole('button', { name: /Add State Expense/i }).click();

      activityPage.checkInputField('Description', '');
      activityPage.checkFFYinputCostFields({
        years: this.years,
        FFYcosts: this.years.map(() => '')
      });

      cy.findByRole('button', { name: /Save/i }).should('be.disabled');

      cy.findByLabelText('Category').select('').blur();
      cy.contains('Select a category.').should('exist');

      cy.findByLabelText('Description').click().blur();
      cy.contains(
        'Provide a description of the selected non-personal category.'
      ).should('exist');

      this.years.forEach(year => {
        cy.findByLabelText(`FFY ${year} Cost`).click().blur();
        cy.contains('Provide an annual cost.').should('exist');
      });

      cy.findByRole('button', { name: /Cancel/i }).click();

      const stateExpenses = [
        {
          category: 'Hardware, software, and licensing',
          description: 'Hardware and software items.',
          costs: [0, 0]
        }
      ];

      fillOutActivityPage.fillStateExpenses(this.years, stateExpenses);

      cy.get('.form-and-review-list')
        .eq(1)
        .findAllByRole('button', { name: /Edit/i })
        .click();

      cy.findByLabelText('Description').type('Test cancel');

      cy.get('.form-and-review-list')
        .eq(1)
        .findByRole('button', { name: /Cancel/i })
        .click();

      const privateContractor = {
        name: 'Test Private Contractor',
        description: 'Test description',
        start: [1, 1, 2020],
        end: [1, 2, 2023],
        totalCosts: 0,
        hourly: false,
        FFYcosts: [0, 0]
      };

      cy.log('Private Contractor Costs');
      cy.goToPrivateContractorCosts(0);

      cy.findByRole('button', { name: /Add Contractor/i }).click();
      cy.findByRole('button', { name: /Add Contractor/i }).should('not.exist');

      cy.findByRole('button', { name: /Cancel/i }).click();

      cy.get('.form-and-review-list')
        .contains('Add private contractor(s) for this activity.')
        .should('exist');

      cy.findByRole('button', { name: /Add Contractor/i }).click();

      activityPage.checkTextField('ds-c-field', '');
      cy.get('input[name="name"]').focus().blur();
      cy.contains('Provide a private contractor or vendor name.').should(
        'exist'
      );

      cy.checkTinyMCE('contractor-description-field-0', '');

      activityPage.checkDate('Contract start date');
      cy.contains('Contract start date')
        .parent()
        .next('div')
        .within(() => cy.findByLabelText('Month').focus().blur());
      cy.contains('Provide a start date.').should('exist');

      activityPage.checkDate('Contract end date');
      cy.contains('Contract end date')
        .parent()
        .next('div')
        .within(() => cy.findByLabelText('Year').focus().blur());
      cy.contains('Provide an end date.').should('exist');

      cy.get('[name="totalCost"]').should('have.value', '');
      cy.get('[name="totalCost"]').focus().blur();

      cy.contains(
        'Provide a contract cost greater than or equal to $0.'
      ).should('exist');

      cy.get('[type="radio"][checked]').should('not.exist');
      this.years.forEach(year => {
        cy.contains(`FFY ${year} Cost`)
          .parent()
          .should('have.text', `FFY ${year} Cost$0`);
      });

      cy.findByRole('button', { name: /Save/i }).should('be.disabled');

      fillOutActivityPage.fillPrivateContactor(
        privateContractor,
        0,
        this.years
      );

      cy.findByRole('button', { name: /Save/i })
        .should('not.be.disabled')
        .click();

      cy.get('.form-and-review-list')
        .eq(0)
        .findAllByRole('button', { name: /Edit/i })
        .click();

      cy.get('input[name="name"]').clear().type('Test cancel');

      cy.get('.form-and-review-list')
        .eq(0)
        .findByRole('button', { name: /Cancel/i })
        .click();

      activityPage.checkPrivateContractorOutput({
        name: privateContractor.name,
        description: privateContractor.description,
        start: privateContractor.start,
        end: privateContractor.end,
        totalCosts: privateContractor.totalCosts,
        hourly: privateContractor.hourly,
        years: this.years,
        FFYcosts: privateContractor.FFYcosts
      });

      cy.log('Budget and FFP');
      cy.goToBudgetAndFFP(0);

      cy.then(() => {
        this.years.forEach(year => {
          cy.contains(`Budget for FFY ${year}`)
            .parent()
            .parent()
            .within(() => {
              budgetPage.checkSplitFunctionality();

              cy.get('[data-cy="cost-allocation-dropdown"]').select('75-25');
              cy.waitForSave();
              budgetPage.checkCostSplitTable({
                federalSharePercentage: 0.75,
                federalShareAmount: 0,
                stateSharePercentage: 0.25,
                stateShareAmount: 2,
                totalComputableMedicaidCost: 150000
              });

              cy.get('[data-cy="cost-allocation-dropdown"]').select('50-50');
              cy.waitForSave();
              budgetPage.checkCostSplitTable({
                federalSharePercentage: 0.5,
                federalShareAmount: 0,
                stateSharePercentage: 0.5,
                stateShareAmount: 5,
                totalComputableMedicaidCost: 150000
              });

              cy.get('[data-cy="cost-allocation-dropdown"]').select('90-10');
              cy.waitForSave();
              budgetPage.checkCostSplitTable({
                federalSharePercentage: 0.9,
                federalShareAmount: 0,
                stateSharePercentage: 0.1,
                stateShareAmount: 1,
                totalComputableMedicaidCost: 150000
              });
            });
        });
      });

      cy.then(() => {
        this.years.forEach(year => {
          cy.contains(`Activity 1 Budget for FFY ${year}`)
            .parent()
            .within(() => {
              cy.contains('State Staff')
                .parent()
                .next()
                .should(
                  'have.text',
                  `${keyPersons[0].name} (APD Key Personnel)$0`
                )
                .next()
                .should(
                  'have.text',
                  `${keyPersons[1].name} (APD Key Personnel)$0`
                )
                .next()
                .should(
                  'have.text',
                  `${keyPersons[2].name} (APD Key Personnel)$100,000×0.5 FTE=$50,000`
                )
                .next()
                .should('have.text', 'Test State Staff$100,000×1 FTE=$100,000')
                .next()
                .next()
                .next()
                .next()
                .should('have.text', 'Hardware, software, and licensing$0')
                .next()
                .next()
                .next()
                .next()
                .should('have.text', 'Test Private Contractor$0');
            });
        });
      });

      cy.log('Activity Schedule Summary');
      cy.goToActivityScheduleSummary();
      schedulePage
        .getAllActivityScheduleMilestoneTables()
        .should('have.length', 1);

      // Activity 1 has index 0
      schedulePage
        .getActivityScheduleMilestoneTableName(0)
        .should('eq', 'Activity 1: Program Administration');

      // Get the first milestone for Activity 1
      schedulePage.getAllActivityScheduleMilestones(0).should('have.length', 1);
      schedulePage
        .getActivityScheduleMilestoneName(0, 0)
        .should('eq', "Miles's Milestone");

      cy.log('Proposed Budget');
      cy.goToProposedBudget();

      cy.then(() => {
        this.years.forEach(year => {
          proposedBudgetPage
            .getBreakdownByFFYAndActivityAndExpense({
              ffy: year,
              index: 0,
              expense: 'State Staff'
            })
            .as('stateStaff');
          cy.get('@stateStaff')
            .eq(0)
            .should('have.text', `${keyPersons[0].name} (APD Key Personnel)$0`);
          cy.get('@stateStaff')
            .eq(1)
            .should('have.text', `${keyPersons[1].name} (APD Key Personnel)$0`);
          cy.get('@stateStaff')
            .eq(2)
            .should(
              'have.text',
              `${keyPersons[2].name} (APD Key Personnel)$100,000×0.5 FTE=$50,000`
            );
          cy.get('@stateStaff')
            .eq(3)
            .should('have.text', 'Test State Staff$100,000×1 FTE=$100,000');

          proposedBudgetPage
            .getBreakdownByFFYAndActivityAndExpense({
              ffy: year,
              index: 0,
              expense: 'Other State Expenses'
            })
            .eq(0)
            .should('have.text', 'Hardware, software, and licensing$0');

          proposedBudgetPage
            .getBreakdownByFFYAndActivityAndExpense({
              ffy: year,
              index: 0,
              expense: 'Private Contractor'
            })
            .eq(0)
            .should('have.text', 'Test Private Contractor$0');
        });
      });

      cy.log('Export Views');
      cy.goToExportView();

      cy.findByRole('heading', { name: /Key State Personnel/i })
        .parent()
        .as('personnel');

      // Check text data for the first two personnel
      cy.get('@personnel')
        .findByRole('heading', {
          name: /Key Personnel and Program Management/i
        })
        .next()
        .find('ul')
        .first()
        .should(
          'have.text',
          `1. ${keyPersons[0].name}` +
            'Primary APD Point of Contact' +
            `${keyPersons[0].position}` +
            `Email: ${keyPersons[0].email}` +
            'Total cost: $0'
        )
        .next()
        .should(
          'have.text',
          `2. ${keyPersons[1].name}` +
            `${keyPersons[1].position}` +
            `Email: ${keyPersons[1].email}` +
            'Total cost: $0'
        );

      // Create string to check for personnel who is chargeable for the project for certain years.
      let str = `3. ${keyPersons[2].name}${keyPersons[2].position}Email: ${keyPersons[2].email}`;
      str += this.years
        .map(year => `FFY ${year} Cost: $100,000 | FTE: 0.5 | Total: $50,000`)
        .join('');

      cy.log(JSON.stringify(this.years));

      cy.get('@personnel')
        .findByRole('heading', {
          name: /Key Personnel and Program Management/i
        })
        .next()
        .find('ul')
        .eq(2)
        .should('have.text', str);

      cy.findByRole('heading', {
        name: /Activity 1: Program AdministrationOutcomes and Metrics/i
      })
        .next()
        .next()
        .next()
        .next()
        .next()
        .next()
        .should('have.text', "1. Miles's Milestone")
        .next()
        .should('have.text', 'Target completion date:  1/2/2023');

      cy.findByRole('heading', {
        name: /Activity 1: Program AdministrationState staff/i
      })
        .next()
        .should('have.text', '1. Test State Staff')
        .next()
        .next()
        .should(
          'have.text',
          this.years
            .map(
              year => `FFY ${year} Cost: $100,000 | FTEs: 1 | Total: $100,000`
            )
            .join('')
        );

      cy.findByRole('heading', {
        name: /Activity 1: Program AdministrationOther state expenses/i
      })
        .next()
        .should('have.text', '1. Hardware, software, and licensing')
        .next()
        .next()
        .should(
          'have.text',
          this.years.map(year => `FFY ${year} Cost: $0`).join('')
        );

      const privateContractorCosts = this.years
        .map(year => `FFY ${year} Cost: $0`)
        .join('');
      cy.findByRole('heading', {
        name: /Activity 1: Program AdministrationPrivate Contractor Costs/i
      })
        .next()
        .should('have.text', '1. Test Private Contractor')
        .next()
        .should(
          'have.text',
          'Procurement Methodology and Description of Services'
        )
        .next()
        .should('have.text', 'Test description')
        .next()
        .should(
          'have.text',
          `Full Contract Term: ${privateContractor.start.join(
            '/'
          )} - ${privateContractor.end.join(
            '/'
          )}Total Contract Cost: $0${privateContractorCosts}`
        );

      cy.then(() => {
        this.years.forEach(year => {
          cy.contains(`Activity 1 Budget for FFY ${year}`)
            .parent()
            .within(() => {
              cy.contains('State Staff')
                .parent()
                .next()
                .should(
                  'have.text',
                  `${keyPersons[0].name} (APD Key Personnel)$0`
                )
                .next()
                .should(
                  'have.text',
                  `${keyPersons[1].name} (APD Key Personnel)$0`
                )
                .next()
                .should(
                  'have.text',
                  `${keyPersons[2].name} (APD Key Personnel)$100,000×0.5 FTE=$50,000`
                )
                .next()
                .should('have.text', 'Test State Staff$100,000×1 FTE=$100,000')
                .next()
                .next()
                .next()
                .next()
                .should('have.text', 'Hardware, software, and licensing$0')
                .next()
                .next()
                .next()
                .next()
                .should('have.text', 'Test Private Contractor$0');
            });
        });
      });

      exportPage
        .getAllActivityScheduleMilestoneTables()
        .should('have.length', 1);
      // Activity 1 has index 0
      exportPage
        .getActivityScheduleMilestoneTableName(0)
        .should('eq', 'Activity 1: Program Administration');
      // Get the first milestone for Activity 1
      exportPage.getAllActivityScheduleMilestones(0).should('have.length', 1);
      exportPage
        .getActivityScheduleMilestoneName(0, 0)
        .should('eq', "Miles's Milestone");

      cy.then(() => {
        this.years.forEach(year => {
          proposedBudgetPage
            .getBreakdownByFFYAndActivityAndExpense({
              ffy: year,
              index: 0,
              expense: 'State Staff'
            })
            .as('stateStaff');
          cy.get('@stateStaff')
            .eq(0)
            .should('have.text', `${keyPersons[0].name} (APD Key Personnel)$0`);
          cy.get('@stateStaff')
            .eq(1)
            .should('have.text', `${keyPersons[1].name} (APD Key Personnel)$0`);
          cy.get('@stateStaff')
            .eq(2)
            .should(
              'have.text',
              `${keyPersons[2].name} (APD Key Personnel)$100,000×0.5 FTE=$50,000`
            );
          cy.get('@stateStaff')
            .eq(3)
            .should('have.text', 'Test State Staff$100,000×1 FTE=$100,000');

          proposedBudgetPage
            .getBreakdownByFFYAndActivityAndExpense({
              ffy: year,
              index: 0,
              expense: 'Other State Expenses'
            })
            .eq(0)
            .should('have.text', 'Hardware, software, and licensing$0');

          proposedBudgetPage
            .getBreakdownByFFYAndActivityAndExpense({
              ffy: year,
              index: 0,
              expense: 'Private Contractor'
            })
            .eq(0)
            .should('have.text', 'Test Private Contractor$0');
        });
      });
    });

    it('should handle deleting subform values', function () {
      cy.goToKeyStatePersonnel();

      const deleteKeyPersonnel = name => {
        cy.get('.form-and-review-list')
          .findByRole('heading', { name })
          .parent()
          .parent()
          .contains('Delete')
          .click();
        cy.contains('Delete Key Personnel?').should('exist');
        cy.contains('Cancel').click();
        cy.contains('Delete Key Personnel?').should('not.exist');
        cy.get('.form-and-review-list')
          .findByRole('heading', { name })
          .should('exist');

        cy.get('.form-and-review-list')
          .findByRole('heading', { name })
          .parent()
          .parent()
          .contains('Delete')
          .click();
        cy.findByRole('alertdialog').within(() => {
          cy.findByRole('button', { name: /Delete/i }).click({ force: true });
        });
        cy.waitForSave();
        cy.contains('Delete Key Personnel?').should('not.exist');

        cy.get('.form-and-review-list')
          .findByRole('heading', { name })
          .should('not.exist');
      };

      deleteKeyPersonnel(/3.*/i);
      deleteKeyPersonnel(/2.*/i);

      cy.get('.form-and-review-list')
        .findByRole('heading', { name: /1.*/i })
        .should('exist');
      cy.get('.form-and-review-list')
        .findByRole('heading', { name: /2.*/i })
        .should('not.exist');
      cy.get('.form-and-review-list')
        .findByRole('heading', { name: /3.*/i })
        .should('not.exist');

      cy.goToActivitySchedule(0);

      activityPage.checkDeleteButton(
        'Add milestone(s) for this activity.',
        'Delete Milestone?',
        "Miles's Milestone"
      );

      cy.goToOutcomesAndMetrics(0);

      activityPage.checkDeleteButton(
        'Add at least one outcome for this activity.',
        'Delete Outcome and Metrics?',
        'This is an outcome.'
      );

      cy.goToStateStaffAndExpenses(0);

      activityPage.checkDeleteButton(
        'State staff have not been added for this activity.',
        'Delete State Staff Expenses?',
        'Test State Staff'
      );

      activityPage.checkDeleteButton(
        'Add other state expense(s) for this activity.',
        'Delete Other State Expense?',
        'Hardware, software, and licensing'
      );

      cy.goToPrivateContractorCosts(0);

      activityPage.checkDeleteButton(
        'Add private contractor(s) for this activity',
        'Delete Private Contractor?',
        'Test Private Contractor'
      );
    });
  });

  describe('Accessibility Tests', function () {
    it('Runs on APD Builder', function () {
      // Allows page to load
      cy.wait(5000); // eslint-disable-line cypress/no-unnecessary-waiting

      cy.checkPageA11y(); // APD Overview

      cy.goToKeyStatePersonnel();
      cy.checkPageA11y(); // Key State Personnel

      cy.goToPreviousActivities();
      cy.checkPageA11y(); // Results of Previous Activities

      cy.goToActivityDashboard();
      // cy.findByRole('button', { name: /Add Activity/i }).click(); // Add back for MMIS tests
      cy.checkPageA11y(); // Activities Dashboard

      cy.goToActivityOverview(0);
      cy.checkPageA11y(); // Activity Overview

      cy.goToActivitySchedule(0);
      cy.checkPageA11y();

      cy.findByRole('button', { name: /Add Milestone/i }).click();
      cy.checkPageA11y(); // Milestones Subform

      cy.goToOutcomesAndMetrics(0);
      cy.findByRole('button', { name: /Add Outcome/i }).click();
      cy.checkPageA11y(); // Outcomes Subform
      cy.findByRole('button', { name: /Cancel/i }).click();

      cy.goToStateStaffAndExpenses(0);
      cy.findByRole('button', { name: /Add State Staff/i }).click();
      cy.checkPageA11y(); // State Staff Subform
      cy.findByRole('button', { name: /Cancel/i }).click();

      cy.findByRole('button', { name: /Add State Expense/i }).click();
      cy.checkPageA11y(); // State Expenses Subform

      cy.goToPrivateContractorCosts(0);
      cy.findByRole('button', { name: /Add Contractor/i }).click();
      cy.checkPageA11y(); // Private Contractor

      cy.goToCostAllocationAndOtherFunding(0);
      cy.checkPageA11y(); // Cost Allocation and Other Funding

      cy.goToBudgetAndFFP(0);
      cy.contains('Create an Additional Activity').should('exist');
      cy.checkPageA11y(); // Budget and FFP

      cy.goToActivityScheduleSummary();
      cy.checkPageA11y(); // Activity Schedule Summary

      cy.goToProposedBudget();
      cy.checkPageA11y(); // Proposed Budget

      cy.goToAssurancesAndCompliance();
      cy.checkPageA11y(); // Assurances and Compliance

      cy.goToExecutiveSummary();
      cy.checkPageA11y(); // Executive Summary

      cy.contains('Export and Submit').click();
      cy.checkPageA11y(); // Export and Submit
    });
  });

  describe('Delete APD', function () {
    it('deletes the APD', function () {
      cy.visit('/');
      cy.get(`a[href='${this.apdUrl}']`).should('exist');

      cy.get(`a[href='${this.apdUrl}']`)
        .parent()
        .parent()
        .parent()
        .contains('Delete')
        .click();

      cy.get('button[id="dialog-delete"]').click({ force: true });
      cy.waitForSave();

      cy.get(`a[href='${this.apdUrl}']`).should('not.exist');
    });
  });

  describe('tests an APD with no activities', function () {
    it('shows message', function () {
      cy.visit('/');
      cy.findByRole('link', { name: /HITECH IAPD No Activities/i }).click();
      cy.goToActivityDashboard();
      cy.findByText('Add at least one activity.').should('exist');
    });
  });
});
