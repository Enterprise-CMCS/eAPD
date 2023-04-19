/* eslint class-methods-use-this: "off" */

// Extract just the numbers from an input string
const extractNumber = str => {
  if (!str) return 0;
  return parseInt(str.replace(/\D/g, ''), 10);
};

class PreviousActivitiesPage {
  // Get the years referenced by previous activities
  years = [];

  getYears(apdType) {
    if (apdType === 'HITECH') {
      if (this.years.length > 0) return this;
      return cy
        .contains('HIT + HIE')
        .parent()
        .find('[data-cy="yearRow"]')
        .each($el => {
          this.years.push($el.text().replace(/\D/g, ''));
        });
    } else if (apdType === 'MMIS') {
      if (this.years.length > 0) return this;
      return cy
        .contains('MMIS Federal share 90% FFP')
        .parent()
        .find('[data-cy="yearRow"]')
        .each($el => {
          this.years.push($el.text().replace(/\D/g, ''));
        });
    }
  }

  setSummary(summary) {
    // Wait for textbox to load before filling data
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.setTinyMceContent('previous-activity-summary-field', summary);
    return this;
  }

  setExpenditures(expenditures) {
    this.years.forEach((year, i) => {
      cy.get(`[data-cy='${year}.hithie.totalApproved']`)
        .clear()
        .type(expenditures.hithie.approved[i]);
      cy.get(`[data-cy='${year}.hithie.federalActual']`)
        .clear()
        .type(expenditures.hithie.actual[i]);

      cy.get(`[data-cy='${year}.mmis.90.totalApproved']`)
        .clear()
        .type(expenditures.mmis90.approved[i]);
      cy.get(`[data-cy='${year}.mmis.90.federalActual']`)
        .clear()
        .type(expenditures.mmis90.actual[i]);

      cy.get(`[data-cy='${year}.mmis.75.totalApproved']`)
        .clear()
        .type(expenditures.mmis75.approved[i]);
      cy.get(`[data-cy='${year}.mmis.75.federalActual']`)
        .clear()
        .type(expenditures.mmis75.actual[i]);

      cy.get(`[data-cy='${year}.mmis.50.totalApproved']`)
        .clear()
        .type(expenditures.mmis50.approved[i]);
      cy.get(`[data-cy='${year}.mmis.50.federalActual']`)
        .clear()
        .type(expenditures.mmis50.actual[i])
        .blur();
    });
    return this;
  }

  setMmisExpenditures(actualExpenditures) {
    const levels = [90, 75, 50];
    levels.forEach(level => {
      this.years.forEach(year => {
        if (level === 90) {
          cy.get(`[name="approved-total-ddi${level}-${year}"]`)
            .clear()
            .type(actualExpenditures[year].ddi[level].totalApproved);
          cy.get(`[name="actual-federal-ddi${level}-${year}"]`)
            .clear()
            .type(actualExpenditures[year].ddi[level].federalActual);
        } else {
          cy.get(`[name="approved-total-ddi${level}-${year}"]`)
            .clear()
            .type(actualExpenditures[year].ddi[level].totalApproved);
          cy.get(`[name="actual-federal-ddi${level}-${year}"]`)
            .clear()
            .type(actualExpenditures[year].ddi[level].federalActual);

          cy.get(`[name="approved-total-mando${level}-${year}"]`)
            .clear()
            .type(actualExpenditures[year].mando[level].totalApproved);
          cy.get(`[name="actual-federal-mando${level}-${year}"]`)
            .clear()
            .type(actualExpenditures[year].mando[level].federalActual);
        }
      });
    });

    return this;
  }

