import { Choice } from '@cmsgov/design-system';
import React, { useEffect, useRef } from 'react';

const ChoiceComponent = props => {
  const ref = useRef(null);

  useEffect(() => {
    const ariaRegion = ref.current.querySelector('[aria-live]');

    if (ariaRegion) {
      ariaRegion.removeAttribute('aria-live');
      ariaRegion.removeAttribute('aria-relevant');
      ariaRegion.removeAttribute('aria-atomic');
    }
  }, []);

  return (
    <div ref={ref}>
      <Choice {...props} />
    </div>
  );
};

export default ChoiceComponent;
