/* eslint class-methods-use-this: "off" */
const { _ } = Cypress;

class ProposedBudgetPage {
  // Combined Activity Costs - CAC

  getCACByIndex = ({ ffy }) =>
    cy
      .contains(`Combined Activity Costs FFY ${ffy}`)
      .findParent('.budget-table');

  // verifyCACTable = (items, type) => {
  //   cy.contains(type)
  //     .parent()
  //     .nextUntil('.budget-table--row__header')
  //     .within(() => {
  //       cy.contains('State Staff Total')
  //         .next()
  //         .shouldBeCloseTo(items['State Staff Total']);

  //       cy.contains('Other State Expenses Total')
  //         .next()
  //         .shouldBeCloseTo(items['Other State Expenses Total']);

  //       cy.contains('Private Contractor Total')
  //         .next()
  //         .shouldBeCloseTo(items['Private Contractor Total']);

  //       cy.contains(`${type} Total`)
  //         .next()
  //         .shouldBeCloseTo(items[`${type} Total`]);
  //     });
  // };

  getTotalComputableMedicaidCostByFFY = ({ ffy }) =>
    cy.contains(`FFY ${ffy} Total Computable Medicaid Cost`).next();

  verifyComputableMedicaidCostByFFY = ({ years, expected }) => {
    // _.forEach(years, (ffy, index) => {
    //   const { programTypes, totalComputableMedicaidCost } = expected[index];
    //   this.getCACByFFY({ ffy }).within(() => {
    //     _.forEach(programTypes, (items, type) => {
    //       this.verifyCACTable(items, type);
    //     });
    //     this.getTotalComputableMedicaidCostByFFY({ ffy }).shouldBeCloseTo(
    //       totalComputableMedicaidCost
    //     );
    //   });
    // });

    _.forEach(years, (ffy, index) => {
      cy.get('[data-cy="CACTable"]')
        .eq(index)
        .then(table => {
          const { programTypes, totalComputableMedicaidCost } = expected[index];
          cy.get(table)
            .getTable()
            .then(tableData => {
              cy.log(JSON.stringify(tableData));
              expect(tableData).to.deep.include(programTypes);
            });
          cy.get(table).within(() => {
            this.getTotalComputableMedicaidCostByFFY({ ffy }).shouldBeCloseTo(
              totalComputableMedicaidCost
            );
          });
        });
    });
  };

  // Activity Breakdown
  getBreakdownByFFYAndActivity = ({ ffy, index }) =>
    cy.get(`#activity-${index + 1}-${ffy}`);

  getBreakdownByFFYAndActivityAndExpense = ({ ffy, index, expense }) =>
    this.getBreakdownByFFYAndActivity({ ffy, index })
      .contains(expense)
      .parent()
      .nextUntil('.budget-table--row__header');

  getBreakdownByFFYAndActivityAndExpenseAndRowPersonnelValue = ({
    ffy,
    index,
    expense,
    row
  }) =>
    this.getBreakdownByFFYAndActivityAndExpense({ ffy, index, expense })
      .contains(row)
      .siblings()
      .eq(0);

  getBreakdownByFFYAndActivityAndExpenseAndRowTotalValue = ({
    ffy,
    index,
    expense,
    row
  }) =>
    this.getBreakdownByFFYAndActivityAndExpense({ ffy, index, expense })
      .contains(row)
      .siblings()
      .eq(1);

  getBreakdownByFFYAndActivityAndExpenseOtherFundingTotalValue = ({
    ffy,
    index,
    expense
  }) =>
    this.getBreakdownByFFYAndActivityAndExpense({ ffy, index, expense })
      .contains('Other Funding Amount')
      .siblings()
      .eq(1);

  getBreakdownByFFYAndActivityAndExpenseSubtotalValue = ({
    ffy,
    index,
    expense
  }) =>
    this.getBreakdownByFFYAndActivityAndExpense({ ffy, index, expense })
      .contains(`${expense} Subtotal`)
      .siblings()
      .eq(0);

