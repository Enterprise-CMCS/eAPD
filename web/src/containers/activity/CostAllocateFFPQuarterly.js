import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateActivity } from '../../actions/activities';
import Dollars from '../../components/Dollars';
import { PercentInput } from '../../components/Inputs';
import { t } from '../../i18n';
import { makeSelectCostAllocateFFPBudget } from '../../reducers/activities.selectors';
import { formatPerc } from '../../util/formats';

const QUARTERS = [1, 2, 3, 4];
const EXPENSE_NAME_DISPLAY = {
  state: t('activities.costAllocate.quarterly.expenseNames.state'),
  contractors: t('activities.costAllocate.quarterly.expenseNames.contractor'),
  combined: t('activities.costAllocate.quarterly.expenseNames.combined')
};

class CostAllocateFFPQuarterly extends Component {
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
    const { aKey, update } = this.props;
    update(aKey, change, true);
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
                  >
                    <span className="ds-u-visibility--screen-reader">
                      {t('ffy', { year })} 
                    </span>
                    {t('table.quarter', { q })}
                  </th>
                ))}
                <th
                  scope="col"
                  className="budget-table--subtotal"
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
                        role="region"
                        id={`ffp-${aKey}-${year}-${q}-${name}-dollar-equivalent`}
                        aria-live="polite"
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
            <tr>
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
                  <p className="ds-h4">{EXPENSE_NAME_DISPLAY[name]}</p>
                  <p><Dollars long>{quarterlyFFP.total[name]}</Dollars></p>
              </Fragment>
            ))}
            <p className="ds-h4">{EXPENSE_NAME_DISPLAY.combined}</p>
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
  update: PropTypes.func.isRequired
};

const makeMapStateToProps = () => {
  const selectCostAllocateFFPBudget = makeSelectCostAllocateFFPBudget();
  const mapStateToProps = (state, props) =>
    selectCostAllocateFFPBudget(state, props);
  return mapStateToProps;
};

const mapDispatchToProps = { update: updateActivity };

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CostAllocateFFPQuarterly);
