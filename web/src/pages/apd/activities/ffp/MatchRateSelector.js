import React, { useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ChoiceList } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import Instruction from '../../../../components/Instruction';
import {
  FUNDING_CATEGORY_TYPE,
  FUNDING_CATEGORY_LABEL_MAPPING
} from '@cms-eapd/common';

const MatchRateSelector = ({ ffp, ffy, setMatchRate, adminCheck }) => {
  const {
    control,
    formState: { errors },
    setValue,
    trigger
  } = useFormContext();
  const [fundingCategory, setFundingCategory] = useState(ffp.fundingCategory);
  const [fedStateSplit, setFedStateSplit] = useState(
    `${ffp.federal}-${ffp.state}`
  );

  useEffect(() => {
    setFedStateSplit(`${ffp.federal}-${ffp.state}`);
  }, [ffp.federal, ffp.state]);

  useEffect(() => {
    setFundingCategory(ffp.fundingCategory);
  }, [ffp.fundingCategory]);

  const handleFedStateSplit = e => {
    const [federal, state] = e.target.value.split('-').map(Number);
    setValue(`${ffy}.ffp.federal`, federal);
    setValue(`${ffy}.ffp.state`, state);
    setFedStateSplit(`${federal}-${state}`);
    setFundingCategory(null);
    setValue(`${ffy}.ffp.fundingCategory`, null);
    if (adminCheck) {
      trigger();
    }

    if (federal === 90 && state === 10) {
      setMatchRate(ffy, federal, state, FUNDING_CATEGORY_TYPE.DDI);
    }
  };

  const handleFundingCategory = e => {
    const [federal, state] = fedStateSplit.split('-').map(Number);
    setValue(`${ffy}.ffp.fundingCategory`, e.target.value);
    if (adminCheck) {
      trigger();
    }
    setMatchRate(ffy, federal, state, e.target.value);
    setFundingCategory(e.target.value);
  };

  const checkedChildren = (
    <div className="ds-c-choice__checkedChild">
      <Controller
        key={ffy}
        name={`${ffy}.ffp.fundingCategory`}
        control={control}
        render={({ field: { ...props } }) => (
          <ChoiceList
            {...props}
            label="Select funding category"
            choices={[
              {
                label: FUNDING_CATEGORY_LABEL_MAPPING.DDI,
                value: FUNDING_CATEGORY_TYPE.DDI,
                checked: fundingCategory === FUNDING_CATEGORY_TYPE.DDI
              },
              {
                label: FUNDING_CATEGORY_LABEL_MAPPING.MANDO,
                value: FUNDING_CATEGORY_TYPE.MANDO,
                checked: fundingCategory === FUNDING_CATEGORY_TYPE.MANDO
              }
            ]}
            type="radio"
            size="small"
            onChange={handleFundingCategory}
            errorMessage={
              adminCheck && errors?.[ffy]?.ffp?.fundingCategory?.message
            }
            errorPlacement="bottom"
            data-cy="cost-allocation-radio-group"
          />
        )}
      />
    </div>
  );

  return (
    <div className="data-entry-box ds-u-margin-bottom--5">
      <Instruction
        source="activities.costAllocate.ffp.matchRateInstruction"
        headingDisplay={{
          level: 'p',
          className: 'ds-h4'
        }}
      />
      <Controller
        name={`${ffy}.ffp`}
        control={control}
        render={({ field: { ...props } }) => (
          <ChoiceList
            {...props}
            label="federal-state split"
            labelClassName="ds-u-visibility--screen-reader"
            choices={[
              {
                label: `90/10 ${FUNDING_CATEGORY_LABEL_MAPPING.DDI}`,
                value: '90-10',
                checked: fedStateSplit === '90-10'
              },
              {
                label: '75/25',
                value: '75-25',
                checked: fedStateSplit === '75-25',
                checkedChildren
              },
              {
                label: '50/50',
                value: '50-50',
                checked: fedStateSplit === '50-50',
                checkedChildren
              }
            ]}
            type="radio"
            size="small"
            onChange={handleFedStateSplit}
            errorMessage={adminCheck && errors?.[ffy]?.ffp?.state?.message}
            errorPlacement="bottom"
            data-cy="cost-allocation-match-rate"
          />
        )}
      />
    </div>
  );
};

MatchRateSelector.propTypes = {
  ffp: PropTypes.object.isRequired,
  ffy: PropTypes.string.isRequired,
  setMatchRate: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool
};

MatchRateSelector.defaultProps = {
  adminCheck: false
};

export default MatchRateSelector;
