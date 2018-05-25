import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { updateActivity as updateActivityAction } from '../actions/activities';
import { PercentInput } from '../components/Inputs';
import { formatMoney } from '../util/formats';

const ffpOptions = [
  { id: 'fed', display: 'Fed' },
  { id: 'state', display: 'State' },
  { id: 'other', display: 'Other' }
];

const ActivityDetailCostAllocateFFP = ({
  aId,
  costFFP,
  totals,
  years,
  updateActivity
}) => (
  <div className="mb3">
    <h4>Federal Financial Partipation (FFP) and Cost Allocation</h4>
    <div className="clearfix mxn1">
      {years.map(year => (
        <div key={year} className="col col-12 sm-col-4 px1">
          <div className="p2 bg-darken-1">
            <div>{year}</div>
            <div className="h3 bold mono">{formatMoney(totals[year])}</div>
            <hr />
            <div className="flex mxn-tiny">
              {ffpOptions.map(({ id, display }) => (
                <PercentInput
                  key={id}
                  name={`ffp-fed-${year}`}
                  label={display}
                  wrapperClass="px-tiny"
                  defaultValue={costFFP[year][id]}
                  onChange={e =>
                    updateActivity(aId, {
                      costFFP: { [year]: { [id]: e.target.value } }
                    })
                  }
                />
              ))}
            </div>
            <hr />
            <div className="flex mxn-tiny">
              {ffpOptions.map(({ id, display }) => (
                <div key={id} className="col-12">
                  <div>{display}</div>
                  <div className="bold mono">
                    {formatMoney(totals[year] * costFFP[year][id] / 100)}
                  </div>
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
  costFFP: PropTypes.object.isRequired,
  totals: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const sumEntriesByYear = (objArr, valFn = v => v) =>
  objArr.reduce((acc, obj) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [year, value] of Object.entries(obj.years)) {
      acc[year] = (acc[year] || 0) + +valFn(value);
    }
    return acc;
  }, {});

const combineTotals = (totals, keys) =>
  keys.reduce((acc, yr) => {
    acc[yr] = totals.map(d => d[yr] || 0).reduce((a, b) => a + b);
    return acc;
  }, {});

const computeActivityGrandTotal = ({
  contractorResources,
  expenses,
  statePersonnel
}) => {
  const statePeepTotal = sumEntriesByYear(statePersonnel, v => v.amt);
  const contractorTotal = sumEntriesByYear(contractorResources);
  const expenseTotal = sumEntriesByYear(expenses);

  const combined = combineTotals(
    [statePeepTotal, contractorTotal, expenseTotal],
    Object.keys(statePeepTotal)
  );

  return combined;
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => {
  const activity = byId[aId];
  const { costFFP } = activity;
  const totals = computeActivityGrandTotal(activity);
  const years = Object.keys(totals);

  return { activity, costFFP, totals, years };
};

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailCostAllocateFFP
);
