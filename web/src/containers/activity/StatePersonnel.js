import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addActivityStatePerson,
  removeActivityStatePerson,
  updateActivity as updateActivityAction
} from '../../actions/activities';
import Btn from '../../components/Btn';
import { Input, DollarInput, Textarea } from '../../components/Inputs';
import Label from '../../components/Label';
import NoDataMsg from '../../components/NoDataMsg';
import { SubsectionChunk } from '../../components/Section';
import { t } from '../../i18n';
import { arrToObj } from '../../util';
import { formatDec, formatMoney } from '../../util/formats';

const PersonnelEntry = ({ person, idx, years, handleDelete, toggleForm }) => (
  <div className="mb1 h5 flex justify-between">
    <button
      type="button"
      onClick={toggleForm}
      className="btn btn-no-focus p1 col-12 left-align bg-blue-light rounded-left"
    >
      <div className="flex items-center justify-between">
        <div className="col-4 truncate">
          {idx + 1}. <strong>{person.title || 'Title'}</strong>
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
      </div>
    </button>
    <button
      type="button"
      onClick={handleDelete}
      className="btn btn-no-focus p1 bg-blue-light rounded-right"
    >
      ✗
    </button>
  </div>
);

PersonnelEntry.propTypes = {
  person: PropTypes.object.isRequired,
  idx: PropTypes.number.isRequired,
  years: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired
};

const PersonnelForm = ({
  person,
  idx,
  years,
  handleChange,
  handleKeyPersonnel,
  handleDelete
}) => (
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
      <Label>Key Personnel</Label>
      <div>
        <Btn
          kind="outline"
          extraCss={person.isKeyPersonnel ? 'bg-black white' : ''}
          onClick={handleKeyPersonnel(idx, true)}
        >
          Yes
        </Btn>{' '}
        <Btn
          kind="outline"
          extraCss={person.isKeyPersonnel ? '' : 'bg-black white'}
          onClick={handleKeyPersonnel(idx, false)}
        >
          No
        </Btn>
      </div>
    </div>
    <div className="mb3 md-flex">
      <Label>{t('activities.statePersonnel.labels.desc')}</Label>
      <Textarea
        name={`state-person-${person.key}-desc`}
        label={t('activities.statePersonnel.labels.desc')}
        rows="3"
        value={person.desc}
        onChange={handleChange(idx, 'desc')}
        wrapperClass="md-col-7 lg-col-6"
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
  handleKeyPersonnel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

class StatePersonnel extends Component {
  static getDerivedStateFromProps(props, state) {
    const { personnel: data } = props;
    const lastKey = data.length ? data[data.length - 1].key : null;

    if (lastKey && !(lastKey in state.showForm)) {
      return {
        showForm: {
          ...arrToObj(Object.keys(state.showForm), false),
          [lastKey]: true
        }
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    const showForm = props.personnel
      .map(p => p.key)
      .reduce((obj, key, i) => ({ ...obj, [key]: i === 0 }), {});

    this.state = { showForm };
  }

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

  handleKeyPersonnel = (index, bool) => () => {
    const { activityKey, updateActivity } = this.props;
    const updates = { statePersonnel: { [index]: { isKeyPersonnel: bool } } };
    updateActivity(activityKey, updates);
  };

  handleAdd = () => {
    const { activityKey, addPerson } = this.props;
    addPerson(activityKey);
  };

  handleDelete = entryKey => () => {
    const { activityKey, removePerson } = this.props;
    removePerson(activityKey, entryKey);
  };

  toggleForm = entryKey => () => {
    this.setState(prev => ({
      showForm: {
        ...prev.showForm,
        [entryKey]: !prev.showForm[entryKey]
      }
    }));
  };

  render() {
    const { personnel, years } = this.props;
    const { showForm } = this.state;

    return (
      <SubsectionChunk resource="activities.statePersonnel">
        {personnel.length === 0 ? (
          <NoDataMsg>{t('activities.statePersonnel.noDataNotice')}</NoDataMsg>
        ) : (
          <div className="mt3 pt3 border-top border-grey">
            {personnel.map((person, i) => (
              <div key={person.key}>
                <PersonnelEntry
                  person={person}
                  idx={i}
                  years={years}
                  handleDelete={this.handleDelete(person.key)}
                  toggleForm={this.toggleForm(person.key)}
                />
                {showForm[person.key] && (
                  <PersonnelForm
                    key={person.key}
                    person={person}
                    idx={i}
                    years={years}
                    handleChange={this.handleChange}
                    handleKeyPersonnel={this.handleKeyPersonnel}
                    handleDelete={this.handleDelete(person.key)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <Btn onClick={this.handleAdd}>
          {t('activities.statePersonnel.addButtonText')}
        </Btn>
      </SubsectionChunk>
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

export default connect(mapStateToProps, mapDispatchToProps)(StatePersonnel);
