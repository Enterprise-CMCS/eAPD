import { Dropdown } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

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
                    FFY {year}:{' '}
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
                  <h6 className="ds-h3">FFY {year}:</h6>
                  <p>
                    <Dollars long>{total}</Dollars>
                  </p>
                  <DollarField
                    label={t('activities.costAllocate.ffp.labels.other')}
                    labelClassName="ds-h5"
                    name={`cost-allocate-other-${year}`}
                    value={costAllocation[year].other || '0'}
                    onChange={this.setOther(year)}
                  />
                </Fragment>
              )}

              {isViewOnly ? (
                <p className="ds-h4 ds-u-margin-y--2">
                  {t('activities.costAllocate.ffp.medicaidShare')}:{' '}
                  <span className="ds-u-font-weight--normal">
                    <Dollars long>{medicaidShare}</Dollars>
                  </span>
                </p>
              ) : (
                <Fragment>
                  <p className="ds-h4 ds-u-display--block">
                    {t('activities.costAllocate.ffp.medicaidShare')}
                  </p>
                  <p>
                    <Dollars long>{medicaidShare}</Dollars>
                  </p>
                </Fragment>
              )}

              {isViewOnly ? (
                <p>
                  <strong>Federal-State Split: </strong>
                  {ffpSelectVal}
                </p>
              ) : (
                <Dropdown
                  name={`ffp-${year}`}
                  label={t('activities.costAllocate.ffp.labels.fedStateSplit')}
                  labelClassName="ds-h5"
                  options={[
                    { label: '90-10', value: '90-10' },
                    { label: '75-25', value: '75-25' },
                    { label: '50-50', value: '50-50' }
                  ]}
                  value={ffpSelectVal}
                  onChange={this.setFederalStateSplit(year)}
                />
              )}
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