  getTCMCByActivity = ({ ffy, index }) =>
    this.getBreakdownByFFYAndActivity({ ffy, index }).find('tbody>tr').last();

  getTCMCValueByActivity = ({ ffy, index }) =>
    this.getTCMCByActivity({ ffy, index }).children('.budget-table--number');

  verifyActvityBreakdown = ({ years, activityList, expected }) => {
    // _.forEach(years, (ffy, ffyIndex) => {
    //   _.forEach(activityList, (activityName, index) => {
    //     const { expenses, totalComputableMedicaidCost } =
    //       expected[ffyIndex].activities[index];
    //     _.forEach(expenses, (items, expense) => {
    //       // TODO: Add this back once the default test is truly default
    //       this.getBreakdownByFFYAndActivityAndExpense({
    //         ffy,
    //         index,
    //         expense
    //       }).should('have.length', Object.keys(items).length);
    //       this.getBreakdownByFFYAndActivityAndExpenseOtherFundingTotalValue({
    //         ffy,
    //         index,
    //         expense
    //       }).shouldBeCloseTo(items['Other Funding Amount']);
    //       this.getBreakdownByFFYAndActivityAndExpenseSubtotalValue({
    //         ffy,
    //         index,
    //         expense
    //       }).shouldBeCloseTo(items[`${expense} Subtotal`]);
    //     });

    //     this.getTCMCValueByActivity({ ffy, index }).shouldBeCloseTo(
    //       totalComputableMedicaidCost
    //     );
    //   });
    // });

    _.forEach(years, (ffy, ffyIndex) => {
      _.forEach(activityList, (activityName, index) => {
        const { expenses, totalComputableMedicaidCost } =
          expected[ffyIndex].activities[index];

        cy.get(`#activity-${index + 1}-${ffy}`).then(table => {
          cy.get(table).within(() => {
            _.forEach(expenses, (items, expense) => {
              cy.contains(expense).next().shouldBeCloseTo(items);
            });
          });
        });
      });
    });
  };

  // Summary Budget Table - SBT
  getSBTByType = ({ type }) => cy.contains(`${type} Activities`).parent();

  getSBTByTypeAndFFY = ({ type, ffy }) =>
    this.getSBTByType({ type })
      .find(`#summary-budget-fy-${ffy}`)
      .findParent('.budget-table');

  getSBTByTypeAndFFYAndExpense = ({ type, ffy, expense }) =>
    this.getSBTByTypeAndFFY({ type, ffy }).contains(expense);

  getSBTByTypeAndFFYAndExpenseStateTotalValue = ({ type, ffy, expense }) =>
    this.getSBTByTypeAndFFYAndExpense({ type, ffy, expense })
      .siblings('td')
      .eq(0);

  getSBTByTypeAndFFYAndExpenseFederalTotalValue = ({ type, ffy, expense }) =>
    this.getSBTByTypeAndFFYAndExpense({ type, ffy, expense })
      .siblings('td')
      .eq(1);

  getSBTByTypeAndFFYAndExpenseMTCValue = ({ type, ffy, expense }) =>
    this.getSBTByTypeAndFFYAndExpense({ type, ffy, expense })
      .siblings('td')
      .eq(2);

  verifySummaryBudgetTables = ({ years, expected, expectedTotals }) => {
    // _.forEach(expected, (typeValue, type) => {
    //   _.forEach(years, (ffy, index) => {
    //     const expenses = typeValue[index];
    //     _.forEach(expenses, (values, expense) => {
    //       this.getSBTByTypeAndFFYAndExpenseStateTotalValue({
    //         type,
    //         ffy,
    //         expense
    //       }).shouldBeCloseTo(values[0], 3);
    //       this.getSBTByTypeAndFFYAndExpenseFederalTotalValue({
    //         type,
    //         ffy,
    //         expense
    //       }).shouldBeCloseTo(values[1], 3);
    //       this.getSBTByTypeAndFFYAndExpenseMTCValue({
    //         type,
    //         ffy,
    //         expense
    //       }).shouldBeCloseTo(values[2], 3);
    //     });
    //   });
    // });

    _.forEach(years, (ffy, index) => {
      const { programTypes } = expected[index];
      _.forEach(programTypes, (item, type) => {
        cy.get(`[data-cy="summaryBudget${type}"]`)
          .eq(index)
          .then(table => {
            cy.get(table)
              .getTable()
              .then(tableData => {
                expect(tableData).to.deep.include(item);
              });
          });
      });
    });

    cy.get('[data-cy="summaryBudgetTotals"]').then(table => {
      cy.get(table)
        .getTable()
        .then(tableData => {
          expect(tableData).to.deep.include(expectedTotals);
        });
    });
  };

