import { createSelector } from 'reselect';
import { INCENTIVE_ENTRIES } from '../../util';
import { stringToNumber } from '../../util/formats';

import { APD_TYPE } from '@cms-eapd/common';

export const selectApds = ({ apd }) => apd;

export const selectApdData = ({ apd: { data } }) => data;

export const selectApdType = state => {
  return state?.apd?.data?.apdType || APD_TYPE.HITECH;
};

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

// returns boolean fields in medicaidBusinessAreas after removing the text field otherMedicaidBusinessAreas
export const selectMedicaidBusinessAreasBooleanFields = createSelector(
  [selectApdData],
  ({ apdOverview: { medicaidBusinessAreas } }) => {
    const medicaidBusinessAreasBooleanFields = Object.assign(
      {},
      medicaidBusinessAreas
    );
    delete medicaidBusinessAreasBooleanFields.otherMedicaidBusinessAreas;
    return medicaidBusinessAreasBooleanFields;
  }
);

// returns the text field otherMedicaidBusinessAreas from medicaidBusinessAreas
export const selectMedicaidBusinessAreasTextField = createSelector(
  [selectApdData],
  ({
    apdOverview: {
      medicaidBusinessAreas: { otherMedicaidBusinessAreas }
    }
  }) => otherMedicaidBusinessAreas
);

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

export const selectPreviousMMISActivities = createSelector(
  [selectApdData],
  ({ previousActivities }) =>
    Object.entries(previousActivities.actualExpenditures).reduce(
      (o, [year, expenses]) => ({
        ...o,
        [year]: expenses.mmis
      }),
      {}
    )
);

export const selectPreviousActivityExpensesTotals = createSelector(
  [selectApdData],
  ({ previousActivities }) =>
    Object.entries(previousActivities.actualExpenditures).reduce(
      (acc, [ffy, expenses]) => ({
        ...acc,
        [ffy]: {
          actual:
            expenses.hithie.federalActual +
            [90, 75, 50].reduce(
              (sum, ffp) =>
                sum + stringToNumber(expenses.mmis[ffp].federalActual),
              0
            ),
          approved:
            expenses.hithie.totalApproved * 0.9 +
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
