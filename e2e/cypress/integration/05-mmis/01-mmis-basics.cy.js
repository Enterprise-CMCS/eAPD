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
    it('creates an MMIS APD after Create New page', () => {
      cy.findAllByText('Create new').click();

      cy.log('select MMIS APD type');
      cy.findByText('MMIS IAPD').click();
      cy.findAllByText('Is this an APD update?').should('exist');
      cy.findAllByText('Medicaid Business Areas').should('exist');

      cy.get(`[data-cy='create_apd_btn']`).should('be.disabled');

      cy.log('add the APD name');
      cy.findByLabelText('APD Name').clear().type('MMIS APD Name!').blur();

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

      cy.get(`[data-cy='create_apd_btn']`).should('not.be.disabled').click();
    });
  });
});
