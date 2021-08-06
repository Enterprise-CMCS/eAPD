class PopulatePage {
  fillDate = (string, month, day, year) => {
    cy.contains(string)
      .parent()
      .next()
      .within(() => {
        cy.findByLabelText('Month').type(month);
        cy.findByLabelText('Day').type(day);
        cy.findByLabelText('Year').type(year);
      });
  };
}

export default PopulatePage;
