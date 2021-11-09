export const testDefaultAPDOverview = () => {
  it('should be on the correct page', () => {
    cy.url().should('include', '/apd-overview');
    cy.findByRole('heading', { name: /APD Overview/i }).should('exist');
  });

  it('should have the first two FFYs checked', () => {
    cy.get('[type="checkbox"]').each(($year, index, list) => {
      if (index === list.length - 1) {
        cy.wrap($year).should('not.be.checked');
      } else {
        cy.wrap($year).should('be.checked');
      }
    });
  });

  it('should have an empty Program Introduction field', () => {
    cy.get('[id="program-introduction-field"]').should('have.value', '');
  });

  it('should have an empty HIT Overview field', () => {
    cy.get('[id="hit-overview-field"]').should('have.value', '');
  });

  it('should have an empty HIE Overview field', () => {
    cy.get('[id="hie-overview-field"]').should('have.value', '');
  });

  it('should have an empty MMIS Overview field', () => {
    cy.get('[id="mmis-overview-field"]').should('have.value', '');
  });
};

export const testDefaultAPDOverviewExportView = () => {
  it('should have the default value for Program Introduction', () => {
    cy.contains('Program introduction')
      .next()
      .should('have.text', 'No response was provided');
  });

  it('should have the default value for HIT Overview', () => {
    cy.contains('HIT overview')
      .next()
      .should('have.text', 'No response was provided');
  });

  it('should have the default value for HIE Overview', () => {
    cy.contains('HIE overview')
      .next()
      .should('have.text', 'No response was provided');
  });

  it('should have the default value for MMIS Overview', () => {
    cy.contains('MMIS overview')
      .next()
      .should('have.text', 'No response was provided');
  });
};

export const testAPDOverviewWithData = () => {
  let apdOverview;
  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  beforeEach(function () {
    cy.fixture('apd-overview-template.json').then(userContent => {
      apdOverview = userContent;
    });
  });

  it('should be on the correct page', () => {
    cy.url().should('include', '/apd-overview');
    cy.findByRole('heading', { name: /APD Overview/i }).should('exist');
  });

  it('should handle the FFYs', () => {
    const years = [];
    cy.get("[class='ds-c-choice']").each(($el, index, list) => {
      years.push(list[index].value);
      if (!list[index].checked) {
        cy.findByRole('checkbox', { name: list[index].value }).check({
          force: true
        });
        cy.waitForSave();
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
      cy.waitForSave();
      cy.contains('Delete FFY?').should('not.exist');

      cy.findByRole('checkbox', { name: years[years.length - 1] }).should(
        'not.be.checked'
      );
      cy.get('[class="ds-h1 apd--title"]').should(
        'not.contain',
        years[years.length - 1]
      );
    });
  });

  it('should fill out the APD Overview', () => {
    // must be done as a chunk because the tinyMCE fields don't have
    // time to load if they are done individually
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.setTinyMceContent(
      'program-introduction-field',
      apdOverview.introduction
    );
    cy.waitForSave();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.setTinyMceContent('hit-overview-field', apdOverview.HIT);
    cy.waitForSave();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.setTinyMceContent('hie-overview-field', apdOverview.HIE);
    cy.waitForSave();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.setTinyMceContent('mmis-overview-field', apdOverview.MMIS);
    cy.waitForSave();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  });

  it('should handle the navigation buttons', () => {
    cy.contains('Continue').click();
    cy.get('[class="ds-h2"]').should('contain', 'Key State Personnel');
    cy.contains('Back').click();
    cy.get('[class="ds-h2"]').should('contain', 'APD Overview');
  });
};

export const testAPDOverviewExportViewWithData = years => {
  let apdOverview;
  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  beforeEach(function () {
    cy.fixture('apd-overview-template.json').then(userContent => {
      apdOverview = userContent;
    });
  });

  it('should display the correct FFYs', () => {
    // FFY Check
    cy.then(() => {
      years.forEach((year, i) => {
        cy.get('[class="ds-h1 ds-u-margin-top--2"]').should(
          'contain',
          years[i]
        );
      });
    });
  });

  it('should have the correct value for Program Introduction', () => {
    cy.contains('Program introduction')
      .next()
      .should('have.text', apdOverview.introduction);
  });

  it('should have the correct values for HIT Overview', () => {
    cy.contains('HIT overview').next().should('have.text', apdOverview.HIT);
  });

  it('should have the correct values for HIE Overview', () => {
    cy.contains('HIE overview').next().should('have.text', apdOverview.HIE);
  });

  it('should have the correct values for MMIS Overview', () => {
    cy.contains('MMIS overview').next().should('have.text', apdOverview.MMIS);
  });
};
