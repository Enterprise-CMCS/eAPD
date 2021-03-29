import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  setActivityStandardAndConditionDoesNotSupportExplanation,
  setActivityStandardAndConditionSupportExplanation
} from '../../actions/editActivity';

import RichText from '../../components/RichText';
import TextArea from '../../components/TextArea';
import { selectActivityByIndex } from '../../reducers/activities.selectors';

const StandardsAndConditions = ({
  activity,
  activityIndex,
  setDoesNotSupport,
  setSupport
}) => (
  <Fragment>
    <label htmlFor="standards-and-conditions-supports-field">
      <h4 className="ds-h4">Standards and Conditions for Enhanced Funding</h4>
    </label>
    <div className="ds-u-margin-bottom--6 ds-u-margin-top--3">
      <p className="ds-u-margin-bottom--3">
        Review Medicaid Standards and Conditions regulation and answer the
        following questions. If the activity has a match rate of 50-50, select
        ‘no’ below to proceed to the next page.
      </p>
      <a href="#">Review Standards and Conditions Regulation ></a>

      <h4>Enhanced Funding Qualification</h4>
      <RichText
        id="standards-and-conditions-supports-field"
        content={activity.standardsAndConditions.supports}
        onSync={html => setSupport(activityIndex, html)}
        editorClassName="rte-textarea-1"
      />

      <div className="ds-c-choice__checkedChild ds-u-margin-top--3">
        <TextArea
          label="If this activity does not support the Medicaid standards and conditions, please explain."
          name="activity-set-standards-and-conditions-non-support"
          onChange={({ target: { value } }) =>
            setDoesNotSupport(activityIndex, value)
          }
          rows={6}
          style={{ maxWidth: 'initial' }}
          value={activity.standardsAndConditions.doesNotSupport}
        />
      </div>
    </div>
  </Fragment>
);

StandardsAndConditions.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  setSupport: PropTypes.func.isRequired,
  setDoesNotSupport: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  activity: selectActivityByIndex(state, props)
});

const mapDispatchToProps = {
  setDoesNotSupport: setActivityStandardAndConditionDoesNotSupportExplanation,
  setSupport: setActivityStandardAndConditionSupportExplanation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StandardsAndConditions);

export { StandardsAndConditions as plain, mapStateToProps, mapDispatchToProps };
