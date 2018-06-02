import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Section, Subsection } from '../components/Section';
import StayTuned from '../components/StayTuned';
import { aggregateByYear, getActivityTotals } from '../reducers/activities';
import { formatMoney } from '../util/formats';

const ExecutiveSummary = ({ data, years }) => (
  <Section id="executive-summary" resource="executiveSummary">
    <Subsection resource="executiveSummary.summary">
      {data.map((d, i) => (
        <div
          key={d.id}
          className="mb2 p2 sm-flex items-center alert alert-success"
        >
          <div className="p1 sm-m0 flex-auto">
            {d.id !== 'all' && <div className="h5">Activity {i + 1}</div>}
            <div className="h3 bold">{d.name}</div>
          </div>
          <div className="sm-flex sm-col-5">
            {years.map(year => (
              <div key={year} className="p1 flex-auto">
                <div className="h5">FFY {year}</div>
                <div className="h3 mono bold">
                  {formatMoney(d.totals[year])}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Subsection>
    <Subsection resource="executiveSummary.budgetTable">
      <StayTuned />
    </Subsection>
  </Section>
);

ExecutiveSummary.propTypes = {
  data: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = ({ activities, apd }) => {
  const activitiesArray = Object.values(activities.byId);

  const data = activitiesArray.map(a => ({
    id: a.id,
    name: a.name,
    totals: getActivityTotals(a)
  }));

  data.push({
    id: 'all',
    name: 'Total Cost',
    totals: aggregateByYear(data.map(d => d.totals))
  });

  return {
    data,
    years: apd.data.years
  };
};

export default connect(mapStateToProps)(ExecutiveSummary);
