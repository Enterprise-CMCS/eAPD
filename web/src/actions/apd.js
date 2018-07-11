import { push } from 'react-router-redux';

import { notify } from './notification';
import axios from '../util/api';

export const ADD_APD_KEY_PERSON = 'ADD_APD_KEY_PERSON';
export const ADD_APD_POC = 'ADD_APD_POC';
export const CREATE_APD = 'CREATE_APD';
export const CREATE_APD_REQUEST = 'CREATE_APD_REQUEST';
export const CREATE_APD_SUCCESS = 'CREATE_APD_SUCCESS';
export const CREATE_APD_FAILURE = 'CREATE_APD_FAILURE';
export const GET_APD_REQUEST = 'GET_APD_REQUEST';
export const GET_APD_SUCCESS = 'GET_APD_SUCCESS';
export const GET_APD_FAILURE = 'GET_APD_FAILURE';
export const REMOVE_APD_KEY_PERSON = 'REMOVE_APD_KEY_PERSON';
export const REMOVE_APD_POC = 'REMOVE_APD_POC';
export const SAVE_APD_REQUEST = 'SAVE_APD_REQUEST';
export const SAVE_APD_SUCCESS = 'SAVE_APD_SUCCESS';
export const SAVE_APD_FAILURE = 'SAVE_APD_FAILURE';
export const SELECT_APD = 'SELECT_APD';
export const SUBMIT_APD_REQUEST = 'SUBMIT_APD_REQUEST';
export const SUBMIT_APD_SUCCESS = 'SUBMIT_APD_SUCCESS';
export const SUBMIT_APD_FAILURE = 'SUBMIT_APD_FAILURE';
export const UPDATE_APD = 'UPDATE_APD';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const UPDATE_BUDGET_QUARTERLY_SHARE = 'UPDATE_BUDGET_QUARTERLY_SHARE';

export const addPointOfContact = () => ({ type: ADD_APD_POC });
export const removePointOfContact = index => ({ type: REMOVE_APD_POC, index });

export const updateBudget = () => (dispatch, getState) =>
  dispatch({ type: UPDATE_BUDGET, state: getState() });

export const updateBudgetQuarterlyShare = updates => ({
  type: UPDATE_BUDGET_QUARTERLY_SHARE,
  updates
});

export const requestApd = () => ({ type: GET_APD_REQUEST });
export const receiveApd = data => ({ type: GET_APD_SUCCESS, data });
export const failApd = error => ({ type: GET_APD_FAILURE, error });

export const addApdKeyPerson = () => ({ type: ADD_APD_KEY_PERSON });
export const removeApdKeyPerson = id => ({ type: REMOVE_APD_KEY_PERSON, id });

export const updateApd = updates => dispatch => {
  dispatch({ type: UPDATE_APD, updates });
  if (updates.years) {
    dispatch(updateBudget());
  }
};

export const createRequest = () => ({ type: CREATE_APD_REQUEST });
export const createSuccess = () => ({ type: CREATE_APD_SUCCESS });
export const createFailure = () => ({ type: CREATE_APD_FAILURE });
export const createApd = () => dispatch => {
  dispatch(createRequest());
  return axios
    .post('/apds')
    .then(req => {
      console.log(req.data);
    })
    .catch(error => {
      const reason = error.response ? error.response.data : 'N/A';
      dispatch(createFailure(reason));
    });
};

export const requestSave = () => ({ type: SAVE_APD_REQUEST });
export const saveSuccess = () => ({ type: SAVE_APD_SUCCESS });
export const saveFailure = () => ({ type: SAVE_APD_FAILURE });

export const fetchApd = () => dispatch => {
  dispatch(requestApd());

  const url = `/apds`;

  return axios
    .get(url)
    .then(req => {
      const apd = Array.isArray(req.data) ? req.data : null;
      dispatch(receiveApd(apd));
    })
    .catch(error => {
      const reason = error.response ? error.response.data : 'N/A';
      dispatch(failApd(reason));
    });
};

const shouldFetchApd = state => !state.apd.loaded;

export const fetchApdDataIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchApd(getState())) {
    return dispatch(fetchApd());
  }

  return null;
};

export const selectApd = (id, pushRoute = push) => (dispatch, getState) => {
  dispatch({ type: SELECT_APD, apd: getState().apd.byId[id] });
  dispatch(updateBudget());
  dispatch(pushRoute('/apd'));
};

export const notifyNetError = (action, error) => {
  const { response: res } = error;
  const reason = (res && (res.data || {}).error) || 'not-sure-why';

  return notify(`${action} failed (${reason})`);
};

