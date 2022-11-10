import { FormLabel } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import standardsConditionsSchema from '@cms-eapd/common/schemas/standardsAndConditions';
import {
  setActivityStandardAndConditionDoesNotSupportExplanation,
  setActivityStandardAndConditionSupportExplanation
} from '../../../../redux/actions/editActivity';

import RichText from '../../../../components/RichText';
import TextArea from '../../../../components/TextArea';
import { selectActivityByIndex } from '../../../../redux/selectors/activities.selectors';
import { selectAdminCheckEnabled } from '../../../../redux/selectors/apd.selectors';

const StandardsAndConditions = ({
  activity,
  activityIndex,
  setDoesNotSupport,
  setSupport,
  adminCheck
}) => {
  StandardsAndConditions.displayName = 'StandardsAndConditions';

  const {
    activityOverview: {
      standardsAndConditions: { doesNotSupport = '', supports = '' } = {}
    } = {}
  } = activity;

  const {
    control,
    formState: { errors },
    trigger,
    clearErrors
  } = useForm({
    defaultValues: {
      supports: supports,
      doesNotSupport: doesNotSupport
    },
    resolver: joiResolver(standardsConditionsSchema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger(['supports']);
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <FormLabel
        className="ds-c-label full-width-label"
        htmlFor="standards-and-conditions-supports-field"
      >
        Standards and Conditions
      </FormLabel>
      <span className="ds-c-field__hint ds-u-margin--0">
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
      </span>
      <Controller
        name="supports"
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <RichText
            {...props}
            id="standards-and-conditions-supports-field"
            iframe_aria_text="Standards and Conditions Text Area"
            data-testid="standards-and-conditions-supports"
            content={supports}
            onSync={html => {
              setSupport(activityIndex, html);
              onChange(html);

              if (adminCheck) {
                trigger();
              }
            }}
            editorClassName="rte-textarea-1"
            error={errors?.supports?.message}
          />
        )}
      />

      <div className="ds-c-choice__checkedChild ds-u-margin-top--3">
        <TextArea
          name="doesNotSupport"
          value={
            activity?.activityOverview?.standardsAndConditions?.doesNotSupport
          }
          label="If this activity does not support the Medicaid standards and conditions, please explain."
          id="activity-set-standards-and-conditions-non-support"
          onChange={({ target: { value } }) => {
            setDoesNotSupport(activityIndex, value);
          }}
          rows={6}
          style={{ maxWidth: 'initial' }}
        />
      </div>
    </Fragment>
  );
};

StandardsAndConditions.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  setSupport: PropTypes.func.isRequired,
  setDoesNotSupport: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = (state, props) => ({
  activity: selectActivityByIndex(state, props),
  adminCheck: selectAdminCheckEnabled(state)
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
