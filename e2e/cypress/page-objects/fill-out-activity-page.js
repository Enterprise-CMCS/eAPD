import PopulatePage from './populate-page';
import StaffExpensesPage from './activities-state-staff-expenses-page';

const { _ } = Cypress;

const populatePage = new PopulatePage();
const staffExpensesPage = new StaffExpensesPage();

class FillOutActivityPage {
  // Activity Overview
  fillActivityOverview = (overviewData = {}) => {
    populatePage.fillDate('Start date', overviewData.startDate);
    populatePage.fillDate('End date', overviewData.endDate);

    cy.setTinyMceContent(
      'activity-short-overview-field',
      overviewData.shortOverview
    );
    cy.setTinyMceContent(
      'activity-description-field',
      overviewData.detailedDescription
    );
    cy.setTinyMceContent(
      'activity-alternatives-field',
      overviewData.supportingJustifications
    );
    cy.setTinyMceContent(
      'standards-and-conditions-supports-field',
      overviewData.supportsMedicaid
    );
  };

  fillOutcomesAndMilestones = (outcomes, milestones) => {
    cy.findByRole('heading', {
      name: /Outcomes and Metrics/i,
      level: 3
    }).should('exist');

    _.forEach(outcomes.names, (name, i) => {
      populatePage.fillOutcomeForm({
        outcome: outcomes.names[i],
        metrics: outcomes.metrics[i]
      });
    });

    _.forEach(milestones.names, (name, i) => {
      cy.findByRole('button', { name: /Add Milestone/i }).click();
      populatePage.fillMilestoneForm({
        milestone: milestones.names[i],
        targetDate: milestones.dates[i]
      });
    });
  };

  fillStateStaff = (years, staffList) => {
    cy.findByRole('heading', {
      name: /State Staff and Expenses/i,
      level: 3
    }).should('exist');

    for (let i = 0; i < staffList.length; i++) {
      staffExpensesPage.addStaff();
      staffExpensesPage.fillStaff({
        years,
        staffIndex: i,
        title: staffList[i].title,
        description: staffList[i].description,
        costs: staffList[i].costs,
        ftes: staffList[i].ftes
      });
      staffExpensesPage.verifyStaff(
        i,
        staffList[i].title,
        staffList[i].description,
        staffList[i].costs,
        staffList[i].ftes
      );
    }
  };

  fillStateExpenses = (years, expenseList) => {
    cy.findByRole('heading', {
      name: /State Staff and Expenses/i,
      level: 3
    }).should('exist');

    for (let i = 0; i < expenseList.length; i++) {
      staffExpensesPage.addExpense();
      staffExpensesPage.fillExpense({
        years,
        expenseIndex: i,
        category: expenseList[i].category,
        costs: expenseList[i].costs,
        desc: expenseList[i].description
      });
      staffExpensesPage.verifyExpense(
        i,
        expenseList[i].category,
        expenseList[i].costs,
        expenseList[i].description
      );
    }
  };

  addPrivateContractors = (contractorList, years) => {
    cy.findByRole('heading', {
      name: /Private Contractor Costs/i,
      level: 3
    }).should('exist');

    // Can't use break; in a forEach loop.
    for (let i = 0; i < contractorList.length; i++) {
      cy.findByRole('button', { name: /Add Contractor/i }).click();

      this.fillPrivateContactor(contractorList[i], i, years);

      cy.findByRole('button', { name: /Save/i }).click();
    }
  };

