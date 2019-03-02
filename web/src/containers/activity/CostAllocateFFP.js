import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../../actions/activities';
import { DollarInput } from '../../components/Inputs';
import Select from '../../components/Select';
import { t } from '../../i18n';
import { formatMoney } from '../../util/formats';

class CostAllocateFFP extends Component {
  handleOther = year => e => {
    const { aKey, updateActivity } = this.props;
    const { value } = e.target;
    const updates = { costAllocation: { [year]: { other: +value } } };

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
    const { byYearData, costAllocation } = this.props;

    return (
      <div className="mb3">
        <h4>{t('activities.costAllocate.ffp.title')}</h4>
        <div className="clearfix mxn1">
          {byYearData.map(
            ({ year, total, medicaidShare, ffpSelectVal, allocations }) => (
              <div key={year} className="col col-12 sm-col-6 mb2 px1">
                <div className="p2 bg-gray-lightest">
                  <div>{year}</div>
                  <div className="h3 bold mono truncate">
                    {formatMoney(total)}
                  </div>
                  <hr />
                  <DollarInput
                    wrapperClass="lg-col-8 mb2"
                    name={`cost-allocate-other-${year}`}
                    label={t('activities.costAllocate.ffp.labels.other')}
                    value={costAllocation[year].other}
                    onChange={this.handleOther(year)}
                  />
                  <div>{t('activities.costAllocate.ffp.medicaidShare')}</div>
                  <div className="h4 bold mono truncate">
                    {formatMoney(medicaidShare)}
                  </div>
                  <hr />
                  <Select
                    wrapperClass="lg-col-8 mb2"
                    name={`ffp-${year}`}
                    label={t(
                      'activities.costAllocate.ffp.labels.fedStateSplit'
                    )}
                    options={['90-10', '75-25', '50-50']}
                    value={ffpSelectVal}
                    onChange={this.handleFFP(year)}
                  />
                  <div className="lg-flex">
                    <div className="lg-col-6 mb1 lg-m0">
                      <div>Federal</div>
                      <div className="h4 bold mono truncate">
                        {formatMoney(allocations.federal)}
                      </div>
                    </div>
                    <div className="lg-col-6 mb1 lg-m0">
                      <div>State</div>
                      <div className="h4 bold mono truncate">
                        {formatMoney(allocations.state)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

CostAllocateFFP.propTypes = {
  aKey: PropTypes.string.isRequired,
  byYearData: PropTypes.array.isRequired,
  costAllocation: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

export const mapStateToProps = (
  { activities: { byKey }, budget },
  { aKey }
) => {
  const activity = byKey[aKey];
  const { costAllocation } = activity;
  const { costsByFFY } = budget.activities[aKey];

  const byYearData = Object.entries(costsByFFY)
    .filter(([year]) => year !== 'total')
    .map(([year, costs]) => {
      const { ffp } = costAllocation[year];
      const ffpSelectVal = `${ffp.federal}-${ffp.state}`;

      return {
        year,
        total: costs.total,
        medicaidShare: costs.medicaidShare,
        ffpSelectVal,
        allocations: { federal: costs.federal, state: costs.state }
      };
    });

  return { byYearData, costAllocation };
};

export const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export { CostAllocateFFP as CostAllocateFFPRaw };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CostAllocateFFP);
