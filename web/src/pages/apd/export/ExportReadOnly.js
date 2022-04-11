import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@cmsgov/design-system';
import { Envelope, PDFFile } from '../../../components/Icons';
import { printApd, saveApdEvent } from '../../../actions/app';
import { APD_EVENTS } from '../../../constants';

const ExportInstructions = ({ printApd: print, saveApdEvent: log }) => {
  const sendMail = email => {
    window.location.href = `mailto:${email}`;
  };

  const printAndLog = () => {
    log(APD_EVENTS.EXPORT);
    print();
  };

  return (
    <div className="instruction-box ds-u-margin-top--4 ds-u-margin-bottom--4 visibility--screen">
      <h3 className="ds-h3">How to download this APD</h3>
      <p>
        Download a copy of your APD to review your work offline or as the first
        step in submitting a completed APD to CMS. If you make changes, follow
        these steps again at any time to download a new PDF.
      </p>
      <ol>
        <li>
          Select <strong>Export</strong> to open up your browser’s print options
          window. For longer PDFs this may take a few seconds.
        </li>
        <li>
          In the print window, select your PDF printer or Save to PDF, depending
          on the options your browser offers.
        </li>
        <li>
          If prompted, provide a file name for the PDF. Then to download or open
          it, select <strong>OK</strong> or <strong>Save</strong>.
        </li>
      </ol>
      <Button
        size="big"
        variation="primary"
        className="ds-u-margin-top--2"
        id="export-to-print-or-pdf"
        onClick={printAndLog}
      >
        Export
        <span className="ds-u-margin-left--2">
          <PDFFile />
        </span>
      </Button>

      <h3 className="ds-h3">Submit to CMS</h3>
      <p>
        Once you’ve exported a PDF of a completed APD, submit it for state
        officer review by emailing the PDF to{' '}
        <a href="mailto:MedicaidHITECH@cms.hhs.gov">
          MedicaidHITECH@cms.hhs.gov
        </a>
        .
      </p>
      <Button
        size="big"
        variation="primary"
        className="ds-u-margin-top--2"
        onClick={() => sendMail('MedicaidHITECH@cms.hhs.gov')}
      >
        Submit
        <span className="ds-u-margin-left--2">
          <Envelope />
        </span>
      </Button>
    </div>
  );
};
ExportInstructions.propTypes = {
  printApd: PropTypes.func.isRequired,
  saveApdEvent: PropTypes.func.isRequired
};

const mapDispatchToProps = { printApd, saveApdEvent };

export default connect(null, mapDispatchToProps)(ExportInstructions);

export { ExportInstructions as plain, mapDispatchToProps };
