import PropType from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Alert, Button, ChoiceList, TextField } from '@cmsgov/design-system';
import TextArea from '../../../components/TextArea';
import { createApd } from '../../../redux/actions/app';

import Loading from '../../../components/Loading';
import newApdSchema from '@cms-eapd/common/schemas/apdNew';
import { joiResolver } from '@hookform/resolvers/joi';

const ApdNew = create => {
  const thisFFY = (() => {
    const year = new Date().getFullYear();
    if (new Date().getMonth() > 8) {
      return year + 1;
    }
    return year;
  })();
  ApdNew.displayName = 'ApdNew';

  const yearOptions = [thisFFY, thisFFY + 1, thisFFY + 2].map(y => `${y}`);
  const history = useHistory();
  const [apdType, setApdType] = useState('');
  const [hitechStatus, setHitechStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [years, setYears] = useState(yearOptions.slice(0, 2));

  const createNew = () => {
    setIsLoading(true);
    create();
  };

  if (isLoading) {
    return (
      <div id="start-main-content">
        <Loading>Loading your APD</Loading>
      </div>
    );
  }

  const {
    control,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid }
  } = useForm({
    defaultValues: {
      apdType: '',
      apdname: '',
      years,
      hitechStatus: hitechStatus,
      mmisStatus: {
        updateValue: '',
        updateTypes: []
      },
      medicaidBA: [],
      otherDetails: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: joiResolver(newApdSchema)
  });

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

  const disabled = !isValid || !isDirty || (!isValid && isDirty);

  return (
    <Fragment>
      <div className="ds-u-margin--7 ds-u-padding--7 ds-u-padding-right--12">
        <h1 className="ds-h2">Create a New Advanced Planning Document (APD)</h1>
        <div className="ds-u-padding-bottom--1 ds-u-border-bottom--2">
          Complete all the fields below to create your APD.
        </div>
        <h2 className="ds-h3">What type of APD are you creating?</h2>
        <Alert
          variation="warn"
          className="ds-u-margin-y--3 ds-u-margin-right--7"
        >
          <p className="ds-c-alert__text">
            This selection cannot be changed after creating a new APD.
          </p>
        </Alert>
        <Controller
          name="apdType"
          control={control}
          render={({ field: { onChange, value, ...props } }) => (
            <ChoiceList
              {...props}
              type="radio"
              choices={[
                {
                  label: 'HITECH IAPD',
                  value: 'hitech',
                  checked: value === 'hitech'
                },
                {
                  label: 'MMIS IAPD',
                  value: 'mmis',
                  checked: value === 'mmis'
                }
              ]}
              onChange={e => {
                onChange(e);
                setApdType(e.target.value);
                setValue('apdType', e.target.value, { shouldValidate: true });
              }}
              errorMessage={errors?.apdType?.message}
              errorPlacement="bottom"
            />
          )}
        />
        {(apdType === 'mmis' || apdType === 'hitech') && (
          <div>
            <Controller
              name="apdname"
              control={control}
              render={({ field: { value, onChange, onBlur, ...props } }) => (
                <TextField
                  {...props}
                  label="APD Name"
                  className="remove-clearfix"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  onComponentBlur={onBlur}
                />
              )}
            />
            <Controller
              name="years"
              control={control}
              render={({ field: { onBlur } }) => (
                <ChoiceList
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
              name="hitechStatus"
              control={control}
              render={({ field: { onBlur } }) => (
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
                      value: 'annual'
                    },
                    {
                      label: 'As-needed update',
                      value: 'as-needed'
                    }
                  ]}
                  labelClassName="ds-u-margin-bottom--1"
                  type="checkbox"
                  onChange={e => {
                    updateArray(
                      hitechStatus,
                      'hitechStatus',
                      setHitechStatus,
                      e.target.value
                    );
                  }}
                  onBlur={onBlur}
                  onComponentBlur={onBlur}
                  errorMessage={errors?.hitechStatus?.message}
                  errorPlacement="bottom"
                />
              )}
            />
          </div>
        )}
        {apdType === 'mmis' && (
          <div>
            <Controller
              name="mmisStatus.updateValue"
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
                            name="mmisStatus.updateTypes"
                            control={control}
                            render={({ field: { onBlur, onChange } }) => (
                              <ChoiceList
                                label="Update Type"
                                hint={
                                  <div>
                                    Indicate if this update is an annual APD
                                    and/or as need APD update.
                                    <br />
                                    Keep in mind, an as needed update can serve
                                    as an annual update.
                                  </div>
                                }
                                choices={[
                                  {
                                    label: 'Annual update',
                                    value: 'annual'
                                  },
                                  {
                                    label: 'As-needed update',
                                    value: 'as-needed'
                                  }
                                ]}
                                labelClassName="ds-u-margin-bottom--1"
                                type="checkbox"
                                onChange={onChange}
                                onBlur={onBlur}
                                onComponentBlur={onBlur}
                                errorMessage={
                                  errors?.mmisStatus?.updateTypes?.message
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
                  onChange={onChange}
                  onBlur={onBlur}
                  onComponentBlur={onBlur}
                  errorMessage={errors?.mmisStatus?.updateValue?.message}
                  errorPlacement="bottom"
                />
              )}
            />

            <Controller
              name="medicaidBA"
              control={control}
              label="Medicaid Business Areas"
              render={({ field: { onBlur } }) => (
                <ChoiceList
                  hint={
                    <div>
                      Select the Medicaid Enterprise Systems Business Area(s)
                      that cover the scope of this APD. A more detailed
                      description of these business areas, along with the
                      associated outcomes and metrics, are available at the MES
                      Certification Repository.
                    </div>
                  }
                  type="checkbox"
                  choices={[
                    {
                      label: '1115 or Waiver Support Systems',
                      value: 'waiver-support-systems'
                    },
                    {
                      label: 'Asset Verification System',
                      value: 'asset-verification-system'
                    },
                    {
                      label: 'Claims Processing',
                      value: 'claims-processing'
                    },
                    {
                      label: 'Decision Support System & Data Warehouse',
                      value: 'decision-support'
                    },
                    {
                      label: 'Electronic Visit Verification (EVV)',
                      value: 'evv'
                    },
                    {
                      label:
                        'Encounter Processing System (EPS) & Managed Care System',
                      value: 'eps'
                    },
                    {
                      label: 'Financial Management',
                      value: 'financial-management'
                    },
                    {
                      label: 'Health Information Exchange (HIE)',
                      value: 'hie'
                    },
                    {
                      label: 'Long Term Services & Suports (LTSS)',
                      value: 'ltss'
                    },
                    {
                      label: 'Member Management',
                      value: 'member-management'
                    },
                    {
                      label:
                        'Pharmacy Beefit Management (PBM) & Point of Sale (POS)',
                      value: 'pbm-pos'
                    },
                    {
                      label: 'Program Integrity',
                      value: 'program-integrity'
                    },
                    {
                      label: 'Provider Management',
                      value: 'provider-management'
                    },
                    {
                      label: 'Third Party Liability (TPL)',
                      value: 'tpl'
                    },
                    {
                      label: 'Other',
                      value: 'other',
                      checkedChildren: (
                        <div className="ds-c-choice__checkedChild">
                          <Controller
                            name="otherDetails"
                            control={control}
                            render={({
                              field: { onBlur, onChange, ...props }
                            }) => (
                              <TextArea
                                {...props}
                                label="Other Medicaid Business Area(s)"
                                name="other-mbas"
                                hint="Since the Medicaid Business is not listed above, provide the name of the Medicaid Business Area. If there are multiple, separate other business areas with a semi-colon."
                                onChange={onChange}
                                onBlur={onBlur}
                                onComponentBlur={onBlur}
                              />
                            )}
                          />
                        </div>
                      )
                    }
                  ]}
                  onChange={console.log(getValues('medicaidBA'))}
                  onBlur={onBlur}
                  onComponentBlur={onBlur}
                  errorMessage={errors?.medicaidBA?.message}
                  errorPlacement="bottom"
                />
              )}
            />
          </div>
        )}

        <Button variation="transparent" onClick={history.goBack}>
          Cancel
        </Button>
        <Button
          variation="primary"
          disabled={disabled}
          className="ds-u-float--right"
          onClick={createNew}
        >
          Create an APD
        </Button>
      </div>
    </Fragment>
  );
};

ApdNew.PropTypes = {
  createApd: PropType.func.isRequired,
  yearChoices: PropType.arrayOf(PropType.string).isRequired
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
