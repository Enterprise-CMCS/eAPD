import PropTypes from 'prop-types';
import React from 'react';

import Md from '../components/Md';
import { t } from '../i18n';

const HelpText = ({ children }) => (
  <Md content={children} wrapper="p" className="mb2 text-s alert alert-info" />
);

const Instruction = ({ reverse, source }) => {
  const heading = t([source, 'heading'], { defaultValue: false });
  const short = t([source, 'short'], { defaultValue: false });
  const detail = t([source, 'detail'], { defaultValue: false });
  const helpText = t([source, 'helpText'], { defaultValue: false });

  console.log(t('storybook.instruction.heading'));

  return (
    <div>
      {heading && <h3>{heading}</h3>}
      {reverse && detail && <p>{detail}</p>}
      {short && <p className="strong">{short}</p>}
      {!reverse && detail && <p>{detail}</p>}
      {helpText && <HelpText>{helpText}</HelpText>}
    </div>
  );
};

Instruction.propTypes = {
  reverse: PropTypes.bool,
  source: PropTypes.string.isRequired
};

Instruction.defaultProps = {
  reverse: false
};

export default Instruction;
