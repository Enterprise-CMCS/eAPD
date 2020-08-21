import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@cmsgov/design-system-core';
import NavLink from './NavLink';

const continueLabelId = 'continue-button-label';
const previousLabelId = 'previous-button-label';

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
      aria-labelledby={continueLabelId}
      className="ds-u-float--right"
      component={NavLink}
      href={continueLink.url}
      variation="primary"
    >
      Continue &gt;
    </Button>
  );

  const continueLabel = !continueLink ? null : (
    <p className="ds-u-text-align--right" id={continueLabelId}>
      {buildLabel(continueLink)}
    </p>
  );

  const previousComponent = !previousLink ? null : (
    <Button
      aria-labelledby={previousLabelId}
      component={NavLink}
      href={previousLink.url}
    >
      &lt; Previous
    </Button>
  );

  const previousLabel = !previousLink ? null : (
    <p id={previousLabelId}>{buildLabel(previousLink)}</p>
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

ContinuePreviousButtons.defaultProps = {
  continueLink: null,
  previousLink: null
};

ContinuePreviousButtons.propTypes = {
  continueLink: PropTypes.object,
  previousLink: PropTypes.object
};

const mapStateToProps = ({ nav }) => ({
  continueLink: nav.continueLink,
  previousLink: nav.previousLink
});

export default connect(mapStateToProps)(ContinuePreviousButtons);

export {
  continueLabelId,
  previousLabelId,
  ContinuePreviousButtons as plain,
  mapStateToProps
};
