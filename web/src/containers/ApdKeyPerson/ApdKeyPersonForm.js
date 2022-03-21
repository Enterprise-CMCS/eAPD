import { TextField, ChoiceList } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { forwardRef, useReducer } from 'react';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import { t } from '../../i18n';

import PersonCostForm from '../../components/PersonCostForm';

import { saveKeyPersonnel } from '../../actions/editApd';

const tRoot = 'apd.stateProfile.keyPersonnel';

const PersonForm = forwardRef(({ index, item, savePerson, years }, ref) => {
  PersonForm.displayName = 'PersonForm';

  const initialState = item;

  function reducer(state, action) {
    switch (action.type) {
      case 'updateField':
        return {
          ...state,
          [action.field]: action.payload
        };
      case 'updateCosts':
        return {
          ...state,
          costs: {
            ...state.costs,
            [action.year]: action.value
          }
        };
      case 'updateFte':
        return {
          ...state,
          fte: {
            ...state.fte,
            [action.year]: action.value
          }
        };
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
    dispatch({ type: 'updateCosts', field: 'costs', year, value });
  };

  const setFTEForYear = (year, value) => {
    dispatch({ type: 'updateFte', field: 'fte', year, value: +value });
  };

  const handleHasCostsChange = e => {
    dispatch({
      type: 'updateField',
      field: 'hasCosts',
      payload: e.target.value
    });
  };

  const primary = index === 0;

  return (
    <form index={index} onSubmit={handleSubmit}>
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
      <TextField
        name={`apd-state-profile-pocname${index}`}
        label={t(`${tRoot}.labels.name`)}
        value={state.name}
        onChange={e =>
          dispatch({
            type: 'updateField',
            field: 'name',
            payload: e.target.value
          })
        }
      />
      <TextField
        name={`apd-state-profile-pocemail${index}`}
        label={t(`${tRoot}.labels.email`)}
        value={state.email}
        onChange={e =>
          dispatch({
            type: 'updateField',
            field: 'email',
            payload: e.target.value
          })
        }
      />
      <TextField
        name={`apd-state-profile-pocposition${index}`}
        label={t(`${tRoot}.labels.position`)}
        value={state.position}
        onChange={e =>
          dispatch({
            type: 'updateField',
            field: 'position',
            payload: e.target.value
          })
        }
      />
      <ChoiceList
        label={t(`${tRoot}.labels.hasCosts`)}
        name={`apd-state-profile-hascosts${index}`}
        choices={[
          {
            label: 'Yes',
            value: 'yes',
            checked: state.hasCosts === 'yes',
            checkedChildren: (
              <PersonCostForm
                items={years.reduce(
                  (o, year) => ({
                    ...o,
                    [year]: {
                      amt: state.costs[year],
                      perc: state.fte[year]
                    }
                  }),
                  {}
                )}
                fteLabel="FTE Allocation"
                hint="For example: 0.5 = 0.5 FTE = 50% time"
                setCost={setCostForYear}
                setFTE={setFTEForYear}
              />
            )
          },
          {
            label: 'No',
            value: 'no',
            checked: state.hasCosts === 'no'
          }
        ]}
        type="radio"
        onChange={e => {
          handleHasCostsChange(e);
        }}
      />
      <input
        className="ds-u-visibility--hidden"
        type="submit"
        ref={ref}
        hidden
      />
    </form>
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
