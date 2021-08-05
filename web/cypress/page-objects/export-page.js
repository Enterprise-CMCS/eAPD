class ExportPage {
  // eslint-disable-next-line class-methods-use-this
  goToExportView() {
    cy.contains('Export and Submit').click();
    cy.contains('Continue to Review').click();
  }

  // eslint-disable-next-line class-methods-use-this
  checkExecutiveSummary(
    activities,
    years,
    dateRange,
    totalCost,
    medicaidCost,
    federalShare
  ) {
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
  }

  // eslint-disable-next-line class-methods-use-this
  checkActivityList(activities) {
    cy.findAllByText('Activities')
      .next()
      .within(() => {
        for (let i = 0; i < activities.length; i += 1) {
          cy.contains(
            `${i + 1}. ${activities[i][0]} | ${activities[i][1]}`
          ).should('exist');
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  checkActivityOverview(
    desc,
    start,
    end,
    detailedDesc,
    supportingJustifications,
    supports,
    doesNotSupport
  ) {
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
  }

  // eslint-disable-next-line class-methods-use-this
  checkOutcomesAndMilestones(
    emptyOrFilled,
    outcomeName,
    metricName,
    milestoneName,
    dateRange
  ) {
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
  }

  // eslint-disable-next-line class-methods-use-this
  checkStateExpenses(emptyOrFilled) {
    if (emptyOrFilled === 'empty') {
      cy.contains('State staff')
        .next()
        .should('contain', 'Other state expenses');
      cy.contains('Other state expenses')
        .next()
        .should('contain', 'Private Contractor Costs');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkPrivateContractorCosts(emptyOrFilled, name, desc, dateRange, totalCost) {
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
  }

  // eslint-disable-next-line class-methods-use-this
  checkCostAllocation(desc) {
    cy.contains('Description of Cost Allocation Methodology')
      .next()
      .should('have.text', desc);
  }

  // eslint-disable-next-line class-methods-use-this
  checkOtherFunding(year, expectedText, expectedValue) {
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
  }

  // eslint-disable-next-line class-methods-use-this
  checkRowTotals(otherFundingValue, medicaidValue) {
    cy.findAllByText('Other Funding')
      .parent()
      .should('contain', `$${otherFundingValue}`);

    cy.findAllByText('Total Computable Medicaid Cost')
      .parent()
      .should('contain', `$${medicaidValue}`);
  }
}

export default ExportPage;
