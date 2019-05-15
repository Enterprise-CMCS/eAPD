import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Dollars from '../components/Dollars';
import { DollarInput } from '../components/Inputs';
import { updateApd } from '../actions/apd';
import { TABLE_HEADERS } from '../constants';

const ApdPreviousActivityTableMMIS = ({
  previousActivityExpenses,
  updateApd: dispatchUpdateApd
}) => {
  const years = Object.keys(previousActivityExpenses);

  const handleChange = (year, level, type) => e => {
    const update = {
      previousActivityExpenses: {
        [year]: { mmis: { [level]: { [type]: e.target.value } } }
      }
    };
    dispatchUpdateApd(update);
  };

  return (
    <Fragment>
      <h4 className="ds-h4">MMIS</h4>
      {[90, 75, 50].map((level) => (
        <table key={level} className="table-cms centered-headers table-fixed">
          <thead>
            <tr>
              <th id="prev_act_mmis_null2" />
              <th className="pre-line" id={`prev_act_mmis${level}_total`}>
                {TABLE_HEADERS.total}
              </th>
              <th
                colSpan="2"
                className="pre-line"
                id={`prev_act_mmis${level}_federal`}
              >
                {TABLE_HEADERS.federal(level)}
              </th>
            </tr>
            <tr>
              <th id="prev_act_mmis_null3" />
              <th id={`prev_act_mmis${level}_total_approved`}>
                {TABLE_HEADERS.approved}
              </th>

              <th id={`prev_act_mmis${level}_federal_approved`}>
                {TABLE_HEADERS.approved}
              </th>
              <th id={`prev_act_mmis${level}_federal_actual`}>
                {TABLE_HEADERS.actual}
              </th>
            </tr>
          </thead>
          <tbody>
            {years.map(year => {
              const expenses = previousActivityExpenses[year].mmis[level];
              const federalApproved =
                (expenses.totalApproved * level) / 100;

              return (
                <tr key={year} className="align-middle">
                  <th id={`prev_act_mmis_row_${year}`}>
                    {TABLE_HEADERS.ffy(year)}
                  </th>
                  <td
                    headers={`prev_act_mmis_row_${year} prev_act_mmis${level}_total prev_act_mmis${level}_total_approved`}
                  >
                    <DollarInput
                      name={`approved-total-mmis${level}-${year}`}
                      label={`total approved funding for MMIS at the ${level}/${100 -
                        level} level for FFY ${year}, state plus federal`}
                      hideLabel
                      wrapperClass="m0"
                      className="m0 input input-condensed mono right-align"
                      value={expenses.totalApproved}
                      onChange={handleChange(year, level, 'totalApproved')}
                    />
                  </td>

                  <td
                    headers={`prev_act_mmis_row_${year} prev_act_mmis${level}_federal prev_act_mmis${level}_federal_approved`}
                  >
                    <Dollars>{federalApproved}</Dollars>
                  </td>

                  <td
                    headers={`prev_act_mmis_row_${year} prev_act_mmis${level}_federal prev_act_mmis${level}_federal_actual`}
                  >
                    <DollarInput
                      name={`actual-federal-mmis${level}-${year}`}
                      label={`actual federal share for MMIS at the ${level}/${100 -
                        level} level for FFY ${year}`}
                      hideLabel
                      wrapperClass="m0"
                      className="m0 input input-condensed mono right-align"
                      value={expenses.federalActual}
                      onChange={handleChange(year, level, 'federalActual')}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
    </Fragment>
  );
};

ApdPreviousActivityTableMMIS.propTypes = {
  previousActivityExpenses: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({
  apd: {
    data: { previousActivityExpenses }
  }
}) => ({
  previousActivityExpenses
});

const mapDispatchToProps = { updateApd };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdPreviousActivityTableMMIS);

export {
  ApdPreviousActivityTableMMIS as plain,
  mapStateToProps,
  mapDispatchToProps
};
