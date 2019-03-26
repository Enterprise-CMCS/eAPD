import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ExecutiveSummaryBudget from './ExecutiveSummaryBudget';
import Waypoint from './ConnectedWaypoint';
import { expandActivitySection } from '../actions/activities';
import Dollars from '../components/Dollars';
import { Section, Subsection } from '../components/Section';
import { t } from '../i18n';
import { selectApdYears } from '../reducers/apd.selectors';
import { selectBudgetExecutiveSummary } from '../reducers/budget.selectors';

const ExecutiveSummary = ({ data, years, expandSection }) => (
  <Waypoint id="executive-summary-overview">
    <Section isNumbered id="executive-summary" resource="executiveSummary">
      <Waypoint id="executive-summary-summary" />
      <Subsection
        id="executive-summary-summary"
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
                    <Dollars>{d.totals[year]}</Dollars>
                  </div>
                </div>
              ))}
              <div className="px2 py3 flex-auto">
                <div className="h5">{t('executiveSummary.total')}</div>
                <div className="h3 mono bold">
                  <Dollars>{d.combined}</Dollars>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Subsection>

      <Waypoint id="executive-summary-budget-table" />
      <Subsection
        id="executive-summary-budget-table"
        resource="executiveSummary.budgetTable"
      >
        <ExecutiveSummaryBudget />
      </Subsection>
    </Section>
  </Waypoint>
);

ExecutiveSummary.propTypes = {
  data: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  expandSection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: selectBudgetExecutiveSummary(state),
  years: selectApdYears(state)
});

const mapDispatchToProps = {
  expandSection: expandActivitySection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExecutiveSummary);

export { ExecutiveSummary as plain, mapStateToProps, mapDispatchToProps };
