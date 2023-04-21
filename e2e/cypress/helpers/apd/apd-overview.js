export const testDefaultAPDOverview = function () {
  it('should verify the default values the FFYs and APD Overview', function () {
    cy.url().should('include', '/apd-overview');
    cy.findByRole('heading', { name: /APD Overview/i }).should('exist');
    cy.findByRole('radio', { name: /HITECH IAPD/i }).should('be.checked');

    cy.get('[data-cy=yearList]').within(() => {
      cy.get('[type="checkbox"]').each(($year, index, list) => {
        if (index === list.length - 1) {
          cy.wrap($year).should('not.be.checked');
        } else {
          cy.wrap($year).should('be.checked');
        }
      });
    });

    cy.get('[id="program-introduction-field"]').should('have.value', '');
    cy.get('[id="hit-overview-field"]').should('have.value', '');
    cy.get('[id="hie-overview-field"]').should('have.value', '');
    cy.get('[id="mmis-overview-field"]').should('have.value', '');

    cy.waitForSave();
  });

  it('should display the default values in the export view', function () {
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

export const testAPDOverviewWithData = function () {
  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  beforeEach(function () {
    cy.fixture('apd-overview-template.json').as('apdOverview');
    cy.useStateStaff();
    cy.visit(this.apdUrl);
  });

  it('should handle the FFYs and APD Overview', function () {
    const apdOverview = this.apdOverview;

    cy.url().should('include', '/apd-overview');
    cy.findByRole('heading', { name: /APD Overview/i }).should('exist');

    const allYears = [];

    // Check all of the years
    cy.get('[data-cy=yearList]').within(() => {
      cy.get("[class='ds-c-choice']").each(($el, index, list) => {
        allYears.push(list[index].value);
        if (!list[index].checked) {
          cy.findByRole('checkbox', { name: list[index].value }).check({
            force: true
          });
        }
      });
    });

    cy.then(() => {
      // The last FFY should be check
      cy.get('#apd-header-info').should('contain', allYears[0]);
      cy.get('#apd-header-info').should(
        'contain',
        allYears[allYears.length - 1]
      );

      // Testing delete(cancel) last FFY
      cy.findByRole('checkbox', {
        name: allYears[allYears.length - 1]
      }).uncheck({
        force: true
      });

      // Cancel the delete
      cy.contains('Delete FFY?').should('exist');
      cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get('button[id="dialog-cancel"]').click({ force: true });

      // the last FFY should still be check
      cy.findByRole('checkbox', { name: allYears[allYears.length - 1] }).should(
        'be.checked'
      );
      cy.get('#apd-header-info').should(
        'contain',
        allYears[allYears.length - 1]
      );

      // Testing delete(confirm) last FFY
      cy.findByRole('checkbox', {
        name: allYears[allYears.length - 1]
      }).uncheck({
        force: true
      });
      cy.get('button[id="dialog-delete"]').click({ force: true });
      cy.contains('Delete FFY?').should('not.exist');

      // the last FFY should not be checked
      cy.findByRole('checkbox', { name: allYears[allYears.length - 1] }).should(
        'not.be.checked'
      );
      cy.get('#apd-header-info').should(
        'not.contain',
        allYears[allYears.length - 1]
      );
    });

    cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting

    // must be done as a chunk because the tinyMCE fields don't have
    // time to load if they are done individually
    cy.setTinyMceContent(
      'program-introduction-field',
      apdOverview.introduction
    );

    cy.setTinyMceContent('hit-overview-field', apdOverview.HIT);

    cy.setTinyMceContent('hie-overview-field', apdOverview.HIE);

    cy.setTinyMceContent('mmis-overview-field', apdOverview.MMIS);

    cy.waitForSave();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
  });

  it('should display the correct values in the export view', function () {
    const years = this.years;
    const apdOverview = this.apdOverview;
    const numberOfYears = years.length;
    const yearRange = [years[0], years[numberOfYears - 1]];
    cy.goToExportView();

    // FFY Check
    cy.then(() => {
      yearRange.forEach((y, i) => {
        cy.get('[class="ds-h1 ds-u-margin-top--2"]').should('contain', y[i]);
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

export const testDefaultMmisAPDOverview = function () {
  it('should verify the default values the FFYs and APD Overview', function () {
    cy.url().should('include', '/apd-overview');
    cy.findByRole('heading', { name: /APD Overview/i }).should('exist');
    cy.findByRole('radio', { name: /MMIS IAPD/i }).should('be.checked');
    cy.findByRole('radio', { name: /HITECH IAPD/i }).should('not.be.checked');

    cy.get('[data-cy=yearList]').within(() => {
      cy.get('[type="checkbox"]').each(($year, index, list) => {
        if (index === list.length - 1) {
          cy.wrap($year).should('not.be.checked');
        } else {
          cy.wrap($year).should('be.checked');
        }
      });
    });

    cy.waitForSave();
  });
};

export const testMmisAPDOverviewWithData = function () {
  beforeEach(function () {
    cy.fixture('mmis-with-data.json').as('mmisData');
  });

  it('should handle the FFYs and APD Overview', function () {
    const mmisData = this.mmisData;
    const apdOverviewData = mmisData.apdOverview;

    cy.goToApdOverview();
    cy.url().should('include', '/apd-overview');
    cy.findByRole('heading', { name: /APD Overview/i }).should('exist');

    cy.get('input[name="name"]').clear().type(mmisData.name);

    mmisData.years.forEach(year => {
      cy.get('[data-cy=yearList]').within(() => {
        cy.findByRole('checkbox', { name: year }).check({
          force: true
        });
      });
    });

    if (apdOverviewData.updateStatus.isUpdateAPD === true) {
      cy.findAllByRole('radio', { name: /Yes, it is an update./i }).click();
      if (apdOverviewData.updateStatus.annualUpdate === true) {
        cy.findAllByRole('checkbox', { name: /Annual Update/i }).click();
      }
      if (apdOverviewData.updateStatus.asNeededUpdate === true) {
        cy.findAllByRole('checkbox', { name: /As-Needed Update/i }).click();
      }
    } else {
      cy.findAllByRole('radio', {
        name: /No, this is for a new project./i
      }).click();
    }

    cy.findAllByText('Medicaid Business Areas')
      .parent()
      .parent()
      .within(() => {
        Object.keys(apdOverviewData.medicaidBusinessAreas).forEach(
          (key, index) => {
            if (apdOverviewData.medicaidBusinessAreas[key] === true) {
              if (key === 'other') {
                cy.findAllByRole('checkbox').eq(index).check({ force: true });
                cy.get('[data-cy="other_details"]').type(
                  apdOverviewData.medicaidBusinessAreas
                    .otherMedicaidBusinessAreas
                );
              } else {
                cy.findAllByRole('checkbox').eq(index).check({ force: true });
              }
            }
          }
        );
      });
  });
};
