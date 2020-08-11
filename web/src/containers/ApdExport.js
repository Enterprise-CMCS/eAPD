import PropTypes from 'prop-types';
import { Button } from '@cmsgov/design-system';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Waypoint from './ConnectedWaypoint';
import { Section } from '../components/Section';

const ExportAndSubmit = ({ push: pushRoute }) => (
  <Waypoint id="export-and-submit">
    <Section id="export-and-submit" resource="exportAndSubmit">
      <h3 className="ds-h3">Review and Download</h3>
      <p>
        On the next page, you will be able to review and download a copy of
        your APD as the first step in submitting a completed APD to CMS.
      </p>
      <Button
        size="big"
        variation="primary"
        className="ds-u-margin-top--2"
        onClick={() => pushRoute('/print')}
      >
        Continue to Review
      </Button>
    </Section>
  </Waypoint>
);

ExportAndSubmit.propTypes = {
  push: PropTypes.func.isRequired
};

const mapDispatchToProps = { push };

export default connect(
  null,
  mapDispatchToProps
)(ExportAndSubmit);

export { ExportAndSubmit as plain, mapDispatchToProps };
