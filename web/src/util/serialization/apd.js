import {
  toAPI as activityToAPI,
  fromAPI as activityFromAPI
} from './activities';
import { replaceNulls } from '../index';
import assurancesList from '../../data/assurancesAndCompliance.yaml';

export const initialAssurances = Object.entries(assurancesList).reduce(
  (acc, [name, regulations]) => ({
    ...acc,
    [name]: Object.keys(regulations).map(reg => ({
      title: reg,
      checked: false,
      explanation: ''
    }))
  }),
  {}
);

const incentivePaymentsReducer = (obj, paymentByQuarter) => {
  const ip = obj;
  ip.ehAmt[paymentByQuarter.year] = {
    1: paymentByQuarter.q1.ehPayment,
    2: paymentByQuarter.q2.ehPayment,
    3: paymentByQuarter.q3.ehPayment,
    4: paymentByQuarter.q4.ehPayment
  };

  ip.ehCt[paymentByQuarter.year] = {
    1: paymentByQuarter.q1.ehCount,
    2: paymentByQuarter.q2.ehCount,
    3: paymentByQuarter.q3.ehCount,
    4: paymentByQuarter.q4.ehCount
  };

  ip.epAmt[paymentByQuarter.year] = {
    1: paymentByQuarter.q1.epPayment,
    2: paymentByQuarter.q2.epPayment,
    3: paymentByQuarter.q3.epPayment,
    4: paymentByQuarter.q4.epPayment
  };

  ip.epCt[paymentByQuarter.year] = {
    1: paymentByQuarter.q1.epCount,
    2: paymentByQuarter.q2.epCount,
    3: paymentByQuarter.q3.epCount,
    4: paymentByQuarter.q4.epCount
  };
  return obj;
};

const previousActivityExpensesReducer = (previous, year) => ({
  ...previous,
  [year.year]: {
    hie: year.hie,
    hit: year.hit,
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
  const incentivePayments = Object.entries(
    apdState.incentivePayments.ehAmt
  ).map(([year, quarters]) => ({
    year,
    q1: {
      ehPayment: quarters[1],
      ehCount: apdState.incentivePayments.ehCt[year][1],
      epPayment: apdState.incentivePayments.epAmt[year][1],
      epCount: apdState.incentivePayments.epCt[year][1]
    },
    q2: {
      ehPayment: quarters[2],
      ehCount: apdState.incentivePayments.ehCt[year][2],
      epPayment: apdState.incentivePayments.epAmt[year][2],
      epCount: apdState.incentivePayments.epCt[year][2]
    },
    q3: {
      ehPayment: quarters[3],
      ehCount: apdState.incentivePayments.ehCt[year][3],
      epPayment: apdState.incentivePayments.epAmt[year][3],
      epCount: apdState.incentivePayments.epCt[year][3]
    },
    q4: {
      ehPayment: quarters[4],
      ehCount: apdState.incentivePayments.ehCt[year][4],
      epPayment: apdState.incentivePayments.epAmt[year][4],
      epCount: apdState.incentivePayments.epCt[year][4]
    }
  }));

  const {
    federalCitations,
    narrativeHIE,
    narrativeHIT,
    narrativeMMIS,
    pointsOfContact,
    previousActivitySummary,
    programOverview,
    stateProfile,
    years
  } = apdState;

  const apd = {
    activities: Object.values(activityState.byKey).map(serializeActivity),
    federalCitations,
    incentivePayments,
    narrativeHIE,
    narrativeHIT,
    narrativeMMIS,
    pointsOfContact,
    previousActivityExpenses: Object.entries(
      apdState.previousActivityExpenses
    ).map(([year, o]) => ({
      year,
      hie: o.hie,
      hit: o.hit,
      mmis: o.mmis
    })),
    previousActivitySummary,
    programOverview,
    stateProfile,
    years
  };

  return apd;
};

/**
 * Deserialize an APD object from the API into an object
 * matching redux state shape.
 * @param {*} apdAPI - APD object from the API
 */
export const fromAPI = (apdAPI, deserializeActivity = activityFromAPI) => ({
  // These properties are just copied over, maybe renamed,
  // but no data massaging necessary
  id: apdAPI.id,
  federalCitations: apdAPI.federalCitations || initialAssurances,
  narrativeHIE: apdAPI.narrativeHIE || '',
  narrativeHIT: apdAPI.narrativeHIT || '',
  narrativeMMIS: apdAPI.narrativeMMIS || '',
  programOverview: apdAPI.programOverview || '',
  pointsOfContact: apdAPI.pointsOfContact,
  previousActivitySummary: apdAPI.previousActivitySummary || '',
  stateProfile: replaceNulls(apdAPI.stateProfile),
  status: apdAPI.status,

  // These properties need some massaging into reducer state
  activities: apdAPI.activities.map(a => deserializeActivity(a, apdAPI.years)),

  incentivePayments: apdAPI.incentivePayments.reduce(incentivePaymentsReducer, {
    ehAmt: {},
    ehCt: {},
    epAmt: {},
    epCt: {}
  }),

  previousActivityExpenses: apdAPI.previousActivityExpenses.reduce(
    previousActivityExpensesReducer,
    {}
  ),

  years: apdAPI.years.map(y => `${y}`)
});
