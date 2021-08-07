/* eslint class-methods-use-this: "off" */

// Extract just the numbers from an input string
const extractNumber = (str) => {
  return parseInt(str.replace(/\D/g, ''), 10);
};

class PreviousActivitiesPage {
  // Get the years referenced by previous activities
  years = [];
  
  getYears() {
    cy.contains("HIT + HIE Federal share 90% FFP")
      .parent()
      .find('[headers="prev_act_hit_header_ffy"]')
      .each(($el) => {
        this.years.push($el.text().replace(/\D/g, ''));
    });
  }

  setSummary(summary) {
    // Wait for textbox to load before filling data
    cy.waitForTinyMCELoaded('previous-activity-summary-field');
    cy.setTinyMceContent(
      'previous-activity-summary-field', 
      summary
    );
  }

  setExpenditures(expenditures) {
    for(let i = 0; i < this.years.length; i += 1) {
      cy.get(`[name='hithie-approved-total-${this.years[i]}']`)
        .type(expenditures.hithie.approved[i]);
      cy.get(`[name='hithie-actual-federal-${this.years[i]}']`)
        .type(expenditures.hithie.actual[i]);
      
      cy.get(`[name='approved-total-mmis90-${this.years[i]}']`)
        .type(expenditures.mmis90.approved[i]);
      cy.get(`[name='actual-federal-mmis90-${this.years[i]}']`)
        .type(expenditures.mmis90.actual[i]);
      
      cy.get(`[name='approved-total-mmis75-${this.years[i]}']`)
        .type(expenditures.mmis75.approved[i]);
      cy.get(`[name='actual-federal-mmis75-${this.years[i]}']`)
        .type(expenditures.mmis75.actual[i]);
      
      cy.get(`[name='approved-total-mmis50-${this.years[i]}']`)
        .type(expenditures.mmis50.approved[i]);
      cy.get(`[name='actual-federal-mmis50-${this.years[i]}']`)
        .type(expenditures.mmis50.actual[i]);
    };
  }

  // Check that the value entered for approved funding matches what is
  // expected from the calculated FFP.
  verifyFFP() {
    for(let i = 0; i < this.years.length; i += 1) {
      // HIT + HIE
      // Get input value for approved medicaid funding
      cy.get(`[name='hithie-approved-total-${this.years[i]}']`)
        .invoke('val')
        .then(val => {
          const share = 0.9;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(`[headers="prev_act_hithie_row_${this.years[i]} `
          + `prev_act_hithie_federal prev_act_hithie_federal_approved"]`)
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.log(medicaid);
              cy.log(expectedFFP);
              cy.log(FFP);
              cy.wrap(FFP).should('eq', expectedFFP);
            })
        }
      );
      
      // MMIS 90% FFP
      // Get input value for approved medicaid funding
      cy.get(`[name='approved-total-mmis90-${this.years[i]}']`)
        .invoke('val')
        .then(val => {
          const share = 0.9;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(`[headers="prev_act_mmis_row_${this.years[i]} `
          + `prev_act_mmis90_federal prev_act_mmis90_federal_approved"]`)
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.wrap(FFP).should('eq', expectedFFP);
            })
        }
      );

      // MMIS 75% FFP
      // Get input value for approved medicaid funding
      cy.get(`[name='approved-total-mmis75-${this.years[i]}']`)
        .invoke('val')
        .then(val => {
          const share = 0.75;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(`[headers="prev_act_mmis_row_${this.years[i]} `
          + `prev_act_mmis75_federal prev_act_mmis75_federal_approved"]`)
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.wrap(FFP).should('eq', expectedFFP);
            })
        }
      );

      // MMIS 50% FFP
      // Get input value for approved medicaid funding
      cy.get(`[name='approved-total-mmis50-${this.years[i]}']`)
        .invoke('val')
        .then(val => {
          const share = 0.5;
          const medicaid = extractNumber(val);
          const expectedFFP = Math.round(medicaid * share);
          // Get the ith year's calculated FFP
          cy.get(`[headers="prev_act_mmis_row_${this.years[i]} `
          + `prev_act_mmis50_federal prev_act_mmis50_federal_approved"]`)
            .invoke('text')
            .then(text => {
              const FFP = extractNumber(text);
              cy.wrap(FFP).should('eq', expectedFFP);
            })
        }
      );

    }
  }

  verifyTotalFFP() {
    const totals = {};

    for(let i = 0; i < this.years.length; i += 1) {
      totals[this.years[i]] = 0;

      cy.get(`[headers="prev_act_hithie_row_${this.years[i]} `
      + `prev_act_hithie_federal prev_act_hithie_federal_approved"]`)
        .invoke('text')
        .then(text => {
          totals[this.years[i]] += extractNumber(text);
        });
      
      cy.get(`[headers="prev_act_mmis_row_${this.years[i]} `
      + `prev_act_mmis90_federal prev_act_mmis90_federal_approved"]`)
        .invoke('text')
        .then(text => {
          totals[this.years[i]] += extractNumber(text);
        });
      
      cy.get(`[headers="prev_act_mmis_row_${this.years[i]} `
      + `prev_act_mmis75_federal prev_act_mmis75_federal_approved"]`)
        .invoke('text')
        .then(text => {
          totals[this.years[i]] += extractNumber(text);
        });

      cy.get(`[headers="prev_act_mmis_row_${this.years[i]} `
      + `prev_act_mmis50_federal prev_act_mmis50_federal_approved"]`)
        .invoke('text')
        .then(text => {
          totals[this.years[i]] += extractNumber(text);
        });
    }

    for(let i = 0; i < this.years.length; i += 1) {
      cy.get(`[headers="prev_act_total_row_${this.years[i]} prev_act_total_approved"]`)
        .invoke('text')
        .then(text => {
          const yearlyTotalFFP = extractNumber(text);
          cy.wrap(yearlyTotalFFP).should('eq', totals[this.years[i]]);
        });
    }
  }

  verifyTotalExpenditures() {
    const totals = {};

    for(let i = 0; i < this.years.length; i += 1) {
      totals[this.years[i]] = 0;

      cy.get(`[name='hithie-actual-federal-${this.years[i]}']`)
        .invoke('val')
        .then(val => {
          totals[this.years[i]] += extractNumber(val);
        });
      
      cy.get(`[name='actual-federal-mmis90-${this.years[i]}']`)
        .invoke('val')
        .then(val => {
          totals[this.years[i]] += extractNumber(val);
        });
      
      cy.get(`[name='actual-federal-mmis75-${this.years[i]}']`)
        .invoke('val')
        .then(val => {
          totals[this.years[i]] += extractNumber(val);
        });

      cy.get(`[name='actual-federal-mmis50-${this.years[i]}']`)
        .invoke('val')
        .then(val => {
          totals[this.years[i]] += extractNumber(val);
        });
    }

    for(let i = 0; i < this.years.length; i += 1) {
      cy.get(`[headers="prev_act_total_row_${this.years[i]} prev_act_total_actual"`)
        .invoke('text')
        .then(text => {
          const yearlyTotalExpenditure = extractNumber(text);
          cy.wrap(yearlyTotalExpenditure).should('eq', totals[this.years[i]]);
        })
    }
  }
}

export default PreviousActivitiesPage;
