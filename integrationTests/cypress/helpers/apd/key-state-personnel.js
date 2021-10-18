export const testDefaultKeyStatePersonnel = years => {
  beforeEach(() => {
    cy.goToKeyStatePersonnel();
    cy.url().should('contain', '/state-profile');
  });

  it('should be on the correct page', () => {
    cy.url().should('include', '/state-profile');
    cy.findByRole('heading', { name: /Key State Personnel/i }).should('exist');
  });

  it('should have the default State Director/Office', () => {
    cy.get('input[name="apd-state-profile-mdname"]')
      .clear()
      .should('have.text', '');
    cy.waitForSave();
    cy.get('input[name="apd-state-profile-mdemail"]')
      .clear()
      .should('have.text', '');
    cy.waitForSave();
    cy.get('input[name="apd-state-profile-mdphone"]')
      .clear()
      .should('have.text', '');
    cy.waitForSave();
    cy.get('input[name="apd-state-profile-addr1"]')
      .clear()
      .should('have.text', '');
    cy.waitForSave();
    cy.get('input[name="apd-state-profile-addr2"]')
      .clear()
      .should('have.text', '');
    cy.waitForSave();
    cy.get('input[name="apd-state-profile-city"]')
      .clear()
      .should('have.text', '');
    cy.waitForSave();
    cy.get('input[name="apd-state-profile-zip"]')
      .clear()
      .should('have.text', '');
    cy.waitForSave();
    cy.get('select[name="apd-state-profile-state"]')
      .invoke('val', '')
      .trigger('change');
    cy.waitForSave();
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
    cy.waitForSave();
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
  });

  it('Add blank non-primary key personnel', () => {
    cy.findByRole('button', { name: /Add Key Personnel/i }).click();
    cy.waitForSave();
    cy.findByRole('button', { name: /Done/i }).click();
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting

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
  });

  it('Add blank key personnel that is chargeable to the project', () => {
    cy.findByRole('button', { name: /Add Key Personnel/i }).click();
    cy.waitForSave();
    // Have to force check; cypress does not think radio buttons are visible
    cy.get('input[type="radio"][value="yes"]')
      .scrollIntoView()
      .check({ force: true });
    cy.waitForSave();
    cy.findByRole('button', { name: /Done/i }).click();
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting

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

    // Check that FFY, FTE, and Total cost for each applicable year is 0.
    years.forEach(year => {
      cy.get('@personnelVals').should(
        'contain',
        `FFY ${year} Cost: $0 | FTE: 0 | Total: $0`
      );
    });
  });
};

export const testDefaultKeyStatePersonnelExportView = years => {
  beforeEach(() => {
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
    let str = '3. Key Personnel name not specifiedRole not specifiedEmail: ';
    str += years
      .map(year => `FFY ${year} Cost: $0 | FTE: 0 | Total: $0`)
      .join('');

    cy.get('@personnel')
      .findByRole('heading', {
        name: /Key Personnel and Program Management/i
      })
      .next()
      .find('ul')
      .eq(2)
      .should('have.text', str);
  });
};

