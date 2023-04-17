import PopulatePage from '../../page-objects/populate-page';

const alertNotPresent = function () {
  cy.findByRole('alert').should('not.exist');
};

const errorPresent = function (error) {
  cy.findByRole('alert').should('exist').should('contain', error);
};

const clearField = function (id) {
  cy.get(id).clear();
};

const fillField = function (id, content) {
  cy.get(id).clear().type(content);
};

const dollarError = 'Provide a dollar amount greater than or equal to $0';
const tableError =
  'Provide a whole number greater than or equal to $0. Decimals will be rounded to the closest number.';
const validEndDateErr = 'Provide an end date that is after the start date.';
const validStartDateErr = 'Provide a valid start date.';
const validYearErr = 'Provide a valid start year.';

export const testDateDollarInlineValidation = function () {
  let populatePage;

  context('Inline Validation without Admin Check', function () {
    before(function () {
      populatePage = new PopulatePage();
    });

    it('should show inline validation for Previous Activity dollar fields', function () {
      const years = this.years;
      const inputField = `[data-cy='${years[0]}.hithie.totalApproved']`;

      cy.goToPreviousActivities();
      cy.findByRole('heading', {
        name: /Results of Previous Activities/i
      }).should('exist');

      clearField(inputField);
      errorPresent(dollarError);

      fillField(inputField, 'abc');
      errorPresent(dollarError);

      fillField(inputField, 321);
      alertNotPresent();

      fillField(inputField, '-123');
      errorPresent(dollarError);

      fillField(inputField, 0);
      alertNotPresent();
    });

    context('Activity Dollar and Date Fields Not in Subforms', function () {
      beforeEach(function () {
        cy.goToActivityDashboard();

        cy.get('#activities')
          .contains('Edit')
          .should('exist')
          .contains('Edit')
          .click();
      });

      it('should show inline validation for Activity Schedule date fields', function () {
        cy.goToActivitySchedule(0);
        cy.findByRole('heading', { name: /Activity Schedule/i }).should(
          'exist'
        );

        errorPresent(validStartDateErr);
        populatePage.fillDate('Start date', ['11', '16', '200']);
        errorPresent(validYearErr);
        populatePage.fillDate('Start date', ['11', '16', '3000']);
        errorPresent(validYearErr);
        populatePage.fillDate('Start date', ['11', '45', '1990']);
        errorPresent(validStartDateErr);
        populatePage.fillDate('Start date', ['33', '16', '1990']);
        errorPresent(validStartDateErr);
        populatePage.fillDate('Start date', ['11', '16', '1990']);
        alertNotPresent();
      });

      it('should show inline validation for Cost Allocation Other Funding dollar fields', function () {
        const years = this.years;
        const inputField = `[name='costAllocation.${years[0]}.other']`;

        cy.goToCostAllocationAndOtherFunding(0);

        clearField(inputField);
        errorPresent(dollarError);

        fillField(inputField, 'abc');
        errorPresent(dollarError);

        fillField(inputField, 321);
        alertNotPresent();

        fillField(inputField, '-123');
        errorPresent(dollarError);

        fillField(inputField, 0);
        alertNotPresent();
      });
    });

    it('should show inline validation for EQI Payments', function () {
      const years = this.years;
      const inputField = `[name='ehAmt.${years[0]}.1']`;

      cy.goToProposedBudget();

      clearField(inputField);
      errorPresent(tableError);

      fillField(inputField, 'abc');
      errorPresent(tableError);

      fillField(inputField, 321);
      alertNotPresent();

      fillField(inputField, 0);
      alertNotPresent();
    });
  });
};
