export const testMmisAdminCheck = function () {
  const fillDate = (string, list) => {
    cy.findAllByText(string)
      .parent()
      .next()
      .within(() => {
        cy.findByLabelText('Month').clear().type(list[0]);
        cy.findByLabelText('Day').clear().type(list[1]);
        cy.findByLabelText('Year').clear().type(list[2]).blur();
      });
  };

  const clearDate = string => {
    cy.findAllByText(string)
      .parent()
      .next()
      .within(() => {
        cy.findByLabelText('Month').clear();
        cy.findByLabelText('Day').clear();
        cy.findByLabelText('Year').clear();
      });
  };

  const defaultAdminCheck = [
    //add expected length to errorMessage
    {
      hyperlink: 'State Priorities and Scope',
      header: ['State Priorities and Scope', 2],
      fieldType: ['tinyMCE', 'medicaid-program-priorities-field'],
      errorMessage: ['Provide Medicaid Program and Priorities', 2]
    },
    {
      hyperlink: 'Key State Personnel',
      header: ['Key State Personnel', 2],
      fieldType: ['textField', 'input[name="medicaidDirector.name"]'],
      errorMessage: ['Provide the name of the State Medicaid Director.', 2]
    },
    {
      hyperlink: 'Activity 1 Activity Overview',
      header: ['Activity Overview', 3],
      fieldType: ['textField', 'input[name="name"]'],
      errorMessage: ['Provide an Activity name', 2]
    },
    {
      hyperlink: 'Activity 1 Activity Schedule',
      header: ['Activity Schedule', 3],
      fieldType: ['dateField'],
      errorMessage: ['Provide a start date.', 3]
    },
    {
      hyperlink: 'Activity 1 Conditions for Enhanced Funding',
      header: ['Conditions for Enhanced Funding', 3],
      fieldType: ['radio'],
      errorMessage: ['Select an Enhanced Funding Qualification', 3]
    },
    {
      hyperlink: 'Activity 1 Cost Allocation',
      header: ['Cost Allocation', 3],
      fieldType: ['tinyMCE', 'cost-allocation-methodology-field'],
      errorMessage: [
        'Provide a description of the cost allocation methodology.',
        2
      ]
    },
    {
      hyperlink: 'Activity 1 Budget and FFP',
      header: ['Budget and FFP', 2],
      fieldType: ['radio'],
      errorMessage: ['Select a federal-state split.', 6] // WEIRD CASE
    },
    {
      hyperlink: 'Security Planning',
      header: ['Security Planning', 2],
      fieldType: ['tinyMCE', 'security-interface-plan'],
      errorMessage: ['Provide Security and Interface Plan', 2]
    },
    {
      hyperlink: 'Assurances and Compliance',
      header: ['Assurances and Compliance', 2],
      fieldType: ['assurances'],
      errorMessage: ['Select yes or no', 30] // Maybe some condition here to check no text box
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

      cy.goToKeyStatePersonnel();
      cy.findAllByText(
        'Provide the name of the State Medicaid Director.'
      ).should('have.length', 2);

      cy.findByRole('button', { name: /Stop Administrative Check/i }).click({
        force: true
      });
      cy.get('[class="eapd-admin-check  ds-c-drawer"]').should('not.exist');
      cy.findAllByText(
        'Provide the name of the State Medicaid Director.'
      ).should('not.exist');

      cy.turnOnAdminCheck();

      cy.get('[data-cy="numRequired"]').should('have.text', '33');

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
      cy.findAllByText('Select at least one Medicaid Business Area.').should(
        'have.length',
        3
      );

      cy.findByRole('checkbox', { name: /Claims Processing/i }).click();
      cy.findAllByText('Select at least one Medicaid Business Area.').should(
        'not.exist'
      );

      cy.findByRole('button', { name: /Collapse/i }).click({
        force: true
      });
      cy.get('[data-cy="numRequired"]').should('have.text', '33');

      cy.findByRole('checkbox', { name: /Claims Processing/i }).click();
      cy.get('[data-cy="numRequired"]').should('have.text', '34');

      cy.findByRole('checkbox', { name: /Claims Processing/i }).click();
      cy.findByRole('button', { name: /Expand/i }).click({
        force: true
      });

      defaultAdminCheck.forEach(value => {
        const { hyperlink, header, fieldType, errorMessage } = value;

        cy.checkAdminCheckHyperlinks(hyperlink, header[0], header[1]);
        cy.findAllByText(errorMessage[0]).should(
          'have.length',
          errorMessage[1]
        );

        cy.findByRole('button', { name: /Collapse/i }).click({
          // Cypress cannot see field b/c admin check panel is in the way?
          force: true
        });

        // Validation message should disappear/re-appear when value is changed
        if (fieldType[0] === 'textField') {
          cy.get(fieldType[1]).clear().type('Test Name');
          cy.findAllByText(errorMessage[0]).should('not.exist');

          cy.get(fieldType[1]).clear();
        } else if (fieldType[0] === 'tinyMCE') {
          cy.setTinyMceContent(fieldType[1], 'Test Value');
          cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting
          cy.findAllByText([errorMessage[0]]).should('not.exist');

          cy.setTinyMceContent(fieldType[1], '');
          cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting
        } else if (fieldType[0] === 'radio') {
        } else if (fieldType[0] === 'dateField') {
          fillDate('Start date', [1, 2, 2022]);
          cy.findAllByText(errorMessage[0]).should('not.exist');

          clearDate('Start date');
        } else if (fieldType[0] === 'assurances') {
        } else {
          throw new Error('Invalid field type!');
        }

        cy.findByRole('button', { name: /Expand/i }).click({
          force: true
        });

        cy.findAllByText(errorMessage[0]).should(
          'have.length',
          errorMessage[1]
        );
      });

      // Test admin check on functionally complete APD!!!!!!!!!!!
    }
  );
};
