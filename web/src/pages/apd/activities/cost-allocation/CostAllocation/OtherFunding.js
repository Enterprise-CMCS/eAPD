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

import { t } from '../../../../../i18n';
import RichText from '../../../../../components/RichText';

import Joi from 'joi';

const otherCostsSchema = Joi.object().pattern(
  /\d{4}/,
  Joi.object({
    otherCosts: Joi.number().positive().allow(0).required().messages({
      'number.base': 'Provide an other funding amount greater than or equal to $0.',
      'number.positive': 'Provide an other funding amount greater than or equal to $0.',
      'number.allow': 'Provide an other funding amount greater than or equal to $0.',
      'number.empty': 'Provide an other funding amount greater than or equal to $0.',
      'number.format': 'Provide an other funding amount greater than or equal to $0.'
    })
  })
);

const OtherFunding = ({
  activityIndex,
  activity,
  costAllocation,
  costSummary,
  setOtherFunding,
  syncOtherFunding,
  adminCheck
}) => {
  const { costAllocationNarrative } = activity;
  const { years } = costSummary;

  const {
    control,
    trigger,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ...costAllocationNarrative
    },
    resolver: joiResolver(otherCostsSchema)
  })

  useEffect(() => {
    if (adminCheck) {
      trigger();
    };

    console.log({errors})
  }, [adminCheck]);

  const setOther = year => e => {
    setOtherFunding(activityIndex, year, e.target.value);
  };
  const syncOther = year => html => syncOtherFunding(activityIndex, year, html);

  return (
    <Fragment>
      <h2 className="ds-u-margin-bottom--0">
        {titleCase(t('activities.otherFunding.title'))}
      </h2>
      {Object.keys(years).map(ffy => (
        <div key={ffy}>
          <h3 className="heading-ffy ds-u-padding-top--4">
            <span>FFY {ffy}</span>
          </h3>
          <div className="data-entry-box">
            <Instruction
              labelFor={`cost-allocation-narrative-${ffy}-other-sources-field`}
              source="activities.otherFunding.description.instruction"
              headingDisplay={{
                level: 'h6',
                className: 'ds-h5'
              }}
            />
            <Controller
              key={`${ffy}-otherSources`}
              name={`years[${ffy}].otherSources`}
              control={control}
              render={({
                field: { onChange: syncOther, ...props }
              }) => (
                <RichText
                  {...props}
                  id={`cost-allocation-narrative-${ffy}-other-sources-field`}
                  content={costAllocationNarrative.years[ffy].otherSources}
                  onSync={html => {
                    syncOther(ffy)

                    if (adminCheck) {
                      trigger();
                    }
                  }}
                  editorClassName="rte-textarea-l"
                />
              )}
            />
          </div>

          <div className="data-entry-box ds-u-margin-bottom--5">
            <Instruction
              source="activities.otherFunding.amount.instruction"
              headingDisplay={{
                level: 'h6',
                className: 'ds-h5'
              }}
            />
            <DollarField
              name={`ffy-${ffy}`}
              label={`FFY ${ffy}`}
              labelClassName="sr-only"
              value={costAllocation[ffy].other || '0'}
              onChange={setOther(ffy)}
            />
          </div>

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
  adminCheck: PropTypes.bool.isRequired
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
    adminCheck: state.apd.adminCheck
  };
};

const mapDispatchToProps = {
  setOtherFunding: setCostAllocationFFPOtherFunding,
  syncOtherFunding: setCostAllocationOtherFunding
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherFunding);

export { OtherFunding as plain, mapStateToProps, mapDispatchToProps };