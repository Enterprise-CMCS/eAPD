import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
import Label from '../../components/Label';
import NoDataMsg from '../../components/NoDataMsg';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

class StatePersonnel extends Component {
  handleChange = (index, field, year) => e => {
    const { value } = e.target;
    const { activity, updateActivity } = this.props;

    const toUpdate =
      year !== undefined
        ? { years: { [year]: { [field]: value } } }
        : { [field]: value };

    updateActivity(
      activity.key,
      { statePersonnel: { [index]: toUpdate } },
      field === 'amt' || field === 'perc'
    );
  };

  handleKeyPersonnel = (index, bool) => () => {
    const { activity, updateActivity } = this.props;
    const updates = { statePersonnel: { [index]: { isKeyPersonnel: bool } } };
    updateActivity(activity.key, updates);
  };

  render() {
    const { activity, years, addPerson, removePerson } = this.props;
    const { key: activityKey, statePersonnel } = activity;

    return (
      <Subsection resource="activities.statePersonnel" nested>
        {statePersonnel.length === 0 ? (
          <NoDataMsg>{t('activities.statePersonnel.noDataNotice')}</NoDataMsg>
        ) : (
          <div className="mt3 pt3 border-top border-grey">
            {statePersonnel.map((d, i) => (
              <div key={d.key} className="mb3 pb3 border-bottom border-grey">
                <div className="mb3 md-flex">
                  <Label>{t('activities.statePersonnel.labels.title')}</Label>
                  <Input
                    name={`state-person-${d.key}-title`}
                    label={t('activities.statePersonnel.labels.title')}
                    value={d.title}
                    onChange={this.handleChange(i, 'title')}
                    wrapperClass="md-col-7 lg-col-6"
                    hideLabel
                  />
                </div>
                <div className="mb3 md-flex">
                  <Label>Key Personnel</Label>
                  <div>
                    <Btn
                      kind="outline"
                      extraCss={d.isKeyPersonnel ? 'bg-black white' : ''}
                      onClick={this.handleKeyPersonnel(i, true)}
                    >
                      Yes
                    </Btn>{' '}
                    <Btn
                      kind="outline"
                      extraCss={d.isKeyPersonnel ? '' : 'bg-black white'}
                      onClick={this.handleKeyPersonnel(i, false)}
                    >
                      No
                    </Btn>
                  </div>
                </div>
                <div className="mb3 md-flex">
                  <Label>{t('activities.statePersonnel.labels.desc')}</Label>
                  <Textarea
                    name={`state-person-${d.key}-desc`}
                    label={t('activities.statePersonnel.labels.desc')}
                    rows="3"
                    value={d.desc}
                    onChange={this.handleChange(i, 'desc')}
                    wrapperClass="md-col-7 lg-col-6"
                    hideLabel
                  />
                </div>
                {years.map(year => (
                  <div key={year} className="mb3 md-flex">
                    <Label>{year} Cost</Label>
                    <div className="md-col-7 lg-col-6 flex justify-between">
                      <DollarInput
                        name={`state-person-${d.key}-${year}-amt`}
                        label={t('activities.statePersonnel.labels.costAmt')}
                        value={d.years[year].amt}
                        onChange={this.handleChange(i, 'amt', year)}
                        wrapperClass="mr3 flex-auto"
                      />
                      <PercentInput
                        name={`state-person-${d.key}-${year}-perc`}
                        label={t('activities.statePersonnel.labels.costPerc')}
                        value={d.years[year].perc}
                        onChange={this.handleChange(i, 'perc', year)}
                        wrapperClass="flex-auto"
                      />
                    </div>
                  </div>
                ))}
                <div>
                  <Btn
                    kind="outline"
                    extraCss="px1 py-tiny h5"
                    onClick={() => removePerson(activityKey, d.key)}
                  >
                    Remove person
                  </Btn>
                </div>
              </div>
            ))}
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
