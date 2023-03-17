export const testApdNavigation = function () {
  const pages = [
    {
      title: 'APD Overview',
      type: 'h2'
    },
    {
      title: 'Key State Personnel',
      type: 'h2'
    },
    {
      title: 'Results of Previous Activities',
      type: 'h2'
    },
    {
      title: 'Activities',
      type: 'h2'
    },
    {
      title: 'Activity Schedule Summary',
      type: 'h2'
    },
    {
      title: 'Proposed Budget',
      type: 'h2'
    },
    {
      title: 'Assurances and Compliance',
      type: 'h2'
    },
    {
      title: 'Executive Summary',
      type: 'h2'
    },
    {
      title: 'Export and Submit',
      type: 'h2'
    }
  ];

  it('confirms Continue and Previous buttons', function () {
    cy.log('Click through Continue buttons');
    cy.wrap([...pages]).each((page, index) => {
      let title = page.title,
        type = page.type;
      cy.get('.ds-c-vertical-nav__item').contains(title).click();
      cy.get(type).should('contain', title);

      if (index < pages.length - 1) {
        cy.get('#continue-button').click();
      }
    });

    cy.log('Click through Previous buttons');
    cy.wrap([...pages].reverse()).each((page, index) => {
      let title = page.title,
        type = page.type;
      cy.get('.ds-c-vertical-nav__item').contains(title).click();
      cy.get(type).should('contain', title);
      if (index < pages.length - 1) {
        cy.get('#previous-button').click();
      }
    });
  });

  it('confirms side nav buttons to redirect to correct sections', function () {
    const pageWithAnchors = [
      {
        parent: 'Key State Personnel',
        label: 'Key Personnel and Program Management',
        subnav: '#apd-state-profile-key-personnel'
      },
      {
        parent: 'Results of Previous Activities',
        label: 'Prior Activities Overview',
        subnav: ['#prev-activities-outline', '#prev-activities-table']
      },
      {
        parent: 'Proposed Budget',
        label: 'Combined Activity Costs',
        subnav: [
          '#combined-activity-costs-table',
          '#budget-summary-table',
          '#budget-federal-by-quarter',
          '#budget-incentive-by-quarter'
        ]
      },
      {
        parent: 'Executive Summary',
        label: 'APD Overview Summary',
        subnav: [
          '#executive-overview-summary',
          '#executive-activities-summary',
          '#executive-summary-budget-table'
        ]
      }
    ];

    cy.wrap(pageWithAnchors).each(index => {
      const { subnav } = index;

      cy.get('.ds-c-vertical-nav__label--parent')
        .contains(index.parent)
        .then($el => {
          if ($el.attr('aria-expanded') === 'false') {
            // if it's not expanded, expand it
            cy.wrap($el).click();
          }

          // Click on anchor link
          cy.get('a.ds-c-vertical-nav__label').contains(index.label).click();
        });

      if (Array.isArray(subnav)) {
        cy.wrap(subnav).each(sub => {
          cy.get(sub)
            .then(element => element[0].offsetTop)
            .then(() => cy.window().its('scrollY').should('be.gt', 0))
            .then(offset => cy.window().its('scrollY').should('eq', offset));
        });
      } else {
        cy.get(subnav)
          .then(element => element[0].offsetTop)
          .then(() => cy.window().its('scrollY').should('be.gt', 0))
          .then(offset => cy.window().its('scrollY').should('eq', offset));
      }
    });
  });

  it('should go to the Activity Overview page when edit is clicked in Executive Summary', function () {
    cy.goToExecutiveSummary();

    cy.get('#executive-activities-summary')
      .parent()
      .contains('div', 'Activity 1: Program Administration')
      .parent()
      .parent()
      .findByRole('link', { name: 'Edit' })
      .click();

    cy.findByRole('heading', {
      name: /^Activity 1:/i,
      level: 2
    }).should('exist');
    cy.findByRole('heading', { name: /Activity Overview/i }).should('exist');
  });
};
