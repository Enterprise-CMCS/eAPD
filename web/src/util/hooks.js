import { useMemo } from 'react';
import { STATES } from './states';
import { hasSupportState } from '@cms-eapd/common';

export function useAvailableStates(username) {
  return useMemo(() => {
    if (hasSupportState(username)) {
      return [...STATES, { id: 'na', name: 'New Apdland' }];
    } else {
      return [...STATES];
    }
  }, [username]);
}
