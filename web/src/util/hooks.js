import { useMemo } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { STATES } from './states';

export function useAvailableStates() {
  const { supportStateAvailable } = useFlags();

  return useMemo(() => {
    if (supportStateAvailable) {
      return [...STATES, { id: 'na', name: 'New Apdland' }];
    } else {
      return [...STATES];
    }
  }, [supportStateAvailable]);
}
