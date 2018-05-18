import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addApdKeyPerson,
  removeApdKeyPerson,
  updateApd as updateApdAction
} from '../actions/apd';
import Collapsible from '../components/Collapsible';
import { Input, Textarea } from '../components/Inputs';
import HelpText from '../components/HelpText';
import { t } from '../i18n';

class ApdKeyPersonnel extends Component {
  handleChange = (idx, key, year) => e => {
    const { value } = e.target;
    const { updateApd } = this.props;

    const toUpdate =
      year !== undefined
        ? { years: { [year]: { [key]: value } } }
        : { [key]: value };

    updateApd({ keyPersonnel: { [idx]: toUpdate } });
  };

  render() {
    const { keyPersonnel, years, addPerson, removePerson } = this.props;

    return (
      <Collapsible title={t('apd.keyPersonnel.title')}>
        <HelpText text="apd.keyPersonnel.helpText" />
        {keyPersonnel.length > 0 && (
          <div className="overflow-auto">
            <table
              className="mb2 h5 table table-condensed table-fixed"
              style={{ minWidth: 700 }}
            >
              <thead>
                <tr>
                  <th className="col-1" />
                  <th className="col-4" />
                  <th className="col-5" />
                  {years.map(year => (
                    <th key={year} className="col-4" colSpan="2">
                      {t('apd.keyPersonnel.labels.yearCost', {
                        year
                      })}
                    </th>
                  ))}
                  <th className="col-1" />
                </tr>
                <tr>
                  <th className="col-1">
                    {t('apd.keyPersonnel.labels.entryNum')}
                  </th>
                  <th className="col-4">
                    {t('apd.keyPersonnel.labels.title')}
                  </th>
                  <th className="col-5">{t('apd.keyPersonnel.labels.desc')}</th>
                  {years.map(year => (
                    <Fragment key={year}>
                      <th>{t('apd.keyPersonnel.labels.costAmt')}</th>
                      <th>{t('apd.keyPersonnel.labels.costPerc')}</th>
                    </Fragment>
                  ))}
                  <th className="col-1" />
                </tr>
              </thead>
              <tbody>
                {keyPersonnel.map((d, i) => (
                  <tr key={d.id}>
                    <td className="mono">{i + 1}.</td>
                    <td>
                      <Input
                        name={`state-person-${d.id}-title`}
                        label={t('apd.keyPersonnel.labels.title')}
                        hideLabel
                        value={d.title}
                        onChange={this.handleChange(i, 'title')}
                      />
                    </td>
                    <td>
                      <Textarea
                        name={`state-person-${d.id}-desc`}
                        label={t('apd.keyPersonnel.labels.desc')}
                        hideLabel
                        rows="3"
                        value={d.desc}
                        onChange={this.handleChange(i, 'desc')}
                      />
                    </td>
                    {years.map(year => (
                      <Fragment key={year}>
                        <td>
                          <Input
                            name={`state-person-${d.id}-${year}-amt`}
                            label={t('apd.keyPersonnel.labels.costAmt')}
                            hideLabel
                            value={d.years[year].amt}
                            onChange={this.handleChange(i, 'amt', year)}
                          />
                        </td>
                        <td>
                          <Input
                            name={`state-person-${d.id}-${year}-amt`}
                            label={t('apd.keyPersonnel.labels.costPerc')}
                            hideLabel
                            value={d.years[year].perc}
                            onChange={this.handleChange(i, 'perc', year)}
                          />
                        </td>
                      </Fragment>
                    ))}
                    <td className="center">
                      <button
                        type="button"
                        className="btn btn-outline border-silver px1 py-tiny mt-tiny"
                        title={t('apd.keyPersonnel.removeLabel')}
                        onClick={() => removePerson(d.id)}
                      >
                        ✗
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button
          type="button"
          className="btn btn-primary bg-black"
          onClick={() => addPerson()}
        >
          {t('apd.keyPersonnel.addButtonText')}
        </button>
      </Collapsible>
    );
  }
}

ApdKeyPersonnel.propTypes = {
  keyPersonnel: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  addPerson: PropTypes.func.isRequired,
  removePerson: PropTypes.func.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd: { data } }) => {
  const { keyPersonnel } = data;

  // TODO [bren]: replace with APD-driven dynamic years field
  const years = !keyPersonnel.length
    ? ['2018', '2019']
    : Object.keys(keyPersonnel[0].years).sort();

  return { keyPersonnel, years };
};

const mapDispatchToProps = {
  addPerson: addApdKeyPerson,
  removePerson: removeApdKeyPerson,
  updateApd: updateApdAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdKeyPersonnel);
