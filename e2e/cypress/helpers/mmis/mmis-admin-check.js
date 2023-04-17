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
        cy.findByLabelText('Year').clear().blur();
      });
  };

  const defaultAdminCheck = [
    {
      hyperlink: 'State Priorities and Scope',
      header: ['State Priorities and Scope', 2],
      fieldType: ['tinyMCE', 'medicaid-program-priorities-field'],
      errorMessage: ['Provide Medicaid Program and Priorities.', 2]
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
      fieldType: [
        'radio',
        /Yes, this activity is qualified for enhanced funding./i
      ],
      errorMessage: ['Select an Enhanced Funding Qualification', 3],
      subField: ['tinyMCE', 'justification-field'],
      subFieldErrorMessage: ['Provide an Enhanced Funding Justification', 2]
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
      fieldType: ['radio', /75\/25/],
      errorMessage: ['Select a federal-state split.', 6, 4],
      subField: ['radio', 'Maintenance & Operations (M&O)'],
      subFieldErrorMessage: ['Select a funding category.', 2]
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
      fieldType: ['radio', /No/i],
      errorMessage: ['Select yes or no', 30, 27],
      subField: ['textField', 'textarea[name="procurement.0.explanation"]'],
      subFieldErrorMessage: ['Provide an explanation', 2]
    }
  ];

  it(
    'tests the Admin check for mmis pages',
    { tags: ['@state', '@admin'] },
    function () {
      cy.turnOnAdminCheck(); // On each page verify the correct number of validation errors show

      cy.get('[class="eapd-admin-check  ds-c-drawer"]').should('exist');

      cy.goToKeyStatePersonnel();
      cy.findAllByText(
        'Provide the name of the State Medicaid Director.'
      ).should('have.length', 2);

      cy.turnOffAdminCheck();
      cy.get('[class="eapd-admin-check  ds-c-drawer"]').should('not.exist');
      cy.findAllByText(
        'Provide the name of the State Medicaid Director.'
      ).should('not.exist');

      cy.turnOnAdminCheck();

      cy.get('[data-cy="numRequired"]').should('have.text', '30');

      cy.collapseAdminCheck();

      cy.get('[class="eapd-admin-check-list"]').should('not.exist');
      cy.findByRole('button', {
        name: /Stop Administrative Check/i
      }).should('not.exist');
      cy.expandAdminCheck();

      // Check APD Overview validation errors; since it's a wierd case where
      // it has pre filled in values. We can also take this time to test if
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

      cy.collapseAdminCheck();
      cy.get('[data-cy="numRequired"]').should('have.text', '30');

      cy.findByRole('checkbox', { name: /Claims Processing/i }).click();
      cy.get('[data-cy="numRequired"]').should('have.text', '31');

      cy.findByRole('checkbox', { name: /Claims Processing/i }).click();
      cy.expandAdminCheck();

      defaultAdminCheck.forEach(value => {
        const {
          hyperlink,
          header,
          fieldType,
          errorMessage,
          subField,
          subFieldErrorMessage
        } = value;

        cy.checkAdminCheckHyperlinks(hyperlink, header[0], header[1]);
        cy.findAllByText(errorMessage[0]).should(
          'have.length',
          errorMessage[1]
        );

        cy.collapseAdminCheck();

        // Validation message should disappear/re-appear when value is changed
        if (fieldType[0] !== 'radio') {
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
          } else if (fieldType[0] === 'dateField') {
            fillDate('Start date', [1, 2, 2022]);
            cy.findAllByText(errorMessage[0]).should('not.exist');

            clearDate('Start date');
          }

          cy.expandAdminCheck();

          cy.findAllByText(errorMessage[0]).should(
            'have.length',
            errorMessage[1]
          );
        } else {
          // Split out radio since they cannot be unchecked
          if (errorMessage[2]) {
            cy.findAllByRole('radio', { name: fieldType[1] }).eq(0).click();
            cy.expandAdminCheck();
            cy.findAllByText(errorMessage[0]).should(
              'have.length',
              errorMessage[2]
            );
          } else {
            cy.findByRole('radio', { name: fieldType[1] }).click();
            cy.findAllByText(errorMessage[0]).should('not.exist');
            cy.expandAdminCheck();
          }

          cy.findAllByText(subFieldErrorMessage[0]).should(
            'have.length',
            subFieldErrorMessage[1]
          );
          cy.collapseAdminCheck();

          if (subField[0] === 'textField') {
            cy.get(subField[1]).type('Test value');
            cy.findAllByText(subFieldErrorMessage[0]).should('not.exist');
          } else if (subField[0] === 'tinyMCE') {
            cy.setTinyMceContent(subField[1], 'Testing this field!');
            cy.findAllByText(subFieldErrorMessage[0]).should('not.exist');
          } else if (subField[0] === 'radio') {
            cy.findByRole('radio', { name: subField[1] }).click();
            cy.findAllByText(subFieldErrorMessage[0]).should('not.exist');
          }

          cy.expandAdminCheck();
        }

        // TODO: Create a fully valid MMIS APD seed and check admin check completion here
      });
    }
  );
};