  fillPrivateContactor = (contractor, i, years) => {
    cy.get('input[name="name"]').clear().type(contractor.name);

    populatePage.fillDate('Contract start date', contractor.start);
    populatePage.fillDate('Contract end date', contractor.end);

    cy.get('input[name="totalCost"]').clear().type(contractor.totalCosts);

    if (contractor.hourly) {
      cy.get('[type="radio"].ds-c-choice').eq(0).check({ force: true });
      // years is empty for some reason
      _.forEach(years, (year, index) => {
        populatePage.fillTextField(
          'ds-c-field ds-c-field--medium',
          contractor.FFYcosts[index][0],
          index
        );

        populatePage.fillTextField(
          'ds-c-field ds-c-field--medium ds-c-field--currency',
          contractor.FFYcosts[index][1],
          index + 1
        );
      });
    } else {
      cy.get('[type="radio"].ds-c-choice').eq(1).check({ force: true });
      _.forEach(years, (year, index) => {
        populatePage.fillTextField(
          'ds-c-field ds-c-field--medium ds-c-field--currency',
          contractor.FFYcosts[index],
          index + 1
        );
      });
    }

    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.setTinyMceContent(
      `contractor-description-field-${i}`,
      contractor.description
    );

    // adding this line so that everything is validated again after it's added
    cy.get('input[name="name"]').focus().blur();
  };

  fillCostAllocation = (allocation, years = {}) => {
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.setTinyMceContent(
      'cost-allocation-methodology-field',
      allocation.description
    );

    _.forEach(years, (year, i) => {
      cy.setTinyMceContent(
        `cost-allocation-narrative-${year}-other-sources-field`,
        allocation.FFYdescriptions[i]
      );
      populatePage.fillTextField(
        'ds-c-field ds-c-field--currency',
        allocation.costs[i],
        i
      );
    });
  };

  checkBudgetAndFFPTables = ({
    budgetData = {},
    years = {},
    firstSplit = '0-100',
    secondSplit = '0-100',
    isViewOnly = false,
    isDefaultTest = false
  }) => {
    _.forEach(years, (year, ffyIndex) => {
      cy.get('[data-cy="FFPActivityTable"]')
        .eq(ffyIndex)
        .then(table => {
          cy.get(table)
            .getActivityTable()
            .then(tableData => {
              _.forEach(budgetData.activityBudgetTable[ffyIndex], data => {
                expect(tableData).to.deep.include(data);
              });
            });
        });

      if (!isViewOnly) {
        cy.get('[data-cy="FFPActivityTotalCostTable"]')
          .eq(ffyIndex)
          .then(table => {
            cy.get(table)
              .getActivityTable()
              .then(tableData => {
                _.forEach(budgetData.activityTotalCostTable[ffyIndex], data => {
                  expect(tableData).to.deep.include(data);
                });
              });
          });

        if (ffyIndex === 0) {
          cy.get('select.ds-c-field').eq(ffyIndex).select(firstSplit);
        } else {
          cy.get('select.ds-c-field').eq(ffyIndex).select(secondSplit);
        }

        cy.get('[data-cy="FFPFedStateSplitTable"]')
          .eq(ffyIndex)
          .then(table => {
            cy.get(table)
              .getActivityTable()
              .then(tableData => {
                _.forEach(budgetData.activityFedSplitTable[ffyIndex], data => {
                  expect(tableData).to.deep.include(data);
                });
              });
          });
      } else {
        cy.get('[data-cy="FFPActivityTotalCostTable"]')
          .eq(ffyIndex)
          .then(table => {
            cy.get(table)
              .getActivityTable()
              .then(tableData => {
                _.forEach(
                  budgetData.activityTotalCostTableExportView[ffyIndex],
                  data => {
                    expect(tableData).to.deep.include(data);
                  }
                );
              });
          });
      }

      cy.get('[data-cy="FFPQuarterBudgetTable"]')
        .eq(ffyIndex)
        .then(table => {
          if (!isViewOnly && !isDefaultTest) {
            cy.get(table).within(() => {
              cy.get('input').then(inputFields => {
                _.forEach(inputFields, (elem, i) => {
                  cy.get(elem)
                    .clear()
                    .type(budgetData.quarterVals[ffyIndex][i]);
                });
              });
            });
          }
          cy.get(table)
            .getActivityTable()
            .then(tableData => {
              _.forEach(
                budgetData.activityEstQuarterlyExpenditure[ffyIndex],
                data => {
                  expect(tableData).to.deep.include(data);
                }
              );
            });
        });
    });
  };
}
export default FillOutActivityPage;
