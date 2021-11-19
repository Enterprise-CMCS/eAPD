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

export const testDefaultActivityOverviewExportView = () => {
  beforeEach(() => {
    cy.findByRole('heading', { level: 3, name: 'Activity Overview' }).should(
      'exist'
    );
  });

  it('should display the default activity overview', () => {
    cy.findByRole('heading', {
      name: /Statement of Alternative Considerations and Supporting Justification/i
    })
      .next()
      .should('have.text', '');
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

      populatePage.fillActivityOverview(
        overview.shortOverview,
        overview.startDate,
        overview.endDate,
        overview.detailedDescription,
        overview.supportingJustificaions
      );
      cy.waitForSave();

      cy.setTinyMceContent(
        'standards-and-conditions-supports-field',
        overview.supportsMedicaid
      );
      cy.waitForSave();
    });

    // TODO: export view tests
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
      populatePage.fillActivityOverview(
        overview.shortOverview,
        overview.startDate,
        overview.endDate,
        overview.detailedDescription,
        overview.supportingJustificaions
      );
      cy.waitForSave();

      cy.get('[class="ds-c-field visibility--screen"]').type(
        overview.supportsMedicaid
      );
      cy.waitForSave();
    });

    // TODO: export view tests
  });
};
