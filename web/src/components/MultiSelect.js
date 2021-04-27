import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Badge, TextField } from '@cmsgov/design-system';

import Icon, { faTimesCircle } from '../components/Icons';

const MultiSelect = ({ options, handleSelection }) => {
  
  const [selectedOptions, setSelectedOptions] = useState([]);

  const addOption = (selectedItem) => {
    console.log("selected option:", selectedItem);
  };
  console.log("options", options);

  const removeItemFromList = (item) => {
    console.log("item to be removed", item.target.parentElement)
  };

  return (
    <Autocomplete
      items={options}
      label="Select from the options below:"
      onChange={(selectedItem) => console.log(selectedItem)}
      onInputValueChange={(inputVal) => console.log('[Autocomplete]: ' + inputVal)}
    >
      {/* render a collection of badges here with a button to remove them */}
      <Badge variation="info">Maryland {' '} <Icon icon={faTimesCircle} onClick={removeItemFromList} /></Badge>
      <TextField
        hint=""
        label=""
        labelClassName="ds-u-margin-top--0"
        name="Downshift_autocomplete"
      />
    </Autocomplete>
  )
};

MultiSelect.defaultProps = {

};

MultiSelect.propTypes = {

};

export default MultiSelect;
