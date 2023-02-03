import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { ChoiceList } from '@cmsgov/design-system';
import { connect } from 'react-redux';
import {
  selectMedicaidBusinessAreasBooleanFields,
  selectMedicaidBusinessAreasTextField
} from '../../../redux/selectors/apd.selectors';

import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import {
  mmisOverviewSchema,
  MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING
} from '@cms-eapd/common';

import { setBusinessAreaField } from '../../../redux/actions/editApd';
import TextArea from '../../../components/TextArea';

import { selectAdminCheckEnabled } from '../../../redux/selectors/apd.selectors';

const ApdOverviewMMISFields = ({
  medicaidBusinessAreas,
  otherMedicaidBusinessAreas,
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
    mode: 'all',
    reValidateMode: 'all',
    resolver: joiResolver(mmisOverviewSchema),
    defaultValues: {
      medicaidBusinessAreas,
      otherMedicaidBusinessAreas
    }
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
    setValue('medicaidBusinessAreas', {
      ...medicaidBusinessAreas,
      [e.target.value]: e.target.checked
    });
    setBusinessAreaField(e.target.value, e.target.checked);
    trigger('medicaidBusinessAreas');
  };

  const otherMedicaidBusinessAreaComponent = (
    <div className="ds-c-choice__checkedChild">
      <Controller
        name="otherMedicaidBusinessAreas"
        control={control}
        render={({ field: { onBlur, ...props } }) => (
          <TextArea
            {...props}
            value={otherMedicaidBusinessAreas}
            label={
              MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING.otherMedicaidBusinessAreas
            }
            data-cy="other_details"
            hint="Since the Medicaid Business is not listed above, provide the name of the Medicaid Business Area. If there are multiple, separate other business areas with a semi-colon."
            onBlur={onBlur}
            onComponentBlur={onBlur}
            onChange={e => {
              setBusinessAreaField(
                'otherMedicaidBusinessAreas',
                e.target.value
              );
              setValue('otherMedicaidBusinessAreas', e.target.value);
              trigger();
            }}
            errorMessage={
              adminCheck && errors?.otherMedicaidBusinessAreas?.message
            }
            errorPlacement="bottom"
          />
        )}
      />
    </div>
  );

  const handleBusinessAreas = e => {
    setValue('medicaidBusinessAreas', {
      ...medicaidBusinessAreas,
      [e.target.value]: e.target.checked
    });
    setBusinessAreaField(e.target.value, e.target.checked);
    trigger();
  };

  const getBusinessAreaChoices = () => {
    let choiceList = [];

    for (const [key, value] of Object.entries(medicaidBusinessAreas)) {
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
              errorMessage={
                adminCheck && errors?.medicaidBusinessAreas?.message
              }
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
  medicaidBusinessAreas: selectMedicaidBusinessAreasBooleanFields(state),
  otherMedicaidBusinessAreas: selectMedicaidBusinessAreasTextField(state)
});

const mapDispatchToProps = {
  setBusinessAreaField
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdOverviewMMISFields);

export { ApdOverviewMMISFields as plain, mapStateToProps, mapDispatchToProps };
