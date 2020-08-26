import { TextField } from '@cmsgov/design-system';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ value, ...props }) => {
  return (
    <Fragment>
      <TextField
        {...props}
        fieldClassName="visibility--screen"
        multiline
        type="text"
        value={value}
      />
      <div className="visibility--print">
        {`${value}`.split('\n').map(v => (
          <span key={v}>
            {v}
            <br />
          </span>
        ))}
      </div>
    </Fragment>
  );
};

TextArea.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

TextArea.defaultProps = {
  value: ''
};

export default TextArea;
