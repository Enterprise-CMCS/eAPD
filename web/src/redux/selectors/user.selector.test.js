import {
  getIsFedAdmin,
  getIsSysAdmin,
  getCanUserViewStateAdmin,
  getCanUserEditAPD
} from './user.selector';

describe('user state selectors', () => {
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

  describe('getCanUserViewStateAdmin selector', () => {
    it('returns true if the user has the view-affiliations activity', () => {
      expect(
        getCanUserViewStateAdmin({
          user: { data: { activities: ['view-affiliations'] } }
        })
      );
    });

    it('returns false if the user does not have the view-affiliations activity', () => {
      expect(
        getCanUserViewStateAdmin({
          user: { data: { activities: ['not view affiliations'] } }
        })
      );
    });
  });

  describe('getCanUserEditAPD selector', () => {
    it('returns true if the user has the edit-document activity', () => {
      expect(
        getCanUserEditAPD({
          user: { data: { activities: ['edit-document'] } }
        })
      );
    });

    it('returns false if the user does not have the edit-document activity', () => {
      expect(
        getCanUserEditAPD({
          user: { data: { activities: ['not edit document'] } }
        })
      );
    });
  });
});
