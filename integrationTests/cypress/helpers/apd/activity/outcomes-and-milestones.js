import ActivityPage from '../../../page-objects/activity-page';
import PopulatePage from '../../../page-objects/populate-page';

export const testDefaultOutcomesAndMilestones = () => {
  it('should display the default activity overview', () => {
    cy.goToOutcomesAndMilestones(0);
    cy.findByRole('heading', {
      name: /Outcomes and Metrics/i,
      level: 3
    }).should('exist');

    cy.contains('Outcomes have not been added for this activity.').should(
      'exist'
    );
    cy.contains('Milestones have not been added for this activity.').should(
      'exist'
    );
  });

  // TODO: export view tests
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
        cy.findByRole('button', { name: /Add Outcome/i }).click();
        cy.waitForSave();

        populatePage.fillOutcomeForm(
          outcomes.names[i],
          outcomes.metrics[i][0],
          outcomes.metrics[i][1]
        );

        activityPage.checkOutcomeOutput(
          outcomes.names[i],
          outcomes.metrics[i][0],
          outcomes.metrics[i][1]
        );
      });

      cy.contains('Delete').click();
      cy.contains('Delete Outcome and Metrics?').should('exist');
      cy.get('[class="ds-c-button ds-c-button--danger"]').click();
      cy.waitForSave();
      cy.contains(outcomes.names[0]).should('not.exist');
      cy.contains(`Outcome: ${outcomes.names[1]}`).should('exist');

      cy.log('fills out milestones in activity 1');
      cy.goToOutcomesAndMilestones(0);

      const milestones = activityData.milestones[0];
      Cypress._.times(2, i => {
        cy.findByRole('button', { name: /Add Milestone/i }).click();
        cy.waitForSave();

        populatePage.fillMilestoneForm(
          milestones.names[i],
          milestones.dates[i]
        );
        cy.waitForSave();

        activityPage.checkMilestoneOutput(
          `${i + 1}. ${milestones.names[i]}`,
          `${milestones.dates[i][0]}/${milestones.dates[i][1]}/${milestones.dates[i][2]}`
        );
      });

      cy.findAllByText('Delete').eq(1).click();
      cy.contains('Delete Milestone?').should('exist');
      cy.get('[class="ds-c-button ds-c-button--danger"]').click();
      cy.waitForSave();
      cy.contains('Delete Milestone?').should('not.exist');
      cy.contains(milestones.names[0]).should('not.exist');
      cy.contains(`1. ${milestones.names[1]}`).should('exist');
    });

    // TODO: export view tests
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
      cy.findByRole('heading', { name: /Outcomes and Metrics/i }).should(
        'exist'
      );

      const outcomes = activityData.outcomes[1];
      const milestones = activityData.milestones[1];

      Cypress._.times(2, i => {
        cy.findByRole('button', { name: /Add Outcome/i }).click();
        populatePage.fillOutcomeForm(
          outcomes.names[i],
          outcomes.metrics[i][0],
          outcomes.metrics[i][1]
        );
        cy.waitForSave();

        cy.findByRole('button', { name: /Add Milestone/i }).click();
        populatePage.fillMilestoneForm(
          milestones.names[i],
          milestones.dates[i]
        );
        cy.waitForSave();
      });
    });

    // TODO: export view tests
  });
};
