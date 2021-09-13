/* eslint-disable func-names */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable prefer-arrow-callback */
/// <reference types="cypress" />

import ActivityPage from '../../page-objects/activity-page';
import PopulatePage from '../../page-objects/populate-page';

// Assumes a 2nd activity exists
describe('Filling out private contractors page', () => {
  const populatePage = new PopulatePage();
  const activityPage = new ActivityPage();

  let dashboardUrl;
  const years = [2021, 2022];

  before(() => {
    cy.useStateStaff();
    cy.contains('HITECH IAPD').click();
    cy.goToActivityDashboard();

    cy.url().should('include', '/activities');
    cy.location('pathname').then(pathname => {
      dashboardUrl = pathname;
    });
  });

  beforeEach(function before() {
    cy.fixture('activity-overview-template.json').as('data');
    cy.useStateStaff(dashboardUrl);
  });

  it('fills our private contractor form', function () {
    const contractor = this.data.privateContractors[0];
    cy.contains('Edit').click();
    cy.contains('Private Contractor Costs').click();

    for (let i = 0; i < 2; i += 1) {
      if (i === 0) {
        cy.findByRole('button', { name: /Add Contractor/i }).click();
      } else {
        cy.findByRole('button', { name: /Add Contractor/i }).click();
        cy.findByRole('button', { name: /Done/i }).click();
        cy.findAllByText('Edit').eq(1).click();
      }

      populatePage.fillContractorForm(
        contractor.names[i],
        contractor.descriptions[i],
        contractor.start[i],
        contractor.end[i],
        contractor.totalCosts[i],
        contractor.FFYcosts[i],
        i
      );

      const startDate = `${contractor.start[i][0]}/${contractor.start[i][1]}/${contractor.start[i][2]}`;
      const endDate = `${contractor.end[i][0]}/${contractor.end[i][1]}/${contractor.end[i][2]}`;

      activityPage.checkPrivateContractorOutput(
        contractor.names[i],
        contractor.descriptions[i],
        `${startDate} - ${endDate}`,
        contractor.totalCosts[i],
        years,
        contractor.FFYcosts[i]
      );
    }
    cy.wait(1000);
    cy.goToActivityDashboard();
  });

  it('tests deleting a private contractor', function () {
    const contractor = this.data.privateContractors[0];
    cy.contains('Edit').click();
    cy.findAllByText('Private Contractor Costs').eq(0).click();

    cy.contains('Delete').click();
    cy.contains('Delete Private Contractor?').should('exist');
    cy.findAllByText('Delete').eq(2).click();
    cy.contains('Delete Private Contractor?').should('not.exist');
    cy.contains(`1. ${contractor.names[0]}`).should('not.exist');
    cy.contains(`1. ${contractor.names[1]}`).should('exist');
    cy.wait(1000);
    cy.goToActivityDashboard();
  });

  it('fills 2nd activity private contractor', function () {
    const contractor = this.data.privateContractors[1];
    cy.findAllByText('Edit').eq(1).click();
    cy.findAllByText('Private Contractor Costs').eq(1).click();

    cy.findByRole('button', { name: /Add Contractor/i }).click();
    populatePage.fillContractorForm(
      contractor.names[0],
      contractor.descriptions[0],
      contractor.start[0],
      contractor.end[0],
      contractor.totalCosts[0],
      contractor.FFYcosts[0],
      0
    );

    cy.wait(1000);

    // Add another private contractor
    cy.findByRole('button', { name: /Add Contractor/i }).click();
    populatePage.fillTextField('ds-c-field', contractor.names[1]);
    cy.setTinyMceContent(
      'contractor-description-field-1',
      contractor.descriptions[1]
    );
    populatePage.fillDate('Contract start date', contractor.start[1]);
    populatePage.fillDate('Contract end date', contractor.end[1]);

    populatePage.fillTextField(
      'ds-c-field ds-c-field--currency ds-c-field--medium',
      contractor.totalCosts[1],
      0
    );

    cy.findByRole('radio', { name: /Yes/i }).click({ force: true });
    for (let i = 0; i < years.length; i += 1) {
      populatePage.fillTextField(
        'ds-c-field ds-c-field--medium',
        contractor.FFYcosts[1][i][0],
        i
      );
      populatePage.fillTextField(
        'ds-c-field ds-c-field--currency ds-c-field--medium',
        contractor.FFYcosts[1][i][1],
        i + 1
      );
    }
    cy.findByRole('button', { name: /Done/i }).click();

    cy.wait(1000);
    cy.goToActivityDashboard();
  });
});
