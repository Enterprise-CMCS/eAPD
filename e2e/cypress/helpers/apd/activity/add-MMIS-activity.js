/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

const { _ } = Cypress;

export const addMMISActivity = function () {
  const fillDate = (string, list) => {
    cy.findAllByText(string)
      .parent()
      .next()
      .within(() => {
        cy.findByLabelText('Month').clear().type(list[0]);
        cy.findByLabelText('Day').clear().type(list[1]);
        cy.findByLabelText('Year').clear().type(list[2]).blur();
      });
  };

  beforeEach(function () {
    cy.fixture('mmis-with-data.json').as('mmisData');
  });

  describe('Add a MMIS Activity', function () {
    it('Adds an MMIS Activity and checks the export view', function () {
      const mmisData = this.mmisData;
      const activityData = mmisData.activities;

      activityData.forEach((activity, index) => {
        cy.goToActivityDashboard();

        cy.contains('Add Activity').click();
        cy.get('#activities').findAllByText('Edit').eq(index).click();

        // Activity Overview
        const activityOverviewData = activity.activityOverview;
        cy.findByLabelText('Activity name').type(activity.name);
        cy.setTinyMceContent(
          'activity-snapshot-field',
          activityOverviewData.activitySnapshot
        );
        cy.setTinyMceContent(
          'activity-problem-statement-field',
          activityOverviewData.problemStatement
        );
        cy.setTinyMceContent(
          'activity-proposed-solution-field',
          activityOverviewData.proposedSolution
        );
        cy.waitForSave();

        cy.get('#continue-button').click();

        // Analysis of Alternatives and Risk
        const analysisOfAlternativesAndRisksData =
          activity.analysisOfAlternativesAndRisks;
        cy.setTinyMceContent(
          'alternative-analysis-field',
          analysisOfAlternativesAndRisksData.alternativeAnalysis
        );
        cy.setTinyMceContent(
          'cost-benefit-analysis-field',
          analysisOfAlternativesAndRisksData.costBenefitAnalysis
        );
        cy.setTinyMceContent(
          'feasibility-study-field',
          analysisOfAlternativesAndRisksData.feasibilityStudy
        );
        cy.setTinyMceContent(
          'requirements-analysis-field',
          analysisOfAlternativesAndRisksData.requirementsAnalysis
        );
        cy.setTinyMceContent(
          'forseeable-risks-field',
          analysisOfAlternativesAndRisksData.forseeableRisks
        );
        cy.waitForSave();

        cy.get('#continue-button').click();

        // Activity Schedule and Milestones
        const activityScheduleData = activity.activitySchedule;

        const startDate = activityScheduleData.plannedStartDate;
        fillDate('Start date', startDate.split('-'));

        const endDate = activityScheduleData.plannedEndDate;
        fillDate('End date', endDate.split('-'));

        const milestonesData = activity.milestones;
        milestonesData.forEach(milestone => {
          cy.contains('Add Milestone').click();

          cy.findByLabelText('Name').type(milestone.milestone);
          fillDate('Target completion date', milestone.endDate.split('-'));
          cy.findByRole('button', { name: /Save/i }).click();
          cy.waitForSave();
        });

        cy.get('#continue-button').click();

        // Conditions for Enhanced Funding
        const conditionForEnhancedFundingData =
          activity.conditionsForEnhancedFunding;
        if (conditionForEnhancedFundingData.enhancedFundingQualification) {
          cy.findByRole('radio', {
            name: /Yes, this activity is qualified for enhanced funding./i
          }).click();
          cy.setTinyMceContent(
            'justification-field',
            conditionForEnhancedFundingData.enhancedFundingJustification
          );
        } else {
          cy.findByRole('radio', {
            name: /No, not applicable for enhanced funding, this activity has a 50\/50 federal state split./i
          }).click();
        }

        // cy.waitForSave();
        cy.get('#continue-button').click();

        // Outcomes and Metrics
        const outcomesAndMetricsData = activity.outcomes;
        outcomesAndMetricsData.forEach((outcome, index) => {
          cy.findByRole('button', { name: /Add Outcome/i }).click();
          cy.get(`[data-cy="outcome-${index}"]`).type(outcome.outcome);
          if (outcome.metrics.length > 0) {
            outcome.metrics.forEach((metric, index2) => {
              cy.findByRole('button', {
                name: /Add Metric to Outcome/i
              }).click();
              cy.get(`[data-cy="metric-${index}-${index2}"]`).type(
                metric.metric
              );
            });
            cy.findByRole('button', { name: /Save/i }).click();
            cy.waitForSave();
          }
        });

        cy.get('#continue-button').click();

        // State Staff and Expenses
        const statePersonnelData = activity.statePersonnel;
        statePersonnelData.forEach(statePersonnel => {
          cy.findByRole('button', { name: /Add State Staff/i }).click();

          cy.findByLabelText('Personnel title').type(statePersonnel.title);
          cy.findByLabelText('Description').type(statePersonnel.description);

          mmisData.years.forEach((year, index) => {
            if (statePersonnel.years[year]) {
              cy.findAllByLabelText('Cost with benefits')
                .eq(index)
                .type(statePersonnel.years[year].amt);
              cy.findAllByLabelText('Number of FTEs')
                .eq(index)
                .type(statePersonnel.years[year].perc)
                .blur();
            }
          });

          cy.findByRole('button', { name: /Save/i }).click();
        });

        const stateExpenseData = activity.expenses;
        stateExpenseData.forEach(expense => {
          cy.findByRole('button', { name: /Add State Expense/i }).click();

          cy.findByLabelText('Category').select(expense.category);
          cy.findByLabelText('Description').type(expense.description);

          mmisData.years.forEach(year => {
            cy.findByLabelText(`FFY ${year} Cost`).type(expense.years[year]);
          });

          cy.findByRole('button', { name: /Save/i }).click();
        });

        cy.get('#continue-button').click();

        // Private Contractor
        const contractorData = activity.contractorResources;
        contractorData.forEach((contractor, index) => {
          cy.findByRole('button', { name: /Add Contractor/i }).click();

          cy.get('[name="name"]').type(contractor.name);
          cy.setTinyMceContent(
            `contractor-description-field-${index}`,
            contractor.description
          );

          fillDate('Contract start date', contractor.start.split('-'));
          fillDate('Contract end date', contractor.end.split('-'));

          cy.get('[name="totalCost"]').type(contractor.totalCost);

          if (contractor.useHourly) {
            cy.findByRole('radio', { name: /Yes/i }).click();
            mmisData.years.forEach(year => {
              cy.get(`[name="hourly[${year}].hours"]`).type(
                contractor.hourly[year].hours
              );
              cy.get(`[name="hourly.${year}.rate"]`)
                .type(contractor.hourly[year].rate)
                .blur();
            });
          } else {
            cy.findByRole('radio', { name: /No/i }).click();
            mmisData.years.forEach(year => {
              cy.get(`[name="years.${year}"]`)
                .type(contractor.years[year])
                .blur();
            });
          }

          cy.findByRole('button', { name: /Save/i }).click();
        });

        cy.get('#continue-button').click();

        // Cost Allocation and Other Funding
        const costAllocationNarrativeData = activity.costAllocationNarrative;
        const costAllocationData = activity.costAllocation;

        cy.setTinyMceContent(
          'cost-allocation-methodology-field',
          costAllocationNarrativeData.methodology
        );

        mmisData.years.forEach(year => {
          if (costAllocationData[year]) {
            cy.setTinyMceContent(
              `cost-allocation-narrative-${year}-other-sources-field`,
              costAllocationNarrativeData.years[year].otherSources
            );
            cy.get(`[name="costAllocation.${year}.other"]`).type(
              costAllocationData[year].other
            );
          }
        });

        cy.get('#continue-button').click();

        // Budget and FFP
        mmisData.years.forEach((year, index) => {
          if (costAllocationData[year].ffp.federal === 90) {
            cy.findAllByText(
              '90/10 Design, Development, and Installation (DDI)'
            )
              .eq(index)
              .click();
          } else if (costAllocationData[year].ffp.federal === 75) {
            cy.findAllByRole('radio', { name: /75\/25/ })
              .eq(index)
              .click();

            cy.findAllByRole('radio', { name: /75\/25/ })
              .eq(index)
              .parent()
              .parent()
              .within(() => {
                cy.findAllByRole('radio', {
                  name: costAllocationData[year].ffp.fundingCategory
                }).click();
              });
          } else if (costAllocationData[year].ffp.federal === 50) {
            cy.findAllByRole('radio', { name: /50\/50/ })
              .eq(index)
              .click();

            cy.findAllByRole('radio', { name: /50\/50/ })
              .eq(index)
              .parent()
              .parent()
              .within(() => {
                cy.findAllByRole('radio', {
                  name: costAllocationData[year].ffp.fundingCategory
                }).click();
              });
          }
        });
        cy.waitForSave();
      });
    });
  });
};
