import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@cmsgov/design-system';
import { APD_TYPE } from '@cms-eapd/common';
import { Envelope, PDFFile } from '../../../components/Icons';
import { printApd, saveApdEvent } from '../../../redux/actions/app';
import { APD_EVENTS } from '../../../constants';
import { selectApdType } from '../../../redux/selectors/apd.selectors';

const ExportInstructions = ({
  apdType,
  printApd: print,
  saveApdEvent: log
}) => {
  const email = useMemo(() => {
    switch (apdType) {
      case APD_TYPE.HITECH:
        return 'MedicaidHITECH@cms.hhs.gov';
      case APD_TYPE.MMIS:
        return 'MedicaidMMIS@cms.hhs.gov';
      default:
        return null;
    }
  }, [apdType]);

  const sendMail = e => {
    e.preventDefault();
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
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
      <Button
        size="big"
        variation="primary"
        className="ds-u-margin-top--2"
        onClick={e => sendMail(e)}
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
  apdType: PropTypes.string.isRequired,
  printApd: PropTypes.func.isRequired,
  saveApdEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  apdType: selectApdType(state)
});

const mapDispatchToProps = { printApd, saveApdEvent };

export default connect(mapStateToProps, mapDispatchToProps)(ExportInstructions);

export { ExportInstructions as plain, mapDispatchToProps };
