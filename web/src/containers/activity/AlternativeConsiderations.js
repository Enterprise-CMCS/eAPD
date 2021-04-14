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

      <p className="instruction-box">The state must consider opportunities to share, leverage and reuse Medicaid technologies, including custom open source development, reuse of systems that already exist within the state, reuse of systems built for other states available under 45 CFR §95.617, licensing or purchasing COTS software or SaaS, or engaging in collaboration with other states.</p>


      <FormLabel
          className="ds-c-label--full-width ds-u-padding-top--4"
          hint={''}
          fieldId="activity-description-field"
        >
          Alternative Analysis
          <p className="ds-u-font-weight--normal ds-u-margin-top--1">Describe any alternatives considered regarding this activity, including how each potential approach was studied or assessed. Provide a brief description of each option considered, and a justification for the approach or option that was ultimately selected.</p>
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
          <p className="ds-u-font-weight--normal ds-u-margin-top--1">Explain consideration for costs and benefits of each option described above. As applicable, include hown the selected approach supports the economic and efficient management of the Medicaid program.</p>
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
          <p className="ds-u-font-weight--normal ds-u-margin-top--1"> If a requirements analysis was conducted for this activity, provide a summary of the analysis and the results. If no requirements analysis was conducted, explain the reason. Indicate whether a requirements analysis is waived by law or is not required in regulation.</p>
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
          Forseeable Risks
          <p className="ds-u-font-weight--normal ds-u-margin-top--1">Describe any foreseeable risks associated with your proposed solution, including the strategy for mitigation of the identified risk(s).</p>
          <p className="instruction-box ds-u-font-weight--normal">Example: A potential risk to the proposed solution is system outage and downtime. The state has determined the risk can be minimized when proper precautions are in place and a plan for communications for outages has been established. The state accepts this risk and will oversee the mitigation efforts through monitoring and oversight of contract service level agreements.</p>
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
