import ExportPage from '../../../page-objects/export-page';

const activities = [['Program Administration', 'HIT']];

export const testDefaultActivityDashboard = years => {
  it('tests default values in an activity', () => {
    cy.goToActivityDashboard();

    cy.url().should('include', '/activities');
    cy.findByRole('heading', { name: /Activities/i, level: 2 }).should('exist');

    cy.contains('Activity 1: Program Administration (HIT)').should('exist');
    cy.contains('Activity 2').should('not.exist');

    cy.contains('Delete').should('not.exist');

    cy.get('#activities')
      .contains('Edit')
      .should('exist')
      .contains('Edit')
      .click();

    cy.url().should('contain', '/activity/0/overview');

    cy.waitForSave();
  });

  it('checks default activity export view', () => {
    const exportPage = new ExportPage();

    cy.goToExportView();

    exportPage.checkExecutiveSummary({
      activities,
      years,
      dateRange: 'Date not specified - Date not specified',
      totalCost: 0,
      medicaidCost: 0,
      federalShare: 0
    });

    exportPage.checkActivityList(activities);

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testActivityDashboardWithData = () => {
  let activityOverview;

  beforeEach(() => {
    cy.fixture('activity-overview-template.json').then(data => {
      activityOverview = data;
    });
    cy.goToActivityDashboard();
  });

  it('tests naming an activity', () => {
    cy.url().should('include', '/activities');
    cy.findByRole('heading', { name: /Activities/i, level: 2 }).should('exist');

    cy.contains('Add Activity').click();
    cy.contains('Activity 2: Untitled').should('exist');
    cy.get('#activities').findAllByText('Edit').eq(1).click();

    cy.findByLabelText('Activity name').type(activityOverview.newActivityName);
    cy.findByRole('radio', { name: /HIE/i }).check({ force: true });
    activities.push([activityOverview.newActivityName, 'HIE']);

    cy.findAllByText(`Activity 2: ${activityOverview.newActivityName}`).should(
      'exist'
    );
    cy.waitForSave();

    cy.goToActivityDashboard();
  });

  it('should show the correct values on the export view', () => {
    const exportPage = new ExportPage();

    cy.goToExportView();

    exportPage.checkActivityList(activities);

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
