import activities from './activities';

describe('activities reducer', () => {
  const initialState = {
    byId: {},
    allIds: []
  };

  const newActivity = {
    id: 1,
    altApproach: '',
    contractorResources: [
      {
        id: 1,
        desc: '',
        end: '',
        name: '',
        start: '',
        years: { '1': 0, '2': 0 }
      },
      {
        id: 2,
        desc: '',
        end: '',
        name: '',
        start: '',
        years: { '1': 0, '2': 0 }
      },
      {
        id: 3,
        desc: '',
        end: '',
        name: '',
        start: '',
        years: { '1': 0, '2': 0 }
      }
    ],
    costAllocateDesc: '',
    costFFP: {
      '1': { fed: 90, other: 0, state: 10 },
      '2': { fed: 90, other: 0, state: 10 }
    },
    descLong: '',
    descShort: '',
    expenses: [
      {
        id: 1,
        category: 'Hardware, software, and licensing',
        desc: '',
        years: { '1': 0, '2': 0 }
      },
      {
        id: 2,
        category: 'Hardware, software, and licensing',
        desc: '',
        years: { '1': 0, '2': 0 }
      },
      {
        id: 3,
        category: 'Hardware, software, and licensing',
        desc: '',
        years: { '1': 0, '2': 0 }
      }
    ],
    fundingSource: 'HIT',
    goals: [{ desc: '', obj: '' }],
    meta: { expanded: false },
    milestones: [
      { end: '', name: '', start: '' },
      { end: '', name: '', start: '' },
      { end: '', name: '', start: '' }
    ],
    name: '',
    otherFundingAmt: '',
    otherFundingDesc: '',
    standardsAndConditions: {
      bizResults: '',
      documentation: '',
      industry: '',
      interoperability: '',
      keyPersonnel: '',
      leverage: '',
      minimizeCost: '',
      mita: '',
      mitigation: '',
      modularity: '',
      reporting: ''
    },
    statePersonnel: [
      {
        id: 1,
        desc: '',
        title: '',
        years: { '1': { amt: '', perc: '' }, '2': { amt: '', perc: '' } }
      },
      {
        id: 2,
        desc: '',
        title: '',
        years: { '1': { amt: '', perc: '' }, '2': { amt: '', perc: '' } }
      },
      {
        id: 3,
        desc: '',
        title: '',
        years: { '1': { amt: '', perc: '' }, '2': { amt: '', perc: '' } }
      }
    ],
    years: ['1', '2']
  };

  const stateWithOne = { byId: { '1': newActivity }, allIds: [1] };

  it('should handle initial state', () => {
    expect(activities(undefined, {})).toEqual(initialState);
  });

  it('handles adding a new activity', () => {
    expect(
      activities(initialState, {
        type: 'ADD_ACTIVITY',
        years: ['1', '2']
      })
    ).toEqual({
      byId: {
        '1': newActivity
      },
      allIds: [1]
    });
  });

  it('handles removing an activity', () => {
    expect(
      activities(stateWithOne, { type: 'REMOVE_ACTIVITY', id: 1 })
    ).toEqual({
      byId: {},
      allIds: []
    });
  });
});
