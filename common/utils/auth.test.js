import { isSysAdmin, hasSupportState } from './auth.js';

describe('auth tests', () => {
  describe('test isSysAdmin', () => {
    it('should return true if the users name is sysadmin', () => {
      expect(isSysAdmin('sysadmin')).toBe(true);
    });

    it('should return false if the users name is not sysadmin', () => {
      expect(isSysAdmin('someone')).toBe(false);
    });

    it('should return false if the username is an empty string', () => {
      expect(isSysAdmin('')).toBe(false);
    });

    it('should return false if the username is null', () => {
      expect(isSysAdmin(null)).toBe(false);
    });

    it('should return false if the username is undefined', () => {
      expect(isSysAdmin()).toBe(false);
    });
  });

  describe('test hasSupportState', () => {
    it('should return true if the users name is in the list', () => {
      expect(hasSupportState('statestaff')).toBe(true);
    });

    it('should return false if the users name is not in the list', () => {
      expect(hasSupportState('betauser')).toBe(false);
    });

    it('should return false if the username is an empty string', () => {
      expect(hasSupportState('')).toBe(false);
    });

    it('should return false if the username is null', () => {
      expect(hasSupportState(null)).toBe(false);
    });

    it('should return false if the username is undefined', () => {
      expect(hasSupportState()).toBe(false);
    });
  });
});
