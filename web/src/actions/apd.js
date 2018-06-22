import { push } from 'react-router-redux';
import axios from '../util/api';

export const ADD_APD_KEY_PERSON = 'ADD_APD_KEY_PERSON';
export const CREATE_APD = 'CREATE_APD';
export const CREATE_APD_REQUEST = 'CREATE_APD_REQUEST';
export const CREATE_APD_SUCCESS = 'CREATE_APD_SUCCESS';
export const CREATE_APD_FAILURE = 'CREATE_APD_FAILURE';
export const GET_APD_REQUEST = 'GET_APD_REQUEST';
export const GET_APD_SUCCESS = 'GET_APD_SUCCESS';
export const GET_APD_FAILURE = 'GET_APD_FAILURE';
export const REMOVE_APD_KEY_PERSON = 'REMOVE_APD_KEY_PERSON';
export const SAVE_APD_REQUEST = 'SAVE_APD_REQUEST';
export const SAVE_APD_SUCCESS = 'SAVE_APD_SUCCESS';
export const SAVE_APD_FAILURE = 'SAVE_APD_FAILURE';
export const SELECT_APD = 'SELECT_APD';
export const UPDATE_APD = 'UPDATE_APD';
export const UPDATE_BUDGET = 'UPDATE_BUDGET';
export const UPDATE_BUDGET_QUARTERLY_SHARE = 'UPDATE_BUDGET_QUARTERLY_SHARE';

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
  axios
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
      dispatch(updateBudget());
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

export const selectApd = id => (dispatch, getState) => {
  dispatch({ type: SELECT_APD, apd: getState().apd.byId[id] });
  dispatch(push('/apd'));
};

export const saveApd = () => (dispatch, state) => {
  dispatch(requestSave());

  const {
    apd: { data: updatedApd },
    activities: { byId: activitiesByID }
  } = state();

  const apd = {
    activities: [],
    narrativeHIE: updatedApd.hieNarrative,
    narrativeHIT: updatedApd.hitNarrative,
    narrativeMMIS: updatedApd.mmisNarrative,
    programOverview: updatedApd.overview,
    state: updatedApd.state,
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
    .then(res => dispatch(saveSuccess(res.data)))
    .catch(() => dispatch(saveFailure())); // TODO handle the error
};
