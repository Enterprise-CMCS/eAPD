
import { TextField, ChoiceList } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import CostAllocateFFPQuarterly from './CostAllocateFFPQuarterly';
import { updateActivity as updateActivityAction } from '../../actions/activities';
import Dollars from '../../components/Dollars';
import { t } from '../../i18n';
import { makeSelectCostAllocateFFP } from '../../reducers/activities.selectors';

class CostAllocateFFP extends Component {
  handleOther = year => e => {
    const { aKey, updateActivity } = this.props;
    const { value } = e.target;
    const updates = { costAllocation: { [year]: { other: +value.replace(/[^\d]/g, '') } } };

    updateActivity(aKey, updates, true);
  };

  handleFFP = year => e => {
    const { aKey, updateActivity } = this.props;
    const { value } = e.target;
    const [federal, state] = value.split('-').map(Number);
    const updates = { costAllocation: { [year]: { ffp: { federal, state } } } };

    updateActivity(aKey, updates, true);
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
              <TextField
                label={t('activities.costAllocate.ffp.labels.other')}
                labelClassName='ds-h4'
                mask='currency'
                name={`cost-allocate-other-${year}`}
                value={costAllocation[year].other || '0'}
                onChange={this.handleOther(year)}
              />

              <label className="ds-h4 ds-u-display--block">{t('activities.costAllocate.ffp.medicaidShare')}</label>
              <p>
                <Dollars long>{medicaidShare}</Dollars>
              </p>

              <ChoiceList
                name={`ffp-${year}`}
                type="select"
                label={t(
                  'activities.costAllocate.ffp.labels.fedStateSplit'
                )}
                labelClassName='ds-h4'
                choices={[
                  { label: '90-10', value:'90-10' },
                  { label: '75-25', value: '75-25' },
                  { label: '50-50', value: '50-50' }
                ]}
                value={ffpSelectVal}
                onChange={this.handleFFP(year)}
              />

              <p className="ds-h4">Federal</p>
              <p>
                <Dollars long>{allocations.federal}</Dollars>
              </p>
              <p className="ds-h4">State</p>
              <p>
                <Dollars long>{allocations.state}</Dollars>
              </p>
              <CostAllocateFFPQuarterly aKey={aKey} year={year}/>
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
  updateActivity: updateActivityAction
};

export { CostAllocateFFP as CostAllocateFFPRaw };
export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CostAllocateFFP);
