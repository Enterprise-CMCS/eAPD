import { ARIA_ANNOUNCE_CHANGE } from '../actions/aria';
import aria, { getAriaAnnouncement } from './aria';

const initialState = {
  ariaRegionMessage: ''
};

describe('ARIA reducer', () => {
  it('handles initial empty state', () => {
    expect(aria(undefined, {})).toEqual(initialState);
  });

  it('handles getting announcements', () => {
    expect(
      aria(initialState, {
        type: ARIA_ANNOUNCE_CHANGE,
        message: 'hello hello'
      })
    ).toEqual({ ariaRegionMessage: 'hello hello' });
  });

  it('gets the message', () => {
    const state = {
      aria: {
        ariaRegionMessage: 'good morning Vietnam'
      }
    };
    expect(getAriaAnnouncement(state)).toEqual(state.aria.ariaRegionMessage);
  });
});
