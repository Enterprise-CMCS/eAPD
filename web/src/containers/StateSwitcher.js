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

const StateSwitcher = ({
  affiliations,
  currentState,
  switchAffiliation: switchUserAffiliation
}) => {

  const history = useHistory();

  const [selectedAffiliation, setSelectedAffiliation] = useState('');

  const onSave = async () => {
    const route = await switchUserAffiliation(selectedAffiliation);
    if(route) {
      history.push(route);
    }
  }

  const choiceList = affiliations.map(item => {

    const choice = {
      label: STATES.find(state => state.id === item.state_id).name,
      value: item.state_id,
      defaultChecked: false
    }
    if(item.state_id === currentState) {
      choice.defaultChecked = true;
    }
    return choice;
  });

  const handleChoiceSelection = e => {
    console.log('change choice selection', e.target.value);
    // todo: add error handling here
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


StateSwitcher.propTypes = {
  affiliations: PropTypes.array.isRequired,
  switchAffiliation: PropTypes.func.isRequired
}

StateSwitcher.defaultProps = {

}

const mapStateToProps = state => ({
  // Switch this to just be states and use that from redux
  affiliations: state.user.data.affiliations,
  currentState: state.user.data.state.id
})

const mapDispatchToProps = {
  switchAffiliation
};

export default connect(mapStateToProps, mapDispatchToProps)(StateSwitcher);

export { StateSwitcher as plain, mapStateToProps, mapDispatchToProps};
