import React from 'react';
import PropTypes from 'prop-types';

import { t } from '../i18n';

const HelpText = ({ text, reminder }) => (
  <div style={{ marginBottom: '1em', whiteSpace: 'pre-line' }}>
    <div>{t(text)}</div>
    {reminder ? <div style={{ color: 'red' }}>{t(reminder)}</div> : null}
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
