import { selectHasChanges, selectPatches } from './patch.selectors';

describe('JSON patch selector', () => {
  it('returns false if there are no pending patches', () => {
    expect(selectHasChanges({ patch: [] })).toEqual(false);
  });

  it('returns true if there are pending patches', () => {
    expect(selectHasChanges({ patch: [''] })).toEqual(true);
  });

  it('returns the full patch set', () => {
    expect(selectPatches({ patch: 'some patches here' })).toEqual(
      'some patches here'
    );
  });
});
