/// <reference types="cypress" />

describe('filling out Activities section', function () {
  let apdUrl;

  before(function () {
    cy.useStateStaff();
    // cy.findByRole('button', {name: /Create new/i}).click();
    cy.get('[href="/apd/287"]').click();

    for (let i = 0; i < 3; i++) {
      cy.contains('Continue').click();
    }

    cy.url().should('include', '/activities');
    cy.wait(1000); //Gives time for webpage to load
    cy.location('pathname').then(pathname => (apdUrl = pathname));
  });

  beforeEach(function () {
    cy.useStateStaff(apdUrl);
  });

  it('is a filler', function () {
    cy.url().should('include', '/activities');
  });

  it.only('tests default values', function () {
    cy.url().should('include', '/activities');

    //Tests continue button on Activities Dashboard
    cy.contains('Continue').click();
    cy.url().should('contain', '/schedule-summary');
    cy.contains('Back').click();
    cy.url().should('include', '/activities');

    cy.contains('Activity 1').should('exist');

    //Shouldn't be able to delete the default activity
    cy.contains('Delete').should('not.exist');
    cy.contains('Edit').should('exist');

    //Edit default activity
    cy.contains('Edit').click();
    cy.url().should('contain', '/activity/0/overview');

    //Dates
    cy.contains('Start date')
      .parent()
      .next('div')
      .within(() => {
        cy.findByLabelText('Month').should('have.value', '');
        cy.findByLabelText('Day').should('have.value', '');
        cy.findByLabelText('Year').should('have.value', '');
      });

    cy.contains('End date')
      .parent()
      .next('div')
      .within(() => {
        cy.findByLabelText('Month').should('have.value', '');
        cy.findByLabelText('Day').should('have.value', '');
        cy.findByLabelText('Year').should('have.value', '');
      });

    //Text fields
    cy.get('[id="activity-short-overview-field"]').should('have.value', '');
    cy.get('[id="activity-description-field"]').should('have.value', '');
    cy.get('[id="activity-alternatives-field"]').should('have.value', '');
    cy.get('[id="standards-and-conditions-supports-field"]').should(
      'have.value',
      ''
    );
    cy.get('[class="ds-c-field visibility--screen"]').should('have.value', '');

    //Outcomes and Milestones
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/oms');

    cy.contains('Outcomes have not been added for this activity.').should(
      'exist'
    );
    cy.contains('Milestones have not been added for this activity.').should(
      'exist'
    );

    cy.findByRole('button', {name: /Add another outcome/i}).click();
    cy.contains('Describe a distinct').parent().next().should('have.value', '');
    cy.contains('Describe a measure').parent().next().should('have.value', '');
    cy.findByRole('button', {name: /Done/i}).click();

    cy.contains('Outcomes have not been added for this activity.').should(
      'not.exist'
    );

    //State Staff and Expenses
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/state-costs');

    //Private Contractor Costs
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/contractor-costs');

    //Cost Allocation and Other Funding
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/cost-allocation');

    //Budget and FFP
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/ffp');

    //Testing add activity button at end of Activitiy
    cy.contains('Add another activity').click();
    cy.url().should('include', '/activities');
    cy.contains('Activity 2').should('exist');
    cy.contains('Delete').click();
    cy.findByRole('button', { name: /Delete Activity/i }).click();
    cy.contains('Activity 2').should('not.exist');

    // //testing the create new activity
    // cy.findByRole('button', {name: /Add another activity/i}).click();
    //test naming and funding type on branad new activity
  });
});
