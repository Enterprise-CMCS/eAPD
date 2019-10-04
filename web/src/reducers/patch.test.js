import { SAVE_APD_SUCCESS } from '../actions/apd';
import {
  ADD_APD_ITEM,
  ADD_APD_YEAR,
  EDIT_APD,
  REMOVE_APD_ITEM,
  REMOVE_APD_YEAR
} from '../actions/editApd';

import reducer from './patch';

describe('JSON patch reducer', () => {
  it('provides an initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('resets to the initial state when an APD is saved', () => {
    expect(reducer({}, { type: SAVE_APD_SUCCESS })).toEqual([]);
  });

  it('pushes a new edit to the list when an APD is edited', () => {
    expect(
      reducer([], { type: EDIT_APD, path: '/path/to/edit', value: 'new value' })
    ).toEqual([{ op: 'replace', path: '/path/to/edit', value: 'new value' }]);
  });

  it('updates an existing patch if the path was replaced previously', () => {
    expect(
      reducer(
        [
          { op: 'replace', path: '/path/to/edit', value: 'old value' },
          { op: 'replace', path: '/path/to/leave', value: 'leave' }
        ],
        { type: EDIT_APD, path: '/path/to/edit', value: 'new value' }
      )
    ).toEqual([
      { op: 'replace', path: '/path/to/edit', value: 'new value' },
      { op: 'replace', path: '/path/to/leave', value: 'leave' }
    ]);
  });

  it('adds a new patch if the path was replaced previously but has had a different op applied since then', () => {
    expect(
      reducer(
        [
          { op: 'replace', path: '/path/to/edit', value: 'old value' },
          { op: 'remove', path: '/path/to/edit' }
        ],
        { type: EDIT_APD, path: '/path/to/edit', value: 'new value' }
      )
    ).toEqual([
      { op: 'replace', path: '/path/to/edit', value: 'old value' },
      { op: 'remove', path: '/path/to/edit' },
      { op: 'replace', path: '/path/to/edit', value: 'new value' }
    ]);
  });

  it('adds a new year to the APD', () => {
    expect(
      reducer([], {
        type: ADD_APD_YEAR,
        value: '2019',
        state: {
          apd: {
            data: {
              activities: [
                {
                  contractorResources: [{ hourly: { data: {} }, years: {} }],
                  costAllocation: {},
                  expenses: [{ years: {} }],
                  quarterlyFFP: {},
                  statePersonnel: [{ years: {} }]
                }
              ],
              incentivePayments: {},
              keyPersonnel: [{ costs: {} }],
              years: []
            }
          },
          activities: {
            byKey: {
              activityKey: {
                contractorResources: [
                  {
                    hourly: { data: {} },
                    years: {}
                  }
                ],
                costAllocation: {},
                expenses: [{ years: {} }],
                statePersonnel: [{ years: {} }],
                years: []
              }
            }
          }
        }
      })
    ).toMatchSnapshot();
  });

  it('removes a year from the APD', () => {
    expect(
      reducer([], {
        type: REMOVE_APD_YEAR,
        value: '2019',
        state: {
          apd: {
            data: {
              activities: [
                {
                  contractorResources: [
                    {
                      hourly: { data: { '2019': 'this gets deleted' } },
                      years: { '2019': 'this gets deleted' }
                    }
                  ],
                  costAllocation: { '2019': 'this gets deleted' },
                  expenses: [{ years: { '2019': 'this gets deleted' } }],
                  quarterlyFFP: { '2019': 'this gets deleted' },
                  statePersonnel: [{ years: { '2019': 'this gets deleted' } }]
                }
              ],
              incentivePayments: { '2019': 'this gets deleted' },
              keyPersonnel: [{ costs: { '2019': 'this gets deleted' } }],
              years: ['2019']
            }
          },
          activities: {
            byKey: {
              activityKey: {
                contractorResources: [
                  {
                    hourly: { data: { '2019': 'this gets deleted' } },
                    years: { '2019': 'this gets deleted' }
                  }
                ],
                costAllocation: { '2019': 'this gets deleted' },
                expenses: [{ years: { '2019': 'this gets deleted' } }],
                statePersonnel: [{ years: { '2019': 'this gets deleted' } }],
                years: ['2019']
              }
            }
          }
        }
      })
    ).toMatchSnapshot();
  });

  it('creates a patch for adding an APD item', () => {
    expect(
      reducer([], {
        type: ADD_APD_ITEM,
        path: '/path/to/add',
        state: {}
      })
    ).toEqual([{ op: 'add', path: '/path/to/add', value: null }]);
  });

  it('creates a patch for removing an APD item', () => {
    expect(
      reducer([], { type: REMOVE_APD_ITEM, path: '/path/to/remove' })
    ).toEqual([{ op: 'remove', path: '/path/to/remove' }]);
  });
});
