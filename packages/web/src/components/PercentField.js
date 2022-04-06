import React, { useEffect, useRef } from 'react';
import NumberField from './NumberField';

const PercentField = ({ ...props }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref && ref.current) {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'input-holder__percent');
      ref.current.parentNode.appendChild(wrapper);
      wrapper.appendChild(ref.current);
    }
  }, []);

  return <NumberField {...props} fieldRef={ref} />;
};

export default PercentField;
