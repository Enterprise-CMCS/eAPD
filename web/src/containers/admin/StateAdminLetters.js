import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from "react-router-dom";

import { Button } from '@cmsgov/design-system';

const StateAdminLetters = ({
  
}) => {
  
  const history = useHistory();
  
  const handleAddStateButton = () => {
    history.push("/delegate-state-admin");
  }
  
  return (
    <Button onClick={handleAddStateButton} variation="primary">Add State Admin Letter</Button>
  )
}

export default StateAdminLetters;