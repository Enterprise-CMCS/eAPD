import { Button } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Waypoint from './ConnectedWaypoint';
import { printApd } from '../actions/print';
import { Section } from '../components/Section';
import { FileDownload } from '../components/Icons';

const Bold = ({ children }) => (
  <span className="ds-u-font-weight--bold">{children}</span>
);
Bold.propTypes = { children: PropTypes.node.isRequired };

const Italic = ({ children }) => (
  <span className="ds-u-font-style--italic">{children}</span>
);
Italic.propTypes = { children: PropTypes.node.isRequired };

const ExportAndSubmit = ({ printApd: print }) => (
  <Waypoint id="export-and-submit">
    <Section isNumbered id="export-and-submit" resource="exportAndSubmit">
      <p>
        To submit your APD for analyst review, export the document as a PDF,
        then send it to CMS just like you’ve done before.
      </p>
      <ol>
        <li>
          Select <Bold>Export</Bold> to open up your browser’s print options.
        </li>
        <li>
          In the print window, select <Bold>Save as PDF</Bold>. In Chrome, this
          option is listed under <Italic>Destination</Italic>. In other
          browsers, this option is part of a dropdown menu labeled{' '}
          <Italic>PDF</Italic>.
        </li>

        <li>
          Select <Bold>Save</Bold>. This will download a PDF to your computer.
        </li>

        <li>
          If you decide to make changes before you submit, follow those three
          steps again to download a new PDF.
        </li>

        <li>
          Email the completed APD to{' '}
          <Bold>
            <a href="mailto:CMS-EAPD@cms.hhs.gov">CMS-EAPD@cms.hhs.gov</a>
          </Bold>
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
