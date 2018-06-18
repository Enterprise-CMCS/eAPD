import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../actions/activities';
import { DollarInput } from '../components/Inputs';
import Select from '../components/Select';
import { t } from '../i18n';
import { getActivityTotals } from '../reducers/activities';
import { titleCase } from '../util';
import { formatMoney } from '../util/formats';

class ActivityDetailCostAllocateFFP extends Component {
  handleOther = year => e => {
    const { aId, updateActivity } = this.props;
    const { value } = e.target;
    const updates = { costAllocation: { [year]: { other: +value } } };

    updateActivity(aId, updates, true);
  };

  handleFFP = year => e => {
    const { aId, updateActivity } = this.props;
    const { value } = e.target;
    const [federal, state] = value.split('-').map(Number);
    const updates = { costAllocation: { [year]: { ffp: { federal, state } } } };

    updateActivity(aId, updates, true);
  };

  render() {
    const { byYearData, costAllocation } = this.props;

    return (
      <div className="mb3">
        <h4>{t('activities.costAllocate.ffp.title')}</h4>
        <div className="clearfix mxn1">
          {byYearData.map(({ year, total, totalNetOther, allocations }) => (
            <div key={year} className="col col-12 sm-col-4 px1">
              <div className="p2 bg-darken-1">
                <div>{year}</div>
                <div className="h3 bold mono">{formatMoney(total)}</div>
                <hr />
                <DollarInput
                  name={`cost-allocate-other-${year}`}
                  label={t('activities.costAllocate.ffp.labels.other')}
                  value={costAllocation[year].other}
                  onChange={this.handleOther(year)}
                />
                <div>{t('activities.costAllocate.ffp.totalNetOther')}</div>
                <div className="h3 bold mono">{formatMoney(totalNetOther)}</div>
                <hr />
                <Select
                  name={`ffp-${year}`}
                  label={t('activities.costAllocate.ffp.labels.fedStateSplit')}
                  options={['90-10', '75-25', '50-50']}
                  onChange={this.handleFFP(year)}
                />
                <div className="flex mxn-tiny">
                  {allocations.map(({ id, amount }) => (
                    <div key={id} className="col-12">
                      <div>{titleCase(id)}</div>
                      <div className="h3 bold mono">{formatMoney(amount)}</div>
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
  costAllocation: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

// TODO [bren]: tidy up this data munging
const mapStateToProps = ({ activities: { byId } }, { aId }) => {
  const activity = byId[aId];
  const { costAllocation } = activity;
  const totals = getActivityTotals(activity);

  const byYearData = Object.keys(totals).map(year => {
    const total = totals[year];
    const { ffp, other } = costAllocation[year];
    const totalNetOther = total - other;

    const allocations = Object.keys(ffp).map(id => ({
      id,
      amount: totalNetOther * ffp[id] / 100
    }));

    return { year, total, totalNetOther, allocations };
  });

  return { byYearData, costAllocation };
};

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailCostAllocateFFP
);
