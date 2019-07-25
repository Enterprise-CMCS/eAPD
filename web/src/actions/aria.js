export const ARIA_ANNOUNCE_CHANGE = 'ARIA_ANNOUNCE_CHANGE';

export const ariaAnnounce = message => dispatch => {
    dispatch({
        type: ARIA_ANNOUNCE_CHANGE,
        message
    });
}