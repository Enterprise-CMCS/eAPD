import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getAriaAnnouncement } from '../reducers/aria';

const AriaAnnounce = props => {
  const { ariaMessage } = props;
  return (
    <div
      className="ds-u-visibility--screen-reader"
      role="region"
      aria-live="polite"
    >
      {ariaMessage}
    </div>
  );
};

AriaAnnounce.propTypes = {
  ariaMessage: PropTypes.string
};

AriaAnnounce.defaultProps = {
  ariaMessage: ''
};

const mapStateToProps = state => ({
  ariaMessage: getAriaAnnouncement(state)
});

export default connect(mapStateToProps)(AriaAnnounce);

export { AriaAnnounce as plain };
