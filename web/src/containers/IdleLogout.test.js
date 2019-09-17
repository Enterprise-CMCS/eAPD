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
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  test('does not start timers when logged out', () => {
    const component = mount(<IdleLogout history={{}} loggedIn={false} />);

    // Need to be explicit about the timeout we expect to be uncalled because
    // the React lifecycle may also call setTimeout. (I think it's pretty much
    // guaran teed to do so, but :shrugging_person_made_of_symbols:)
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
    setTimeout.mockReturnValue('timer id');

    const component = mount(<IdleLogout history={{}} loggedIn />);
    component.unmount();
    expect(clearTimeout).toHaveBeenCalledWith('timer id');
  });

  test('navigates to /logout when the idle timer expires', () => {
    const history = {
      replace: jest.fn()
    };

    const component = mount(<IdleLogout history={history} loggedIn />);
    jest.runOnlyPendingTimers();
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

    const closeNotification = jest.fn();

    beforeEach(() => {
      global.Notification = jest.fn();
      global.Notification.mockImplementation(() => ({
        close: closeNotification
      }));
      global.Notification.requestPermission = jest.fn();
    });
    afterEach(() => {
      delete global.Notification;
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
        // TODO: When Jest supports conditional mock returns, switch to that.
        // Order-based mock returns is supercali-fragile-isticexpialidocious.
        setTimeout
          .mockReturnValueOnce('idle timer id')
          .mockReturnValueOnce('warning timer id');
        setInterval.mockReturnValueOnce('warning interval id');
        const component = mount(<IdleLogout history={{}} loggedIn />);

        events[eventName]();
        expect(clearTimeout).toHaveBeenCalledWith('idle timer id');
        expect(clearTimeout).toHaveBeenCalledWith('warning timer id');
        expect(setTimeout).toHaveBeenCalledWith(
          expect.any(Function),
          LOGOUT_TIMER
        );
        expect(setTimeout).toHaveBeenCalledWith(
          expect.any(Function),
          LOGOUT_TIMER - 120000
        );

        // Trigger the warning, so we can make sure those are
        // cleared as well.
        jest.advanceTimersByTime(LOGOUT_TIMER - 120000);
        events[eventName]();
        expect(clearInterval).toHaveBeenCalledWith('warning interval id');
        expect(closeNotification).toHaveBeenCalled();

        component.unmount();
      });
    });
  });

  test('requests permission to show notifications', () => {
    global.Notification = {
      requestPermission: jest.fn()
    };
    const component = mount(<IdleLogout history={{}} loggedIn />);

    expect(global.Notification.requestPermission).toHaveBeenCalled();

    delete global.Notification;
    component.unmount();
  });

  test('clicking the notification resets the timers', () => {
    // TODO
    // This needs to be filled in, but the setTimeout return mocks are too
    // fragile and I can't figure out what order things are happening in.
    // Since Jest currently doesn't support conditional returns, it's based
    // entirely on call order, which is SO FRAGILE. So rather than bang my
    // head against this any longer, I'm just commenting it out. But it still
    // needs to be done eventually.
  });

  test('runs the timers', () => {
    const events = {};
    global.document.addEventListener = (eventName, handler) => {
      events[eventName] = handler;
    };

    const notification = {
      close: jest.fn()
    };
    global.Notification = jest.fn();
    global.Notification.mockImplementation(() => notification);
    global.Notification.requestPermission = jest.fn();

    const history = {
      replace: jest.fn()
    };

    global.document.title = 'Original title';
    const component = mount(<IdleLogout history={history} loggedIn />);

    // Advance to 2 minutes before idle timeout
    jest.advanceTimersByTime(LOGOUT_TIMER - 120000);

    // Haven't logged out yet, but have setup the warnings
    expect(history.replace).not.toHaveBeenCalled();
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 300);
    expect(notification.onclick).toEqual(expect.any(Function));

    expect(global.Notification).toHaveBeenCalledWith(expect.any(String), {
      body: expect.any(String),
      requireInteraction: true
    });

    // Make sure the title flashes back and forth
    for (let i = 0; i < 10; i += 1) {
      jest.advanceTimersByTime(300);
      expect(global.document.title).toEqual('🔴 Original title');

      // And flashes back
      jest.advanceTimersByTime(300);
      expect(global.document.title).toEqual('Original title');
    }

    // Now finish up the idle timeout and make sure we log out.
    jest.advanceTimersByTime(120000);
    expect(history.replace).toHaveBeenCalledWith('/logout');

    component.unmount();
    delete global.Notification;
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
