const pages = [
  {
    title: 'APD Overview',
    type: 'h2',
    subnav: null
  },
  {
    title: 'Key State Personnel',
    type: 'h2',
    subnav: ['#apd-state-profile-office', '#apd-state-profile-key-personnel']
  },
  {
    title: 'Results of Previous Activities',
    type: 'h2',
    subnav: ['#prev-activities-outline', '#prev-activities-table']
  },
  {
    title: 'Activities',
    type: 'h2',
    subnav: null
  },
  {
    title: 'Activity Overview',
    type: 'h3',
    subnav: null
  },
  {
    title: 'Activity Schedule',
    type: 'h3',
    subnav: null
  },
  {
    title: 'Outcomes and Metrics',
    type: 'h3',
    subnav: null
  },
  {
    title: 'State Staff and Expenses',
    type: 'h3',
    subnav: null
  },
  {
    title: 'Private Contractor Costs',
    type: 'h3',
    subnav: null
  },
  {
    title: 'Cost Allocation',
    type: 'h3',
    subnav: null
  },
  {
    title: 'Budget and FFP',
    type: 'h2',
    subnav: null
  },
  {
    title: 'Activity Schedule Summary',
    type: 'h2',
    subnav: null
  },
  {
    title: 'Proposed Budget',
    type: 'h2',
    subnav: [
      '#combined-activity-costs-table',
      '#budget-summary-table',
      '#budget-federal-by-quarter',
      '#budget-incentive-by-quarter'
    ]
  },
  {
    title: 'Assurances and Compliance',
    type: 'h2',
    subnav: null
  },
  {
    title: 'Executive Summary',
    type: 'h2',
    subnav: [
      '#executive-overview-summary',
      '#executive-activities-summary',
      '#executive-summary-budget-table'
    ]
  },
  {
    title: 'Export and Submit',
    type: 'h2',
    subnav: null
  }
];

export const testApdNavigation = function () {
  it('confirms navigation buttons', function () {
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
    cy.wrap([...pages]).each(page => {
      let subnav = page.subnav,
        title = page.title;
      if (subnav != null) {
        cy.get('.ds-c-vertical-nav__label--parent')
          .contains(title)
          .then($el => {
            if ($el.attr('aria-expanded') === 'false') {
              // if it's not expanded, expand it
              cy.wrap($el).click();
            }

            // Click on anchor link
            cy.get('a.ds-c-vertical-nav__label').contains(title).click();
          });
        cy.wrap(subnav).each(sub => {
          cy.get(sub)
            .then(element => element[0].offsetTop)
            .then(() => cy.window().its('scrollY').should('be.gt', 0))
            .then(offset => cy.window().its('scrollY').should('eq', offset));
        });
      }
    });
  });
};
