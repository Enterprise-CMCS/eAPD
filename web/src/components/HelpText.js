import React from 'react';
import PropTypes from 'prop-types';

import { t } from '../i18n';

const HelpText = ({ text, reminder }) => (
  <div className="mb2" style={{ whiteSpace: 'pre-line' }}>
    <div>{t(text)}</div>
    {reminder ? <div className="red">{t(reminder)}</div> : null}
  </div>
);

HelpText.propTypes = {
  text: PropTypes.string.isRequired,
  reminder: PropTypes.string
};

HelpText.defaultProps = {
  reminder: null
};

export default HelpText;
