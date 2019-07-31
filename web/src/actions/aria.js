export const ARIA_ANNOUNCE_CHANGE = 'ARIA_ANNOUNCE_CHANGE';

export const ariaAnnounceFFPQuarterly = (aKey, year, q, name) => (dispatch, getState) => {
    dispatch({
        type: ARIA_ANNOUNCE_CHANGE,
        message: getState().budget.activities[aKey].quarterlyFFP[year][q][name].dollars
    });
}