  getActivityTotals = () =>
    cy.contains('Activities Totals').parent('.budget-table').find('tbody');

  getActivityTotalsByRowHeader = ({ header }) =>
    this.getActivityTotals().find('tr').contains(header);

  getActivityTotalsByRowHeaderStateTotalValue = ({ header }) =>
    this.getActivityTotalsByRowHeader({ header }).siblings().eq(0);

  getActivityTotalsByRowHeaderFederalTotalValue = ({ header }) =>
    this.getActivityTotalsByRowHeader({ header }).siblings().eq(1);

  getActivityTotalsByRowHeaderMTCValue = ({ header }) =>
    this.getActivityTotalsByRowHeader({ header }).siblings().eq(2);

  verifySummaryBudgetTableTotal = ({ expected }) => {
    _.forEach(expected, (values, header) => {
      this.getActivityTotalsByRowHeaderStateTotalValue({
        header
      }).shouldBeCloseTo(values[0], 5);
      this.getActivityTotalsByRowHeaderFederalTotalValue({
        header
      }).shouldBeCloseTo(values[1], 5);
      this.getActivityTotalsByRowHeaderMTCValue({ header }).shouldBeCloseTo(
        values[2],
        5
      );
    });
  };

  // Quarterly Federal Share - QFS
  getQFSByHeader = ({ ffy, header }) =>
    cy
      .contains(`FFY ${ffy} ${header} Quarterly Federal Share`)
      .parent('.budget-table')
      .find('tbody');

  getQFSByHeaderAndRowHeader = ({ ffy, header, row }) =>
    this.getQFSByHeader({ ffy, header }).contains(row);

  getQFSByHeaderAndRowHeaderValue = ({ ffy, header, row, columnIndex }) =>
    this.getQFSByHeaderAndRowHeader({ ffy, header, row })
      .siblings()
      .eq(columnIndex);

  verifyQuarterlyFederalShareByActivity = ({ years, expected }) => {
    // _.forEach(expected, (values, header) => {
    //   _.forEach(years, (ffy, index) => {
    //     const ffyValues = expected[header].byFFY[index];
    //     _.forEach(ffyValues, (ffyValue, row) => {
    //       _.forEach(ffyValue, (columnValue, columnIndex) => {
    //         this.getQFSByHeaderAndRowHeaderValue({
    //           ffy,
    //           header,
    //           row,
    //           columnIndex
    //         }).shouldBeCloseTo(columnValue, 3);
    //       });
    //     });
    //   });
    // });

    _.forEach(years, (ffy, index) => {
      const { programTypes } = expected[index];
      _.forEach(programTypes, (item, type) => {
        if (type === 'HIT and HIE') {
          cy.get('[data-cy="QFSTable"]')
            .eq(index)
            .then(table => {
              cy.get(table)
                .getTable()
                .then(tableData => {
                  expect(tableData).to.deep.include(item);
                });
            });
        } else if (type === 'MMIS') {
          cy.get('[data-cy="QFSTable"]')
            .eq(index + years.length)
            .then(table => {
              cy.get(table)
                .getTable()
                .then(tableData => {
                  expect(tableData).to.deep.include(item);
                });
            });
        }
      });
    });
  };

  getQFSTotalsByHeader = ({ header }) =>
    cy.contains(`Total ${header}`).findParent('.budget-table').find('tbody');

