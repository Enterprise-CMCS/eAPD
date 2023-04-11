import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import Instruction from '../../../../../components/Instruction';

import {
  setCostAllocationFFPOtherFunding,
  setCostAllocationOtherFunding
} from '../../../../../redux/actions/editActivity';

import DollarField from '../../../../../components/DollarField';
import Dollars from '../../../../../components/Dollars';
import {
  selectCostAllocationForActivityByIndex,
  selectActivityCostSummary,
  selectActivityByIndex
} from '../../../../../redux/selectors/activities.selectors';
import {
  selectAdminCheckEnabled,
  selectApdType
} from '../../../../../redux/selectors/apd.selectors';

import { t } from '../../../../../i18n';
import RichText from '../../../../../components/RichText';

import { hitechCostAllocationSchema as schema } from '@cms-eapd/common';

export const ActivityTotalCostTable = ({ years, ffy }) => {
  return (
    <table className="budget-table activity-budget-table">
      <tbody>
        <tr className="budget-table--subtotal budget-table--row__header">
          <th colSpan="2">Activity Total Cost</th>
          <td className="budget-table--number">
            <Dollars>{years[ffy].totalCost}</Dollars>
          </td>
        </tr>
        <tr>
          <td className="title">Other Funding</td>
          <td>-</td>
          <td className="budget-table--number">
            <Dollars>{years[ffy].otherFunding}</Dollars>
          </td>
        </tr>
        <tr className="budget-table--subtotal budget-table--row__highlight">
          <td className="title">Total Computable Medicaid Cost</td>
          <td colSpan="2" className="budget-table--number">
            <Dollars>{years[ffy].medicaidShare}</Dollars>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

ActivityTotalCostTable.propTypes = {
  years: PropTypes.object.isRequired,
  ffy: PropTypes.string.isRequired
};

const OtherFunding = ({
  activityIndex,
  activity,
  costSummary,
  setOtherFunding,
  syncOtherFunding,
  apdType,
  adminCheck
}) => {
  const { costAllocationNarrative = { years: {} }, costAllocation = '' } =
    activity;
  const { years } = costSummary;
  const yearsArray = Object.keys(years);

  const {
    control,
    trigger,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      costAllocation,
      costAllocationNarrative
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    trigger();
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOtherFundingChange =
    ffy =>
    ({ target: { value } }) => {
      setValue(`costAllocation.${ffy}.other`, value, { shouldValidate: true });
      console.log(errors);
      setOtherFunding(activityIndex, ffy, value);
    };

  return (
    <Fragment>
      <h2 className="ds-u-margin-bottom--0">
        {titleCase(t('activities.otherFunding.title'))}
      </h2>
      {yearsArray.map(ffy => (
        <div key={ffy}>
          <h3 className="heading-ffy ds-u-padding-top--4">
            <span>FFY {ffy}</span>
          </h3>
          <div className="data-entry-box">
            <Instruction
              labelFor={`cost-allocation-narrative-${ffy}-other-sources-field`}
              source={`activities.otherFunding.${apdType}.description.instruction`}
              headingDisplay={{
                level: 'h4',
                className: 'ds-h5'
              }}
            />

            <RichText
              name={`costAllocationNarrative.years.${ffy}.otherSources`}
              data-testid={`other-sources-${ffy}`}
              id={`cost-allocation-narrative-${ffy}-other-sources-field`}
              iframe_aria_text="Other Funding Description Text Area"
              content={costAllocationNarrative?.years?.[ffy]?.otherSources}
              onSync={html => {
                syncOtherFunding(activityIndex, ffy, html);
                trigger();
              }}
              editorClassName="rte-textarea-l"
            />
            <div>
              {adminCheck &&
                costAllocation[ffy]?.other > 0 &&
                !costAllocationNarrative?.years?.[ffy]?.otherSources && (
                  <span
                    className="ds-c-inline-error ds-c-field__error-message"
                    role="alert"
                  >
                    Provide a description of other funding.
                  </span>
                )}
            </div>
          </div>

          <div className="data-entry-box ds-u-margin-bottom--5">
            <Instruction
              source={`activities.otherFunding.${apdType}.amount.instruction`}
              headingDisplay={{
                level: 'h4',
                className: 'ds-h5'
              }}
            />
            <Controller
              name={`${ffy}.other`}
              control={control}
              value={costAllocation[ffy]?.other || '0'}
              render={({ field: { value, ...props } }) => (
                <DollarField
                  {...props}
                  value={value}
                  label={`FFY ${ffy}`}
                  labelClassName="ds-u-visibility--screen-reader"
                  onChange={handleOtherFundingChange(ffy)}
                  errorMessage={errors?.costAllocation[ffy]?.other?.message}
                  errorPlacement="bottom"
                />
              )}
            />
          </div>
          <ActivityTotalCostTable years={years} ffy={ffy} />
        </div>
      ))}
    </Fragment>
  );
};

OtherFunding.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  activity: PropTypes.object.isRequired,
  costAllocation: PropTypes.object.isRequired,
  costSummary: PropTypes.object.isRequired,
  setOtherFunding: PropTypes.func.isRequired,
  syncOtherFunding: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired,
  apdType: PropTypes.string.isRequired
};

const mapStateToProps = (
  state,
  { activityIndex },
  {
    getActivity = selectActivityByIndex,
    getCostAllocation = selectCostAllocationForActivityByIndex,
    getCostSummary = selectActivityCostSummary
  } = {}
) => {
  const activity = getActivity(state, { activityIndex });
  return {
    activity,
    costAllocation: getCostAllocation(state, { activityIndex }),
    costSummary: getCostSummary(state, { activityIndex }),
    adminCheck: selectAdminCheckEnabled(state),
    apdType: selectApdType(state)
  };
};

const mapDispatchToProps = {
  setOtherFunding: setCostAllocationFFPOtherFunding,
  syncOtherFunding: setCostAllocationOtherFunding
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherFunding);

export { OtherFunding as plain, mapStateToProps, mapDispatchToProps };
