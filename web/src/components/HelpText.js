import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Md from './Md';
import { t } from '../i18n';

const HelpText = ({ text: textResource, reminder: reminderResource }) => {
  const text = t(textResource, { defaultValue: false });
  const reminder = t(reminderResource, { defaultValue: false });

  return (
    (text || reminder) && (
      <Fragment>
        {text && <Md content={text} wrapper="div" className="mb2" />}
        {reminder && (
          <Md
            content={reminder}
            wrapper="div"
            className="mb2 p1 h5 alert alert-info"
          />
        )}
      </Fragment>
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
