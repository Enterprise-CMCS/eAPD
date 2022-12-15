/* eslint class-methods-use-this: "off" */
const { _ } = Cypress;

class ProposedBudgetPage {
  // Combined Activity Costs - CAC

  getTotalComputableMedicaidCostByFFY = ({ ffy }) =>
    cy.contains(`FFY ${ffy} Total Computable Medicaid Cost`).next();

  verifyComputableMedicaidCostByFFY = ({ years, expected }) => {
    _.forEach(years, (ffy, index) => {
      cy.get('[data-cy="CACTable"]')
        .eq(index)
        .then(table => {
          const { programTypes, totalComputableMedicaidCost } = expected[index];
          cy.get(table)
            .getEAPDTable()
            .then(tableData => {
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

  // State and Contractor Cost Breakdown
  getBreakdownByFFYAndActivity = ({ ffy, index }) =>
    cy.get(`#activity-${index + 1}-${ffy}`);

  getBreakdownByFFYAndActivityAndExpense = ({ ffy, index, expense }) =>
    this.getBreakdownByFFYAndActivity({ ffy, index })
      .contains(expense)
      .parent()
      .nextUntil('.budget-table--row__header');

  verifyActvityBreakdown = ({ years, activityList, expected }) => {
    _.forEach(years, (ffy, ffyIndex) => {
      _.forEach(activityList, (activityName, index) => {
        const { expenses, totalComputableMedicaidCost } =
          expected[ffyIndex].activities[index];

        cy.get(`#activity-${index + 1}-${ffy}`).then(table => {
          cy.get(table).within(() => {
            _.forEach(expenses, (items, expense) => {
              cy.contains(expense).next().shouldBeCloseTo(items);
            });
            cy.contains(`Activity ${index + 1} Total Computable Medicaid Cost`)
              .next()
              .shouldBeCloseTo(totalComputableMedicaidCost);
          });
        });
      });
    });
  };

  // Summary Budget Table
  verifySummaryBudgetTables = ({ years, expected, expectedTotals }) => {
    _.forEach(years, (ffy, index) => {
      const { programTypes } = expected[index];
      _.forEach(programTypes, (item, type) => {
        cy.get(`[data-cy="summaryBudget${type}"]`)
          .eq(index)
          .then(table => {
            cy.get(table)
              .getEAPDTable()
              .then(tableData => {
                expect(tableData).to.deep.include(item);
              });
          });
      });
    });

    cy.get('[data-cy="summaryBudgetTotals"]').then(table => {
      cy.get(table)
        .getEAPDTable()
        .then(tableData => {
          expect(tableData).to.deep.include(expectedTotals);
        });
    });
  };

  // Quarterly Federal Share - QFS
  verifyQuarterlyFederalShareByActivity = ({ years, expected }) => {
    _.forEach(years, (ffy, index) => {
      const { programTypes } = expected[index];
      _.forEach(programTypes, (item, type) => {
        if (type === 'HIT and HIE') {
          cy.get('[data-cy="QFSTable"]')
            .eq(index)
            .then(table => {
              cy.get(table)
                .getEAPDTable()
                .then(tableData => {
                  expect(tableData).to.deep.include(item);
                });
            });
        } else if (type === 'MMIS') {
          cy.get('[data-cy="QFSTable"]')
            .eq(index + years.length)
            .then(table => {
              cy.get(table)
                .getEAPDTable()
                .then(tableData => {
                  expect(tableData).to.deep.include(item);
                });
            });
        }
      });
    });
  };

  verifyQuarterlyFederalShareByTotals = ({
    expectedHITandHIETotal,
    expectedMMISTotal
  }) => {
    cy.get('[data-cy="QFSTotals"]')
      .eq(0)
      .then(table => {
        cy.get(table)
          .getEAPDTable()
          .then(tableData => {
            expect(tableData).to.deep.include(expectedHITandHIETotal);
          });
      });

    cy.get('[data-cy="QFSTotals"]')
      .eq(1)
      .then(table => {
        cy.get(table)
          .getEAPDTable()
          .then(tableData => {
            expect(tableData).to.deep.include(expectedMMISTotal);
          });
      });
  };

  // Estimated Quarterly Incentive Payments - EQIP
  fillInEQIPFormByFFY = ({ years, expected }) => {
    _.forEach(years, (ffy, index) => {
      const ffyValues = expected[index];
      cy.get('[data-cy="EQIPTable"]') // Could fail here
        .eq(index)
        .within(() => {
          _.forEach(ffyValues, (equipValues, type) => {
            cy.contains(type)
              .parent()
              .within(row => {
                _.forEach(equipValues, (quarterValue, quarterIndex) => {
                  if (quarterIndex === equipValues.length - 1) {
                    cy.get('[data-cy="subtotal"]').shouldBeCloseTo(
                      quarterValue
                    );
                  } else {
                    cy.get(row)
                      .find('input')
                      .eq(quarterIndex)
                      .type(quarterValue);
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
        cy.get('[data-cy="EQIPTable"]')
          .eq(index)
          .within(table => {
            cy.get(table)
              .getEAPDTable()
              .then(tableData => {
                expect(tableData[type]).to.deep.include(typeValues);
              });
          });
      });
    });
  };
}

export default ProposedBudgetPage;
