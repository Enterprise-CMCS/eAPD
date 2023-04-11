import { useEffect, useState } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { STATES } from './states';

export function useAvailableStates() {
  const [availableStates, setAvailableStates] = useState([...STATES]);
  const { supportStateAvailable } = useFlags();

  useEffect(() => {
    if (supportStateAvailable) {
      setAvailableStates([...STATES, { id: 'na', name: 'New Apdland' }]);
    } else {
      setAvailableStates([...STATES]);
    }
  }, [supportStateAvailable]);

  return availableStates;
}
