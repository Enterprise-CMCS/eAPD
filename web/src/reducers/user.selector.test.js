import { getIsAdmin, getIsFedAdmin, getIsSysAdmin } from './user.selector';

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

  describe('getIsFedAdmin selector', () => {
    it('returns true if the user has role eAPD Federal Admin', () => {
      expect(
        getIsFedAdmin({
          user: { data: { role: 'eAPD Federal Admin' } }
        })
      ).toEqual(true);
    });

    it('returns false if the user does not have role eAPD Federal Admin', () => {
      expect(
        getIsFedAdmin({
          user: { data: { role: 'not a federal admin' } }
        })
      ).toEqual(false);
    });
  });

  describe('getIsSysAdmin selector', () => {
    it('returns true if the user has role eAPD System Admin', () => {
      expect(
        getIsSysAdmin({
          user: { data: { role: 'eAPD System Admin' } }
        })
      ).toEqual(true);
    });

    it('returns false if the user does not have role eAPD System Admin', () => {
      expect(
        getIsSysAdmin({
          user: { data: { role: 'not a sysadmin' } }
        })
      ).toEqual(false);
    });
  });
});
