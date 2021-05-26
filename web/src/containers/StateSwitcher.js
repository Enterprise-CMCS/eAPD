import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// todo: use a selector to get affiliations
// import { getUserAffiliationForCurrentState } from '../reducers/user.selector';

import { ChoiceList } from '@cmsgov/design-system';
import CardForm from '../components/CardForm';

// outline
// fetch available states the user has access to from redux
// display those states in a radio list
// when an item is selected and submitted, hit a redux action to update redux `user.data.state`
// then idk, we need to re-load the whole app with that state?

const StateSwitcher = ({
  affiliations
}) => {

  const onSave = () => {
    console.log("onSave in StateSwitcher hit...");
  }

  const choiceList = affiliations.map(item => {
    return {
      label: item.state_id,
      value: item.state_id
    }
  });

  const handleChoiceSelection = e => {
    console.log('change choice selection', e.target.value);
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
  affiliations: PropTypes.array.isRequired
}

StateSwitcher.defaultProps = {

}

const mapStateToProps = state => ({
  affiliations: state.user.data.affiliations,
})

export default connect(mapStateToProps)(StateSwitcher);

export { StateSwitcher as plain, mapStateToProps};
