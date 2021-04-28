import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Badge, TextField } from '@cmsgov/design-system';

import Icon, { faTimesCircle } from "./Icons";

const MultiSelect = ({ options }) => {
  
  const [itemList, setItemList] = useState(options);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOnChange = (item) => {
    console.log(item);
    const newSelection = selectedOptions;
    newSelection.push(item);
    setSelectedOptions(newSelection);
  };

  const removeItemFromSelection = (item) => {
    console.log(selectedOptions);
    console.log("item to be removed", item.target.dataset.id);
  };

  const filterItems = query => {
    setItemList(options.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1));
  }

  return (
    <Autocomplete
      items={itemList}
      onChange={handleOnChange}
      onInputValueChange={filterItems}
      clearSearchButton={false}
    >
      {/* render a collection of badges here with a button to remove them */}
      {selectedOptions.map(el => {
        return (
          <Badge key={el.id} variation="info">
            {el.name} {' '} 
            <Icon data-id={el.id} icon={faTimesCircle} onClick={removeItemFromSelection} />
          </Badge>          
        )
      })}
      <TextField
        hint=""
        label="Search state or affiliation"
        labelClassName="ds-u-margin-top--0"
        name="Downshift_autocomplete"
      />
    </Autocomplete>
  )
};

MultiSelect.defaultProps = {

};

MultiSelect.propTypes = {
  options: PropTypes.array.isRequired
};

export default MultiSelect;
