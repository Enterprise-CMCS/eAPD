/* eslint class-methods-use-this: "off" */

// Extract just the numbers from an input string
const extractNumber = str => {
  return parseInt(str.replace(/\D/g, ''), 10);
};

class ExportPage {
  // Get the years referenced by previous activities
  prevActYears = [];

  // Get the numerical values of the previous activities' expenditures
  expenditures = {
    hithie: {
      approved: [],
      FFP: [],
      actual: []
    },

    mmis90: {
      approved: [],
      FFP: [],
      actual: []
    },

    mmis75: {
      approved: [],
      FFP: [],
      actual: []
    },

    mmis50: {
      approved: [],
      FFP: [],
      actual: []
    }
  };

  getPrevActYears() {
    cy.findByRole('heading', { name: /Results of Previous Activities/i })
      .parent()
      .contains('HIT + HIE Federal share 90% FFP')
      .parent()
      .find('[headers="prev_act_hit_header_ffy"]')
      .each($el => {
        this.prevActYears.push(extractNumber($el.text()));
      });
  }

  getPrevActExpenditureVals() {
    for (let i = 0; i < this.prevActYears.length; i += 1) {
      cy.get(
        `[headers="prev_act_hithie_row_${this.prevActYears[i]} ` +
          `prev_act_hithie_total prev_act_hithie_total_approved"]`
      )
        .invoke('text')
        .then(text => {
          this.expenditures.hithie.approved.push(extractNumber(text));
        });
      cy.get(
        `[headers="prev_act_hithie_row_${this.prevActYears[i]} ` +
          `prev_act_hithie_federal prev_act_hithie_federal_approved"]`
      )
        .invoke('text')
        .then(text => {
          this.expenditures.hithie.FFP.push(extractNumber(text));
        });
      cy.get(
        `[headers="prev_act_hithie_row_${this.prevActYears[i]} ` +
          `prev_act_hithie_federal prev_act_hithie_federal_actual"]`
      )
        .invoke('text')
        .then(text => {
          this.expenditures.hithie.actual.push(extractNumber(text));
        });

      const mmisSharePercents = [90, 75, 50];

      Object.values(mmisSharePercents).forEach(sharePercent => {
        cy.get(
          `[headers="prev_act_mmis_row_${this.prevActYears[i]} ` +
            `prev_act_mmis${sharePercent}_total ` +
            `prev_act_mmis${sharePercent}_total_approved"]`
        )
          .invoke('text')
          .then(text => {
            this.expenditures[`mmis${sharePercent}`].approved.push(
              extractNumber(text)
            );
          });
        cy.get(
          `[headers="prev_act_mmis_row_${this.prevActYears[i]} ` +
            `prev_act_mmis${sharePercent}_federal ` +
            `prev_act_mmis${sharePercent}_federal_approved"]`
        )
          .invoke('text')
          .then(text => {
            this.expenditures[`mmis${sharePercent}`].FFP.push(
              extractNumber(text)
            );
          });
        cy.get(
          `[headers="prev_act_mmis_row_${this.prevActYears[i]} ` +
            `prev_act_mmis${sharePercent}_federal ` +
            `prev_act_mmis${sharePercent}_federal_actual"]`
        )
          .invoke('text')
          .then(text => {
            this.expenditures[`mmis${sharePercent}`].actual.push(
              extractNumber(text)
            );
          });
      });
    }
  }

  verifyPrevActInputs(expendituresTest) {
    const mmisSharePercents = [90, 75, 50];
    const expenditureTypes = ['approved', 'actual'];

    for (let i = 0; i < this.prevActYears.length; i += 1) {
      Object.values(expenditureTypes).forEach(expenditureType => {
        cy.wrap(this.expenditures.hithie[expenditureType][i]).should(
          'eq',
          expendituresTest.hithie[expenditureType][i]
        );
      });

      Object.values(mmisSharePercents).forEach(sharePercent => {
        Object.values(expenditureTypes).forEach(expenditureType => {
          cy.wrap(
            this.expenditures[`mmis${sharePercent}`][expenditureType][i]
          ).should(
            'eq',
            expendituresTest[`mmis${sharePercent}`][expenditureType][i]
          );
        });
      });
    }
  }

  verifyPrevActFFY() {
    const mmisSharePercents = [90, 75, 50];

    for (let i = 0; i < this.prevActYears.length; i += 1) {
      // Assuming that HIT+HIE always has a share of 90%
      cy.wrap(this.expenditures.hithie.FFP[i]).should(
        'eq',
        Math.round(this.expenditures.hithie.approved[i] * 0.9)
      );

      Object.values(mmisSharePercents).forEach(sharePercent => {
        cy.wrap(this.expenditures[`mmis${sharePercent}`].FFP[i]).should(
          'eq',
          Math.round(
            (this.expenditures[`mmis${sharePercent}`].approved[i] *
              sharePercent) /
              100
          )
        );
      });
    }
  }

