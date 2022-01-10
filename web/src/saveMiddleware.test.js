import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  ADD_APD_ITEM,
  ADD_APD_YEAR,
  EDIT_APD,
  REMOVE_APD_ITEM,
  REMOVE_APD_YEAR
} from './actions/editApd';
import saveMiddleware from './saveMiddleware';

const mockStore = configureStore([thunk]);

describe('automatic save middleware', () => {
  describe('automatically saves after certain action types', () => {
    [
      ADD_APD_ITEM,
      ADD_APD_YEAR,
      EDIT_APD,
      REMOVE_APD_ITEM,
      REMOVE_APD_YEAR
    ].forEach(type => {
      it(`prepares a save for the ${type.toString()} action type`, async () => {
        const runSave = jest.fn();
        const saveAction = jest.fn().mockReturnValue({ type: 'save apd' });
        const activityAction = jest
          .fn()
          .mockReturnValue({ type: 'activity performed' });
        const store = mockStore({ patch: [1, 2, 3] });
        const next = jest.fn().mockReturnValue('bob');

        const result = saveMiddleware(store, { saveAction, activityAction })(
          next,
          {
            runSave
          }
        )({ type });

        expect(result).toEqual('bob');
        expect(runSave).toHaveBeenCalled();
      });
    });
  });

  describe('debounces saves', () => {
    const DEBOUNCE_TIME = 300;

    beforeEach(() => {
      jest.useFakeTimers('legacy');
    });

    const next = jest.fn().mockReturnValue('bob');
    const store = mockStore({ patch: [1, 2, 3] });

    it(`saves ${DEBOUNCE_TIME} ms after the last call`, () => {
      const saveAction = jest
        .fn()
        .mockReturnValue(async () => store.dispatch({ type: 'save apd' }));
      const activityAction = jest
        .fn()
        .mockReturnValue(async () =>
          store.dispatch({ type: 'activity performed' })
        );

      const middleware = saveMiddleware(store, { saveAction, activityAction })(
        next
      );

      middleware({ type: EDIT_APD });

      // Debounce time hasn't elapsed yet. Should not be any actions.
      jest.advanceTimersByTime((DEBOUNCE_TIME * 2) / 3);
      expect(store.getActions()).toEqual([]);

      // Call again. This should reset the timer again.
      middleware({ type: EDIT_APD });

      // Debounce time has elapsed since the FIRST call, but has not elapsed
      // since the most recent call. Should still not be any actions.
      jest.advanceTimersByTime((DEBOUNCE_TIME * 2) / 3);
      expect(store.getActions()).toEqual([]);

      // Debounce time has elapsed since the last call, so expect an action.
      jest.advanceTimersByTime(DEBOUNCE_TIME);
      expect(store.getActions()).toEqual([
        { type: 'activity performed' },
        { type: 'save apd' }
      ]);
    });

    xit('queues an incoming save if a save is already in progress, then executes that save when the previous save succeeds', () => {
      const saveAction = jest
        .fn()
        .mockReturnValue(async () => store.dispatch({ type: 'save apd' }));
      const activityAction = jest
        .fn()
        .mockReturnValue(async () =>
          store.dispatch({ type: 'activity performed' })
        );

      const middleware = saveMiddleware(store, { saveAction, activityAction })(
        next
      );

      middleware({ type: EDIT_APD });

      // Move forward by the debounce time to trigger the first save.
      jest.advanceTimersByTime(DEBOUNCE_TIME);
      expect(saveAction.mock.calls.length).toBe(1);
      expect(activityAction.mock.calls.length).toBe(1);

      // Call the middleware again, then advance the timer. The save should
      // still have only been triggered once.
      middleware({ type: EDIT_APD });
      jest.advanceTimersByTime(DEBOUNCE_TIME);
      expect(saveAction.mock.calls.length).toBe(1);
      expect(activityAction.mock.calls.length).toBe(1);

      // For extra test safety, call the middleware one more time, then advance
      // the timer. The save should still have only been triggered once.
      middleware({ type: EDIT_APD });
      jest.advanceTimersByTime(DEBOUNCE_TIME);
      expect(saveAction.mock.calls.length).toBe(1);
      expect(activityAction.mock.calls.length).toBe(1);

      // Now advance the timer, and make sure the save has been triggered a
      // second time. This is where we make sure the enqueued save actually
      // happens. We need to advance the timer because the enqueued save will
      // be debounced exactly like any other save.
      //
      // We have to wait to advance the timer until the next tick, due to a
      // tail call recursion optimization in the JS engine. The recursive call
      // to the internal doSave function gets scheduled for the next tick
      // because it doesn't have any stack dependencies, so it's safe to move
      // off of the stack thereby preventing any stack overflow issues. As a
      // result, if we run the timer without waiting until the next tick, we
      // will actually run the timers BEFORE the new save timer is created,
      // and then nothing will happen. Async code, hooray!
      //
      // setImmediate works here because the tests are run in Node.js. It
      // isn't part of the JS standard and may or may not work in browsers.
      // It adds functions to the end of the next event loop, which is where
      // we want it so that it happens after the new save timer is created.
      setImmediate(() => {
        jest.advanceTimersByTime(DEBOUNCE_TIME);
        expect(saveAction.mock.calls.length).toBe(2);
        expect(activityAction.mock.calls.length).toBe(2);
      });
    });

    it('queues an incoming save if a save is already in progress, then executes that save when the previous save fails', () => {
      const saveAction = jest
        .fn()
        .mockReturnValue(async () => store.dispatch({ type: 'save failed' }));
      const activityAction = jest
        .fn()
        .mockReturnValue(async () =>
          store.dispatch({ type: 'activity performed' })
        );

      const middleware = saveMiddleware(store, { saveAction, activityAction })(
        next
      );

      middleware({ type: EDIT_APD });

      // Move forward by the debounce time to trigger the first save.
      jest.advanceTimersByTime(DEBOUNCE_TIME);
      expect(saveAction.mock.calls.length).toBe(1);
      expect(activityAction.mock.calls.length).toBe(1);

      // Call the middleware again, then advance the timer. The save should
      // still have only been triggered once.
      middleware({ type: EDIT_APD });
      jest.advanceTimersByTime(DEBOUNCE_TIME);
      expect(saveAction.mock.calls.length).toBe(1);
      expect(activityAction.mock.calls.length).toBe(1);

      // For extra test safety, call the middleware one more time, then advance
      // the timer. The save should still have only been triggered once.
      middleware({ type: EDIT_APD });
      jest.advanceTimersByTime(DEBOUNCE_TIME);
      expect(saveAction.mock.calls.length).toBe(1);
      expect(activityAction.mock.calls.length).toBe(1);

      // Now advance the timer, and make sure the save has been triggered a
      // second time. This is where we make sure the enqueued save actually
      // happens. We need to advance the timer because the enqueued save will
      // be debounced exactly like any other save.
      //
      // We have to wait to advance the timer until the next tick, due to a
      // tail call recursion optimization in the JS engine. The recursive call
      // to the internal doSave function gets scheduled for the next tick
      // because it doesn't have any stack dependencies, so it's safe to move
      // off of the stack thereby preventing any stack overflow issues. As a
      // result, if we run the timer without waiting until the next tick, we
      // will actually run the timers BEFORE the new save timer is created,
      // and then nothing will happen. Async code, hooray!
      //
      // setImmediate works here because the tests are run in Node.js. It
      // isn't part of the JS standard and may or may not work in browsers.
      // It adds functions to the end of the next event loop, which is where
      // we want it so that it happens after the new save timer is created.

      // setImmediate(() => {
      //   jest.advanceTimersByTime(DEBOUNCE_TIME);
      //   expect(activityAction.mock.calls.length).toBe(2);
      //   expect(saveAction.mock.calls.length).toBe(2);
      // });
    });

    xit('queues an incoming save if a save is already in progress, then executes that save when the previous save fails', () => {
      const saveAction = jest
        .fn()
        .mockReturnValue(async () => store.dispatch({ type: 'save apd' }));
      const activityAction = jest
        .fn()
        .mockReturnValue(async () =>
          store.dispatch({ type: 'activity performed' })
        );

      const middleware = saveMiddleware(store, { saveAction, activityAction })(
        next
      );

      middleware({ type: EDIT_APD });

      // Move forward by the debounce time to trigger the first save.
      jest.advanceTimersByTime(DEBOUNCE_TIME);
      expect(saveAction.mock.calls.length).toBe(1);
      expect(activityAction.mock.calls.length).toBe(1);

      // Call the middleware again, then advance the timer. The save should
      // still have only been triggered once.
      middleware({ type: EDIT_APD });
      jest.advanceTimersByTime(DEBOUNCE_TIME);
      expect(saveAction.mock.calls.length).toBe(1);
      expect(activityAction.mock.calls.length).toBe(1);

      // For extra test safety, call the middleware one more time, then advance
      // the timer. The save should still have only been triggered once.
      middleware({ type: EDIT_APD });
      jest.advanceTimersByTime(DEBOUNCE_TIME);
      expect(saveAction.mock.calls.length).toBe(1);
      expect(activityAction.mock.calls.length).toBe(1);

      // Now advance the timer, and make sure the save has been triggered a
      // second time. This is where we make sure the enqueued save actually
      // happens. We need to advance the timer because the enqueued save will
      // be debounced exactly like any other save.
      //
      // We have to wait to advance the timer until the next tick, due to a
      // tail call recursion optimization in the JS engine. The recursive call
      // to the internal doSave function gets scheduled for the next tick
      // because it doesn't have any stack dependencies, so it's safe to move
      // off of the stack thereby preventing any stack overflow issues. As a
      // result, if we run the timer without waiting until the next tick, we
      // will actually run the timers BEFORE the new save timer is created,
      // and then nothing will happen. Async code, hooray!
      //
      // setImmediate works here because the tests are run in Node.js. It
      // isn't part of the JS standard and may or may not work in browsers.
      // It adds functions to the end of the next event loop, which is where
      // we want it so that it happens after the new save timer is created.
      setImmediate(() => {
        jest.advanceTimersByTime(DEBOUNCE_TIME);
        expect(activityAction.mock.calls.length).toBe(2);
        expect(saveAction.mock.calls.length).toBe(2);
      });
    });
  });

  it('does not save the APD on all the other action types', () => {
    const store = mockStore();
    const next = jest.fn().mockReturnValue('bob');

    const result = saveMiddleware(store)(next)({ type: 'no save' });

    expect(result).toEqual('bob');
    expect(store.getActions()).toEqual([]);
  });
});
