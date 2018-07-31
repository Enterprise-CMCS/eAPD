import { applyToNumbers, generateKey } from '../index';

/**
 * Serializes an APD object from redux state shape into
 * API format
 * @param {Object} activityState Activity object from redux state
 */
export const toAPI = activityState => {
  const activity = {
    id: activityState.id,
    name: activityState.name,
    fundingSource: activityState.fundingSource,
    summary: activityState.descShort,
    description: activityState.descLong,
    alternatives: activityState.altApproach,
    costAllocationNarrative: {
      methodology: activityState.costAllocationDesc,
      otherSources: activityState.otherFundingDesc
    },
    costAllocation: Object.entries(activityState.costAllocation).map(
      ([year, allocation]) => ({
        federalPercent: +allocation.ffp.federal / 100,
        statePercent: +allocation.ffp.state / 100,
        otherAmount: +allocation.other,
        year
      })
    ),
    goals: activityState.goals.map(g => ({
      id: g.id,
      description: g.desc,
      objective: g.obj
    })),
    schedule: activityState.milestones.map(m => ({
      id: m.id,
      milestone: m.name,
      plannedStart: m.start || undefined,
      plannedEnd: m.end || undefined
    })),
    statePersonnel: activityState.statePersonnel.map(s => ({
      id: s.id,
      title: s.title,
      description: s.desc,
      years: Object.keys(s.years).map(year => ({
        cost: +s.years[year].amt,
        fte: +s.years[year].perc / 100,
        year
      }))
    })),
    contractorResources: activityState.contractorResources.map(c => ({
      id: c.id,
      name: c.name,
      description: c.desc,
      start: c.start || undefined,
      end: c.end || undefined,
      years: Object.keys(c.years).map(year => ({
        cost: +c.years[year],
        year
      })),
      useHourly: c.hourly.useHourly,
      hourlyData: Object.keys(c.hourly.data).map(year => ({
        year,
        hours: +c.hourly.data[year].hours,
        rate: +c.hourly.data[year].rate
      }))
    })),
    expenses: activityState.expenses.map(e => ({
      id: e.id,
      category: e.category,
      description: e.desc,
      entries: Object.keys(e.years).map(year => ({
        amount: +e.years[year],
        year
      }))
    })),
    standardsAndConditions: {
      businessResults: activityState.standardsAndConditions.bizResults,
      documentation: activityState.standardsAndConditions.documentation,
      industryStandards: activityState.standardsAndConditions.industry,
      interoperability: activityState.standardsAndConditions.interoperability,
      keyPersonnel: activityState.standardsAndConditions.keyPersonnel,
      leverage: activityState.standardsAndConditions.leverage,
      minimizeCost: activityState.standardsAndConditions.minimizeCost,
      mitigationStrategy: activityState.standardsAndConditions.mitigation,
      modularity: activityState.standardsAndConditions.modularity,
      mita: activityState.standardsAndConditions.mita,
      reporting: activityState.standardsAndConditions.reporting
    },
    quarterlyFFP: Object.entries(activityState.quarterlyFFP).map(
      ([year, ffp]) => ({
        q1: applyToNumbers(ffp[1], v => v / 100),
        q2: applyToNumbers(ffp[2], v => v / 100),
        q3: applyToNumbers(ffp[3], v => v / 100),
        q4: applyToNumbers(ffp[4], v => v / 100),
        year
      })
    )
  };

  return activity;
};

/**
 * Deserialize an APD activity object from the API into an
 * object matching redux state shape.
 * @param {Object} activityAPI - The activity object from the API
 * @param {Array.<string>} years - the years for the associated APD
 * @param {Object} defaults - default values for missing properties
 * @param {Object} defaults.quarterlyFFP - default quarterly FFP for this activity
 */
