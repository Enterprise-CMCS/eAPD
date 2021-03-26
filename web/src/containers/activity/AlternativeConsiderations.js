import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { TextField, Dropdown, ChoiceList, Choice, FormLabel } from '@cmsgov/design-system';
import RichText from '../../components/RichText';

import { Subsection } from '../../components/Section';

const AlternativeConsiderations = ({activityIndex}) => {
  return (
    <Subsection
      resource="activities.alternatives"
      id={`activity-outcomes-${activityIndex}`}
    >
      <FormLabel
          className="ds-c-label--full-width ds-u-padding-top--4"
          hint={''}
          fieldId="activity-description-field"
        >
          Alternative Analysis
          <p className="ds-u-font-weight--normal ds-u-margin-top--1">Provide a brief description of each alternative considered for the implementation of this activity.The state should describe any alternatives that the State Medicaid Agency considered regarding this activity. Where differing alternatives and approaches were studied or assessed, the state should provide a brief description of each option considered, and a justification should be provided for the approach or option that was ultimately selected.</p>
          <p className="instruction-box ds-u-font-weight--normal">
          Example: Explain and justifiy the decision to build a customer software solution instead of using an existing COTS or SaaS option.<br /><br /> Example: Explain and justifiy the decision to conduct a contract modification instead of doing a fully competitive procurement.</p>
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
