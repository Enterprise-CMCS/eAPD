import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { formatMoney } from '../util/formats';
import { DollarInput } from '../components/Inputs';
import { updateApd } from '../actions/apd';
import { t } from '../i18n';

const i18nBase = { scope: 'previousActivities.actualExpenses.table' };

const borderClass = i => `border-left border-${i < 0 ? 'gray' : 'aqua'}`;

const rollup = previous => {
  const total = {
    actual: previous.mmis.federalActual + previous.mmis.stateActual,
    approved: previous.mmis.federalApproved + previous.mmis.stateApproved
  };
  return total;
};

const ApdPreviousActivityTableMMIS = ({
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
    <div className="table-frozen-wrapper table-frozen-narrow-header">
      <div className="table-frozen-scroller">
        <table className="table-cms table-fixed table-frozen-left-pane" aria-hidden="true">
          <thead>
            <tr>
              <th className="table-frozen-null-cell">
                --
              </th>
            </tr>
            <tr>
              <th className="table-frozen-null-cell">
                --
                <br />
                --
              </th>
            </tr>
            <tr>
              <th className="table-frozen-null-cell">
                --
              </th>
            </tr>
          </thead>
          <tbody>
            {years.map(year => (
              <tr key={`${year}-mmis-fake-row`}>
                <th key={`${year}-mmis-fake-header`}>
                  {t('ffy', { year })}
                </th>
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
        <table className="table-cms table-frozen-data" style={{ minWidth: 1200 }}>
          <thead>
            <tr>
              <th style={{ width: 90 }} id="prev_act_mmis_null1" />
              <th
                colSpan={14}
                className="bg-aqua center"
                id="prev_act_mmis_header"
              >
                {t('program.mmis', i18nBase)}
              </th>
            </tr>
            <tr>
              <th id="prev_act_mmis_null2" />
              <th colSpan="2" className="pre-line" id="prev_act_mmis_federal90">
                {t('labels.federalShare', i18nBase)}
              </th>
              <th colSpan="2" className="pre-line" id="prev_act_mmis_state10">
                {t('labels.stateShare', i18nBase)}
              </th>
              <th colSpan="2" className="pre-line" id="prev_act_mmis_federal75">
                {t('labels.federalShare75', i18nBase)}
              </th>
              <th colSpan="2" className="pre-line" id="prev_act_mmis_state25">
                {t('labels.stateShare25', i18nBase)}
              </th>
              <th colSpan="2" className="pre-line" id="prev_act_mmis_federal50">
                {t('labels.federalShare50', i18nBase)}
              </th>
              <th colSpan="2" className="pre-line" id="prev_act_mmis_state50">
                {t('labels.stateShare50', i18nBase)}
              </th>
              <th colSpan="2" className="pre-line" id="prev_act_mmis_total">
                {t('labels.grandTotal', i18nBase)}
              </th>
            </tr>
            <tr>
              <th id="prev_act_mmis_null3" />

              <th id="prev_act_mmis_fed90approved" className="bg-aqua-light">
                {t('labels.approved', i18nBase)}
              </th>
              <th id="prev_act_mmis_fed90actual" className={borderClass(-1)}>
                {t('labels.actual', i18nBase)}
              </th>
              <th id="prev_act_mmis_state10approved" className="bg-aqua-light">
                {t('labels.approved', i18nBase)}
              </th>
              <th id="prev_act_mmis_state10actual">
                {t('labels.actual', i18nBase)}
              </th>

              <th id="prev_act_mmis_fed75approved" className="bg-aqua-light">
                {t('labels.approved', i18nBase)}
              </th>
              <th id="prev_act_mmis_fed75actual" className={borderClass(-1)}>
                {t('labels.actual', i18nBase)}
              </th>
              <th id="prev_act_mmis_state25approved" className="bg-aqua-light">
                {t('labels.approved', i18nBase)}
              </th>
              <th id="prev_act_mmis_state25actual">
                {t('labels.actual', i18nBase)}
              </th>

              <th id="prev_act_mmis_fed50approved" className="bg-aqua-light">
                {t('labels.approved', i18nBase)}
              </th>
              <th id="prev_act_mmis_fed50actual" className={borderClass(-1)}>
                {t('labels.actual', i18nBase)}
              </th>
              <th id="prev_act_mmis_state50approved" className="bg-aqua-light">
                {t('labels.approved', i18nBase)}
              </th>
              <th id="prev_act_mmis_state50actual">
                {t('labels.actual', i18nBase)}
              </th>

              <th id="prev_act_mmis_totalApproved" className="bg-aqua-light">
                {t('labels.approved', i18nBase)}
              </th>
              <th id="prev_act_mmis_totalActual">
                {t('labels.actual', i18nBase)}
              </th>
            </tr>
          </thead>
          <tbody>
            {years.map(year => {
              const total = rollup(previousActivityExpenses[year]);

              return (
                <tr key={year} className="align-middle">
                  <th id={`prev_act_mmis_row_${year}`}>{t('ffy', { year })}</th>
                  {[[90, 10], [75, 25], [50, 50]].map(
                    ([federalShare, stateShare]) => (
                      <Fragment key={`${federalShare}-${stateShare}`}>
                        <td
                          headers={`prev_act_mmis_row_${year} prev_act_mmis_header prev_act_mmis_federal${federalShare} prev_act_mmis_fed${federalShare}approved`}
                        >
                          <DollarInput
                            name={`approved-federal${federalShare}-mmis-${year}`}
                            label={`approved federal ${federalShare}% share for mmis, FFY ${year}`}
                            hideLabel
                            wrapperClass="m0"
                            className="m0 input input-condensed mono right-align"
                            value={
                              previousActivityExpenses[year].mmis[
                                `federalApproved${federalShare}`
                              ]
                            }
                            onChange={handleChange(
                              year,
                              'mmis',
                              `federalApproved${federalShare}`
                            )}
                          />
                        </td>
                        <td
                          headers={`prev_act_mmis_row_${year} prev_act_mmis_header prev_act_mmis_federal${federalShare} prev_act_mmis_fed${federalShare}actual`}
                        >
                          <DollarInput
                            name={`actual-federal${federalShare}-mmis-${year}`}
                            label={`actual federal ${federalShare}% share for mmis, FFY ${year}`}
                            hideLabel
                            wrapperClass="m0"
                            className="m0 input input-condensed mono right-align"
                            value={
                              previousActivityExpenses[year].mmis[
                                `federalActual${federalShare}`
                              ]
                            }
                            onChange={handleChange(
                              year,
                              'mmis',
                              `federalActual${federalShare}`
                            )}
                          />
                        </td>
                        <td
                          headers={`prev_act_mmis_row_${year} prev_act_mmis_header prev_act_mmis_state${stateShare} prev_act_mmis_state${stateShare}approved`}
                        >
                          <DollarInput
                            name={`approved-state${stateShare}-mmis-${year}`}
                            label={`approved state ${stateShare}% share for mmis, FFY ${year}`}
                            hideLabel
                            wrapperClass="m0"
                            className="m0 input input-condensed mono right-align"
                            value={
                              previousActivityExpenses[year].mmis[
                                `stateApproved${stateShare}`
                              ]
                            }
                            onChange={handleChange(
                              year,
                              'mmis',
                              `stateApproved${stateShare}`
                            )}
                          />
                        </td>
                        <td
                          headers={`prev_act_mmis_row_${year} prev_act_mmis_header prev_act_mmis_state${stateShare} prev_act_mmis_state${stateShare}actual`}
                        >
                          <DollarInput
                            name={`actual-state${stateShare}-mmis-${year}`}
                            label={`actual state ${stateShare}% share for mmis, FFY ${year}`}
                            hideLabel
                            wrapperClass="m0"
                            className="m0 input input-condensed mono right-align"
                            value={
                              previousActivityExpenses[year].mmis[
                                `stateActual${stateShare}`
                              ]
                            }
                            onChange={handleChange(
                              year,
                              'mmis',
                              `stateActual${stateShare}`
                            )}
                          />
                        </td>
                      </Fragment>
                    )
                  )}
                  <td
                    headers={`prev_act_mmis_row_${year} prev_act_mmis_header prev_act_mmis_total prev_act_mmis_totalApproved`}
                  >
                    {formatMoney(total.approved)}
                  </td>
                  <td
                    headers={`prev_act_mmis_row_${year} prev_act_mmis_header prev_act_mmis_total prev_act_mmis_totalActual`}
                  >
                    {formatMoney(total.actual)}
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

ApdPreviousActivityTableMMIS.propTypes = {
  previousActivityExpenses: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd: { data: { previousActivityExpenses } } }) => ({
  previousActivityExpenses
});

const mapDispatchToProps = { updateApd };

export default connect(mapStateToProps, mapDispatchToProps)(
  ApdPreviousActivityTableMMIS
);

export {
  ApdPreviousActivityTableMMIS as plain,
  mapStateToProps,
  mapDispatchToProps
};
