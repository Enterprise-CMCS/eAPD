import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { ChoiceList } from '@cmsgov/design-system';
import { connect } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING } from '@cms-eapd/common/utils/constants';
import { mmisOverviewSchema } from '@cms-eapd/common/schemas/apdOverview';

import { setBusinessAreaField } from '../../../redux/actions/editApd';
import TextArea from '../../../components/TextArea';

import { selectAdminCheckEnabled } from '../../../redux/selectors/apd.selectors';

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
    resolver: joiResolver(mmisOverviewSchema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBusinessAreas = e => {
    const labelElement = document.querySelector(`label[for='${e.target.id}']`);
    const labelText = labelElement.textContent;
    const key = Object.keys(MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING).find(
      key => MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING[key] === labelText
    );
    setBusinessAreaField(key, e.target.checked);
  };

  const getBusinessAreaChoices = () => {
    const businessAreasForCheckbox = Object.assign({}, medicaidBusinessAreas);
    delete businessAreasForCheckbox.otherMedicaidBusinessAreas; // This is a text area field handled as a child element of the 'other' key

    let choiceList = [];

    for (const [key, value] of Object.entries(businessAreasForCheckbox)) {
      let choice = {
        label: MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING[key],
        value: key,
        checked: value
      };

      if (key === 'other') {
        choice.checkedChildren = (
          <div className="ds-c-choice__checkedChild">
            <Controller
              name="otherMedicaidBusinessAreas"
              control={control}
              render={({ field: { onBlur } }) => (
                <TextArea
                  value={medicaidBusinessAreas.otherMedicaidBusinessAreas}
                  label={
                    MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.otherMedicaidBusinessAreas
                  }
                  name="otherMedicaidBusinessAreasText"
                  data-cy="other_details"
                  hint="Since the Medicaid Business is not listed above, provide the name of the Medicaid Business Area. If there are multiple, separate other business areas with a semi-colon."
                  onBlur={onBlur}
                  onChange={e => {
                    setValue('otherMedicaidBusinessAreas', e.target.value);
                    setBusinessAreaField(
                      'otherMedicaidBusinessAreas',
                      e.target.value
                    );
                  }}
                  errorMessage={
                    errors?.medicaidBusinessAreas?.otherMedicaidBusinessAreas
                      ?.messages
                  }
                  errorPlacement="bottom"
                />
              )}
            />
          </div>
        );
      }

      choiceList.push(choice);
    }
    return choiceList;
  };

  const businessAreaChoices = useMemo(
    () => getBusinessAreaChoices(),
    [medicaidBusinessAreas]
  );

  if (businessAreaChoices) {
    return (
      <div className="ds-u-margin-y--3" data-cy="businessAreasList">
        <Controller
          name="medicaidBusinessAreas"
          control={control}
          render={({ field: { onBlur } }) => (
            <ChoiceList
              label="Medicaid Business Areas"
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
              choices={businessAreaChoices}
              onChange={handleBusinessAreas}
              onBlur={onBlur}
              onComponentBlur={onBlur}
              errorMessage={errors?.medicaidBusinessAreas?.message}
              errorPlacement="bottom"
              name="medicaid-business-areas"
            />
          )}
        />
      </div>
    );
  } else return null;
};

ApdOverviewMMISFields.propTypes = {
  medicaidBusinessAreas: PropTypes.object.isRequired,
  setBusinessAreaField: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool
};

ApdOverviewMMISFields.defaultProps = {
  adminCheck: false
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
