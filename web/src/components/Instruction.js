import PropTypes from 'prop-types';
import React from 'react';

import Md from '../components/Md';
import { t } from '../i18n';

const HelpText = ({ children }) => (
  <Md content={children} wrapper="p" className="mb2 text-s alert alert-info" />
);
HelpText.propTypes = {
  children: PropTypes.node.isRequired
};

const Instruction = ({ args, reverse, source }) => {
  const heading = t([source, 'heading'], { defaultValue: false, ...args });
  const short = t([source, 'short'], { defaultValue: false, ...args });
  const detail = t([source, 'detail'], { defaultValue: false, ...args });
  const helpText = t([source, 'helpText'], { defaultValue: false, ...args });

  return (
    <div>
      {heading && <h3>{heading}</h3>}
      {reverse && detail && <Md content={detail} wrapper="p" />}
      {short && <p className="strong">{short}</p>}
      {!reverse && detail && <Md content={detail} wrapper="p" />}
      {helpText && <HelpText>{helpText}</HelpText>}
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
