export const testMmisAdminCheck = function () {
  const defaultAdminCheck = [
    {
      hyperlink: 'Key State Personnel',
      header: '',
      fieldType: ['textField', 'input[name="medicaidDirector.name"]'],
      errorMessage: 'Provide the name of the State Medicaid Director.'
    },
    {
      hyperlink: 'State Priorities and Scope',
      header: '',
      fieldType: ['tinyMCE'],
      errorMessage: 'Provide Medicaid Program and Priorities.'
    },
    {
      hyperlink: 'Activity 1 Activity Overview',
      header: 'Activity Overview',
      fieldType: ['textField'],
      errorMessage: 'Provide an Activity name.'
    },
    {
      hyperlink: 'Activity 1 Conditions for Enhanced Funding',
      header: 'Conditions for Enhanced Funding',
      fieldType: ['WHO KNOWS?'],
      errorMessage: 'PLACE HOLDER ERROR MESSAGE'
    },
    {
      hyperlink: 'Activity 1 Activity Schedule',
      header: 'Activity Schedule',
      fieldType: ['dateField'],
      errorMessage: 'Provide the name of the State Medicaid Director.'
    },
    {
      hyperlink: 'Activity 1 Budget and FFP',
      header: 'Budget and FFP',
      fieldType: ['radio'],
      errorMessage: 'Select a federal-state split.'
    },
    {
      hyperlink: 'Activity 1 Cost Allocation',
      header: 'Cost Allocation',
      fieldType: ['tinyMCE'],
      errorMessage: 'Provide a description of the cost allocation methodology.'
    },
    {
      hyperlink: 'Security Planning',
      header: '',
      fieldType: ['tinyMCE'],
      errorMessage: 'Provide Security and Interface Plan'
    },
    {
      hyperlink: 'Assurances and Compliance',
      header: '',
      fieldType: ['assurances'],
      errorMessage: 'Select yes or no.' // Maybe some condition here to check no text box
    } // Maybe have a list of all validation error messages? then loop through them?
  ];

  it(
    'tests the Admin check for mmis pages',
    { tags: ['@state', '@admin'] },
    function () {
      cy.goToActivityDashboard();
      cy.findAllByText('Add Activity').click(); // Should already have an activity made from nav test, but keeping this here for now to so i dont need to run the nav test

      cy.turnOnAdminCheck(); // On each page verify the correct number of validation errors show

      cy.get('[class="eapd-admin-check  ds-c-drawer"]').should('exist');

      cy.goToApdOverview();
      cy.get('[data-cy="validationError"]').should('exist');

      cy.findByRole('button', { name: /Stop Administrative Check/i }).click({
        force: true
      });
      cy.get('[data-cy="validationError"]').should('not.exist');

      cy.turnOnAdminCheck();

      cy.get('[data-cy="numRequired"]').should('have.text', '31'); // GET RIGHT NUMBER

      cy.findByRole('button', { name: /Collapse/i }).click({
        force: true
      });

      cy.get('[class="eapd-admin-check-list"]').should('not.exist');
      cy.findByRole('button', {
        name: /Stop Administrative Check/i
      }).should('not.exist');

      cy.findByRole('button', { name: /Expand/i }).click({
        force: true
      });

      // Check APD Overview validation errors since it's a wierd case where
      // it has pre filled in values. We can also take this time to test that
      // the error count changes in collapsed/expanded view, and the error
      // re-appears/disappears from the list

      cy.goToApdOverview();
      cy.findByRole('checkbox', { name: /Claims Processing/i }).click();
      cy.get('[data-cy="validationError"]')
        .contains('Select at least one Medicaid Business Area.')
        .should('exist');
      cy.get('[class="eapd-admin-check-list"]')
        .contains('Select at least one Medicaid Business Area.')
        .should('exist');

      cy.findByRole('checkbox', { name: /Claims Processing/i }).click();
      cy.get('[data-cy="validationError"]')
        .contains('Select at least one Medicaid Business Area.')
        .should('not.exist');
      cy.get('[class="eapd-admin-check-list"]')
        .contains('Select at least one Medicaid Business Area.')
        .should('not.exist');

      cy.findByRole('button', { name: /Collapse/i }).click({
        force: true
      });
      cy.get('[data-cy="numRequired"]').should('have.text', '31'); // GET RIGHT NUMBER

      cy.findByRole('checkbox', { name: /Claims Processing/i }).click();
      cy.get('[data-cy="numRequired"]').should('have.text', '31'); // GET RIGHT NUMBER MINUS ONE

      defaultAdminCheck.forEach(value => {
        const { hyperlink, header, fieldType, errorMessage } = value;

        if (header) {
          cy.checkAdminCheckHyperlinks(hyperlink, hyperlink, 2);
        } else {
          cy.checkAdminCheckHyperlinks(hyperlink, header, 3);
        }

        cy.get('[data-cy="validationError"]')
          .contains(errorMessage)
          .should('exist');

        // Validation message should disappear/re-appear when value is changed
        if (fieldType[0] === 'textField') {
          cy.get(fieldType[1]).clear().type('Test Name');
          cy.get('[data-cy="validationError"]')
            .contains(errorMessage)
            .should('not.exist');

          cy.get(fieldType[1]).clear();
          cy.get('[data-cy="validationError"]')
            .contains(errorMessage)
            .should('exist');
        } else if (fieldType[0] === 'tinyMCE') {
          cy.setTinyMceContent(fieldType[1], 'Test Value');
          cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting
          cy.get('[data-cy="validationError"]')
            .contains(errorMessage)
            .should('not.exist');

          cy.setTinyMceContent(fieldType[1], '');
          cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting
          cy.get('[data-cy="validationError"]')
            .contains(errorMessage)
            .should('exist');
        } else if (fieldType[0] === 'radio') {
        } else if (fieldType[0] === 'dateField') {
        } else if (fieldType[0] === 'assurances') {
        } else {
          throw new Error('Invalid field type!');
        }
      });

      // Test admin check on functionally complete APD!!!!!!!!!!!
    }
  );
};
