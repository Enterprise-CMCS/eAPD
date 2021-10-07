import ActivityPage from '../../../page-objects/activity-page';
import PopulatePage from '../../../page-objects/populate-page';

export const testDefaultActivityOverview = () => {
  let activityPage;

  before(() => {
    activityPage = new ActivityPage();
  });

  beforeEach(() => {
    cy.goToActivityOverview(0);
    cy.findByRole('heading', { name: /Activity Overview/i }).should('exist');
  });

  it('should display the default activity overview', () => {
    activityPage.checkDate('Start date');
    activityPage.checkDate('End date');

    activityPage.checkTinyMCE('activity-short-overview-field', '');
    activityPage.checkTinyMCE('activity-description-field', '');
    activityPage.checkTinyMCE('activity-alternatives-field', '');
    activityPage.checkTinyMCE('standards-and-conditions-supports-field', '');
    activityPage.checkTextField('ds-c-field visibility--screen', '');
  });
};

export const testDefaultActivityOverviewExportView = () => {};

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
      cy.get('@apdUrl').then(url => {
        cy.goToActivityOverview(url, 0);
        cy.findByRole('heading', {
          name: /Activity Overview/i,
          level: 3
        }).should('exist');
      });
    });
    it('Fills in fields on first activity', () => {
      const overview = activityOverview.activityOverview[0];

      populatePage.fillActivityOverview(
        overview.shortOverview,
        overview.startDate,
        overview.endDate,
        overview.detailedDescription,
        overview.supportingJustificaions
      );

      cy.setTinyMceContent(
        'standards-and-conditions-supports-field',
        overview.supportsMedicaid
      );

      cy.waitForSave();
    });
  });

  describe('Activity 2', () => {
    beforeEach(() => {
      cy.get('@apdUrl').then(url => {
        cy.goToActivityOverview(url, 1);
        cy.findByRole('heading', {
          name: /Activity Overview/i,
          level: 3
        }).should('exist');
      });
    });
    it('Fills in fields on second activity', () => {
      const overview = activityOverview.activityOverview[1];
      populatePage.fillActivityOverview(
        overview.shortOverview,
        overview.startDate,
        overview.endDate,
        overview.detailedDescription,
        overview.supportingJustificaions
      );

      cy.get('[class="ds-c-field visibility--screen"]').type(
        overview.supportsMedicaid
      );

      cy.waitForSave();
    });
  });
};

export const testActivityOverviewExportViewWithData = () => {};
