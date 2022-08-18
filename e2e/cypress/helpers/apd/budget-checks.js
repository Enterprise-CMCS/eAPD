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

export const checkProposedBudget = (
  years,
  budget,
  totalComputableMedicaidCost,
  type
) => {
  cy.goToProposedBudget();

  _.forEach(years, (ffy, index) => {
    cy.get('[data-cy="CACTable"]')
      .eq(index)
      .then(table => {
        cy.get(table)
          .getEAPDTable()
          .then(tableData => {
            expect(tableData).to.deep.include(budget.CACTable);
          });
        cy.get(table).within(() => {
          cy.contains(`FFY ${ffy} Total Computable Medicaid Cost`)
            .next()
            .shouldBeCloseTo(totalComputableMedicaidCost);
        });
      });

    cy.get(`[data-cy="summaryBudget${type}"]`)
      .eq(index)
      .then(table => {
        cy.get(table)
          .getEAPDTable()
          .then(tableData => {
            expect(tableData).to.deep.include(budget.FFPActivitiesTable);
          });
      });

    cy.get('[data-cy="summaryBudgetTotals"]').then(table => {
      cy.get(table)
        .getEAPDTable()
        .then(tableData => {
          expect(tableData).to.deep.include(budget.summaryBudgetTotals);
        });
    });
  });
};
