import { generateKey } from '../index';
import assurancesList from '../../data/assurancesAndCompliance.yaml';

export const initialAssurances = Object.entries(assurancesList).reduce(
  (acc, [name, regulations]) => ({
    ...acc,
    [name]: Object.keys(regulations).map(reg => ({
      title: reg,
      checked: '',
      explanation: ''
    }))
  }),
  {}
);

/**
 * Deserialize an APD object from the API into an object
 * matching redux state shape.
 * @param {*} apdAPI - APD object from the API
 */
export const fromAPI = apdAPI => {
  const {
    // these get massaged
    activities,
    federalCitations,
    keyPersonnel,

    // and everything else just gets copied
    ...apd
  } = apdAPI;

  return {
    ...apd,

    activities: activities.map(
      ({
        contractorResources,
        expenses,
        goals,
        schedule,
        statePersonnel,
        ...activity
      }) => ({
        key: generateKey(),

        ...activity,

        // These properties need some massaging into reducer state
        contractorResources: contractorResources.map(c => ({
          key: generateKey(),
          ...c
        })),

        expenses: expenses.map(e => ({
          key: generateKey(),
          initialCollapsed: true,
          ...e
        })),

        goals: goals.map(g => ({
          ...g,
          initialCollapsed: true,
          key: generateKey()
        })),

        schedule: schedule.map(s => ({
          ...s,
          initialCollapsed: true,
          key: generateKey()
        })),

        statePersonnel: statePersonnel.map(s => ({
          key: generateKey(),
          initialCollapsed: true,
          ...s
        }))
      })
    ),

    federalCitations:
      Object.keys(federalCitations).length > 0
        ? federalCitations
        : initialAssurances,

    keyPersonnel: keyPersonnel.map(kp => ({
      ...kp,
      initialCollapsed: true,
      key: generateKey()
    }))
  };
};
