import PropTypes from 'prop-types';
import { Button } from '@cmsgov/design-system';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Redirect, useParams as actualUseParams } from 'react-router-dom';

import { Section, Subsection } from '../../../components/Section';
import Waypoint from '../../../components/ConnectedWaypoint';
import AlertMissingFFY from '../../../components/AlertMissingFFY';
import { selectApdYears } from '../../../reducers/apd.selectors';

const ExportAndSubmit = ({ push: pushRoute, useParams, years }) => {
  const paramApdId = useParams().apdId;

  if (!paramApdId) {
    return <Redirect to="/apd" />;
  }

  return (
    <React.Fragment>
      <Waypoint /> {/* Waypoint w/o id indicates top of page */}
      <AlertMissingFFY />
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
            onClick={() =>
              years.length > 0 && pushRoute(`/print/${paramApdId}`)
            }
            disabled={years.length === 0}
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
  useParams: PropTypes.func,
  years: PropTypes.arrayOf(PropTypes.string).isRequired
};

ExportAndSubmit.defaultProps = {
  useParams: actualUseParams
};

const mapStateToProps = state => ({
  years: selectApdYears(state)
});

const mapDispatchToProps = { push };

export default connect(mapStateToProps, mapDispatchToProps)(ExportAndSubmit);

export { ExportAndSubmit as plain, mapDispatchToProps };
