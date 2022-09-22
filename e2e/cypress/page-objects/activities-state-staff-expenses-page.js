/* eslint class-methods-use-this: "off" */

const { _ } = Cypress;

// Extract just the numbers from an input string and decimals
const extractNumber = str => {
  return parseFloat(str.replace(/[^0-9.]/g, ''));
};

class ActivitiesStateStaffExpensesPage {
  addStaff = () => {
    cy.findByRole('button', { name: /^Add State Staff$/i }).click();
  };

  deleteStaff = index => {
    cy.findByRole('heading', { name: /^State Staff$/i })
      .next()
      .next()
      .findAllByRole('button', { name: /^Delete/i })
      .eq(index)
      .click();
    // Specifically click on the delete button on the modal
    cy.get('.ds-c-dialog__body').within(() => {
      cy.findByRole('button', { name: /Delete/i }).click({ force: true });
    });
    cy.findByRole('banner', { name: /Delete State Staff Expenses?/i }).should(
      'not.exist'
    );
  };

  // Open the indexth staff edit page, fill info, then click done.
  fillStaff = ({ years, staffIndex, title, description, costs, ftes }) => {
    const staffNumber = staffIndex + 1;

    // Lower default typing delays for long titles/descriptions
    cy.get('[name="title"]').clear().type(title, { delay: 1 });

    cy.get('[name="description"]').clear().type(description, { delay: 1 });

    // There are multiple years to fill in for cost/FTE
    _.forEach(years, (year, index) => {
      cy.get(`[name="[${year}].amt"`).clear().type(costs[index], { delay: 1 });
      cy.get(`[name="[${year}].perc"`).clear().type(ftes[index], { delay: 1 });
    });

    cy.focused().blur();

    // Verify that Total = Cost with Benefits * Number of FTEs
    cy.findByRole('heading', { name: `Personnel ${staffNumber}:` })
      .parent()
      .findAllByText('Total:')
      .each(($el, index) => {
        cy.wrap($el)
          .next()
          .invoke('text')
          .then(text => {
            const total = extractNumber(text);
            cy.wrap(total).should('eq', costs[index] * ftes[index]);
          });
      });

    cy.findByRole('button', { name: /Save/i }).click();
  };

  verifyStaff = (staffIndex, title, desc, costs, ftes) => {
    const staffNumber = staffIndex + 1;

    // Get the div containing the staff's information
    cy.findByRole('heading', { name: `${staffNumber}. ${title}` })
      .parent()
      .as('staffDiv');

    // Description
    cy.findByRole('heading', { name: `${staffNumber}. ${title}` })
      .next()
      .invoke('text')
      .should('contain', desc);

    // Costs
    cy.get('@staffDiv')
      .findAllByText(/Cost:/i)
      .each(($el, index) => {
        cy.wrap($el)
          .next()
          .invoke('text')
          .then(text => {
            const cost = extractNumber(text);
            cy.wrap(cost).should('eq', costs[index]);
          });
      });

    // FTEs
    cy.get('@staffDiv')
      .findAllByText(/FTEs:/i)
      .each(($el, index) => {
        cy.wrap($el)
          .parent()
          .invoke('text')
          .then(text => {
            // Get first match for string slice of "FTE: *** |"
            // where "***" is the FTE and "|" is a seperator.
            const slice = text.match(/FTEs: (.*)\|/i)[0];
            const fte = extractNumber(slice);
            cy.wrap(fte).should('eq', ftes[index]);
          });
      });

    // Total expenses
    cy.get('@staffDiv')
      .findAllByText(/Total:/i)
      .each(($el, index) => {
        cy.wrap($el)
          .next()
          .invoke('text')
          .then(text => {
            const total = extractNumber(text);
            cy.wrap(total).should('eq', costs[index] * ftes[index]);
          });
      });
  };

  addExpense = () => {
    cy.findByRole('button', { name: /^Add State Expense$/i }).click();
  };

  deleteExpense = index => {
    cy.findByRole('heading', { name: /^Other State Expenses$/i })
      .next()
      .next()
      .findAllByRole('button', { name: /^Delete/i })
      .eq(index)
      .click();
    // Specifically click on the delete button on the modal
    cy.get('.ds-c-dialog__body').within(() => {
      cy.findByRole('button', { name: /Delete/i }).click({ force: true });
    });
  };

  fillExpense = ({ years, expenseIndex, category, costs, desc }) => {
    cy.get('[name="category"]').select(category, { delay: 1 });

    cy.get('[name="description"]').clear().type(desc, { delay: 1 });

    // There are multiple years to fill in for cost/FTE
    _.forEach(years, (year, index) => {
      cy.get(`[name="years[${year}]"`).clear().type(costs[index], { delay: 1 });
    });

    cy.focused().blur();

    cy.findByRole('button', { name: /Save/i }).click();
  };

  verifyExpense = (expenseIndex, category, costs, desc) => {
    const expenseNumber = expenseIndex + 1;

    // Get the div containing the expense info, also verifies category
    cy.findByRole('heading', { name: `${expenseNumber}. ${category}` })
      .parent()
      .as('expenseDiv');

    // Description
    cy.findByRole('heading', { name: `${expenseNumber}. ${category}` })
      .next()
      .invoke('text')
      .should('contain', desc);

    // Costs
    cy.get('@expenseDiv')
      .findAllByText(/Cost:/i)
      .each(($el, index) => {
        cy.wrap($el)
          .next()
          .invoke('text')
          .then(text => {
            const cost = extractNumber(text);
            cy.wrap(cost).should('eq', costs[index]);
          });
      });
  };
}

export default ActivitiesStateStaffExpensesPage;
