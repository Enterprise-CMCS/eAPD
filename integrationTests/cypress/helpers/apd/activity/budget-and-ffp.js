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

      let federalSharePercentage = 0;
      let stateSharePercentage = 0;
      if (split === '90-10') {
        federalSharePercentage = 0.9;
        stateSharePercentage = 0.1;
      } else if (split === '75-25') {
        federalSharePercentage = 0.75;
        stateSharePercentage = 0.25;
      } else if (split === '50-50') {
        federalSharePercentage = 0.5;
        stateSharePercentage = 0.5;
      }

      budgetPage.checkCostSplitTable({
        federalSharePercentage,
        federalShareAmount: 0,
        stateSharePercentage,
        stateShareAmount: 0,
        totalComputableMedicaidCost: 0
      });
    });

    cy.then(() => {
      years.forEach(year => {
        cy.contains(`Activity 1 Budget for FFY ${year}`)
          .parent()
          .parent()
          .within(() => {
            budgetPage.checkSubtotalTable({
              title: 'State Staff',
              subtotal: 0,
              otherFunding: 0
            });
            budgetPage.checkSubtotalTable({
              title: 'Other State Expenses',
              subtotal: 0,
              otherFunding: 0
            });
            budgetPage.checkSubtotalTable({
              title: 'Private Contractor',
              subtotal: 0,
              otherFunding: 0
            });
            budgetPage.checkTotalComputableMedicaidCost({
              label: 'Activity 1 Total Computable Medicaid Cost',
              totalComputableMedicaidCost: 0
            });

            budgetPage.checkActivityTotalCostTable({
              index: 1,
              activityTotalCosts: 0,
              otherFunding: 0,
              totalComputableMedicaidCost: 0
            });

            budgetPage.checkCostSplitTable({
              federalSharePercentage: 0.9,
              federalShareAmount: 0,
              stateSharePercentage: 0.1,
              stateShareAmount: 0,
              totalComputableMedicaidCost: 0
            });
            budgetPage.checkQuarterTable();
          });
      });
      budgetPage.checkFFYtotals({
        years,
        activityIndex: 0,
        activityName: activities[0][0],
        totalCost: 0,
        totalOtherFunding: 0,
        totalTotalMedicaidCost: 0,
        fundingSplit: '90/10',
        totalFederalShare: 0,
        state: 'Alaska',
        totalStateShare: 0
      });
    });

    cy.waitForSave();
  });

  it('should display the default activity overview in the export view', () => {
    const exportPage = new ExportPage();

    cy.goToExportView();

    years.forEach(year => {
      cy.contains(`Activity 1 Budget for FFY ${year}`)
        .parent()
        .parent()
        .within(() => {
          budgetPage.checkSubtotalTable({
            title: 'State Staff',
            subtotal: 0,
            otherFunding: 0
          });
          budgetPage.checkSubtotalTable({
            title: 'Other State Expenses',
            subtotal: 0,
            otherFunding: 0
          });
          budgetPage.checkSubtotalTable({
            title: 'Private Contractor',
            subtotal: 0,
            otherFunding: 0
          });
          budgetPage.checkTotalComputableMedicaidCost({
            label: 'Activity 1 Total Computable Medicaid Cost',
            totalComputableMedicaidCost: 0
          });

          exportPage.checkRowTotals({
            activityTotalCosts: 0,
            otherFunding: 0,
            totalComputableMedicaidCost: 0,
            federalSharePercentage: 0.9,
            federalShareAmount: 0,
            stateSharePercentage: 0.1,
            stateShareAmount: 0
          });
          cy.contains('Estimated Quarterly Expenditure')
            .next()
            .within(() => {
              budgetPage.checkQuarterTable({ isExportView: true });
            });
        });
    });
    budgetPage.checkFFYtotals({
      years,
      activityIndex: 0,
      activityName: activities[0][0],
      totalCost: 0,
      totalOtherFunding: 0,
      totalTotalMedicaidCost: 0,
      fundingSplit: '90/10',
      totalFederalShare: 0,
      state: 'Alaska',
      totalStateShare: 0
    });

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testBudgetAndFFPWithData = years => {
  let populatePage;
  let budgetPage;

  let activityData;
  let budgetData;

  before(() => {
    populatePage = new PopulatePage();
    budgetPage = new BudgetPage();
  });

  beforeEach(() => {
    cy.fixture('activity-overview-template.json').then(data => {
      activityData = data;
    });
    cy.fixture('budget-and-ffp-test.json').then(data => {
      budgetData = data;
    });
  });

  describe('Activity 1', () => {
    beforeEach(() => {
      cy.goToBudgetAndFFP(0);
    });

    it('fills out Budget and FFP for activity 1', () => {
      const { name: activityName } = activityData.activityOverview[0];
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', { name: /Budget and FFP/i, level: 2 }).should(
        'exist'
      );

      years.forEach((year, i) => {
        const {
          expenses,
          totalComputableMedicaidCost,
          activityTotalCosts,
          otherFunding
        } = budgetData.budgetTableByActivities[0].ffys[i];

        cy.findAllByText(`Activity 1 Budget for FFY ${year}`)
          .parent()
          .parent()
          .within(() => {
            cy.get('[class="budget-table activity-budget-table"]')
              .eq(0)
              .within(() => {
                Object.keys(expenses).forEach(key => {
                  const {
                    title,
                    items,
                    otherFunding: expenseOtherFunding,
                    subtotal
                  } = expenses[key];
                  items.forEach(item => {
                    budgetPage.checkTableRow(item);
                  });
                  budgetPage.checkSubtotalTable({
                    title,
                    subtotal,
                    otherFunding: expenseOtherFunding
                  });
                });

                budgetPage.checkSubtotalRows();

                budgetPage.checkTotalComputableMedicaidCost({
                  label: 'Activity 1 Total Computable Medicaid Cost',
                  totalComputableMedicaidCost
                });
              });

            budgetPage.checkActivityTotalCostTable({
              index: 1,
              activityTotalCosts,
              otherFunding,
              totalComputableMedicaidCost
            });

            // Federal Share, State Share
            const { split } = activityData.splitConstants[i];

            cy.get('select.ds-c-field').select(split);

            const {
              federalSharePercentage,
              federalShareAmount,
              stateSharePercentage,
              stateShareAmount
            } = budgetData.fedStateSplitTableByActivity[0].ffys[i];

            budgetPage.checkCostSplitTable({
              federalSharePercentage,
              federalShareAmount,
              stateSharePercentage,
              stateShareAmount,
              totalComputableMedicaidCost
            });

            const {
              stateQuarterlyPercentage,
              stateSubtotalPercentage,
              stateSubtotalCost,
              stateQuarterlyCosts,
              contractorQuarterlyPercentage,
              contractorSubtotalPercentage,
              contractorSubtotalCost,
              contractorQuarterlyCosts
            } = budgetData.estimatedQuarterlyExpenditureByActivity[0].ffys[i];
            for (let quarter = 0; quarter < 4; quarter += 1) {
              const stateValue = stateQuarterlyPercentage[quarter];
              const contractorValue = contractorQuarterlyPercentage[quarter];

              populatePage.fillQuarter({
                quarter,
                stateValue,
                contractorValue
              });
            }

            budgetPage.checkSubtotalPercentage({
              stateSubtotalPercentage,
              contractorSubtotalPercentage
            });

            budgetPage.checkSubtotalCost({
              stateSubtotalCost,
              contractorSubtotalCost
            });

            budgetPage.checkQuarterSubtotal({
              stateQuarterlyCosts,
              contractorQuarterlyCosts
            });

            budgetPage.checkEachQuarterSubtotal();
          });
      });

      const {
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        totalFederalShare,
        totalStateShare
      } = budgetData.ffyTotalDescription[0];
      budgetPage.checkFFYtotals({
        years,
        activityIndex: 0,
        activityName,
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        fundingSplit: `75/25 (FFY ${years[0]}) and 50/50 (FFY ${years[1]})`,
        totalFederalShare,
        state: 'Alaska',
        totalStateShare
      });

      cy.waitForSave();
    });

    it('should display Activity 1 in the export view', () => {
      const { name: activityName } = activityData.activityOverview[0];

      const exportPage = new ExportPage();

      cy.goToExportView();

      years.forEach((year, i) => {
        const {
          expenses,
          totalComputableMedicaidCost,
          activityTotalCosts,
          otherFunding
        } = budgetData.budgetTableByActivities[0].ffys[i];

        cy.contains(`Activity 1 Budget for FFY ${year}`)
          .parent()
          .parent()
          .within(() => {
            Object.keys(expenses).forEach(key => {
              const {
                title,
                items,
                otherFunding: expenseOtherFunding,
                subtotal
              } = expenses[key];
              items.forEach(item => {
                budgetPage.checkTableRow(item);
              });
              budgetPage.checkSubtotalTable({
                title,
                subtotal,
                otherFunding: expenseOtherFunding
              });
            });

            budgetPage.checkSubtotalRows();

            budgetPage.checkTotalComputableMedicaidCost({
              label: 'Activity 1 Total Computable Medicaid Cost',
              totalComputableMedicaidCost
            });
            const {
              federalSharePercentage,
              federalShareAmount,
              stateSharePercentage,
              stateShareAmount
            } = budgetData.fedStateSplitTableByActivity[0].ffys[i];

            exportPage.checkRowTotals({
              activityTotalCosts,
              otherFunding,
              totalComputableMedicaidCost,
              federalSharePercentage,
              federalShareAmount,
              stateSharePercentage,
              stateShareAmount
            });

            const {
              stateQuarterlyPercentage,
              stateSubtotalPercentage,
              stateQuarterlyCosts,
              stateSubtotalCost,
              contractorQuarterlyPercentage,
              contractorSubtotalPercentage,
              contractorQuarterlyCosts,
              contractorSubtotalCost,
              quarterFFPs,
              totalFFP
            } = budgetData.estimatedQuarterlyExpenditureByActivity[0].ffys[i];

            cy.contains('Estimated Quarterly Expenditure')
              .next()
              .within(() => {
                budgetPage.checkQuarterTable({
                  isExportView: true,
                  stateQuarterlyPercentage,
                  stateSubtotalPercentage,
                  stateQuarterlyCosts,
                  stateSubtotalCost,
                  contractorQuarterlyPercentage,
                  contractorSubtotalPercentage,
                  contractorQuarterlyCosts,
                  contractorSubtotalCost,
                  quarterFFPs,
                  totalFFP
                });
              });
          });
      });

      const {
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        totalFederalShare,
        totalStateShare
      } = budgetData.ffyTotalDescription[0];
      budgetPage.checkFFYtotals({
        years,
        activityIndex: 0,
        activityName,
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        fundingSplit: `75/25 (FFY ${years[0]}) and 50/50 (FFY ${years[1]})`,
        totalFederalShare,
        state: 'Alaska',
        totalStateShare
      });

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
  });

  describe('Activity 2', () => {
    beforeEach(() => {
      cy.goToBudgetAndFFP(1);
    });

    it('fills out Budget and FFP for activity 2', () => {
      const { name: activityName } = activityData.activityOverview[1];
      cy.findByRole('heading', {
        name: /^Activity 2:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', { name: /Budget and FFP/i, level: 2 }).should(
        'exist'
      );

      years.forEach((year, i) => {
        const {
          expenses,
          totalComputableMedicaidCost,
          activityTotalCosts,
          otherFunding
        } = budgetData.budgetTableByActivities[1].ffys[i];

        cy.findAllByText(`Activity 2 Budget for FFY ${year}`)
          .parent()
          .parent()
          .within(() => {
            cy.get('[class="budget-table activity-budget-table"]')
              .eq(0)
              .within(() => {
                Object.keys(expenses).forEach(key => {
                  const {
                    title,
                    items,
                    otherFunding: expenseOtherFunding,
                    subtotal
                  } = expenses[key];
                  items.forEach(item => {
                    budgetPage.checkTableRow(item);
                  });
                  budgetPage.checkSubtotalTable({
                    title,
                    subtotal,
                    otherFunding: expenseOtherFunding
                  });
                });

                budgetPage.checkSubtotalRows();

                budgetPage.checkTotalComputableMedicaidCost({
                  label: 'Activity 2 Total Computable Medicaid Cost',
                  totalComputableMedicaidCost
                });
              });

            budgetPage.checkActivityTotalCostTable({
              index: 1,
              activityTotalCosts,
              otherFunding,
              totalComputableMedicaidCost
            });

            const { split } = activityData.splitConstants[i + 1];

            cy.get('[class="ds-c-field"]').select(split);

            const {
              federalSharePercentage,
              federalShareAmount,
              stateSharePercentage,
              stateShareAmount
            } = budgetData.fedStateSplitTableByActivity[1].ffys[i];

            budgetPage.checkCostSplitTable({
              federalSharePercentage,
              federalShareAmount,
              stateSharePercentage,
              stateShareAmount,
              totalComputableMedicaidCost
            });

            const {
              stateQuarterlyPercentage,
              stateSubtotalPercentage,
              stateQuarterlyCosts,
              stateSubtotalCost,
              contractorQuarterlyPercentage,
              contractorSubtotalPercentage,
              contractorQuarterlyCosts,
              contractorSubtotalCost
            } = budgetData.estimatedQuarterlyExpenditureByActivity[1].ffys[i];
            for (let quarter = 0; quarter < 4; quarter += 1) {
              const stateValue = stateQuarterlyPercentage[quarter];
              const contractorValue = contractorQuarterlyPercentage[quarter];

              populatePage.fillQuarter({
                quarter,
                stateValue,
                contractorValue
              });
            }

            budgetPage.checkSubtotalPercentage({
              stateSubtotalPercentage,
              contractorSubtotalPercentage
            });

            budgetPage.checkSubtotalCost({
              stateSubtotalCost,
              contractorSubtotalCost
            });

            budgetPage.checkQuarterSubtotal({
              stateQuarterlyCosts,
              contractorQuarterlyCosts
            });

            budgetPage.checkEachQuarterSubtotal();
          });
      });

      const {
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        totalFederalShare,
        totalStateShare
      } = budgetData.ffyTotalDescription[1];
      budgetPage.checkFFYtotals({
        years,
        activityIndex: 1,
        activityName,
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        fundingSplit: `50/50 (FFY ${years[0]}) and 90/10 (FFY ${years[1]})`,
        totalFederalShare,
        state: 'Alaska',
        totalStateShare
      });

      cy.waitForSave();
    });

    it('should display Activity 2 in the export view', () => {
      const { name: activityName } = activityData.activityOverview[1];

      const exportPage = new ExportPage();

      cy.goToExportView();

      years.forEach((year, i) => {
        const {
          expenses,
          totalComputableMedicaidCost,
          activityTotalCosts,
          otherFunding
        } = budgetData.budgetTableByActivities[1].ffys[i];

        cy.contains(`Activity 2 Budget for FFY ${year}`)
          .parent()
          .parent()
          .within(() => {
            Object.keys(expenses).forEach(key => {
              const {
                title,
                items,
                otherFunding: expenseOtherFunding,
                subtotal
              } = expenses[key];
              items.forEach(item => {
                budgetPage.checkTableRow(item);
              });
              budgetPage.checkSubtotalTable({
                title,
                subtotal,
                otherFunding: expenseOtherFunding
              });
            });

            budgetPage.checkSubtotalRows();

            budgetPage.checkTotalComputableMedicaidCost({
              label: 'Activity 2 Total Computable Medicaid Cost',
              totalComputableMedicaidCost
            });
            const {
              federalSharePercentage,
              federalShareAmount,
              stateSharePercentage,
              stateShareAmount
            } = budgetData.fedStateSplitTableByActivity[1].ffys[i];

            exportPage.checkRowTotals({
              activityTotalCosts,
              otherFunding,
              totalComputableMedicaidCost,
              federalSharePercentage,
              federalShareAmount,
              stateSharePercentage,
              stateShareAmount
            });

            const {
              stateQuarterlyPercentage,
              stateSubtotalPercentage,
              stateQuarterlyCosts,
              stateSubtotalCost,
              contractorQuarterlyPercentage,
              contractorSubtotalPercentage,
              contractorQuarterlyCosts,
              contractorSubtotalCost,
              quarterFFPs,
              totalFFP
            } = budgetData.estimatedQuarterlyExpenditureByActivity[1].ffys[i];

            cy.contains('Estimated Quarterly Expenditure')
              .next()
              .within(() => {
                budgetPage.checkQuarterTable({
                  isExportView: true,
                  stateQuarterlyPercentage,
                  stateSubtotalPercentage,
                  stateQuarterlyCosts,
                  stateSubtotalCost,
                  contractorQuarterlyPercentage,
                  contractorSubtotalPercentage,
                  contractorQuarterlyCosts,
                  contractorSubtotalCost,
                  quarterFFPs,
                  totalFFP
                });
              });
          });
      });

      const {
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        totalFederalShare,
        totalStateShare
      } = budgetData.ffyTotalDescription[1];
      budgetPage.checkFFYtotals({
        years,
        activityIndex: 1,
        activityName,
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        fundingSplit: `50/50 (FFY ${years[0]}) and 90/10 (FFY ${years[1]})`,
        totalFederalShare,
        state: 'Alaska',
        totalStateShare
      });

      cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
    });
  });
};