export const fromAPI = (activityAPI, years, { quarterlyFFP } = {}) => ({
  // These properties are just copied over, maybe renamed,
  // but no data massaging necessary
  altApproach: activityAPI.alternatives || '',
  costAllocationDesc: activityAPI.costAllocationNarrative.methodology || '',
  descLong: activityAPI.description || '',
  descShort: activityAPI.summary || '',
  fundingSource: activityAPI.fundingSource,
  id: activityAPI.id,
  key: generateKey(),
  name: activityAPI.name,
  otherFundingDesc: activityAPI.costAllocationNarrative.otherSources || '',
  standardsAndConditions: {
    bizResults: activityAPI.standardsAndConditions.businessResults || '',
    documentation: activityAPI.standardsAndConditions.documentation || '',
    industry: activityAPI.standardsAndConditions.industryStandards || '',
    interoperability: activityAPI.standardsAndConditions.interoperability || '',
    keyPersonnel: activityAPI.standardsAndConditions.keyPersonnel || '',
    leverage: activityAPI.standardsAndConditions.leverage || '',
    modularity: activityAPI.standardsAndConditions.modularity || '',
    minimizeCost: activityAPI.standardsAndConditions.minimizeCost || '',
    mita: activityAPI.standardsAndConditions.mita || '',
    mitigation: activityAPI.standardsAndConditions.mitigationStrategy || '',
    reporting: activityAPI.standardsAndConditions.reporting || ''
  },
  years,

  // These properties need some massaging into reducer state
  contractorResources: activityAPI.contractorResources.map(c => ({
    key: generateKey(),
    id: c.id,
    name: c.name || '',
    desc: c.description || '',
    start: c.start || '',
    end: c.end || '',
    years: c.years.reduce(
      (acc, y) => ({
        ...acc,
        [y.year]: +y.cost
      }),
      {}
    ),
    hourly: {
      useHourly: c.useHourly || false,
      data: (c.hourlyData || []).reduce(
        (acc, h) => ({
          ...acc,
          [h.year]: { hours: +h.hours || '', rate: +h.rate || '' }
        }),
        {}
      )
    }
  })),

  costAllocation: activityAPI.costAllocation.reduce(
    (acc, ffp) => ({
      ...acc,
      [ffp.year]: {
        other: ffp.otherAmount || 0,
        ffp: {
          federal: ffp.federalPercent * 100,
          state: ffp.statePercent * 100
        }
      }
    }),
    {}
  ),

  expenses: activityAPI.expenses.map(e => ({
    key: generateKey(),
    id: e.id,
    category: e.category || '',
    desc: e.description || '',
    years: e.entries.reduce(
      (acc, y) => ({
        ...acc,
        [y.year]: +y.amount
      }),
      {}
    )
  })),

  goals: activityAPI.goals.map(g => ({
    key: generateKey(),
    id: g.id,
    desc: g.description || '',
    obj: g.objective || ''
  })),

  milestones: activityAPI.schedule.map(s => ({
    key: generateKey(),
    id: s.id,
    name: s.milestone || '',
    start: s.plannedStart || '',
    end: s.plannedEnd || ''
  })),

  statePersonnel: activityAPI.statePersonnel.map(s => ({
    key: generateKey(),
    id: s.id,
    title: s.title || '',
    desc: s.description || '',
    years: s.years.reduce(
      (acc, y) => ({
        ...acc,
        [y.year]: {
          amt: y.cost,
          perc: y.fte * 100
        }
      }),
      {}
    )
  })),

  quarterlyFFP:
    activityAPI.quarterlyFFP && activityAPI.quarterlyFFP.length
      ? activityAPI.quarterlyFFP.reduce(
          (acc, ffy) => ({
            ...acc,
            [ffy.year]: {
              1: {
                combined: ffy.q1.combined * 100,
                contractors: ffy.q1.contractors * 100,
                state: ffy.q1.state * 100
              },
              2: {
                combined: ffy.q2.combined * 100,
                contractors: ffy.q2.contractors * 100,
                state: ffy.q2.state * 100
              },
              3: {
                combined: ffy.q3.combined * 100,
                contractors: ffy.q3.contractors * 100,
                state: ffy.q3.state * 100
              },
              4: {
                combined: ffy.q4.combined * 100,
                contractors: ffy.q4.contractors * 100,
                state: ffy.q4.state * 100
              }
            }
          }),
          {}
        )
      : quarterlyFFP
});
