/* eslint-disable radix */
class BudgetPage {
  addCommas = string => {
    const converted = string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return converted;
  };

  checkTotalComputableMedicaidCost = expectedValue => {
    const convert = this.addCommas(expectedValue);
    cy.contains('Total Computable Medicaid Cost')
      .parent()
      .should('contain', `$${convert}`);
  };

  checkActivityTotalCostTable = (activityValue, otherFundingValue, index) => {
    const medicaidValue = activityValue - otherFundingValue;
    const converted = this.addCommas(activityValue);
    const converted2 = this.addCommas(otherFundingValue);
    cy.get('[class="budget-table activity-budget-table"]')
      .eq(index)
      .within(() => {
        cy.contains('Activity Total Cost')
          .parent()
          .should('contain', `$${converted}`);
        cy.contains('Other Funding')
          .parent()
          .should('contain', `$${converted2}`);
        this.checkTotalComputableMedicaidCost(medicaidValue);
      });
  };

  checkSubtotalTable = (title, otherFundingAmount, keyPersonnelAmount) => {
    let subtotal;
    if (title === 'State Staff') {
      cy.contains(title)
        .parent()
        .next()
        .should('contain', `$${keyPersonnelAmount}`);
      cy.contains('Other Funding Amount')
        .parent()
        .should('contain', `$${otherFundingAmount}`);
      subtotal = otherFundingAmount + keyPersonnelAmount;
    } else {
      cy.contains(title)
        .parent()
        .next()
        .should('contain', `$${otherFundingAmount}`);
      subtotal = otherFundingAmount;
    }

    cy.contains(`${title} Subtotal`).parent().should('contain', `$${subtotal}`);
  };

  checkTableRow = (title, expectedValue, numFTEs) => {
    cy.contains(title)
      .parent()
      .within(() => {
        cy.contains(`$${expectedValue}`).should('exist');
        if (Number.isInteger(numFTEs)) {
          cy.contains(`${numFTEs} FTE`).should('exist');
        }
      });
  };

  checkSplitFunctionality = () => {
    cy.get('[class="ds-c-field"]').parent().click();
    cy.contains('90-10').should('exist');
    cy.contains('75-25').should('exist');
    cy.contains('50-50').should('exist');

    cy.get('[class="ds-c-field"]')
      .find(':selected')
      .should('have.value', '90-10');
  };

  costSplitTableRow = (fedOrState, split, value, total) => {
    const convertedVal = this.addCommas(value);
    const convertedTotal = this.addCommas(total);

    cy.contains(fedOrState)
      .parent()
      .within(() => {
        cy.get('[class="budget-table--number"]')
          .eq(0)
          .should('contain', `$${convertedVal}`);
        cy.get('[class="budget-table--number ds-u-padding--0"]').should(
          'have.text',
          '×'
        );
        cy.get('[class="budget-table--number ds-u-text-align--left"]').should(
          'contain',
          `${split}%`
        );
        cy.get('[class="budget-table--number"]').eq(1).should('contain', '=');
        cy.get('[class="budget-table--number"]')
          .eq(2)
          .should('contain', `$${convertedTotal}`);
      });
  };

  checkCostSplitTable = (federal, state, expectedMedicaid) => {
    const fedTotal = federal * 0.01 * expectedMedicaid;
    const stateTotal = state * 0.01 * expectedMedicaid;

    if (fedTotal + stateTotal !== expectedMedicaid) {
      throw new Error('Activity Table Calculation Failure');
    }

    this.checkTotalComputableMedicaidCost(expectedMedicaid);
    this.costSplitTableRow(
      'Federal Share',
      federal,
      expectedMedicaid,
      fedTotal
    );
    this.costSplitTableRow('State Share', state, expectedMedicaid, stateTotal);
  };

  checkFFYtotals = (
    years,
    activityName,
    totalCost,
    otherFundingCost,
    medicaidCost,
    split,
    federalShare,
    state,
    stateShare
  ) => {
    cy.contains(`FFY ${years[0]}-${years[years.length - 1]} Totals`)
      .next()
      .within(() => {
        cy.contains(`${activityName} activity is $${totalCost}`).should(
          'exist'
        );
        cy.contains(`other funding of $${otherFundingCost}`).should('exist');
        cy.contains(`Medicaid cost is $${medicaidCost}`).should('exist');
        cy.contains(split).should('exist');
        cy.contains(`federal share of $${federalShare}`).should('exist');
        cy.contains(`${state} share of $${stateShare}`).should('exist');

        for (let i = 0; i < years.length; i += 1) {
          cy.contains(years[i]).should('exist');
        }
      });
  };

