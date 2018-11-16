import PropTypes from 'prop-types';
import React from 'react';

import Md from '../components/Md';
import { t } from '../i18n';

const md = (content, props) => <Md content={content} wrapper="p" {...props} />;

const Instruction = ({ reverse, source }) => {
  const heading = t([source, 'heading'], { defaultValue: false });
  const short = t([source, 'short'], { defaultValue: false });
  const detail = t([source, 'detail'], { defaultValue: false });
  const helpText = t([source, 'helpText'], { defaultValue: false });

  return (
    <div>
      {heading && <h3>{heading}</h3>}
      {reverse && detail && md(detail)}
      {short && <p className="strong">{short}</p>}
      {!reverse && detail && md(detail)}
      {helpText && md(helpText, { className: 'mb2 text-s alert alert-info' })}
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
