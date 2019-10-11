import { ChoiceList } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import CostAllocateFFPQuarterly from './CostAllocateFFPQuarterly';
import CostAllocateFFPYearTotal from './CostAllocateFFPYearTotal';
import { updateActivity as updateActivityAction } from '../../actions/activities';
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
    const {activityIndex, setFundingSplit } = this.props;
    const [federal, state] = e.target.value.split('-').map(Number);
    setFundingSplit(activityIndex, year, federal, state);
  };

  render() {
    const { byYearData, costAllocation, aKey } = this.props;

    return (
      <Fragment>
        <h5 className="ds-h4">{t('activities.costAllocate.ffp.title')}</h5>
        {byYearData.map(
          ({ year, total, medicaidShare, ffpSelectVal, allocations }) => (
            <div key={year}>
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

              <p className="ds-h4 ds-u-display--block">
                {t('activities.costAllocate.ffp.medicaidShare')}
              </p>
              <p>
                <Dollars long>{medicaidShare}</Dollars>
              </p>

              <ChoiceList
                name={`ffp-${year}`}
                type="select"
                label={t('activities.costAllocate.ffp.labels.fedStateSplit')}
                labelClassName="ds-h5"
                choices={[
                  { label: '90-10', value: '90-10' },
                  { label: '75-25', value: '75-25' },
                  { label: '50-50', value: '50-50' }
                ]}
                value={ffpSelectVal}
                onChange={this.setFederalStateSplit(year)}
              />
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
              <CostAllocateFFPQuarterly aKey={aKey} year={year} />
              <CostAllocateFFPYearTotal aKey={aKey} />
              <hr />
            </div>
          )
        )}
      </Fragment>
    );
  }
}

CostAllocateFFP.propTypes = {
  aKey: PropTypes.string.isRequired,
  activityIndex: PropTypes.string.isRequired,
  byYearData: PropTypes.array.isRequired,
  costAllocation: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

export const makeMapStateToProps = () => {
  const selectCostAllocateFFP = makeSelectCostAllocateFFP();
  const mapStateToProps = (state, props) => selectCostAllocateFFP(state, props);
  return mapStateToProps;
};

export const mapDispatchToProps = {
  setFundingSplit: setCostAllocationFFPFundingSplit,
  setOtherFunding: setCostAllocationFFPOtherFunding,
  updateActivity: updateActivityAction
};

export { CostAllocateFFP as CostAllocateFFPRaw };
export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CostAllocateFFP);
