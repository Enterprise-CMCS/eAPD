import PropTypes from 'prop-types';
import React from 'react';

import { STANDARDS } from '../util';

const StandardsConditions = ({ aId }) => (
  <div>
    <p>Tell us how you’ll meet the Medicaid standards and conditions.</p>
    {STANDARDS.map(std => {
      const inputId = `a-${aId}-standards-${std.id}`;

      return (
        <div key={std.id}>
          <h3>{std.title}</h3>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto...
          </p>
          <div>
            <label htmlFor={inputId}>
              Describe how you’ll meet this condition
            </label>
            <textarea
              className="m0 textarea md-col-8"
              id={inputId}
              rows="3"
              spellCheck="true"
            />
          </div>
        </div>
      );
    })}
  </div>
);

StandardsConditions.propTypes = {
  aId: PropTypes.number.isRequired
};

export default StandardsConditions;
