import {
  toAPI as activityToAPI,
  fromAPI as activityFromAPI
} from './activities';
import { replaceNulls } from '../index';

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

  const apd = {
    activities: Object.values(activityState.byKey).map(serializeActivity),
    federalCitations: apdState.assurancesAndCompliance,
    incentivePayments,
    narrativeHIE: apdState.hieNarrative,
    narrativeHIT: apdState.hitNarrative,
    narrativeMMIS: apdState.mmisNarrative,
    pointsOfContact: apdState.pointsOfContact,
    previousActivityExpenses: Object.entries(
      apdState.previousActivityExpenses
    ).map(([year, o]) => ({
      year,
      hie: o.hie,
      hit: o.hit,
      mmis: o.mmis
    })),
    previousActivitySummary: apdState.previousActivitySummary,
    programOverview: apdState.overview,
    stateProfile: apdState.stateProfile,
    years: apdState.years
  };

  return apd;
};

/**
 * Deserialize an APD object from the API into an object
 * matching redux state shape.
 * @param {*} apdAPI - APD object from the API
 * @param {Object} defaults - default values for missing properties
 * @param {Object} defaults.activities - default activities
 * @param {Object} defaults.assurancesAndCompliance - default assurances and compliance
 * @param {Object} defaults.hieNarrative - default HIE narrative
 * @param {Object} defaults.hitNarrative - default HIT narrative
 * @param {Object} defaults.incentivePayments - default value for incentive payments
 * @param {Object} defaults.mmisNarrative - default MMIS narrative
 * @param {Object} defaults.overview - default APD overview
 * @param {Object} defaults.pointsOfContact - default points of contact
 * @param {Object} defaults.previousActivityExpenses - default value for previousActivityExpenses
 * @param {Object} defaults.previousActivitySummary - default activity summary
 * @param {Object} defaults.stateProfile - default state profile
 * @param {Object} defaults.years - default value for years
 */
export const fromAPI = (
  apdAPI,
  {
    activities,
    assurancesAndCompliance,
    hieNarrative,
    hitNarrative,
    incentivePayments,
    mmisNarrative,
    overview,
    pointsOfContact,
    previousActivityExpenses,
    previousActivitySummary,
    stateProfile,
    years
  } = {},
  deserializeActivity = activityFromAPI
) => ({
  // These properties are just copied over, maybe renamed,
  // but no data massaging necessary
  id: apdAPI.id,
  assurancesAndCompliance: apdAPI.federalCitations || assurancesAndCompliance,
  hieNarrative: apdAPI.narrativeHIE || hieNarrative,
  hitNarrative: apdAPI.narrativeHIT || hitNarrative,
  mmisNarrative: apdAPI.narrativeMMIS || mmisNarrative,
  overview: apdAPI.programOverview || overview,
  pointsOfContact: apdAPI.pointsOfContact || pointsOfContact,
  previousActivitySummary:
    apdAPI.previousActivitySummary || previousActivitySummary,
  stateProfile: replaceNulls(apdAPI.stateProfile || stateProfile),

  // These properties need some massaging into reducer state
  activities:
    apdAPI.activities && apdAPI.activities.length
      ? apdAPI.activities.map(a =>
          deserializeActivity(a, apdAPI.years || years)
        )
      : activities,

  incentivePayments:
    apdAPI.incentivePayments && apdAPI.incentivePayments.length
      ? apdAPI.incentivePayments.reduce(incentivePaymentsReducer, {
          ehAmt: {},
          ehCt: {},
          epAmt: {},
          epCt: {}
        })
      : incentivePayments,

  previousActivityExpenses:
    apdAPI.previousActivityExpenses && apdAPI.previousActivityExpenses.length
      ? apdAPI.previousActivityExpenses.reduce(
          previousActivityExpensesReducer,
          {}
        )
      : previousActivityExpenses,

  years: (apdAPI.years || years).map(y => `${y}`)
});
