import ActivityPage from '../../../page-objects/activity-page';
import PopulatePage from '../../../page-objects/populate-page';
import ExportPage from '../../../page-objects/export-page';

export const testDefaultActivityOverview = () => {
  let activityPage;

  before(() => {
    activityPage = new ActivityPage();
  });

  it('should display the default activity overview', () => {
    cy.goToActivityOverview(0);

    cy.findByRole('heading', { name: /Activity Overview/i }).should('exist');

    activityPage.checkDate('Start date');
    activityPage.checkDate('End date');

    activityPage.checkTinyMCE('activity-short-overview-field', '');
    activityPage.checkTinyMCE('activity-description-field', '');
    activityPage.checkTinyMCE('activity-alternatives-field', '');
    activityPage.checkTinyMCE('standards-and-conditions-supports-field', '');
    activityPage.checkTextField('ds-c-field visibility--screen', '');

    cy.waitForSave();
  });

  it('should display the default activity overview in the export view', () => {
    const exportPage = new ExportPage();
    cy.goToExportView();

    exportPage.checkActivityOverview({
      activityHeader: 'Activity 1: Program Administration',
      shortOverview: '',
      startDate: 'Date not specified',
      endDate: 'Date not specified',
      detailedDescription: '',
      supportingJustifications: '',
      supportsMedicaid:
        'No response was provided for how this activity will support the Medicaid standards and conditions.',
      doesNotSupportsMedicaid:
        'No response was provided for how this activity will support the Medicaid standards and conditions.'
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testActivityOverviewWithData = () => {
  let populatePage;
  let activityOverview;

  before(() => {
    populatePage = new PopulatePage();
  });

  beforeEach(() => {
    cy.fixture('activity-overview-template.json').then(data => {
      activityOverview = data;
    });
  });

  describe('Activity 1', () => {
    beforeEach(() => {
      cy.goToActivityOverview(0);
    });

    it('Fills in fields on first activity', () => {
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', { name: /Activity Overview/i }).should('exist');

      const overview = activityOverview.activityOverview[0];

      populatePage.fillActivityOverview(overview);
      cy.waitForSave();
    });

    it('should display the default activity overview in the export view', () => {
      const exportPage = new ExportPage();
      cy.goToExportView();

      const overview = activityOverview.activityOverview[0];

      exportPage.checkActivityOverview({
        ...overview,
        activityHeader: `Activity 1: ${overview.name}`,
        doesNotSupportsMedicaid:
          'No response was provided for how this activity will support the Medicaid standards and conditions.',
        startDate: overview.startDate.join('/'),
        endDate: overview.endDate.join('/')
      });

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
  });

  describe('Activity 2', () => {
    beforeEach(() => {
      cy.goToActivityOverview(1);
    });

    it('Fills in fields on second activity', () => {
      cy.findByRole('heading', {
        name: /^Activity 2:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', { name: /Activity Overview/i }).should('exist');

      const overview = activityOverview.activityOverview[1];
      populatePage.fillActivityOverview(overview);

      cy.waitForSave();
    });

    it('should display the default activity overview in the export view', () => {
      const exportPage = new ExportPage();
      cy.goToExportView();

      const overview = activityOverview.activityOverview[1];

      exportPage.checkActivityOverview({
        ...overview,
        activityHeader: `Activity 2: ${overview.name}`,
        doesNotSupportsMedicaid:
          'No response was provided for how this activity will support the Medicaid standards and conditions.',
        startDate: overview.startDate.join('/'),
        endDate: overview.endDate.join('/')
      });

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
  });
};
