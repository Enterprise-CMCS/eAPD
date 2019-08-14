import { getIsAdmin } from './user.selector';

describe('user state selectors', () => {
  describe('getIsAdmin selector', () => {
    it('returns true if the user is an admin', () => {
      expect(
        getIsAdmin({
          user: { data: { role: 'admin' } }
        })
      ).toEqual(true);
    });

    it('returns false if the user is not an admin', () => {
      expect(
        getIsAdmin({
          user: { data: { role: 'not an admin' } }
        })
      ).toEqual(false);
    });
  });
});
