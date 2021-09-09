/// <reference types="cypress" />

// Tests filling out APD overview section

/* eslint-disable no-return-assign */
/* eslint-disable prefer-arrow-callback */

describe('filling out APD overview section', function () {
  let apdUrl;
  const years = [];

  before(function () {
    cy.useStateStaff();

    // Delete all existing APDs
    cy.get('button')
      .each($el => {
        if($el.text().includes('Delete')) {
          cy.wrap($el).click();
          cy.findAllByText('Delete APD').click();
        }
      });
    cy.wait(1000); // Wait for saving

    cy.findByRole('button', { name: /Create new/i }).click();
    cy.wait(1000); // Gives time for webpage to load
    cy.location('pathname').then(pathname => (apdUrl = pathname));
  });

  beforeEach(function () {
    cy.fixture('apd-overview-template.json').as('userContent');
    cy.useStateStaff(apdUrl);
  });

  it('tests default values', function () {
    cy.url().should('include', '/apd-overview');

    // Check if input fields are empty
    cy.get('[id="program-introduction-field"]').should('have.value', '');
    cy.get('[id="hit-overview-field"]').should('have.value', '');
    cy.get('[id="hie-overview-field"]').should('have.value', '');
    cy.get('[id="mmis-overview-field"]').should('have.value', '');

    cy.goToExportView();

    // Check if exported output was defaulted correctly
    cy.contains('Program introduction')
      .next()
      .should('have.text', 'No response was provided');

    cy.contains('HIT overview')
      .next()
      .should('have.text', 'No response was provided');

    cy.contains('HIE overview')
      .next()
      .should('have.text', 'No response was provided');

    cy.contains('MMIS overview')
      .next()
      .should('have.text', 'No response was provided');

    cy.scrollTo('top');
    cy.contains('Back to APD').click();

    // Tests continue button
    cy.contains('Continue').click();
    cy.get('[class="ds-h2"]').should('contain', 'Key State Personnel');
    cy.contains('Back').click();
  });

  it('adds value to the APD', function () {
    // Gets list of available years
    cy.get("[class='ds-c-choice']").each(($el, index, list) => {
      years.push(list[index].value);
      if (!list[index].checked) {
        cy.findByRole('checkbox', { name: list[index].value }).check({
          force: true
        });

        cy.contains('Saving').should('exist');
        cy.contains('Saved').should('exist');
      }
    });

    cy.then(() => {
      cy.get('[class="ds-h1 apd--title"]').should('contain', years[0]);
      cy.get('[class="ds-h1 apd--title"]').should(
        'contain',
        years[years.length - 1]
      );

      // Testing delete(cancel) FFY
      cy.findByRole('checkbox', { name: years[years.length - 1] }).uncheck({
        force: true
      });
      cy.contains('Delete FFY?').should('exist');
      cy.contains('Cancel').click();

      cy.findByRole('checkbox', { name: years[years.length - 1] }).should(
        'be.checked'
      );
      cy.get('[class="ds-h1 apd--title"]').should(
        'contain',
        years[years.length - 1]
      );

      // Testing delete(confirm) FFY
      cy.findByRole('checkbox', { name: years[years.length - 1] }).uncheck({
        force: true
      });
      cy.findByRole('button', { name: /Delete FFY/i }).click();
      cy.contains('Delete FFY?').should('not.exist');

      cy.findByRole('checkbox', { name: years[years.length - 1] }).should(
        'not.be.checked'
      );
      cy.get('[class="ds-h1 apd--title"]').should(
        'not.contain',
        years[years.length - 1]
      );
    });

    // Put content into input fields
    cy.setTinyMceContent(
      'program-introduction-field',
      this.userContent.introduction
    );
    cy.setTinyMceContent('hit-overview-field', this.userContent.HIT);
    cy.setTinyMceContent('hie-overview-field', this.userContent.HIE);
    cy.wait(1000);
    cy.setTinyMceContent('mmis-overview-field', this.userContent.MMIS);
    cy.wait(1000); // Gives time to save
  });

  it('Tests export view', function () {
    cy.goToExportView();

    // FFY Check
    cy.then(() => {
      for (let i = 0; i < years.length; i++) {
        if (i === years.length - 1) {
          cy.get('[class="ds-c-review__body"]').should('not.contain', years[i]);
        } else {
          cy.get('[class="ds-c-review__body"]').should('contain', years[i]);
        }
      }
    });

    cy.contains('Program introduction')
      .next()
      .should('have.text', this.userContent.introduction);

    cy.contains('HIT overview')
      .next()
      .should('have.text', this.userContent.HIT);

    cy.contains('HIE overview')
      .next()
      .should('have.text', this.userContent.HIE);

    cy.contains('MMIS overview')
      .next()
      .should('have.text', this.userContent.MMIS);
  });
});
