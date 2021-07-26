/// <reference types="cypress" />

describe('filling out Activities section', function () {
  let apdUrl;
  let years = [];

  before(function () {
    cy.useStateStaff();
    // cy.findByRole('button', {name: /Create new/i}).click();
    cy.get('[href="/apd/295"]').click();

    //Gets list of available years
    cy.get("[class='ds-c-choice']").each(($el, index, list) => {
      cy.get(list[index]).check({force: true});
      years.push(list[index].value);
    });

    //Gets to the activity page
    for (let i = 0; i < 3; i++) {
      cy.contains('Continue').click();
    }

    cy.url().should('include', '/activities');
    cy.wait(500); //Gives time for webpage to load
    cy.location('pathname').then(pathname => (apdUrl = pathname));
  });

  beforeEach(function () {
    cy.useStateStaff(apdUrl);
  });

  it('is a filler', function () {
    cy.url().should('include', '/activities');
  });

  it.only('tests default values', function () {
    const checkDefaultDate = (string) => {
      cy.contains(string)
      .parent()
      .next('div')
      .within(() => {
        cy.findByLabelText('Month').should('have.value', '');
        cy.findByLabelText('Day').should('have.value', '');
        cy.findByLabelText('Year').should('have.value', '');
      });
    };

    const checkDeleteButton = (errMsg, heading) => {
      cy.contains(errMsg).should('not.exist');
      cy.contains('Delete').click();
      cy.contains(heading).should('exist');
      cy.contains('Cancel').click();
      cy.contains(errMsg).should('not.exist');

      cy.contains('Delete').click();
      cy.contains(heading).should('exist');
      cy.get('[class="ds-c-button ds-c-button--danger"]').click();
      cy.contains(errMsg).should('exist');
    };

    cy.url().should('include', '/activities');

    //Tests Continue button on Activities Dashboard
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
    checkDefaultDate('Start date');
    checkDefaultDate('End date');

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

    cy.findByRole('button', { name: /Add another outcome/i }).click();
    cy.contains('Describe a distinct').next().should('have.value', '');
    cy.contains('Describe a measure').next().should('have.value', '');
    cy.findByRole('button', { name: /Done/i }).click();

    checkDeleteButton(
      'Outcomes have not been added for this activity.',
      'Delete Outcome and Metrics?'
    );

    cy.findByRole('button', { name: /Add another milestone/i }).click();
    cy.findByLabelText('Name').should('have.value', '');
    checkDefaultDate('Target completion date');
    cy.findByRole('button', { name: /Done/i }).click();

    checkDeleteButton(
      'Milestones have not been added for this activity.',
      'Delete Milestone?'
    );

    //State Staff and Expenses
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/state-costs');

    cy.contains('State staff have not been added for this activity.').should(
      'exist'
    );
    cy.contains('Other state expenses have not been added for this activity.').should(
      'exist'
    );

    cy.findByRole('button', {name: /Add another state staff/i}).click();
    cy.findByLabelText('Personnel title').should('have.value', '');
    cy.findByLabelText('Description').should('have.value','');
    cy.then(() => {
      for(let i = 0; i < years.length; i++){
        cy.contains(`FFY ${years[i]} Cost`).next('div').within(() => {
          cy.findByLabelText('Cost with benefits').should('have.value', '');
          cy.findByLabelText('Number of FTEs').should('have.value', '');
          cy.contains('Total: $0').should('exist');
        });
      }
    });
    cy.findByRole('button', {name: /Done/i}).click();

    checkDeleteButton(
      'State staff have not been added for this activity.',
      'Delete State Staff Expenses?'
    );

    cy.findByRole('button', {name: /Add another state expense/i}).click();

    //Checks dropdown menu elements
    cy.contains('Category').parent().next().click();
    cy.contains('Hardware, software, and licensing').should('exist');
    cy.contains('Equipment and supplies').should('exist');
    cy.contains('Training and outreach').should('exist');
    cy.contains('Travel').should('exist');
    cy.contains('Administrative operations').should('exist');
    cy.contains('Miscellaneous expenses for the project').should('exist');

    cy.findByLabelText('Description').should('have.value', '');
    cy.then(() => {
      for(let i = 0; i < years.length; i++){
        cy.findByLabelText(`${years[i]} Cost`).should('have.value', 0);
      }
    });
    cy.findByRole('button', {name: /Done/i}).click();

    checkDeleteButton(
      'Other state expenses have not been added for this activity.',
      'Delete Other State Expense?'
    );

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
