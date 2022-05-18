import { FormLabel } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  supports: Joi.string().empty('').trim().min(1),
  doesNotSupport: Joi.string().empty('').trim().min(1)
}).xor('supports', 'doesNotSupport');

const useJoiResolver = validationSchema =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validateAsync(data);

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        const emptyRegex = new RegExp(/must contain at least one of/i);
        const multipleRegex = new RegExp(
          /contains a conflict between exclusive peers/i
        );
        if (multipleRegex.test(errors.message)) {
          return {
            values: data,
            errors: {
              supports: {
                type: 'xor.multiple',
                message:
                  'Cannot have descriptions that support and not support Medicaid standards and conditions.'
              },

              doesNotSupport: {
                type: 'xor.multiple',
                message:
                  'Cannot have descriptions that support and not support Medicaid standards and conditions.'
              }
            }
          };
        }
        if (emptyRegex.test(errors.message)) {
          return {
            values: data,
            errors: {
              supports: {
                type: 'xor.empty',
                message:
                  'Provide a description about how this activity will support the Medicaid standards and conditions.'
              },

              doesNotSupport: {
                type: 'xor.empty',
                message:
                  'Provide a description about how this activity does not support the Medicaid standards and conditions.'
              }
            }
          };
        }
        return {
          values: data,
          errors
        };
      }
    },
    [validationSchema]
  );

const StandardsAndConditions = ({
  activity,
  activityIndex,
  setDoesNotSupport,
  setSupport
}) => {
  StandardsAndConditions.displayName = 'StandardsAndConditions';

  const { doesNotSupport = null, supports = null } =
    activity.standardsAndConditions;

  const {
    control,
    formState: { errors },
    getFieldState,
    trigger
  } = useForm({
    defaultValues: {
      supports: supports,
      doesNotSupport: doesNotSupport
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: useJoiResolver(standardsConditionsSchema)
  });

  useEffect(() => {
    if (supports) {
      trigger('supports');
    }
    if (doesNotSupport) {
      trigger('doesNotSupport');
    }
  }, []);

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
            onBlur={() => {
              if (
                getFieldState('doesNotSupport').isTouched ||
                getFieldState('doesNotSupport').isDirty
              ) {
                trigger(['supports', 'doesNotSupport']);
              } else {
                onBlur();
              }
            }}
            error={errors?.supports?.message}
          />
        )}
      />

      <div className="ds-c-choice__checkedChild ds-u-margin-top--3">
        <Controller
          name="doesNotSupport"
          control={control}
          render={({ field: { onChange, onBlur, ...props } }) => (
            <TextArea
              {...props}
              label="If this activity does not support the Medicaid standards and conditions, please explain."
              id="activity-set-standards-and-conditions-non-support"
              onChange={({ target: { value } }) => {
                setDoesNotSupport(activityIndex, value);
                onChange(value);
              }}
              onBlur={() => {
                if (
                  getFieldState('supports').isTouched ||
                  getFieldState('supports').isDirty
                ) {
                  trigger(['supports', 'doesNotSupport']);
                } else {
                  onBlur();
                }
              }}
              rows={6}
              style={{ maxWidth: 'initial' }}
              value={activity.standardsAndConditions.doesNotSupport}
              errorMessage={errors?.doesNotSupport?.message}
              errorPlacement="bottom"
            />
          )}
        />
      </div>
    </Fragment>
  );
};

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
