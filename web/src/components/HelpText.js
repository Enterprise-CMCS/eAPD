import React from 'react';
import PropTypes from 'prop-types';

import Md from './Md';
import { t } from '../i18n';

const HelpText = ({ text: textResource, reminder: reminderResource }) => {
  const text = t(textResource, { defaultValue: false });
  const reminder = t(reminderResource, { defaultValue: false });

  return (
    (text || reminder) && (
      <div className="mb2">
        {text && <div>{text}</div>}
        {reminder && (
          <Md
            content={reminder}
            wrapper="div"
            className="my1 p1 h6 alert alert-help"
          />
        )}
      </div>
    )
  );
};

HelpText.propTypes = {
  text: PropTypes.string.isRequired,
  reminder: PropTypes.string
};

HelpText.defaultProps = {
  reminder: null
};

export default HelpText;
