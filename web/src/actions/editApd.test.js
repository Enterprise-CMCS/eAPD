import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { UPDATE_BUDGET } from './apd';

import {
  ADD_APD_ITEM,
  EDIT_APD,
  REMOVE_APD_ITEM,
  addKeyPerson,
  removeKeyPerson,
  setKeyPersonCost,
  setKeyPersonEmail,
  setKeyPersonHasCosts,
  setKeyPersonName,
  setKeyPersonPercentTime,
  setKeyPersonRole,
  setMedicaidDirectorEmail,
  setMedicaidDirectorName,
  setMedicaidDirectorPhoneNumber,
  setMedicaidOfficeAddress1,
  setMedicaidOfficeAddress2,
  setMedicaidOfficeCity,
  setMedicaidOfficeState,
  setMedicaidOfficeZip,
  setPreviousActivitySummary,
  setPreviousActivityApprovedExpenseForHITandHIE,
  setPreviousActivityApprovedExpenseforMMIS50FFP,
  setPreviousActivityApprovedExpenseforMMIS75FFP,
  setPreviousActivityApprovedExpenseforMMIS90FFP,
  setPreviousActivityFederalActualExpenseForHITandHIE,
  setPreviousActivityFederalActualExpenseforMMIS50FFP,
  setPreviousActivityFederalActualExpenseforMMIS75FFP,
  setPreviousActivityFederalActualExpenseforMMIS90FFP
} from './editApd';

const mockStore = configureStore([thunk]);

