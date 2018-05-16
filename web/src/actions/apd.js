import axios from '../util/api';

export const ADD_APD_KEY_PERSON = 'ADD_APD_KEY_PERSON';
export const GET_APD_REQUEST = 'GET_APD_REQUEST';
export const GET_APD_SUCCESS = 'GET_APD_SUCCESS';
export const GET_APD_FAILURE = 'GET_APD_FAILURE';
export const REMOVE_APD_KEY_PERSON = 'REMOVE_APD_KEY_PERSON';
export const SAVE_APD_REQUEST = 'SAVE_APD_REQUEST';
export const SAVE_APD_SUCCESS = 'SAVE_APD_SUCCESS';
export const SAVE_APD_FAILURE = 'SAVE_APD_FAILURE';
export const UPDATE_APD = 'UPDATE_APD';

export const requestApd = () => ({ type: GET_APD_REQUEST });
export const receiveApd = data => ({ type: GET_APD_SUCCESS, data });
export const failApd = error => ({ type: GET_APD_FAILURE, error });

export const addApdKeyPerson = () => ({ type: ADD_APD_KEY_PERSON });
export const removeApdKeyPerson = id => ({ type: REMOVE_APD_KEY_PERSON, id });
export const updateApd = updates => ({ type: UPDATE_APD, updates });

export const requestSave = () => ({ type: SAVE_APD_REQUEST });
export const saveSuccess = () => ({ type: SAVE_APD_SUCCESS });
export const saveFailure = () => ({ type: SAVE_APD_FAILURE });

export const fetchApd = () => dispatch => {
  dispatch(requestApd());

  const url = `/apds`;

  return axios
    .get(url)
    .then(req => {
      const apd = Array.isArray(req.data) ? req.data[0] : null;
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

export const saveApd = () => (dispatch, state) => {
  dispatch(requestSave());

  const {
    apd: { data: updatedApd },
    activities: { byId: activitiesByID }
  } = state();

  const apd = {
    activities: [],
    keyPersonnel: updatedApd.keyPersonnel.map(p => ({
      title: p.title,
      description: p.desc,
      years: Object.keys(p.years).map(year => ({
        year,
        cost: p.years[year].amt,
        fte: p.years[year].perc
      }))
    })),
    narrativeHIE: updatedApd.hieNarrative,
    narrativeHIT: updatedApd.hitNarrative,
    narrativeMMIS: updatedApd.mmisNarrative,
    programOverview: updatedApd.overview,
    years: updatedApd.years
  };

  Object.keys(activitiesByID).forEach(id => {
    const activity = activitiesByID[id];
    apd.activities.push({
      name: activity.name,
      types: activity.types,
      summary: activity.descShort,
      description: activity.descLong,
      alternatives: activity.altApproach,
      costAllocationMethodology: activity.costAllocateDesc,
      otherFundingSources: {
        description: activity.otherFundingDesc,
        amount: activity.otherFundingAmt
      },
      goals: activity.goals.map(g => ({
        description: g.desc,
        objectives: [{ description: g.obj }] // TODO - objective should mape 1:1 to goals, instead of being an array (needs backend change first)
      })),
      schedule: activity.milestones.map(m => ({
        milestone: m.name,
        plannedStart: m.start,
        plannedEnd: m.end
      })),
      statePersonnel: activity.statePersonnel.map(s => ({
        title: s.title,
        description: s.desc,
        years: Object.keys(s.years).map(year => ({
          cost: +s.years[year].amt,
          fte: +s.years[year].perc,
          year
        }))
      })),
      contractorResources: activity.contractorResources.map(c => ({
        name: c.name,
        description: c.desc,
        start: c.start,
        end: c.end,
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

  console.log(JSON.stringify(apd));
};
