import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  setFFPForContractorCostsForFiscalQuarter,
  setFFPForInHouseCostsForFiscalQuarter
} from '../../actions/editActivity';
import { ariaAnnounceFFPQuarterly } from '../../actions/aria';
import Dollars from '../../components/Dollars';
import PercentField from '../../components/PercentField';
import { t } from '../../i18n';
import { makeSelectCostAllocateFFPBudget } from '../../reducers/activities.selectors';
import { formatPerc } from '../../util/formats';

const QUARTERS = [1, 2, 3, 4];
const EXPENSE_NAME_DISPLAY = {
  state: t('activities.costAllocate.quarterly.expenseNames.state'),
  contractors: t('activities.costAllocate.quarterly.expenseNames.contractor'),
  combined: t('activities.costAllocate.quarterly.expenseNames.combined')
};

const CostAllocateFFPQuarterly = ({
  activityIndex,
  aKey,
  announce,
  isViewOnly,
  quarterlyFFP,
  setContractorFFP,
  setInHouseFFP,
  year
}) => {
  const setInHouse = quarter => ({ target: { value } }) => {
    setInHouseFFP(activityIndex, year, quarter, value);
    announce(aKey, year, quarter, 'state');
  };

  const setContractor = quarter => ({ target: { value } }) => {
    setContractorFFP(activityIndex, year, quarter, value);
    announce(aKey, year, quarter, 'contractors');
  };

  // Wait until the budget is ready
  if (!quarterlyFFP) {
    return null;
  }

  return (
    <table className="budget-table" key={year}>
      <caption className="ds-u-visibility--screen-reader">
        Enter the federal fiscal year {year} quarterly breakdown by percentage.
      </caption>
      <thead>
        <tr>
          <th>
            <span aria-hidden="true">{t('ffy', { year })}</span>
          </th>
          <Fragment key={year}>
            {QUARTERS.map(q => (
              <th key={q} scope="col" className="ds-u-text-align--right">
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
        <tr>
          <th rowSpan="2" scope="row">
            {t('activities.costAllocate.quarterly.expenseNames.state')}
          </th>
          {QUARTERS.map(q => (
            <td key={q}>
              {isViewOnly ?
                <p className="budget-table--number">{quarterlyFFP[year][q].state.percent * 100} %</p>
              :
                <PercentField
                className="budget-table--input-holder"
                fieldClassName="budget-table--input__number"
                label={`federal share for ffy ${year}, quarter ${q}, state`}
                labelClassName="sr-only"
                name={`ffp-${activityIndex}-${year}-${q}-state`}
                onChange={setInHouse(q)}
                value={quarterlyFFP[year][q].state.percent * 100}
                aria-controls={`ffp-${activityIndex}-${year}-${q}-state-dollar-equivalent`}
                />
              }
            </td>
          ))}
          <td className="budget-table--number budget-table--subtotal">
            {formatPerc(quarterlyFFP[year].subtotal.state.percent)}
          </td>
        </tr>
        <tr>
          <Fragment key={year}>
            {QUARTERS.map(q => (
              <td className="budget-table--number" key={q}>
                <Dollars>{quarterlyFFP[year][q].state.dollars}</Dollars>
              </td>
            ))}
            <td className="budget-table--number budget-table--subtotal">
              <Dollars>{quarterlyFFP[year].subtotal.state.dollars}</Dollars>
            </td>
          </Fragment>
        </tr>

        <tr>
          <th rowSpan="2" scope="row">
            {t('activities.costAllocate.quarterly.expenseNames.contractor')}
          </th>
          {QUARTERS.map(q => (
            <td key={q}>
              {isViewOnly ?
                <p className="budget-table--number">{quarterlyFFP[year][q].contractors.percent * 100} %</p>
              :
                <PercentField
                  className="budget-table--input-holder"
                  fieldClassName="budget-table--input__number"
                  label={`federal share for ffy ${year}, quarter ${q}, contractors`}
                  labelClassName="sr-only"
                  name={`ffp-${activityIndex}-${year}-${q}-contractors`}
                  onChange={setContractor(q)}
                  value={quarterlyFFP[year][q].contractors.percent * 100}
                  aria-controls={`ffp-${activityIndex}-${year}-${q}-contractors-dollar-equivalent`}
                />
              }
            </td>
          ))}
          <td className="budget-table--number budget-table--subtotal">
            {formatPerc(quarterlyFFP[year].subtotal.contractors.percent)}
          </td>
        </tr>
        <tr>
          <Fragment key={year}>
            {QUARTERS.map(q => (
              <td className="budget-table--number" key={q}>
                <Dollars>{quarterlyFFP[year][q].contractors.dollars}</Dollars>
              </td>
            ))}
            <td className="budget-table--number budget-table--subtotal">
              <Dollars>
                {quarterlyFFP[year].subtotal.contractors.dollars}
              </Dollars>
            </td>
          </Fragment>
        </tr>

        <tr className="budget-table--row__highlight">
          <th scope="row" className="budget-table--total">
            {EXPENSE_NAME_DISPLAY.combined}
          </th>
          <Fragment key={year}>
            {QUARTERS.map(q => (
              <td className="budget-table--number budget-table--total" key={q}>
                <Dollars>{quarterlyFFP[year][q].combined.dollars}</Dollars>
              </td>
            ))}
            <td className="budget-table--number budget-table--subtotal">
              <Dollars>{quarterlyFFP[year].subtotal.combined.dollars}</Dollars>
            </td>
          </Fragment>
        </tr>
      </tbody>
    </table>
  );
};

CostAllocateFFPQuarterly.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  aKey: PropTypes.string.isRequired,
  announce: PropTypes.func.isRequired,
  isViewOnly: PropTypes.bool.isRequired,
  quarterlyFFP: PropTypes.object.isRequired,
  setContractorFFP: PropTypes.func.isRequired,
  setInHouseFFP: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired
};

const makeMapStateToProps = () => {
  const selectCostAllocateFFPBudget = makeSelectCostAllocateFFPBudget();
  const mapStateToProps = (state, props) =>
    selectCostAllocateFFPBudget(state, props);
  return mapStateToProps;
};

const mapDispatchToProps = {
  announce: ariaAnnounceFFPQuarterly,
  setContractorFFP: setFFPForContractorCostsForFiscalQuarter,
  setInHouseFFP: setFFPForInHouseCostsForFiscalQuarter
};

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CostAllocateFFPQuarterly);

export {
  CostAllocateFFPQuarterly as plain,
  makeMapStateToProps,
  mapDispatchToProps
};
