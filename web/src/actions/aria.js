export const ARIA_QUEUE_ANNOUNCEMENT = 'ARIA_QUEUE_ANNOUNCEMENT';
export const ARIA_ANNOUNCE_CHANGE = 'ARIA_ANNOUNCE_CHANGE';

export const ariaQueueAnnouncement = change => dispatch => {
    dispatch({
        type: ARIA_QUEUE_ANNOUNCEMENT,
        change
    });
}

export const ariaAnnounce = message => dispatch => {
    dispatch({
        type: ARIA_ANNOUNCE_CHANGE,
        message
    });
}