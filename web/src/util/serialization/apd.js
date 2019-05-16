import {
  toAPI as activityToAPI,
  fromAPI as activityFromAPI
} from './activities';
import { generateKey, replaceNulls } from '../index';
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

const incentivePaymentsSerializer = {
  fromAPI: incentivePayments =>
    incentivePayments.reduce(
      (obj, paymentByQuarter) => {
        const ip = obj;

        [
          ['ehAmt', 'ehPayment'],
          ['ehCt', 'ehCount'],
          ['epAmt', 'epPayment'],
          ['epCt', 'epCount']
        ].forEach(([stateName, apiName]) => {
          const payments = {};
          [...Array(4)].forEach((_, i) => {
            payments[i + 1] = paymentByQuarter[`q${i + 1}`][apiName];
          });
          ip[stateName][paymentByQuarter.year] = payments;
        });

        return obj;
      },
      {
        ehAmt: {},
        ehCt: {},
        epAmt: {},
        epCt: {}
      }
    ),
  toAPI: incentivePayments =>
    Object.entries(incentivePayments.ehAmt).map(([year, quarters]) => ({
      year,
      q1: {
        ehPayment: +quarters[1],
        ehCount: +incentivePayments.ehCt[year][1],
        epPayment: +incentivePayments.epAmt[year][1],
        epCount: +incentivePayments.epCt[year][1]
      },
      q2: {
        ehPayment: +quarters[2],
        ehCount: +incentivePayments.ehCt[year][2],
        epPayment: +incentivePayments.epAmt[year][2],
        epCount: +incentivePayments.epCt[year][2]
      },
      q3: {
        ehPayment: +quarters[3],
        ehCount: +incentivePayments.ehCt[year][3],
        epPayment: +incentivePayments.epAmt[year][3],
        epCount: +incentivePayments.epCt[year][3]
      },
      q4: {
        ehPayment: +quarters[4],
        ehCount: +incentivePayments.ehCt[year][4],
        epPayment: +incentivePayments.epAmt[year][4],
        epCount: +incentivePayments.epCt[year][4]
      }
    }))
};

const previousActivityExpensesReducer = (previous, year) => ({
  ...previous,
  [year.year]: {
    hithie: year.hithie,
    mmis: year.mmis
  }
});

/**
 * Serialize a redux state APD and activities into an object
 * appropriate for sending to the API
 * @param {Object} apdState - APD data object from redux state
 * @param {Object} activityState - Activities from redux state - must be { byKey: {...}}
 * @param {Function} [serializeActivity] - Serializer for activities.
 * @returns {Object} API-formatted APD object
 */
export const toAPI = (
  apdState,
  activityState,
  serializeActivity = activityToAPI
) => {
  const {
    // these get massaged
    incentivePayments,
    keyPersonnel,
    previousActivityExpenses,

    // and everything else just gets copied
    ...apd
  } = apdState;

  return {
    ...apd,
    activities: Object.values(activityState.byKey).map(serializeActivity),
    incentivePayments: incentivePaymentsSerializer.toAPI(incentivePayments),
    keyPersonnel: keyPersonnel.map(kp => ({
      ...kp,
      percentTime: kp.percentTime / 100,
      costs: kp.hasCosts
        ? Object.entries(kp.costs).map(([year, cost]) => ({ year, cost }))
        : []
    })),
    previousActivityExpenses: Object.entries(previousActivityExpenses).map(
      ([year, o]) => ({
        year,
        hithie: o.hithie,
        mmis: o.mmis
      })
    )
  };
};

/**
 * Deserialize an APD object from the API into an object
 * matching redux state shape.
 * @param {*} apdAPI - APD object from the API
 */
export const fromAPI = (apdAPI, deserializeActivity = activityFromAPI) => {
  const {
    // these get massaged
    activities,
    federalCitations,
    incentivePayments,
    keyPersonnel,
    previousActivityExpenses,
    years,

    // and everything else just gets copied
    ...apd
  } = apdAPI;

  return replaceNulls({
    ...apd,
    activities: activities.map(a => deserializeActivity(a, years)),
    federalCitations: federalCitations || initialAssurances,
    incentivePayments: incentivePaymentsSerializer.fromAPI(incentivePayments),
    keyPersonnel: keyPersonnel.map(p => ({
      ...p,
      // expand by default if the person is primary and their content is empty
      expanded:
        p.isPrimary &&
        (!p.email &&
          !p.hasCosts &&
          !p.name &&
          +p.percentTime === 0 &&
          !p.position),
      percentTime: p.percentTime * 100,
      costs: p.costs.reduce(
        (costs, { year, cost }) => ({ ...costs, [year]: +cost }),
        {}
      ),
      key: generateKey()
    })),
    previousActivityExpenses: previousActivityExpenses.reduce(
      previousActivityExpensesReducer,
      {}
    ),
    years: years.map(y => `${y}`)
  });
};
