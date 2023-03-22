import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ChoiceList } from '../../../components/ChoiceList';
import { connect } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING,
  mmisOverviewSchema
} from '@cms-eapd/common';

import { selectAdminCheckEnabled } from '../../../redux/selectors/apd.selectors';
import { setBusinessAreaField } from '../../../redux/actions/editApd';
import TextArea from '../../../components/TextArea';

const ApdOverviewMMISFields = ({
  medicaidBusinessAreas,
  setBusinessAreaField,
  adminCheck
}) => {
  const {
    control,
    formState: { errors },
    setValue,
    trigger,
    clearErrors
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(mmisOverviewSchema),
    defaultValues: {
      medicaidBusinessAreas
    }
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  const otherMedicaidBusinessAreaComponent = (
    <div className="ds-c-choice__checkedChild">
      <Controller
        name="medicaidBusinessAreas.otherMedicaidBusinessAreas"
        control={control}
        render={({ field: { onChange, onBlur } }) => (
          <TextArea
            value={medicaidBusinessAreas.otherMedicaidBusinessAreas}
            label={
              MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.otherMedicaidBusinessAreas
            }
            labelClassName="label-header"
            name="medicaidBusinessAreas.otherMedicaidBusinessAreas"
            data-cy="other_details"
            hint="Since the Medicaid Business is not listed above, provide the name of the Medicaid Business Area. If there are multiple, separate other business areas with a semi-colon."
            onBlur={onBlur}
            onChange={e => {
              setBusinessAreaField(
                'otherMedicaidBusinessAreas',
                e.target.value
              );
              onChange(e);
            }}
            errorMessage={
              adminCheck &&
              errors?.medicaidBusinessAreas?.otherMedicaidBusinessAreas?.message
            }
            errorPlacement="bottom"
          />
        )}
      />
    </div>
  );

  const getBusinessAreaChoices = () => {
    const medicaidBusinessAreasBooleanFields = Object.assign(
      {},
      medicaidBusinessAreas
    );
    delete medicaidBusinessAreasBooleanFields.otherMedicaidBusinessAreas;

    let choiceList = [];

    for (const [key, value] of Object.entries(
      medicaidBusinessAreasBooleanFields
    )) {
      let choice = {
        label: MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING[key],
        value: key,
        checked: value
      };

      if (key === 'other') {
        choice.checkedChildren = otherMedicaidBusinessAreaComponent;
      }

      choiceList.push(choice);
    }
    return choiceList;
  };

  const handleBusinessAreas = e => {
    setBusinessAreaField(e.target.value, e.target.checked);
    setValue('medicaidBusinessAreas', {
      ...medicaidBusinessAreas,
      [e.target.value]: e.target.checked
    });
    trigger();
  };

  return (
    <div className="ds-u-margin-y--3" data-cy="businessAreasList">
      <Controller
        name="medicaidBusinessAreas"
        control={control}
        render={({ field: { onBlur } }) => (
          <ChoiceList
            label="Medicaid Business Areas"
            labelClassName="label-header"
            name="medicaidBusinessAreas"
            hint={
              <div>
                Select the Medicaid Enterprise Systems Business Area(s) that
                cover the scope of this APD. A more detailed description of
                these business areas, along with the associated outcomes and
                metrics, are available at the&nbsp;
                <a
                  href="https://cmsgov.github.io/CMCS-DSG-DSS-Certification/"
                  target="_blank"
                  rel="noreferrer"
                >
                  MES Certification Repository
                </a>
                .
              </div>
            }
            type="checkbox"
            choices={getBusinessAreaChoices()}
            onChange={handleBusinessAreas}
            onBlur={onBlur}
            onComponentBlur={onBlur}
            errorMessage={adminCheck && errors?.medicaidBusinessAreas?.message}
            errorPlacement="bottom"
          />
        )}
      />
    </div>
  );
};

ApdOverviewMMISFields.propTypes = {
  medicaidBusinessAreas: PropTypes.object.isRequired,
  setBusinessAreaField: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  adminCheck: selectAdminCheckEnabled(state),
  medicaidBusinessAreas: state.apd.data.apdOverview.medicaidBusinessAreas
});

const mapDispatchToProps = {
  setBusinessAreaField
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdOverviewMMISFields);

export { ApdOverviewMMISFields as plain, mapStateToProps, mapDispatchToProps };
