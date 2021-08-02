/// <reference types="cypress" />

describe('checking default values in Activities section', function () {
  let apdUrl;
  let years = [];
  let activities = [['Program Administration', 'HIT']];

  before(function () {
    cy.useStateStaff();
    cy.findByRole('button', { name: /Create new/i }).click();
    // cy.get('[href="/apd/324"]').click();

    //Gets list of available years
    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );

    //Gets to the activity page
    for (let i = 0; i < 3; i++) {
      cy.contains('Continue').click();
    }

    cy.url().should('include', '/activities');
    cy.wait(500); //Gives time for webpage to load
    cy.location('pathname').then(pathname => (apdUrl = pathname));
  });

  beforeEach(function () {
    cy.useStateStaff(apdUrl);
  });

  const checkFFYtotals = activityName => {
    cy.then(() => {
      cy.contains(`FFY ${years[0]}-${years[years.length - 1]} Totals`)
        .next()
        .within(() => {
          cy.contains(`${activityName} activity is $0`).should('exist');
          cy.contains('other funding of $0').should('exist');
          cy.contains('Medicaid cost is $0').should('exist');
          cy.contains('90/10').should('exist');
          cy.contains('federal share of $0').should('exist');
          cy.contains('Alaska share of $0').should('exist');

          for (let i = 0; i < years.length; i++) {
            cy.contains(years[i]).should('exist');
          }
        });
    });
  };

  const checkSubtotalTable = (msg, subtotalMsg) => {
    cy.contains(msg).parent().next().should('contain', '$0');
    cy.contains(subtotalMsg).parent().should('contain', '$0');
  };

  const checkFFYbudgetTable = () => {
    checkSubtotalTable('State Staff', 'State Staff Subtotal');
    checkSubtotalTable('Other State Expenses', 'Other State Expenses Subtotal');
    checkSubtotalTable('Private Contractor', 'Private Contractor Subtotal');
    cy.contains('Total Computable Medicaid Cost')
      .parent()
      .should('contain', '$0');
  };

  const costSplitTable = (federal, state) => {
    cy.get('[class="data-entry-box ds-u-margin-bottom--5"]')
      .next()
      .within(() => {
        cy.contains('Total Computable Medicaid Cost')
          .parent()
          .should('contain', '$0');

        costSplitTableRow('Federal Share', federal);
        costSplitTableRow('State Share', state);
      });
  };

  const costSplitTableRow = (fedOrState, split) => {
    cy.contains(fedOrState)
      .parent()
      .within(() => {
        cy.get('[class="budget-table--number"]').eq(0).should('contain', '$0');
        cy.get('[class="budget-table--number ds-u-padding--0"]').should(
          'have.text',
          '×'
        );
        cy.get('[class="budget-table--number ds-u-text-align--left"]').should(
          'contain',
          split
        );
        cy.get('[class="budget-table--number"]').eq(1).should('contain', '=');
        cy.get('[class="budget-table--number"]').eq(2).should('contain', '$0');
      });
  };

  const quarterTableInputRow = (row, defaultOrExport) => {
    cy.contains(row)
      .parent()
      .within(() => {
        if (defaultOrExport === 'default') {
          for (let i = 0; i < 4; i++) {
            cy.get('[class="ds-c-field budget-table--input__number"]')
              .eq(i)
              .should('have.value', 0);
          }
        } else {
          for (let i = 0; i < 4; i++) {
            cy.get('[class="budget-table--number"]')
              .eq(i)
              .should('contain', '0 %');
          }
        }
        cy.get('[class="budget-table--number budget-table--subtotal"]').should(
          'contain',
          '+0%'
        );
      });
  };

  const quarterTableSubtotalRow = row => {
    cy.contains(row)
      .parent()
      .next()
      .within(() => {
        for (let i = 0; i < 4; i++) {
          cy.get('[class="budget-table--number"]')
            .eq(i)
            .should('contain', '$0');
        }
        cy.get('[class="budget-table--number budget-table--subtotal"]').should(
          'contain',
          '$0'
        );
      });
  };

  const quarterTableTotalRow = () => {
    cy.contains('Total Enhanced FFP')
      .parent()
      .within(() => {
        for (let i = 0; i < 4; i++) {
          cy.get('[class="budget-table--number budget-table--total"]')
            .eq(i)
            .should('contain', '$0');
        }

        cy.get('[class="budget-table--number budget-table--subtotal"]').should(
          'contain',
          '$0'
        );
      });
  };

  const quarterTabledefault = () => {
    quarterTableInputRow(
      'State Staff and Expenses (In-House Costs)',
      'default'
    );
    quarterTableSubtotalRow('State Staff and Expenses (In-House Costs)');

    quarterTableInputRow('Private Contractor Costs', 'default');
    quarterTableSubtotalRow('Private Contractor Costs');

    quarterTableTotalRow();
  };

  const quarterTableExport = () => {
    quarterTableInputRow('State Staff and Expenses (In-House Costs)', 'export');
    quarterTableSubtotalRow('State Staff and Expenses (In-House Costs)');

    quarterTableInputRow('Private Contractor Costs', 'export');
    quarterTableSubtotalRow('Private Contractor Costs');

    quarterTableTotalRow();
  };

  it('tests default values', function () {
    const checkDefaultDate = string => {
      cy.contains(string)
        .parent()
        .next('div')
        .within(() => {
          cy.findByLabelText('Month').should('have.value', '');
          cy.findByLabelText('Day').should('have.value', '');
          cy.findByLabelText('Year').should('have.value', '');
        });
    };

    const checkDeleteButton = (alert, heading, check) => {
      cy.contains(alert).should('not.exist');
      cy.contains('Delete').click();
      cy.contains(heading).should('exist');
      cy.contains('Cancel').click();
      cy.contains(heading).should('not.exist');
      cy.contains(alert).should('not.exist');
      cy.contains(check).should('exist');

      cy.contains('Delete').click();
      cy.contains(heading).should('exist');
      cy.get('[class="ds-c-button ds-c-button--danger"]').click();
      cy.contains(heading).should('not.exist');
      cy.contains(alert).should('exist');
      cy.contains(check).should('not.exist');
    };

    const checkFFYcosts = () => {
      cy.then(() => {
        for (let i = 0; i < years.length; i++) {
          cy.contains(`FFY ${years[i]} Cost: $0`).should('exist');
        }
      });
    };

    const checkTotalCostTable = () => {
      cy.contains('Activity Total Cost').parent().should('contain', '$0');
      cy.contains('Other Funding').parent().should('contain', '$0');
      cy.contains('Total Computable Medicaid Cost')
        .parent()
        .should('contain', '$0');
    };

    cy.url().should('include', '/activities');

    //Tests Continue button on Activities Dashboard
    cy.contains('Continue').click();
    cy.url().should('contain', '/schedule-summary');
    cy.contains('Back').click();
    cy.url().should('include', '/activities');

    cy.contains('Activity 1: Program Administration (HIT)').should('exist');
    cy.contains('Activity 2').should('not.exist');

    cy.contains('Delete').should('not.exist');
    cy.contains('Edit').should('exist');

    cy.contains('Edit').click();
    cy.url().should('contain', '/activity/0/overview');

    checkDefaultDate('Start date');
    checkDefaultDate('End date');

    cy.get('[id="activity-short-overview-field"]').should('have.value', '');
    cy.get('[id="activity-description-field"]').should('have.value', '');
    cy.get('[id="activity-alternatives-field"]').should('have.value', '');
    cy.get('[id="standards-and-conditions-supports-field"]').should(
      'have.value',
      ''
    );
    cy.get('[class="ds-c-field visibility--screen"]').should('have.value', '');

    //Outcomes and Milestones
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/oms');

    cy.contains('Outcomes have not been added for this activity.').should(
      'exist'
    );
    cy.contains('Milestones have not been added for this activity.').should(
      'exist'
    );

    cy.findByRole('button', { name: /Add another outcome/i }).click();
    cy.contains('Describe a distinct').next().should('have.value', '');
    cy.contains('Describe a measure').next().should('have.value', '');
    cy.findByRole('button', { name: /Done/i }).click();

    cy.contains('Outcome not specified').should('exist');
    cy.contains('Metric not specified').should('exist');

    cy.contains('Edit').click();
    cy.findByRole('button', { name: /Add another metric/i }).click();
    for (let i = 0; i < 2; i++) {
      cy.get('[class="ds-c-review"]')
        .eq(i)
        .within(() => {
          cy.contains('Delete').should('exist');
        });
    }
    cy.contains('Delete').click();
    cy.contains('Delete Metric?').should('exist');
    cy.contains('Cancel').click();
    cy.contains('Delete Metric?').should('not.exist');
    cy.get('[class="ds-u-margin-right--2"]').eq(2).should('exist');
    cy.contains('Delete').click();
    cy.contains('Delete Metric?').should('exist');
    cy.get('[class="ds-c-button ds-c-button--danger"]').click();
    cy.contains('Delete').should('not.exist');
    cy.get('[class="ds-u-margin-right--2"]').eq(2).should('not.exist');
    cy.contains('Delete').should('not.exist');
    cy.findByRole('button', { name: /Done/i }).click();

    checkDeleteButton(
      'Outcomes have not been added for this activity.',
      'Delete Outcome and Metrics?',
      'Outcome not specified'
    );

    cy.findByRole('button', { name: /Add another milestone/i }).click();
    cy.findByLabelText('Name').should('have.value', '');
    checkDefaultDate('Target completion date');
    cy.findByRole('button', { name: /Done/i }).click();

    cy.contains('Milestone not specified').should('exist');
    cy.contains('Date not specified').should('exist');

    checkDeleteButton(
      'Milestones have not been added for this activity.',
      'Delete Milestone?',
      'Milestone not specified'
    );

    //State Staff and Expenses
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/state-costs');

    cy.contains('State staff have not been added for this activity.').should(
      'exist'
    );
    cy.contains(
      'Other state expenses have not been added for this activity.'
    ).should('exist');

    cy.findByRole('button', { name: /Add another state staff/i }).click();
    cy.findByLabelText('Personnel title').should('have.value', '');
    cy.findByLabelText('Description').should('have.value', '');
    cy.then(() => {
      for (let i = 0; i < years.length; i++) {
        cy.contains(`FFY ${years[i]} Cost`)
          .next('div')
          .within(() => {
            cy.findByLabelText('Cost with benefits').should('have.value', '');
            cy.findByLabelText('Number of FTEs').should('have.value', '');
            cy.contains('Total: $0').should('exist');
          });
      }
    });
    cy.findByRole('button', { name: /Done/i }).click();
    cy.contains('Personnel title not specified').should('exist');

    cy.then(() => {
      for (let i = 0; i < years.length; i++) {
        cy.contains(`FFY ${years[i]}`)
          .parent()
          .within(() => {
            cy.contains('Cost: $0').should('exist');
            cy.contains('FTEs:').should('exist');
            cy.contains('Total: $0');
          });
      }
    });

    checkDeleteButton(
      'State staff have not been added for this activity.',
      'Delete State Staff Expenses?',
      'Personnel title not specified'
    );

    cy.findByRole('button', { name: /Add another state expense/i }).click();

    cy.contains('Category').parent().next().click();
    cy.contains('Hardware, software, and licensing').should('exist');
    cy.contains('Equipment and supplies').should('exist');
    cy.contains('Training and outreach').should('exist');
    cy.contains('Travel').should('exist');
    cy.contains('Administrative operations').should('exist');
    cy.contains('Miscellaneous expenses for the project').should('exist');

    cy.findByLabelText('Description').should('have.value', '');
    cy.then(() => {
      for (let i = 0; i < years.length; i++) {
        cy.findByLabelText(`${years[i]} Cost`).should('have.value', 0);
      }
    });
    cy.findByRole('button', { name: /Done/i }).click();

    cy.contains('Hardware, software, and licensing').should('exist');
    checkFFYcosts();

    checkDeleteButton(
      'Other state expenses have not been added for this activity.',
      'Delete Other State Expense?',
      'Hardware, software, and licensing'
    );

    //Private Contractor Costs
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/contractor-costs');
    cy.contains(
      'Private contractors have not been added for this activity.'
    ).should('exist');

    cy.findByRole('button', { name: /Add another contractor/i }).click();

    cy.get('[class="ds-c-label full-width-label"]')
      .next('input')
      .should('have.value', '');
    cy.get('[id="contractor-description-field-0"]').should('have.value', '');
    checkDefaultDate('Contract start date');
    checkDefaultDate('Contract end date');
    cy.get(
      '[class="ds-c-field ds-c-field--currency ds-c-field--medium"]'
    ).should('have.value', 0);
    cy.contains('No')
      .parent()
      .parent()
      .within(() => {
        cy.get('[class="ds-c-choice"]').should('be.checked');
      });

    cy.then(() => {
      for (let i = 0; i < years.length; i++) {
        cy.findByLabelText(`FFY ${years[i]} Cost`).should('have.value', 0);
      }
    });
    cy.findByRole('button', { name: /Done/i }).click();

    cy.contains('Private Contractor or Vendor Name not specified').should(
      'exist'
    );
    cy.contains(
      'Procurement Methodology and Description of Services not specified'
    ).should('exist');
    cy.contains(
      'Full Contract Term: Date not specified - Date not specified'
    ).should('exist');
    cy.contains('Total Contract Cost: $0').should('exist');
    checkFFYcosts();

    checkDeleteButton(
      'Private contractors have not been added for this activity',
      'Delete Private Contractor?',
      'Private Contractor or Vendor Name not specified'
    );

    //Cost Allocation and Other Funding
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/cost-allocation');

    cy.get('[id="cost-allocation-methodology-field"]').should('have.value', '');

    cy.then(() => {
      for (let i = 0; i < years.length; i++) {
        cy.get(
          `[id="cost-allocation-narrative-${years[i]}-other-sources-field"]`
        ).should('have.value', '');

        cy.contains(`FFY ${years[i]}`)
          .parent()
          .parent()
          .within(() => {
            cy.get('[class="ds-c-field ds-c-field--currency"]').should(
              'have.value',
              0
            );

            cy.get('[class="budget-table activity-budget-table"]').within(
              () => {
                checkTotalCostTable();
              }
            );
          });
      }
    });

    //Budget and FFP
    cy.contains('Continue').click();
    cy.url().should('contain', '/activity/0/ffp');

    cy.then(() => {
      for (let i = 0; i < years.length; i++) {
        cy.contains(`Budget for FFY ${years[i]}`)
          .parent()
          .parent()
          .within(() => {
            checkFFYbudgetTable();
            checkTotalCostTable();

            cy.contains('Federal-State Split').parent().next().click();
            cy.contains('90-10').should('exist');
            cy.contains('75-25').should('exist');
            cy.contains('50-50').should('exist');

            cy.contains('Federal-State Split')
              .parent()
              .next('div')
              .find(':selected')
              .contains('90-10');

            costSplitTable('90%', '10%');

            cy.get('[class="ds-c-field"]').select('75-25');
            costSplitTable('75%', '25%');

            cy.get('[class="ds-c-field"]').select('50-50');
            costSplitTable('50%', '50%');

            cy.get('[class="ds-c-field"]').select('90-10');

            quarterTabledefault();
          });
      }

      checkFFYtotals('Program Administration');
    });

    //Testing add activity button at end of Activitiy
    cy.contains('Add another activity').click();
    cy.url().should('include', '/activities');
    cy.contains('Activity 2').should('exist');
    cy.contains('Delete').click();
    cy.findByRole('button', { name: /Delete Activity/i }).click();
    cy.contains('Activity 2').should('not.exist');
  });

  it('checks default activity export view', () => {
    cy.contains('Export and Submit').click();
    cy.contains('Continue to Review').click();

    cy.contains('Executive Summary')
      .parent()
      .within(() => {
        cy.contains('Activity 1: Program Administration').should('exist');
        cy.contains('Date not specified - Date not specified').should('exist');
        cy.contains('Total cost of activity: $0').should('exist');
        cy.contains(
          'Total Computable Medicaid Cost: $0 ($0 Federal share)'
        ).should('exist');

        cy.then(() => {
          for (let i = 0; i < years.length; i++) {
            cy.contains(
              `FFY ${years[i]}: $0 | Total Computable Medicaid Cost: $0 ($0 Federal share)`
            ).should('exist');
          }
        });
      });

    cy.contains('Activities')
      .parent()
      .next()
      .next()
      .within(() => {
        cy.then(() => {
          for (let i = 0; i < activities.length; i++) {
            cy.contains(
              `${i + 1}. ${activities[i][0]} | ${activities[i][1]}`
            ).should('exist');
          }

          for (let i = 0; i < activities.length; i++) {
            cy.contains(`Activity ${i + 1} (${activities[i][0]})`)
              .parent()
              .within(() => {
                cy.contains('Provide a short overview of the activity:')
                  .next()
                  .should('have.text', '');
                cy.contains('Start date')
                  .parent()
                  .should('contain', 'Date not specified');
                cy.contains('End date')
                  .parent()
                  .should('contain', 'Date not specified');

                cy.contains('Activity Overview').next().should('be.empty');
                cy.contains('Supporting Justification')
                  .next()
                  .should('be.empty');

                cy.contains('This activity supports')
                  .parent()
                  .next()
                  .should(
                    'contain',
                    'No response was provided for how this activity will support the Medicaid standards and conditions.'
                  );
                cy.contains('This activity does not support')
                  .parent()
                  .next()
                  .should(
                    'contain',
                    'No response was provided for how this activity will support the Medicaid standards and conditions.'
                  );

                cy.contains('Outcomes and Metrics')
                  .next()
                  .next()
                  .should('contain', 'Milestones');
                cy.contains('Milestones')
                  .next()
                  .should('contain', 'State staff');
                cy.contains('State staff')
                  .next()
                  .should('contain', 'Other state expenses');
                cy.contains('Other state expenses')
                  .next()
                  .should('contain', 'Private Contractor Costs');
                cy.contains('Private Contractor Costs')
                  .next()
                  .should('contain', 'Cost Allocation');
                cy.contains('Description of Cost Allocation Methodology')
                  .next()
                  .should('be.empty');

                for (let k = 0; k < years.length; k++) {
                  cy.contains(`FFY ${years[k]}`)
                    .next()
                    .should('contain', 'Other Funding Description')
                    .next()
                    .should('be.empty')
                    .next()
                    .should('contain', 'Other Funding Amount: $0');

                  cy.contains(`Activity ${i + 1} Budget for FFY ${years[k]}`)
                    .next()
                    .within(() => {
                      checkFFYbudgetTable();
                      cy.contains(
                        `Activity ${i + 1} Total Computable Medicaid Cost`
                      )
                        .parent()
                        .next()
                        .should('contain', '$0')
                        .next()
                        .should('contain', '$0');

                      costSplitTableRow('Federal Share', '90%');
                      costSplitTableRow('State Share', '10%');
                    });
                  cy.contains(`Activity ${i + 1} Budget for FFY ${years[k]}`)
                    .parent()
                    .next()
                    .within(() => {
                      quarterTableExport();
                    });
                }

                checkFFYtotals(activities[i][0]);
              });
          }
        });
      });
  });
});
