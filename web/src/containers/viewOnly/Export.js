import React from 'react'
import { Button } from '@cmsgov/design-system-core';
import { FileDownload } from '../../components/Icons';

const ExportInstructions = () => {

return (
  <div className="instruction-box ds-u-margin-top--4 ds-u-margin-bottom--4 visibility--screen">
    <h3 className="ds-h3">How to Download This APD</h3>
      <p>
        Download a copy of your APD to review your work offline or as the first
        step in submitting a completed APD to CMS. If you make changes, follow these
        steps again at any time to download a new PDF.
      </p>
      <ol>
        <li>
          Select <strong>Export</strong> to open up your browser’s print
          options window. For longer PDFs this may take a few seconds.
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
        onClick={() => push('/print')}
      >
        Export
        <span className="ds-u-margin-left--2">
          <FileDownload />
        </span>
      </Button>

    <h3 className="ds-h3">Submit to CMS</h3>
      <p>
        Once you’ve exported a PDF of a completed APD, submit it for state officer
        review by emailing the PDF to <a href="mailto:MedicaidHITECH@cms.hhs.gov">MedicaidHITECH@cms.hhs.gov</a>.
      </p>
    </div>
  )
};

export default ExportInstructions;