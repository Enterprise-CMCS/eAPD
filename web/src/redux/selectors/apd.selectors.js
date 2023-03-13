import { createSelector } from 'reselect';
import { INCENTIVE_ENTRIES } from '../../util';
import { stringToNumber } from '../../util/formats';

export const selectApds = ({ apd }) => apd;

export const selectApdData = ({ apd: { data } }) => data;

export const selectApdType = ({
  apd: {
    data: { apdType }
  }
}) => apdType;

export const selectApdYears = ({
  apd: {
    data: { years }
  }
}) => years;

export const selectSummary = ({
  apd: {
    data: {
      name,
      years,
      yearOptions,
      apdOverview: {
        programOverview,
        narrativeHIE,
        narrativeHIT,
        narrativeMMIS
      } = {}
    }
  }
}) => ({
  name,
  narrativeHIE,
  narrativeHIT,
  narrativeMMIS,
  programOverview,
  years,
  yearOptions
});

export const selectPriorities = state =>
  state.apd.data.statePrioritiesAndScope.medicaidProgramAndPriorities;
export const selectMesIntro = state =>
  state.apd.data.statePrioritiesAndScope.mesIntroduction;
export const selectScope = state =>
  state.apd.data.statePrioritiesAndScope.scopeOfAPD;

export const selectKeyPersonnel = state =>
  state.apd.data.keyStatePersonnel.keyPersonnel;
export const selectKeyStatePersonnel = state =>
  state.apd.data.keyStatePersonnel;

export const selectPreviousActivitySummary = state =>
  state.apd.data.previousActivities.previousActivitySummary;

export const selectPreviousHITHIEActivities = createSelector(
  [selectApdData],
  ({ previousActivities }) =>
    Object.entries(previousActivities.actualExpenditures).reduce(
      (o, [year, expenses]) => ({
        ...o,
        [year]: {
          federalActual: expenses.hithie.federalActual,
          totalApproved: expenses.hithie.totalApproved
        }
      }),
      {}
    )
);

export const selectPreviousActivities = createSelector(
  [selectApdData],
  ({ previousActivities }) =>
    Object.entries(previousActivities.actualExpenditures).reduce(
      (o, [year, expenses]) => ({
        ...o,
        [year]: expenses
      }),
      {}
    )
);

export const selectPreviousActivityExpensesTotalsMMIS = createSelector(
  [selectApdData],
  ({ previousActivities }) =>
    Object.entries(previousActivities.actualExpenditures).reduce(
      (acc, [ffy, expenses]) => ({
        ...acc,
        [ffy]: {
          actual: [75, 50].reduce(
            (sum, ffp) =>
              sum +
              stringToNumber(expenses.mando[ffp].federalActual) +
              stringToNumber(expenses.ddi[ffp].federalActual),
            stringToNumber(expenses.ddi[90].federalActual)
          ),
          approved: [75, 50].reduce(
            (sum, ffp) =>
              sum +
              (stringToNumber(expenses.mando[ffp].totalApproved) * ffp) / 100 +
              (stringToNumber(expenses.ddi[ffp].totalApproved) * ffp) / 100,
            (stringToNumber(expenses.ddi[90].totalApproved) * 90) / 100
          )
        }
      }),
      {}
    )
);

export const selectPreviousActivityExpensesTotalsHITECH = createSelector(
  [selectApdData],
  ({ previousActivities }) =>
    Object.entries(previousActivities.actualExpenditures).reduce(
      (acc, [ffy, expenses]) => ({
        ...acc,
        [ffy]: {
          actual:
            (expenses?.hithie?.federalActual || 0) +
            [90, 75, 50].reduce(
              (sum, ffp) =>
                sum + stringToNumber(expenses.mmis[ffp].federalActual),
              0
            ),
          approved:
            (expenses?.hithie?.totalApproved * 0.9 || 0) +
            [90, 75, 50].reduce(
              (sum, ffp) =>
                sum +
                (stringToNumber(expenses.mmis[ffp].totalApproved) * ffp) / 100,
              0
            )
        }
      }),
      {}
    )
);

export const selectFederalCitations = state =>
  state.apd.data.assurancesAndCompliances;

const addObjVals = obj => Object.values(obj).reduce((a, b) => +a + +b, 0);

export const selectIncentivePayments = ({
  apd: {
    data: {
      proposedBudget: { incentivePayments }
    }
  }
}) => incentivePayments;

export const selectIncentivePaymentTotals = createSelector(
  [selectApdData],
  ({ proposedBudget, years }) => {
    const totals = INCENTIVE_ENTRIES.reduce((obj, entry) => {
      const datum = proposedBudget.incentivePayments[entry.id];
      const byYear = years.reduce((obj2, yr) => {
        obj2[yr] = addObjVals(datum[yr]);
        return obj2;
      }, {});

      obj[entry.id] = { byYear, allYears: addObjVals(byYear) };
      return obj;
    }, {});

    return totals;
  }
);

export const selectApdDashboard = createSelector([selectApds], ({ byId }) =>
  Object.values(byId).map(({ id, created, name, updated }) => ({
    id,
    created,
    name,
    updated
  }))
);

export const selectLastSavedTimestamp = state => state.apd.data.updated;
export const selectSecurityInterfacePlan = state =>
  state.apd.data.securityPlanning.securityAndInterfacePlan;
export const selectBusinessContinuityAndDisasterRecovery = state =>
  state.apd.data.securityPlanning.businessContinuityAndDisasterRecovery;

export const selectAdminCheckErrors = state => state.apd.adminCheck?.errors;
export const selectAdminCheckEnabled = state => state.apd.adminCheck?.enabled;
export const selectAdminCheckCollapsed = state =>
  state.apd.adminCheck?.collapsed;
export const selectAdminCheckComplete = state => state.apd.adminCheck?.complete;
