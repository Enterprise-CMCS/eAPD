import {
  MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING,
  UPDATE_STATUS_LABEL_MAPPING
} from '@cms-eapd/common';

export const updateStatusChoices = updateStatus => {
  let list = [];
  Object.keys(updateStatus).map(key => {
    list.push({
      label: UPDATE_STATUS_LABEL_MAPPING[key],
      value: key,
      checked: updateStatus[key]
    });
  });
  return list;
};

export const businessAreaChoices = medicaidBusinessAreas => {
  let list = [];
  Object.keys(medicaidBusinessAreas).map(key => {
    if (key != 'otherMedicaidBusinessAreas') {
      list.push({
        label: MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING[key],
        value: key,
        checked: medicaidBusinessAreas[key]
      });
    }
  });
  return list;
};

export const arrayOfObjectsToStringList = array => {
  let arrayForList = [];
  // move all choices (checked true) to list
  array.map(obj => {
    if (obj.checked) {
      arrayForList.push(obj.label);
    }
  });

  return arrayForList.join(', ');
};
