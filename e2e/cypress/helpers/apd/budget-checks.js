const { _ } = Cypress;

export const checkBudgetAndFFP = (years, budget, activityIndex) => {
  cy.goToActivityDashboard();
  cy.contains(`Activity ${activityIndex + 1}:`).click();
  cy.contains('Budget and FFP').click();

  cy.findByRole('heading', { name: /Budget and FFP/i, level: 2 }).should(
    'exist'
  );

  _.forEach(years, (year, ffyIndex) => {
    cy.get('[data-cy="FFPActivityTable"]')
      .eq(ffyIndex)
      .then(table => {
        cy.get(table)
          .getActivityTable()
          .then(tableData => {
            expect(tableData).to.deep.include(budget.budgetAndFFP);
          });
      });
  });
};

export const checkProposedBudget = (years, budget, activityIndex) => {
  cy.goToProposedBudget();

  _.forEach(years, (ffy, index) => {
    cy.get('[data-cy="CACTable"]')
      .eq(index)
      .then(table => {
        const { programTypes, totalComputableMedicaidCost } = expected[index];
        cy.get(table)
          .getEAPDTable()
          .then(tableData => {
            expect(tableData).to.deep.include(programTypes);
          });
        cy.get(table).within(() => {
          this.getTotalComputableMedicaidCostByFFY({ ffy }).shouldBeCloseTo(
            totalComputableMedicaidCost
          );
        });
      });
  });
};
