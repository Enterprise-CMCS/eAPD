import { applyToNumbers, generateKey, replaceNulls } from '../index';

/**
 * Serializes an APD object from redux state shape into
 * API format
 * @param {Object} activityState Activity object from redux state
 */
export const toAPI = activityState => {
  const {
    costAllocation,
    costAllocationDesc,
    contractorResources,
    expenses,
    statePersonnel,
    otherFundingDesc,
    quarterlyFFP,

    ...activity
  } = activityState;

  return {
    ...activity,

    contractorResources: contractorResources.map(c => ({
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
    costAllocation: Object.entries(costAllocation).map(
      ([year, allocation]) => ({
        federalPercent: +allocation.ffp.federal / 100,
        statePercent: +allocation.ffp.state / 100,
        otherAmount: +allocation.other,
        year
      })
    ),
    costAllocationNarrative: {
      methodology: costAllocationDesc,
      otherSources: otherFundingDesc
    },
    expenses: expenses.map(e => ({
      id: e.id,
      category: e.category,
      description: e.desc,
      entries: Object.keys(e.years).map(year => ({
        amount: +e.years[year],
        year
      }))
    })),
    statePersonnel: statePersonnel.map(s => ({
      id: s.id,
      title: s.title,
      description: s.desc,
      keyPersonnel: s.isKeyPersonnel,
      years: Object.keys(s.years).map(year => ({
        cost: +s.years[year].amt,
        fte: +s.years[year].perc / 100,
        year
      }))
    })),
    quarterlyFFP: Object.entries(quarterlyFFP).map(([year, ffp]) => ({
      q1: applyToNumbers(ffp[1], v => v / 100),
      q2: applyToNumbers(ffp[2], v => v / 100),
      q3: applyToNumbers(ffp[3], v => v / 100),
      q4: applyToNumbers(ffp[4], v => v / 100),
      year
    }))
  };
};

/**
 * Deserialize an APD activity object from the API into an
 * object matching redux state shape.
 * @param {Object} activityAPI - The activity object from the API
 * @param {Array.<string>} years - the years for the associated APD
 */
export const fromAPI = (activityAPI, years) => {
  const {
    // these have to be massaged into reducer state
    costAllocationNarrative: { methodology: costAllocationDesc },
    costAllocationNarrative: { otherSources: otherFundingDesc },
    contractorResources,
    costAllocation,
    expenses,
    goals,
    schedule,
    statePersonnel,
    quarterlyFFP,

    // then grab up everything else
    ...activity
  } = activityAPI;

  return replaceNulls({
    key: generateKey(),
    years,

    ...activity,
    costAllocationDesc,
    otherFundingDesc,

    // These properties need some massaging into reducer state
    contractorResources: contractorResources.map(c => ({
      key: generateKey(),
      id: c.id,
      name: c.name,
      desc: c.description,
      start: c.start,
      end: c.end,
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

    costAllocation: costAllocation.reduce(
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

    expenses: expenses.map(e => ({
      key: generateKey(),
      id: e.id,
      category: e.category,
      desc: e.description,
      years: e.entries.reduce(
        (acc, y) => ({
          ...acc,
          [y.year]: +y.amount
        }),
        {}
      )
    })),

    goals: goals.map(g => ({
      ...replaceNulls(g),
      key: generateKey()
    })),

    schedule: schedule.map(s => ({
      ...replaceNulls(s),
      key: generateKey()
    })),

    statePersonnel: statePersonnel.map(s => ({
      key: generateKey(),
      id: s.id,
      title: s.title,
      desc: s.description,
      isKeyPersonnel: s.keyPersonnel || false,
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

    quarterlyFFP: quarterlyFFP.reduce(
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
  });
};
