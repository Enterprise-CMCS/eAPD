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
    <div className="table-frozen-wrapper">
      <div className="table-frozen-scroller">
        <table className="table-cms table-fixed table-frozen-left-pane" aria-hidden="true">
          <thead>
            <tr>
              <th className="table-frozen-null-cell">
                " "
              </th>
            </tr>
            <tr>
              <th className="table-frozen-null-cell">
                " "
                <br />
                " "
              </th>
            </tr>
            <tr>
              <th className="table-frozen-null-cell">
                " "
              </th>
            </tr>
          </thead>
          <tbody>
            {years.map(year => {
            const totals = rollup(previousActivityExpenses[year]);
            return (
              <tr>
                <th className="table-frozen-input-header" key={year}>
                  {t('ffy', { year })}
                </th>
                <td>
                  <DollarInput
                    hideLabel
                    wrapperClass="m0"
                    className="fake-spacer-input m0 input input-condensed mono right-align"
                    label="null"
                  />
                </td>

              </tr>
            )})}
          </tbody>
        </table>
        <table className="table-cms table-fixed table-frozen-data" style={{ minWidth: 1200 }}>
          <thead>
            <tr>
              <th style={{ width: 140 }} id="prev_act_hit_header_null1" />
              {Object.values(programs).map((name, i) => (
                <th
                  key={name}
                  colSpan={4}
                  className={`bg-${colors[i]} center`}
                  id={`prev_act_hit_${name.toLowerCase()}`}
                >
                  {name}
                </th>
              ))}
              <th
                colSpan={6}
                className={`bg-${colors[2]} center`}
                id="prev_act_hit_combined"
              >
                {t('program.combined', i18nBase)}
              </th>
            </tr>
            <tr>
              <th id="prev_act_hit_header_null2" />
              {[...Array(3)].map((_, i) => (
                <Fragment key={i}>
                  <th
                    colSpan="2"
                    className="pre-line"
                    id={`prev_act_hit_federal_${i}`}
                  >
                    {t('labels.federalShare', i18nBase)}
                  </th>
                  <th
                    colSpan="2"
                    className="pre-line"
                    id={`prev_act_hit_state_${i}`}
                  >
                    {t('labels.stateShare', i18nBase)}
                  </th>
                </Fragment>
              ))}
              <th colSpan="2" className="pre-line" id="prev_act_hit_total">
                {t('labels.grandTotal', i18nBase)}
              </th>
            </tr>
            <tr>
              <th id="prev_act_hit_header_null3" />
              {[...Array(3)].map((_, i) => (
                <Fragment key={i}>
                  <th
                    className={`bg-${colors[i]}-light`}
                    id={`prev_activity_header${i * 4 + 0}`}
                  >
                    {t('labels.approved', i18nBase)}
                  </th>
                  <th
                    className={borderClass(-1)}
                    id={`prev_activity_header${i * 4 + 1}`}
                  >
                    {t('labels.actual', i18nBase)}
                  </th>
                  <th
                    className={`bg-${colors[i]}-light`}
                    id={`prev_activity_header${i * 4 + 2}`}
                  >
                    {t('labels.approved', i18nBase)}
                  </th>
                  <th id={`prev_activity_header${i * 4 + 3}`}>
                    {t('labels.actual', i18nBase)}
                  </th>
                </Fragment>
              ))}
              <th className={`bg-${colors[2]}-light`} id="prev_activity_header12">
                {t('labels.approved', i18nBase)}
              </th>
              <th id="prev_activity_header13">{t('labels.actual', i18nBase)}</th>
            </tr>
          </thead>
          <tbody>
            {years.map(year => {
              const totals = rollup(previousActivityExpenses[year]);

              return (
                <tr key={year} className="align-middle">
                  <th id={`prev_act_hit_row_${year}`}>{t('ffy', { year })}</th>
                  {Object.keys(programs).map((program, i) => (
                    <Fragment key={program}>
                      <td
                        headers={`prev_act_hit_row_${year} prev_act_hit_${program} prev_act_hit_federal_${i} prev_activity_header${i *
                          4 +
                          0}`}
                      >
                        <DollarInput
                          name={`approved-federal-${program}-${year}`}
                          label={`approved federal share for ${program}, FFY ${year}`}
                          hideLabel
                          wrapperClass="m0"
                          className="m0 input input-condensed mono right-align"
                          value={
                            previousActivityExpenses[year][program]
                              .federalApproved
                          }
                          onChange={handleChange(
                            year,
                            program,
                            'federalApproved'
                          )}
                        />
                      </td>
                      <td
                        headers={`prev_act_hit_row_${year} prev_act_hit_${program} prev_act_hit_federal_${i} prev_activity_header${i *
                          4 +
                          1}`}
                      >
                        <DollarInput
                          name={`actual-federal-${program}-${year}`}
                          label={`actual federal share for ${program}, FFY ${year}`}
                          hideLabel
                          wrapperClass="m0"
                          className="m0 input input-condensed mono right-align"
                          value={
                            previousActivityExpenses[year][program].federalActual
                          }
                          onChange={handleChange(year, program, 'federalActual')}
                        />
                      </td>
                      <td
                        headers={`prev_act_hit_row_${year} prev_act_hit_${program} prev_act_hit_state_${i} prev_activity_header${i *
                          4 +
                          2}`}
                      >
                        <DollarInput
                          name={`approved-state-${program}-${year}`}
                          label={`approved state share for ${program}, FFY ${year}`}
                          hideLabel
                          wrapperClass="m0"
                          className="m0 input input-condensed mono right-align"
                          value={
                            previousActivityExpenses[year][program].stateApproved
                          }
                          onChange={handleChange(year, program, 'stateApproved')}
                        />
                      </td>
                      <td
                        headers={`prev_act_hit_row_${year} prev_act_hit_${program} prev_act_hit_state_${i} prev_activity_header${i *
                          4 +
                          3}`}
                      >
                        <DollarInput
                          name={`actual-state-${program}-${year}`}
                          label={`actual state share for ${program}, FFY ${year}`}
                          hideLabel
                          wrapperClass="m0"
                          className="m0 input input-condensed mono right-align"
                          value={
                            previousActivityExpenses[year][program].stateActual
                          }
                          onChange={handleChange(year, program, 'stateActual')}
                        />
                      </td>
                    </Fragment>
                  ))}
                  <td
                    headers={`prev_act_hit_row_${year} prev_act_hit_combined prev_act_hit_federal_2 prev_activity_header8`}
                  >
                    {formatMoney(totals.combined.federalApproved)}
                  </td>
                  <td
                    headers={`prev_act_hit_row_${year} prev_act_hit_combined prev_act_hit_federal_2 prev_activity_header9`}
                  >
                    {formatMoney(totals.combined.federalActual)}
                  </td>
                  <td
                    headers={`prev_act_hit_row_${year} prev_act_hit_combined prev_act_hit_state_2 prev_activity_header10`}
                  >
                    {formatMoney(totals.combined.stateApproved)}
                  </td>
                  <td
                    headers={`prev_act_hit_row_${year} prev_act_hit_combined prev_act_hit_state_2 prev_activity_header11`}
                  >
                    {formatMoney(totals.combined.stateActual)}
                  </td>
                  <td
                    headers={`prev_act_hit_row_${year} prev_act_hit_combined prev_act_hit_total prev_activity_header12`}
                  >
                    {formatMoney(totals.total.approved)}
                  </td>
                  <td
                    headers={`prev_act_hit_row_${year} prev_act_hit_combined prev_act_hit_total prev_activity_header13`}
                  >
                    {formatMoney(totals.total.actual)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ApdPreviousActivityTable.propTypes = {
  previousActivityExpenses: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd: { data: { previousActivityExpenses } } }) => ({
  previousActivityExpenses
});

const mapDispatchToProps = { updateApd };

export default connect(mapStateToProps, mapDispatchToProps)(
  ApdPreviousActivityTable
);

export {
  ApdPreviousActivityTable as plain,
  mapStateToProps,
  mapDispatchToProps
};
