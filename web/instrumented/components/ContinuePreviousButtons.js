import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { titleCase } from 'title-case';
import ArrowRightIcon from './ArrowRightIcon';
import ArrowLeftIcon from './ArrowLeftIcon';

const continueLabelId = 'continue-button-label';
const previousLabelId = 'previous-button-label';

const ContinuePreviousButtons = ({ continueLink, previousLink }) => {
  const buildLabel = link => {
    if (link.url.match(/^\/apd\/.*\/activity\//i)) {
      const activityIndex = link.url.split('/')[4];
      return `Activity ${+activityIndex + 1}: ${link.label}`;
    }
    return titleCase(link.label);
  };

  const continueText = !continueLink ? null : buildLabel(continueLink);
  const previousText = !previousLink ? null : buildLabel(previousLink);

  const continueComponent = !continueLink ? null : (
    <Link
      aria-label={`Continue to ${continueText}`}
      id="continue-button"
      className="ds-c-button ds-c-button--primary ds-u-float--right"
      to={continueLink.url}
    >
      Continue
      <ArrowRightIcon className="ds-u-margin-left--1" />
    </Link>
  );

  const continueLabel = !continueText ? null : (
    <p className="ds-u-text-align--right" id="continue-text">
      {continueText}
    </p>
  );

  const previousComponent = !previousLink ? null : (
    <Link
      aria-label={`Back to ${previousText}`}
      id="previous-button"
      className="ds-c-button"
      to={previousLink.url}
    >
      <ArrowLeftIcon className="ds-u-margin-right--1" />
      Back
    </Link>
  );

  const previousLabel = !previousText ? null : (
    <p id="previous-text">{previousText}</p>
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
