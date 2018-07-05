import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ExecutiveSummaryBudget from './ExecutiveSummaryBudget';
import { expandActivitySection } from '../actions/activities';
import { Section, Subsection } from '../components/Section';
import { t } from '../i18n';
import { aggregateByYear, getActivityTotals } from '../reducers/activities';
import { formatMoney } from '../util/formats';

const ExecutiveSummary = ({ data, years, expandSection }) => (
  <Section id="executive-summary" resource="executiveSummary">
    <Subsection resource="executiveSummary.summary">
      {data.map((d, i) => (
        <div
          key={d.id}
          className="mb2 p2 sm-flex items-center alert alert-success"
        >
          <div className="p1 sm-m0 flex-auto">
            {d.id !== 'all' ? (
              <Fragment>
                <div className="h5">
                  {t('activities.namePrefixAndNum', { number: i + 1 })}
                </div>
                <a
                  href={`#activity-${d.id}`}
                  className="h3 bold black"
                  onClick={() => expandSection(d.id)}
                >
                  {d.name}
                </a>
              </Fragment>
            ) : (
              <div className="h3 bold">{d.name}</div>
            )}
            {d.descShort && <div>{d.descShort}</div>}
          </div>
          <div className="sm-flex sm-col-5">
            {years.map(year => (
              <div key={year} className="p1 flex-auto">
                <div className="h5">{t('ffy', { year })}</div>
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
      <ExecutiveSummaryBudget />
    </Subsection>
  </Section>
);

ExecutiveSummary.propTypes = {
  data: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  expandSection: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities, apd }) => {
  const activitiesArray = Object.values(activities.byId);

  const data = activitiesArray.map(a => ({
    id: a.id,
    name: a.name,
    descShort: a.descShort,
    totals: getActivityTotals(a)
  }));

  data.push({
    id: 'all',
    name: 'Total Cost',
    descShort: null,
    totals: aggregateByYear(data.map(d => d.totals), apd.data.years)
  });

  return {
    data,
    years: apd.data.years
  };
};

const mapDispatchToProps = {
  expandSection: expandActivitySection
};

export default connect(mapStateToProps, mapDispatchToProps)(ExecutiveSummary);
