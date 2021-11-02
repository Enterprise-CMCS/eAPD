/* eslint class-methods-use-this: "off" */

class ProposedBudgetPage {
  // Combined Activity Costs - CAC

  getCACByFFY = ({ ffy }) =>
    cy
      .contains(`Combined Activity Costs FFY ${ffy}`)
      .findParent('.budget-table');

  getCACByFFYAndType = ({ ffy, type }) =>
    this.getCACByFFY({ ffy }).contains(type);

  getCACByFFYAndTypeAndExpense = ({ ffy, type, expense }) =>
    this.getCACByFFYAndType({ ffy, type })
      .parent()
      .nextUntil('.budget-table--row__header')
      .contains(expense)
      .next();

  getTotalComputableMedicaidCostByFFY = ({ ffy }) =>
    cy.contains(`FFY ${ffy} Total Computable Medicaid Cost`).next();

  verifyComputableMedicaidCostByFFY = ({ years, expected }) => {
    years.forEach((ffy, index) => {
      Object.keys(expected[index].programTypes).forEach(type => {
        Object.keys(expected[index].programTypes[type]).forEach(expense => {
          this.getCACByFFYAndTypeAndExpense({
            ffy,
            type,
            expense
          }).shouldBeCloseTo(expected[index].programTypes[type][expense]);
        });
      });

      this.getTotalComputableMedicaidCostByFFY({ ffy }).shouldBeCloseTo(
        expected[index].totalComputableMedicaidCost
      );
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

  verifyActvityBreakdownByFFYAndActivity = ({
    years,
    activityList,
    expected
  }) => {
    years.forEach((ffy, ffyIndex) => {
      activityList.forEach((activityName, index) => {
        cy.log(`expected ${JSON.stringify(expected)}`);
        Object.keys(expected[ffyIndex].activities[index].expenses).forEach(
          expense => {
            cy.log(
              `verifying expense - ${expense} - ${
                expected[ffyIndex].activities[index].expenses[expense][
                  `${expense} Subtotal`
                ]
              }`
            );
            // TODO: Add this back once the default test is truly default
            // this.getBreakdownByFFYAndActivityAndExpense({
            //   ffy,
            //   index,
            //   expense
            // }).should(
            //   'have.length',
            //   Object.keys(
            //     expected[ffyIndex].activities[index].expenses[expense]
            //   ).length
            // );
            this.getBreakdownByFFYAndActivityAndExpenseOtherFundingTotalValue({
              ffy,
              index,
              expense
            }).shouldBeCloseTo(
              expected[ffyIndex].activities[index].expenses[expense][
                'Other Funding Amount'
              ]
            );
            this.getBreakdownByFFYAndActivityAndExpenseSubtotalValue({
              ffy,
              index,
              expense
            }).shouldBeCloseTo(
              expected[ffyIndex].activities[index].expenses[expense][
                `${expense} Subtotal`
              ]
            );
          }
        );

        this.getTCMCValueByActivity({ ffy, index }).shouldBeCloseTo(
          expected[ffyIndex].activities[index].totalComputableMedicaidCost
        );
      });
    });
  };

  // Summary Budget Table - SBT
  getSBTByType = ({ type }) => cy.contains(`${type} Activities`).parent();

  getSBTByTypeAndFFY = ({ type, ffy }) =>
    this.getSBTByType({ type })
      .get(`#summary-budget-fy-${ffy}`)
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

  verifySummaryBudgetTableByTypeAndFFY = ({ years, expected }) => {
    Object.keys(expected).forEach(type => {
      years.forEach((ffy, index) => {
        Object.keys(expected[type][index]).forEach(expense => {
          this.getSBTByTypeAndFFYAndExpenseStateTotalValue({
            type,
            ffy,
            expense
          }).shouldBeCloseTo(expected[type][index][expense][0]);
          this.getSBTByTypeAndFFYAndExpenseFederalTotalValue({
            type,
            ffy,
            expense
          }).shouldBeCloseTo(expected[type][index][expense][1]);
          this.getSBTByTypeAndFFYAndExpenseMTCValue({
            type,
            ffy,
            expense
          }).shouldBeCloseTo(expected[type][index][expense][2]);
        });
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
    Object.keys(expected).forEach(header => {
      this.getActivityTotalsByRowHeaderStateTotalValue({
        header
      }).shouldBeCloseTo(expected[header][0]);
      this.getActivityTotalsByRowHeaderFederalTotalValue({
        header
      }).shouldBeCloseTo(expected[header][1]);
      this.getActivityTotalsByRowHeaderMTCValue({ header }).shouldBeCloseTo(
        expected[header][2]
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

  verifyQuarterlyFederalShareByFFY = ({ years, expected }) => {
    Object.keys(expected).forEach(header => {
      years.forEach((ffy, index) => {
        Object.keys(expected[header].byFFY[index]).forEach(row => {
          expected[header].byFFY[index][row].forEach((column, columnIndex) => {
            this.getQFSByHeaderAndRowHeaderValue({
              ffy,
              header,
              row,
              columnIndex
            }).shouldBeCloseTo(expected[header].byFFY[index][row][columnIndex]);
          });
        });
      });
    });
  };

  getQFSTotalsByHeader = ({ header }) =>
    cy.contains(`Total ${header}`).findParent('.budget-table').find('tbody');

  getQFSTotalsByHeaderAndRowHeader = ({ header, row }) =>
    this.getQFSTotalsByHeader({ header }).contains(row);

  getQFSTotalsByHeaderAndRowHeaderValue = ({ header, row }) =>
    this.getQFSTotalsByHeaderAndRowHeader({ header, row }).siblings().eq(0);

  verifyQuarterlyFederalShareByFFYTotals = ({ expected }) => {
    Object.keys(expected).forEach(header => {
      Object.keys(expected[header].totals).forEach(row => {
        this.getQFSTotalsByHeaderAndRowHeaderValue({
          header,
          row
        }).shouldBeCloseTo(expected[header].totals[row]);
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

  verifyEQIPFormByFFY = ({ years, expected }) => {
    years.forEach((ffy, index) => {
      Object.keys(expected[index]).forEach(type => {
        expected[index][type].forEach((quarter, quarterIndex) => {
          if (quarterIndex === expected[index][type].length - 1) {
            this.getEQIPByFFYAndIncentiveTypeAndQuarter({
              ffy,
              type,
              quarterIndex
            }).shouldBeCloseTo(expected[index][type][quarterIndex]);
          } else {
            this.getEQIPByFFYAndIncentiveTypeAndQuarter({
              ffy,
              type,
              quarterIndex
            })
              .find('input')
              .shouldBeCloseTo(expected[index][type][quarterIndex]);
          }
        });
      });
    });
  };

  verifyEQIPViewByFFY = ({ years, expected }) => {
    years.forEach((ffy, index) => {
      Object.keys(expected[index]).forEach(type => {
        expected[index][type].forEach((quarter, quarterIndex) => {
          this.getEQIPByFFYAndIncentiveTypeAndQuarter({
            ffy,
            type,
            quarterIndex
          }).shouldBeCloseTo(expected[index][type][quarterIndex]);
        });
      });
    });
  };
}

export default ProposedBudgetPage;
