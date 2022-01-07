import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';
import { updateBudget } from '../budget';


export const saveContractor = (activityIndex, index, data) => (dispatch, getState) => {
  const previousState = getState();
  
  let indexCalculated = index;
  console.log("state", previousState.apd.data);
  if(previousState.apd.data.activities[activityIndex].contractorResources[index] === undefined) {
    indexCalculated = previousState.apd.data.activities[activityIndex].contractorResources.length;
    dispatch({
      type: ADD_APD_ITEM,
      path: `/activities/${activityIndex}/contractorResources/-`,
      state: getState()
    });
  }
  
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/contractorResources/${index}`,
    value: data
  });
  
  dispatch(updateBudget());  
}

/**
 * Add a new contractor resource to an activity
 * @param {Number} activityIndex Index of the activity to add the contractor to
 */
export const addContractor = activityIndex => (dispatch, getState) => {
  dispatch({
    type: ADD_APD_ITEM,
    path: `/activities/${activityIndex}/contractorResources/-`,
    state: getState()
  });
  dispatch(updateBudget());
};

/**
 * Remove a contractor resource from an activity
 * @param {Number} activityIndex Index of the activity to remove the contractor from
 * @param {Number} contractorIndex Index of the contractor to remove
 */
export const removeContractor = (
  activityIndex,
  contractorIndex
) => dispatch => {
  dispatch({
    type: REMOVE_APD_ITEM,
    path: `/activities/${activityIndex}/contractorResources/${contractorIndex}`
  });
  dispatch(updateBudget());
};

/**
 * Rename a contractor resource
 * @param {Number} activityIndex Index of the activity the contractor is in
 * @param {Number} contractorIndex Index of the contractor to change
 * @param {String} name New name
 */
export const setContractorName = (activityIndex, contractorIndex, name) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/name`,
  value: name
});

/**
 * Change a contractor description
 * @param {Number} activityIndex Index of the activity the contractor is in
 * @param {Number} contractorIndex Index of the contractor to change
 * @param {String} description New description
 */
export const setContractorDescription = (
  activityIndex,
  contractorIndex,
  description
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/description`,
  value: description
});

/**
 * Change a contractor end date
 * @param {Number} activityIndex Index of the activity the contractor is in
 * @param {Number} contractorIndex Index of the contractor to change
 * @param {String} date New end date, in the form 'YYYY-MM-DD'
 */
export const setContractorEndDate = (activityIndex, contractorIndex, date) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/end`,
  value: date
});

/**
 * Change a contractor start date
 * @param {Number} activityIndex Index of the activity the contractor is in
 * @param {Number} contractorIndex Index of the contractor to change
 * @param {String} date New start date, in the form 'YYYY-MM-DD'
 */
export const setContractorStartDate = (
  activityIndex,
  contractorIndex,
  date
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/start`,
  value: date
});

/**
 * Change a contractor total cost
 * @param {Number} activityIndex Index of the activity the contractor is in
 * @param {Number} contractorIndex Index of the contractor to change
 * @param {Number} cost New total cost of the contractor resource
 */
export const setContractorTotalCost = (
  activityIndex,
  contractorIndex,
  cost
) => ({
  type: EDIT_APD,
  path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/totalCost`,
  value: cost
});

/**
 * Change a contractor cost for a federal fiscal year
 * @param {Number} activityIndex Index of the activity the contractor is in
 * @param {Number} contractorIndex Index of the contractor to change
 * @param {String} year Year to update, four-digit
 * @param {Number} cost New contractor cost for the year
 */
export const setContractorCostForYear = (
  activityIndex,
  contractorIndex,
  year,
  cost
) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/years/${year}`,
    value: cost
  });
  dispatch(updateBudget());
};

/**
 * Set whether a contractor is an hourly cost
 * @param {Number} activityIndex Index of the activity the contractor is in
 * @param {Number} contractorIndex Index of the contractor to change
 * @param {Boolean} isHourly Whether the contractor is an hourly cost
 */
export const setContractorIsHourly = (
  activityIndex,
  contractorIndex,
  isHourly
) => dispatch => {
  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/hourly/useHourly`,
    value: isHourly
  });
  dispatch(updateBudget());
};

/**
 * Set the hourly cost of the contractor for a federal fiscal year
 * @param {Number} activityIndex Index of the activity the contractor is in
 * @param {Number} contractorIndex Index of the contractor to change
 * @param {String} year Year to update, four-digit
 * @param {Number} rate Hourly cost of the contractor for the year
 */
export const setContractorHourlyRateForYear = (
  activityIndex,
  contractorIndex,
  year,
  rate
) => (dispatch, getState) => {
  const hours =
    +getState().apd.data.activities[activityIndex].contractorResources[
      contractorIndex
    ].hourly.data[year].hours || 0;

  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/hourly/data/${year}/rate`,
    value: rate
  });
  dispatch(
    setContractorCostForYear(
      activityIndex,
      contractorIndex,
      year,
      hours * +rate
    )
  );
};

/**
 * Set the number of hours to be worked by a contractor for a federal fiscal year
 * @param {Number} activityIndex Index of the activity the contractor is in
 * @param {Number} contractorIndex Index of the contractor to change
 * @param {String} year Year to update, four-digit
 * @param {Number} hours Number of hours the contractor will work for the year
 */
export const setContractorNumberOfHoursForYear = (
  activityIndex,
  contractorIndex,
  year,
  hours
) => (dispatch, getState) => {
  const rate =
    +getState().apd.data.activities[activityIndex].contractorResources[
      contractorIndex
    ].hourly.data[year].rate || 0;

  dispatch({
    type: EDIT_APD,
    path: `/activities/${activityIndex}/contractorResources/${contractorIndex}/hourly/data/${year}/hours`,
    value: hours
  });
  dispatch(
    setContractorCostForYear(
      activityIndex,
      contractorIndex,
      year,
      rate * +hours
    )
  );
};
