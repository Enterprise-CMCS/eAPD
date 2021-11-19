import BudgetPage from '../../../page-objects/budget-page';
import PopulatePage from '../../../page-objects/populate-page';

const activities = [['Program Administration', 'HIT']];
const splits = ['75-25', '50-50', '90-10'];

export const testDefaultBudgetAndFFP = years => {
  let budgetPage;

  before(() => {
    budgetPage = new BudgetPage();
  });

  beforeEach(() => {
    cy.goToBudgetAndFFP(0);
    cy.findByRole('heading', { name: /Budget and FFP/i, level: 2 }).should(
      'exist'
    );
  });

  it('should display the default Budget and FFP', () => {
    cy.then(() => {
      years.forEach(year => {
        cy.contains(`Budget for FFY ${year}`)
          .parent()
          .parent()
          .within(() => {
            budgetPage.checkSubtotalTable('State Staff', 0, 0);
            budgetPage.checkSubtotalTable('Other State Expenses', 0);
            budgetPage.checkSubtotalTable('Private Contractor', 0);
            budgetPage.checkTotalComputableMedicaidCost(0);
            budgetPage.checkActivityTotalCostTable(0, 0, 1);

            budgetPage.checkCostSplitTable(90, 10, 0, 0, 0);
            budgetPage.checkQuarterTable('default', '', 0);
          });
      });
      budgetPage.checkFFYtotals(
        years,
        activities[0][0],
        0,
        0,
        0,
        '90/10',
        0,
        'Alaska',
        0
      );
    });
  });
};

