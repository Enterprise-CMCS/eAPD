import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Waypoint from './ConnectedWaypoint';
import { printApd } from '../actions/print';
import { Section } from '../components/Section';
import { FileDownload } from '../components/Icons';

const ExportAndSubmit = ({ printApd: print }) => (
  <Waypoint id="export-and-submit">
    <Section isNumbered id="export-and-submit" resource="exportAndSubmit">
      <p>
        To submit your APD for analyst review, export the document as a PDF,
        then send it to CMS just like you’ve done before.
      </p>
      <ol>
        <li>
          Select <strong>Export</strong> to open up your browser’s print
          options.
        </li>
        <li>
          In the print window, select <strong>Save as PDF</strong>. In Chrome,
          this option is listed under <em>Destination</em>. In other browsers,
          this option is part of a dropdown menu labeled <em>PDF</em>.
        </li>

        <li>
          Select <strong>Save</strong>. This will download a PDF to your
          computer.
        </li>

        <li>
          If you decide to make changes before you submit, follow those three
          steps again to download a new PDF.
        </li>

        <li>
          Email the completed APD to{' '}
          <strong>
            <a href="mailto:CMS-EAPD@cms.hhs.gov">CMS-EAPD@cms.hhs.gov</a>
          </strong>
          .
        </li>
      </ol>
      <Button
        size="big"
        variation="primary"
        className="ds-u-margin-top--2"
        onClick={print}
      >
        Export
        <span className="ds-u-margin-left--2">
          <FileDownload />
        </span>
      </Button>
    </Section>
  </Waypoint>
);

ExportAndSubmit.propTypes = {
  printApd: PropTypes.func.isRequired
};

const mapDispatchToProps = { printApd };

export default connect(
  null,
  mapDispatchToProps
)(ExportAndSubmit);

export { ExportAndSubmit as plain, mapDispatchToProps };
