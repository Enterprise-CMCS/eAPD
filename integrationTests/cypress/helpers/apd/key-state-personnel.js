export const testDefaultKeyStatePersonnel = () => {
  it('should have the default values for Key State Personnel', () => {
    cy.goToKeyStatePersonnel();

    cy.url().should('contain', '/state-profile');
    cy.findByRole('heading', { name: /Key State Personnel/i }).should('exist');

    cy.get('input[name="apd-state-profile-mdname"]')
      .clear()
      .should('have.text', '');

    cy.get('input[name="apd-state-profile-mdemail"]')
      .clear()
      .should('have.text', '');

    cy.get('input[name="apd-state-profile-mdphone"]')
      .clear()
      .should('have.text', '');

    cy.get('input[name="apd-state-profile-addr1"]')
      .clear()
      .should('have.text', '');

    cy.get('input[name="apd-state-profile-addr2"]')
      .clear()
      .should('have.text', '');

    cy.get('input[name="apd-state-profile-city"]')
      .clear()
      .should('have.text', '');

    cy.get('input[name="apd-state-profile-zip"]')
      .clear()
      .should('have.text', '');

    cy.get('select[name="apd-state-profile-state"]')
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
      const firstUser = userData[0];
      const secondUser = userData[1];
      const thirdUser = userData[2];

      cy.get('input[name="apd-state-profile-mdname"]')
        .clear()
        .type(firstUser.name);

      cy.get('input[name="apd-state-profile-mdemail"]')
        .clear()
        .type(firstUser.email)

      cy.get('input[name="apd-state-profile-mdphone"]')
        .clear()
        .type(firstUser.phone)

      cy.get('input[name="apd-state-profile-addr1"]')
        .clear()
        .type(firstUser.address.street)

      cy.get('input[name="apd-state-profile-addr2"]')
        .clear()
        .type(firstUser.address.suite)

      cy.get('input[name="apd-state-profile-city"]')
        .clear()
        .type(firstUser.address.city)

      cy.get('select[id="apd-state-profile-state"]')
        .invoke('val', 'AL')
        .trigger('change');

      cy.get('input[name="apd-state-profile-zip"]')
        .clear()
        .type(firstUser.address.zipcode)

      cy.findByRole('button', { name: /Add Primary Contact/i }).click();

      cy.get('input[name="apd-state-profile-pocname0"]')
        .clear()
        .type(secondUser.name);

      cy.get('input[name="apd-state-profile-pocemail0"]')
        .clear()
        .type(secondUser.email);

      cy.get('input[name="apd-state-profile-pocposition0"]')
        .clear()
        .type(secondUser.username);

      cy.findByRole('button', { name: /Done/i }).click();

      cy.get('.ds-c-review__heading')
        .contains('1.')
        .should('have.text', `1. ${secondUser.name}`);
  
      cy.get('.ds-c-review__heading')
        .contains('1.')
        .next()
        .find('li')
        .should($lis => {
          expect($lis.eq(0)).to.contain('Primary APD Point of Contact');
          expect($lis.eq(1)).to.contain(secondUser.username);
        });

      cy.findByRole('button', { name: /Add Key Personnel/i }).click();

      cy.get('input[name="apd-state-profile-pocname1"]')
          .clear()
          .type(thirdUser.name);

        cy.get('input[name="apd-state-profile-pocemail1"]')
          .clear()
          .type(thirdUser.email);

        cy.get('input[name="apd-state-profile-pocposition1"]')
          .clear()
          .type(thirdUser.username);

      // Toggle to see if the FFY cost prompts appear/disappear
      cy.get('input[type="radio"][value="no"]').check({ force: true });

      years.forEach(year => {
        cy.contains(`FFY ${year} Cost`).should('not.exist');
      });

      cy.get('input[type="radio"][value="no"]').check({ force: true });

      cy.findByRole('button', { name: /Done/i }).click();

      cy.get('.form-and-review-list')
        .findAllByRole('button', { name: /Edit/i })
        .should('have.length', 2);

      cy.get('.form-and-review-list')
        .findAllByRole('button', { name: /Edit/i }).eq(1).click();

      cy.get('input[type="radio"][value="yes"]')
        .scrollIntoView()
        .check({ force: true });

      years.forEach(year => {
        cy.contains(`FFY ${year} Cost`).should('exist');
      });

      cy.findByRole('button', { name: /Done/i }).click();

      cy.get('.ds-c-review__heading')
        .contains('2.')
        .should('have.text', `2. ${thirdUser.name}`);
      cy.get('.ds-c-review__heading')
        .contains('2.')
        .next()
        .find('li')
        .should($lis => {
          expect($lis.eq(0)).to.contain(thirdUser.username);
        });

      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.waitForSave();
    });
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

    cy.findByRole('button', { name: /Back to APD/i }).click({ force: true });
  });
};
