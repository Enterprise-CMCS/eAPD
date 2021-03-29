import React, { useState } from 'react';

import { FormLabel } from '@cmsgov/design-system';
import RichText from '../../components/RichText';

const ComprehensiveOverview = () => {
  const [myState, setMyState] = useState('blah');

  const syncRichText = html => {
    setMyState(html);
    console.log('here is rich text editor input', html);
  };

  return (
    <div className="ds-u-margin-top--6">
      <h3>Comprehensive Overview</h3>
      <FormLabel
        className="ds-c-label--full-width"
        fieldId="activity-problem-statement"
      >
        Problem Statement
        <p className="ds-u-font-weight--normal ds-u-margin-y--1">
          Provide a comprehensive explanation of the problem the state is faced
          with. Make sure to expain its significance and scope.
        </p>
        <p className="instruction-box ds-u-font-weight--normal">
          Example: Explain what problem you are trying to solve with this
          particular activity. <br /> <br />
          Example: Highlight how this problem has been addressed in the past.
        </p>
      </FormLabel>
      <RichText
        id="activity-problem-statement"
        content=""
        onSync={syncRichText}
        editorClassName="rte-textarea-l"
      />

      <FormLabel
        className="ds-c-label--full-width"
        fieldId="activity-proposed-solution"
      >
        Proposed Solution
        <p className="ds-u-font-weight--normal ds-u-margin-y--1">
          Explain your proposed solution and how it addresses the state’s
          problem. Additionally justifiy how enhanced funding will support the
          proposed solution.
        </p>
      </FormLabel>
      <RichText
        id="activity-proposed-solution"
        content=""
        onSync={syncRichText}
        editorClassName="rte-textarea-l"
      />

      <FormLabel
        className="ds-c-label--full-width"
        fieldId="activity-compliance-statement"
      >
        Compliance to Federal Regulations
        <p className="ds-u-font-weight--normal ds-u-margin-y--1">
          Provide a high-level explanation on how this activity is allowable by
          Federal Regulations.
        </p>
        <p className="instruction-box ds-u-font-weight--normal">
          Example: This activity complies with Federal Regulations because it
          supports the effort to create reusable open source IT systems.
          <br />
          <br />
          Example: Your were given a letter from a Medicaid Director, gives
          direction on some sub-regulatory guidance, which brings about a need
          for this activity.
        </p>
      </FormLabel>
      <RichText
        id="activity-compliance-statement"
        content=""
        onSync={syncRichText}
        editorClassName="rte-textarea-l"
      />
    </div>
  );
};

export default ComprehensiveOverview;
