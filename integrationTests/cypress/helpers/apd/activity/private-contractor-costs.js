import ActivityPage from '../../../page-objects/activity-page';
import PopulatePage from '../../../page-objects/populate-page';

export const testDefaultPrivateContractorCosts = () => {
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
    });
    it('fills our private contractor form', () => {
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', {
        name: /Private Contractor Costs/i,
        level: 3
      }).should('exist');
      const contractors = activityData.privateContractors.slice(0, 2);

      contractors.forEach(
        ({ name, description, start, end, totalCosts, FFYcosts }, index) => {
          cy.findByRole('button', { name: /Add Contractor/i }).click();
          cy.waitForSave();
          cy.findByLabelText(/Private Contractor or Vendor Name/i).should(
            'exist'
          );

          populatePage.fillContractorForm(
            name,
            description,
            start,
            end,
            totalCosts,
            FFYcosts,
            index
          );
          cy.waitForSave();

          const startDate = `${start[0]}/${start[1]}/${start[2]}`;
          const endDate = `${end[0]}/${end[1]}/${end[2]}`;

          activityPage.checkPrivateContractorOutput(
            name,
            description,
            `${startDate} - ${endDate}`,
            totalCosts,
            years,
            FFYcosts
          );
        }
      );

      cy.log('delete a private contractor');
      cy.findAllByText('Delete').eq(0).click();
      cy.contains('Delete Private Contractor?').should('exist');
      cy.get('.ds-c-button--danger').click();
      cy.waitForSave();
      cy.contains(`1. ${contractors[0].name}`).should('not.exist');
      cy.contains(`1. ${contractors[1].name}`).should('exist');
    });

    // TODO: export view tests
  });

  describe('Activity 2', () => {
    beforeEach(() => {
      cy.goToPrivateContractorCosts(1);
    });
    it('fills 2nd activity private contractor', () => {
      cy.findByRole('heading', {
        name: /^Activity 2:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', {
        name: /Private Contractor Costs/i,
        level: 3
      }).should('exist');

      const [contractor1, contractor2] =
        activityData.privateContractors.slice(2);

      cy.findByRole('button', { name: /Add Contractor/i }).click();
      cy.waitForSave();
      cy.findByLabelText(/Private Contractor or Vendor Name/i).should('exist');
      populatePage.fillContractorForm(
        contractor1.name,
        contractor1.description,
        contractor1.start,
        contractor1.end,
        contractor1.totalCosts,
        contractor1.FFYcosts,
        0
      );
      cy.waitForSave();

      // Add another private contractor
      cy.findByRole('button', { name: /Add Contractor/i }).click();
      cy.waitForSave();
      cy.findByLabelText(/Private Contractor or Vendor Name/i).should('exist');
      populatePage.fillTextField('ds-c-field', contractor2.name);
      cy.setTinyMceContent(
        'contractor-description-field-1',
        contractor2.description
      );
      populatePage.fillDate('Contract start date', contractor2.start);
      cy.waitForSave();
      populatePage.fillDate('Contract end date', contractor2.end);
      cy.waitForSave();

      populatePage.fillTextField(
        'ds-c-field ds-c-field--currency ds-c-field--medium',
        contractor2.totalCosts,
        0
      );
      cy.waitForSave();

      cy.findByRole('radio', { name: /Yes/i }).click({ force: true });
      cy.waitForSave();
      for (let i = 0; i < years.length; i += 1) {
        populatePage.fillTextField(
          'ds-c-field ds-c-field--medium',
          contractor2.FFYcosts[i][0],
          i
        );
        cy.waitForSave();
        populatePage.fillTextField(
          'ds-c-field ds-c-field--currency ds-c-field--medium',
          contractor2.FFYcosts[i][1],
          i + 1
        );
        cy.waitForSave();
      }
      cy.findByRole('button', { name: /Done/i }).click();
    });

    // TODO: add test for export view
  });
};
