export const testDefaultAPDOverview = () => {
  it('should verify the default values the FFYs and APD Overview', () => {
    cy.url().should('include', '/apd-overview');
    cy.findByRole('heading', { name: /APD Overview/i }).should('exist');

    cy.get('[type="checkbox"]').each(($year, index, list) => {
      if (index === list.length - 1) {
        cy.wrap($year).should('not.be.checked');
      } else {
        cy.wrap($year).should('be.checked');
      }
    });

    cy.get('[id="program-introduction-field"]').should('have.value', '');
    cy.get('[id="hit-overview-field"]').should('have.value', '');
    cy.get('[id="hie-overview-field"]').should('have.value', '');
    cy.get('[id="mmis-overview-field"]').should('have.value', '');

    cy.waitForSave();
  });

  it('should display the default values in the export view', () => {
    cy.goToExportView();

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

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testAPDOverviewWithData = () => {
  let apdOverview;
  const years = [];

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  beforeEach(function () {
    cy.fixture('apd-overview-template.json').then(userContent => {
      apdOverview = userContent;
    });
  });

  it('should handle the FFYs and APD Overview', () => {
    cy.url().should('include', '/apd-overview');
    cy.findByRole('heading', { name: /APD Overview/i }).should('exist');

    cy.log('test adding and removing FFYs');
    const allYears = [];
    cy.get("[class='ds-c-choice']").each(($el, index, list) => {
      allYears.push(list[index].value);
      if (!list[index].checked) {
        cy.findByRole('checkbox', { name: list[index].value }).check({
          force: true
        });
      } else {
        years.push(list[index].value);
      }
    });

    cy.then(() => {
      cy.get('[class="ds-h1 apd--title"]').should('contain', allYears[0]);
      cy.get('[class="ds-h1 apd--title"]').should(
        'contain',
        allYears[allYears.length - 1]
      );

      // Testing delete(cancel) FFY
      cy.findByRole('checkbox', {
        name: allYears[allYears.length - 1]
      }).uncheck({
        force: true
      });
      cy.contains('Delete FFY?').should('exist');
      cy.contains('Cancel').click();

      cy.findByRole('checkbox', { name: allYears[allYears.length - 1] }).should(
        'be.checked'
      );
      cy.get('[class="ds-h1 apd--title"]').should(
        'contain',
        allYears[allYears.length - 1]
      );

      // Testing delete(confirm) FFY
      cy.findByRole('checkbox', {
        name: allYears[allYears.length - 1]
      }).uncheck({
        force: true
      });
      cy.findByRole('button', { name: /Delete FFY/i }).click();
      cy.contains('Delete FFY?').should('not.exist');

      cy.findByRole('checkbox', { name: allYears[allYears.length - 1] }).should(
        'not.be.checked'
      );
      cy.get('[class="ds-h1 apd--title"]').should(
        'not.contain',
        allYears[allYears.length - 1]
      );
    });

    // must be done as a chunk because the tinyMCE fields don't have
    // time to load if they are done individually
    cy.log('Program Introduction');
    cy.setTinyMceContent(
      'program-introduction-field',
      apdOverview.introduction
    );

    cy.log('HIT');
    cy.setTinyMceContent('hit-overview-field', apdOverview.HIT);
    cy.wait(1500); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.waitForSave();

    cy.log('HIE');
    cy.setTinyMceContent('hie-overview-field', apdOverview.HIE);
    cy.wait(1500); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.waitForSave();

    cy.log('MMIS');
    cy.setTinyMceContent('mmis-overview-field', apdOverview.MMIS);
    cy.wait(1500); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.waitForSave();
  });

  it('should display the correct values in the export view', () => {
    cy.goToExportView();

    // FFY Check
    cy.then(() => {
      years.forEach((year, i) => {
        cy.get('[class="ds-h1 ds-u-margin-top--2"]').should(
          'contain',
          years[i]
        );
      });
    });

    cy.contains('Program introduction')
      .next()
      .should('have.text', apdOverview.introduction);

    cy.contains('HIT overview').next().should('have.text', apdOverview.HIT);

    cy.contains('HIE overview').next().should('have.text', apdOverview.HIE);

    cy.contains('MMIS overview').next().should('have.text', apdOverview.MMIS);

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
