export const ARIA_ANNOUNCE_CHANGE = 'ARIA_ANNOUNCE_CHANGE';

export const ariaAnnounceCreateApd = () => ({
  type: ARIA_ANNOUNCE_CHANGE,
  message:
    'You have successfully created an APD. Select continue to fill out the rest of the APD.'
});

export const ariaAnnounceFFPQuarterly =
  (activityId, year, q, name) => (dispatch, getState) => {
    dispatch({
      type: ARIA_ANNOUNCE_CHANGE,
      message: `${
        getState().budget.activities[activityId].quarterlyFFP.years[year][q][
          name
        ].dollars
      } dollars`
    });
  };

export const ariaAnnounceApdLoading = () => ({
  type: ARIA_ANNOUNCE_CHANGE,
  message: 'Your APD is loading.'
});

export const ariaAnnounceApdLoaded = () => ({
  type: ARIA_ANNOUNCE_CHANGE,
  message:
    'Your APD is loaded and ready to edit. Changes to this APD will be saved automatically.'
});

export const ariaAnnounceApdLoadingFailure = error => ({
  type: ARIA_ANNOUNCE_CHANGE,
  message: error
});
