import ActivityPage from '../../../page-objects/activity-page';
import PopulatePage from '../../../page-objects/populate-page';

export const testDefaultOutcomesAndMilestones = () => {
  let activityPage;

  before(() => {
    activityPage = new ActivityPage();
  });

  beforeEach(() => {
    cy.goToOutcomesAndMilestones(0);
    cy.findByRole('heading', {
      name: /Outcomes and Metrics/i,
      level: 3
    }).should('exist');
  });

  it('should display the default activity overview', () => {
    cy.contains('Outcomes have not been added for this activity.').should(
      'exist'
    );
    cy.contains('Milestones have not been added for this activity.').should(
      'exist'
    );

    cy.findByRole('button', { name: /Add Outcome/i }).click();
    cy.waitForSave();

    activityPage.checkTextField('ds-c-field', '', 0); // Outcome
    activityPage.checkTextField('ds-c-field', '', 1); // Metric

    cy.findByRole('button', { name: /Done/i }).click();

    activityPage.checkOutcomeOutput(
      'Outcome not specified',
      'Metric not specified'
    );

    cy.contains('Edit').click();
    activityPage.checkMetricFunctionality();
    cy.waitForSave();

    activityPage.checkDeleteButton(
      'Outcomes have not been added for this activity.',
      'Delete Outcome and Metrics?',
      'Outcome not specified'
    );
    cy.waitForSave();

    cy.findByRole('button', { name: /Add Milestone/i }).click();
    cy.wait(300); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.waitForSave();
    activityPage.checkInputField('Name', '');
    activityPage.checkDate('Target completion date');
    cy.findByRole('button', { name: /Done/i }).click();

    activityPage.checkMilestoneOutput(
      'Milestone not specified',
      'Date not specified'
    );

    activityPage.checkDeleteButton(
      'Milestones have not been added for this activity.',
      'Delete Milestone?',
      'Milestone not specified'
    );

    cy.findByRole('button', { name: /Add Milestone/i }).click();
    cy.wait(300); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.waitForSave();
    cy.findByRole('button', { name: /Done/i }).click();
  });
};

export const testDefaultOutcomesAndMilestonesExportView = () => {};

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
      cy.get('@apdUrl').then(url => {
        cy.goToOutcomesAndMilestones(url, 0);
        cy.findByRole('heading', {
          name: /Outcomes and Metrics/i,
          level: 3
        }).should('exist');
      });
    });
    it('fills out outcomes in activity 1', () => {
      const outcomes = activityData.outcomes[0];
      for (let i = 0; i < 2; i += 1) {
        if (i === 0) {
          cy.findByRole('button', { name: /Add Outcome/i }).click();
          cy.waitForSave();
        } else {
          cy.findByRole('button', { name: /Add Outcome/i }).click();
          cy.waitForSave();
          cy.findByRole('button', { name: /Done/i }).click();
          cy.findAllByText('Edit').eq(1).click();
        }

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
      }

      cy.contains('Edit').click();
      cy.contains('Delete').click();
      cy.contains('Delete Metric?').should('exist');
      cy.get('[class="ds-c-button ds-c-button--danger"]').click();
      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.waitForSave();
      cy.findByRole('button', { name: /Done/i }).click();
      cy.contains('Delete Metric?').should('not.exist');
      cy.contains(outcomes.metrics[0][0]).should('not.exist');
      cy.contains(`1. ${outcomes.metrics[0][1]}`).should('exist');

      cy.contains('Delete').click();
      cy.contains('Delete Outcome and Metrics?').should('exist');
      cy.get('[class="ds-c-button ds-c-button--danger"]').click();
      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.waitForSave();
      cy.contains(outcomes.names[0]).should('not.exist');
      cy.contains(`Outcome: ${outcomes.names[1]}`).should('exist');
    });

    it('fills out milestones in activity 1', () => {
      cy.get('@apdUrl').then(url => {
        cy.goToOutcomesAndMilestones(url, 0);
      });

      const milestones = activityData.milestones[0];
      for (let i = 0; i < 2; i += 1) {
        if (i === 0) {
          cy.findByRole('button', { name: /Add Milestone/i }).click();
          cy.waitForSave();
        } else {
          cy.findByRole('button', { name: /Add Milestone/i }).click();
          cy.waitForSave();
          cy.findByRole('button', { name: /Done/i }).click();
          cy.findAllByText('Edit').eq(2).click();
        }

        populatePage.fillMilestoneForm(
          milestones.names[i],
          milestones.dates[i]
        );

        activityPage.checkMilestoneOutput(
          `${i + 1}. ${milestones.names[i]}`,
          `${milestones.dates[i][0]}/${milestones.dates[i][1]}/${milestones.dates[i][2]}`
        );
      }

      cy.findAllByText('Delete').eq(1).click();
      cy.contains('Delete Milestone?').should('exist');
      cy.get('[class="ds-c-button ds-c-button--danger"]').click();
      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.waitForSave();
      cy.contains('Delete Milestone?').should('not.exist');
      cy.contains(milestones.names[0]).should('not.exist');
      cy.contains(`1. ${milestones.names[1]}`).should('exist');
    });
  });

  describe('Activity 2', () => {
    beforeEach(() => {
      cy.get('@apdUrl').then(url => {
        cy.goToOutcomesAndMilestones(url, 1);
        cy.findByRole('heading', { name: /Outcomes and Metrics/i }).should(
          'exist'
        );
      });
    });
    it('fills out outcomes and milestones in activity 2', () => {
      const outcomes = activityData.outcomes[1];
      const milestones = activityData.milestones[1];

      for (let i = 0; i < 2; i += 1) {
        cy.findByRole('button', { name: /Add Outcome/i }).click();
        populatePage.fillOutcomeForm(
          outcomes.names[i],
          outcomes.metrics[i][0],
          outcomes.metrics[i][1]
        );

        cy.findByRole('button', { name: /Add Milestone/i }).click();
        populatePage.fillMilestoneForm(
          milestones.names[i],
          milestones.dates[i]
        );
      }
    });
  });
};

export const testOutcomesAndMilestonesExportViewWithData = () => {};
