/* eslint class-methods-use-this: "off" */
import { extractNumber, addCommas, getDateRange } from './helper.js';

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
      .find('[data-cy="yearRow"]')
      .each($el => {
        this.prevActYears.push(extractNumber($el.text()));
      });
  }

  getPrevActExpenditureVals() {
    this.prevActYears.forEach(prevActYear => {
      cy.get(
        `[headers="prev_act_hithie90_row_${prevActYear} ` +
          `prev_act_hithie90_total prev_act_hithie90_total_approved"]`
      )
        .invoke('text')
        .then(text => {
          this.expenditures.hithie.approved.push(extractNumber(text));
        });
      cy.get(
        `[headers="prev_act_hithie90_row_${prevActYear} ` +
          `prev_act_hithie90_federal prev_act_hithie90_federal_approved"]`
      )
        .invoke('text')
        .then(text => {
          this.expenditures.hithie.FFP.push(extractNumber(text));
        });
      cy.get(
        `[headers="prev_act_hithie90_row_${prevActYear} ` +
          `prev_act_hithie90_federal prev_act_hithie90_federal_actual"]`
      )
        .invoke('text')
        .then(text => {
          this.expenditures.hithie.actual.push(extractNumber(text));
        });

      const mmisSharePercents = [90, 75, 50];

      Object.values(mmisSharePercents).forEach(sharePercent => {
        cy.get(
          `[headers="prev_act_mmis_row_${prevActYear} ` +
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
          `[headers="prev_act_mmis_row_${prevActYear} ` +
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
          `[headers="prev_act_mmis_row_${prevActYear} ` +
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
    });
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

        totals[expenditureType][this.prevActYears[i]] +=
          this.expenditures.hithie[expenditureType][i];

        Object.values(mmisSharePercents).forEach(sharePercent => {
          totals[expenditureType][this.prevActYears[i]] +=
            this.expenditures[`mmis${sharePercent}`][expenditureType][i];
        });
      }
    });

    // Check totals against what is on the page
    this.prevActYears.forEach(prevActYear => {
      // Totals for approved FFP
      cy.get(
        `[headers="prev_act_total_row_${prevActYear} ` +
          `prev_act_total_approved"]`
      )
        .invoke('text')
        .then(text => {
          const total = extractNumber(text);
          cy.wrap(total).should('eq', totals.FFP[prevActYear]);
        });

      // Totals for actual expenditure
      cy.get(
        `[headers="prev_act_total_row_${prevActYear} ` +
          `prev_act_total_actual"]`
      )
        .invoke('text')
        .then(text => {
          const total = extractNumber(text);
          cy.wrap(total).should('eq', totals.actual[prevActYear]);
        });
    });
  }

  // eslint-disable-next-line default-param-last
  checkActivityHeader = (name = 'Untitled', num) => {
    cy.findByRole('heading', { name: /^Activities$/i })
      .parent()
      .contains(`Activity ${num}: ${name}`)
      .should('exist');
  };

  checkExecutiveSummary = ({
    activities,
    years,
    dateRange,
    totalCost,
    medicaidCost,
    federalShare
  }) => {
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
          years.forEach(year => {
            cy.contains(
              `FFY ${year}: $0 | Total Computable Medicaid Cost: $0 ($0 Federal share)`
            ).should('exist');
          });
        });
    }
  };

  checkActivityList = activities => {
    cy.findAllByText('Activities')
      .next()
      .within(() => {
        activities.forEach((activity, i) => {
          cy.contains(`${i + 1}. ${activity[0]} | ${activity[1]}`).should(
            'exist'
          );
        });
      });
  };

  checkActivityOverview = ({
    shortOverview,
    startDate,
    endDate,
    detailedDescription,
    supportingJustifications,
    supportsMedicaid,
    doesNotSupportsMedicaid
  }) => {
    cy.findByText(/Provide a short overview of the activity/i)
      .next()
      .should('have.text', shortOverview);
    cy.contains('Start date').parent().should('contain', startDate);
    cy.contains('End date').parent().should('contain', endDate);

    cy.contains('Activity Overview')
      .next()
      .should('have.text', detailedDescription);
    cy.contains('Supporting Justification')
      .next()
      .should('have.text', supportingJustifications);

    cy.contains('This activity supports')
      .parent()
      .next()
      .should('contain', supportsMedicaid);
    cy.contains('This activity does not support')
      .parent()
      .next()
      .should('contain', doesNotSupportsMedicaid);
  };

  checkMilestones = ({ milestone, milestoneCompletionDate } = {}) => {
    if (!milestone) {
      cy.contains('Milestones')
        .next()
        .should('contain', 'Outcomes and Metrics');
    } else {
      cy.contains(milestone)
        .should('exist')
        .parent()
        .next()
        .should('contain', milestoneCompletionDate);
    }
  };

  checkOutcomes = ({ outcome, metrics } = {}) => {
    if (!outcome) {
      cy.contains('Milestones')
        .next()
        .should('contain', 'Outcomes and Metrics')
        .next()
        .should('contain', 'State staff');
    } else {
      cy.contains(outcome)
        .should('exist')
        .next()
        .within(() => {
          metrics.forEach((metric, index) => {
            cy.contains(`${index + 1}. ${metric}`).should('exist');
          });
        });
    }
  };

  checkStateStaff = ({ staff, years } = {}) => {
    if (!staff) {
      cy.contains(/State staff/i)
        .next()
        .should('contain', 'Other state expenses');
    } else {
      staff.forEach(({ title, description, costs, ftes }, index) => {
        cy.contains(`${index + 1}. ${title}`)
          .should('exist')
          .parent()
          .next()
          .should('contain', description)
          .next()
          .within(() => {
            years.forEach((year, i) => {
              cy.contains(
                `FFY ${year} Cost: $${addCommas(costs[i])} | FTEs: ${
                  ftes[i]
                } | Total: $${addCommas(costs[i] * ftes[i])}`
              ).should('exist');
            });
          });
      });
    }
  };

  checkStateExpenses = ({ expenses, years } = {}) => {
    if (!expenses) {
      cy.contains('Other state expenses')
        .next()
        .should('contain', 'Private Contractor Costs');
    } else {
      expenses.forEach(({ category, description, costs }, index) => {
        cy.contains(`${index + 1}. ${category}`)
          .should('exist')
          .parent()
          .next()
          .should('have.text', description)
          .next()
          .within(() => {
            years.forEach((year, i) => {
              cy.contains(`FFY ${year} Cost: $${addCommas(costs[i])}`).should(
                'exist'
              );
            });
          });
      });
    }
  };

  checkPrivateContractorCosts = ({ contractors, years }) => {
    if (!contractors) {
      cy.contains('Private Contractor Costs')
        .next()
        .should('contain', 'Cost Allocation');
    } else {
      contractors.forEach(
        ({ name, description, start, end, totalCosts, FFYcosts }, index) => {
          cy.contains(`${index + 1}. ${name}`)
            .should('exist')
            .parent()
            .next()
            .next()
            .should('have.text', description)
            .next()
            .within(() => {
              const dateRange = getDateRange(start, end);

              cy.contains('Full Contract Term:')
                .parent()
                .should('contain', dateRange);
              cy.contains('Total Contract Cost:')
                .next()
                .should('contain', addCommas(totalCosts));
              years.forEach((year, i) => {
                if (Array.isArray(FFYcosts[i])) {
                  cy.contains(
                    `FFY ${year} Cost: $${addCommas(
                      addCommas(FFYcosts[i][0] * FFYcosts[i][1])
                    )}`
                  )
                    .should('exist')
                    .should('contain', `Number of hours: ${FFYcosts[i][0]}`)
                    .should('contain', `Hourly rate: $${FFYcosts[i][1]}`);
                } else {
                  cy.contains(
                    `FFY ${year} Cost: $${addCommas(FFYcosts[i])}`
                  ).should('exist');
                }
              });
            });
        }
      );
    }
  };

  checkCostAllocationAndOtherFunding = ({ years, costAllocation }) => {
    cy.contains('Description of Cost Allocation Methodology')
      .next()
      .should('have.text', costAllocation.description);

    years.forEach((year, i) => {
      cy.contains('h3', `FFY ${year}`).next().as('parent');
      cy.get('@parent')
        .contains('Other Funding Description')
        .next()
        .should('have.text', costAllocation.FFYdescriptions[i])
        .next()
        .should('contain', 'Other Funding Amount:')
        .next()
        .should('contain', `$${addCommas(costAllocation.costs[i])}`);
    });
  };

  checkActivityNameAtEnd = (name = 'Untitled') => {
    cy.contains(`The total cost of the ${name}`).should('exist');
  };

  // Activity Schedule Summary
  // Activity Schedule Summary - Schedule Summary by Activity
  getAllActivityScheduleOverviews = () => {
    return cy
      .contains('thead', /Activity List Overview/i)
      .parent()
      .find('tbody>tr');
  };

  getActivityScheduleOverview = index => {
    return this.getAllActivityScheduleOverviews().eq(index);
  };

  // Assumes the name is in the first column of the overview
  getActivityScheduleOverviewName = index => {
    return this.getActivityScheduleOverview(index)
      .find('td')
      .first()
      .invoke('text');
  };

  getActivityScheduleOverviewNameList = () => {
    const activityNames = [];
    this.getAllActivityScheduleOverviews().each($el => {
      cy.wrap($el)
        .find('td')
        .first()
        .invoke('text')
        .then(text => {
          activityNames.push(text);
        });
    });
    return activityNames;
  };

  // Assumes dates are in the last column
  getActivityScheduleOverviewDates = index => {
    return this.getActivityScheduleOverview(index)
      .find('td')
      .last()
      .invoke('text');
  };

  // Activity Schedule Summary - Milestone Tables by Activity
  // Get the milestone tables for all activities.
  getAllActivityScheduleMilestoneTables = () => {
    return cy
      .findByRole('heading', { name: /^Milestone Tables by Activity$/i })
      .nextAll('table');
  };

  // Return all milestone rows for a given activity
  getAllActivityScheduleMilestones = activityIndex => {
    return this.getAllActivityScheduleMilestoneTables()
      .eq(activityIndex)
      .find('tbody>tr'); // returns undefined if no milestone was added
  };

  // Return the name of an activity's milestone table
  // Assumes the name is the last row in the table header
  getActivityScheduleMilestoneTableName = activityIndex => {
    return this.getAllActivityScheduleMilestoneTables()
      .eq(activityIndex)
      .find('thead>tr')
      .first()
      .invoke('text');
  };

  // Return the name of an entry in an activity's milestone table
  // Assumes names are in the last column
  getActivityScheduleMilestoneName = (activityIndex, milestoneIndex) => {
    return this.getAllActivityScheduleMilestones(activityIndex)
      .eq(milestoneIndex)
      .children()
      .first()
      .invoke('text');
  };

  // Return the dates of an entry in an activity's milestone table
  // Assumes dates are in the last column
  getActivityScheduleMilestoneDates = (activityIndex, milestoneIndex) => {
    return this.getAllActivityScheduleMilestones(activityIndex)
      .eq(milestoneIndex)
      .children()
      .last()
      .invoke('text');
  };

  // Proposed Budget

  // assert if a link with the given text and URL reference exists here
  assurancesComplianceAssertLink = (category, regulation, ref) => {
    cy.findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .findByRole('heading', { name: category })
      .parent()
      .contains(regulation)
      .invoke('attr', 'href')
      .then(href => {
        cy.wrap(href).should('eq', ref);
      });
  };

  // Given a regulation name, get the response entered by the user
  assurancesComplianceResponse = (category, regulation) => {
    return cy
      .findByRole('heading', { name: /Assurances and Compliance/i })
      .parent()
      .findByRole('heading', { name: category })
      .parent()
      .contains('a', regulation)
      .parent()
      .next()
      .invoke('text');
  };

  checkExecutiveSummaryTotalCostSummary = ({
    years,
    totalCost,
    totalTotalMedicaidCost,
    totalFederalShare,
    ffys
  }) => {
    cy.findByRole('heading', { level: 2, name: /Executive Summary/i })
      .parent()
      .findByRole('heading', { name: /Total Cost/i })
      .next()
      .within(() => {
        cy.contains('Federal Fiscal Years requested:')
          .parent()
          .should('contain', years.join(', '));
        cy.contains('Total Computable Medicaid Cost:')
          .parent()
          .siblings($el => {
            cy.wrap($el[1]).shouldBeCloseTo(totalTotalMedicaidCost);
            cy.wrap($el[3]).shouldBeCloseTo(totalFederalShare);
          });
        cy.contains('Total funding request:').next().shouldBeCloseTo(totalCost);
        ffys.forEach(
          (
            {
              activityTotalCosts,
              totalComputableMedicaidCost,
              federalShareAmount
            },
            i
          ) => {
            cy.contains('strong', `FFY ${years[i]}`)
              .parent()
              .siblings($el => {
                cy.wrap($el[1]).shouldBeCloseTo(activityTotalCosts);
                cy.wrap($el[4]).shouldBeCloseTo(totalComputableMedicaidCost);
                cy.wrap($el[6]).shouldBeCloseTo(federalShareAmount);
              });
          }
        );
      });
  };

  checkExecutiveSummaryActivitySummary = ({
    index,
    years,
    activityName,
    shortOverview,
    startDate,
    endDate,
    activityTotalCosts,
    totalComputableMedicaidCost,
    federalShareAmount,
    ffys
  }) => {
    cy.findByRole('heading', { level: 2, name: /Executive Summary/i })
      .parent()
      .contains('h4', `Activity ${index + 1}: ${activityName}`)
      .next()
      .within(() => {
        if (shortOverview) {
          cy.contains(shortOverview);
        }
        cy.contains('Start Date - End Date:')
          .parent()
          .should('contain', getDateRange(startDate, endDate));
        cy.contains('Total Cost of Activity:')
          .next()
          .shouldBeCloseTo(activityTotalCosts);
        cy.contains('Total Computable Medicaid Cost:')
          .parent()
          .siblings($el => {
            cy.wrap($el[1]).shouldBeCloseTo(totalComputableMedicaidCost);
            cy.wrap($el[3]).shouldBeCloseTo(federalShareAmount);
          });
        ffys.forEach(
          (
            {
              activityTotalCosts: ffyATC,
              totalComputableMedicaidCost: ffyTCMC,
              federalShareAmount: ffyFSA
            },
            i
          ) => {
            cy.contains('strong', `FFY ${years[i]}`)
              .parent()
              .siblings($el => {
                cy.wrap($el[1]).shouldBeCloseTo(ffyATC);
                cy.wrap($el[4]).shouldBeCloseTo(ffyTCMC);
                cy.wrap($el[6]).shouldBeCloseTo(ffyFSA);
              });
          }
        );
      });
  };

  getExecutiveSummaryProgramBudgetTableRow = ({ title, year }) => {
    cy.findByRole('heading', { level: 2, name: /Executive Summary/i })
      .parent()
      .contains('table', title)
      .as('table');
    if (year) {
      return cy.get('@table').contains(`FFY ${year}`).siblings();
    }
    return cy
      .get('@table')
      .contains(/^Total$/i)
      .siblings();
  };
}

export default ExportPage;
