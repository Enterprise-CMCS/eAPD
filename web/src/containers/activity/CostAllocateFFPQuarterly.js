import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateActivity } from '../../actions/activities';
import Dollars from '../../components/Dollars';
import { PercentInput } from '../../components/Inputs';
import { t } from '../../i18n';
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
    const { aKey, quarterlyFFP, years } = this.props;

    // Wait until the budget is ready
    if (!quarterlyFFP) return null;

    return (
      <div>
        {years.map((year) => (
        <div>
            <h3>
              {t('ffy', { year })}
            </h3>
            <table className="table-cms table-fixed">
              <thead>
                <tr>
                  <th
                    id="act_qbudget_null1"
                  />
                  <Fragment key={year}>
                    {QUARTERS.map(q => (
                      <th
                        key={q}
                        className="center"
                        id={`act_qbudget_fy${year}_q${q}`}
                      >
                        {t('table.quarter', { q })}
                      </th>
                    ))}
                    <th
                      className="right-align"
                      id={`act_qbudget_fy${year}_subtotal`}
                    >
                      {t('table.subtotal')}
                    </th>
                  </Fragment>
                </tr>
              </thead>
              <tbody>
                {['state', 'contractors'].map(name => (
                  <Fragment key={name}>
                    <tr
                      key={name}
                      className={`align-middle ${
                        name === 'combined' ? 'bold' : ''
                      }`}
                    >
                      <td rowSpan="2" headers="act_qbudget_null1">
                        {EXPENSE_NAME_DISPLAY[name]}
                      </td>
                      <Fragment key={year}>
                        {QUARTERS.map(q => (
                          <td
                            key={q}
                            className="mono right-align"
                            headers={`act_qbudget_fy${year} act_qbudget_fy${year}_q${q}`}
                          >
                            <PercentInput
                              name={`ffp-${aKey}-${year}-${q}-${name}`}
                              label={`federal share for ffy ${year}, quarter ${q}, ${name}`}
                              wrapperClass="m0"
                              className="m0 input input-condensed mono right-align"
                              onChange={this.handleChange(year, q, name)}
                              value={
                                quarterlyFFP[year][q][name].percent * 100
                              }
                              hideLabel
                            />
                          </td>
                        ))}
                        <td
                          className="bold mono right-align"
                          headers={`act_qbudget_fy${year} act_qbudget_fy${year}_subtotal`}
                        >
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
                            className={`mono right-align ${
                              name === 'combined' ? '' : ''
                            }`}
                            key={q}
                            headers={`act_qbudget_fy${year} act_qbudget_fy${year}_q${q}`}
                          >
                            <Dollars>
                              {quarterlyFFP[year].subtotal[name].dollars}
                            </Dollars>
                          </td>
                        ))}
                        <td
                          className="bold mono right-align"
                          headers={`act_qbudget_fy${year} act_qbudget_fy${year}_subtotal`}
                        >
                          <Dollars>
                            {quarterlyFFP[year].subtotal[name].dollars}
                          </Dollars>
                        </td>
                      </Fragment>
                    </tr>
                  </Fragment>
                ))}
                <tr className="bold">
                  <td>{EXPENSE_NAME_DISPLAY.combined}</td>
                  <Fragment key={year}>
                    {QUARTERS.map(q => (
                      <td
                        className="mono right-align"
                        key={q}
                        headers={`act_qbudget_fy${year} act_qbudget_fy${year}_q${q}`}
                      >
                        <Dollars>
                          {quarterlyFFP[year].subtotal.combined.dollars}
                        </Dollars>
                      </td>
                    ))}
                    <td
                      className="bold mono right-align"
                      headers={`act_qbudget_fy${year} act_qbudget_fy${year}_subtotal`}
                    >
                      <Dollars>
                        {quarterlyFFP[year].subtotal.combined.dollars}
                      </Dollars>
                    </td>
                  </Fragment>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
        <h3>
          {`Total FFY ${years[0]} - ${years[years.length-1]}`}
        </h3>
        <table className="table-cms table-fixed table-fit-contents">
          <thead>
            <tr>
              <th/>
              <th>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {['state', 'contractors'].map(name => (
              <Fragment key={name}>
                <tr
                  key={name}
                  className={`align-middle ${
                    name === 'combined' ? 'bold' : ''
                  }`}
                >
                  <th>
                    {EXPENSE_NAME_DISPLAY[name]}
                  </th>
                  <td
                    className="bold mono right-align"
                  >
                    <Dollars>{quarterlyFFP.total[name]}</Dollars>
                  </td>
                </tr>
              </Fragment>
            ))}
            <tr>
              <th>
                {EXPENSE_NAME_DISPLAY.combined}
              </th>
              <td
                className="bold mono right-align"
              >
                <Dollars>{quarterlyFFP.total.combined}</Dollars>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

CostAllocateFFPQuarterly.propTypes = {
  aKey: PropTypes.string.isRequired,
  quarterlyFFP: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd, budget: { activities } }, { aKey }) => {
  const budget = activities[aKey];

  return {
    quarterlyFFP: budget ? budget.quarterlyFFP : null,
    years: apd.data.years
  };
};

const mapDispatchToProps = { update: updateActivity };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CostAllocateFFPQuarterly);
