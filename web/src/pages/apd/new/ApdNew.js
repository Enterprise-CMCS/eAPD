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
import TextArea from '../../../components/TextArea';
import { createApd } from '../../../redux/actions/app';

import Loading from '../../../components/Loading';
import newApdSchema from '@cms-eapd/common/schemas/apdNew';
import { joiResolver } from '@hookform/resolvers/joi';

import { useFlags } from 'launchdarkly-react-client-sdk';

const ApdNew = ({ createApd: create }) => {
  const thisFFY = (() => {
    const year = new Date().getFullYear();
    if (new Date().getMonth() > 8) {
      return year + 1;
    }
    return year;
  })();
  ApdNew.displayName = 'ApdNew';

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

  const yearOptions = [thisFFY, thisFFY + 1, thisFFY + 2].map(y => `${y}`);
  const history = useHistory();
  const { enableMmis } = useFlags();
  const [apdType, setApdType] = useState('');
  const [businessAreas, setBusinessAreas] = useState(businessAreaOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [typeStatus, setTypeStatus] = useState(updateTypes);
  const [years, setYears] = useState(yearOptions.slice(0, 2));
  useEffect(() => {
    if (enableMmis === false) {
      setApdType('hitech');
      setValue('apdType', 'hitech', { shouldValidate: true });
    }
  }, []);

  const {
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid }
  } = useForm({
    defaultValues: {
      years: years
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(newApdSchema)
  });

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
    let values = getValues();
    setIsLoading(true);
    create(values);
  };

  const disabled = !isValid || !isDirty || (isDirty && !isValid);

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
          {enableMmis === true ? (
            <Controller
              name="apdType"
              control={control}
              render={({ field: { onBlur, onChange, value, ...props } }) => (
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
                  choices={[
                    {
                      label: 'HITECH IAPD',
                      labelClassName: 'label-extended',
                      value: 'hitech',
                      hint: 'Health Information Techology for Economic and Clinical Health Implementation APD',
                      checked: value === 'hitech'
                    },
                    {
                      label: 'MMIS IAPD',
                      labelClassName: 'label-extended',
                      value: 'mmis',
                      hint: 'Medicaid Management Information System Implementation APD',
                      checked: value === 'mmis'
                    }
                  ]}
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
          ) : (
            <Controller
              name="apdType"
              control={control}
              render={({ field: { onBlur, onChange, value, ...props } }) => (
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
                  choices={[
                    {
                      label: 'HITECH IAPD',
                      value: 'hitech',
                      hint: 'Health Information Techology for Economic and Clinical Health Implementation APD',
                      checked: value === 'hitech'
                    }
                  ]}
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
          )}
          {(apdType === 'mmis' || apdType === 'hitech') && (
            <div>
              <Controller
                name="name"
                control={control}
                render={({ field: { value, onChange, onBlur, ...props } }) => (
                  <TextField
                    {...props}
                    label="APD Name"
                    className="remove-clearfix"
                    value={value}
                    onChange={e => {
                      onChange(e);
                    }}
                    onBlur={onBlur}
                    onComponentBlur={onBlur}
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
          {apdType === 'hitech' && (
            <div>
              <Controller
                name="updateStatus.updateList"
                control={control}
                render={({ field: { onBlur, onChange } }) => (
                  <ChoiceList
                    label="Update Type"
                    hint={
                      <div>
                        Indicate if this update is an annual APD and/or as need
                        APD update.
                        <br />
                        Keep in mind, an as needed update can serve as an annual
                        update.
                      </div>
                    }
                    choices={[
                      {
                        label: 'Annual update',
                        value: 'annualUpdate',
                        checked: typeStatus.annualUpdate
                      },
                      {
                        label: 'As-needed update',
                        value: 'asNeededUpdate',
                        checked: typeStatus.asNeededUpdate
                      }
                    ]}
                    labelClassName="ds-u-margin-bottom--1"
                    type="checkbox"
                    onChange={({ target: { value } }) => {
                      typeStatus[value] = !typeStatus[value];
                      onChange(
                        Object.keys(typeStatus).filter(key => typeStatus[key])
                      );
                      setTypeStatus(typeStatus);
                      setValue('updateStatus.typeStatus', typeStatus, {
                        shouldValidate: true
                      });
                    }}
                    onBlur={onBlur}
                    onComponentBlur={onBlur}
                    errorMessage={errors?.updateStatus?.updateList?.message}
                    errorPlacement="bottom"
                  />
                )}
              />
            </div>
          )}
          {apdType === 'mmis' && enableMmis === true && (
            <div>
              <Controller
                name="mmisUpdate"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <ChoiceList
                    label="Is this an APD update?"
                    hint="Indicate if this APD is for a new project or if it is an update to an existing one."
                    type="radio"
                    choices={[
                      {
                        label: 'Yes, it is an update.',
                        value: 'yes',
                        checked: value === 'yes',
                        checkedChildren: (
                          <div className="ds-c-choice__checkedChild">
                            <Controller
                              name="updateStatus.updateList"
                              control={control}
                              render={({ field: { onBlur, onChange } }) => (
                                <ChoiceList
                                  label="Update Type"
                                  hint={
                                    <div>
                                      Indicate if this update is an annual APD
                                      and/or as need APD update.
                                      <br />
                                      Keep in mind, an as needed update can
                                      serve as an annual update.
                                    </div>
                                  }
                                  choices={[
                                    {
                                      label: 'Annual update',
                                      value: 'annualUpdate',
                                      checked: typeStatus.annualUpdate
                                    },
                                    {
                                      label: 'As-needed update',
                                      value: 'asNeededUpdate',
                                      checked: typeStatus.asNeededUpdate
                                    }
                                  ]}
                                  labelClassName="ds-u-margin-bottom--1"
                                  type="checkbox"
                                  onChange={({ target: { value } }) => {
                                    typeStatus[value] = !typeStatus[value];
                                    onChange(
                                      Object.keys(typeStatus).filter(
                                        key => typeStatus[key]
                                      )
                                    );
                                    setValue(
                                      'updateStatus.typeStatus',
                                      typeStatus,
                                      { shouldValidate: true }
                                    );
                                  }}
                                  onBlur={onBlur}
                                  onComponentBlur={onBlur}
                                  errorMessage={
                                    errors?.updateStatus?.updateList?.message
                                  }
                                  errorPlacement="bottom"
                                />
                              )}
                            />
                          </div>
                        )
                      },
                      {
                        label: 'No, this is for a new project.',
                        value: 'no',
                        checked: value === 'no'
                      }
                    ]}
                    onChange={e => {
                      onChange(e);
                    }}
                    onBlur={onBlur}
                    onComponentBlur={onBlur}
                    errorMessage={errors?.typeStatus?.mmisUpdate?.message}
                    errorPlacement="bottom"
                  />
                )}
              />

              <Controller
                name="apdOverview.medicaidBA"
                control={control}
                render={({ field: { onBlur, onChange } }) => (
                  <ChoiceList
                    label="Medicaid Business Areas"
                    hint={
                      <div>
                        Select the Medicaid Enterprise Systems Business Area(s)
                        that cover the scope of this APD. A more detailed
                        description of these business areas, along with the
                        associated outcomes and metrics, are available at the
                        MES Certification Repository.
                      </div>
                    }
                    type="checkbox"
                    choices={[
                      {
                        label: '1115 or Waiver Support Systems',
                        value: 'waiverSupport',
                        checked: businessAreas.waiverSupport
                      },
                      {
                        label: 'Asset Verification System',
                        value: 'assetVerification',
                        checked: businessAreas.assetVerification
                      },
                      {
                        label: 'Claims Processing',
                        value: 'claimsProcessing',
                        checked: businessAreas.claimsProcessing
                      },
                      {
                        label: 'Decision Support System & Data Warehouse',
                        value: 'decisionSupport',
                        checked: businessAreas.decisionSupport
                      },
                      {
                        label: 'Electronic Visit Verification (EVV)',
                        value: 'electronicVisitVerify',
                        checked: businessAreas.electronicVisitVerify
                      },
                      {
                        label:
                          'Encounter Processing System (EPS) & Managed Care System',
                        value: 'encounterProcessingSystem',
                        checked: businessAreas.encounterProcessingSystem
                      },
                      {
                        label: 'Financial Management',
                        value: 'financialMangement',
                        checked: businessAreas.financialMangement
                      },
                      {
                        label: 'Health Information Exchange (HIE)',
                        value: 'healthInfoExchange',
                        checked: businessAreas.healthInfoExchange
                      },
                      {
                        label: 'Long Term Services & Suports (LTSS)',
                        value: 'longTermServiceSupport',
                        checked: businessAreas.longTermServiceSupport
                      },
                      {
                        label: 'Member Management',
                        value: 'memberMangagement',
                        checked: businessAreas.memberMangagement
                      },
                      {
                        label:
                          'Pharmacy Beefit Management (PBM) & Point of Sale (POS)',
                        value: 'pharmacyBenefitManagement',
                        checked: businessAreas.pharmacyBenefitManagement
                      },
                      {
                        label: 'Program Integrity',
                        value: 'programIntegrity',
                        checked: businessAreas.programIntegrity
                      },
                      {
                        label: 'Provider Management',
                        value: 'providerManagement',
                        checked: businessAreas.providerManagement
                      },
                      {
                        label: 'Third Party Liability (TPL)',
                        value: 'thirdPartyLiability',
                        checked: businessAreas.thirdPartyLiability
                      },
                      {
                        label: 'Other',
                        value: 'other',
                        checked: businessAreas.other,
                        checkedChildren: (
                          <div className="ds-c-choice__checkedChild">
                            <Controller
                              name="apdOverview.otherDetails"
                              control={control}
                              render={({ field: { onBlur, ...props } }) => (
                                <TextArea
                                  {...props}
                                  label="Other Medicaid Business Area(s)"
                                  name="other-mbas"
                                  hint="Since the Medicaid Business is not listed above, provide the name of the Medicaid Business Area. If there are multiple, separate other business areas with a semi-colon."
                                  onBlur={onBlur}
                                  onComponentBlur={onBlur}
                                  errorMessage={
                                    errors?.apdOverview
                                      ?.otherMedicaidBusinessAreas?.message
                                  }
                                  errorPlacement="bottom"
                                />
                              )}
                            />
                          </div>
                        )
                      }
                    ]}
                    onChange={({ target: { value } }) => {
                      businessAreas[value] = !businessAreas[value];
                      onChange(
                        Object.keys(businessAreas).filter(
                          key => businessAreas[key]
                        )
                      );
                      setBusinessAreas(businessAreas);
                    }}
                    onBlur={onBlur}
                    onComponentBlur={onBlur}
                    errorMessage={errors?.apdOverview?.medicaidBA?.message}
                    errorPlacement="bottom"
                  />
                )}
              />
            </div>
          )}

          <div className="ds-u-padding-bottom--3">
            <Button variation="transparent" onClick={history.goBack}>
              Cancel
            </Button>

            {disabled === true ? (
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
              disabled={disabled}
              className="ds-u-float--right"
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
