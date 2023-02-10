import { testMmisAPDOverviewWithData } from '../../helpers/apd/apd-overview.js';
import { testStatePrioritiesAndScopeWithData } from '../../helpers/apd/state-priorities-and-scope';

// Tests an MMIS APD by adding data and checking the results
describe(
  'MMIS APD with Data',
  { tags: ['@apd', '@mmis', '@data', '@slow'] },
  () => {
    let apdUrl;
    let apdId;
    const years = [];

    before(function () {
      cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
      cy.useStateStaff();
      cy.visit('/');

      cy.findAllByText('Create new').click();
      cy.findByRole('radio', { name: /MMIS/i }).click();
      cy.findByLabelText('APD Name').clear().type('My MMIS IAPD').blur();
      cy.findByRole('radio', {
        name: /No, this is for a new project./i
      }).click();
      cy.findByRole('checkbox', {
        name: /1115 or Waiver Support Systems/i
      }).click();
      cy.get(`[data-cy='create_apd_btn']`).should('not.be.disabled').click();

      cy.findByRole(
        'heading',
        { name: /APD Overview/i },
        { timeout: 100000 }
      ).should('exist');
      cy.location('pathname').then(pathname => {
        apdUrl = pathname.replace('/apd-overview', '');
        apdId = apdUrl.split('/').pop();
      });

      cy.get('[type="checkbox"][checked]').each((_, index, list) =>
        years.push(list[index].value)
      );
    });

    beforeEach(function () {
      cy.wrap(apdUrl).as('apdUrl');
      cy.wrap(apdId).as('apdId');
      cy.wrap(years).as('years');

      cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
      cy.useStateStaff();
      cy.visit(apdUrl);
    });

    after(function () {
      cy.visit('/');
      cy.deleteAPD(this.apdId);
    });

    describe('Form View', function () {
      describe('MMIS APD Overview', function () {
        testMmisAPDOverviewWithData();
      });

      describe('first', function () {
        testStatePrioritiesAndScopeWithData();
      });
    });
  }
);
