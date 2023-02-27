import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import TextArea from './TextArea';
import { MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING } from '@cms-eapd/common';
import { ChoiceList } from '@cmsgov/design-system';
import { Controller, useFormContext } from 'react-hook-form';

const MedicaidBusinessAreas = ({
  adminCheck,
  controllerName,
  controllerNameForOtherDetails,
  errorMessage,
  errorOtherDetails,
  medicaidBusinessAreas,
  setMedicaidBusinessAreas,
  onBlur
}) => {
  const { control, setValue, trigger, clearErrors } = useFormContext();

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]);

  const otherMedicaidBusinessAreaComponent = (
    <div className="ds-c-choice__checkedChild">
      <Controller
        name={controllerNameForOtherDetails}
        control={control}
        render={({ field: { onChange, onBlur, ...props } }) => (
          <TextArea
            {...props}
            value={medicaidBusinessAreas.otherMedicaidBusinessAreas}
            label={
              MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.otherMedicaidBusinessAreas
            }
            labelClassName="label-header"
            data-cy="other_details"
            hint="Since the Medicaid Business is not listed above, provide the name of the Medicaid Business Area. If there are multiple, separate other business areas with a semi-colon."
            onBlur={onBlur}
            errorMessage={errorOtherDetails}
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
    const value = e.target.value;
    const checked = e.target.checked;

    medicaidBusinessAreas[value] = checked;
    setMedicaidBusinessAreas(medicaidBusinessAreas);
    setValue(controllerName, {
      ...medicaidBusinessAreas,
      [e.target.value]: e.target.checked
    });
    trigger(controllerName);
  };

  return (
    <ChoiceList
      label="Medicaid Business Areas"
      hint={
        <div>
          Select the Medicaid Enterprise Systems Business Area(s) that cover the
          scope of this APD. A more detailed description of these business
          areas, along with the associated outcomes and metrics, are available
          at the&nbsp;
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
      errorMessage={errorMessage}
      errorPlacement="bottom"
    />
  );
};

MedicaidBusinessAreas.propTypes = {
  adminCheck: PropTypes.func,
  controllerName: PropTypes.string.isRequired,
  controllerNameForOtherDetails: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  errorOtherDetails: PropTypes.string,
  medicaidBusinessAreas: PropTypes.object.isRequired,
  setMedicaidBusinessAreas: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

export default MedicaidBusinessAreas;
