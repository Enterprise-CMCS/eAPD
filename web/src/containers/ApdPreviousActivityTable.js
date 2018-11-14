import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { formatMoney } from '../util/formats';
import { DollarInput } from '../components/Inputs';
import { updateApd } from '../actions/apd';
import { t } from '../i18n';

const i18nBase = { scope: 'previousActivities.actualExpenses.table' };

const programs = {
  hit: t('program.hit', i18nBase),
  hie: t('program.hie', i18nBase)
};
const colors = ['aqua', 'blue', 'navy'];
const borderClass = i => `border-left border-${i < 0 ? 'gray' : colors[i]}`;

const rollup = previous => {
  const totals = {
    combined: {
      federalActual: previous.hie.federalActual + previous.hit.federalActual,
      federalApproved:
        previous.hie.federalApproved + previous.hit.federalApproved,
      stateActual: previous.hie.stateActual + previous.hit.stateActual,
      stateApproved: previous.hie.stateApproved + previous.hit.stateApproved
    },
    total: {
      actual: 0,
      approved: 0
    }
  };
  totals.total.actual =
    totals.combined.federalActual + totals.combined.stateActual;
  totals.total.approved =
    totals.combined.federalApproved + totals.combined.stateApproved;
  return totals;
};

const ApdPreviousActivityTable = ({
  previousActivityExpenses,
  updateApd: dispatchUpdateApd
}) => {
  const years = Object.keys(previousActivityExpenses);

  const handleChange = (year, program, type) => e => {
    const update = {
      previousActivityExpenses: {
        [year]: { [program]: { [type]: e.target.value } }
      }
    };
    dispatchUpdateApd(update);
  };

  return (
    <Fragment>
      <h3>{t('program.combined', i18nBase)}</h3>
      <div className="table-frozen-wrapper table-frozen-narrow-header">
        <div className="table-frozen-scroller">
          <table
            className="table-cms table-fixed table-frozen-left-pane"
            aria-hidden="true"
          >
            <thead>
              <tr>
                <th className="table-frozen-null-cell">--</th>
              </tr>
              <tr>
                <th className="table-frozen-null-cell">--</th>
              </tr>
            </thead>
            <tbody>
              {years.map(year => (
                <tr key={`${year}-fake-row`}>
                  <th key={`${year}-fake-header`}>{t('ffy', { year })}</th>
                  <td>
                    <DollarInput
                      hideLabel
                      wrapperClass="m0"
                      className="fake-spacer-input m0 input input-condensed mono right-align"
                      label="fake-spacer-input"
                      name="fake-spacer-input"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table-cms table-fixed table-frozen-data">
            <thead>
              <tr>
                <th id="prev_act_hit_header_null2" />
                <th
                  colSpan="2"
                  className="pre-line"
                  id="prev_act_hithie_federal"
                >
                  {t('labels.federalShare', i18nBase)}
                </th>
                <th className="pre-line" id="prev_act_hithie_total">
                  {t('labels.grandTotal', i18nBase)}
                </th>
              </tr>
              <tr>
                <th id="prev_act_hit_header_null3" />
                <th id="prev_act_hithie_fed_approved">
                  {t('labels.approved', i18nBase)}
                </th>
                <th className={borderClass(-1)} id="prev_act_hithie_fed_actual">
                  {t('labels.actual', i18nBase)}
                </th>
                <th id="prev_act_hithie_total_approved">
                  {t('labels.approved', i18nBase)}
                </th>
              </tr>
            </thead>
            <tbody>
              {years.map(year => {
                const totals = rollup(previousActivityExpenses[year]);

                return (
                  <tr key={year} className="align-middle">
                    <th id={`prev_act_hit_row_${year}`}>
                      {t('ffy', { year })}
                    </th>

                    <td
                      headers={`prev_act_hit_row_${year} prev_act_hithie_federal prev_act_hithie_fed_approved`}
                    >
                      <DollarInput
                        name={`hithie-approved-federal-${year}`}
                        label={`approved federal share for HIT and HIE for FFY ${year}`}
                        hideLabel
                        wrapperClass="m0"
                        className="m0 input input-condensed mono right-align"
                        value={0}
                        onChange={() => {}}
                      />
                    </td>
                    <td
                      headers={`prev_act_hit_row_${year} prev_act_hithie_federal prev_act_hithie_fed_actual`}
                    >
                      <DollarInput
                        name={`hithie-approved-federal-${year}`}
                        label={`actual federal share for HIT and HIE for FFY ${year}`}
                        hideLabel
                        wrapperClass="m0"
                        className="m0 input input-condensed mono right-align"
                        value={0}
                        onChange={() => {}}
                      />
                    </td>

                    <td
                      headers={`prev_act_hit_row_${year} prev_act_hithie_total prev_act_hithie_total_approved`}
                    >
                      {formatMoney(totals.total.approved)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

ApdPreviousActivityTable.propTypes = {
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
)(ApdPreviousActivityTable);

export {
  ApdPreviousActivityTable as plain,
  mapStateToProps,
  mapDispatchToProps
};
