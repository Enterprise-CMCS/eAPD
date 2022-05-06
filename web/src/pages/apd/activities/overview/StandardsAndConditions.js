import PropTypes from 'prop-types';
import React, { forwardRef, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import Joi from 'joi';
import {
  setActivityStandardAndConditionDoesNotSupportExplanation,
  setActivityStandardAndConditionSupportExplanation
} from '../../../../redux/actions/editActivity';

import RichText from '../../../../components/RichText';
import TextArea from '../../../../components/TextArea';
import { selectActivityByIndex } from '../../../../redux/selectors/activities.selectors';

const standardsConditionsSchema = Joi.object({
  supports: Joi.string().empty(['', null]).trim().min(1),
  doesNotSupport: Joi.string().empty(['', null])
}).or("supports", "doesNotSupport")

const StandardsAndConditions = forwardRef(
  ({
    activity,
    activityIndex,
    setDoesNotSupport,
    setSupport
  }) => {
    StandardsAndConditions.displayName = 'StandardsAndConditions';

    const {doesNotSupport, supports} = activity.standardsAndConditions;

    const {
      control,
      formState: { errors },
      getValues
    } = useForm({
      defaultValues: {
        supports: supports,
        doesNotSupport: doesNotSupport
      },
      mode: 'onBlur',
      reValidateMode: 'onBlur',
      resolver: joiResolver(standardsConditionsSchema)
    });

    useEffect(() => {
      const { value } = standardsConditionsSchema.validate(getValues());
      const keysPresent = Object.keys(value).length !== 0;

      if (!keysPresent) {
        const needSupport = "Provide a description about how this activity will support the Medicaid standards and conditions.";
        const needExplaination = "If this activity does not support the Medicaid standards and conditions, please explain.";

        errors['supports'] = needSupport;
        errors['doesNotSupport'] = needExplaination;
      } else {
        errors['supports'] = '';
        errors['doesNotSupport'] = '';
      }
    });

    return (
      <Fragment>
        <label htmlFor="standards-and-conditions-supports-field">
          <h4 className="ds-h4">Standards and Conditions</h4>
        </label>

        <div className="ds-u-margin-bottom--6 ds-u-margin-top--3">
          <p className="ds-u-margin-bottom--3">
            Include a description about how this activity will support the Medicaid
            standards and conditions <a
              href="https://www.ecfr.gov/cgi-bin/text-idx?node=se42.4.433_1112"
              rel="noreferrer"
              target="_blank"
            >42 CFR 433.112</a>.
          </p>
          <Controller
            name="supports"
            control={control}
            render={({ field: { onChange, onBlur } }) => (
              <RichText
                id="standards-and-conditions-supports-field"
                data-testid="standards-and-conditions-supports"
                content={activity.standardsAndConditions.supports}
                onSync={html => {
                  setSupport(activityIndex, html);
                  onChange(html);
                }}
                editorClassName="rte-textarea-1"
                onBlur={onBlur}
              />
            )}
          />

        {errors?.supports && (
          <span
            className="ds-c-inline-error ds-c-field__error-message"
            role="alert"
          >
            {errors.supports}
          </span>
        )}

          <div className="ds-c-choice__checkedChild ds-u-margin-top--3">
            <Controller
              name="doesNotSupport"
              control={control}
              render={({ field: { ...props } }) => (
                <TextArea
                  {...props}
                  label="If this activity does not support the Medicaid standards and conditions, please explain."
                  id="activity-set-standards-and-conditions-non-support"
                  onChange={({ target: { value } }) =>
                    setDoesNotSupport(activityIndex, value)
                  }
                  rows={6}
                  style={{ maxWidth: 'initial' }}
                  value={activity.standardsAndConditions.doesNotSupport}
                  errorMessage={errors?.doesNotSupport}
                  errorPlacement="bottom"
                />
              )}
            />
          </div>
        </div>
      </Fragment>
    );
  }
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
