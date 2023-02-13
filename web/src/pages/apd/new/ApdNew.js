import PropType from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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

import { createApd } from '../../../redux/actions/app';
import Loading from '../../../components/Loading';

import ApdNewHITECHFields from './ApdNewHITECHFields';
import ApdNewMMISFields from './ApdNewMMISFields';

const ApdNew = ({ createApd: create }) => {
  ApdNew.displayName = 'ApdNew';
  const history = useHistory();
  const { enableMmis } = useFlags();

  let value;

  // Default values for form
  const businessAreaOptions = {
    waiverSupport: false,
    assetVerification: false,
    claimsProcessing: false,
    decisionSupport: false,
    electronicVisitVerify: false,
    encounterProcessingSystem: false,
    financialMangement: false,
    healthInfoExchange: false,
    longTermServiceSupport: false,
    memberManagement: false,
    pharmacyBenefitManagement: false,
    programIntegrity: false,
    providerManagement: false,
    thirdPartyLiability: false,
    other: false
  };

  const updateTypes = {
    annualUpdate: false,
    asNeededUpdate: false
  };

  const apdTypeChoices = [
    {
      label: 'HITECH IAPD',
      labelClassName: 'label-extended',
      value: APD_TYPE.HITECH,
      hint: 'Health Information Techology for Economic and Clinical Health Implementation APD',
      checked: value
    },
    {
      label: 'MMIS IAPD',
      labelClassName: 'label-extended',
      value: APD_TYPE.MMIS,
      hint: 'Medicaid Management Information System Implementation APD',
      checked: value
    }
  ];

  const yearOptions = defaultAPDYearOptions();

  // State management
  const [apdChoices, setApdChoices] = useState(apdTypeChoices);
  const [apdType, setApdType] = useState('');
  const [businessAreas, setBusinessAreas] = useState(businessAreaOptions);
  const [businessList, setBusinessList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [otherDetails, setOtherDetails] = useState('');
  const [typeStatus, setTypeStatus] = useState(updateTypes);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [years, setYears] = useState(defaultAPDYears());

  const {
    control,
    setValue,
    getValues,
    formState: { errors, isValid },
    resetField
  } = useForm({
    defaultValues: {
      apdType: '',
      years: years,
      businessList: businessList,
      updateStatus: {
        typeStatus
      }
    },
    mode: 'all',
    reValidateMode: 'all',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    if (!enableMmis) {
      apdChoices.pop();
      apdChoices[0].checked = true;
      setApdChoices(apdChoices);
      setApdType(APD_TYPE.HITECH);
      setValue('apdType', APD_TYPE.HITECH, { shouldValidate: true });
    }
  }, [apdChoices, enableMmis]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSubmitDisabled(!isValid);
  }, [isValid]);

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

  const createNew = () => {
    const { years, name, mmisUpdate } = getValues();
    const apdValues = {
      years,
      name,
      apdType,
      apdOverview: {
        programOverview: '',
        updateStatus: {
          ...typeStatus
        }
      }
    };
    if (apdType === APD_TYPE.HITECH) {
      apdValues.apdOverview.updateStatus.isUpdateAPD = true;
    }
    if (apdType === APD_TYPE.MMIS) {
      apdValues.apdOverview.updateStatus.isUpdateAPD = mmisUpdate === 'yes';
      apdValues.apdOverview.medicaidBusinessAreas = businessAreas;
      apdValues.apdOverview.medicaidBusinessAreas.otherMedicaidBusinessAreas =
        otherDetails;
    }
    setIsLoading(true);
    create(apdValues);
  };

  return (
    <Fragment>
      <div className="site-body ds-l-container">
        <main id="start-main-content">
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
                      This selection cannot be changed after creating a new APD.
                    </p>
                  </Alert>
                }
                type="radio"
                choices={apdChoices}
                onChange={e => {
                  setApdType(e.target.value);
                  resetField('businessList', { keepDirty: true });

                  onChange(e);
                }}
                onBlur={onBlur}
                onComponentBlur={onBlur}
                errorMessage={errors?.apdType?.message}
                errorPlacement="bottom"
              />
            )}
          />
          {(apdType === APD_TYPE.MMIS || apdType === APD_TYPE.HITECH) && (
            <div>
              <Controller
                name="name"
                control={control}
                render={({ field: { ...props } }) => (
                  <TextField
                    {...props}
                    label="APD Name"
                    className="remove-clearfix"
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

          {apdType === APD_TYPE.HITECH && (
            <ApdNewHITECHFields
              control={control}
              errors={errors}
              typeStatus={typeStatus}
              setTypeStatus={setTypeStatus}
            />
          )}
          {apdType === APD_TYPE.MMIS && (
            <ApdNewMMISFields
              control={control}
              errors={errors}
              businessAreas={businessAreas}
              setBusinessAreas={setBusinessAreas}
              businessList={businessList}
              setBusinessList={setBusinessList}
              otherDetails={otherDetails}
              setOtherDetails={setOtherDetails}
              typeStatus={typeStatus}
              setTypeStatus={setTypeStatus}
            />
          )}

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
