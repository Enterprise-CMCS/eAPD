import React from 'react';
import { mount } from '@cypress/react'; // eslint-disable-line import/no-unresolved
import ContractorResources from './ContractorResources';
import { wrapConnection } from 'apd-cypress-library';

describe('<ContractorResources>', () => {
  it('mounts', () => {
    mount(
      wrapConnection(<ContractorResources />, {
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
                      description:
                        'Technology consulting and planning services.',
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
          },
          user: {
            data: {
              activities: [
                'view-roles',
                'export-document',
                'create-draft',
                'edit-document',
                'view-document',
                'view-affiliations',
                'edit-affiliations'
              ],
              affiliation: {
                id: 124,
                user_id: '00u4nbo8e9BoctLWI297',
                state_id: 'ak',
                role_id: 17,
                status: 'approved',
                created_at: '2022-06-14T16:40:25.703Z',
                updated_at: '2022-06-14T16:40:25.703Z',
                username: 'em@il.com',
                expires_at: '2023-06-14T00:00:00.000Z'
              },
              id: '00u4nbo8e9BoctLWI297',
              name: 'Regular User',
              permissions: [
                {
                  ak: [
                    'view-roles',
                    'export-document',
                    'create-draft',
                    'edit-document',
                    'view-document',
                    'view-affiliations',
                    'edit-affiliations'
                  ]
                }
              ],
              phone: '5555555555',
              role: 'eAPD State Admin',
              state: {
                id: 'ak',
                name: 'Alaska',
                medicaid_office: {
                  address1: '100 Round Sq',
                  city: 'Cityville',
                  zip: '12345',
                  state: 'Alaska',
                  director: {
                    name: 'Cornelius Fudge',
                    email: 'c.fudge@ministry.magic',
                    phone: '5551234567'
                  }
                }
              },
              states: {
                ak: 'approved'
              },
              username: 'em@il.com'
            },
            fetching: false,
            loaded: true,
            error: false
          }
        }
      })
    );
  });
});
