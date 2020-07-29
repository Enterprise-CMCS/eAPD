import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@cmsgov/design-system-core'
import NavLink from './NavLink'

const ContinuePreviousButtons = ({ continueLink, previousLink }) => {
  const continueComponent = !continueLink ? null :
    <Button
      aria-labelledby="continue-button-label"
      className="ds-u-float--right"
      component={NavLink}
      href={continueLink.url}
      variation="primary"
    >
      Continue &gt;
    </Button>

  const continueLabel = !continueLink ? null :
    <p
      className="ds-u-text-align--right"
      id="continue-button-label"
    >
      {continueLink.label}
    </p>

  const previousComponent = !previousLink ? null :
    <Button
      aria-labelledby="previous-button-label"
      component={NavLink}
      href={previousLink.url}
    >
      &lt; Previous
    </Button>

  const previousLabel = !previousLink ? null :
    <p id="previous-button-label">
      {previousLink.label}
    </p>

  return (
    <React.Fragment>
      <div className="ds-l-row ds-u-justify-content--between">
        <div className="ds-l-col--6">
          {previousComponent}
        </div>
        <div className="ds-l-col--6 ds-u-clearfix">
          {continueComponent}
        </div>
      </div>

      <div className="ds-l-row ds-u-justify-content--between">
        <div className="ds-l-col--6">
          {previousLabel}
        </div>
        <div className="ds-l-col--6">
          {continueLabel}
        </div>
      </div>
    </React.Fragment>
  )
};

ContinuePreviousButtons.propTypes = {
  continueLink: PropTypes.oneOfType([null, PropTypes.object]).isRequired,
  previousLink: PropTypes.oneOfType([null, PropTypes.object]).isRequired
}

const mapStateToProps = ({ nav }) => ({
  continueLink: nav.continueLink,
  previousLink: nav.previousLink
});

export default connect(mapStateToProps)(ContinuePreviousButtons);

export { ContinuePreviousButtons as plain, mapStateToProps };
