describe('state admin letters table', { tags: ['@fed', '@admin'] }, () => {
  const getInputByLabel = label => {
    return cy
      .contains('label', label)
      .invoke('attr', 'for')
      .then(id => {
        cy.get(`#${id}`);
      });
  };

  before(() => {
    cy.useFedAdmin();
    cy.task('db:resetcertification', { email: 'Sincere@april.biz' });
  });

  beforeEach(() => {
    cy.useFedAdmin('/');
    cy.findByRole('heading', { name: /Federal Administrator Portal/i });
  });

  after(() => cy.task('db:resetcertificationmatch'));

  it('tests default values', () => {
    // Filter labels
    cy.get('#state-admin-letters').contains('Status');
    cy.get('#state-admin-letters').contains('State');
    cy.get('#state-admin-letters').contains('Search');

    getInputByLabel('Status').should('have.value', '');
    getInputByLabel('State').should('have.value', '');
    getInputByLabel('Search').should('have.value', '');

    // Table column headers
    cy.get('#state-admin-letters').contains('Name');
    cy.get('#state-admin-letters').contains('Email');
    cy.get('#state-admin-letters').contains('FFY');
    cy.get('#state-admin-letters').contains('State');
    cy.get('#state-admin-letters').contains('Status');
    cy.get('#state-admin-letters').contains('View');
    cy.get('#state-admin-letters').contains('Actions');

    cy.get('#state-admin-letters').contains('Rows per page:');
  });

  it('allows filtering by status', () => {
    cy.get('#state-admin-letters td:contains(No Match)').should(
      'have.length',
      1
    );
    cy.get('#state-admin-letters td:contains(Pending Match)').should(
      'have.length',
      1
    );

    getInputByLabel('Status').select('Pending Match');
    cy.get('#state-admin-letters td:contains(No Match)').should(
      'have.length',
      0
    );
    cy.get('#state-admin-letters td:contains(Pending Match)').should(
      'have.length',
      1
    );

    getInputByLabel('Status').select('No Match');
    cy.get('#state-admin-letters td:contains(No Match)').should(
      'have.length',
      1
    );
    cy.get('#state-admin-letters td:contains(Pending Match)').should(
      'have.length',
      0
    );

    getInputByLabel('Status').select('All');
    cy.get('#state-admin-letters td:contains(No Match)').should(
      'have.length',
      1
    );
    cy.get('#state-admin-letters td:contains(Pending Match)').should(
      'have.length',
      1
    );
  });

  it('allows filtering by state', () => {
    cy.get('#state-admin-letters td:contains(AK)').should('be.visible');
    cy.get('#state-admin-letters td:contains(TN)').should('be.visible');

    getInputByLabel('State').select('AK');
    cy.get('#state-admin-letters td:contains(AK)').should('be.visible');
    cy.get('#state-admin-letters td:contains(TN)').should('have.length', 0);

    getInputByLabel('State').select('All');
    cy.get('#state-admin-letters td:contains(AK)').should('be.visible');
    cy.get('#state-admin-letters td:contains(TN)').should('be.visible');
  });

  it('allows search filtering', () => {
    getInputByLabel('Search').type('State Admin');
    cy.get('#state-admin-letters td:contains(State Admin)').should(
      'have.length',
      2
    );
  });

  it('allows matching to users/affiliations', () => {
    cy.contains('Match To User').click();

    cy.contains('Cancel').click();

    cy.contains('Match To User').click();

    cy.contains('Match State Admin Letter to User');

    getInputByLabel('Select User').select('State Staff', { force: true });

    cy.get('#dialog-content').find('li').contains('State Staff');

    getInputByLabel('Select User').select('State Admin', { force: true });

    cy.contains('Match and Approve Access').click();

    cy.get('#state-admin-letters td:contains(Matched)').should(
      'have.length',
      1
    );
  });
});
