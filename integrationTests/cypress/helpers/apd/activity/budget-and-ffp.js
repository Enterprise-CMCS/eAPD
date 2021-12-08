import BudgetPage from '../../../page-objects/budget-page';
import PopulatePage from '../../../page-objects/populate-page';
import ExportPage from '../../../page-objects/export-page';

const activities = [['Program Administration', 'HIT']];
const splits = ['75-25', '50-50', '90-10'];

export const testDefaultBudgetAndFFP = years => {
  let budgetPage;

  before(() => {
    budgetPage = new BudgetPage();
  });

  it('should display the default Budget and FFP', () => {
    cy.goToBudgetAndFFP(0);
    cy.findByRole('heading', { name: /Budget and FFP/i, level: 2 }).should(
      'exist'
    );

    splits.forEach(split => {
      cy.get('[class="ds-c-field"]').eq(0).select(split);

      let federalShare = 0;
      let stateShare = 0;
      if (split === '90-10') {
        federalShare = 90;
        stateShare = 10;
      } else if (split === '75-25') {
        federalShare = 75;
        stateShare = 25;
      } else if (split === '50-50') {
        federalShare = 50;
        stateShare = 50;
      }

      budgetPage.checkCostSplitTable({
        federalShare,
        stateShare,
        totalMedicaidCost: 0
      });
    });

    cy.then(() => {
      years.forEach(year => {
        cy.contains(`Budget for FFY ${year}`)
          .parent()
          .parent()
          .within(() => {
            budgetPage.checkSubtotalTable({
              title: 'State Staff',
              costs: 0,
              otherFundingAmount: 0
            });
            budgetPage.checkSubtotalTable({
              title: 'Other State Expenses',
              costs: 0,
              otherFundingAmount: 0
            });
            budgetPage.checkSubtotalTable({
              title: 'Private Contractor',
              costs: 0,
              otherFundingAmount: 0
            });
            budgetPage.checkTotalComputableMedicaidCost({
              label: 'Activity 1 Total Computable Medicaid Cost',
              totalMedicaidCost: 0
            });

            budgetPage.checkActivityTotalCostTable({
              activityTotalCost: 0,
              otherFunding: 0,
              index: 1
            });

            budgetPage.checkCostSplitTable({
              federalShare: 90,
              stateShare: 10,
              totalMedicaidCost: 0
            });
            budgetPage.checkQuarterTable();
          });
      });
      budgetPage.checkFFYtotals({
        years,
        activityName: activities[0][0],
        totalCost: 0,
        otherFunding: 0,
        totalMedicaidCost: 0,
        fundingSplit: '90/10',
        federalShare: 0,
        state: 'Alaska',
        stateShare: 0
      });
    });

    cy.waitForSave();
  });

  it('should display the default activity overview in the export view', () => {
    const exportPage = new ExportPage();

    cy.goToExportView();

    years.forEach(year => {
      cy.contains(`Activity 1 Budget for FFY ${year}`)
        .next()
        .within(() => {
          budgetPage.checkSubtotalTable({
            title: 'State Staff',
            keyPersonnelAmount: 0,
            otherFundingAmount: 0
          });
          budgetPage.checkSubtotalTable({
            title: 'Other State Expenses',
            keyPersonnelAmount: 0,
            otherFundingAmount: 0
          });
          budgetPage.checkSubtotalTable({
            title: 'Private Contractor',
            keyPersonnelAmount: 0,
            otherFundingAmount: 0
          });
          budgetPage.checkTotalComputableMedicaidCost({
            label: 'Activity 1 Total Computable Medicaid Cost',
            totalMedicaidCost: 0
          });
        });
      exportPage.checkRowTotals({
        year,
        activityIndex: 0,
        activityTotalCost: 0,
        otherFunding: 0,
        totalMedicaidCost: 0,
        federalShare: 90,
        stateShare: 10
      });
      cy.contains('Estimated Quarterly Expenditure')
        .next()
        .within(() => {
          budgetPage.checkQuarterTable({ isExportView: true });
        });
    });
    budgetPage.checkFFYtotals({
      years,
      activityName: activities[0][0],
      totalCost: 0,
      otherFunding: 0,
      totalMedicaidCost: 0,
      fundingSplit: '90/10',
      federalShare: 0,
      state: 'Alaska',
      stateShare: 0
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testBudgetAndFFPWithData = years => {
  let populatePage;
  let budgetPage;

  let activityData;

  before(() => {
    populatePage = new PopulatePage();
    budgetPage = new BudgetPage();
  });

  beforeEach(() => {
    cy.fixture('activity-overview-template.json').then(data => {
      activityData = data;
    });
  });

  describe('Activity 1', () => {
    let totalActivityTotalCost = 0;
    let totalOtherFunding = 0;
    let totalTotalMedicaidCost = 0;
    let totalFederalShare = 0;
    let totalStateShare = 0;

    let staff;
    let expenses;
    let contractor;
    let allocation;
    let quarterValues;

    beforeEach(() => {
      cy.goToBudgetAndFFP(0);

      /* eslint-disable prefer-destructuring */
      staff = activityData.staff[1];
      expenses = activityData.expenses[1];
      contractor = activityData.privateContractors[1];
      allocation = activityData.costAllocation[0];
      quarterValues = activityData.quarterVals[0];
    });

    it('fills out Budget and FFP for activity 1', () => {
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', { name: /Budget and FFP/i, level: 2 }).should(
        'exist'
      );

      years.forEach((year, i) => {
        // Activity Costs
        const staffCosts = staff.costs[i] * staff.ftes[i];
        const activityTotalCost = budgetPage.computeFFYtotal(
          staffCosts,
          expenses.costs[i],
          contractor.FFYcosts[i]
        );
        totalActivityTotalCost += activityTotalCost;

        // Other Funding
        const otherFunding = allocation.costs[i];
        const staffOtherFunding = Math.round(
          otherFunding * (staffCosts / activityTotalCost)
        );
        const expensesOtherFunding = Math.round(
          otherFunding * (expenses.costs[i] / activityTotalCost)
        );
        const contractorOtherFunding = Math.round(
          otherFunding * (contractor.FFYcosts[i] / activityTotalCost)
        );
        totalOtherFunding += otherFunding;

        // Total Medicaid Cost
        const totalMedicaidCost = activityTotalCost - otherFunding;
        totalTotalMedicaidCost += totalMedicaidCost;

        cy.findAllByText(`Activity 1 Budget for FFY ${year}`)
          .parent()
          .parent()
          .within(() => {
            cy.get('[class="budget-table activity-budget-table"]')
              .eq(0)
              .within(() => {
                budgetPage.checkTableRow({
                  title: staff.title,
                  costs: staff.costs[i],
                  ftes: staff.ftes[i]
                });
                budgetPage.checkSubtotalTable({
                  title: 'State Staff',
                  costs: staffCosts,
                  otherFundingAmount: staffOtherFunding
                });

                budgetPage.checkTableRow({
                  title: expenses.category,
                  costs: expenses.costs[i]
                });
                budgetPage.checkSubtotalTable({
                  title: 'Other State Expenses',
                  costs: expenses.costs[i],
                  otherFundingAmount: expensesOtherFunding
                });

                budgetPage.checkTableRow({
                  title: contractor.name,
                  costs: contractor.FFYcosts[i]
                });
                budgetPage.checkSubtotalTable({
                  title: 'Private Contractor',
                  costs: contractor.FFYcosts[i],
                  otherFundingAmount: contractorOtherFunding
                });
                budgetPage.checkSubtotalRows({ year, activityIndex: 0 });

                budgetPage.checkTotalComputableMedicaidCost({
                  totalMedicaidCost,
                  label: 'Activity 1 Total Computable Medicaid Cost'
                });
              });

            budgetPage.checkActivityTotalCostTable({
              activityTotalCost,
              otherFunding,
              index: 1
            });

            // Federal Share, State Share
            const split = activityData.splitConstants[i];
            totalFederalShare += totalMedicaidCost * split.fed;
            totalStateShare += totalMedicaidCost * split.state;

            cy.get('[class="ds-c-field"]').eq(i).select(split.split);

            budgetPage.checkCostSplitTable({
              federalShare: split.fed * 100,
              stateShare: split.state * 100,
              totalMedicaidCost
            });

            // Quarter Table
            let staffPercentageSum = 0;
            let contractorPercentageSum = 0;

            const stateQuarterValues = quarterValues.stateVals[i];
            const contractorQuarterValues = quarterValues.contractorVals[i];

            for (let quarter = 0; quarter < 4; quarter += 1) {
              const stateValue = stateQuarterValues[quarter];
              const contractorValue = contractorQuarterValues[quarter];
              staffPercentageSum += stateValue;
              contractorPercentageSum += contractorValue;

              populatePage.fillQuarter({
                quarter,
                stateValue,
                contractorValue
              });
            }

            populatePage.checkPercentageSubtotal({
              staff: staffPercentageSum,
              contractor: contractorPercentageSum
            });

            // Total State Costs
            const stateTotal =
              (staffCosts +
                expenses.costs[i] -
                staffOtherFunding -
                expensesOtherFunding) *
              split.fed;
            // Total Contractor Costs
            const contractorTotal =
              (contractor.FFYcosts[i] - contractorOtherFunding) * split.fed;

            populatePage.checkQuarterSubtotal({
              stateTotal,
              contractorTotal,
              stateQuarterValues,
              contractorQuarterValues
            });

            budgetPage.checkEachQuarterSubtotal();
          });
      });

      budgetPage.checkFFYtotals({
        years,
        activityName: 'Program Administration',
        totalCost: totalActivityTotalCost,
        otherFunding: totalOtherFunding,
        totalMedicaidCost: totalTotalMedicaidCost,
        fundingSplit: `75/25 (FFY ${years[0]}) and 50/50 (FFY ${years[1]})`,
        federalShare: Math.round(totalFederalShare),
        state: 'Alaska',
        stateShare: Math.round(totalStateShare)
      });

      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.waitForSave();
    });

    it('should display the default activity overview in the export view', () => {
      const exportPage = new ExportPage();

      cy.goToExportView();

      years.forEach(year => {
        cy.contains(`Activity 1 Budget for FFY ${year}`)
          .next()
          .within(() => {
            budgetPage.checkSubtotalTable({
              title: 'State Staff',
              keyPersonnelAmount: 0,
              otherFundingAmount: 0
            });
            budgetPage.checkSubtotalTable({
              title: 'Other State Expenses',
              keyPersonnelAmount: 0,
              otherFundingAmount: 0
            });
            budgetPage.checkSubtotalTable({
              title: 'Private Contractor',
              keyPersonnelAmount: 0,
              otherFundingAmount: 0
            });
            budgetPage.checkTotalComputableMedicaidCost({
              label: 'Activity 1 Total Computable Medicaid Cost',
              totalMedicaidCost: 0
            });
          });
        exportPage.checkRowTotals({
          year,
          activityIndex: 0,
          activityTotalCost: 0,
          otherFunding: 0,
          totalMedicaidCost: 0,
          federalShare: 90,
          stateShare: 10
        });
        cy.contains('Estimated Quarterly Expenditure')
          .next()
          .within(() => {
            budgetPage.checkQuarterTable({ isExportView: true });
          });
      });
      budgetPage.checkFFYtotals({
        years,
        activityName: activities[0][0],
        totalCost: 0,
        otherFunding: 0,
        totalMedicaidCost: 0,
        fundingSplit: '90/10',
        federalShare: 0,
        state: 'Alaska',
        stateShare: 0
      });

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
  });

  describe('Activity 2', () => {
    beforeEach(() => {
      cy.goToBudgetAndFFP(1);
    });

    it('fills out Budget and FFP for activity 2', () => {
      cy.findByRole('heading', {
        name: /^Activity 2:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', { name: /Budget and FFP/i, level: 2 }).should(
        'exist'
      );

      const staff1 = activityData.staff[2];
      const staff2 = activityData.staff[3];
      const expenses1 = activityData.expenses[2];
      const expenses2 = activityData.expenses[3];
      const contractor1 = activityData.privateContractors[2];
      const contractor2 = activityData.privateContractors[3];
      const allocation = activityData.costAllocation[1];

      let totalActivityTotalCost = 0;
      let totalOtherFunding = 0;
      let totalTotalMedicaidCost = 0;
      let totalFederalShare = 0;
      let totalStateShare = 0;

      years.forEach((year, i) => {
        const otherFunding = allocation.costs[i];
        totalOtherFunding += otherFunding;

        const staffCosts =
          staff1.costs[i] * staff1.ftes[i] + staff2.costs[i] * staff2.ftes[i];
        const expensesCosts = expenses1.costs[i] + expenses2.costs[i];
        const contractorCosts =
          contractor1.FFYcosts[i] +
          contractor2.FFYcosts[i][0] * contractor2.FFYcosts[i][1];
        const activityTotalCost = staffCosts + expensesCosts + contractorCosts;
        totalActivityTotalCost += activityTotalCost;

        const totalMedicaidCost = activityTotalCost - otherFunding;
        totalTotalMedicaidCost += totalMedicaidCost;

        const staffOtherFunding = Math.round(
          otherFunding * (staffCosts / activityTotalCost)
        );
        const expensesOtherFunding = Math.round(
          otherFunding * (expensesCosts / activityTotalCost)
        );
        const contractorOtherFunding = Math.round(
          otherFunding * (contractorCosts / activityTotalCost)
        );

        const split = activityData.splitConstants[i + 1];
        totalFederalShare += totalMedicaidCost * split.fed;
        totalStateShare += totalMedicaidCost * split.state;

        cy.get('[class="ds-c-field"]').eq(i).select(split.split);

        cy.findAllByText(`Activity 2 Budget for FFY ${year}`)
          .parent()
          .parent()
          .within(() => {
            cy.get('[class="budget-table activity-budget-table"]')
              .eq(0)
              .within(() => {
                budgetPage.checkTableRow({
                  title: staff1.title,
                  costs: staff1.costs[i],
                  ftes: staff1.ftes[i]
                });
                budgetPage.checkTableRow({
                  title: staff2.title,
                  costs: staff2.costs[i],
                  ftes: staff2.ftes[i]
                });
                budgetPage.checkSubtotalTable({
                  title: 'State Staff',
                  costs: staffCosts,
                  otherFundingAmount: staffOtherFunding
                });

                budgetPage.checkTableRow({
                  title: expenses1.category,
                  costs: expenses1.costs[i]
                });
                budgetPage.checkTableRow({
                  title: expenses2.category,
                  costs: expenses2.costs[i]
                });
                budgetPage.checkSubtotalTable({
                  title: 'Other State Expenses',
                  costs: expensesCosts,
                  otherFundingAmount: expensesOtherFunding
                });

                budgetPage.checkTableRow({
                  title: contractor1.name,
                  costs: contractor1.FFYcosts[i]
                });

                budgetPage.checkTableRow({
                  title: contractor2.name,
                  costs: contractor2.FFYcosts[i][0] * contractor2.FFYcosts[i][1]
                });
                budgetPage.checkSubtotalTable({
                  title: 'Private Contractor',
                  costs: contractorCosts,
                  otherFundingAmount: contractorOtherFunding
                });

                budgetPage.checkSubtotalRows({ year, activityIndex: 1 });

                budgetPage.checkTotalComputableMedicaidCost({
                  totalMedicaidCost,
                  label: 'Activity 2 Total Computable Medicaid Cost'
                });
              });
            budgetPage.checkActivityTotalCostTable({
              activityTotalCost,
              otherFunding,
              index: 1
            });

            budgetPage.checkCostSplitTable({
              federalShare: split.fed * 100,
              stateShare: split.state * 100,
              totalMedicaidCost
            });

            // Fill out quarter table
            let staffPercentageSum = 0;
            let contractorPercentageSum = 0;

            const inputs = activityData.quarterVals[1];
            const stateQuarterValues = inputs.stateVals[i];
            const contractorQuarterValues = inputs.contractorVals[i];

            for (let quarter = 0; quarter < 4; quarter += 1) {
              const stateValue = stateQuarterValues[quarter];
              const contractorValue = contractorQuarterValues[quarter];

              populatePage.fillQuarter({
                quarter,
                stateValue,
                contractorValue
              });
              staffPercentageSum += stateValue;
              contractorPercentageSum += contractorValue;
            }

            populatePage.checkPercentageSubtotal({
              staff: staffPercentageSum,
              contractor: contractorPercentageSum
            });

            const stateTotal =
              (staffCosts +
                expensesCosts -
                staffOtherFunding -
                expensesOtherFunding) *
              split.fed;
            const contractorTotal =
              (contractorCosts - contractorOtherFunding) * split.fed;

            populatePage.checkQuarterSubtotal({
              stateTotal,
              contractorTotal,
              stateQuarterValues,
              contractorQuarterValues
            });

            budgetPage.checkEachQuarterSubtotal();
          });
      });
      budgetPage.checkFFYtotals({
        years,
        activityName: activityData.newActivityName,
        totalCost: totalActivityTotalCost,
        otherFunding: totalOtherFunding,
        totalMedicaidCost: totalTotalMedicaidCost,
        fundingSplit: `50/50 (FFY ${years[0]}) and 90/10 (FFY ${years[1]})`,
        federalShare: Math.round(totalFederalShare),
        state: 'Alaska',
        stateShare: Math.round(totalStateShare)
      });

      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.waitForSave();
    });

    // TODO: export view tests
  });
};
