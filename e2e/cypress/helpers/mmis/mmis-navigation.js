export const testMmisNavigation = function () {
  const pages = [
    {
      title: 'APD Overview',
      type: 'h2'
    },
    {
      title: 'State Priorities and Scope of APD',
      type: 'h2'
    },
    {
      title: 'Key State Personnel',
      subnav: [
        'Key State Personnel',
        'State Director and Office Address',
        'Key Personnel and Program Management'
      ],
      type: ['h2', 'h3', 'h3']
    },
    {
      title: 'Results of Previous Activities',
      subnav: [
        'Results of Previous Activities',
        'Prior Activities Overview',
        'Actual Expenditures'
      ],
      type: ['h2', 'h3', 'h3']
    },
    {
      title: 'Activity Schedule Summary',
      type: 'h2'
    },
    {
      title: 'Proposed Budget',
      subnav: [
        'Proposed Budget',
        'Combined Activity Costs',
        'Summary Budget Table'
      ],
      type: ['h2', 'h3', 'h3']
    },
    {
      title: 'Security Planning',
      type: 'h2'
    },
    {
      title: 'Assurances and Compliance',
      type: 'h2'
    },
    {
      title: 'Executive Summary',
      subnav: [
        'Executive Summary',
        'Activities Summary' /* 'Program Budget Tables' */
      ],
      type: ['h2', 'h3', 'h3']
    },
    {
      title: 'Export and Submit',
      type: 'h2'
    }
  ];

  const activityPages = [
    {
      title: 'Activity Overview',
      type: 'h3'
    },
    {
      title: 'Analysis of Alternatives and Risk',
      type: 'h3'
    },
    {
      title: 'Activity Schedule and Milestones',
      subtitles: ['Activity Schedule', 'Milestones'],
      type: ['h3', 'h3']
    },
    {
      title: 'Conditions for Enhanced Funding',
      type: 'h3'
    },
    {
      title: 'Outcomes and Metrics',
      type: 'h3'
    },
    {
      title: 'State Staff and Expenses',
      subtitles: ['State Staff and Expenses', 'Other State Expenses'],
      type: ['h3', 'h4', 'h4']
    },
    {
      title: 'Private Contractor Costs',
      type: 'h3'
    },
    {
      title: 'Cost Allocation and Other Funding',
      subtitles: ['Cost Allocation', 'Other Funding'],
      type: ['h3', 'h2']
    },
    {
      title: 'Budget and FFP',
      type: 'h2'
    }
  ];

  it('tests main side nav navigation', function () {
    cy.wrap(pages).each(index => {
      const { title, subnav, type } = index;

      cy.get('.ds-c-vertical-nav__item').contains(title).click();
      if (subnav) {
        cy.wrap(subnav).each((sub, index) => {
          cy.get('.ds-c-vertical-nav__subnav').contains(sub).click();
          cy.get(`.ds-${type[index]}`).contains(sub).should('be.visible');
        });
      } else {
        cy.get(`.ds-${type}`).should('contain', title);
      }

      cy.checkPageA11y();
    });
  });

  it('tests side nav navigation for activities', function () {
    cy.goToActivityDashboard();
    cy.get('.ds-h2').should('contain', 'Activities');

    cy.findAllByText('Add Activity').click();

    // TODO: Bug Ticket 4481, Uncomment code below to navigate via side panel
    // cy.get('.ds-c-vertical-nav__item').contains('Activity 1: Untitled').click();

    // Once 4481 is fixed, the code above should expand the subnav of the activity and we can delete this line below
    cy.get('#activities').contains('Edit').click();

    cy.wrap(activityPages).each(index => {
      const { title, subtitles, type } = index;

      cy.get('.ds-c-vertical-nav__item').contains(title).click();
      if (subtitles) {
        cy.wrap(subtitles).each((sub, index) => {
          cy.get(`.ds-${type[index]}`).contains(sub);
        });
      } else {
        cy.get(`.ds-${type}`).should('contain', title);
      }

      cy.checkPageA11y();
    });
  });

  it('tests Continue and Previous buttons', function () {
    cy.log('Click through Continue buttons');
    cy.goToApdOverview();

    cy.wrap(pages).each((page, index) => {
      const { title, subnav, type } = page;

      if (index === 4) {
        // On Activities Dashboard
        cy.get('.ds-h2').should('contain', 'Activities');
        cy.get('#activities').contains('Edit').click();

        cy.wrap(activityPages).each(activityPage => {
          const { title, subtitles, type } = activityPage;
          if (subtitles) {
            cy.get(`.ds-${type[0]}`).should('contain', subtitles[0]);
          } else {
            cy.get(`.ds-${type}`).should('contain', title);
          }
          cy.get('#continue-button').click();
        });
      }

      if (subnav) {
        cy.get(`.ds-${type[0]}`).should('contain', title);
      } else {
        cy.get(`.ds-${type}`).should('contain', title);
      }

      if (index < pages.length - 1) {
        cy.get('#continue-button').click();
      }
    });

    cy.log('Click through Previous buttons');
    cy.get('.ds-c-vertical-nav__item').contains('Export and Submit').click();

    cy.wrap([...pages].reverse()).each((page, index) => {
      const { title, subnav, type } = page;

      if (index === 6) {
        // On Activities Dashboard
        cy.get('.ds-h2').should('contain', 'Activities');
        cy.goToBudgetAndFFP(0);

        cy.wrap([...activityPages].reverse()).each(activityPage => {
          const { title, subtitles, type } = activityPage;
          if (subtitles) {
            cy.get(`.ds-${type[0]}`).should('contain', subtitles[0]);
          } else {
            cy.get(`.ds-${type}`).should('contain', title);
          }
          cy.get('#previous-button').click();
        });
        cy.get('#previous-button').click(); // Activities Dashboard again
      }

      if (subnav) {
        cy.get(`.ds-${type[0]}`).should('contain', title);
      } else {
        cy.get(`.ds-${type}`).should('contain', title);
      }

      if (index < pages.length - 1) {
        cy.get('#previous-button').click();
      }
    });
  });

  it('tests edit button in executive summary', function () {
    cy.log(
      'should go to the Activity Overview page when edit is clicked in Executive Summary'
    );
    cy.goToExecutiveSummary();

    cy.findByRole('heading', { name: /^Activities Summary/i, level: 3 })
      .next()
      .next()
      .contains('Edit')
      .click();

    cy.findByRole('heading', {
      name: /^Activity 1:/i,
      level: 2
    }).should('exist');
    cy.findByRole('heading', {
      name: /^Activity Overview/i,
      level: 3
    }).should('exist');
  });
};
