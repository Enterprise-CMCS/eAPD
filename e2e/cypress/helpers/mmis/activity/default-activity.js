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

    describe('Check default activity values', function () {
      it('Checks default activity values', function () {
        const years = this.years;
        const defaultData = this.defaultData;

        cy.goToActivityDashboard();

        cy.url().should('include', '/activities');
        cy.findByRole('heading', { name: /Activities/i, level: 2 }).should(
          'exist'
        );

        cy.contains('Add Activity').click();

        cy.findByRole('heading', {
          name: /Activity 1: Untitled/i,
          level: 3
        }).should('exist');

        cy.contains('Activity 2').should('not.exist');

        cy.contains('Delete').should('not.exist');

        cy.get('#activities')
          .contains('Edit')
          .should('exist')
          .contains('Edit')
          .click();

        // Activity Overview Page
        cy.url().should('contain', '/activity/0/overview');

        cy.checkTinyMCE('activity-snapshot-field', '');
        cy.checkTinyMCE('activity-problem-statement-field', '');
        cy.checkTinyMCE('activity-proposed-solution-field', '');

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Analysis of Alternatives and Risk
        cy.findByRole('heading', {
          name: /Analysis of Alternatives and Risk/i
        }).should('exist');

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Activity Schedule
        cy.findByRole('heading', { name: /Activity Schedule/i }).should(
          'exist'
        );
        cy.findByRole('heading', { name: /Milestones/i }).should('exist');

        activityPage.checkDate('Start date');
        activityPage.checkDate('End date');
        cy.contains('Add milestone(s) for this activity.').should('exist');

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Conditions for Enhanced Funding
        cy.findByRole('heading', {
          name: /Conditions for Enhanced Funding/i
        }).should('exist');

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Outcomes and Metrics
        cy.findByRole('heading', { name: /Outcomes and Metrics/i }).should(
          'exist'
        );

        cy.contains('Add at least one outcome for this activity.').should(
          'exist'
        );

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Check State Staff and Other State Expenses
        cy.findByRole('heading', {
          name: /State Staff and Expenses/i,
          level: 3
        }).should('exist');

        cy.contains(
          'State staff have not been added for this activity.'
        ).should('exist');

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Check Private Contractor Costs
        cy.findByRole('heading', {
          name: /Private Contractor Costs/i,
          level: 3
        }).should('exist');

        cy.contains('Add private contractor(s) for this activity.').should(
          'exist'
        );

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Check Default Cost Allocation and Other Funding
        cy.findByRole('heading', {
          name: /^Activity 1:/i,
          level: 2
        }).should('exist');
        cy.findByRole('heading', {
          name: /Cost Allocation/i,
          level: 3
        }).should('exist');
        cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
        cy.checkTinyMCE('cost-allocation-methodology-field', '');

        _.forEach(years, (year, i) => {
          cy.checkTinyMCE(
            `cost-allocation-narrative-${year}-other-sources-field`,
            ''
          );
          activityPage.checkTextField('ds-c-field ds-c-field--currency', 0, i);

          cy.get('[class="budget-table activity-budget-table"]')
            .eq(i)
            .then(table => {
              cy.get(table)
                .getActivityTable()
                .then(tableData => {
                  _.forEach(defaultData.costAllocationTables, data => {
                    _.forEach(data, elem => {
                      expect(tableData).to.deep.include(elem);
                    });
                  });
                });
            });
        });

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();

        // Check Budget and FFP
        cy.findByRole('heading', {
          name: /Budget and FFP/i,
          level: 2
        }).should('exist');

        cy.then(() => {
          this.years.forEach(year => {
            cy.contains(`Budget for FFY ${year}`)
              .parent()
              .parent()
              .within(() => {
                cy.contains('Federal-State Split').should('exist');

                cy.findByRole('radio', {
                  name: `90/10 ${FUNDING_CATEGORY_LABEL_MAPPING.ddi}`
                })
                  .should('exist')
                  .should('be.checked');
                cy.findByRole('radio', { name: '75/25' })
                  .should('exist')
                  .should('be.checked');
                cy.findByRole('radio', { name: '50/50' })
                  .should('exist')
                  .should('be.checked');
              });
          });
        });

        // MMIS FFP page does not have an EQE table
        cy.findByLabelText('Estimated Quarterly Expenditure').should(
          'not.exist'
        );

        cy.waitForSave();
        cy.get('[id="continue-button"]').click();
      });
    });
  });
};
