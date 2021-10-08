import ActivityPage from '../../../page-objects/activity-page';
import PopulatePage from '../../../page-objects/populate-page';

export const testDefaultPrivateContractorCosts = years => {
  let activityPage;

  before(() => {
    activityPage = new ActivityPage();
  });

  beforeEach(() => {
    cy.goToPrivateContractorCosts(0);
    cy.findByRole('heading', {
      name: /Private Contractor Costs/i,
      level: 3
    }).should('exist');
  });

  it('should display the default Private Contractor Costs', () => {
    cy.contains(
      'Private contractors have not been added for this activity.'
    ).should('exist');

    cy.findByRole('button', { name: /Add Contractor/i }).click();
    cy.waitForSave();

    activityPage.checkTextField('ds-c-field', '');
    activityPage.checkTinyMCE('contractor-description-field-0', '');
    activityPage.checkDate('Contract start date');
    activityPage.checkDate('Contract end date');
    activityPage.checkTextField(
      'ds-c-field ds-c-field--currency ds-c-field--medium',
      '',
      0
    );
    cy.get('[type="radio"][checked]').should('have.value', 'no');
    activityPage.checkFFYinputCostFields(years, '');

    cy.findByRole('button', { name: /Done/i }).click();

    activityPage.checkPrivateContractorOutput(
      'Private Contractor or Vendor Name not specified',
      'Procurement Methodology and Description of Services not specified',
      'Full Contract Term: Date not specified - Date not specified',
      'Total Contract Cost: $0',
      years,
      [0, 0]
    );

    activityPage.checkDeleteButton(
      'Private contractors have not been added for this activity',
      'Delete Private Contractor?',
      'Private Contractor or Vendor Name not specified'
    );

    cy.findByRole('button', { name: /Add Contractor/i }).click();
    cy.waitForSave();
    cy.findByRole('button', { name: /Done/i }).click();
  });
};

export const testDefaultPrivateContractorCostsExportView = () => {};

export const testPrivateContractorCostsWithData = years => {
  let populatePage;
  let activityPage;

  let activityData;

  before(() => {
    populatePage = new PopulatePage();
    activityPage = new ActivityPage();
  });

  beforeEach(() => {
    cy.fixture('activity-overview-template.json').then(data => {
      activityData = data;
    });
  });

  describe('Activity 1', () => {
    beforeEach(() => {
      cy.goToPrivateContractorCosts(0);
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', {
        name: /Private Contractor Costs/i,
        level: 3
      }).should('exist');
    });
    it('fills our private contractor form', () => {
      const contractor = activityData.privateContractors[0];

      for (let i = 0; i < 2; i += 1) {
        cy.findByRole('button', { name: /Add Contractor/i }).click();
        cy.waitForSave();
        cy.findByLabelText(/Private Contractor or Vendor Name/i).should(
          'exist'
        );

        populatePage.fillContractorForm(
          contractor.names[i],
          contractor.descriptions[i],
          contractor.start[i],
          contractor.end[i],
          contractor.totalCosts[i],
          contractor.FFYcosts[i],
          i
        );
        cy.waitForSave();

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
    });

    it('tests deleting a private contractor', () => {
      const contractor = activityData.privateContractors[0];

      cy.findAllByText('Delete').eq(0).click();
      cy.contains('Delete Private Contractor?').should('exist');
      cy.get('.ds-c-button--danger').click();
      cy.waitForSave();
      cy.contains(`1. ${contractor.names[0]}`).should('not.exist');
      cy.contains(`1. ${contractor.names[1]}`).should('exist');
    });
  });

  describe('Activity 2', () => {
    beforeEach(() => {
      cy.goToPrivateContractorCosts(1);
      cy.findByRole('heading', {
        name: /^Activity 2:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', {
        name: /Private Contractor Costs/i,
        level: 3
      }).should('exist');
    });
    it('fills 2nd activity private contractor', () => {
      const contractor = activityData.privateContractors[1];

      cy.findByRole('button', { name: /Add Contractor/i }).click();
      cy.waitForSave();
      cy.findByLabelText(/Private Contractor or Vendor Name/i).should('exist');
      populatePage.fillContractorForm(
        contractor.names[0],
        contractor.descriptions[0],
        contractor.start[0],
        contractor.end[0],
        contractor.totalCosts[0],
        contractor.FFYcosts[0],
        0
      );
      cy.waitForSave();

      // Add another private contractor
      cy.findByRole('button', { name: /Add Contractor/i }).click();
      cy.waitForSave();
      cy.findByLabelText(/Private Contractor or Vendor Name/i).should('exist');
      populatePage.fillTextField('ds-c-field', contractor.names[1]);
      cy.setTinyMceContent(
        'contractor-description-field-1',
        contractor.descriptions[1]
      );
      populatePage.fillDate('Contract start date', contractor.start[1]);
      cy.waitForSave();
      populatePage.fillDate('Contract end date', contractor.end[1]);
      cy.waitForSave();

      populatePage.fillTextField(
        'ds-c-field ds-c-field--currency ds-c-field--medium',
        contractor.totalCosts[1],
        0
      );
      cy.waitForSave();

      cy.findByRole('radio', { name: /Yes/i }).click({ force: true });
      cy.waitForSave();
      for (let i = 0; i < years.length; i += 1) {
        populatePage.fillTextField(
          'ds-c-field ds-c-field--medium',
          contractor.FFYcosts[1][i][0],
          i
        );
        cy.waitForSave();
        populatePage.fillTextField(
          'ds-c-field ds-c-field--currency ds-c-field--medium',
          contractor.FFYcosts[1][i][1],
          i + 1
        );
        cy.waitForSave();
      }
      cy.findByRole('button', { name: /Done/i }).click();
    });
  });
};

export const testPrivateContractorCostsExportViewWithData = () => {};
