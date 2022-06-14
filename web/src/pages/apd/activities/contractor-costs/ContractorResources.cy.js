import React from 'react';
import ContractorResources from './ContractorResources';

describe('<ContractorResources>', () => {
  it('mounts', () => {
    cy.mountWithConnected(<ContractorResources activityIndex={0} />, {
      initialState: {
        apd: {
          data: {
            activities: [
              {
                contractorResources: [
                  {
                    description: 'Maintain SLR',
                    end: null,
                    hourly: {
                      2022: {
                        hours: null,
                        rate: null
                      },
                      2023: {
                        hours: null,
                        rate: null
                      }
                    },
                    useHourly: false,
                    name: 'Super SLR Incorporated',
                    start: null,
                    totalCost: 32423,
                    years: {
                      2022: 999756,
                      2023: 342444
                    },
                    key: '6a651f1c'
                  },
                  {
                    description: 'Technology consulting and planning services.',
                    end: null,
                    hourly: {
                      2022: {
                        hours: null,
                        rate: null
                      },
                      2023: {
                        hours: null,
                        rate: null
                      }
                    },
                    useHourly: false,
                    name: 'Tech Consulting Inc.',
                    start: null,
                    totalCost: 473573,
                    years: {
                      2022: 333000,
                      2023: 200000
                    },
                    key: 'd4688bc4'
                  }
                ]
              }
            ],
            years: ['2022', '2023']
          }
        }
      }
    });
  });
});
