import { mount } from 'enzyme';
import React from 'react';

// The IdleLogout module reads this env var when it's loaded, so set it
// before loading the module. Also conveniently compute the number of
// milliseconds for the number of minutes. Pick a weird value so it's
// unlikely it'll collide with any timers created by React. The timers are
// mocked so it won't actually take this long to run any of the tests.
process.env.IDLE_LOGOUT_TIME_MINUTES = 3714;
const LOGOUT_TIMER = process.env.IDLE_LOGOUT_TIME_MINUTES * 60 * 1000;

const { plain: IdleLogout, mapStateToProps } = require('./IdleLogout');

describe('IdleLogout component', () => {
  beforeEach(() => {
    // Need to do this before each test in order to reset the mock state
    jest.useFakeTimers();
  });

  test('does not start timers when logged out', () => {
    const component = mount(<IdleLogout history={{}} loggedIn={false} />);

    // Need to be explicit about the timeout we expect to be uncalled because
    // the React lifecycle may also call setTimeout. (I think it's pretty much
    // guaranteed to do so, but :shrugging_person_made_of_symbols:)
    expect(setTimeout).not.toHaveBeenCalledWith(
      expect.any(Function),
      LOGOUT_TIMER
    );

    // Because this component interacts with global state, we need to be sure
    // to unmount each one when we're done testing it. Otherwise each instance
    // we create could be triggered by changes intended for other tests and
    // we would lose isolation.
    component.unmount();
  });

  test('starts the initial timer when logged in', () => {
    const component = mount(<IdleLogout history={{}} loggedIn />);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), LOGOUT_TIMER);
    component.unmount();
  });

  test('clears the timer when it unmounts', () => {
    const component = mount(<IdleLogout history={{}} loggedIn />);
    component.unmount();
    expect(clearTimeout).toHaveBeenCalled();
  });

  test('navigates to /logout when the idle timer expires', () => {
    const history = {
      replace: jest.fn()
    };

    const component = mount(<IdleLogout history={history} loggedIn />);
    jest.advanceTimersByTime(LOGOUT_TIMER);
    expect(history.replace).toHaveBeenCalledWith('/logout');
    component.unmount();
  });

  describe('resets the timer on user interaction events', () => {
    // We need to be able to call these event handlers, but since they're
    // registered on the global scope, we can't get them directly from the
    // component. So we have to override global and cache off the event info.
    const events = {};
    global.document.addEventListener = (eventName, handler) => {
      events[eventName] = handler;
    };

    const component = mount(<IdleLogout history={{}} loggedIn />);

    afterAll(() => {
      component.unmount();
    });

    [
      'click',
      'keydown',
      'keypress',
      'load',
      'mousemove',
      'mousedown',
      'touchstart',
      'scroll'
    ].forEach(eventName => {
      it(`resets on ${eventName} events`, () => {
        events[eventName]();
        expect(clearTimeout).toHaveBeenCalled();
        expect(setTimeout).toHaveBeenCalledWith(
          expect.any(Function),
          LOGOUT_TIMER
        );
      });
    });
  });

  test('runs the timers, resets on events, does not logout on initial timer, but does on extension', () => {
    const events = {};
    global.document.addEventListener = (eventName, handler) => {
      events[eventName] = handler;
    };

    const history = {
      replace: jest.fn()
    };

    const component = mount(<IdleLogout history={history} loggedIn />);

    // Not called yet
    jest.advanceTimersByTime(LOGOUT_TIMER - 1);
    expect(history.replace).not.toHaveBeenCalled();

    // Timers should reset; advancing the timer by the remaining time should
    // not trigger logout. (Advance by a little extra, just to be safe.)
    events.click();
    jest.advanceTimersByTime(10);
    expect(history.replace).not.toHaveBeenCalled();

    // New timers should trigger when we advance the timer by the timeout again
    jest.advanceTimersByTime(LOGOUT_TIMER);
    expect(history.replace).toHaveBeenCalled();

    component.unmount();
  });

  test('maps state to props', () => {
    const state = {
      auth: {
        authenticated: 'some value'
      }
    };

    expect(mapStateToProps(state)).toEqual({
      loggedIn: 'some value'
    });
  });
});