  // Check that the value entered for approved funding matches what is
  // expected from the calculated FFP.
  verifyFFP() {
    this.years.forEach(year => {
      // HIT + HIE
      // Get input value for approved medicaid funding
      cy.get(`[data-cy='${year}.hithie.totalApproved']`)
        .invoke('val')
        .then(val => {
          const share = 0.9;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(`[data-cy="prev_act_hithie90_federal_approved_${year}"]`)
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.wrap(FFP).should('eq', expectedFFP);
            });
        });

      // MMIS 90% FFP
      // Get input value for approved medicaid funding
      cy.get(`[data-cy='${year}.mmis.90.totalApproved']`)
        .invoke('val')
        .then(val => {
          const share = 0.9;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(`[data-cy="prev_act_mmis90_federal_approved_${year}"]`)
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.wrap(FFP).should('eq', expectedFFP);
            });
        });

      // MMIS 75% FFP
      // Get input value for approved medicaid funding
      cy.get(`[data-cy='${year}.mmis.75.totalApproved']`)
        .invoke('val')
        .then(val => {
          const share = 0.75;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(`[data-cy="prev_act_mmis75_federal_approved_${year}"]`)
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.wrap(FFP).should('eq', expectedFFP);
            });
        });

      // MMIS 50% FFP
      // Get input value for approved medicaid funding
      cy.get(`[data-cy='${year}.mmis.50.totalApproved']`)
        .invoke('val')
        .then(val => {
          const share = 0.5;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(`[data-cy="prev_act_mmis50_federal_approved_${year}"]`)
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.wrap(FFP).should('eq', expectedFFP);
            });
        });
    });
    return this;
  }

  // Check that the value entered for approved funding matches what is
  // expected from the calculated FFP.
  verifyMmisFFP() {
    const levels = [90, 75, 50];

    levels.forEach(level => {
      this.years.forEach(year => {
        if (level === 90) {
          cy.get(`[name="approved-total-ddi${level}-${year}"]`)
            .invoke('val')
            .then(val => {
              const share = level * 0.01;
              const medicaid = extractNumber(val);
              const expectedFFP = Math.round(medicaid * share);

              cy.get(
                `[data-cy="prev_act_mmis${level}_federal_approved_ddi_${year}"]`
              ).shouldBeCloseTo(expectedFFP);
            });
        } else {
          cy.get(`[name="approved-total-ddi${level}-${year}"]`)
            .invoke('val')
            .then(val => {
              const share = level * 0.01;
              const medicaid = extractNumber(val);
              const expectedFFP = Math.round(medicaid * share);

              cy.get(
                `[data-cy="prev_act_mmis${level}_federal_approved_ddi_${year}"]`
              ).shouldBeCloseTo(expectedFFP);
            });

          cy.get(`[name="approved-total-mando${level}-${year}"]`)
            .invoke('val')
            .then(val => {
              const share = level * 0.01;
              const medicaid = extractNumber(val);
              const expectedFFP = Math.round(medicaid * share);

              cy.get(
                `[data-cy="prev_act_mmis${level}_federal_approved_mando_${year}"]`
              ).shouldBeCloseTo(expectedFFP);
            });
        }
      });
    });
    return this;
  }

  verifyTotalFFP() {
    const totals = {};

    this.years.forEach(year => {
      totals[year] = 0;

      cy.get(`[data-cy="prev_act_hithie90_federal_approved_${year}"]`)
        .invoke('text')
        .then(text => {
          totals[year] += extractNumber(text);
        });

      cy.get(`[data-cy="prev_act_mmis90_federal_approved_${year}"]`)
        .invoke('text')
        .then(text => {
          totals[year] += extractNumber(text);
        });

      cy.get(`[data-cy="prev_act_mmis75_federal_approved_${year}"]`)
        .invoke('text')
        .then(text => {
          totals[year] += extractNumber(text);
        });

      cy.get(`[data-cy="prev_act_mmis50_federal_approved_${year}"]`)
        .invoke('text')
        .then(text => {
          totals[year] += extractNumber(text);
        });

      cy.get(`[headers="prev_act_total_row_${year} prev_act_total_approved"]`)
        .invoke('text')
        .then(text => {
          const yearlyTotalFFP = extractNumber(text);
          cy.wrap(yearlyTotalFFP).should('eq', totals[year]);
        });
    });
    return this;
  }

  verifyTotalMmisFFP() {
    const totals = [0, 0, 0];
    const levels = [90, 75, 50];

    this.years.forEach((year, index) => {
      levels.forEach(level => {
        if (level === 90) {
          cy.get(
            `[data-cy="prev_act_mmis${level}_federal_approved_ddi_${year}"]`
          )
            .invoke('text')
            .then(text => {
              totals[index] = totals[index] + extractNumber(text);
            });
        } else {
          cy.get(
            `[data-cy="prev_act_mmis${level}_federal_approved_ddi_${year}"]`
          )
            .invoke('text')
            .then(text => {
              totals[index] = totals[index] + extractNumber(text);
            });

          cy.get(
            `[data-cy="prev_act_mmis${level}_federal_approved_mando_${year}"]`
          )
            .invoke('text')
            .then(text => {
              totals[index] = totals[index] + extractNumber(text);

              if (level === 50) {
                cy.get(
                  `[headers="prev_act_total_row_${year} prev_act_total_approved"]`
                ).shouldBeCloseTo(totals[index]);
              }
            });
        }
      });
    });

    return this;
  }

  verifyTotalExpenditures() {
    const totals = {};

    this.years.forEach(year => {
      totals[year] = 0;

      cy.get(`[data-cy='${year}.hithie.federalActual']`)
        .invoke('val')
        .then(val => {
          totals[year] += extractNumber(val);
        });

      cy.get(`[data-cy='${year}.mmis.90.federalActual']`)
        .invoke('val')
        .then(val => {
          totals[year] += extractNumber(val);
        });

      cy.get(`[data-cy='${year}.mmis.75.federalActual']`)
        .invoke('val')
        .then(val => {
          totals[year] += extractNumber(val);
        });

      cy.get(`[data-cy='${year}.mmis.50.federalActual']`)
        .invoke('val')
        .then(val => {
          totals[year] += extractNumber(val);
        });

      cy.get(`[headers="prev_act_total_row_${year} prev_act_total_actual"`)
        .invoke('text')
        .then(text => {
          const yearlyTotalExpenditure = extractNumber(text);
          cy.wrap(yearlyTotalExpenditure).should('eq', totals[year]);
        });
    });
    return this;
  }

  verifyTotalMmisExpenditures() {
    const totals = [0, 0, 0];
    const levels = [90, 75, 50];

    this.years.forEach((year, index) => {
      levels.forEach(level => {
        if (level === 90) {
          cy.get(`[name="actual-federal-ddi${level}-${year}"]`)
            .invoke('val')
            .then(val => {
              totals[index] += extractNumber(val);
            });
        } else {
          cy.get(`[name="actual-federal-ddi${level}-${year}"]`)
            .invoke('val')
            .then(val => {
              totals[index] += extractNumber(val);
            });

          cy.get(`[name="actual-federal-mando${level}-${year}"]`)
            .invoke('val')
            .then(val => {
              totals[index] += extractNumber(val);

              if (level === 50) {
                cy.get(
                  `[headers="prev_act_total_row_${year} prev_act_total_actual"`
                ).shouldBeCloseTo(totals[index]);
              }
            });
        }
      });
    });
    return this;
  }
}

export default PreviousActivitiesPage;
