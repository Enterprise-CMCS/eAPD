// <reference types="cypress" />

// Tests the MMIS workflow of an APD
describe('Default APD', { tags: ['@apd', '@default', '@slow'] }, () => {
  let apdUrl;
  let apdId;
  const years = [];

  /* eslint-disable-next-line prefer-arrow-callback, func-names */
  before(function () {
    cy.useStateStaff();
    cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
    cy.reload();

    // Tests new MMIS Create APD workflow
    cy.findAllByText('Create new').click();

    cy.findByRole('radio', { name: /MMIS/i }).click();
    cy.findByLabelText('APD Name').clear().type('MMIS IAPD').blur();
    cy.findByRole('radio', { name: /No, this is for a new project./i }).click();
    cy.findByRole('checkbox', {
      name: /1115 or Waiver Support Systems/i
    }).click();

    cy.findByRole('button', { name: /Create an APD/i }).click();

    cy.findByRole(
      'heading',
      { name: /APD Overview/i },
      { timeout: 100000 }
    ).should('exist');
    cy.location('pathname').then(pathname => {
      apdUrl = pathname.replace('/apd-overview', '');
      cy.log({ apdUrl });
      apdId = apdUrl.split('/').pop();
      cy.log({ apdId });
    });

    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );
  });

  beforeEach(() => {
    cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
    cy.visit(apdUrl);
  });

  after(() => {
    cy.deleteAPD(apdId);
  });

  describe('Form View', () => {
    /* eslint-disable-next-line prefer-arrow-callback, func-names */
    beforeEach(function () {
      cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
    });

    describe('MMIS Workflow', () => {
      it('tests the create new page', () => {
        // cy.get('[type="checkbox"][checked]').should('have.length', 2);

        cy.findAllByText('AK APD Home').click();
        cy.findAllByText('Create new').click();

        cy.contains('Cancel').click();
        cy.findByRole(
          'heading',
          { name: /Alaska APDs/i },
          { timeout: 100000 }
        ).should('exist');
        cy.findAllByText('Create new').click();

        cy.contains(
          'This selection cannot be changed after creating a new APD.'
        ).should('exist');
        cy.findByRole('radio', { name: /MMIS/i }).focus().blur();
        // cy.contains('Select an APD Type').should('exist');

        // Select HITECH, ensure Update Type section exists and Medicaid Business Areas doesnt exist
        cy.findByRole('radio', { name: /HITECH/i }).click();
        cy.contains('Select an APD Type').should('not.exist');
        cy.contains('Update Type').should('exist');
        cy.contains('Medicaid Business Areas').should('not.exist');

        cy.findByRole('radio', { name: /MMIS/i }).click();
        cy.contains('Is this an APD update?').should('exist');
        cy.contains('Medicaid Business Areas').should('exist');

        cy.findByLabelText('APD Name').clear().blur();
        // cy.contains('Provide an APD Name.').should('exist')
        cy.findByLabelText('APD Name').clear().type('MMIS IAPD').blur();
        cy.contains('Provide an APD Name.').should('not.exist');

        years.forEach(year => {
          cy.findByRole('checkbox', { name: year }).click();
        });

        // cy.contains('At least one FFY must be selected to continue with your APD. Select your FFY(s).').should('exist')

        years.forEach(year => {
          cy.findByRole('checkbox', { name: year }).click();
        });

        cy.findByRole('radio', { name: /Yes, it is an update./i })
          .focus()
          .blur();
        // cy.contains('Indicate whether this APD is an update.').should('exist');
        cy.findByRole('radio', { name: /Yes, it is an update./i }).click();
        cy.contains('Indicate whether this APD is an update.').should(
          'not.exist'
        );

        cy.findByRole('checkbox', { name: /Annual update/i })
          .focus()
          .blur();
        // cy.contains('Select an Update Type.').should('exist')
        cy.findByRole('checkbox', { name: /Annual update/i }).click();
        cy.contains('Select an Update Type.').should('not.exist');

        cy.findByRole('checkbox', {
          name: /1115 or Waiver Support Systems/i
        })
          .focus()
          .blur();
        // cy.contains('Select at least one Medicaid Business Area.').should('exist');

        cy.findByRole('checkbox', {
          name: /Other/i
        })
          .focus()
          .click();
        cy.contains('Select at least one Medicaid Business Area.').should(
          'not.exist'
        );

        // BLUR TEXTBOX
        cy.contains('Provide an other Medicaid Business Area(s).').should(
          'exist'
        );
        // TYPE IN TEXTBOX
        cy.contains('Provide an other Medicaid Business Area(s).').should(
          'not.exist'
        );

        // Test that the information actually saved
      });
    });
  });
});
