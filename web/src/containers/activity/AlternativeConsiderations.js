import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Alert, TextField, Dropdown, ChoiceList, Choice, FormLabel } from '@cmsgov/design-system';
import RichText from '../../components/RichText';

import { Subsection } from '../../components/Section';

const AlternativeConsiderations = ({activityIndex}) => {
  return (
    <Subsection
      resource="activities.alternatives"
      id={`activity-outcomes-${activityIndex}`}
    >
          <Alert>
      <p className="ds-c-alert__text">The state must consider sharing, leverage and reuse of Medicaid technologies, including custom open source development, reusing systems that already exist within the state, reusing systems built for other states available under <a href="#">45 CFR §95.617</a>, licensing or purchasing COTS software or SaaS, or engaging in collaboration with other states.</p>
    </Alert>

      <FormLabel
          className="ds-c-label--full-width ds-u-padding-top--4"
          hint={''}
          fieldId="activity-description-field"
        >
          Alternative Analysis
          <p className="ds-u-font-weight--normal ds-u-margin-top--1">The state should describe any alternatives that the State Medicaid Agency considered regarding this activity. Where differing alternatives and approaches were studied or assessed, the state should provide a brief description of each option considered, and a justification should be provided for the approach or option that was ultimately selected.</p>
        </FormLabel>
        <RichText
          name="activity overview"
          label="Activity Snapshot"
          hint="Provide a brief and high-level snapshot of the activity. You can speak on purpose of your activity, its benefits, and any additional information that would give a reviewer a quick understanding of your activity."
          max={280}
          rows={6}
          className="data-entry-box"
          value={''}
          onChange={() => console.log('yep')}
        />
      <FormLabel
          className="ds-c-label--full-width ds-u-padding-top--4"
          hint={''}
          fieldId="activity-costs-benefit-field"
        >
          Cost Benefit Analysis
          <p className="ds-u-font-weight--normal ds-u-margin-top--1">The description should include consideration for costs and benefits for each option. Then, indicate which option was finally selected and why the final selection was made. As applicable, include how the selected approach supports the economic and efficient management of the Medicaid program.</p>
        </FormLabel>
        <RichText
          name="activity overview"
          label="Activity Snapshot"
          hint="Provide a brief and high-level snapshot of the activity. You can speak on purpose of your activity, its benefits, and any additional information that would give a reviewer a quick understanding of your activity."
          max={280}
          rows={6}
          className="data-entry-box"
          value={''}
          onChange={() => console.log('yep')}
        />
      <FormLabel
          className="ds-c-label--full-width ds-u-padding-top--4"
          hint={''}
          fieldId="activity-feasibility-field"
        >
          Feasibility Study
          <p className="ds-u-font-weight--normal ds-u-margin-top--1">If a feasibility study was conducted for this activity, then the state should provide a summary of the results. If the state did not conduct a feasibility study, then it should explain why not. Also, the state should indicate whether a feasibility study is waived by law or is not required in regulation. Note that CMS regulations only allow 50 percent Federal financial participation (FFP) for feasibility studies.</p>
        </FormLabel>
        <RichText
          name="activity overview"
          label="Activity Snapshot"
          hint="Provide a brief and high-level snapshot of the activity. You can speak on purpose of your activity, its benefits, and any additional information that would give a reviewer a quick understanding of your activity."
          max={280}
          rows={6}
          className="data-entry-box"
          value={''}
          onChange={() => console.log('yep')}
        />
      <FormLabel
          className="ds-c-label--full-width ds-u-padding-top--4"
          hint={''}
          fieldId="activity-requirements-field"
        >
          Requirements Analysis
          <p className="ds-u-font-weight--normal ds-u-margin-top--1">If a requirements analysis was conducted for this activity, then the state should provide a summary of the results. If the state did not conduct a requirements analysis, then it should explain why not. Also, the state should indicate whether a requirements analysis is waived by law or is not required in regulation. </p>
        </FormLabel>
        <RichText
          name="activity overview"
          label="Activity Snapshot"
          hint="Provide a brief and high-level snapshot of the activity. You can speak on purpose of your activity, its benefits, and any additional information that would give a reviewer a quick understanding of your activity."
          max={280}
          rows={6}
          className="data-entry-box"
          value={''}
          onChange={() => console.log('yep')}
        />
      <FormLabel
          className="ds-c-label--full-width ds-u-padding-top--4"
          hint={''}
          fieldId="activity-statement-tbd-field"
        >
          Statement of Forseeable Risks: TBD
          <p className="ds-u-font-weight--normal ds-u-margin-top--1">List the forseeable risks associated with the selected option.
 </p>
        </FormLabel>
        <RichText
          name="activity overview"
          label="Activity Snapshot"
          hint="Provide a brief and high-level snapshot of the activity. You can speak on purpose of your activity, its benefits, and any additional information that would give a reviewer a quick understanding of your activity."
          max={280}
          rows={6}
          className="data-entry-box"
          value={''}
          onChange={() => console.log('yep')}
        />
    </Subsection>
  );
};

AlternativeConsiderations.propTypes = {
  activityIndex: PropTypes.number.isRequired,
};

const mapStateToProps = (state, { activityIndex }) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AlternativeConsiderations);

export { AlternativeConsiderations as plain, mapStateToProps, mapDispatchToProps };