describe('APD edit actions', () => {
  describe('for APD key personnel', () => {
    it('dispatchs an action for adding a key person', () => {
      const store = mockStore('add state');
      store.dispatch(addKeyPerson());

      expect(store.getActions()).toEqual([
        {
          type: ADD_APD_ITEM,
          path: '/keyPersonnel/-',
          state: 'add state'
        }
      ]);
    });

    it('dispatches an action to remove a key person if confirmed', () => {
      const store = mockStore('remove state');
      const global = { confirm: jest.fn().mockReturnValue(true) };

      store.dispatch(removeKeyPerson(17, { global }));

      expect(store.getActions()).toEqual([
        {
          type: REMOVE_APD_ITEM,
          path: '/keyPersonnel/17'
        },
        {
          type: UPDATE_BUDGET,
          state: 'remove state'
        }
      ]);
    });

    it('does not dispatch an action to remove a key person if denied', () => {
      const store = mockStore('remove state');
      const global = { confirm: jest.fn().mockReturnValue(false) };

      store.dispatch(removeKeyPerson(19, { global }));

      expect(store.getActions()).toEqual([]);
    });

    it('dispatches an action for setting a key person name', () => {
      expect(setKeyPersonName('person name', 1)).toEqual({
        type: EDIT_APD,
        path: '/keyPersonnel/1/name',
        value: 'person name'
      });
    });

    it('dispatches an action for setting a key person email', () => {
      expect(setKeyPersonEmail('person email', 3)).toEqual({
        type: EDIT_APD,
        path: '/keyPersonnel/3/email',
        value: 'person email'
      });
    });

    it('dispatches an action for setting a key person role', () => {
      expect(setKeyPersonRole('person role', 5)).toEqual({
        type: EDIT_APD,
        path: '/keyPersonnel/5/position',
        value: 'person role'
      });
    });

    it('dispatches an action for setting a key person percent time', () => {
      expect(setKeyPersonPercentTime('percent time', 7)).toEqual({
        type: EDIT_APD,
        path: '/keyPersonnel/7/percentTime',
        value: 'percent time'
      });
    });

    it('dispatches an action for setting whether a key person has costs', () => {
      const store = mockStore('state');
      store.dispatch(setKeyPersonHasCosts(true, 11));

      expect(store.getActions()).toEqual([
        {
          type: EDIT_APD,
          path: '/keyPersonnel/11/hasCosts',
          value: true
        },
        {
          type: UPDATE_BUDGET,
          state: 'state'
        }
      ]);
    });

    it('dispatches an action for setting a key person cost for a year', () => {
      const store = mockStore('another state');
      store.dispatch(setKeyPersonCost(3572, 13, 1973));

      expect(store.getActions()).toEqual([
        {
          type: EDIT_APD,
          path: '/keyPersonnel/13/costs/1973',
          value: 3572
        },
        {
          type: UPDATE_BUDGET,
          state: 'another state'
        }
      ]);
    });
  });

  describe('for Medicaid director and office', () => {
    it('dispatches an action for setting the Medicaid director email', () => {
      expect(setMedicaidDirectorEmail('email address')).toEqual({
        type: EDIT_APD,
        path: '/stateProfile/medicaidDirector/email',
        value: 'email address'
      });
    });

    it('dispatches an action for setting the Medicaid director name', () => {
      expect(setMedicaidDirectorName('name')).toEqual({
        type: EDIT_APD,
        path: '/stateProfile/medicaidDirector/name',
        value: 'name'
      });
    });

    it('dispatches an action for setting the Medicaid director phone number', () => {
      expect(setMedicaidDirectorPhoneNumber('phone number')).toEqual({
        type: EDIT_APD,
        path: '/stateProfile/medicaidDirector/phone',
        value: 'phone number'
      });
    });

    it('dispatches an action for setting the Medicaid office address line 1', () => {
      expect(setMedicaidOfficeAddress1('address 1')).toEqual({
        type: EDIT_APD,
        path: '/stateProfile/medicaidOffice/address1',
        value: 'address 1'
      });
    });

    it('dispatches an action for setting the Medicaid office address line 2', () => {
      expect(setMedicaidOfficeAddress2('address 2')).toEqual({
        type: EDIT_APD,
        path: '/stateProfile/medicaidOffice/address2',
        value: 'address 2'
      });
    });

    it('dispatches an action for setting the Medicaid office city', () => {
      expect(setMedicaidOfficeCity('city')).toEqual({
        type: EDIT_APD,
        path: '/stateProfile/medicaidOffice/city',
        value: 'city'
      });
    });

    it('dispatches an action for setting the Medicaid office state', () => {
      expect(setMedicaidOfficeState('state')).toEqual({
        type: EDIT_APD,
        path: '/stateProfile/medicaidOffice/state',
        value: 'state'
      });
    });

    it('dispatches an action for setting the Medicaid office zip code', () => {
      expect(setMedicaidOfficeZip('zip code')).toEqual({
        type: EDIT_APD,
        path: '/stateProfile/medicaidOffice/zip',
        value: 'zip code'
      });
    });
  });

  describe('for previous activities', () => {
    it('dispatches an action for setting the previous activity summary', () => {
      expect(setPreviousActivitySummary('summary')).toEqual({
        type: EDIT_APD,
        path: '/previousActivitySummary',
        value: 'summary'
      });
    });

    it('dispatches an action for setting the total approved expenses for HIT/HIE in a fiscal year', () => {
      expect(
        setPreviousActivityApprovedExpenseForHITandHIE('year', 'expense')
      ).toEqual({
        type: EDIT_APD,
        path: '/previousActivityExpenses/year/hithie/totalApproved',
        value: 'expense'
      });
    });

    it('dispatches an action for setting the total approved expenses for MMIS at 50% FFP in a fiscal year', () => {
      expect(
        setPreviousActivityApprovedExpenseforMMIS50FFP('year', 'expense')
      ).toEqual({
        type: EDIT_APD,
        path: '/previousActivityExpenses/year/mmis/50/totalApproved',
        value: 'expense'
      });
    });

    it('dispatches an action for setting the total approved expenses for MMIS at 75% FFP in a fiscal year', () => {
      expect(
        setPreviousActivityApprovedExpenseforMMIS75FFP('year', 'expense')
      ).toEqual({
        type: EDIT_APD,
        path: '/previousActivityExpenses/year/mmis/75/totalApproved',
        value: 'expense'
      });
    });

    it('dispatches an action for setting the total approved expenses for MMIS at 90% FFP in a fiscal year', () => {
      expect(
        setPreviousActivityApprovedExpenseforMMIS90FFP('year', 'expense')
      ).toEqual({
        type: EDIT_APD,
        path: '/previousActivityExpenses/year/mmis/90/totalApproved',
        value: 'expense'
      });
    });

    it('dispatches an action for setting the actual federal expenses for HIT/HIE in a fiscal year', () => {
      expect(
        setPreviousActivityFederalActualExpenseForHITandHIE('year', 'expense')
      ).toEqual({
        type: EDIT_APD,
        path: '/previousActivityExpenses/year/hithie/federalActual',
        value: 'expense'
      });
    });

    it('dispatches an action for setting the actual federal expenses for MMIS at 50% in a fiscal year', () => {
      expect(
        setPreviousActivityFederalActualExpenseforMMIS50FFP('year', 'expense')
      ).toEqual({
        type: EDIT_APD,
        path: '/previousActivityExpenses/year/mmis/50/federalActual',
        value: 'expense'
      });
    });

    it('dispatches an action for setting the actual federal expenses for MMIS at 75% in a fiscal year', () => {
      expect(
        setPreviousActivityFederalActualExpenseforMMIS75FFP('year', 'expense')
      ).toEqual({
        type: EDIT_APD,
        path: '/previousActivityExpenses/year/mmis/75/federalActual',
        value: 'expense'
      });
    });

    it('dispatches an action for setting the actual federal expenses for MMIS at 90% in a fiscal year', () => {
      expect(
        setPreviousActivityFederalActualExpenseforMMIS90FFP('year', 'expense')
      ).toEqual({
        type: EDIT_APD,
        path: '/previousActivityExpenses/year/mmis/90/federalActual',
        value: 'expense'
      });
    });
  });
});
