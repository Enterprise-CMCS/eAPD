import { useState } from 'react';

export const useBoolState = initial => {
  const [value, setter] = useState(!!initial);

  const toggle = () => setter(prev => !prev);
  return [value, toggle];
};

export const useFormField = initial => {
  const [value, setter] = useState(initial);

  const set = e => {
    if (e && typeof e === 'object' && e.target) {
      setter(e.target.value);
    } else {
      setter(e);
    }
  };

  return [value, set];
};

export const useFormStatus = (error, working) => {
  const [hasFetched, setHasFetched] = useState(false);

  return {
    errorMsg: !working && hasFetched && error,
    success: !working && hasFetched && !error,
    hasFetched: () => {
      setHasFetched(true);
    }
  };
};
