export const testDefaultKeyStatePersonnel = () => {
  it('should have the default values for Key State Personnel', () => {
    cy.goToKeyStatePersonnel();

    cy.url().should('contain', '/state-profile');
    cy.findByRole('heading', { name: /Key State Personnel/i }).should('exist');

    cy.contains('Provide the name of the State Medicaid Director.');
    cy.contains('Provide the email address of the State Medicaid Director.');
    cy.contains(
      'Provide a valid phone number for the State Medicaid Director.'
    );
    cy.contains('Provide a mailing street address for the Medicaid office.');
    cy.contains('Provide a city name.');
    cy.contains('Provide a zip code.');

    cy.get('input[name="medicaidDirector.name"]')
      .clear()
      .should('have.text', '');

    cy.get('input[name="medicaidDirector.email"]')
      .clear()
      .should('have.text', '');

    cy.get('input[name="medicaidDirector.phone"]')
      .clear()
      .should('have.text', '');

    cy.get('input[name="medicaidOffice.address1"]')
      .clear()
      .should('have.text', '');

    cy.get('input[name="medicaidOffice.address2"]')
      .clear()
      .should('have.text', '');

    cy.get('input[name="medicaidOffice.city"]').clear().should('have.text', '');

    cy.get('input[name="medicaidOffice.zip"]').clear().should('have.text', '');

    cy.get('select[name="medicaidOffice.state"]')
      .invoke('val', '')
      .trigger('change');

    cy.get('#apd-state-profile-state>option').should('have.length', 56);

    cy.contains(
      'Primary Point of Contact has not been added for this activity'
    ).should('exist');

    cy.waitForSave();
  });

  it('should display the default values in the export view', () => {
    cy.goToExportView();

    cy.findByRole('heading', { name: /Key State Personnel/i })
      .parent()
      .as('personnel');

    cy.get('@personnel')
      .findByRole('heading', { name: /Medicaid director/i })
      .next()
      .should('have.text', 'Name:  Email: Phone: '); // Name has a mysterious extra space...

    cy.get('@personnel')
      .findByRole('heading', { name: /Medicaid office address/i })
      .next()
      .should('have.text', 'No response was provided');

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};

export const testKeyStatePersonnelWithData = years => {
  it('Fill out Key State Personnel', () => {
    cy.goToKeyStatePersonnel();

    cy.url().should('include', '/state-profile');
    cy.findByRole('heading', { name: /Key State Personnel/i }).should('exist');

    cy.fixture('users').then(userData => {
      cy.get('input[name="medicaidDirector.name"]')
        .clear()
        .type(userData[0].name);

      cy.get('input[name="medicaidDirector.email"]')
        .clear()
        .type(userData[0].email);

      cy.get('input[name="medicaidDirector.phone"]')
        .clear()
        .type(userData[0].phone);

      cy.get('input[name="medicaidOffice.address1"]')
        .clear()
        .type(userData[0].address.street);

      cy.get('input[name="medicaidOffice.address2"]')
        .clear()
        .type(userData[0].address.suite);

      cy.get('input[name="medicaidOffice.city"]')
        .clear()
        .type(userData[0].address.city);

      cy.get('input[name="medicaidOffice.zip"]')
        .clear()
        .type(userData[0].address.zipcode);

      cy.get('select[name="medicaidOffice.state"]')
        .select('AL')
        .trigger('change');

      cy.findByRole('button', { name: /Add Primary Contact/i }).click();

      cy.get('[data-cy="key-person-0__name"]').clear().type(userData[1].name);

      cy.get('[data-cy="key-person-0__email"]').clear().type(userData[1].email);

      cy.get('[data-cy="key-person-0__position"]')
        .clear()
        .type(userData[1].username);

      cy.get('input[type="radio"][value="no"]').check({ force: true }).blur();
      cy.findByRole('button', { name: /Save/i }).click();

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
      cy.get('.form-and-review-list')
        .findAllByRole('button', { name: /Edit/i })
        .click();

      // Toggle to see if the FFY cost prompts appear/disappear
      cy.get('input[type="radio"][value="yes"]').check({ force: true });

      years.forEach(year => {
        cy.contains(`FFY ${year} Cost`).should('exist');
      });

      cy.get('input[type="radio"][value="no"]').check({ force: true }).blur();

      years.forEach(year => {
        cy.contains(`FFY ${year} Cost`).should('not.exist');
      });
      cy.findByRole('button', { name: /Save/i }).click();
    });

    cy.findByRole('button', { name: /Add Key Personnel/i }).click();

    cy.fixture('users').then(userData => {
      cy.get('[data-cy="key-person-1__name"]').clear().type(userData[2].name);

      cy.get('[data-cy="key-person-1__email"]').clear().type(userData[2].email);

      cy.get('[data-cy="key-person-1__position"]')
        .clear()
        .type(userData[2].username);

      cy.get('input[type="radio"][value="no"]').check({ force: true }).blur();

      cy.findByRole('button', { name: /Save/i }).click();

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

      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.waitForSave();
    });

    cy.findByRole('button', { name: /Add Key Personnel/i }).click();

    cy.fixture('users').then(userData => {
      cy.get('[data-cy="key-person-2__name"]').clear().type(userData[3].name);

      cy.get('[data-cy="key-person-2__email"]').clear().type(userData[3].email);

      cy.get('[data-cy="key-person-2__position"]')
        .clear()
        .type(userData[3].username);

      cy.get('input[type="radio"][value="yes"]').check({ force: true }).blur();

      cy.get('[data-cy="key-person-2-0__cost"]').type('100000');
      cy.get('[data-cy="key-person-2-0__fte"]').type('0.5');
      cy.get('[data-cy="key-person-2-1__cost"]').type('100000');
      cy.get('[data-cy="key-person-2-1__fte"]').type('0.5').blur();

      cy.findByRole('button', { name: /Save/i }).click();

      cy.get('.ds-c-review__heading')
        .contains('3.')
        .should('have.text', `3. ${userData[3].name}`);
      cy.get('.ds-c-review__heading')
        .contains('3.')
        .next()
        .find('li')
        .should($lis => {
          expect($lis.eq(0)).to.contain(userData[3].username);
        });

      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.waitForSave();
    });

    cy.findAllByRole('button', { name: /Delete/i })
      .eq(0)
      .click();
    cy.get('.ds-c-button--danger').click();
    cy.get('.form-and-review-list')
      .findAllByRole('button', { name: /Edit/i })
      .should('have.length', 2);

    cy.get('.form-and-review-list')
      .findAllByRole('button', { name: /Edit/i })
      .eq(1)
      .click();

    cy.findByRole('button', { name: /Cancel/i }).click();
  });

  it('should display the correct values in the export view', () => {
    cy.goToExportView();

    cy.findByRole('heading', { name: /Key State Personnel/i })
      .parent()
      .as('personnel');

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
      let str = `2. ${userData[3].name}${userData[3].username}Email: ${userData[3].email}`;
      str += years
        .map(year => `FFY ${year} Cost: $100,000 | FTE: 0.5 | Total: $50,000`)
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

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
