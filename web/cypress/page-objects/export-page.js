/* eslint class-methods-use-this: "off" */

// Extract just the numbers from an input string
const extractNumber = (str) => {
  return parseInt(str.replace(/\D/g, ''), 10);
};

class ExportPage {
  // Get the years referenced by previous activities
  prevActYears = [];

  // Get the numerical values of the previous activities' expenditures
  expenditures = {
    "hithie": {
      "approved": [],
      "FFP": [],
      "actual": []
    },
  
    "mmis90": {
      "approved": [],
      "FFP": [],
      "actual": []
    },
  
    "mmis75": {
      "approved": [],
      "FFP": [],
      "actual": []
    },
  
    "mmis50": {
      "approved": [],
      "FFP": [],
      "actual": []
    }
  };
  
  getPrevActYears() {
    cy.findByRole('heading', { name: /Results of Previous Activities/i })
      .parent()
      .contains("HIT + HIE Federal share 90% FFP")
      .parent()
      .find('[headers="prev_act_hit_header_ffy"]')
      .each(($el) => {
        this.prevActYears.push(extractNumber($el.text()));
    });
  }

  getPrevActExpenditureVals() {

    for(let i = 0; i < this.prevActYears.length; i += 1) {
      cy.get(`[headers="prev_act_hithie_row_${this.prevActYears[i]} ` 
      + `prev_act_hithie_total prev_act_hithie_total_approved"]`)
      .invoke('text')
      .then((text) => {
        this.expenditures.hithie.approved.push(extractNumber(text));
      });
      cy.get(`[headers="prev_act_hithie_row_${this.prevActYears[i]} ` 
      + `prev_act_hithie_federal prev_act_hithie_federal_approved"]`)
      .invoke('text')
      .then((text) => {
        this.expenditures.hithie.FFP.push(extractNumber(text));
      });
      cy.get(`[headers="prev_act_hithie_row_${this.prevActYears[i]} `
      + `prev_act_hithie_federal prev_act_hithie_federal_actual"]`)
      .invoke('text')
      .then((text) => {
        this.expenditures.hithie.actual.push(extractNumber(text));
      });

      const mmisSharePercents = [90, 75, 50];

      Object.values(mmisSharePercents).forEach(sharePercent => {
        cy.get(`[headers="prev_act_mmis_row_${this.prevActYears[i]} ` 
        + `prev_act_mmis${sharePercent}_total ` 
        + `prev_act_mmis${sharePercent}_total_approved"]`)
        .invoke('text')
        .then((text) => {
          this.expenditures[`mmis${sharePercent}`].approved.push(extractNumber(text));
        });
        cy.get(`[headers="prev_act_mmis_row_${this.prevActYears[i]} ` 
        + `prev_act_mmis${sharePercent}_federal ` 
        + `prev_act_mmis${sharePercent}_federal_approved"]`)
        .invoke('text')
        .then((text) => {
          this.expenditures[`mmis${sharePercent}`].FFP.push(extractNumber(text));
        });
        cy.get(`[headers="prev_act_mmis_row_${this.prevActYears[i]} ` 
        + `prev_act_mmis${sharePercent}_federal ` 
        + `prev_act_mmis${sharePercent}_federal_actual"]`)
        .invoke('text')
        .then((text) => {
          this.expenditures[`mmis${sharePercent}`].actual.push(extractNumber(text));
        });
      });
      
    }
  }

  verifyPrevActInputs(expendituresTest) {

    const mmisSharePercents = [90, 75, 50];
    const expenditureTypes = ['approved', 'actual'];
    
    for(let i = 0; i < this.prevActYears.length; i += 1) {
      Object.values(expenditureTypes).forEach(expenditureType => {
        cy.wrap(this.expenditures.hithie[expenditureType][i])
          .should('eq', expendituresTest.hithie[expenditureType][i]);
      });

      Object.values(mmisSharePercents).forEach(sharePercent => {
        Object.values(expenditureTypes).forEach(expenditureType => {
          cy.wrap(this.expenditures[`mmis${sharePercent}`][expenditureType][i])
            .should('eq', expendituresTest[`mmis${sharePercent}`][expenditureType][i]);
        });
      });
    }
  }

  verifyPrevActFFY() {
    const mmisSharePercents = [90, 75, 50];

    for(let i = 0; i < this.prevActYears.length; i += 1) {
      // Assuming that HIT+HIE always has a share of 90%
      cy.wrap(this.expenditures.hithie.FFP[i])
          .should('eq', Math.round(this.expenditures.hithie.approved[i] * 0.9));

      Object.values(mmisSharePercents).forEach(sharePercent => {
        cy.wrap(this.expenditures[`mmis${sharePercent}`].FFP[i])
          .should('eq', 
          Math.round(
            this.expenditures[`mmis${sharePercent}`].approved[i] * sharePercent / 100));
      });
    }
  }

  verifyPrevActTotals() {
    const mmisSharePercents = [90, 75, 50];
    const expenditureTypes = ['FFP', 'actual'];
    const totals = {"FFP": {}, "actual": {}};

    Object.values(expenditureTypes).forEach(expenditureType => {
      // Calculate totals
      for(let i = 0; i < this.prevActYears.length; i += 1) {
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
    for(let i = 0; i < this.prevActYears.length; i += 1) {
      // Totals for approved FFP
      cy.get(`[headers="prev_act_total_row_${this.prevActYears[i]} `+
      `prev_act_total_approved"]`)
        .invoke('text')
        .then((text) => {
          const total = extractNumber(text);
          cy.wrap(total).should('eq', totals.FFP[this.prevActYears[i]]);
        })
      
      // Totals for actual expenditure
      cy.get(`[headers="prev_act_total_row_${this.prevActYears[i]} `+
      `prev_act_total_actual"]`)
        .invoke('text')
        .then((text) => {
          const total = extractNumber(text);
          cy.wrap(total).should('eq', totals.actual[this.prevActYears[i]]);
        })
    }
    
  }
}
  
export default ExportPage;