export const saveApd = () => (dispatch, state) => {
  dispatch(requestSave());

  const {
    apd: { data: updatedApd },
    activities: { byId: activitiesByID }
  } = state();

  const incentivePayments = Object.entries(
    updatedApd.incentivePayments.ehAmt
  ).map(([year, quarters]) => ({
    year,
    q1: {
      ehPayment: quarters[1],
      ehCount: updatedApd.incentivePayments.ehCt[year][1],
      epPayment: updatedApd.incentivePayments.epAmt[year][1],
      epCount: updatedApd.incentivePayments.epCt[year][1]
    },
    q2: {
      ehPayment: quarters[2],
      ehCount: updatedApd.incentivePayments.ehCt[year][2],
      epPayment: updatedApd.incentivePayments.epAmt[year][2],
      epCount: updatedApd.incentivePayments.epCt[year][2]
    },
    q3: {
      ehPayment: quarters[3],
      ehCount: updatedApd.incentivePayments.ehCt[year][3],
      epPayment: updatedApd.incentivePayments.epAmt[year][3],
      epCount: updatedApd.incentivePayments.epCt[year][3]
    },
    q4: {
      ehPayment: quarters[4],
      ehCount: updatedApd.incentivePayments.ehCt[year][4],
      epPayment: updatedApd.incentivePayments.epAmt[year][4],
      epCount: updatedApd.incentivePayments.epCt[year][4]
    }
  }));

  const apd = {
    activities: [],
    federalCitations: updatedApd.assurancesAndCompliance,
    incentivePayments,
    narrativeHIE: updatedApd.hieNarrative,
    narrativeHIT: updatedApd.hitNarrative,
    narrativeMMIS: updatedApd.mmisNarrative,
    pointsOfContact: updatedApd.pointsOfContact,
    previousActivityExpenses: Object.entries(
      updatedApd.previousActivityExpenses
    ).map(([year, o]) => ({
      year,
      hie: o.hie,
      hit: o.hit,
      mmis: o.mmis
    })),
    previousActivitySummary: updatedApd.previousActivitySummary,
    programOverview: updatedApd.overview,
    stateProfile: updatedApd.stateProfile,
    years: updatedApd.years
  };

  Object.keys(activitiesByID).forEach(id => {
    const activity = activitiesByID[id];
    apd.activities.push({
      name: activity.name,
      fundingSource: activity.fundingSource,
      summary: activity.descShort,
      description: activity.descLong,
      alternatives: activity.altApproach,
      costAllocationNarrative: {
        methodology: activity.costAllocationDesc,
        otherSources: activity.otherFundingDesc
      },
      costAllocation: Object.entries(activity.costAllocation).map(
        ([year, allocation]) => ({
          federalPercent: +allocation.ffp.federal / 100,
          statePercent: +allocation.ffp.state / 100,
          otherAmount: +allocation.other,
          year
        })
      ),
      goals: activity.goals.map(g => ({
        description: g.desc,
        objective: g.obj
      })),
      schedule: activity.milestones.map(m => ({
        milestone: m.name,
        plannedStart: m.start || undefined,
        plannedEnd: m.end || undefined
      })),
      statePersonnel: activity.statePersonnel.map(s => ({
        title: s.title,
        description: s.desc,
        years: Object.keys(s.years).map(year => ({
          cost: +s.years[year].amt,
          fte: +s.years[year].perc / 100,
          year
        }))
      })),
      contractorResources: activity.contractorResources.map(c => ({
        name: c.name,
        description: c.desc,
        start: c.start || undefined,
        end: c.end || undefined,
        years: Object.keys(c.years).map(year => ({
          cost: +c.years[year],
          year
        }))
      })),
      expenses: activity.expenses.map(e => ({
        category: e.category,
        description: e.desc,
        entries: Object.keys(e.years).map(year => ({
          amount: +e.years[year],
          year
        }))
      })),
      standardsAndConditions: {
        businessResults: activity.standardsAndConditions.bizResults,
        documentation: activity.standardsAndConditions.documentation,
        industryStandards: activity.standardsAndConditions.industry,
        interoperability: activity.standardsAndConditions.interoperability,
        keyPersonnel: activity.standardsAndConditions.keyPersonnel,
        leverage: activity.standardsAndConditions.leverage,
        minimizeCost: activity.standardsAndConditions.minimizeCost,
        mitigationStrategy: activity.standardsAndConditions.mitigation,
        modularity: activity.standardsAndConditions.modularity,
        mita: activity.standardsAndConditions.mita,
        reporting: activity.standardsAndConditions.reporting
      }
    });
  });

  return axios
    .put(`/apds/${updatedApd.id}`, apd)
    .then(res => {
      dispatch(notify('Save successful!'));
      dispatch(saveSuccess(res.data));
    })
    .catch(error => {
      dispatch(notifyNetError('Save', error));
      dispatch(saveFailure());
      throw error;
    });
};

export const submitAPD = (save = saveApd) => (dispatch, getState) =>
  dispatch(save())
    .then(() => {
      dispatch({ type: SUBMIT_APD_REQUEST });

      const { apd: { data: { id: apdID } }, budget } = getState();

      const tables = {
        summaryBudgetTable: {
          hie: budget.hie,
          hit: budget.hit,
          mmis: budget.mmis,
          total: budget.combined
        },
        federalShareByFFYQuarter: budget.federalShareByFFYQuarter,
        programBudgetTable: {
          hitAndHie: {
            hit: budget.hit.combined,
            hie: budget.hie.combined,
            hitAndHie: budget.hitAndHie.combined
          },
          mmis: budget.mmisByFFP
        }
      };

      return axios
        .post(`/apds/${apdID}/versions`, { tables })
        .then(() => {
          dispatch(notify('Submission successful!'));
          dispatch({ type: SUBMIT_APD_SUCCESS });
        })
        .catch(error => {
          dispatch(notifyNetError('Submit', error));
          dispatch({ type: SUBMIT_APD_FAILURE });
        });
    })
    .catch(error => {
      dispatch(notifyNetError('Submit', error));
    });
