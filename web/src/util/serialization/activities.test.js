import { fromAPI, toAPI } from './activities';

describe('APD activity serializer', () => {
  describe('deserializer from API format to redux state shape', () => {
    it('deserializes everything given to it', () => {
      const activityAPI = {
        id: 998,
        name: 'activity 998',
        fundingSource: 'bob',
        summary: 'summary',
        description: 'description',
        alternatives: 'different things',
        costAllocationNarrative: {
          methodology: 'how',
          otherSources: 'which'
        },
        costAllocation: [
          {
            year: 2018,
            federalPercent: 0.8,
            statePercent: 0.15,
            otherAmount: 100
          },
          {
            year: 2019,
            federalPercent: 0.6,
            statePercent: 0.2,
            otherAmount: 200
          }
        ],
        goals: [
          {
            id: 'g1',
            description: 'goal 1 description',
            objective: 'goal 1 objective'
          },
          {
            id: 'g2',
            description: 'goal 2 description',
            objective: 'goal 2 objective'
          }
        ],
        schedule: [
          {
            id: 'm1',
            milestone: 'milestone name',
            plannedStart: 'start',
            plannedEnd: 'end'
          }
        ],
        statePersonnel: [
          {
            id: 'person 1',
            title: 'job title 1',
            description: 'desc 1',
            years: [
              { year: '2018', cost: 100, fte: 0.5 },
              { year: '2019', cost: 200, fte: 0.8 }
            ]
          },
          {
            id: 'person 2',
            title: 'job title 2',
            description: 'desc 2',
            years: [
              { year: '2018', cost: 300, fte: 0.3 },
              { year: '2019', cost: 400, fte: 0.6 }
            ]
          }
        ],
        contractorResources: [
          {
            id: 'contractor 1',
            name: 'contractor 1',
            description: 'desc 1',
            start: 'start 1',
            end: 'end 1',
            files: [{ id: 'contractor 1 file' }],
            years: [
              { year: '2018', cost: '1000' },
              { year: '2019', cost: '2000' }
            ],
            useHourly: false,
            hourlyData: [
              { year: '2018', hours: 10, rate: 100 },
              { year: '2019', hours: 20, rate: 200 }
            ]
          },
          {
            id: 'contractor 2',
            name: 'contractor 2',
            description: 'desc 2',
            start: 'start 2',
            end: 'end 2',
            files: [{ id: 'contractor 2 file' }],
            years: [
              { year: '2018', cost: '3000' },
              { year: '2019', cost: '4000' }
            ],
            useHourly: true,
            hourlyData: [
              { year: '2018', hours: 30, rate: 300 },
              { year: '2019', hours: 40, rate: 400 }
            ]
          }
        ],
        expenses: [
          {
            id: 'e1',
            category: 'category 1',
            description: 'desc 1',
            entries: [
              { year: '2018', amount: 10 },
              { year: '2019', amount: 20 }
            ]
          },
          {
            id: 'e2',
            category: 'category 2',
            description: 'desc 2',
            entries: [
              { year: '2018', amount: 30 },
              { year: '2019', amount: 40 }
            ]
          }
        ],
        standardsAndConditions: {
          businessResults: 'biz results',
          documentation: 'docs',
          industryStandards: 'standards',
          interoperability: 'interop',
          keyPersonnel: 'locksmiths',
          leverage: 'lever',
          modularity: 'lego blocks',
          minimizeCost: 'save money',
          mita: 'meeta',
          mitigationStrategy: 'run away',
          reporting: 'moop moop'
        },
        quarterlyFFP: [
          {
            q1: {
              combined: 0.2,
              contractors: 0.3,
              state: 0.4
            },
            q2: {
              combined: 0.4,
              contractors: 0.3,
              state: 0.2
            },
            q3: {
              combined: 0.3,
              contractors: 0.2,
              state: 0.4
            },
            q4: {
              combined: 0.3,
              contractors: 0.4,
              state: 0.2
            },
            year: 2018
          },
          {
            q1: {
              combined: 0.25,
              contractors: 0.25,
              state: 0.25
            },
            q2: {
              combined: 0.25,
              contractors: 0.25,
              state: 0.25
            },
            q3: {
              combined: 0.25,
              contractors: 0.25,
              state: 0.25
            },
            q4: {
              combined: 0.25,
              contractors: 0.25,
              state: 0.25
            },
            year: 2019
          }
        ]
      };

      expect(fromAPI(activityAPI, ['1947', '1949'])).toMatchObject(
        expect.objectContaining({
          id: 998,
          key: expect.stringMatching(/[a-f0-9]{8}/),
          name: 'activity 998',
          fundingSource: 'bob',
          years: ['1947', '1949'],
          summary: 'summary',
          description: 'description',
          alternatives: 'different things',
          costAllocationDesc: 'how',
          otherFundingDesc: 'which',
          costAllocation: {
            2018: { ffp: { federal: 80, state: 15 }, other: 100 },
            2019: { ffp: { federal: 60, state: 20 }, other: 200 }
          },
          goals: [
            {
              id: 'g1',
              key: expect.stringMatching(/[a-f0-9]{8}/),
              description: 'goal 1 description',
              objective: 'goal 1 objective'
            },
            {
              id: 'g2',
              key: expect.stringMatching(/[a-f0-9]{8}/),
              description: 'goal 2 description',
              objective: 'goal 2 objective'
            }
          ],
          schedule: [
            {
              id: 'm1',
              key: expect.stringMatching(/[a-f0-9]{8}/),
              milestone: 'milestone name',
              plannedStart: 'start',
              plannedEnd: 'end'
            }
          ],
          statePersonnel: [
            {
              id: 'person 1',
              key: expect.stringMatching(/[a-f0-9]{8}/),
              title: 'job title 1',
              desc: 'desc 1',
              years: {
                2018: { amt: 100, perc: 0.5 },
                2019: { amt: 200, perc: 0.8 }
              }
            },
            {
              id: 'person 2',
              key: expect.stringMatching(/[a-f0-9]{8}/),
              title: 'job title 2',
              desc: 'desc 2',
              years: {
                2018: { amt: 300, perc: 0.3 },
                2019: { amt: 400, perc: 0.6 }
              }
            }
          ],
          contractorResources: [
            {
              id: 'contractor 1',
              key: expect.stringMatching(/[a-f0-9]{8}/),
              name: 'contractor 1',
              desc: 'desc 1',
              start: 'start 1',
              end: 'end 1',
              files: [
                {
                  id: 'contractor 1 file',
                  url: expect.stringMatching(/.*\/files\/contractor 1 file$/)
                }
              ],
              years: { 2018: 1000, 2019: 2000 },
              hourly: {
                useHourly: false,
                data: {
                  2018: { hours: 10, rate: 100 },
                  2019: { hours: 20, rate: 200 }
                }
              }
            },
            {
              id: 'contractor 2',
              key: expect.stringMatching(/[a-f0-9]{8}/),
              name: 'contractor 2',
              desc: 'desc 2',
              start: 'start 2',
              end: 'end 2',
              files: [
                {
                  id: 'contractor 2 file',
                  url: expect.stringMatching(/.*\/files\/contractor 2 file$/)
                }
              ],

              years: { 2018: 3000, 2019: 4000 },
              hourly: {
                useHourly: true,
                data: {
                  2018: { hours: 30, rate: 300 },
                  2019: { hours: 40, rate: 400 }
                }
              }
            }
          ],
          expenses: [
            {
              id: 'e1',
              key: expect.stringMatching(/[a-f0-9]{8}/),
              category: 'category 1',
              desc: 'desc 1',
              years: { 2018: 10, 2019: 20 }
            },
            {
              id: 'e2',
              key: expect.stringMatching(/[a-f0-9]{8}/),
              category: 'category 2',
              desc: 'desc 2',
              years: { 2018: 30, 2019: 40 }
            }
          ],
          standardsAndConditions: {
            businessResults: 'biz results',
            documentation: 'docs',
            industryStandards: 'standards',
            interoperability: 'interop',
            keyPersonnel: 'locksmiths',
            leverage: 'lever',
            minimizeCost: 'save money',
            mita: 'meeta',
            mitigationStrategy: 'run away',
            modularity: 'lego blocks',
            reporting: 'moop moop'
          },
          quarterlyFFP: {
            '2018': {
              '1': {
                combined: 20,
                contractors: 30,
                state: 40
              },
              '2': {
                combined: 40,
                contractors: 30,
                state: 20
              },
              '3': {
                combined: 30,
                contractors: 20,
                state: 40
              },
              '4': {
                combined: 30,
                contractors: 40,
                state: 20
              }
            },
            '2019': {
              '1': {
                combined: 25,
                contractors: 25,
                state: 25
              },
              '2': {
                combined: 25,
                contractors: 25,
                state: 25
              },
              '3': {
                combined: 25,
                contractors: 25,
                state: 25
              },
              '4': {
                combined: 25,
                contractors: 25,
                state: 25
              }
            }
          }
        })
      );
    });
  });

  describe('serializes redux state shape into API format', () => {
    it('does the magical serialization', () => {
      const state = {
        id: 'activity id',
        name: 'activity name',
        fundingSource: 'money money',
        summary: 'summmmmmary',
        description: 'longer text about the activity',
        alternatives: 'some text about alternatives',
        costAllocationDesc: 'describing cost allocation',
        otherFundingDesc: 'describing where other money came from',
        costAllocation: {
          '2009': {
            ffp: {
              federal: 90,
              state: 10
            },
            other: 30
          }
        },
        goals: [
          {
            id: 'gooooooooal',
            description: 'what is the goal?',
            objective: 'how do we know?'
          }
        ],
        schedule: [
          {
            id: 'skip to the lou',
            milestone: 'get all the way to the lou',
            plannedStart: 'at the beginning',
            plannedEnd: 'when we are finished'
          }
        ],
        statePersonnel: [
          {
            id: 'eugene',
            title: 'Boss',
            desc: 'friend of the show',

            years: {
              '2009': {
                amt: 99,
                perc: 0.45
              }
            }
          }
        ],
        contractorResources: [
          {
            id: 'moop',
            name: 'Code Writers, Inc.',
            desc: 'Writing code',
            start: 'green flag',
            end: 'checkered flag',
            years: {
              '2009': 325
            },
            hourly: {
              useHourly: true,
              data: { '2009': { hours: 10, rate: 100 } }
            }
          }
        ],
        expenses: [
          {
            id: 'money spent',
            category: 'less than before',
            desc: 'wal-mart run',
            years: {
              '2009': 523
            }
          }
        ],
        standardsAndConditions: {
          businessResults: 'standard 1',
          documentation: 'standard 2',
          industryStandards: 'standard 3',
          interoperability: 'standard 4',
          keyPersonnel: 'standard 5',
          leverage: 'standard 6',
          minimizeCost: 'standard 7',
          mitigationStrategy: 'standard 8',
          modularity: 'standard 9',
          mita: 'standard a',
          reporting: 'standard b'
        },
        quarterlyFFP: {
          '2009': {
            1: { combined: 12, contractors: 32, state: 43 },
            2: { combined: 23, contractors: 13, state: 24 },
            3: { combined: 63, contractors: 62, state: 9 },
            4: { combined: 24, contractors: 42, state: 12 }
          }
        }
      };

      expect(toAPI(state)).toEqual({
        alternatives: 'some text about alternatives',
        contractorResources: [
          {
            id: 'moop',
            name: 'Code Writers, Inc.',
            description: 'Writing code',
            start: 'green flag',
            end: 'checkered flag',
            years: [
              {
                cost: 325,
                year: '2009'
              }
            ],
            useHourly: true,
            hourlyData: [
              {
                year: '2009',
                hours: 10,
                rate: 100
              }
            ]
          }
        ],
        costAllocation: [
          {
            federalPercent: 0.9,
            statePercent: 0.1,
            otherAmount: 30,
            year: '2009'
          }
        ],
        costAllocationNarrative: {
          methodology: 'describing cost allocation',
          otherSources: 'describing where other money came from'
        },
        description: 'longer text about the activity',
        expenses: [
          {
            id: 'money spent',
            category: 'less than before',
            description: 'wal-mart run',
            entries: [
              {
                amount: 523,
                year: '2009'
              }
            ]
          }
        ],
        fundingSource: 'money money',
        goals: [
          {
            id: 'gooooooooal',
            description: 'what is the goal?',
            objective: 'how do we know?'
          }
        ],
        id: 'activity id',
        name: 'activity name',
        schedule: [
          {
            id: 'skip to the lou',
            milestone: 'get all the way to the lou',
            plannedStart: 'at the beginning',
            plannedEnd: 'when we are finished'
          }
        ],
        standardsAndConditions: {
          businessResults: 'standard 1',
          documentation: 'standard 2',
          industryStandards: 'standard 3',
          interoperability: 'standard 4',
          keyPersonnel: 'standard 5',
          leverage: 'standard 6',
          minimizeCost: 'standard 7',
          mitigationStrategy: 'standard 8',
          modularity: 'standard 9',
          mita: 'standard a',
          reporting: 'standard b'
        },
        statePersonnel: [
          {
            id: 'eugene',
            title: 'Boss',
            description: 'friend of the show',
            years: [
              {
                cost: 99,
                fte: 0.45,
                year: '2009'
              }
            ]
          }
        ],
        summary: 'summmmmmary',
        quarterlyFFP: [
          {
            q1: { combined: 0.12, contractors: 0.32, state: 0.43 },
            q2: { combined: 0.23, contractors: 0.13, state: 0.24 },
            q3: { combined: 0.63, contractors: 0.62, state: 0.09 },
            q4: { combined: 0.24, contractors: 0.42, state: 0.12 },
            year: '2009'
          }
        ]
      });
    });
  });
});
