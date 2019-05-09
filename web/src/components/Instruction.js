import PropTypes from 'prop-types';
import React from 'react';

import Md from './Md';
import { t } from '../i18n';

const Instruction = ({ args, reverse, source }) => {
  const heading = t([source, 'heading'], { defaultValue: false, ...args });
  const short = t([source, 'short'], { defaultValue: false, ...args });
  const detail = t([source, 'detail'], { defaultValue: false, ...args });
  const helpText = t([source, 'helpText'], { defaultValue: false, ...args });

  return (
    <div>
      {heading && <h3>{heading}</h3>}
      {(short || detail || helpText) && (
        <div className="visibility--screen">
          {reverse && detail && <Md content={detail} wrapper="p" />}
          {short && <p className="ds-u-font-weight--bold">{short}</p>}
          {!reverse && detail && <Md content={detail} wrapper="p" />}
          {helpText && (
            <Md
              content={helpText}
              wrapper="p"
              className="instruction-box"
            />
          )}
        </div>
      )}
    </div>
  );
};

Instruction.propTypes = {
  args: PropTypes.object,
  reverse: PropTypes.bool,
  source: PropTypes.string.isRequired
};

Instruction.defaultProps = {
  args: null,
  reverse: false
};

export default Instruction;
