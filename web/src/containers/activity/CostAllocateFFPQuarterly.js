import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateActivity } from '../../actions/activities';
import { ariaQueueAnnouncement, ariaAnnounce } from '../../actions/aria';
import Dollars from '../../components/Dollars';
import { PercentInput } from '../../components/Inputs';
import { t } from '../../i18n';
import { makeSelectCostAllocateFFPBudget } from '../../reducers/activities.selectors';
import { getAriaQueuedAnnouncement } from '../../reducers/aria';
import { formatPerc } from '../../util/formats';

const QUARTERS = [1, 2, 3, 4];
const EXPENSE_NAME_DISPLAY = {
  state: t('activities.costAllocate.quarterly.expenseNames.state'),
  contractors: t('activities.costAllocate.quarterly.expenseNames.contractor'),
  combined: t('activities.costAllocate.quarterly.expenseNames.combined')
};

class CostAllocateFFPQuarterly extends Component {
  componentDidUpdate = (prevProps) => {
    const { ariaQueuedMessage } = this.props;
    // Don't announce the same message more than once
    if (ariaQueuedMessage.quarterlyFFP && ariaQueuedMessage !== prevProps.ariaQueuedMessage) {
      const { announce, quarterlyFFP } = this.props;
      const year = Object.keys(ariaQueuedMessage.quarterlyFFP)[0];
      const q = Object.keys(ariaQueuedMessage.quarterlyFFP[year])[0];
      const name = Object.keys(ariaQueuedMessage.quarterlyFFP[year][q])[0];
      announce(quarterlyFFP[year][q][name].dollars);
    } else if (ariaQueuedMessage === prevProps.ariaQueuedMessage) {
      // Don't keep the old message hanging around in state
      const { queue } = this.props;
      queue('');
    }
  }

  handleChange = (year, q, name) => e => {
    // Keep percent as 0-100 here because the activity state
    // uses Big Percents, and this action updates the
    // activity state.  The budget state update is triggered
    // afterwards.
    const change = {
      quarterlyFFP: {
        [year]: { [q]: { [name]: +e.target.value } }
      }
    };
    const { aKey, update, queue } = this.props;
    update(aKey, change, true);
    // queue the change for AriaAnnounce
    queue(change);
  };

  render() {
    const { aKey, quarterlyFFP, year, years } = this.props;

    // Wait until the budget is ready
    if (!quarterlyFFP) return null;

    return (
      <Fragment>
        <table className="budget-table" key={year}>
          <caption className="ds-u-visibility--screen-reader">
            Enter the federal fiscal year { year } quarterly breakdown by percentage.
          </caption>
          <thead>
            <tr>
              <th>
                <span aria-hidden="true">
                  {t('ffy', { year })}
                </span>
              </th>
              <Fragment key={year}>
                {QUARTERS.map(q => (
                  <th
                    key={q}
                    scope="col"
                    className="ds-u-text-align--right"
                  >
                    <span className="ds-u-visibility--screen-reader">
                      {t('ffy', { year })} 
                    </span>
                    {t('table.quarter', { q })}
                  </th>
                ))}
                <th
                  scope="col"
                  className="budget-table--subtotal ds-u-text-align--right"
                >
                  <span className="ds-u-visibility--screen-reader">
                    {t('ffy', { year })} 
                  </span>
                  {t('table.subtotal')}
                </th>
              </Fragment>
            </tr>
          </thead>
          <tbody>
            {['state', 'contractors'].map(name => (
              <Fragment key={name}>
                <tr key={name}>
                  <th
                    rowSpan="2"
                    scope="row"
                  >
                    {EXPENSE_NAME_DISPLAY[name]}
                  </th>
                  <Fragment key={year}>
                    {QUARTERS.map(q => (
                      <td key={q}>
                        <PercentInput
                          name={`ffp-${aKey}-${year}-${q}-${name}`}
                          label={`federal share for ffy ${year}, quarter ${q}, ${name}`}
                          wrapperClass="budget-table--input-holder"
                          className="budget-table--input__number"
                          onChange={this.handleChange(year, q, name)}
                          value={quarterlyFFP[year][q][name].percent * 100}
                          hideLabel
                          aria-controls={`ffp-${aKey}-${year}-${q}-${name}-dollar-equivalent`}
                        />
                      </td>
                    ))}
                    <td className="budget-table--number budget-table--subtotal">
                      {formatPerc(
                        quarterlyFFP[year].subtotal[name].percent
                      )}
                    </td>
                  </Fragment>
                </tr>
                <tr>
                  <Fragment key={year}>
                    {QUARTERS.map(q => (
                      <td
                        className="budget-table--number"
                        key={q}
                      >
                        <Dollars>
                          {quarterlyFFP[year][q][name].dollars}
                        </Dollars>
                      </td>
                    ))}
                    <td className="budget-table--number budget-table--subtotal">
                      <Dollars>
                        {quarterlyFFP[year].subtotal[name].dollars}
                      </Dollars>
                    </td>
                  </Fragment>
                </tr>
              </Fragment>
            ))}
            <tr className="budget-table--row__highlight">
              <th
                scope="row"
                className="budget-table--total"
              >
                {EXPENSE_NAME_DISPLAY.combined}
              </th>
              <Fragment key={year}>
                {QUARTERS.map(q => (
                  <td
                    className="budget-table--number budget-table--total"
                    key={q}
                  >
                    <Dollars>
                      {quarterlyFFP[year][q].combined.dollars}
                    </Dollars>
                  </td>
                ))}
                <td
                  className="budget-table--number budget-table--subtotal"
                >
                  <Dollars>
                    {quarterlyFFP[year].subtotal.combined.dollars}
                  </Dollars>
                </td>
              </Fragment>
            </tr>
          </tbody>
        </table>
        {year === years[years.length - 1] &&
          <Fragment>
            <hr />
            <h6 className="ds-h3">{`Total FFY ${years[0]} - ${years[years.length - 1]}`}</h6>
            {['state', 'contractors'].map(name => (
              <Fragment key={name}>
                  <p className="ds-h5">{EXPENSE_NAME_DISPLAY[name]}</p>
                  <p><Dollars long>{quarterlyFFP.total[name]}</Dollars></p>
              </Fragment>
            ))}
            <p className="ds-h5">{EXPENSE_NAME_DISPLAY.combined}</p>
            <p><Dollars long>{quarterlyFFP.total.combined}</Dollars></p>
          </Fragment>
        }
      </Fragment>
    );
  }
}

CostAllocateFFPQuarterly.propTypes = {
  aKey: PropTypes.string.isRequired,
  quarterlyFFP: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  year: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  queue: PropTypes.func.isRequired,
  announce: PropTypes.func.isRequired,
  ariaQueuedMessage: PropTypes.object,
};

CostAllocateFFPQuarterly.defaultProps = {
  ariaQueuedMessage: {
    "quarterlyFFP": null
  },
}

const makeMapStateToProps = () => {
  const selectCostAllocateFFPBudget = makeSelectCostAllocateFFPBudget();
  const mapStateToProps = (state, props) => ({
    ariaQueuedMessage: getAriaQueuedAnnouncement(state),
    ...selectCostAllocateFFPBudget(state, props)
  });
  return mapStateToProps;
};

const mapDispatchToProps = {
  update: updateActivity,
  queue: ariaQueueAnnouncement,
  announce: ariaAnnounce
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CostAllocateFFPQuarterly);
