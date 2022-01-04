import ActivityPage from '../../../page-objects/activity-page';
import PopulatePage from '../../../page-objects/populate-page';
import ExportPage from '../../../page-objects/export-page';

export const testDefaultPrivateContractorCosts = () => {
  it('should display the default Private Contractor Costs', () => {
    cy.goToPrivateContractorCosts(0);
    cy.findByRole('heading', {
      name: /Private Contractor Costs/i,
      level: 3
    }).should('exist');

    cy.contains(
      'Private contractors have not been added for this activity.'
    ).should('exist');

    cy.waitForSave();
  });

  it('should display the default activity overview in the export view', () => {
    const exportPage = new ExportPage();

    cy.goToExportView();

    exportPage.checkPrivateContractorCosts({
      activityHeader: 'Activity 1: Program Administration'
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

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

      contractors.forEach((contractor, index) => {
        cy.findByRole('button', { name: /Add Contractor/i }).click();
        cy.findByLabelText(/Private Contractor or Vendor Name/i).should(
          'exist'
        );

        populatePage.fillContractorForm({ ...contractor, years, index });
        activityPage.checkPrivateContractorOutput({
          ...contractor,
          years,
          index
        });
      });

      cy.findAllByText('Delete').eq(0).click();
      cy.contains('Delete Private Contractor?').should('exist');
      cy.get('.ds-c-button--danger').click();

      cy.contains(`1. ${contractors[0].name}`).should('not.exist');
      cy.contains(`1. ${contractors[1].name}`).should('exist');

      cy.waitForSave();
    });

    it('should display the default activity overview in the export view', () => {
      const exportPage = new ExportPage();

      cy.goToExportView();

      const { name } = activityData.activityOverview[0];
      const contractors = activityData.privateContractors.slice(1, 2);

      exportPage.checkPrivateContractorCosts({
        activityHeader: `Activity 1: ${name}`,
        contractors,
        years
      });

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
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
      cy.findByLabelText(/Private Contractor or Vendor Name/i).should('exist');
      populatePage.fillContractorForm({ ...contractor1, years, index: 0 });

      // Add another private contractor
      cy.findByRole('button', { name: /Add Contractor/i }).click();
      cy.findByLabelText(/Private Contractor or Vendor Name/i).should('exist');

      populatePage.fillContractorForm({
        ...contractor2,
        hourly: true,
        years,
        index: 1
      });
      cy.waitForSave();
    });

    it('should display the default activity overview in the export view', () => {
      const exportPage = new ExportPage();

      cy.goToExportView();

      const { name } = activityData.activityOverview[1];
      const contractors = activityData.privateContractors.slice(2);

      exportPage.checkPrivateContractorCosts({
        activityHeader: `Activity 2: ${name}`,
        contractors,
        years
      });

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
  });
};
