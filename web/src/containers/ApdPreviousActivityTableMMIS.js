import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DollarField from '../components/DollarField';
import Dollars from '../components/Dollars';
import {
  setPreviousActivityApprovedExpenseforMMIS50FFP,
  setPreviousActivityApprovedExpenseforMMIS75FFP,
  setPreviousActivityApprovedExpenseforMMIS90FFP,
  setPreviousActivityFederalActualExpenseforMMIS50FFP,
  setPreviousActivityFederalActualExpenseforMMIS75FFP,
  setPreviousActivityFederalActualExpenseforMMIS90FFP
} from '../actions/editApd';
import { TABLE_HEADERS } from '../constants';

const ApdPreviousActivityTableMMIS = () => {
  const dispatch = useDispatch();

  const previousActivityExpenses = useSelector(
    state => state.apd.data.previousActivityExpenses
  );

  const years = Object.keys(previousActivityExpenses);

  const getActualsHandler = (year, ffp) => {
    switch (+ffp) {
      case 50:
        return ({ target: { value } }) => {
          dispatch(
            setPreviousActivityFederalActualExpenseforMMIS50FFP(year, value)
          );
        };

      case 75:
        return ({ target: { value } }) => {
          dispatch(
            setPreviousActivityFederalActualExpenseforMMIS75FFP(year, value)
          );
        };

      case 90:
        return ({ target: { value } }) => {
          dispatch(
            setPreviousActivityFederalActualExpenseforMMIS90FFP(year, value)
          );
        };

      default:
        return () => {};
    }
  };

  const getApprovedHandler = (year, ffp) => {
    switch (+ffp) {
      case 50:
        return ({ target: { value } }) => {
          dispatch(setPreviousActivityApprovedExpenseforMMIS50FFP(year, value));
        };

      case 75:
        return ({ target: { value } }) => {
          dispatch(setPreviousActivityApprovedExpenseforMMIS75FFP(year, value));
        };

      case 90:
        return ({ target: { value } }) => {
          dispatch(setPreviousActivityApprovedExpenseforMMIS90FFP(year, value));
        };

      default:
        return () => {};
    }
  };

  return (
    <Fragment>
      <h4 className="ds-h4" aria-hidden="true">
        MMIS
      </h4>
      {[90, 75, 50].map(level => (
        <table key={level} className="budget-table">
          <caption className="ds-h4 ds-u-visibility--screen-reader">
            MMIS {TABLE_HEADERS.federal(level)}
          </caption>
          <thead>
            <tr>
              <th id="prev_act_mmis_ffy">
                <span className="ds-u-visibility--screen-reader">Year</span>
              </th>
              <th id={`prev_act_mmis${level}_total`}>{TABLE_HEADERS.total}</th>
              <th colSpan="2" id={`prev_act_mmis${level}_federal`}>
                {TABLE_HEADERS.federal(level)}
              </th>
            </tr>
            <tr>
              <th aria-hidden="true" />
              <th
                id={`prev_act_mmis${level}_total_approved`}
                className="ds-u-text-align--right"
              >
                {TABLE_HEADERS.approved}
              </th>

              <th
                id={`prev_act_mmis${level}_federal_approved`}
                className="ds-u-text-align--right"
              >
                {TABLE_HEADERS.approved}
              </th>
              <th
                id={`prev_act_mmis${level}_federal_actual`}
                className="ds-u-text-align--right"
              >
                {TABLE_HEADERS.actual}
              </th>
            </tr>
          </thead>
          <tbody>
            {years.map(year => {
              const expenses = previousActivityExpenses[year].mmis[level];
              const federalApproved = (expenses.totalApproved * level) / 100;

              return (
                <tr key={year}>
                  <th id={`prev_act_mmis_row_${year}`}>
                    {TABLE_HEADERS.ffy(year)}
                  </th>
                  <td
                    headers={`prev_act_mmis_row_${year} prev_act_mmis${level}_total prev_act_mmis${level}_total_approved`}
                  >
                    <DollarField
                      className="budget-table--input-holder"
                      fieldClassName="budget-table--input__number"
                      label={`total approved funding for MMIS at the ${level}/${100 -
                        level} level for FFY ${year}, state plus federal`}
                      labelClassName="sr-only"
                      name={`approved-total-mmis${level}-${year}`}
                      value={expenses.totalApproved}
                      onChange={getApprovedHandler(year, level)}
                    />
                  </td>

                  <td
                    headers={`prev_act_mmis_row_${year} prev_act_mmis${level}_federal prev_act_mmis${level}_federal_approved`}
                    className="budget-table--number"
                  >
                    <Dollars>{federalApproved}</Dollars>
                  </td>

                  <td
                    headers={`prev_act_mmis_row_${year} prev_act_mmis${level}_federal prev_act_mmis${level}_federal_actual`}
                  >
                    <DollarField
                      className="budget-table--input-holder"
                      fieldClassName="budget-table--input__number"
                      label={`actual federal share for MMIS at the ${level}/${100 -
                        level} level for FFY ${year}`}
                      labelClassName="sr-only"
                      name={`actual-federal-mmis${level}-${year}`}
                      value={expenses.federalActual}
                      onChange={getActualsHandler(year, level)}
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

export default ApdPreviousActivityTableMMIS;
