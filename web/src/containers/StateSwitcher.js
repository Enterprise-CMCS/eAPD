import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// todo: use a selector to get affiliations
// should we get the affiliations from user.data.state or auth.user.state??
// import { getUserAffiliationForCurrentState } from '../reducers/user.selector';

import { ChoiceList } from '@cmsgov/design-system';
import CardForm from '../components/CardForm';

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
  switchAffiliation: switchUserAffiliation
}) => {

  const [selectedAffiliation, setSelectedAffiliation] = useState('');

  const onSave = () => {
    console.log("onSave in StateSwitcher hit...");
    switchUserAffiliation(selectedAffiliation);
  }

  const choiceList = affiliations.map(item => {
    return {
      label: item.state_id,
      value: item.state_id
    }
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
})

const mapDispatchToProps = {
  switchAffiliation
};

export default connect(mapStateToProps, mapDispatchToProps)(StateSwitcher);

export { StateSwitcher as plain, mapStateToProps, mapDispatchToProps};