  verifyPrevActTotals() {
    const mmisSharePercents = [90, 75, 50];
    const expenditureTypes = ['FFP', 'actual'];
    const totals = { FFP: {}, actual: {} };

    Object.values(expenditureTypes).forEach(expenditureType => {
      // Calculate totals
      for (let i = 0; i < this.prevActYears.length; i += 1) {
        totals[expenditureType][this.prevActYears[i]] = 0;

        totals[expenditureType][
          this.prevActYears[i]
        ] += this.expenditures.hithie[expenditureType][i];

        Object.values(mmisSharePercents).forEach(sharePercent => {
          totals[expenditureType][this.prevActYears[i]] += this.expenditures[
            `mmis${sharePercent}`
          ][expenditureType][i];
        });
      }
    });

    // Check totals against what is on the page
    for (let i = 0; i < this.prevActYears.length; i += 1) {
      // Totals for approved FFP
      cy.get(
        `[headers="prev_act_total_row_${this.prevActYears[i]} ` +
          `prev_act_total_approved"]`
      )
        .invoke('text')
        .then(text => {
          const total = extractNumber(text);
          cy.wrap(total).should('eq', totals.FFP[this.prevActYears[i]]);
        });

      // Totals for actual expenditure
      cy.get(
        `[headers="prev_act_total_row_${this.prevActYears[i]} ` +
          `prev_act_total_actual"]`
      )
        .invoke('text')
        .then(text => {
          const total = extractNumber(text);
          cy.wrap(total).should('eq', totals.actual[this.prevActYears[i]]);
        });
    }
  }

  checkActivityHeader = (name, num) => {
    cy.contains(`Activity ${num} (${name})`).should('exist');
  };

  checkExecutiveSummary = (
    activities,
    years,
    dateRange,
    totalCost,
    medicaidCost,
    federalShare
  ) => {
    for (let i = 0; i < activities.length; i += 1) {
      cy.contains(`Activity ${i + 1}: ${activities[i][0]}`)
        .parent()
        .within(() => {
          cy.contains(dateRange).should('exist');
          cy.contains(`Total cost of activity: $${totalCost}`).should('exist');
          cy.contains(
            `Total Computable Medicaid Cost: $${medicaidCost} ($${federalShare} Federal share)`
          ).should('exist');

          // Need to figure out a way to pass in totals for each year
          for (let k = 0; k < years.length; k += 1) {
            cy.contains(
              `FFY ${years[k]}: $0 | Total Computable Medicaid Cost: $0 ($0 Federal share)`
            ).should('exist');
          }
        });
    }
  };

  checkActivityList = activities => {
    cy.findAllByText('Activities')
      .next()
      .within(() => {
        for (let i = 0; i < activities.length; i += 1) {
          cy.contains(
            `${i + 1}. ${activities[i][0]} | ${activities[i][1]}`
          ).should('exist');
        }
      });
  };

  checkActivityOverview = (
    desc,
    start,
    end,
    detailedDesc,
    supportingJustifications,
    supports,
    doesNotSupport
  ) => {
    cy.contains('Provide a short overview of the activity:')
      .next()
      .should('have.text', desc);
    cy.contains('Start date').parent().should('contain', start);
    cy.contains('End date').parent().should('contain', end);

    cy.contains('Activity Overview').next().should('have.text', detailedDesc);
    cy.contains('Supporting Justification')
      .next()
      .should('have.text', supportingJustifications);

    cy.contains('This activity supports')
      .parent()
      .next()
      .should('contain', supports);
    cy.contains('This activity does not support')
      .parent()
      .next()
      .should('contain', doesNotSupport);
  };

  checkOutcomesAndMilestones = (
    emptyOrFilled,
    outcomeName,
    metricName,
    milestoneName,
    dateRange
  ) => {
    if (emptyOrFilled === 'empty') {
      cy.contains('Outcomes and Metrics')
        .next()
        .next()
        .should('contain', 'Milestones');
      cy.contains('Milestones').next().should('contain', 'State staff');
    } else {
      cy.contains('Outcomes and Metrics')
        .next()
        .should('contain', outcomeName)
        .next()
        .should('contain', metricName);

      cy.contains('Milestones')
        .next()
        .should('contain', milestoneName)
        .next()
        .should(dateRange);
    }
  };

  checkStateExpenses = emptyOrFilled => {
    if (emptyOrFilled === 'empty') {
      cy.contains('State staff')
        .next()
        .should('contain', 'Other state expenses');
      cy.contains('Other state expenses')
        .next()
        .should('contain', 'Private Contractor Costs');
    }
  };

  checkPrivateContractorCosts = (
    emptyOrFilled,
    name,
    desc,
    dateRange,
    totalCost
  ) => {
    if (emptyOrFilled === 'empty') {
      cy.contains('Private Contractor Costs')
        .next()
        .should('contain', 'Cost Allocation');
    } else {
      cy.contains('Private Contractor Costs')
        .next()
        .should('contain', name)
        .next()
        .next()
        .should('contain', desc)
        .next()
        .within(() => {
          cy.contains(dateRange).should('exist');
          cy.contains(totalCost).should('exist');
          // still need to get individual year costs
        });
    }
  };

  checkCostAllocation = desc => {
    cy.contains('Description of Cost Allocation Methodology')
      .next()
      .should('have.text', desc);
  };

  checkOtherFunding = (year, expectedText, expectedValue) => {
    cy.contains(`FFY ${year}`)
      .next()
      .should('contain', 'Other Funding Description')
      .next()
      .should('have.text', expectedText);

    cy.contains(`FFY ${year}`)
      .next()
      .next()
      .next()
      .should('contain', `$${expectedValue}`);
  };

  checkRowTotals = (otherFundingValue, medicaidValue) => {
    cy.findAllByText('Other Funding')
      .parent()
      .should('contain', `$${otherFundingValue}`);

    cy.findAllByText('Total Computable Medicaid Cost')
      .parent()
      .should('contain', `$${medicaidValue}`);
  };

  checkActivityNameAtEnd = name => {
    cy.contains(`The total cost of the ${name}`).should('exist');
  };
}

export default ExportPage;