export const testDefaultBudgetAndFFPExportView = () => {};

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
    beforeEach(() => {
      cy.goToBudgetAndFFP(0);
    });

    it('Tests cost split table (Activity 1 - 2021)', () => {
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');
      cy.findByRole('heading', { name: /Budget and FFP/i, level: 2 }).should(
        'exist'
      );

      const staff = activityData.staff[1];
      const expenses = activityData.expenses[1];
      const contractor = activityData.privateContractors[1];
      const allocation = activityData.costAllocation[0];

      let firstYearTotal = budgetPage.computeFFYtotal(
        staff.costs[0] * staff.ftes[0],
        expenses.costs[0],
        contractor.FFYcosts[0]
      );

      firstYearTotal -= allocation.costs[0];

      cy.log('test splits and updating calculations');
      splits.forEach(split => {
        cy.get('[class="ds-c-field"]').eq(0).select(split);
        cy.waitForSave();
        let fedSplit = 0;
        let stateSplit = 0;
        if (split === '90-10') {
          fedSplit = 90;
          stateSplit = 10;
        } else if (split === '75-25') {
          fedSplit = 75;
          stateSplit = 25;
        } else if (split === '50-50') {
          fedSplit = 50;
          stateSplit = 50;
        }

        cy.get('[class="budget-table activity-budget-table"]')
          .eq(2)
          .within(() => {
            budgetPage.checkCostSplitTable(
              fedSplit,
              stateSplit,
              firstYearTotal
            );
          });
      });

      cy.log('fill in budget');
      years.forEach((year, i) => {
        cy.get('[class="ds-c-field"]').eq(i).select(splits[i]);
        cy.waitForSave();
        cy.findAllByText(`Activity 1 Budget for FFY ${year}`)
          .parent()
          .parent()
          .within(() => {
            cy.get('[class="budget-table activity-budget-table"]')
              .eq(0)
              .within(() => {
                budgetPage.checkTableRow(
                  staff.title,
                  budgetPage.addCommas(staff.costs[i]),
                  staff.ftes[i]
                );

                budgetPage.checkTableRow(
                  expenses.category,
                  budgetPage.addCommas(expenses.costs[i])
                );

                budgetPage.checkTableRow(
                  contractor.name,
                  budgetPage.addCommas(contractor.FFYcosts[i])
                );

                budgetPage.checkSubtotalRows(year, 1);
              });

            const otherFFYfunding = allocation.costs[i];
            cy.findAllByText('Other Funding')
              .parent()
              .should('contain', `$${budgetPage.addCommas(otherFFYfunding)}`);

            // Fill out quarter table
            const inputs = activityData.quarterVals[0];
            let staffPercentageSum = 0;
            let contractorPercentageSum = 0;
            for (let k = 0; k < 4; k += 1) {
              populatePage.fillQuarter(
                k,
                inputs.stateVals[i][k],
                inputs.contractorVals[i][k]
              );
              staffPercentageSum += inputs.stateVals[i][k];
              contractorPercentageSum += inputs.stateVals[i][k];
            }
            populatePage.checkPercentageSubtotal(
              staffPercentageSum,
              contractorPercentageSum
            );

            cy.get('[data-cy="subtotal"]').should($td => {
              const staffSubtotal = budgetPage.convertStringToNum(
                $td.eq(0).text()
              );
              const expensesSubtotal = budgetPage.convertStringToNum(
                $td.eq(1).text()
              );
              let contractorTotal = budgetPage.convertStringToNum(
                $td.eq(2).text()
              );

              let staffTotal = staffSubtotal + expensesSubtotal;

              const splitMultipliers = activityData.splitConstants[i];

              staffTotal *= splitMultipliers.fed;
              contractorTotal *= splitMultipliers.fed;

              for (let k = 0; k < 4; k += 1) {
                populatePage.checkQuarterSubtotal(
                  $td.eq(k + 4).text(), // +4 gets to the first quarter table state subtotal
                  $td.eq(k + 8).text(), // +8 gets to the first quarter contractor subtotal
                  staffTotal * (inputs.stateVals[i][k] * 0.01),
                  contractorTotal * inputs.contractorVals[i][k] * 0.01
                );
              }
            });
            budgetPage.checkEachQuarterSubtotal();
          });
        cy.waitForSave();
      });

      // Calculate totals for final section
      let activityTotal = 0;
      let otherFundingTotal = 0;
      let federalShare = 0;
      let stateShare = 0;

      years.forEach((year, i) => {
        let FFYtotal = budgetPage.computeFFYtotal(
          staff.costs[i] * staff.ftes[i],
          expenses.costs[i],
          contractor.FFYcosts[i]
        );

        activityTotal += FFYtotal;
        otherFundingTotal += allocation.costs[i];

        FFYtotal -= allocation.costs[i];

        const splitMultipliers = activityData.splitConstants[i];
        federalShare += FFYtotal * splitMultipliers.fed;
        stateShare += FFYtotal * splitMultipliers.state;
      });

      const totalMedicaid = activityTotal - otherFundingTotal;
      budgetPage.checkFFYtotals(
        years,
        'Program Administration',
        budgetPage.addCommas(activityTotal),
        budgetPage.addCommas(otherFundingTotal),
        budgetPage.addCommas(totalMedicaid),
        `75/25 (FFY ${years[0]}) and 50/50 (FFY ${years[1]})`,
        budgetPage.addCommas(federalShare),
        'Alaska',
        budgetPage.addCommas(stateShare)
      );
    });

    // TODO: export view tests
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

      const staff = activityData.staff[2];
      const staff2 = activityData.staff[3];
      const expenses = activityData.expenses[2];
      const expenses2 = activityData.expenses[3];
      const contractor = activityData.privateContractors[2];
      const contractor2 = activityData.privateContractors[3];
      const allocation = activityData.costAllocation[1];

      years.forEach((year, i) => {
        cy.get('[class="ds-c-field"]')
          .eq(i)
          .select(splits[i + 1]);
        cy.findAllByText(`Activity 2 Budget for FFY ${year}`)
          .parent()
          .parent()
          .within(() => {
            cy.get('[class="budget-table activity-budget-table"]')
              .eq(0)
              .within(() => {
                budgetPage.checkTableRow(
                  staff.title,
                  budgetPage.addCommas(staff.costs[i]),
                  staff.ftes[i]
                );
                budgetPage.checkTableRow(
                  staff2.title,
                  budgetPage.addCommas(staff2.costs[i]),
                  staff2.ftes[i]
                );

                budgetPage.checkTableRow(
                  expenses.category,
                  budgetPage.addCommas(expenses.costs[i])
                );
                budgetPage.checkTableRow(
                  expenses2.category,
                  budgetPage.addCommas(expenses2.costs[i])
                );

                budgetPage.checkTableRow(
                  contractor.name,
                  budgetPage.addCommas(contractor.FFYcosts[i])
                );

                budgetPage.checkTableRow(
                  contractor2.name,
                  budgetPage.addCommas(
                    contractor2.FFYcosts[i][0] * contractor2.FFYcosts[i][1]
                  )
                );

                budgetPage.checkSubtotalRows(years[i], 2);
              });

            const otherFFYfunding = allocation.costs[i];
            cy.findAllByText('Other Funding')
              .parent()
              .should('contain', `$${budgetPage.addCommas(otherFFYfunding)}`);

            const inputs = activityData.quarterVals[1];
            let staffPercentageSum = 0;
            let contractorPercentageSum = 0;
            for (let k = 0; k < 4; k += 1) {
              populatePage.fillQuarter(
                k,
                inputs.stateVals[i][k],
                inputs.contractorVals[i][k]
              );
              staffPercentageSum += inputs.stateVals[i][k];
              contractorPercentageSum += inputs.stateVals[i][k];
            }
            populatePage.checkPercentageSubtotal(
              staffPercentageSum,
              contractorPercentageSum
            );

            cy.get('[data-cy="subtotal"]').should($td => {
              const staffSubtotal = budgetPage.convertStringToNum(
                $td.eq(0).text()
              );
              const expensesSubtotal = budgetPage.convertStringToNum(
                $td.eq(1).text()
              );
              let contractorTotal = budgetPage.convertStringToNum(
                $td.eq(2).text()
              );

              let staffTotal = staffSubtotal + expensesSubtotal;

              const splitMultipliers = activityData.splitConstants[i + 1];

              staffTotal *= splitMultipliers.fed;
              contractorTotal *= splitMultipliers.fed;

              for (let k = 0; k < 4; k += 1) {
                populatePage.checkQuarterSubtotal(
                  $td.eq(k + 4).text(),
                  $td.eq(k + 8).text(),
                  staffTotal * (inputs.stateVals[i][k] * 0.01),
                  contractorTotal * inputs.contractorVals[i][k] * 0.01
                );
              }
            });
            budgetPage.checkEachQuarterSubtotal();
          });
        cy.waitForSave();
      });

      let activityTotal = 0;
      let otherFundingTotal = 0;
      let federalShare = 0;
      let stateShare = 0;

      years.forEach((year, i) => {
        let FFYtotal = budgetPage.computeFFYtotal(
          staff.costs[i] * staff.ftes[i] + staff2.costs[i] * staff2.ftes[i],
          expenses.costs[i] + expenses2.costs[i],
          contractor.FFYcosts[i] +
            contractor2.FFYcosts[i][0] * contractor2.FFYcosts[i][1]
        );

        activityTotal += FFYtotal;
        otherFundingTotal += allocation.costs[i];

        FFYtotal -= allocation.costs[i];

        const splitMultipliers = activityData.splitConstants[i + 1];
        federalShare += FFYtotal * splitMultipliers.fed;
        stateShare += FFYtotal * splitMultipliers.state;
      });

      federalShare = Math.ceil(federalShare);
      stateShare = Math.floor(stateShare);

      const totalMedicaid = activityTotal - otherFundingTotal;
      budgetPage.checkFFYtotals(
        years,
        activityData.newActivityName,
        budgetPage.addCommas(activityTotal),
        budgetPage.addCommas(otherFundingTotal),
        budgetPage.addCommas(totalMedicaid),
        `50/50 (FFY ${years[0]}) and 90/10 (FFY ${years[1]})`,
        budgetPage.addCommas(federalShare),
        'Alaska',
        budgetPage.addCommas(stateShare)
      );
    });

    // TODO: export view tests
  });
};
