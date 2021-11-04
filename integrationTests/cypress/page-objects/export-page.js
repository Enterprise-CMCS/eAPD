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
    this.prevActYears.forEach(prevActYear => {
      cy.get(
        `[headers="prev_act_hithie_row_${prevActYear} ` +
          `prev_act_hithie_total prev_act_hithie_total_approved"]`
      )
        .invoke('text')
        .then(text => {
          this.expenditures.hithie.approved.push(extractNumber(text));
        });
      cy.get(
        `[headers="prev_act_hithie_row_${prevActYear} ` +
          `prev_act_hithie_federal prev_act_hithie_federal_approved"]`
      )
        .invoke('text')
        .then(text => {
          this.expenditures.hithie.FFP.push(extractNumber(text));
        });
      cy.get(
        `[headers="prev_act_hithie_row_${prevActYear} ` +
          `prev_act_hithie_federal prev_act_hithie_federal_actual"]`
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

  checkActivityHeader = (name = 'Untitled', num) => {
    cy.findByRole('heading', { name: /^Activities$/i })
      .parent()
      .contains(`Activity ${num}: ${name}`)
      .should('exist');
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

  checkActivityOverview = (
    desc,
    start,
    end,
    detailedDesc,
    supportingJustifications,
    supports,
    doesNotSupport
  ) => {
    cy.findByText(/Provide a short overview of the activity/i)
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
      cy.contains('Milestones')
        .next()
        .should('contain', 'Milestone not specified');
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
      cy.contains('Other state expenses');
      // This is no longer the next element
      //   .next()
      //   .should('contain', 'Private Contractor Costs');
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
        .should('contain', 'Private Contractor or Vendor Name not specified');
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
    cy.contains('h3', `FFY ${year}`)
      .next()
      .should('contain', 'Other Funding Description')
      .next()
      .should('have.text', expectedText);

    cy.contains('h3', `FFY ${year}`)
      .next()
      .next()
      .next()
      .should('contain', `$${expectedValue}`);
  };

  checkRowTotals = (otherFundingValue, medicaidValue) => {
    cy.contains('td', 'Other Funding')
      .parent()
      .should('contain', `$${otherFundingValue}`);

    cy.contains('td', 'Total Computable Medicaid Cost')
      .parent()
      .should('contain', `$${medicaidValue}`);
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
      .last()
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
}

export default ExportPage;
