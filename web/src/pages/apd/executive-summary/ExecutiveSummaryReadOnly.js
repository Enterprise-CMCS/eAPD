import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import Dollars from '../../../components/Dollars';
import { t } from '../../../i18n';

import {
  selectApdType,
  selectApdYears
} from '../../../redux/selectors/apd.selectors';
import {
  selectBudgetExecutiveSummary,
  selectBudgetGrandTotal
} from '../../../redux/selectors/budget.selectors';
import { ffyList } from '../../../util/apd';
import { APD_TYPE } from '@cms-eapd/common';

import HitechBudgetSummary from './HitechBudgetSummary';
import MmisBudgetSummary from './MmisBudgetSummary';

class ExecutiveSummary extends PureComponent {
  render() {
    const { apdType, budget, data, total, years } = this.props;
    const noYears = !years;

    const rowKeys = [
      ...years.map(year => ({ year, display: t('ffy', { year }) })),
      { year: 'total', display: 'Total' }
    ];

    function renderApdTypeSpecificFields() {
      switch (apdType) {
        case APD_TYPE.HITECH:
          return <HitechBudgetSummary budget={budget} rowKeys={rowKeys} />;
        case APD_TYPE.MMIS:
          return <MmisBudgetSummary budget={budget} rowKeys={rowKeys} />;
        default:
          null;
      }
    }

    return (
      <div>
        <h2>Executive Summary</h2>
        <Fragment>
          <h3 className="ds-u-border--0">Total cost of all activities</h3>
          <ul className="ds-c-list--bare">
            <li className="ds-u-margin-top--1">
              <strong>Federal Fiscal Years requested:</strong> FFY{' '}
              {years.join(', ')}
            </li>
            <li className="ds-u-margin-top--1">
              <strong>Total Computable Medicaid Cost:</strong>{' '}
              <Dollars>{total.medicaid}</Dollars> (
              <Dollars>{total.federal}</Dollars> Federal share)
            </li>
            <li className="ds-u-margin-top--1">
              <strong>Total funding request:</strong>{' '}
              <Dollars>{total.combined}</Dollars>
            </li>
            {Object.entries(total.ffys).map(
              ([ffy, { medicaid, federal, total: ffyTotal }], i) => (
                <li
                  key={ffy}
                  className={
                    i === 0 ? 'ds-u-margin-top--4' : 'ds-u-margin-top--1'
                  }
                >
                  <strong>FFY {ffy}:</strong> <Dollars>{ffyTotal}</Dollars> |{' '}
                  <strong>Total Computable Medicaid Cost:</strong>{' '}
                  <Dollars>{medicaid}</Dollars> (<Dollars>{federal}</Dollars>{' '}
                  Federal share)
                </li>
              )
            )}
          </ul>
        </Fragment>
        <hr className="section-rule ds-u-margin-top--5 ds-u-margin-bottom--3" />
        {data.map((activity, i) => (
          <Fragment key={activity.activityId}>
            <h2>{`Activity ${i + 1}: ${
              activity.name || t('activities.noNameYet')
            }`}</h2>
            {activity.summary && (
              /* eslint-disable react/no-danger */
              <p dangerouslySetInnerHTML={{ __html: activity.summary }} />
            )}

            <ul className="ds-c-list--bare">
              <li className="ds-u-margin-top--3 ds-u-margin-bottom--1">
                <strong>Start date - End date:</strong> {activity.dateRange}
              </li>
              <li className="ds-u-margin-y--1">
                <strong>Total cost of activity:</strong>{' '}
                <Dollars>{activity.combined}</Dollars>
              </li>
              <li className="ds-u-margin-top--1 ds-u-margin-bottom--3">
                <strong>Total Computable Medicaid Cost:</strong>{' '}
                <Dollars>{activity.medicaid}</Dollars> (
                <Dollars>{activity.federal}</Dollars> Federal share)
              </li>
              {!noYears && ffyList(activity.ffys)}
            </ul>
            {i + 1 != data.length && (
              <hr className="subsection-rule ds-u-margin-y--4" />
            )}
          </Fragment>
        ))}
        <hr className="section-rule ds-u-margin-y--5" />
        <h2>Program Budget Tables</h2>
        {renderApdTypeSpecificFields()}
      </div>
    );
  }
}

ExecutiveSummary.propTypes = {
  apdType: PropTypes.string,
  budget: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  apdType: selectApdType(state),
  budget: state.budget,
  data: selectBudgetExecutiveSummary(state),
  total: selectBudgetGrandTotal(state),
  years: selectApdYears(state)
});

export default connect(mapStateToProps, null)(ExecutiveSummary);

export { ExecutiveSummary as plain, mapStateToProps };