  getQFSTotalsByHeaderAndRowHeader = ({ header, row }) =>
    this.getQFSTotalsByHeader({ header }).contains(row);

  getQFSTotalsByHeaderAndRowHeaderValue = ({ header, row }) =>
    this.getQFSTotalsByHeaderAndRowHeader({ header, row }).siblings().eq(0);

  verifyQuarterlyFederalShareByTotals = ({
    expectedHITandHIETotal,
    expectedMMISTotal
  }) => {
    // _.forEach(expected, (ffyValues, header) => {
    //   const { totals } = ffyValues;
    //   _.forEach(totals, (value, row) => {
    //     this.getQFSTotalsByHeaderAndRowHeaderValue({
    //       header,
    //       row
    //     }).shouldBeCloseTo(value, 5);
    //   });
    // });

    cy.get('[data-cy="QFSTotals"]')
      .eq(0)
      .then(table => {
        cy.get(table)
          .getTable()
          .then(tableData => {
            expect(tableData).to.deep.include(expectedHITandHIETotal);
          });
      });

    cy.get('[data-cy="QFSTotals"]')
      .eq(1)
      .then(table => {
        cy.get(table)
          .getTable()
          .then(tableData => {
            expect(tableData).to.deep.include(expectedMMISTotal);
          });
      });
  };

  // Estimated Quarterly Incentive Payments - EQIP
  getEQIPByFFY = ({ ffy }) =>
    cy
      .contains(`FFY ${ffy} Incentive Payments by Quarter`)
      .parent('.budget-table')
      .find('tbody');

  getEQIPByFFYAndIncentiveType = ({ ffy, type }) =>
    this.getEQIPByFFY({ ffy }).contains(type);

  getEQIPByFFYAndIncentiveTypeAndQuarter = ({ ffy, type, quarterIndex }) =>
    this.getEQIPByFFYAndIncentiveType({ ffy, type })
      .siblings()
      .eq(quarterIndex);

  fillInEQIPFormByFFY = ({ years, expected }) => {
    _.forEach(years, (ffy, index) => {
      const ffyValues = expected[index];
      this.getEQIPByFFY({ ffy }).within(() => {
        _.forEach(ffyValues, (equipValues, type) => {
          cy.contains(type)
            .parent()
            .within(row => {
              _.forEach(equipValues, (quarterValue, quarterIndex) => {
                if (quarterIndex === equipValues.length - 1) {
                  cy.get('[data-cy="subtotal"]').shouldBeCloseTo(quarterValue);
                } else {
                  cy.get(row).find('input').eq(quarterIndex).type(quarterValue);
                }
              });
            });
        });
      });
    });
  };

  verifyEQIPFormByFFY = ({ years, expected }) => {
    _.forEach(years, (ffy, index) => {
      const ffyValues = expected[index];
      _.forEach(ffyValues, (typeValues, type) => {
        _.forEach(typeValues, (quarterValues, quarterIndex) => {
          if (quarterIndex === typeValues.length - 1) {
            this.getEQIPByFFYAndIncentiveTypeAndQuarter({
              ffy,
              type,
              quarterIndex
            }).shouldBeCloseTo(quarterValues);
          } else {
            this.getEQIPByFFYAndIncentiveTypeAndQuarter({
              ffy,
              type,
              quarterIndex
            })
              .find('input')
              .shouldBeCloseTo(quarterValues);
          }
        });
      });
    });
  };

  verifyEQIPViewByFFY = ({ years, expected }) => {
    _.forEach(years, (ffy, index) => {
      const ffyValues = expected[index];
      _.forEach(ffyValues, (typeValues, type) => {
        _.forEach(typeValues, (quarter, quarterIndex) => {
          this.getEQIPByFFYAndIncentiveTypeAndQuarter({
            ffy,
            type,
            quarterIndex
          }).shouldBeCloseTo(quarter);
        });
      });
    });
  };
}

export default ProposedBudgetPage;