  checkSubtotal = expectedValue => {
    cy.get('[class="budget-table--number budget-table--subtotal"]').should(
      'contain',
      expectedValue
    );
  };

  quarterTableInputRow = (
    row,
    defaultOrExport,
    expectedValue,
    expectedSubtotal
  ) => {
    cy.contains(row)
      .parent()
      .within(() => {
        if (defaultOrExport === 'default') {
          for (let i = 0; i < 4; i += 1) {
            cy.get('[class="ds-c-field budget-table--input__number"]')
              .eq(i)
              .should('have.value', expectedValue);
          }
        } else {
          for (let i = 0; i < 4; i += 1) {
            cy.get('[class="budget-table--number"]')
              .eq(i)
              .should('contain', `${expectedValue} %`);
          }
        }
        this.checkSubtotal(`+${expectedSubtotal}%`);
      });
  };

  quarterTableSubtotalRow = (row, expectedValue, expectedSubtotal) => {
    cy.contains(row)
      .parent()
      .next()
      .within(() => {
        for (let i = 0; i < 4; i += 1) {
          cy.get('[class="budget-table--number"]')
            .eq(i)
            .should('contain', `$${expectedValue}`);
        }
        this.checkSubtotal(`$${expectedSubtotal}`);
      });
  };

  quarterTableBottomRow = (expectedValue, expectedSubtotal) => {
    cy.contains('Total Enhanced FFP')
      .parent()
      .within(() => {
        for (let i = 0; i < 4; i += 1) {
          cy.get('[class="budget-table--number budget-table--total"]')
            .eq(i)
            .should('contain', `$${expectedValue}`);
        }
        this.checkSubtotal(`$${expectedSubtotal}`);
      });
  };

  checkQuarterTable = (defaultOrExport, expectedValue, expectedSubtotal) => {
    this.quarterTableInputRow(
      'State Staff and Expenses (In-House Costs)',
      defaultOrExport,
      expectedValue,
      expectedSubtotal
    );
    this.quarterTableSubtotalRow(
      'State Staff and Expenses (In-House Costs)',
      expectedValue,
      expectedSubtotal
    );

    this.quarterTableInputRow(
      'Private Contractor Costs',
      defaultOrExport,
      expectedValue,
      expectedSubtotal
    );
    this.quarterTableSubtotalRow(
      'Private Contractor Costs',
      expectedValue,
      expectedSubtotal
    );

    this.quarterTableBottomRow(expectedValue, expectedSubtotal);
  };

  // Indexes for subtotals
  checkSubtotalRows = (year, num) => {
    cy.findAllByText(`Activity ${num} Budget for FFY ${year}`)
      .parent()
      .within(() => {
        cy.get('[data-cy="subtotal"]').should($td => {
          const staffTotal = this.convertStringToNum($td.eq(0).text());
          const expensesTotal = this.convertStringToNum($td.eq(1).text());
          const contractorTotal = this.convertStringToNum($td.eq(2).text());

          const calculatedTotal = staffTotal + expensesTotal + contractorTotal;

          const expectedMedicaidTotal = this.convertStringToNum(
            $td.eq(3).text()
          );

          if (calculatedTotal !== expectedMedicaidTotal) {
            throw new Error('Subtotal rows do not add up');
          }
        });
      });
  };

  convertStringToNum = string => {
    const minusDollar = string.replace(/\$/g, '');
    const minusCommas = minusDollar.replace(/,/g, '');
    return parseInt(minusCommas);
  };

  computeFFYtotal = (staff, expenses, contractor) => {
    return staff + expenses + contractor;
  };

  checkEachQuarterSubtotal = () => {
    cy.get('[class="budget-table"]').within(() => {
      for (let i = 0; i < 4; i += 1) {
        cy.get('[data-cy="subtotal"]').should($el => {
          const subtotal = this.convertStringToNum($el.eq(i).text());
          const subtotal2 = this.convertStringToNum($el.eq(i + 4).text());

          const sum = this.convertStringToNum($el.eq(i + 8).text());

          if (subtotal + subtotal2 !== sum) {
            throw new Error(`Quarter ${i + 1} does not add up`);
          }
        });
      }
    });
  };
}

export default BudgetPage;
