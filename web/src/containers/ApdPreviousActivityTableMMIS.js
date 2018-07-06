import PropTypes from 'prop-types';
import React from 'react';
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
            <th colSpan={6} className="bg-aqua center">
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
            <th>{t('labels.actual', i18nBase)}</th>
          </tr>
        </thead>
        <tbody>
          {years.map(year => {
            const total = rollup(previousActivityExpenses[year]);

            return (
              <tr key={year} className="align-middle">
                <th>{t('ffy', { year })}</th>
                <td>
                  <DollarInput
                    name={`approved-federal-mmis-${year}`}
                    label={`approved federal share for mmis, FFY ${year}`}
                    hideLabel
                    wrapperClass="m0"
                    className="m0 input input-condensed mono right-align"
                    value={previousActivityExpenses[year].mmis.federalApproved}
                    onChange={handleChange(year, 'mmis', 'federalApproved')}
                  />
                </td>
                <td>
                  <DollarInput
                    name={`actual-federal-mmis-${year}`}
                    label={`actual federal share for mmis, FFY ${year}`}
                    hideLabel
                    wrapperClass="m0"
                    className="m0 input input-condensed mono right-align"
                    value={previousActivityExpenses[year].mmis.federalActual}
                    onChange={handleChange(year, 'mmis', 'federalActual')}
                  />
                </td>
                <td>
                  <DollarInput
                    name={`approved-state-mmis-${year}`}
                    label={`approved state share for mmis, FFY ${year}`}
                    hideLabel
                    wrapperClass="m0"
                    className="m0 input input-condensed mono right-align"
                    value={previousActivityExpenses[year].mmis.stateApproved}
                    onChange={handleChange(year, 'mmis', 'stateApproved')}
                  />
                </td>
                <td>
                  <DollarInput
                    name={`actual-state-mmis-${year}`}
                    label={`actual state share for mmis, FFY ${year}`}
                    hideLabel
                    wrapperClass="m0"
                    className="m0 input input-condensed mono right-align"
                    value={previousActivityExpenses[year].mmis.stateActual}
                    onChange={handleChange(year, 'mmis', 'stateActual')}
                  />
                </td>
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
