import { TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { forwardRef, useReducer } from 'react';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import { t } from '../../i18n';

import Choice from '../../components/Choice';
import PersonCostForm from '../../components/PersonCostForm';
import { validateText } from '../../helpers/textValidation';

import { saveKeyPersonnel } from '../../actions/editApd';

const tRoot = 'apd.stateProfile.keyPersonnel';

const PersonForm = forwardRef(
  (
    {
      index,
      item,
      savePerson,
      years
    },
    ref
  ) => {
    PersonForm.displayName = 'PersonForm';
    
    const initialState = item;
    
    function reducer(state, action) {
      switch (action.type) {
        case 'updateField':
          return {
            ...state,
            [action.field]: action.payload
          }
        case 'updateCosts':
          return {
            ...state,
            costs: {
              ...state.costs,
              [action.year]: action.value
            }
          }
        case 'updateFte':
          return {
            ...state,
            fte: {
              ...state.fte,
              [action.year]: action.value
            }
          }
        default:
          throw new Error(
            'Unrecognized action type provided to ApdKeyPersonForm reducer'
          );
      }
    }
    
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const handleSubmit = e => {
      e.preventDefault();
      savePerson(index, state);
    };

    const setCostForYear = (year, value) => {
      dispatch({ type: 'updateCosts', field: 'costs', year, value })
    };

    const setFTEForYear = (year, value) => {
      dispatch({ type: 'updateFte', field: 'fte', year, value: +value })
    };

  return (
    <Fragment>
      <h4 className="ds-h4">
        {primary
          ? titleCase(t(`${tRoot}.labels.titlePrimary`))
          : titleCase(t(`${tRoot}.labels.titleSecondary`))}
      </h4>
      <p className="ds-u-margin-bottom--0">
        {primary
          ? t(`${tRoot}.labels.notePrimary`)
          : t(`${tRoot}.labels.noteSecondary`)}
      </p>
      {/* eslint-disable jsx-a11y/no-autofocus */}
      <TextField
        name={`apd-state-profile-pocname${index}`}
        label={t(`${tRoot}.labels.name`)}
        value={name}
        cy-data={`key-person-name-${index}`}
        onChange={handleChange(setName)}
        onKeyUp={(e) => {
          validateText(e, 'name', ' for the point of contact.');
        }}
        onBlur={(e) => {
          validateText(e, 'name', ' for the point of contact.');
        }}
      />
      <TextField
        name={`apd-state-profile-pocemail${index}`}
        label={t(`${tRoot}.labels.email`)}
        value={email}
        cy-data={`key-person-email-${index}`}
        onChange={handleChange(setEmail)}
        onKeyUp={(e) => {
          validateText(e, 'email', ' for the point of contact.');
        }}
        onBlur={(e) => {
          validateText(e, 'email', ' for the point of contact.');
        }}
      />
      <TextField
        name={`apd-state-profile-pocposition${index}`}
        label={t(`${tRoot}.labels.position`)}
        value={position}
        cy-data={`key-person-role-${index}`}
        onChange={handleChange(setRole)}
        onKeyUp={(e) => {
          validateText(e, 'role', ' for the point of contact.');
        }}
        onBlur={(e) => {
          validateText(e, 'role', ' for the point of contact.');
        }}
      />

      <fieldset className="ds-c-fieldset">
        <legend className="ds-c-label">{t(`${tRoot}.labels.hasCosts`)}</legend>
        <Choice
          checked={hasCosts}
          label="Yes"
          name={`apd-state-profile-hascosts-yes${index}`}
          onChange={setPersonHasCosts(true)}
          type="radio"
          value="yes"
          checkedChildren={
            <PersonCostForm
              items={years.reduce(
                (o, year) => ({
                  ...o,
                  [year]: {
                    amt: costs[year],
                    perc: fte[year]
                  }
                }),
                {}
              )}
              fteLabel="FTE Allocation"
              hint="For example: 0.5 = 0.5 FTE = 50% time"
              setCost={setCostForYear}
              setFTE={setFTEForYear}
            />
          }
        />
        <Choice
          checked={!hasCosts}
          label="No"
          name={`apd-state-profile-hascosts-no${index}`}
          onChange={setPersonHasCosts(false)}
          type="radio"
          value="no"
        />
      </fieldset>
    </Fragment>
  );
});
PersonForm.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    costs: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    hasCosts: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    fte: PropTypes.object.isRequired,
    position: PropTypes.string.isRequired
  }).isRequired,
  years: PropTypes.array.isRequired,
  savePerson: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  savePerson: saveKeyPersonnel
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  PersonForm
);

export { PersonForm as plain, mapDispatchToProps };
