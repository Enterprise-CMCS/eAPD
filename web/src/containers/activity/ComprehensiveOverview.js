import React, { useState } from 'react';

import { FormLabel } from '@cmsgov/design-system';
import RichText from '../../components/RichText';

const ComprehensiveOverview = () => {
  const [myState, setMyState] = useState("blah");

  const syncRichText = html => {
      setMyState(html);
      console.log("here is rich text editor input", html);
  };

  return (
    <div className="ds-u-margin-top--6">
      <h3>Comprehensive Overview</h3>
      <FormLabel
          className="ds-c-label--full-width"
          fieldId="activity-problem-statement"
        >
        <p>Activity’s Problem Statement</p>
        <p className="ds-u-font-weight--normal">Provide a comprehensive explanation of the activity’s purpose, history, and relevance to Medicaid’s initiatives.</p>
        <p className="instruction-box ds-u-font-weight--normal">Example: We need a system to distribute</p> 
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
        <p>Activity’s Proposed Solution</p>
        <p className="ds-u-font-weight--normal">Explain your proposed solution and how it addresses the state’s problem. Additionally justifiy how enhanced funding will support the proposed solution and list the steps of your proposed solution</p>
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
        <p>Activity Compliance to Federal Regulations</p>
        <p className="ds-u-font-weight--normal">Provide a high-level explaination on how this activity is allowable by Federal Regulations. </p>
        <p className="instruction-box ds-u-font-weight--normal">Example: This activity complies with Federal Regulations because it supports the effort to create reusable open source IT systems.Example: Your were given a letter from a Medicaid Director, gives direction on some sub-regulatory guidance, which brings about a need for this activity.</p> 
      </FormLabel>
      <RichText
        id="activity-compliance-statement"
        content=""
        onSync={syncRichText}
        editorClassName="rte-textarea-l"
      />
    </div>
  )
}

export default ComprehensiveOverview;