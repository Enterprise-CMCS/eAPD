import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../actions/activities';
import { DollarInput } from '../components/Inputs';
import Select from '../components/Select';
import { getActivityTotals } from '../reducers/activities';
import { formatMoney } from '../util/formats';

const ffpDisplay = {
  fed: 'Fed',
  state: 'State',
  otherAmt: 'Other'
};

class ActivityDetailCostAllocateFFP extends Component {
  handleOtherChange = year => e => {
    const { aId, updateActivity } = this.props;
    const { value } = e.target;
    const updates = { costFFP: { [year]: { otherAmt: +value } } };

    updateActivity(aId, updates, true);
  };

  handleFfpChange = year => e => {
    const { aId, updateActivity } = this.props;
    const { value } = e.target;
    const [fed, state] = value.split('-').map(Number);
    const updates = { costFFP: { [year]: { fed, state } } };

    updateActivity(aId, updates, true);
  };

  render() {
    const { byYearData, costFFP } = this.props;

    return (
      <div className="mb3">
        <h4>Federal Financial Partipation (FFP) and Cost Allocation</h4>
        <div className="clearfix mxn1">
          {byYearData.map(({ year, total, allocations }) => (
            <div key={year} className="col col-12 sm-col-4 px1">
              <div className="p2 bg-darken-1">
                <div>{year}</div>
                <div className="h3 bold mono">{formatMoney(total)}</div>
                <hr />
                <DollarInput
                  name={`cost-allocate-other-${year}`}
                  label="Other (amount)"
                  value={costFFP[year].otherAmt}
                  onChange={this.handleOtherChange(year)}
                />
                <hr />
                <Select
                  name={`ffp-${year}`}
                  label="Federal / State (percent)"
                  options={['90-10', '75-25', '50-50']}
                  onChange={this.handleFfpChange(year)}
                />
                <hr />
                <div className="flex mxn-tiny">
                  {allocations.map(({ id, amount }) => (
                    <div key={id} className="col-12">
                      <div>{ffpDisplay[id]}</div>
                      <div className="bold mono">{formatMoney(amount)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ActivityDetailCostAllocateFFP.propTypes = {
  aId: PropTypes.number.isRequired,
  byYearData: PropTypes.array.isRequired,
  costFFP: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => {
  const activity = byId[aId];
  const { costFFP } = activity;
  const totals = getActivityTotals(activity);

  const byYearData = Object.keys(totals).map(year => {
    const total = totals[year];
    const ffp = costFFP[year];
    const totalLessOther = total - ffp.otherAmt;

    const allocations = ['fed', 'state']
      .map(id => ({
        id,
        amount: totalLessOther * ffp[id] / 100
      }))
      .concat({ id: 'otherAmt', amount: ffp.otherAmt });

    return { year, total, totalLessOther, allocations };
  });

  return { byYearData, costFFP };
};

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailCostAllocateFFP
);
