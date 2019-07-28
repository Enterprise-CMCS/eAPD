import {
    ARIA_QUEUE_ANNOUNCEMENT,
    ARIA_ANNOUNCE_CHANGE
} from '../actions/aria';

const initialState = {
    ariaQueuedAnnouncement: '',
    ariaRegionMessage: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ARIA_QUEUE_ANNOUNCEMENT:
            return { ariaQueuedAnnouncement: action.change };
        case ARIA_ANNOUNCE_CHANGE:
            return { ariaRegionMessage: action.message };
        default:
            return state;
    }
}

export const getAriaQueuedAnnouncement = (state) => state.aria.ariaQueuedAnnouncement;
export const getAriaAnnouncement = (state) => state.aria.ariaRegionMessage;

export default reducer;