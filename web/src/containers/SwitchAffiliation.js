import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ChoiceList } from '@cmsgov/design-system';
import CardForm from '../components/CardForm';

import { STATES } from '../util/states';

import {
  switchAffiliation
} from '../actions/auth';

// outline
// fetch available states the user has access to from redux
// display those states in a radio list
// when an item is selected and submitted, hit a redux action to update redux `user.data.state`
// then idk, we need to re-load the whole app with that state?

const SwitchAffiliation = ({
  availableAffiliations,
  currentStateId,
  switchAffiliation: switchUserAffiliation
}) => {

  const history = useHistory();

  const [selectedAffiliation, setSelectedAffiliation] = useState(currentStateId);

  const onSave = async () => {
    const route = await switchUserAffiliation(selectedAffiliation, currentStateId);
    if(route) {
      history.push(route);
    }
  }
  console.log('availableAffiliations', availableAffiliations);
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
      primaryButtonText={["Submit", "Updating"]}
      cancelable
    >
      <h1 className="ds-h3">State Affiliation</h1>
      <ChoiceList
        choices={choiceList}
        // errorMessage="Example error message"
        label="Please select your state affiliation"
        labelClassName="ds-u-font-weight--normal ds-u-padding-bottom--1"
        name="radio_choices"
        type="radio"
        onChange={handleChoiceSelection}
      />
    </CardForm>
  )
}


SwitchAffiliation.propTypes = {
  availableAffiliations: PropTypes.array.isRequired,
  switchAffiliation: PropTypes.func.isRequired,
  currentStateId: PropTypes.string
}

SwitchAffiliation.defaultProps = {
  // Todo: determine better way to have a default/null state
  currentStateId: ''
}

const mapStateToProps = state => ({
  availableAffiliations: state.user.data.states,
  currentStateId: state.user.data.state.id
})

const mapDispatchToProps = {
  switchAffiliation
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchAffiliation);

export { SwitchAffiliation as plain, mapStateToProps, mapDispatchToProps};
