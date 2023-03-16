import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';

import { apdTypeToOverviewSchemaMapping, APD_TYPE } from '@cms-eapd/common';
import { ChoiceList } from '@cmsgov/design-system';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  selectAdminCheckEnabled,
  selectApdType
} from '../../src/redux/selectors/apd.selectors';
import { setUpdateStatusField } from '../../src/redux/actions/editApd';

const ApdUpdate = ({
  apdType,
  setUpdateStatusField,
  adminCheck,
  updateStatus
}) => {
  const schema = apdTypeToOverviewSchemaMapping[apdType];

  const {
    control,
    clearErrors,
    setValue,
    trigger,
    formState: { errors }
  } = useForm({
    defaultValues: {
      updateStatus
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderSelectUpdateType = () => (
    <div>
      <Controller
        name="updateStatus"
        control={control}
        render={({ field: { onBlur } }) => (
          <ChoiceList
            label="Update Type"
            labelClassName="label-header"
            name="updateStatus"
            hint={
              <div>
                Indicate if this update is an annual APD and/or as need APD
                update.
                <br />
                Keep in mind, an as needed update can serve as an annual update.
              </div>
            }
            choices={[
              {
                label: 'Annual update',
                value: 'annualUpdate',
                checked: updateStatus.annualUpdate
              },
              {
                label: 'As-needed update',
                value: 'asNeededUpdate',
                checked: updateStatus.asNeededUpdate
              }
            ]}
            type="checkbox"
            onChange={e => {
              setUpdateStatusField(e.target.value, e.target.checked);
              setValue('updateStatus', {
                ...updateStatus,
                [e.target.value]: e.target.checked
              });
              trigger('updateStatus');
            }}
            onBlur={onBlur}
            onComponentBlur={onBlur}
            errorMessage={adminCheck && errors?.updateStatus?.message}
            errorPlacement="bottom"
          />
        )}
      />
    </div>
  );

  const renderIsUpdate = () => (
    <div>
      <Controller
        name="updateStatus.isUpdateAPD"
        control={control}
        render={({ field: { onBlur, onChange: radioOnChange } }) => (
          <ChoiceList
            label="Is this an APD update?"
            labelClassName="label-header"
            hint="Indicate if this APD is for a new project or if it is an update to an existing one."
            type="radio"
            name="updateStatus.isUpdateAPD"
            value={updateStatus.isUpdateAPD}
            choices={[
              {
                label: 'Yes, it is an update.',
                value: 'yes',
                checked: updateStatus.isUpdateAPD === true,
                checkedChildren: (
                  <div className="ds-c-choice__checkedChild">
                    {renderSelectUpdateType()}
                  </div>
                )
              },
              {
                label: 'No, this is for a new project.',
                value: 'no',
                checked: updateStatus.isUpdateAPD === false
              }
            ]}
            onChange={e => {
              const boolValue = e.target.value === 'yes';
              setUpdateStatusField('isUpdateAPD', boolValue);
              radioOnChange(boolValue);
              trigger('updateStatus');
            }}
            onBlur={onBlur}
            onComponentBlur={onBlur}
            errorMessage={
              adminCheck && errors?.updateStatus?.isUpdateAPD?.message
            }
            errorPlacement="bottom"
          />
        )}
      />
    </div>
  );

  switch (apdType) {
    case APD_TYPE.HITECH:
      return renderSelectUpdateType();
    case APD_TYPE.MMIS:
      return renderIsUpdate();
    default:
      return null;
  }
};

ApdUpdate.propTypes = {
  apdType: PropTypes.string,
  setUpdateStatusField: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired,
  updateStatus: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  apdType: selectApdType(state),
  adminCheck: selectAdminCheckEnabled(state),
  updateStatus: state.apd.data.apdOverview.updateStatus
});

const mapDispatchToProps = {
  setUpdateStatusField
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdUpdate);
