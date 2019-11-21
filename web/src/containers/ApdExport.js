import { Button } from '@cmsgov/design-system-core';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Waypoint from './ConnectedWaypoint';
import { Section } from '../components/Section';

const ExportAndSubmit = ({ printApd: print, push }) => (
  <Waypoint id="export-and-submit">
    <Section isNumbered id="export-and-submit" resource="exportAndSubmit">
    <h3 className="ds-h3">Review and Download</h3>
      <p>
        On the next page, you'll be able to review and download a copy of your APD as the first
        step in submitting a completed APD to CMS.
      </p>
      <Button
        size="big"
        variation="primary"
        className="ds-u-margin-top--2"
        onClick={() => push('/print')}
      >
        Continue to Review
      </Button>

    </Section>
  </Waypoint>
);

const mapDispatchToProps = { push };

export default connect(
  null,
  mapDispatchToProps
)(ExportAndSubmit);

export { ExportAndSubmit as plain, mapDispatchToProps };
