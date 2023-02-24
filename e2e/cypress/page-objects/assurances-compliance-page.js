/* eslint class-methods-use-this: "off" */

class AssurancesCompliancePage {
  // assert if a link with the given text and URL reference exists here
  assertLink = (category, name, ref) => {
    cy.findByRole('heading', { name: category })
      .parent()
      .find('a')
      .contains(name)
      .invoke('attr', 'href')
      .then(href => {
        cy.wrap(href).should('eq', ref);
      });
  };

  // Returns the div containing the regulation + response fields
  getRegulationDiv = (category, regulation) => {
    cy.findByRole('heading', { name: category })
      .parent()
      .contains('fieldset', regulation);
  };

  // Given a regulation, fills in an appropriate response.
  // A null response results in checking "yes" for following the regulation
  // A string response checks "no" and enters the string into the
  fillRegulation = (category, regulation, response) => {
    cy.findByRole('heading', { name: category })
      .parent()
      .contains('fieldset', regulation)
      .as('regulationDiv');

    if (response === null) {
      cy.get('@regulationDiv').find('[value="yes"]').check({ force: true });
    } else {
      cy.get('@regulationDiv').find('[value="no"]').check({ force: true });

      if (response.length > 0) {
        cy.get('@regulationDiv').find('textarea').type(response);
      }
    }
  };

  // Given a regulation, fills in an appropriate response.
  // A null response results in checking "yes" for following the regulation
  // A string response checks "no" and enters the string into the
  fillRegulationSeed = (category, regulation, checked, explanation = '') => {
    cy.findByRole('heading', { name: category })
      .parent()
      .contains('fieldset', regulation)
      .as('regulationDiv');

    if (checked === true) {
      cy.get('@regulationDiv').find('[value="yes"]').check({ force: true });
    } else {
      cy.get('@regulationDiv').find('[value="no"]').check({ force: true });

      if (explanation.length > 0) {
        cy.get('@regulationDiv').find('textarea').type(explanation);
      }
    }
  };

  verifyRegulationValue = (category, regulation, expected = null) => {
    cy.findByRole('heading', { name: category })
      .parent()
      .contains('fieldset', regulation)
      .as('regulationDiv');

    if (expected === true) {
      cy.get('@regulationDiv').find('[value="yes"]').should('be.checked');
    } else if (expected === false) {
      cy.get('@regulationDiv').find('[value="no"]').should('be.checked');
    } else {
      cy.get('@regulationDiv').find('[value="yes"]').should('not.be.checked');
      cy.get('@regulationDiv').find('[value="no"]').should('not.be.checked');
    }
  };
}

export default AssurancesCompliancePage;
