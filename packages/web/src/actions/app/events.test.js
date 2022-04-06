import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { APD_EVENTS } from '../../constants';
import axios from '../../util/api';

import { saveApdEvent } from './events';

let spy;

const mockStore = configureStore([thunk]);
const apdID = '12345';
const state = {
  apd: {
    data: { id: apdID }
  }
};
const store = mockStore(state);

describe('APD event actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('log an APD event', () => {
    it('on success, adds the new APD event to the database', async () => {
      spy = jest
        .spyOn(axios, 'post')
        .mockImplementation(() =>
          Promise.resolve({ status: 200, data: { success: true } })
        );

      await store.dispatch(saveApdEvent(APD_EVENTS.EXPORT));
      expect(spy).toHaveBeenCalledWith(`/apds/${apdID}/events`, {
        eventType: APD_EVENTS.EXPORT,
        metadata: null
      });
    });

    it('on success, adds the new APD event with metadata to the database', async () => {
      spy = jest
        .spyOn(axios, 'post')
        .mockImplementation(() =>
          Promise.resolve({ status: 200, data: { success: true } })
        );

      await store.dispatch(
        saveApdEvent(APD_EVENTS.EXPORT, { something: 'metadata' })
      );
      expect(spy).toHaveBeenCalledWith(`/apds/${apdID}/events`, {
        eventType: APD_EVENTS.EXPORT,
        metadata: { something: 'metadata' }
      });
    });

    it('tests undefined axios', async () => {
      spy = jest
        .spyOn(axios, 'post')
        .mockImplementation(() => Promise.resolve({}));

      const response = await store.dispatch(saveApdEvent(APD_EVENTS.EXPORT));
      expect(spy).toHaveBeenCalledWith(`/apds/${apdID}/events`, {
        eventType: APD_EVENTS.EXPORT,
        metadata: null
      });
      expect(response).toBeNull();
    });
  });
});
