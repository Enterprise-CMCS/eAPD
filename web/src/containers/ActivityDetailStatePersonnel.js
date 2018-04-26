import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addActivityStatePerson,
  removeActivityStatePerson,
  updateActivity as updateActivityAction
} from '../actions/activities';
import Collapsible from '../components/Collapsible';
import { Input, Textarea } from '../components/Inputs2';
import { t } from '../i18n';

class ActivityDetailStatePersonnel extends Component {
  handleChange = (idx, key, year) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const toUpdate =
      year !== undefined
        ? { years: { [year]: { [key]: value } } }
        : { [key]: value };

    updateActivity(activity.id, {
      statePersonnel: { [idx]: toUpdate }
    });
  };

  render() {
    const {
      activity: { id: activityID, statePersonnel },
      years,
      addPerson,
      removePerson
    } = this.props;

    return (
      <Collapsible title={t('activities.statePersonnel.title')}>
        <p>{t('activities.statePersonnel.subheader')}</p>
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
                    {t('activities.statePersonnel.labels.yearCost', {
                      year
                    })}
                  </th>
                ))}
                <th className="col-1" />
              </tr>
              <tr>
                <th className="col-1">
                  {t('activities.statePersonnel.labels.entryNum')}
                </th>
                <th className="col-4">
                  {t('activities.statePersonnel.labels.title')}
                </th>
                <th className="col-5">
                  {t('activities.statePersonnel.labels.desc')}
                </th>
                {years.map(year => (
                  <Fragment key={year}>
                    <th>{t('activities.statePersonnel.labels.costAmt')}</th>
                    <th>{t('activities.statePersonnel.labels.costPerc')}</th>
                  </Fragment>
                ))}
                <th className="col-1" />
              </tr>
            </thead>
            <tbody>
              {statePersonnel.map((d, i) => (
                <tr key={d.id}>
                  <td className="mono">{i + 1}.</td>
                  <td>
                    <Input
                      name={`state-person-${d.id}-title`}
                      label={t('activities.statePersonnel.labels.title')}
                      hideLabel
                      value={d.title}
                      onChange={this.handleChange(i, 'title')}
                    />
                  </td>
                  <td>
                    <Textarea
                      name={`state-person-${d.id}-desc`}
                      label={t('activities.statePersonnel.labels.desc')}
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
                          label={t('activities.statePersonnel.labels.costAmt')}
                          hideLabel
                          value={d.years[year].amt}
                          onChange={this.handleChange(i, 'amt', year)}
                        />
                      </td>
                      <td>
                        <Input
                          name={`state-person-${d.id}-${year}-amt`}
                          label={t('activities.statePersonnel.labels.costPerc')}
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
                      title={t('activities.statePersonnel.removeLabel')}
                      onClick={() => removePerson(activityID, d.id)}
                    >
                      ✗
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="btn btn-primary bg-black"
          onClick={() => addPerson(activityID)}
        >
          {t('activities.statePersonnel.addButtonText')}
        </button>
      </Collapsible>
    );
  }
}

ActivityDetailStatePersonnel.propTypes = {
  activity: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  addPerson: PropTypes.func.isRequired,
  removePerson: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => {
  const activity = byId[aId];
  const { statePersonnel } = activity;

  // TODO [bren]: replace with APD-driven dynamic years field
  const years = !statePersonnel.length
    ? ['2018', '2019']
    : Object.keys(statePersonnel[0].years).sort();

  return { activity, years };
};

const mapDispatchToProps = {
  addPerson: addActivityStatePerson,
  removePerson: removeActivityStatePerson,
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailStatePersonnel
);
