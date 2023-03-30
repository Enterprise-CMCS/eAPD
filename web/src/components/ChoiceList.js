import { ChoiceList } from '@cmsgov/design-system';
import React, { useEffect, useRef } from 'react';

const ChoiceListComponent = props => {
  const ref = useRef(null);

  useEffect(() => {
    const ariaRegions = ref.current.querySelectorAll('[aria-live]');

    ariaRegions.forEach(region => {
      region.removeAttribute('aria-live');
      region.removeAttribute('aria-relevant');
      region.removeAttribute('aria-atomic');
    });
  }, []);

  return (
    <div ref={ref}>
      <ChoiceList {...props} />
    </div>
  );
};

export default ChoiceListComponent;
