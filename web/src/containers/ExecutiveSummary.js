import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ExecutiveSummaryBudget from './ExecutiveSummaryBudget';
import { expandActivitySection } from '../actions/activities';
import { Section, Subsection } from '../components/Section';
import { t } from '../i18n';
import { aggregateByYear, getActivityTotals } from '../reducers/activities';
import { addObjVals } from '../util';
import { formatMoney } from '../util/formats';

const ExecutiveSummary = ({ data, years, expandSection }) => (
  <Section id="executive-summary" resource="executiveSummary">
    <Subsection
      id="executive-summary-overview"
      resource="executiveSummary.summary"
    >
      {data.map((d, i) => (
        <div
          key={d.id}
          className="mb2 md-flex items-center alert alert-success"
        >
          <div className="p2 sm-m0 flex-auto">
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
          <div className="md-flex md-col-7">
            {years.map(year => (
              <div key={year} className="px2 py3 flex-auto">
                <div className="h5">{t('ffy', { year })}</div>
                <div className="h3 mono bold">
                  {formatMoney(d.totals[year])}
                </div>
              </div>
            ))}
            <div className="px2 py3 flex-auto">
              <div className="h5">{t('executiveSummary.total')}</div>
              <div className="h3 mono bold">{formatMoney(d.combined)}</div>
            </div>
          </div>
        </div>
      ))}
    </Subsection>
    <Subsection
      id="executive-summary-budget-table"
      resource="executiveSummary.budgetTable"
    >
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

  const data = activitiesArray.map(a => {
    const { id, name, descShort } = a;
    const totals = getActivityTotals(a);

    return {
      id,
      name,
      descShort,
      totals,
      combined: addObjVals(totals)
    };
  });

  const allTotals = aggregateByYear(data.map(d => d.totals), apd.data.years);

  data.push({
    id: 'all',
    name: 'Total Cost',
    descShort: null,
    totals: allTotals,
    combined: addObjVals(allTotals)
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
