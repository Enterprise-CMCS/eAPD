// <reference types="cypress" />
import { testDefaultMmisAPDOverview } from '../../helpers/apd/apd-overview';
import { testStatePrioritiesAndScope } from '../../helpers/apd/state-priorities-and-scope';

// Tests the default values of an MMIS APD

Cypress.session.clearAllSavedSessions();

describe(
  'Default MMIS APD',
  { tags: ['@apd', '@mmis', '@default', '@slow'] },
  function () {
    let apdUrl;
    let apdId;
    const years = [];

    before(function () {
      cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
      cy.useStateStaff();
      cy.visit('/');

      cy.findAllByText('Create new').click();
      cy.findByRole('radio', { name: /MMIS/i }).click();
      cy.findByLabelText('APD Name').clear().type('My MMIS IAPD').blur();
      cy.findByRole('radio', {
        name: /No, this is for a new project./i
      }).click();
      cy.findByRole('checkbox', {
        name: /1115 or Waiver Support Systems/i
      }).click();
      cy.get(`[data-cy='create_apd_btn']`).should('not.be.disabled').click();

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
    });

    beforeEach(function () {
      cy.wrap(apdUrl).as('apdUrl');
      cy.wrap(apdId).as('apdId');
      cy.wrap(years).as('years');

      cy.intercept('PATCH', `${Cypress.env('API')}/apds/**`).as('saveAPD');
      cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
      cy.useStateStaff();
      cy.visit(apdUrl);
    });

    after(function () {
      cy.visit('/');
      cy.deleteAPD(this.apdId);
    });

    describe('Form View', function () {
      describe('default APD Overview', function () {
        testDefaultMmisAPDOverview();

        it('should have two checked years', function () {
          cy.get('[type="checkbox"][checked]').should('have.length', 2);
        });
      });

      describe('default State Priorities and Scope', function () {
        testStatePrioritiesAndScope();
      });
    });
  }
);
