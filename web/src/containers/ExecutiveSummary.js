import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ExecutiveSummaryBudget from './ExecutiveSummaryBudget';
import { expandActivitySection } from '../actions/activities';
import { Section, Subsection } from '../components/Section';
import { t } from '../i18n';
import { formatMoney } from '../util/formats';

const ExecutiveSummary = ({ data, years, expandSection }) => (
  <Section id="executive-summary" resource="executiveSummary">
    <Subsection
      id="executive-summary-overview"
      resource="executiveSummary.summary"
    >
      {data.map((d, i) => (
        <div
          key={d.key}
          className="mb2 md-flex items-center alert alert-success"
        >
          <div className="p2 sm-m0 flex-auto">
            {d.key !== 'all' ? (
              <Fragment>
                <div className="h5">
                  {t('activities.namePrefixAndNum', { number: i + 1 })}
                </div>
                <a
                  href={`#activity-${d.key}`}
                  className="h3 bold black"
                  onClick={() => expandSection(d.key)}
                >
                  {d.name || t('activities.noNameYet')}
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

const mapStateToProps = ({
  activities: { byKey },
  apd: { data: { years } },
  budget
}) => {
  const data = Object.entries(byKey).map(([key, { name, descShort }]) => {
    const activityCosts = budget.activities[key].costsByFFY;

    return {
      key,
      name,
      descShort,
      totals: years.reduce(
        (acc, year) => ({ ...acc, [year]: activityCosts[year].total }),
        {}
      ),
      combined: activityCosts.total.total
    };
  });

  data.push({
    key: 'all',
    name: 'Total Cost',
    descShort: null,
    totals: years.reduce(
      (acc, year) => ({ ...acc, [year]: budget.combined[year].total }),
      {}
    ),
    combined: budget.combined.total.total
  });

  return {
    data,
    years
  };
};

const mapDispatchToProps = {
  expandSection: expandActivitySection
};

export default connect(mapStateToProps, mapDispatchToProps)(ExecutiveSummary);

export { ExecutiveSummary as plain, mapStateToProps, mapDispatchToProps };
