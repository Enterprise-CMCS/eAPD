/// <reference types="cypress" />

// Tests filling out state admin delegation form

const thisFFY = (() => {
  const year = new Date().getFullYear();

  // Federal fiscal year starts October 1,
  // but Javascript months start with 0 for
  // some reason, so October is month 9.
  if (new Date().getMonth() > 8) {
    return year + 1;
  }
  return year;
})();

const twoYears = [thisFFY, thisFFY + 1].map(y => `${y}`);
let delegateStateAdminFormUrl;

before(() => {
  cy.useFedAdmin();
  cy.findByRole('button', { name: /Add State Admin Letter/i }).click();
  cy.location('pathname').then(pathname => {
    delegateStateAdminFormUrl = pathname;
  });
  cy.fixture('users').then(userData => {
    cy.task('db:resetcertification', { email: userData[0].email });
  });
});

beforeEach(() => {
  cy.useFedAdmin(delegateStateAdminFormUrl);
});

describe(
  'adding and removing state admin delegation forms',
  { tags: ['@fed', '@admin'] },
  () => {
    const getInputByLabel = label => {
      return cy
        .contains('label', label)
        .invoke('attr', 'for')
        .then(id => {
          cy.get(`#${id}`);
        });
    };

    it('tests default values', () => {
      cy.url().should('include', '/delegate-state-admin');

      cy.get('legend').contains('Period of Delegated Authority');

      cy.get('input[type=radio]').should('have.length', 2);

      twoYears.forEach(year => {
        getInputByLabel(year).should('have.value', year);
        getInputByLabel(year).should('not.be.checked');
      });

      getInputByLabel(
        'Name of State employee to be delegated as eAPD State Adminstrator'
      ).should('have.value', '');
      cy.get('select').first().contains('Select an Option');
      getInputByLabel('State employee email address').should('have.value', '');

      // Check the drop target zone is rendered
      cy.get('[id=file-input]').contains('Drag files here');
    });

    it('hitting cancel should return user back to federal dashboard', () => {
      cy.contains('Cancel').click();
      cy.contains('Federal Administrator Portal').should('be.visible');
    });

    it('tests filling out and submitting the form', () => {
      cy.intercept(
        'POST',
        `${Cypress.env('API')}/auth/certifications/files`
      ).as('uploadFile');

      cy.intercept('POST', `${Cypress.env('API')}/auth/certifications`).as(
        'submitForm'
      );

      // Check that submit button starts disabled
      cy.findByRole('button', { name: 'Add State Admin Letter' }).should(
        'be.disabled'
      );

      cy.get('input[type=radio]').first().check({ force: true });

      cy.fixture('users').then(userData => {
        getInputByLabel(
          'Name of State employee to be delegated as eAPD State Adminstrator'
        ).type(userData[0].name);
        cy.get('select').select('Maryland');
        getInputByLabel('State employee email address').type(userData[0].email);

        cy.fixture('test.pdf', 'binary')
          .then(Cypress.Blob.binaryStringToBlob)
          .then(fileContent => {
            const file = new File([fileContent], 'test.pdf', {
              type: 'application/pdf'
            });

            cy.get('#file-input').trigger('drop', {
              dataTransfer: {
                files: [file]
              }
            });
          });

        cy.wait('@uploadFile', { timeout: 30000 });

        cy.get('[alt="PDF document icon"]').should('be.visible');
        cy.get('a').contains('test.pdf').should('be.visible');

        // When filled out form submit button should be enabled
        cy.get('button')
          .contains('Add State Admin Letter')
          .should('not.be.disabled');

        cy.contains('Add State Admin Letter').click();
        cy.wait('@submitForm', { timeout: 30000 });

        cy.contains('Federal Administrator Portal').should('be.visible');
      });
    });

    it('allows a letter to be deleted', () => {
      cy.intercept('GET', `${Cypress.env('API')}/auth/certifications`).as(
        'loadCertifications'
      );
      cy.intercept('DELETE', `${Cypress.env('API')}/auth/certifications`).as(
        'deleteCertification'
      );

      cy.visit('/');
      cy.wait('@loadCertifications');

      cy.findByRole('heading', { name: /Federal Administrator Portal/i });

      cy.fixture('users').then(userData => {
        cy.contains(userData[0].name)
          .parent('tr')
          .within(() => {
            // all searches are automatically rooted to the found tr element
            cy.get('td').eq(6).contains('button', 'Delete').click();
          });

        cy.get('#react-aria-modal-dialog').within(() => {
          cy.contains('Delete Certification?').should('be.visible');
          cy.get('button').contains('Delete').click({ force: true });
        });
      });
    });

    it('allows a letter previously deleted to be added again', () => {
      cy.intercept(
        'POST',
        `${Cypress.env('API')}/auth/certifications/files`
      ).as('uploadFile');

      cy.intercept('POST', `${Cypress.env('API')}/auth/certifications`).as(
        'submitForm'
      );

      // Check that submit button starts disabled
      cy.findByRole('button', { name: 'Add State Admin Letter' }).should(
        'be.disabled'
      );

      cy.get('input[type=radio]').first().check({ force: true });

      cy.fixture('users').then(userData => {
        getInputByLabel(
          'Name of State employee to be delegated as eAPD State Adminstrator'
        ).type(userData[0].name);
        cy.get('select').select('Maryland');
        getInputByLabel('State employee email address').type(userData[0].email);

        cy.fixture('test.pdf', 'binary')
          .then(Cypress.Blob.binaryStringToBlob)
          .then(fileContent => {
            const file = new File([fileContent], 'test.pdf', {
              type: 'application/pdf'
            });

            cy.get('#file-input').trigger('drop', {
              dataTransfer: {
                files: [file]
              }
            });
          });

        cy.wait('@uploadFile', { timeout: 30000 });

        cy.get('[alt="PDF document icon"]').should('be.visible');
        cy.get('a').contains('test.pdf').should('be.visible');

        // When filled out form submit button should be enabled
        cy.get('button')
          .contains('Add State Admin Letter')
          .should('not.be.disabled');

        cy.contains('Add State Admin Letter').click();
        cy.wait('@submitForm', { timeout: 30000 });

        cy.contains(userData[0].name).should('be.visible');

        cy.intercept('GET', `${Cypress.env('API')}/auth/certifications`).as(
          'loadCertifications'
        );
        cy.intercept('DELETE', `${Cypress.env('API')}/auth/certifications`).as(
          'deleteCertification'
        );

        cy.visit('/');
        cy.wait('@loadCertifications');

        cy.findByRole('heading', { name: /Federal Administrator Portal/i });

        cy.fixture('users').then(userData => {
          cy.contains(userData[0].name)
            .parent('tr')
            .within(() => {
              // all searches are automatically rooted to the found tr element
              cy.get('td').eq(6).contains('button', 'Delete').click();
            });

          cy.get('#react-aria-modal-dialog').within(() => {
            cy.contains('Delete Certification?').should('be.visible');
            cy.get('button').contains('Delete').click({ force: true });
          });
        });
      });
    });
  }
);
