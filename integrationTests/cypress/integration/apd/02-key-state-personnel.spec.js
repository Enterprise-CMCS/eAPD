// E2E tests for the key state personnel page & associated data as state staff.
// Uses the fixture "users.json" for filling in personnel data.

/* eslint-disable no-return-assign */
/* eslint-disable prefer-arrow-callback */

describe('Filling out Key Personnel for eAPD with valid login token', () => {
  // Reuse existing APD
  let apdURL;
  const years = [];

  before(() => {
    cy.useStateStaff();
    cy.contains('HITECH IAPD').click();
    cy.url().should('contain', '/apd');
    cy.location('pathname').then(pathname => (apdURL = pathname));

    // Get the FFYs for which the APD is applicable from overview page
    cy.get('[type="checkbox"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );

    cy.log(years);
  });

  // URL will be used to edit personnel data
  let apdPersonnelURL;
  describe('Add blank key personnel', () => {
    before(() => {
      cy.useStateStaff(apdURL);
      cy.goToKeyStatePersonnel();
      
      cy.url().should('contain', '/state-profile');
      cy.location('pathname').then(pathname => (apdPersonnelURL = pathname));
    });

    beforeEach(() => {
      cy.useStateStaff(apdPersonnelURL);
    });

    it('Access key personnel page', () => {
      cy.findByRole('heading', { name: /Key State Personnel/i }).should(
        'exist'
      );
    });

    it('Clear State Director/Office data', () => {
      cy.get('input[name="apd-state-profile-mdname"]').clear();
      cy.get('input[name="apd-state-profile-mdemail"]').clear();
      cy.get('input[name="apd-state-profile-mdphone"]').clear();
      cy.get('input[name="apd-state-profile-addr1"]').clear();
      cy.get('input[name="apd-state-profile-addr2"]').clear();
      cy.get('input[name="apd-state-profile-city"]').clear();
      cy.get('input[name="apd-state-profile-zip"]').clear();
      cy.get('select[name="apd-state-profile-state"]')
        .invoke('val', '')
        .trigger('change');

      cy.wait(1000); // Wait to save data
    });

    it('State dropdown has 56 states & territories', () => {
      cy.get('#apd-state-profile-state>option').should('have.length', 56);
    });

    it('Verify no primary contacts message', () => {
      cy.contains(
        'Primary Point of Contact has not been added for this activity'
      ).should('exist');
    });

    it('Add blank primary contact', () => {
      cy.findByRole('button', { name: /Add Primary Contact/i }).click();
      cy.findByRole('button', { name: /Done/i }).click();

      // Get div for the element containing user data as an alias
      cy.get('.form-and-review-list')
        .findByRole('heading', { name: /1.*/i })
        .parent()
        .as('primaryContactVals');
      // Check for default values
      cy.get('@primaryContactVals')
        .findByRole('heading', {
          name: /Primary Point of Contact name not specified/i
        })
        .should('exist');
      cy.get('@primaryContactVals')
        .find('li')
        .should($lis => {
          expect($lis).to.have.length(2);
          expect($lis.eq(0)).to.contain('Primary APD Point of Contact');
          expect($lis.eq(1)).to.contain('Role not specified');
        });
      // Protects against edge case of having '$' in name or role
      cy.get('@primaryContactVals')
        .contains('Total cost:')
        .parent()
        .contains('$')
        .should('have.text', '$0');

      cy.wait(1000); // Wait to save data
    });

    it('Add blank non-primary key personnel', () => {
      cy.findByRole('button', { name: /Add Key Personnel/i }).click();
      cy.findByRole('button', { name: /Done/i }).click();

      // Check for default values
      cy.get('.form-and-review-list')
        .findByRole('heading', { name: /2.*/i })
        .parent()
        .as('personnelVals');
      cy.get('@personnelVals')
        .findByRole('heading', { name: /Key Personnel name not specified/i })
        .should('exist');
      cy.get('@personnelVals')
        .find('li')
        .should($lis => {
          expect($lis).to.have.length(1);
          expect($lis.eq(0)).to.contain('Role not specified');
        });
      cy.get('@personnelVals')
        .contains('Total cost:')
        .parent()
        .contains('$')
        .should('have.text', '$0');

      cy.wait(1000); // Wait to save data
    });

    it('Add blank key personnel that is chargeable to the project', () => {
      cy.findByRole('button', { name: /Add Key Personnel/i }).click();
      // Have to force check; cypress does not think radio buttons are visible
      cy.get('input[type="radio"][value="yes"]')
        .scrollIntoView()
        .check({ force: true });
      cy.findByRole('button', { name: /Done/i }).click();

      // Check for default values
      cy.get('.form-and-review-list')
        .findByRole('heading', { name: /3.*/i })
        .parent()
        .as('personnelVals');
      cy.get('@personnelVals')
        .findByRole('heading', { name: /Key Personnel name not specified/i })
        .should('exist');
      cy.get('@personnelVals')
        .find('li')
        .should($lis => {
          expect($lis).to.have.length(1);
          expect($lis.eq(0)).to.contain('Role not specified');
        });
      cy.wait(1000); // Wait to save data

      // Check that FFY, FTE, and Total cost for each applicable year is 0.
      for (const year of years) {
        cy.get('@personnelVals').should(
          'contain',
          'FFY ' + year + ' Cost: $0 | FTE: 0 | Total: $0'
        );
      }
    });
  });

  // URL will be used for checking export data
  let exportURL;
  describe('Verify export data for blank key personnel', () => {
    before(() => {
      cy.useStateStaff(apdURL);

      cy.goToExportView();
      cy.url().should('contain', '/print');
      cy.location('pathname').then(pathname => (exportURL = pathname));
    });

    beforeEach(() => {
      cy.useStateStaff(exportURL);

      // Get div with personnel data
      cy.findByRole('heading', { name: /Key State Personnel/i })
        .parent()
        .as('personnel');
    });

    it('Medicaid director has default/blank values', () => {
      cy.get('@personnel')
        .findByRole('heading', { name: /Medicaid director/i })
        .next()
        .should('have.text', 'Name:  Email: Phone: '); // Name has a mysterious extra space...
    });

    it('No response for Medicaid office address', () => {
      cy.get('@personnel')
        .findByRole('heading', { name: /Medicaid office address/i })
        .next()
        .should('have.text', 'No response was provided');
    });

    it('The 3 blank key personnel have default values', () => {
      // Check text data for the first two personnel
      cy.get('@personnel')
        .findByRole('heading', {
          name: /Key Personnel and Program Management/i
        })
        .next()
        .find('ul')
        .first()
        .should(
          'have.text',
          '1. Primary Point of Contact name not specified' +
            'Primary APD Point of Contact' +
            'Role not specified' +
            'Email: ' +
            'Total cost: $0'
        )
        .next()
        .should(
          'have.text',
          '2. Key Personnel name not specified' +
            'Role not specified' +
            'Email: ' +
            'Total cost: $0'
        );

      // Create string to check for personnel who is chargeable for the project for certain years.
      let str =
        '3. Key Personnel name not specified' +
        'Role not specified' +
        'Email: ';
      for (let year of years) {
        str += 'FFY ' + year + ' Cost: $0 | FTE: 0 | Total: $0';
      }

      cy.get('@personnel')
        .findByRole('heading', {
          name: /Key Personnel and Program Management/i
        })
        .next()
        .find('ul')
        .eq(2)
        .should('have.text', str);
    });
  });

  describe('Fill out Key State Personnel Page', () => {
    beforeEach(() => {
      cy.useStateStaff(apdPersonnelURL);
    });

    it('Fill out State Director and Office Address', () => {
      cy.fixture('users').then(userData => {
        cy.get('input[name="apd-state-profile-mdname"]').type(userData[0].name);
        cy.get('input[name="apd-state-profile-mdemail"]').type(
          userData[0].email
        );
        cy.get('input[name="apd-state-profile-mdphone"]').type(
          userData[0].phone
        );
        cy.get('input[name="apd-state-profile-addr1"]').type(
          userData[0].address.street
        );
        cy.get('input[name="apd-state-profile-addr2"]').type(
          userData[0].address.suite
        );
        cy.get('input[name="apd-state-profile-city"]').type(
          userData[0].address.city
        );
        cy.get('input[name="apd-state-profile-zip"]').type(
          userData[0].address.zipcode
        );
        cy.get('select[name="apd-state-profile-state"]')
          .invoke('val', 'AL')
          .trigger('change');
      });
      cy.wait(1000); // Wait to save data
    });

    describe('Should be able to delete Key Personnel', () => {
      it('No delete for Primary Point of Contact', () => {
        // With two other key personnel added, there should only be two delete buttons.
        cy.findAllByRole('button', { name: /Delete/i }).should(
          'have.length',
          2
        );
      });

      it('Clicking delete opens confirmation modal', () => {
        cy.findAllByRole('button', { name: /Delete/i })
          .first()
          .click();
        cy.get('[id="dialog-title"]').should(
          'contain',
          'Delete Key Personnel?'
        );
      });

      it('Pressing cancel at delete confirmation modal does not delete personnel', () => {
        cy.findAllByRole('button', { name: /Delete/i })
          .first()
          .click();
        cy.findByRole('button', { name: /Cancel/i }).click();
        // If there are still two delete buttons, then no key personnel have been deleted.
        cy.findAllByRole('button', { name: /Delete/i }).should(
          'have.length',
          2
        );
      });

      it('Pressing delete at delete confirmation model does delete personnel', () => {
        cy.findAllByRole('button', { name: /Delete/i })
          .first()
          .click();
        // Specifically click on the delete button on the modal
        cy.get('.ds-c-button--danger').click();
        // If there is just one delete button, then a key personnel has been deleted.
        cy.findAllByRole('button', { name: /Delete/i }).should(
          'have.length',
          1
        );
        cy.wait(1000); // Wait to save data
      });
    });

    describe('Fill out Primary Point of Contact', () => {
      it('Clicking edit opens form', () => {
        cy.findAllByRole('button', { name: /Edit/i }).first().click();

        cy.findByRole('button', { name: /Done/i }).should('exist');
      });

      it('Edit Primary Point of Contact', () => {
        cy.findAllByRole('button', { name: /Edit/i }).first().click();

        cy.fixture('users').then(userData => {
          cy.get('input[name="apd-state-profile-pocname0"]').type(
            userData[1].name
          );
          cy.get('input[name="apd-state-profile-pocemail0"]').type(
            userData[1].email
          );
          cy.get('input[name="apd-state-profile-pocposition0"]').type(
            userData[1].username
          );
        });
        cy.findByRole('button', { name: /Done/i }).click();
        cy.wait(1000); // Wait to save data
      });

      it('Values entered in form remain on page', () => {
        cy.fixture('users').then(userData => {
          cy.get('.ds-c-review__heading')
            .contains('1.')
            .should('have.text', '1. ' + userData[1].name);
          cy.get('.ds-c-review__heading')
            .contains('1.')
            .next()
            .find('li')
            .should($lis => {
              expect($lis.eq(0)).to.contain('Primary APD Point of Contact');
              expect($lis.eq(1)).to.contain(userData[1].username);
            });
        });
      });
    });

    describe('Fill out other Key Personnel', () => {
      it('Clicking edit opens form', () => {
        cy.findAllByRole('button', { name: /Edit/i }).eq(1).click();

        cy.findByRole('button', { name: /Done/i }).should('exist');
      });

      it('Checking Yes opens the form for FFY costs', () => {
        cy.findAllByRole('button', { name: /Edit/i }).eq(1).click();

        // Toggle to see if the FFY cost prompts appear/disappear
        cy.get('input[type="radio"][value="no"]').check({ force: true });
        cy.wait(1000); // Wait for page data to update
        for (let year of years) {
          cy.contains('FFY ' + year + ' Cost').should('not.exist');
        }

        cy.get('input[type="radio"][value="yes"]').check({ force: true });
        cy.wait(1000); // Wait for page data to update
        for (let year of years) {
          cy.contains('FFY ' + year + ' Cost').should('exist');
        }

        cy.findByRole('button', { name: /Done/i }).click();
        cy.wait(1000); // Wait to save data
      });

      it('Edit Key Personnel', () => {
        cy.findAllByRole('button', { name: /Edit/i }).eq(1).click();

        cy.fixture('users').then(userData => {
          cy.get('input[name="apd-state-profile-pocname1"]').type(
            userData[2].name
          );
          cy.get('input[name="apd-state-profile-pocemail1"]').type(
            userData[2].email
          );
          cy.get('input[name="apd-state-profile-pocposition1"]').type(
            userData[2].username
          );
        });

        cy.findByRole('button', { name: /Done/i }).click();
        cy.wait(1000); // Wait to save data
      });

      it('Values entered in form remain on page', () => {
        cy.fixture('users').then(userData => {
          cy.get('.ds-c-review__heading')
            .contains('2.')
            .should('have.text', '2. ' + userData[2].name);
          cy.get('.ds-c-review__heading')
            .contains('2.')
            .next()
            .find('li')
            .should($lis => {
              expect($lis.eq(0)).to.contain(userData[2].username);
            });
        });
      });
    });

    it('Pressing continue navigates to Results of Previous Activities page', () => {
      cy.get('#continue-button').click();
      cy.findByRole('heading', {
        name: /Results of Previous Activities/i
      }).should('exist');
    });
  });

  describe('Verify export data for key personnel', () => {
    beforeEach(() => {
      cy.useStateStaff(exportURL);

      // Get div with personnel data
      cy.findByRole('heading', { name: /Key State Personnel/i })
        .parent()
        .as('personnel');
    });

    it('Medicaid director has input values', () => {
      cy.fixture('users').then(userData => {
        cy.get('@personnel')
          .findByRole('heading', { name: /Medicaid director/i })
          .next()
          .should(
            'have.text',
            'Name:  ' +
              userData[0].name + // Mysterious extra space
              'Email: ' +
              userData[0].email +
              'Phone: ' +
              userData[0].phone
          );
      });
    });

    it('Medicaid office address has input values', () => {
      cy.fixture('users').then(userData => {
        // Default state is Alabama
        cy.get('@personnel')
          .findByRole('heading', { name: /Medicaid office address/i })
          .next()
          .should(
            'have.text',
            userData[0].address.street +
              userData[0].address.suite +
              userData[0].address.city +
              ', AL ' +
              userData[0].address.zipcode
          );
      });
    });

    it('The 3 blank key personnel have input values', () => {
      cy.fixture('users').then(userData => {
        // Check text data for the first personnel
        cy.get('@personnel')
          .findByRole('heading', {
            name: /Key Personnel and Program Management/i
          })
          .next()
          .find('ul')
          .first()
          .should(
            'have.text',
            '1. ' +
              userData[1].name +
              'Primary APD Point of Contact' +
              userData[1].username +
              'Email: ' +
              userData[1].email +
              'Total cost: $0'
          );

        // Create string to check for personnel who is chargeable for the project for certain years.
        let str =
          '2. ' +
          userData[2].name +
          userData[2].username +
          'Email: ' +
          userData[2].email;
        for (let year of years) {
          str += 'FFY ' + year + ' Cost: $0 | FTE: 0 | Total: $0';
        }

        cy.get('@personnel')
          .findByRole('heading', {
            name: /Key Personnel and Program Management/i
          })
          .next()
          .find('ul')
          .eq(1)
          .should('have.text', str);
      });
    });
  });
});
