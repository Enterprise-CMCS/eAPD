import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  addKeyPerson,
  removeKeyPerson,
  setPrimaryKeyPerson,
  updateApd as updateApdAction
} from '../actions/apd';
import Btn from '../components/Btn';
import { DollarInput, Input, PercentInput } from '../components/Inputs';
import MiniHeader from '../components/MiniHeader';
import { t } from '../i18n';
import { arrToObj } from '../util';
import { formatMoney } from '../util/formats';

const tRoot = 'apd.stateProfile.keyPersonnel';

const personTotalCost = person =>
  Object.values(person.costs).reduce((sum, value) => sum + +value, 0);

const PersonForm = ({
  idx,
  handleChange,
  handleYearChange,
  person,
  setPrimary,
  years
}) => {
  const changePrimary = handleChange('isPrimary', idx);
  const changeHasCosts = handleChange('hasCosts', idx);

  const togglePrimary = value => changePrimary({ target: { value } });
  const toggleHasCosts = value => changeHasCosts({ target: { value } });

  return (
    <div className="mt2 mb3">
      <h3>{t(`${tRoot}.contact`, { number: idx + 1 })}</h3>
      <Input
        name={`apd-state-profile-pocname${idx}`}
        label={t(`${tRoot}.labels.name`)}
        value={person.name}
        onChange={handleChange('name', idx)}
      />
      <Input
        name={`apd-state-profile-pocemail${idx}`}
        label={t(`${tRoot}.labels.email`)}
        value={person.email}
        onChange={handleChange('email', idx)}
      />
      <Input
        name={`apd-state-profile-pocposition${idx}`}
        label={t(`${tRoot}.labels.position`)}
        value={person.position}
        onChange={handleChange('position', idx)}
      />
      <PercentInput
        name={`apd-state-profile-pocpercent${idx}`}
        label={t(`${tRoot}.labels.percentTime`)}
        value={person.percentTime || 0}
        wrapperClass="inline-block"
        onChange={handleChange('percentTime', idx)}
      />
      <div className="mt2">
        {t(`${tRoot}.labels.primary`)}
        <div className="mt1 ml2">
          <Btn
            kind="outline"
            extraCss={person.isPrimary ? 'bg-black white' : ''}
            onClick={() => setPrimary(idx)}
          >
            Yes
          </Btn>{' '}
          <Btn
            kind="outline"
            extraCss={person.isPrimary ? '' : 'bg-black white'}
            onClick={() => togglePrimary(false)}
          >
            No
          </Btn>
        </div>
      </div>

      <div className="mt2">
        {t(`${tRoot}.labels.hasCosts`)}
        <div className="mt1 ml2">
          <Btn
            kind="outline"
            extraCss={person.hasCosts ? 'bg-black white' : ''}
            onClick={() => toggleHasCosts(true)}
          >
            Yes
          </Btn>{' '}
          <Btn
            kind="outline"
            extraCss={person.hasCosts ? '' : 'bg-black white'}
            onClick={() => toggleHasCosts(false)}
          >
            No
          </Btn>
        </div>
      </div>

      {person.hasCosts && (
        <div className="mt2 flex col-8">
          {years.map(y => (
            <div key={y} className="col-3">
              <DollarInput
                name={`apd-state-profile-poc-cost-${y}`}
                label={`${y} Cost`}
                value={person.costs[y]}
                wrapperClass="mr1"
                onChange={handleYearChange(idx, y)}
              />
            </div>
          ))}
          <div className="col-3">
            Total
            <div>{formatMoney(personTotalCost(person))}</div>
          </div>
        </div>
      )}
    </div>
  );
};
PersonForm.propTypes = {
  idx: PropTypes.number.isRequired,
  person: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleYearChange: PropTypes.func.isRequired,
  setPrimary: PropTypes.func.isRequired
};

class ApdStateKeyPersonnel extends Component {
  static getDerivedStateFromProps(props, state) {
    const { poc: data } = props;
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

    const peopleKeys = props.poc.map(p => p.key);

    const showForm = peopleKeys.reduce(
      (obj, key, i) => ({ ...obj, [key]: i === 0 }),
      {}
    );

    this.state = { showForm };
  }

  handleChange = (field, index) => e => {
    const { updateApd } = this.props;
    updateApd({
      keyPersonnel: { [index]: { [field]: e.target.value } }
    });
  };

  handleYearChange = (index, year) => e => {
    const { value } = e.target;
    const { updateApd } = this.props;

    const updates = {
      keyPersonnel: { [index]: { costs: { [year]: value } } }
    };
    updateApd(updates);
  };

  toggleForm = personKey => () => {
    this.setState(prev => ({
      showForm: {
        ...prev.showForm,
        [personKey]: !prev.showForm[personKey]
      }
    }));
  };

  render() {
    const {
      addKeyPerson: addPerson,
      poc,
      removeKeyPerson: removePerson,
      setPrimaryKeyPerson: setPrimary,
      years
    } = this.props;
    const { showForm } = this.state;

    return (
      <Fragment>
        {poc.map((person, i) => (
          <Fragment key={person.key}>
            <MiniHeader
              handleDelete={() => removePerson(i)}
              number={i + 1}
              title={person.name || 'Name'}
              toggleForm={this.toggleForm(person.key)}
              content={
                <Fragment>
                  <div className="col4 truncate">
                    Role: <strong>{person.position}</strong>
                  </div>
                  <div className="col4 truncate">
                    Total cost:{' '}
                    <strong>
                      {formatMoney(
                        person.hasCosts ? personTotalCost(person) : 0
                      )}
                    </strong>
                  </div>
                </Fragment>
              }
            />
            {showForm[person.key] && (
              <PersonForm
                idx={i}
                person={person}
                years={years}
                handleChange={this.handleChange}
                handleYearChange={this.handleYearChange}
                setPrimary={setPrimary}
              />
            )}
          </Fragment>
        ))}

        <Btn onClick={addPerson}>
          {t('apd.stateProfile.keyPersonnel.labels.addButton', {
            count: poc.length
          })}
        </Btn>
      </Fragment>
    );
  }
}

ApdStateKeyPersonnel.propTypes = {
  addKeyPerson: PropTypes.func.isRequired,
  poc: PropTypes.array.isRequired,
  removeKeyPerson: PropTypes.func.isRequired,
  setPrimaryKeyPerson: PropTypes.func.isRequired,
  updateApd: PropTypes.func.isRequired,
  years: PropTypes.array.isRequired
};

const mapStateToProps = ({ apd: { data: { keyPersonnel, years } } }) => ({
  poc: keyPersonnel,
  years
});
const mapDispatchToProps = {
  addKeyPerson,
  setPrimaryKeyPerson,
  removeKeyPerson,
  updateApd: updateApdAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ApdStateKeyPersonnel
);
