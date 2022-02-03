import ActivityPage from '../../../page-objects/activity-page';
import PopulatePage from '../../../page-objects/populate-page';
import ExportPage from '../../../page-objects/export-page';

export const testDefaultOutcomesAndMilestones = () => {
  it('should display the default activity overview', () => {
    cy.goToOutcomesAndMilestones(0);
    cy.findByRole('heading', {
      name: /Outcomes and Metrics/i,
      level: 3
    }).should('exist');

    cy.contains('Add at least one outcome for this activity.').should('exist');
    cy.contains('Add milestone(s) for this activity.').should('exist');

    cy.waitForSave();
  });

  it('should display the default activity overview in the export view', () => {
    const exportPage = new ExportPage();

    cy.goToExportView();

    exportPage.checkOutcomes({
      activityHeader: 'Activity 1: Program Administration'
    });
    exportPage.checkMilestones({
      activityHeader: 'Activity 1: Program Administration'
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testOutcomesAndMilestonesWithData = () => {
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
      cy.goToOutcomesAndMilestones(0);
    });

    it('fills out outcomes and milestones in activity 1', () => {
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', {
        name: /Outcomes and Metrics/i,
        level: 3
      }).should('exist');

      const outcomes = activityData.outcomes[0];

      Cypress._.times(2, i => {
        populatePage.fillOutcomeForm({
          outcome: outcomes.names[i],
          metrics: outcomes.metrics[i]
        });

        activityPage.checkOutcomeOutput({
          outcome: outcomes.names[i],
          metrics: outcomes.metrics[i]
        });
      });

      cy.contains('Delete').click();
      cy.contains('Delete Outcome and Metrics?').should('exist');
      cy.get('[class="ds-c-button ds-c-button--danger"]').click();

      cy.contains(outcomes.names[0]).should('not.exist');
      cy.contains(`Outcome: ${outcomes.names[1]}`).should('exist');

      cy.goToOutcomesAndMilestones(0);

      const milestones = activityData.milestones[0];
      Cypress._.times(2, i => {
        cy.findByRole('button', { name: /Add Milestone/i }).click();

        populatePage.fillMilestoneForm({
          milestone: milestones.names[i],
          targetDate: milestones.dates[i]
        });

        activityPage.checkMilestoneOutput({
          milestone: `${i + 1}. ${milestones.names[i]}`,
          targetDate: milestones.dates[i].join('/')
        });
      });

      cy.findAllByText('Delete').eq(1).click();
      cy.contains('Delete Milestone?').should('exist');
      cy.get('[class="ds-c-button ds-c-button--danger"]').click();

      cy.contains('Delete Milestone?').should('not.exist');
      cy.contains(milestones.names[0]).should('not.exist');
      cy.contains(`1. ${milestones.names[1]}`).should('exist');

      cy.waitForSave();
    });

    it('should display the default activity overview in the export view', () => {
      const exportPage = new ExportPage();
      cy.goToExportView();

      const { name } = activityData.activityOverview[0];
      const outcomes = activityData.outcomes[0];
      const milestones = activityData.milestones[0];

      exportPage.checkOutcomes({
        activityHeader: `Activity 1: ${name}`,
        outcome: outcomes.names[1],
        metrics: outcomes.metrics[1]
      });

      exportPage.checkMilestones({
        activityHeader: `Activity 1: ${name}`,
        milestone: milestones.names[1],
        milestoneCompletionDate: milestones.dates[1].join('/')
      });

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
  });

  describe('Activity 2', () => {
    beforeEach(() => {
      cy.goToOutcomesAndMilestones(1);
    });

    it('fills out outcomes and milestones in activity 2', () => {
      cy.findByRole('heading', {
        name: /^Activity 2:/i,
        level: 2
      }).should('exist');

      const outcomes = activityData.outcomes[1];
      const milestones = activityData.milestones[1];

      Cypress._.times(2, i => {
        populatePage.fillOutcomeForm({
          outcome: outcomes.names[i],
          metrics: outcomes.metrics[i]
        });

        cy.findByRole('button', { name: /Add Milestone/i }).click();
        populatePage.fillMilestoneForm({
          milestone: milestones.names[i],
          targetDate: milestones.dates[i]
        });
      });

      cy.waitForSave();
    });

    it('should display the default activity overview in the export view', () => {
      const exportPage = new ExportPage();
      cy.goToExportView();

      const { name } = activityData.activityOverview[1];
      const outcomes = activityData.outcomes[1];
      const milestones = activityData.milestones[1];

      Cypress._.times(2, i => {
        exportPage.checkOutcomes({
          activityHeader: `Activity 2: ${name}`,
          outcome: outcomes.names[i],
          metrics: outcomes.metrics[i]
        });

        exportPage.checkMilestones({
          activityHeader: `Activity 2: ${name}`,
          milestone: milestones.names[i],
          milestoneCompletionDate: milestones.dates[i].join('/')
        });
      });

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
  });
};
