export const ARIA_ANNOUNCE_CHANGE = 'ARIA_ANNOUNCE_CHANGE';

export const ariaAnnounceFFPQuarterly =
  (aKey, year, q, name) => (dispatch, getState) => {
    dispatch({
      type: ARIA_ANNOUNCE_CHANGE,
      message: `${
        getState().budget.activities[aKey].quarterlyFFP[year][q][name].dollars
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
