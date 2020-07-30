import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@cmsgov/design-system-core';
import NavLink from './NavLink';

const ContinuePreviousButtons = ({ continueLink, previousLink }) => {
  const buildLabel = (link) => {
    if (link.url.startsWith('/apd/activity/')) {
      const activityIndex = link.url.split('/')[3];
      return `Activity ${+activityIndex + 1}: ${link.label}`;
    }
    return link.label;
  };

  const continueComponent = !continueLink ? null : (
    <Button
      aria-labelledby="continue-button-label"
      className="ds-u-float--right"
      component={NavLink}
      href={continueLink.url}
      variation="primary"
    >
      Continue &gt;
    </Button>
  );

  const continueLabel = !continueLink ? null : (
    <p className="ds-u-text-align--right" id="continue-button-label">
      {buildLabel(continueLink)}
    </p>
  );

  const previousComponent = !previousLink ? null : (
    <Button
      aria-labelledby="previous-button-label"
      component={NavLink}
      href={previousLink.url}
    >
      &lt; Previous
    </Button>
  );

  const previousLabel = !previousLink ? null : (
    <p id="previous-button-label">{buildLabel(previousLink)}</p>
  );

  return (
    <React.Fragment>
      <div className="ds-l-row ds-u-justify-content--between">
        <div className="ds-l-col--6">{previousComponent}</div>
        <div className="ds-l-col--6 ds-u-clearfix">{continueComponent}</div>
      </div>

      <div className="ds-l-row ds-u-justify-content--between">
        <div className="ds-l-col--6">{previousLabel}</div>
        <div className="ds-l-col--6">{continueLabel}</div>
      </div>
    </React.Fragment>
  );
};

// allow 'object' or 'null' property types
// https://github.com/facebook/prop-types/pull/90#issuecomment-551213524
const validProptypes = [
  PropTypes.object.isRequired,
  PropTypes.oneOf([null]).isRequired
];

ContinuePreviousButtons.propTypes = {
  continueLink: PropTypes.oneOfType(validProptypes).isRequired,
  previousLink: PropTypes.oneOfType(validProptypes).isRequired
};

const mapStateToProps = ({ nav }) => ({
  continueLink: nav.continueLink,
  previousLink: nav.previousLink
});

export default connect(mapStateToProps)(ContinuePreviousButtons);

export { ContinuePreviousButtons as plain, mapStateToProps };
