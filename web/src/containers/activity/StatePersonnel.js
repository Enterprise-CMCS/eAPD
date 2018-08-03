import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addActivityStatePerson,
  removeActivityStatePerson,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Btn from '../../components/Btn';
import {
  Input,
  DollarInput,
  PercentInput,
  Textarea
} from '../../components/Inputs';
import NoDataMsg from '../../components/NoDataMsg';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

class StatePersonnel extends Component {
  handleChange = (index, field, year) => e => {
    const { checked, type, value } = e.target;
    const valueNorm = type === 'checkbox' ? checked : value;

    const { activity, updateActivity } = this.props;

    const toUpdate =
      year !== undefined
        ? { years: { [year]: { [field]: valueNorm } } }
        : { [field]: valueNorm };

    updateActivity(
      activity.key,
      { statePersonnel: { [index]: toUpdate } },
      field === 'amt' || field === 'perc'
    );
  };

  render() {
    const { activity, years, addPerson, removePerson } = this.props;
    const { key: activityKey, statePersonnel } = activity;

    return (
      <Subsection resource="activities.statePersonnel">
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
                  <th className="col-1" id="act_state_person_null1" />
                  <th className="col-4" id="act_state_person_null2" />
                  <th className="col-5" id="act_state_person_null3" />
                  {years.map(year => (
                    <th
                      key={year}
                      className="col-4"
                      colSpan="2"
                      id={`act_state_person_${year}`}
                    >
                      {t('activities.statePersonnel.labels.yearCost', {
                        year
                      })}
                    </th>
                  ))}
                  <th className="col-1" id="act_state_person_null4" />
                </tr>
                <tr>
                  <th className="col-1" id="act_state_person_number">
                    {t('activities.statePersonnel.labels.entryNum')}
                  </th>
                  <th className="col-4" id="act_state_person_title">
                    {t('activities.statePersonnel.labels.title')}
                  </th>
                  <th className="col-5" id="act_state_person_desc">
                    {t('activities.statePersonnel.labels.desc')}
                  </th>
                  {years.map(year => (
                    <Fragment key={year}>
                      <th id={`act_state_person_amt_${year}`}>
                        {t('activities.statePersonnel.labels.costAmt')}
                      </th>
                      <th id={`act_state_person_pct_${year}`}>
                        {t('activities.statePersonnel.labels.costPerc')}
                      </th>
                    </Fragment>
                  ))}
                  <th className="col-1" id="act_state_person_null5" />
                </tr>
              </thead>
              <tbody>
                {statePersonnel.map((d, i) => (
                  <tr key={d.key}>
                    <td
                      className="mono"
                      headers="act_state_person_null1 act_state_person_number"
                    >
                      {i + 1}.
                    </td>
                    <td headers="act_state_person_null2 act_state_person_title">
                      <Input
                        name={`state-person-${d.key}-title`}
                        label={t('activities.statePersonnel.labels.title')}
                        hideLabel
                        value={d.title}
                        onChange={this.handleChange(i, 'title')}
                      />
                      <label className="block bold">
                        <input
                          type="checkbox"
                          className="mr1"
                          checked={d.isKeyPersonnel}
                          onChange={this.handleChange(i, 'isKeyPersonnel')}
                        />
                        {t('activities.statePersonnel.labels.keyPersonnel')}
                      </label>
                    </td>
                    <td headers="act_state_person_null3 act_state_person_desc">
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
                        <td
                          headers={`act_state_person_${year} act_state_person_amt_${year}`}
                        >
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
                        <td
                          headers={`act_state_person_${year} act_state_person_pct_${year}`}
                        >
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
                    <td
                      className="center"
                      headers="act_state_person_null4 act_state_person_null5"
                    >
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

StatePersonnel.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(StatePersonnel);
