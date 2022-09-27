import React from 'react';
import { ChoiceList } from '@cmsgov/design-system';
import TextArea from '../../../components/TextArea';
import { useForm, Controller } from 'react-hook-form';

const businessAreaChoices = [
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
    label: 'Encounter Processing System (EPS) & Managed Care System',
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
    label: 'Pharmacy Beefit Management (PBM) & Point of Sale (POS)',
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
        <TextArea
          label="Other Medicaid Business Area(s)"
          name="other-mbas"
          hint="Since the Medicaid Business is not listed above, provide the name of the Medicaid Business Area. If there are multiple, separate other business areas with a semi-colon."
        />
      </div>
    )
  }
];

const MmisView = () => {
  const { control } = useForm({
    defaultValues: {},
    mode: 'onChange'
  });

  return (
    <div>
      <Controller
        name="update"
        control={control}
        render={({ field: { onChange, value, ...props } }) => (
          <ChoiceList
            {...props}
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
                    <ChoiceList
                      label="Update Type"
                      name="update-type"
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
                      type="radio"
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
          />
        )}
      />

      <Controller
        name="medicaidBusinessAreas"
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <ChoiceList
            {...props}
            label="Medicaid Business Areas"
            hint={
              <div>
                Select the Medicaid Enterprise Systems Business Area(s) that
                cover the scope of this APD. A more detailed description of
                these business areas, along with the associated outcomes and
                metrics, are available at the MES Certification Repository.
              </div>
            }
            type="checkbox"
            choices={businessAreaChoices}
            onChange={e => {
              onChange(e);
            }}
          />
        )}
      />
    </div>
  );
};

export default MmisView;
