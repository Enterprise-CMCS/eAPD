import { SAVE_APD_SUCCESS } from '../actions/apd';
import { EDIT_APD } from '../actions/editApd';

import reducer, { getHasChanges } from './patch';

describe('JSON patch reducer', () => {
  it('provides an initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('resets to the initial state when an APD is saved', () => {
    expect(reducer({}, { type: SAVE_APD_SUCCESS })).toEqual([]);
  });

  it('pushes a new edit to the list when an APD is edited', () => {
    expect(
      reducer([], { type: EDIT_APD, path: '/path/to/edit', value: 'new value' })
    ).toEqual([{ op: 'replace', path: '/path/to/edit', value: 'new value' }]);
  });

  it('updates an existing patch if the path was replaced previously', () => {
    expect(
      reducer(
        [
          { op: 'replace', path: '/path/to/edit', value: 'old value' },
          { op: 'replace', path: '/path/to/leave', value: 'leave' }
        ],
        { type: EDIT_APD, path: '/path/to/edit', value: 'new value' }
      )
    ).toEqual([
      { op: 'replace', path: '/path/to/edit', value: 'new value' },
      { op: 'replace', path: '/path/to/leave', value: 'leave' }
    ]);
  });

  it('adds a new patch if the path was replaced previously but has had a different op applied since then', () => {
    expect(
      reducer(
        [
          { op: 'replace', path: '/path/to/edit', value: 'old value' },
          { op: 'remove', path: '/path/to/edit' }
        ],
        { type: EDIT_APD, path: '/path/to/edit', value: 'new value' }
      )
    ).toEqual([
      { op: 'replace', path: '/path/to/edit', value: 'old value' },
      { op: 'remove', path: '/path/to/edit' },
      { op: 'replace', path: '/path/to/edit', value: 'new value' }
    ]);
  });
});

describe('JSON patch selector', () => {
  it('returns false if there are no pending patches', () => {
    expect(getHasChanges({ patch: [] })).toEqual(false);
  });

  it('returns true if there are pending patches', () => {
    expect(getHasChanges({ patch: [''] })).toEqual(true);
  });
});
