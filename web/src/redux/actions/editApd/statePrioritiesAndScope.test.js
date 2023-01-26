import { EDIT_APD } from './symbols';
import {
  setProgramPriorities,
  setEnterpriseSystemIntro,
  setScopeOfAPD
} from './statePrioritiesAndScope';

describe('APD edit actions for MMIS APD program priorities', () => {
  it('dispatches an action for setting program priorities', () => {
    expect(setProgramPriorities('priorities')).toEqual({
      type: EDIT_APD,
      path: '/statePrioritiesAndScope/programPriorities',
      value: 'priorities'
    });
  });
});

describe('APD edit actions for MMIS APD enterprise system intro', () => {
  it('dispatches an action for setting mes intro', () => {
    expect(setEnterpriseSystemIntro('intro')).toEqual({
      type: EDIT_APD,
      path: '/statePrioritiesAndScope/enterpriseSystemIntro',
      value: 'intro'
    });
  });
});

describe('APD edit actions for MMIS APD scope', () => {
  it('dispatches an action for setting apd scope', () => {
    expect(setScopeOfAPD('scope')).toEqual({
      type: EDIT_APD,
      path: '/statePrioritiesAndScope/scopeOfAPD',
      value: 'scope'
    });
  });
});
