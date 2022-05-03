import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  setActivityStandardAndConditionDoesNotSupportExplanation,
  setActivityStandardAndConditionSupportExplanation
} from '../../../../redux/actions/editActivity';

import RichText from '../../../../components/RichText';
import TextArea from '../../../../components/TextArea';
import { selectActivityByIndex } from '../../../../redux/selectors/activities.selectors';

const StandardsAndConditions = ({
  activity,
  activityIndex,
  setDoesNotSupport,
  setSupport
}) => (
  <Fragment>
    <label htmlFor="standards-and-conditions-supports-field">
      <h4 className="ds-h4">Standards and Conditions</h4>
    </label>

    <div className="ds-u-margin-bottom--6 ds-u-margin-top--3">
      <p className="ds-u-margin-bottom--3">
        Include a description about how this activity will support the Medicaid
        standards and conditions{' '}
        <a
          href="https://www.ecfr.gov/cgi-bin/text-idx?node=se42.4.433_1112"
          rel="noreferrer"
          target="_blank"
        >
          42 CFR 433.112
        </a>
        .
      </p>

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
