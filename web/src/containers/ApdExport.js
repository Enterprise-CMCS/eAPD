import PropTypes from 'prop-types';
import { Button } from '@cmsgov/design-system';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Redirect, useParams as actualUseParams } from 'react-router-dom';

import { Section, Subsection } from '../components/Section';
import Waypoint from './ConnectedWaypoint';
import AlertMissingFFY from '../components/AlertMissingFFY';

const ExportAndSubmit = ({ push: pushRoute, useParams }) => {
  const paramApdId = +useParams().apdId;

  if (!paramApdId) {
    return <Redirect to="/apd" />;
  }

  return (
    <React.Fragment>
      <Waypoint /> {/* Waypoint w/o id indicates top of page */}
      <AlertMissingFFY/>
      <Section resource="exportAndSubmit">
        <Subsection resource="reviewAndDownload">
          <p>
            On the next page, you will be able to review and download a copy of
            your APD as the first step in submitting a completed APD to CMS.
          </p>
          <Button
            size="big"
            variation="primary"
            className="ds-u-margin-top--2"
            onClick={() => pushRoute(`/print/${paramApdId}`)}
          >
            Continue to Review
          </Button>
        </Subsection>
      </Section>
    </React.Fragment>
  );
};

ExportAndSubmit.propTypes = {
  push: PropTypes.func.isRequired,
  useParams: PropTypes.func
};

ExportAndSubmit.defaultProps = {
  useParams: actualUseParams
};

const mapDispatchToProps = { push };

export default connect(null, mapDispatchToProps)(ExportAndSubmit);

export { ExportAndSubmit as plain, mapDispatchToProps };
