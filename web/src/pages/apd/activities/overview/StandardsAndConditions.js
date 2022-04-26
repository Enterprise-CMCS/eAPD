import PropTypes from 'prop-types';
import React, { forwardRef, Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import Joi from 'joi';
import {
  setActivityStandardAndConditionDoesNotSupportExplanation,
  setActivityStandardAndConditionSupportExplanation
} from '../../../../actions/editActivity';

import RichText from '../../../../components/RichText';
import TextArea from '../../../../components/TextArea';
import { selectActivityByIndex } from '../../../../reducers/activities.selectors';

const standardsConditionsSchema = Joi.alternatives().try(
	Joi.object({
  	supports: Joi.string().trim().min(1).required().messages({
      'string.base': 'Provide a description about how this activity will support the Medicaid standards and conditions.',
      'string.empty': 'Provide a description about how this activity will support the Medicaid standards and conditions.',
      'string.min': 'Provide a description about how this activity will support the Medicaid standards and conditions.'
    }),
    doesNotSupport: Joi.string().allow('')
  }),
  Joi.object({
  	supports: Joi.string().allow(''),
    doesNotSupport: Joi.string().required().messages({
      'string.base': 'If this activity does not support the Medicaid standards and conditions, please explain.',
      'string.empty': 'If this activity does not support the Medicaid standards and conditions, please explain.',
      'string.min': 'If this activity does not support the Medicaid standards and conditions, please explain.'
    })
  })
)
  // {
  // supports: Joi.alternatives().conditional('doesNotSupport', {
  //   is: Joi.exist(),
  //   then: Joi.string().trim().min(1).required().messages({
  //     'string.base': 'Provide a description about how this activity will support the Medicaid standards and conditions.',
  //     'string.empty': 'Provide a description about how this activity will support the Medicaid standards and conditions.',
  //     'string.min': 'Provide a description about how this activity will support the Medicaid standards and conditions.'
  //   }),
  //   otherwise: Joi.any()
  // }),
  // doesNotSupport: Joi.string().required().messages({
  //   'string.base': 'If this activity does not support the Medicaid standards and conditions, please explain.',
  //   'string.empty': 'If this activity does not support the Medicaid standards and conditions, please explain.',
  //   'string.min': 'If this activity does not support the Medicaid standards and conditions, please explain.'
  // })

const StandardsAndConditions = forwardRef(
  ({
    activity,
    activityIndex,
    setDoesNotSupport,
    setSupport
  }, ref) => {

    const {doesNotSupport, supports} = activity.standardsAndConditions;

    const {
      control,
      formState: { errors }
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
      console.log('errors changed');
      console.log({ errors })
    }, [errors]);

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
            {errors.supports.message}
          </span>
        )}

          <div className="ds-c-choice__checkedChild ds-u-margin-top--3">
            <Controller
              name="doesNotSupport"
              control={control}
              render={({ field: { onChange, ...props } }) => (
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
                  errorMessage={errors?.doesNotSupport?.message}
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
