/* eslint class-methods-use-this: "off" */

// Extract just the numbers from an input string
const extractNumber = str => {
  if (!str) return 0;
  return parseInt(str.replace(/\D/g, ''), 10);
};

class PreviousActivitiesPage {
  // Get the years referenced by previous activities
  years = [];

  getYears() {
    if (this.years.length > 0) return;
    cy.contains('HIT + HIE Federal share 90% FFP')
      .parent()
      .find('[headers="prev_act_hit_header_ffy"]')
      .each($el => {
        this.years.push($el.text().replace(/\D/g, ''));
      });
  }

  setSummary(summary) {
    // Wait for textbox to load before filling data
    cy.waitForTinyMCELoaded('previous-activity-summary-field');
    cy.setTinyMceContent('previous-activity-summary-field', summary);
    cy.waitForSave();
  }

  setExpenditures(expenditures) {
    this.years.forEach((year, i) => {
      cy.get(`[name='hithie-approved-total-${year}']`).type(
        expenditures.hithie.approved[i]
      );
      cy.waitForSave();
      cy.get(`[name='hithie-actual-federal-${year}']`).type(
        expenditures.hithie.actual[i]
      );
      cy.waitForSave();

      cy.get(`[name='approved-total-mmis90-${year}']`).type(
        expenditures.mmis90.approved[i]
      );
      cy.waitForSave();
      cy.get(`[name='actual-federal-mmis90-${year}']`).type(
        expenditures.mmis90.actual[i]
      );
      cy.waitForSave();

      cy.get(`[name='approved-total-mmis75-${year}']`).type(
        expenditures.mmis75.approved[i]
      );
      cy.waitForSave();
      cy.get(`[name='actual-federal-mmis75-${year}']`).type(
        expenditures.mmis75.actual[i]
      );
      cy.waitForSave();

      cy.get(`[name='approved-total-mmis50-${year}']`).type(
        expenditures.mmis50.approved[i]
      );
      cy.waitForSave();
      cy.get(`[name='actual-federal-mmis50-${year}']`).type(
        expenditures.mmis50.actual[i]
      );
      cy.waitForSave();
    });
  }

  // Check that the value entered for approved funding matches what is
  // expected from the calculated FFP.
  verifyFFP() {
    this.years.forEach(year => {
      // HIT + HIE
      // Get input value for approved medicaid funding
      cy.get(`[name='hithie-approved-total-${year}']`)
        .invoke('val')
        .then(val => {
          const share = 0.9;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(
            `[headers="prev_act_hithie_row_${year} ` +
              `prev_act_hithie_federal prev_act_hithie_federal_approved"]`
          )
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.log(medicaid);
              cy.log(expectedFFP);
              cy.log(FFP);
              cy.wrap(FFP).should('eq', expectedFFP);
            });
        });

      // MMIS 90% FFP
      // Get input value for approved medicaid funding
      cy.get(`[name='approved-total-mmis90-${year}']`)
        .invoke('val')
        .then(val => {
          const share = 0.9;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(
            `[headers="prev_act_mmis_row_${year} ` +
              `prev_act_mmis90_federal prev_act_mmis90_federal_approved"]`
          )
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.wrap(FFP).should('eq', expectedFFP);
            });
        });

      // MMIS 75% FFP
      // Get input value for approved medicaid funding
      cy.get(`[name='approved-total-mmis75-${year}']`)
        .invoke('val')
        .then(val => {
          const share = 0.75;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(
            `[headers="prev_act_mmis_row_${year} ` +
              `prev_act_mmis75_federal prev_act_mmis75_federal_approved"]`
          )
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.wrap(FFP).should('eq', expectedFFP);
            });
        });

      // MMIS 50% FFP
      // Get input value for approved medicaid funding
      cy.get(`[name='approved-total-mmis50-${year}']`)
        .invoke('val')
        .then(val => {
          const share = 0.5;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(
            `[headers="prev_act_mmis_row_${year} ` +
              `prev_act_mmis50_federal prev_act_mmis50_federal_approved"]`
          )
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.wrap(FFP).should('eq', expectedFFP);
            });
        });
      cy.waitForSave();
    });
  }

  verifyTotalFFP() {
    const totals = {};

    this.years.forEach(year => {
      totals[year] = 0;

      cy.get(
        `[headers="prev_act_hithie_row_${year} ` +
          `prev_act_hithie_federal prev_act_hithie_federal_approved"]`
      )
        .invoke('text')
        .then(text => {
          totals[year] += extractNumber(text);
        });

      cy.get(
        `[headers="prev_act_mmis_row_${year} ` +
          `prev_act_mmis90_federal prev_act_mmis90_federal_approved"]`
      )
        .invoke('text')
        .then(text => {
          totals[year] += extractNumber(text);
        });

      cy.get(
        `[headers="prev_act_mmis_row_${year} ` +
          `prev_act_mmis75_federal prev_act_mmis75_federal_approved"]`
      )
        .invoke('text')
        .then(text => {
          totals[year] += extractNumber(text);
        });

      cy.get(
        `[headers="prev_act_mmis_row_${year} ` +
          `prev_act_mmis50_federal prev_act_mmis50_federal_approved"]`
      )
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
      cy.waitForSave();
    });
  }

  verifyTotalExpenditures() {
    const totals = {};

    this.years.forEach(year => {
      totals[year] = 0;

      cy.get(`[name='hithie-actual-federal-${year}']`)
        .invoke('val')
        .then(val => {
          totals[year] += extractNumber(val);
        });

      cy.get(`[name='actual-federal-mmis90-${year}']`)
        .invoke('val')
        .then(val => {
          totals[year] += extractNumber(val);
        });

      cy.get(`[name='actual-federal-mmis75-${year}']`)
        .invoke('val')
        .then(val => {
          totals[year] += extractNumber(val);
        });

      cy.get(`[name='actual-federal-mmis50-${year}']`)
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

      cy.waitForSave();
    });
  }
}

export default PreviousActivitiesPage;
