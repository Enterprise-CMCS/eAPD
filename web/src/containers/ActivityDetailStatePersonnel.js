import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addActivityStatePerson,
  removeActivityStatePerson,
  updateActivity as updateActivityAction
} from '../actions/activities';
import Btn from '../components/Btn';
import NoDataMsg from '../components/NoDataMsg';
import {
  Input,
  DollarInput,
  PercentInput,
  Textarea
} from '../components/Inputs';
import { Subsection } from '../components/Section';
import { t } from '../i18n';
import { isProgamAdmin } from '../util';

class ActivityDetailStatePersonnel extends Component {
  handleChange = (index, field, year) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const toUpdate =
      year !== undefined
        ? { years: { [year]: { [field]: value } } }
        : { [field]: value };

    updateActivity(
      activity.key,
      {
        statePersonnel: { [index]: toUpdate }
      },
      field === 'amt' || field === 'perc'
    );
  };

  render() {
    const { activity, years, addPerson, removePerson } = this.props;
    const { key: activityKey, statePersonnel } = activity;

    return (
      <Subsection
        resource="activities.statePersonnel"
        isKey={isProgamAdmin(activity)}
      >
        {statePersonnel.length === 0 ? (
          <NoDataMsg>{t('activities.statePersonnel.noDataNotice')}</NoDataMsg>
        ) : (
          <div className="overflow-auto">
            <table
              className="mb2 h5 table table-condensed table-fixed"
              style={{ minWidth: 800 }}
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
                  <tr key={d.key}>
                    <td className="mono">{i + 1}.</td>
                    <td>
                      <Input
                        name={`state-person-${d.key}-title`}
                        label={t('activities.statePersonnel.labels.title')}
                        hideLabel
                        value={d.title}
                        onChange={this.handleChange(i, 'title')}
                      />
                    </td>
                    <td>
                      <Textarea
                        name={`state-person-${d.key}-desc`}
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
                          <DollarInput
                            name={`state-person-${d.key}-${year}-amt`}
                            label={t(
                              'activities.statePersonnel.labels.costAmt'
                            )}
                            hideLabel
                            value={d.years[year].amt}
                            onChange={this.handleChange(i, 'amt', year)}
                          />
                        </td>
                        <td>
                          <PercentInput
                            name={`state-person-${d.key}-${year}-perc`}
                            label={t(
                              'activities.statePersonnel.labels.costPerc'
                            )}
                            hideLabel
                            value={d.years[year].perc}
                            onChange={this.handleChange(i, 'perc', year)}
                          />
                        </td>
                      </Fragment>
                    ))}
                    <td className="center">
                      <Btn
                        kind="outline"
                        extraCss="px1 py-tiny mt-tiny"
                        onClick={() => removePerson(activityKey, d.key)}
                      >
                        ✗
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Btn onClick={() => addPerson(activityKey)}>
          {t('activities.statePersonnel.addButtonText')}
        </Btn>
      </Subsection>
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

const mapStateToProps = ({ activities: { byKey }, apd }, { aKey }) => ({
  activity: byKey[aKey],
  years: apd.data.years
});

const mapDispatchToProps = {
  addPerson: addActivityStatePerson,
  removePerson: removeActivityStatePerson,
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailStatePersonnel
);
