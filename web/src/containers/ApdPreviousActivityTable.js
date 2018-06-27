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
    <div className="overflow-auto">
      <table className="table-cms table-fixed" style={{ minWidth: 1200 }}>
        <thead>
          <tr>
            <th style={{ width: 90 }} />
            {Object.values(programs).map((name, i) => (
              <th key={name} colSpan={4} className={`bg-${colors[i]} center`}>
                {name}
              </th>
            ))}
            <th colSpan={6} className={`bg-${colors[2]} center`}>
              {t('program.combined', i18nBase)}
            </th>
          </tr>
          <tr>
            <th />
            {[...Array(3)].map((_, i) => (
              <Fragment key={i}>
                <th colSpan="2" className="pre-line">
                  {t('labels.federalShare', i18nBase)}
                </th>
                <th colSpan="2" className="pre-line">
                  {t('labels.stateShare', i18nBase)}
                </th>
              </Fragment>
            ))}
            <th colSpan="2" className="pre-line">
              {t('labels.grandTotal', i18nBase)}
            </th>
          </tr>
          <tr>
            <th />
            {[...Array(3)].map((_, i) => (
              <Fragment key={i}>
                <th className={`bg-${colors[i]}-light`}>
                  {t('labels.approved', i18nBase)}
                </th>
                <th className={borderClass(-1)}>
                  {t('labels.actual', i18nBase)}
                </th>
                <th className={`bg-${colors[i]}-light`}>
                  {t('labels.approved', i18nBase)}
                </th>
                <th>{t('labels.actual', i18nBase)}</th>
              </Fragment>
            ))}
            <th className={`bg-${colors[2]}-light`}>
              {t('labels.approved', i18nBase)}
            </th>
            <th>{t('labels.actual', i18nBase)}</th>
          </tr>
        </thead>
        <tbody>
          {years.map(year => {
            const totals = rollup(previousActivityExpenses[year]);

            return (
              <tr key={year} className="align-middle">
                <th>{t('ffy', { year })}</th>
                {Object.keys(programs).map(program => (
                  <Fragment key={program}>
                    <td>
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
                    <td>
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
                    <td>
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
                    <td>
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
                <td>{formatMoney(totals.combined.federalApproved)}</td>
                <td>{formatMoney(totals.combined.federalActual)}</td>
                <td>{formatMoney(totals.combined.stateApproved)}</td>
                <td>{formatMoney(totals.combined.stateActual)}</td>
                <td>{formatMoney(totals.total.approved)}</td>
                <td>{formatMoney(totals.total.actual)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
