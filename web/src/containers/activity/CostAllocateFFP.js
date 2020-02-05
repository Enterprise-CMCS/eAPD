import { Dropdown } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Instruction from '../../components/Instruction';
import CostAllocateFFPQuarterly from './CostAllocateFFPQuarterly';
import CostAllocateFFPYearTotal from './CostAllocateFFPYearTotal';
import {
  setCostAllocationFFPFundingSplit,
  setCostAllocationFFPOtherFunding
} from '../../actions/editActivity';
import DollarField from '../../components/DollarField';
import Dollars from '../../components/Dollars';
import { t } from '../../i18n';
import { makeSelectCostAllocateFFP } from '../../reducers/activities.selectors';

class CostAllocateFFP extends Component {
  setOther = year => e => {
    const { activityIndex, setOtherFunding } = this.props;
    setOtherFunding(activityIndex, year, e.target.value);
  };

  setFederalStateSplit = year => e => {
    const { activityIndex, setFundingSplit } = this.props;
    const [federal, state] = e.target.value.split('-').map(Number);
    setFundingSplit(activityIndex, year, federal, state);
  };

  render() {
    const {
      activityIndex,
      byYearData,
      costAllocation,
      aKey,
      isViewOnly
    } = this.props;

    return (
      <Fragment>
        {!isViewOnly && (
          <h5 className="ds-h4">{t('activities.costAllocate.ffp.title')}</h5>
        )}
        {byYearData.map(
          ({ year, total, medicaidShare, ffpSelectVal, allocations }) => (
            <div key={year}>
              {isViewOnly ? (
                <Fragment>
                  <p className="ds-h3 ds-u-margin-y--2">
                    Cost Allocation for FFY {year}:{' '}
                    <span className="ds-u-font-weight--normal">
                      <Dollars long>{total}</Dollars>
                    </span>
                  </p>
                  <p className="ds-h4 ds-u-margin-y--2">
                    {t('activities.costAllocate.ffp.labels.other')}:{' '}
                    <span className="ds-u-font-weight--normal">
                      <Dollars long>{costAllocation[year].other}</Dollars>
                    </span>
                  </p>
                </Fragment>
              ) : (
                <Fragment>
                  <h6 className="ds-h3 ds-u-margin-bottom--2">
                    Cost Allocation for FFY {year}:
                  </h6>

                  <Instruction
                    source="activities.costAllocate.ffp.otherFundingInstruction"
                    headingDisplay={{
                      level: 'h7',
                      className: 'ds-h4'
                    }}
                  />

                  <table
                    className="budget-table"
                    style={{ width: 'fit-content' }}
                  >
                    <caption className="ds-u-visibility--screen-reader">
                      Review the total activity cost, enter any other funding
                      amount, and review the Medicaid share.
                    </caption>
                    <thead>
                      <tr>
                        <th colSpan="3">Calculated Medicaid Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Activity Cost</th>
                        <td colSpan="2" className="budget-table--number">
                          <Dollars long>{total}</Dollars>
                        </td>
                      </tr>
                      <tr>
                        <th className="ds-u-valign--middle">Other Funding</th>
                        <td className="budget-table--number ds-u-valign--middle ds-u-padding-right--1">
                          (-)
                        </td>
                        <td className="budget-table--number ds-u-padding-left--0">
                          <DollarField
                            className="budget-table--input-holder"
                            fieldClassName="budget-table--input__number"
                            label={t(
                              'activities.costAllocate.ffp.labels.other'
                            )}
                            labelClassName="sr-only"
                            name={`cost-allocate-other-${year}`}
                            value={costAllocation[year].other || '0'}
                            onChange={this.setOther(year)}
                          />
                        </td>
                      </tr>
                      <tr className="budget-table--row__highlight">
                        <th>Medicaid Share</th>
                        <td
                          colSpan="2"
                          className="budget-table--number budget-table--subtotal"
                        >
                          <Dollars long>{medicaidShare}</Dollars>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table
                    className="budget-table"
                    style={{ width: 'fit-content' }}
                  >
                    <caption className="ds-u-visibility--screen-reader">
                      Review the total activity cost, enter any other funding
                      amount, and review the Medicaid share.
                    </caption>
                    <thead>
                      <tr>
                        <th colSpan="2">
                          Calculated Medicaid Federal and State Share
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Medicaid Share</th>
                        <td className="budget-table--number">
                          <Dollars long>{medicaidShare}</Dollars>
                        </td>
                      </tr>
                      <tr>
                        <th>Federal/State Split</th>
                        <td>
                          <Dropdown
                            className="budget-table--input-holder"
                            fieldClassName="budget-table--input__number"
                            name={`ffp-${year}`}
                            label={t(
                              'activities.costAllocate.ffp.labels.fedStateSplit'
                            )}
                            labelClassName="sr-only"
                            options={[
                              { label: '90-10', value: '90-10' },
                              { label: '75-25', value: '75-25' },
                              { label: '50-50', value: '50-50' }
                            ]}
                            value={ffpSelectVal}
                            onChange={this.setFederalStateSplit(year)}
                          />
                        </td>
                      </tr>
                      <tr className="budget-table--row__highlight">
                        <th>Federal Share</th>
                        <td className="budget-table--number budget-table--subtotal">
                          <Dollars long>{allocations.federal}</Dollars>
                        </td>
                      </tr>
                      <tr className="budget-table--row__highlight">
                        <th>State Share</th>
                        <td className="budget-table--number budget-table--subtotal">
                          <Dollars long>{allocations.state}</Dollars>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Fragment>
              )}

              {isViewOnly && (
                <p className="ds-h4 ds-u-margin-y--2">
                  {t('activities.costAllocate.ffp.medicaidShare')}:{' '}
                  <span className="ds-u-font-weight--normal">
                    <Dollars long>{medicaidShare}</Dollars>
                  </span>
                </p>
              )}

              {isViewOnly && (
                <Fragment>
                  <p>
                    <strong>Federal-State Split: </strong>
                    {ffpSelectVal}
                  </p>
                  <div className="ds-u-margin-top--2 ds-u-border-left--2 ds-u-padding-left--2">
                    <p className="ds-u-margin-bottom--0">
                      <strong>Federal</strong>
                    </p>
                    <p>
                      <Dollars long>{allocations.federal}</Dollars>
                    </p>
                    <p className="ds-u-margin-bottom--0">
                      <strong>State</strong>
                    </p>
                    <p>
                      <Dollars long>{allocations.state}</Dollars>
                    </p>
                  </div>
                </Fragment>
              )}

              <CostAllocateFFPQuarterly
                activityIndex={activityIndex}
                aKey={aKey}
                year={year}
                isViewOnly={isViewOnly}
              />
              <hr />
            </div>
          )
        )}
        <CostAllocateFFPYearTotal aKey={aKey} />
        {!isViewOnly && <hr />}
      </Fragment>
    );
  }
}

CostAllocateFFP.propTypes = {
  aKey: PropTypes.string.isRequired,
  activityIndex: PropTypes.number.isRequired,
  byYearData: PropTypes.array.isRequired,
  costAllocation: PropTypes.object.isRequired,
  isViewOnly: PropTypes.bool,
  setFundingSplit: PropTypes.func.isRequired,
  setOtherFunding: PropTypes.func.isRequired
};

CostAllocateFFP.defaultProps = {
  isViewOnly: false
};

export const makeMapStateToProps = () => {
  const selectCostAllocateFFP = makeSelectCostAllocateFFP();
  const mapStateToProps = (state, props) => selectCostAllocateFFP(state, props);
  return mapStateToProps;
};

export const mapDispatchToProps = {
  setFundingSplit: setCostAllocationFFPFundingSplit,
  setOtherFunding: setCostAllocationFFPOtherFunding
};

export { CostAllocateFFP as CostAllocateFFPRaw };
export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CostAllocateFFP);
