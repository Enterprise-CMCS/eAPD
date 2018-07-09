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
    <div className="overflow-auto">
      <table className="table-cms table-fixed" style={{ minWidth: 1200 }}>
        <thead>
          <tr>
            <th style={{ width: 90 }} />
            <th colSpan={14} className="bg-aqua center">
              {t('program.mmis', i18nBase)}
            </th>
          </tr>
          <tr>
            <th />
            <th colSpan="2" className="pre-line">
              {t('labels.federalShare', i18nBase)}
            </th>
            <th colSpan="2" className="pre-line">
              {t('labels.stateShare', i18nBase)}
            </th>
            <th colSpan="2" className="pre-line">
              {t('labels.federalShare75', i18nBase)}
            </th>
            <th colSpan="2" className="pre-line">
              {t('labels.stateShare25', i18nBase)}
            </th>
            <th colSpan="2" className="pre-line">
              {t('labels.federalShare50', i18nBase)}
            </th>
            <th colSpan="2" className="pre-line">
              {t('labels.stateShare50', i18nBase)}
            </th>
            <th colSpan="2" className="pre-line">
              {t('labels.grandTotal', i18nBase)}
            </th>
          </tr>
          <tr>
            <th />
            <th className="bg-aqua-light">{t('labels.approved', i18nBase)}</th>
            <th className={borderClass(-1)}>{t('labels.actual', i18nBase)}</th>
            <th className="bg-aqua-light">{t('labels.approved', i18nBase)}</th>
            <th>{t('labels.actual', i18nBase)}</th>
            <th className="bg-aqua-light">{t('labels.approved', i18nBase)}</th>
            <th className={borderClass(-1)}>{t('labels.actual', i18nBase)}</th>
            <th className="bg-aqua-light">{t('labels.approved', i18nBase)}</th>
            <th>{t('labels.actual', i18nBase)}</th>
            <th className="bg-aqua-light">{t('labels.approved', i18nBase)}</th>
            <th className={borderClass(-1)}>{t('labels.actual', i18nBase)}</th>
            <th className="bg-aqua-light">{t('labels.approved', i18nBase)}</th>
            <th>{t('labels.actual', i18nBase)}</th>
            <th className="bg-aqua-light">{t('labels.approved', i18nBase)}</th>
            <th>{t('labels.actual', i18nBase)}</th>
          </tr>
        </thead>
        <tbody>
          {years.map(year => {
            const total = rollup(previousActivityExpenses[year]);

            return (
              <tr key={year} className="align-middle">
                <th>{t('ffy', { year })}</th>
                {[[90, 10], [75, 25], [50, 50]].map(
                  ([federalShare, stateShare]) => (
                    <Fragment key={`${federalShare}-${stateShare}`}>
                      <td>
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
                      <td>
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
                      <td>
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
                      <td>
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
                <td>{formatMoney(total.approved)}</td>
                <td>{formatMoney(total.actual)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
