import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addActivityStatePerson,
  removeActivityStatePerson,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Btn from '../../components/Btn';
import List from '../../components/CollapsibleList';
import { Input, DollarInput, Textarea } from '../../components/Inputs';
import Instruction from '../../components/Instruction';
import Label from '../../components/Label';
import NoDataMsg from '../../components/NoDataMsg';
import { t } from '../../i18n';
import { formatDec, formatMoney } from '../../util/formats';

const PersonnelForm = ({ person, idx, years, handleChange, handleDelete }) => (
  <div className="mt2 mb3">
    <Btn
      kind="outline"
      extraCss="right px-tiny py0 h5 xs-hide"
      onClick={handleDelete}
    >
      ✗
    </Btn>
    <div className="mb3 md-flex">
      <Label>{t('activities.statePersonnel.labels.title')}</Label>
      <Input
        name={`state-person-${person.key}-title`}
        label={t('activities.statePersonnel.labels.title')}
        value={person.title}
        onChange={handleChange(idx, 'title')}
        wrapperClass="md-col-7 lg-col-6"
        hideLabel
      />
    </div>
    <div className="mb3 md-flex">
      <Label>{t('activities.statePersonnel.labels.desc')}</Label>
      <Textarea
        name={`state-person-${person.key}-desc`}
        label={t('activities.statePersonnel.labels.desc')}
        rows="7"
        value={person.desc}
        onChange={handleChange(idx, 'desc')}
        wrapperClass="md-col-7 lg-col-6"
        className="m0 textarea textarea-m"
        hideLabel
      />
    </div>
    {years.map(year => (
      <div key={year} className="mb3 md-flex">
        <Label>{year} Cost</Label>
        <div className="md-col-7 lg-col-6 flex justify-between">
          <DollarInput
            name={`state-person-${person.key}-${year}-amt`}
            label={t('activities.statePersonnel.labels.costAmt')}
            value={person.years[year].amt}
            onChange={handleChange(idx, 'amt', year)}
            wrapperClass="mr3 flex-auto"
          />
          <Input
            name={`state-person-${person.key}-${year}-perc`}
            label={t('activities.statePersonnel.labels.costPerc')}
            wrapperClass="flex-auto"
            className="m0 input mono"
            type="number"
            step="0.5"
            value={person.years[year].perc}
            onChange={handleChange(idx, 'perc', year)}
          />
        </div>
      </div>
    ))}
  </div>
);

PersonnelForm.propTypes = {
  person: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  years: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

class StatePersonnel extends Component {
  getDeleter = entryKey => () => {
    const { activityKey, removePerson } = this.props;
    removePerson(activityKey, entryKey);
  };

  handleChange = (index, field, year) => e => {
    const { value } = e.target;
    const { activityKey, updateActivity } = this.props;

    const toUpdate =
      year !== undefined
        ? { years: { [year]: { [field]: value } } }
        : { [field]: value };

    updateActivity(
      activityKey,
      { statePersonnel: { [index]: toUpdate } },
      field === 'amt' || field === 'perc'
    );
  };

  handleAdd = () => {
    const { activityKey, addPerson } = this.props;
    addPerson(activityKey);
  };

  handleDelete = person => this.getDeleter(person.key)();

  render() {
    const { personnel, years } = this.props;

    return (
      <Fragment>
        <Instruction source="activities.statePersonnel.instruction" />
        {personnel.length === 0 ? (
          <NoDataMsg>{t('activities.statePersonnel.noDataNotice')}</NoDataMsg>
        ) : (
          <div className="mt3 pt3 border-top border-grey">
            <List
              items={personnel}
              getKey={person => person.key}
              deleteItem={this.handleDelete}
              header={(person, i) => (
                <Fragment>
                  <div className="col-3 truncate">
                    {i + 1}. <strong>{person.title || 'Title'}</strong>
                  </div>
                  {years.map(year => (
                    <div key={year} className="col-3 truncate">
                      {year}:{' '}
                      <span className="bold mono">
                        {formatMoney(person.years[year].amt)}
                        {' / '}
                        {formatDec(person.years[year].perc, 1)}
                      </span>
                    </div>
                  ))}
                </Fragment>
              )}
              content={(person, i) => (
                <PersonnelForm
                  key={person.key}
                  person={person}
                  idx={i}
                  years={years}
                  handleChange={this.handleChange}
                  handleDelete={this.getDeleter(person.key)}
                />
              )}
            />
          </div>
        )}
        <Btn onClick={this.handleAdd}>
          {t('activities.statePersonnel.addButtonText')}
        </Btn>
      </Fragment>
    );
  }
}

StatePersonnel.propTypes = {
  activityKey: PropTypes.string.isRequired,
  personnel: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  addPerson: PropTypes.func.isRequired,
  removePerson: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byKey }, apd }, { aKey }) => ({
  activityKey: aKey,
  personnel: byKey[aKey].statePersonnel,
  years: apd.data.years
});

const mapDispatchToProps = {
  addPerson: addActivityStatePerson,
  removePerson: removeActivityStatePerson,
  updateActivity: updateActivityAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatePersonnel);
