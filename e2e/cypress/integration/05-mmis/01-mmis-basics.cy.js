/// <reference types="cypress" />

// Tests performing basic MMIS APD tasks

/* eslint-disable no-return-assign */
/* eslint-disable prefer-arrow-callback */

describe('MMMIS Basics', { tags: ['@apd', '@default'] }, () => {
  before(() => {
    cy.useStateStaff();
    cy.updateFeatureFlags({ validation: false, enableMmis: true });
    cy.reload();
  });

  describe('Create APD', () => {
    let apdUrl;
    let apdId;

    before(() => {
      // Create a new MMIS APD
      cy.findAllByText('Create new').click();
      cy.findByText('MMIS IAPD').click();
      cy.findByLabelText('APD Name').clear().type('MMIS APD Name!').blur();
      cy.findByText('No, this is for a new project.').click();
      cy.findByText('Program Integrity').click();
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
    });

    beforeEach(() => {
      cy.visit(apdUrl);
    });

    it('tests Create New page', () => {
      cy.contains('AK APD Home').click();
      cy.findAllByText('Create new').click();

      cy.log('select MMIS APD type');
      cy.findByText('MMIS IAPD').click();
      cy.findAllByText('Is this an APD update?').should('exist');
      cy.findAllByText('Medicaid Business Areas').should('exist');

      cy.get(`[data-cy='create_apd_btn']`).should('be.disabled');

      cy.log('add the APD name');
      cy.findByLabelText('APD Name').clear().type('MMIS APD Test').blur();

      cy.log('change update type');
      cy.findByText('No, this is for a new project.').click();
      cy.findAllByText('Update Type').should('not.exist');
      cy.findByText('Yes, it is an update.').click();
      cy.findAllByText('Update Type').should('exist');
      cy.findByText('As-needed update').click();

      cy.get(`[data-cy='create_apd_btn']`).should('be.disabled');

      cy.log('add medicaid business areas');
      cy.findByText('Program Integrity').click();

      cy.get(`[data-cy='create_apd_btn']`).should('not.be.disabled');

      cy.findByText('Other').click();

      cy.get(`[data-cy='create_apd_btn']`).should('be.disabled');

      cy.get(`[data-cy='other_details']`).type('This is other stuff.').blur();

      cy.get(`[data-cy='create_apd_btn']`).should('not.be.disabled');
      cy.findByRole('button', { name: /Cancel/i }).click();

      cy.contains('MMIS APD Test').should('not.exist');
    });

    it('tests the Security Planning page', () => {
      cy.turnOnAdminCheck();
      cy.checkAdminCheckHyperlinks(
        'Security Planning',
        'Security Planning',
        LEVELGOESHERE
      );

      cy.get('[class="eapd-admin-check-list"]').within(list => {
        cy.get(list).contains('Security Planning').should('exist');
      });

      cy.contains('Provide Security and Interface Plan').should('exist');
      cy.get('[id="security-interface-plan"]').should('have.value', '');
      cy.setTinyMceContent(
        'security-interface-plan',
        'This is the Security Interface plan'
      );
      cy.contains('Provide Security and Interface Plan').should('not.exist');

      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'exist'
      );
      cy.get('[id="bc-dr-plan"]').should('have.value', '');
      cy.setTinyMceContent(
        'bc-dr-plan',
        'This is the Business Continuity and Disaster Recovery plan'
      );
      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'not.exist'
      );

      cy.get('[class="eapd-admin-check-list"]').within(list => {
        cy.get(list).contains('Security Planning').should('not.exist');
      });

      cy.setTinyMceContent('security-interface-plan', '');
      cy.contains('Provide Security and Interface Plan').should('exist');

      cy.setTinyMceContent('bc-dr-plan', '');
      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'exist'
      );

      cy.findByRole('button', { name: /Stop Administrative Check/i }).click({
        force: true
      });

      cy.contains('Provide Security and Interface Plan').should('not.exist');
      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'not.exist'
      );

      // TEST CONTINUE AND BACK BUTTONS
    });
  });
});
