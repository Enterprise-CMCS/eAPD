import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ChoiceList } from '@cmsgov/design-system';
import CardForm from '../components/CardForm';

import { STATES } from '../util/states';

import {
  selectAffiliation
} from '../actions/auth';

const SelectAffiliation = ({
  availableAffiliations,
  currentStateId,
  error,
  selectAffiliation: selectUserAffiliation
}) => {

  const history = useHistory();

  const [selectedAffiliation, setSelectedAffiliation] = useState(currentStateId);

  const onSave = async () => {
    const route = await selectUserAffiliation(selectedAffiliation, currentStateId);
    if(route) {
      history.push(route);
    }
  }

  const choiceList = availableAffiliations.map(item => {
    const choice = {
      label: STATES.find(state => state.id === item).name,
      value: item
    }
    if(item === currentStateId) {
      choice.defaultChecked = true;
    }
    return choice;
  });

  const handleChoiceSelection = e => {
    setSelectedAffiliation(e.target.value);
  }

  return (
    <CardForm 
      onSave={onSave}
      error={error}
      primaryButtonText={["Submit", "Updating"]}
      cancelable
    >
      <h1 className="ds-h3">State Affiliation</h1>
      <ChoiceList
        choices={choiceList}
        label="Please select your state affiliation"
        labelClassName="ds-u-font-weight--normal ds-u-padding-bottom--1"
        name="radio_choices"
        type="radio"
        onChange={handleChoiceSelection}
      />
    </CardForm>
  )
}

SelectAffiliation.propTypes = {
  availableAffiliations: PropTypes.array.isRequired,
  selectAffiliation: PropTypes.func.isRequired,
  currentStateId: PropTypes.string,
  error: PropTypes.string
};

SelectAffiliation.defaultProps = {
  currentStateId: '',
  error: null,
};

const mapStateToProps = state => ({
  availableAffiliations: state.user.data.states,
  currentStateId: state.user.data.state.id,
  error: state.auth.error
});

const mapDispatchToProps = {
  selectAffiliation
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAffiliation);

export { SelectAffiliation as plain, mapStateToProps, mapDispatchToProps};