export const testKeyStatePersonnelWithData = years => {
  beforeEach(() => {
    cy.goToKeyStatePersonnel();
    cy.url().should('contain', '/state-profile');
    cy.findByRole('heading', { name: /Key State Personnel/i }).should('exist');
  });

  it('should add blank Primary Contact and Key Personnel', () => {
    // create blank Primary Contact and Key Personnel
    cy.findByRole('button', { name: /Add Primary Contact/i }).click();
    cy.waitForSave();
    cy.findByRole('button', { name: /Done/i }).click();

    cy.findByRole('button', { name: /Add Key Personnel/i }).click();
    cy.waitForSave();
    cy.findByRole('button', { name: /Done/i }).click();

    cy.findByRole('button', { name: /Add Key Personnel/i }).click();
    cy.waitForSave();
    cy.findByRole('button', { name: /Done/i }).click();
  });

  it('should be on the correct page', () => {
    cy.url().should('include', '/state-profile');
    cy.findByRole('heading', { name: /Key State Personnel/i }).should('exist');
  });

  it('Fill out State Director and Office Address', () => {
    cy.fixture('users').then(userData => {
      cy.get('input[name="apd-state-profile-mdname"]')
        .clear()
        .type(userData[0].name);
      cy.waitForSave();
      cy.get('input[name="apd-state-profile-mdemail"]')
        .clear()
        .type(userData[0].email);
      cy.waitForSave();
      cy.get('input[name="apd-state-profile-mdphone"]')
        .clear()
        .type(userData[0].phone);
      cy.waitForSave();
      cy.get('input[name="apd-state-profile-addr1"]')
        .clear()
        .type(userData[0].address.street);
      cy.waitForSave();
      cy.get('input[name="apd-state-profile-addr2"]')
        .clear()
        .type(userData[0].address.suite);
      cy.waitForSave();
      cy.get('input[name="apd-state-profile-city"]')
        .clear()
        .type(userData[0].address.city);
      cy.waitForSave();
      cy.get('input[name="apd-state-profile-zip"]')
        .clear()
        .type(userData[0].address.zipcode);
      cy.waitForSave();
      cy.get('select[name="apd-state-profile-state"]')
        .invoke('val', 'AL')
        .trigger('change');
      cy.waitForSave();
    });
  });

  describe('Should be able to delete Key Personnel', () => {
    it('No delete for Primary Point of Contact', () => {
      // With two other key personnel added, there should only be two delete buttons.
      cy.findAllByRole('button', { name: /Delete/i }).should('have.length', 2);
    });

    it('Clicking delete opens confirmation modal', () => {
      cy.findAllByRole('button', { name: /Delete/i })
        .first()
        .click();
      cy.get('[id="dialog-title"]').should('contain', 'Delete Key Personnel?');
    });

    it('Pressing cancel at delete confirmation modal does not delete personnel', () => {
      cy.findAllByRole('button', { name: /Delete/i })
        .first()
        .click();
      cy.findByRole('button', { name: /Cancel/i }).click();
      // If there are still two delete buttons, then no key personnel have been deleted.
      cy.findAllByRole('button', { name: /Delete/i }).should('have.length', 2);
    });

    it('Pressing delete at delete confirmation model does delete personnel', () => {
      cy.findAllByRole('button', { name: /Delete/i })
        .first()
        .click();
      // Specifically click on the delete button on the modal
      cy.get('.ds-c-button--danger').click();
      cy.waitForSave();
      // If there is just one delete button, then a key personnel has been deleted.
      cy.findAllByRole('button', { name: /Delete/i }).should('have.length', 1);
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
        cy.get('input[name="apd-state-profile-pocname0"]')
          .clear()
          .type(userData[1].name);
        cy.waitForSave();
        cy.get('input[name="apd-state-profile-pocemail0"]')
          .clear()
          .type(userData[1].email);
        cy.waitForSave();
        cy.get('input[name="apd-state-profile-pocposition0"]')
          .clear()
          .type(userData[1].username);
        cy.waitForSave();
      });
      cy.findByRole('button', { name: /Done/i }).click();
    });

    it('Values entered in form remain on page', () => {
      cy.fixture('users').then(userData => {
        cy.get('.ds-c-review__heading')
          .contains('1.')
          .should('have.text', `1. ${userData[1].name}`);
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
      cy.waitForSave();
      years.forEach(year => {
        cy.contains(`FFY ${year} Cost`).should('not.exist');
      });

      cy.get('input[type="radio"][value="yes"]').check({ force: true });
      cy.waitForSave();
      years.forEach(year => {
        cy.contains(`FFY ${year} Cost`).should('exist');
      });

      cy.findByRole('button', { name: /Done/i }).click();
    });

    it('Edit Key Personnel', () => {
      cy.findAllByRole('button', { name: /Edit/i }).eq(1).click();

      cy.fixture('users').then(userData => {
        cy.get('input[name="apd-state-profile-pocname1"]')
          .clear()
          .type(userData[2].name);
        cy.waitForSave();
        cy.get('input[name="apd-state-profile-pocemail1"]')
          .clear()
          .type(userData[2].email);
        cy.waitForSave();
        cy.get('input[name="apd-state-profile-pocposition1"]')
          .clear()
          .type(userData[2].username);
        cy.waitForSave();
      });

      cy.findByRole('button', { name: /Done/i }).click();
    });

    it('Values entered in form remain on page', () => {
      cy.fixture('users').then(userData => {
        cy.get('.ds-c-review__heading')
          .contains('2.')
          .should('have.text', `2. ${userData[2].name}`);
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
};

export const testKeytStatePersonnelExportViewWithData = years => {
  beforeEach(() => {
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
          `Name:  ${
            userData[0].name // Mysterious extra space
          }Email: ${userData[0].email}Phone: ${userData[0].phone}`
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
          `${
            userData[0].address.street +
            userData[0].address.suite +
            userData[0].address.city
          }, AL ${userData[0].address.zipcode}`
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
          `1. ${userData[1].name}Primary APD Point of Contact${userData[1].username}Email: ${userData[1].email}Total cost: $0`
        );

      // Create string to check for personnel who is chargeable for the project for certain years.
      let str = `2. ${userData[2].name}${userData[2].username}Email: ${userData[2].email}`;
      str += years
        .map(year => `FFY ${year} Cost: $0 | FTE: 0 | Total: $0`)
        .join('');

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
};
