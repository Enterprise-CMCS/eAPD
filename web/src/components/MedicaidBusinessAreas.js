import React from 'react';
import TextArea from '../../../components/TextArea';
import { ChoiceList } from '@cmsgov/design-system';

const medicaidBusinessAreas = () => {
  return (
    <ChoiceList
      label="Medicaid Business Areas"
      hint={
        <div>
          Select the Medicaid Enterprise Systems Business Area(s) that cover the
          scope of this APD. A more detailed description of these business
          areas, along with the associated outcomes and metrics, are available
          at the&nbsp;
          <a
            href="https://cmsgov.github.io/CMCS-DSG-DSS-Certification/"
            target="_blank"
            rel="noreferrer"
          >
            MES Certification Repository
          </a>
          .
        </div>
      }
      type="checkbox"
    />
  );
};

export default medicaidBusinessAreas;
