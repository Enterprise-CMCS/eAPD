import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../actions/activities';
import { PercentInput } from '../components/Inputs';
import { getActivityTotals } from '../reducers/activities';
import { formatMoney } from '../util/formats';

const ffpDisplay = {
  fed: 'Fed',
  state: 'State',
  other: 'Other'
};

const ActivityDetailCostAllocateFFP = ({ aId, byYearData, updateActivity }) => (
  <div className="mb3">
    <h4>Federal Financial Partipation (FFP) and Cost Allocation</h4>
    <div className="clearfix mxn1">
      {byYearData.map(({ year, total, ffpLeft, ffpData }) => (
        <div key={year} className="col col-12 sm-col-4 px1">
          <div className="p2 bg-darken-1">
            <div>{year}</div>
            <div className="h3 bold mono">{formatMoney(total)}</div>
            <hr />
            <div className="flex mxn-tiny">
              {ffpData.map(({ id, percent }) => (
                <PercentInput
                  key={id}
                  name={`ffp-fed-${year}`}
                  label={ffpDisplay[id]}
                  wrapperClass="px-tiny"
                  value={percent}
                  onChange={e =>
                    updateActivity(
                      aId,
                      {
                        costFFP: { [year]: { [id]: e.target.value } }
                      },
                      true
                    )
                  }
                />
              ))}
            </div>
            {ffpLeft !== 0 && (
              <div className="mt2 p1 h6 alert alert-error">
                {ffpLeft < 0
                  ? `You're over by ${Math.abs(ffpLeft)}%`
                  : `Please allocate an additional ${ffpLeft}%`}
              </div>
            )}
            <hr />
            <div className="flex mxn-tiny">
              {ffpData.map(({ id, amount }) => (
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

ActivityDetailCostAllocateFFP.propTypes = {
  aId: PropTypes.number.isRequired,
  byYearData: PropTypes.array.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => {
  const activity = byId[aId];
  const totals = getActivityTotals(activity);

  const byYearData = Object.keys(totals).map(year => {
    const total = totals[year];
    const ffp = activity.costFFP[year];

    const ffpLeft = 100 - Object.values(ffp).reduce((a, b) => a + b, 0);
    const ffpData = Object.entries(ffp).map(([id, percent]) => ({
      id,
      percent,
      amount: total * percent / 100
    }));

    return { year, total, ffpLeft, ffpData };
  });

  return { byYearData };
};

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailCostAllocateFFP
);
