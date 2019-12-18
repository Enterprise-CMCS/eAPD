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
      it(`the ${type.toString()} action type`, async () => {
        const save = jest.fn().mockReturnValue({ type: 'save apd' });
        const store = mockStore({ patch: [1, 2, 3] });
        const next = jest.fn().mockReturnValue('bob');

        const result = saveMiddleware(store, { save })(next)({ type });

        expect(result).toEqual('bob');
        expect(store.getActions()).toEqual([{ type: 'save apd' }]);
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
