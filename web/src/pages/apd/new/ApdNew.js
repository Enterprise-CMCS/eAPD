import PropType from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Alert,
  Button,
  ChoiceList,
  TextField,
  Tooltip,
  TooltipIcon
} from '@cmsgov/design-system';
import {
  newApdSchema as schema,
  APD_TYPE,
  defaultAPDYearOptions,
  defaultAPDYears
} from '@cms-eapd/common';
import { joiResolver } from '@hookform/resolvers/joi';
import { useFlags } from 'launchdarkly-react-client-sdk';

import { apdValid } from '../../../redux/reducers/apd';
import { createApd } from '../../../redux/actions/app';
import Loading from '../../../components/Loading';

import ApdNewHITECHFields from './ApdNewHITECHFields';
import ApdNewMMISFields from './ApdNewMMISFields';

const ApdNew = ({ createApd: create }) => {
  ApdNew.displayName = 'ApdNew';
  const history = useHistory();
  const { enableMmis } = useFlags();

  // Default values for form
  const businessAreaOptions = {
    waiverSupportSystems: false,
    assetVerificationSystem: false,
    claimsProcessing: false,
    decisionSupportSystemDW: false,
    electronicVisitVerification: false,
    encounterProcessingSystemMCS: false,
    financialManagement: false,
    healthInformationExchange: false,
    longTermServicesSupports: false,
    memberManagement: false,
    pharmacyBenefitManagementPOS: false,
    programIntegrity: false,
    providerManagement: false,
    thirdPartyLiability: false,
    other: false,
    otherMedicaidBusinessAreas: ''
  };

  const updateTypes = {
    annualUpdate: false,
    asNeededUpdate: false
  };

  const apdTypeChoicesWithMmis = [
    {
      label: 'HITECH IAPD',
      labelClassName: 'label-extended',
      value: APD_TYPE.HITECH,
      hint: 'Health Information Technology for Economic and Clinical Health Implementation APD',
      checked: null
    },
    {
      label: 'MMIS IAPD',
      labelClassName: 'label-extended',
      value: APD_TYPE.MMIS,
      hint: 'Medicaid Management Information System Implementation APD',
      checked: null
    }
  ];

  const apdTypeHitechOnly = [
    {
      label: 'HITECH IAPD',
      labelClassName: 'label-extended',
      value: APD_TYPE.HITECH,
      hint: 'Health Information Technology for Economic and Clinical Health Implementation APD',
      checked: true
    }
  ];

  let apdTypeChoices = apdTypeChoicesWithMmis;

  const yearOptions = defaultAPDYearOptions();

  // State management
  const [apdChoices, setApdChoices] = useState(apdTypeChoices);
  const [apdType, setApdType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [medicaidBusinessAreas, setMedicaidBusinessAreas] =
    useState(businessAreaOptions);
  const [updateStatus, setUpdateStatus] = useState(updateTypes);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [updateAPD, setUpdateAPD] = useState('');
  const [years, setYears] = useState(defaultAPDYears());

  const methods = useForm({
    defaultValues: {
      apdType,
      apdName: '',
      years,
      medicaidBusinessAreas,
      updateStatus,
      updateAPD
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(schema)
  });

  const {
    control,
    formState: { errors, isValid },
    getValues,
    setValue
  } = methods;

  useEffect(() => {
    if (!enableMmis) {
      setApdChoices(apdTypeHitechOnly);
      setApdType(APD_TYPE.HITECH);
      setValue('apdType', APD_TYPE.HITECH);
    }

    setSubmitDisabled(!isValid);
  }, [apdTypeHitechOnly, enableMmis, isValid, setValue]);

  if (isLoading) {
    return (
      <div id="start-main-content">
        <Loading>Loading your APD</Loading>
      </div>
    );
  }

  const yearChoices = yearOptions.map((year, index) => ({
    defaultChecked: years.includes(year),
    apdname: `years[${index}]`,
    label: year,
    value: year
  }));

  function updateArray(array, name, setAction, value) {
    let indexPrime = array.indexOf(value),
      newArray = array;
    if (indexPrime > -1) {
      newArray.splice(indexPrime, 1);
      setValue(name, newArray, { shouldValidate: true });
      setAction(newArray);
    } else if (indexPrime === -1) {
      newArray.push(value);
      setValue(name, newArray, { shouldValidate: true });
      setAction(newArray);
    }
  }

  function fieldComponents(apdType) {
    switch (apdType) {
      case APD_TYPE.HITECH:
        return (
          <ApdNewHITECHFields
            updateStatus={updateStatus}
            setUpdateStatus={setUpdateStatus}
          />
        );
      case APD_TYPE.MMIS:
        return (
          <ApdNewMMISFields
            medicaidBusinessAreas={medicaidBusinessAreas}
            setMedicaidBusinessAreas={setMedicaidBusinessAreas}
            updateStatus={updateStatus}
            setUpdateStatus={setUpdateStatus}
            setUpdateAPD={setUpdateAPD}
          />
        );
      default:
        return null;
    }
  }

  const createNew = () => {
    const { name, updateStatus } = getValues();
    const apdValues = {
      apdOverview: {
        programOverview: '',
        updateStatus: updateStatus
      },
      years,
      yearOptions,
      name,
      apdType
    };

    if (apdType === APD_TYPE.MMIS) {
      apdValues.apdOverview.medicaidBusinessAreas = medicaidBusinessAreas;
    }

    setIsLoading(true);
    create(apdValues);
  };

  return (
    <Fragment>
      <div className="site-body ds-l-container">
        <main id="start-main-content">
          <FormProvider {...methods}>
            <h1 className="ds-h2 ds-u-padding-top--3">
              Create a New Advanced Planning Document (APD)
            </h1>
            <div className="ds-u-padding-bottom--1 ds-u-border-bottom--2">
              Complete all the fields below to create your APD.
            </div>
            <Controller
              name="apdType"
              control={control}
              render={({ field: { onBlur, onChange, ...props } }) => (
                <ChoiceList
                  {...props}
                  label="What type of APD are you creating?"
                  labelClassName="ds-h3 label-header label-extended"
                  hint={
                    <Alert
                      variation="warn"
                      className="ds-u-margin-y--3 ds-u-margin-right--7"
                    >
                      <p className="ds-c-alert__text">
                        This selection cannot be changed after creating a new
                        APD.
                      </p>
                    </Alert>
                  }
                  type="radio"
                  choices={apdChoices}
                  onChange={e => {
                    setApdType(e.target.value);
                    onChange(e);
                  }}
                  onBlur={onBlur}
                  onComponentBlur={onBlur}
                  errorMessage={errors?.apdType?.message}
                  errorPlacement="bottom"
                />
              )}
            />
            {apdValid(apdType) && (
              <div>
                <Controller
                  name="apdName"
                  control={control}
                  render={({ field: { ...props } }) => (
                    <TextField
                      {...props}
                      label="APD Name"
                      className="remove-clearfix"
                      errorMessage={errors?.apdName?.message}
                      errorPlacement="bottom"
                    />
                  )}
                />
                <Controller
                  name="years"
                  control={control}
                  render={({ field: { onBlur, ...props } }) => (
                    <ChoiceList
                      {...props}
                      label="Federal Fiscal Year (FFY)"
                      choices={yearChoices}
                      labelClassName="ds-u-margin-bottom--1"
                      hint="Choose the federal fiscal year(s) this APD covers."
                      type="checkbox"
                      onChange={e => {
                        updateArray(years, 'years', setYears, e.target.value);
                      }}
                      onBlur={onBlur}
                      onComponentBlur={onBlur}
                      errorMessage={errors?.years?.message}
                      errorPlacement="bottom"
                    />
                  )}
                />
              </div>
            )}

            {/* Show relevant fields based on APD type selected */}
            {fieldComponents(apdType)}

            <div className="ds-u-padding-y--3">
              <Button onClick={history.goBack}>Cancel</Button>

              {submitDisabled === true ? (
                <Tooltip
                  className="ds-c-tooltip__trigger-link ds-u-float--right"
                  component="a"
                  onClose={function noRefCheck() {}}
                  onOpen={function noRefCheck() {}}
                  title="All fields are required to create an APD."
                >
                  <TooltipIcon />
                </Tooltip>
              ) : null}

              <Button
                variation="primary"
                disabled={submitDisabled}
                className="ds-u-float--right"
                data-cy="create_apd_btn"
                onClick={createNew}
              >
                Create an APD
              </Button>
            </div>
          </FormProvider>
        </main>
      </div>
    </Fragment>
  );
};

ApdNew.propTypes = {
  createApd: PropType.func.isRequired
};

ApdNew.defaultProps = {
  route: '/apd'
};

const mapStateToProps = state => ({
  state: state.user.data.state || null,
  activities: state.user.data.activities
});

const mapDispatchToProps = {
  createApd
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdNew);
