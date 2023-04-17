import React from 'react';
import {
  MEDICAID_BUSINESS_AREAS_DISPLAY_LABEL_MAPPING,
  UPDATE_STATUS_LABEL_MAPPING
} from '@cms-eapd/common';
import Dollars from '../components/Dollars';

export const updateStatusChoices = updateStatus => {
  let list = [];
  Object.keys(updateStatus).map(key => {
    if (key != 'isUpdateAPD') {
      list.push({
        label: UPDATE_STATUS_LABEL_MAPPING[key],
        value: key,
        checked: updateStatus[key]
      });
    }
  });
  return list;
};

export const businessAreaChoices = medicaidBusinessAreas => {
  let list = [];
  Object.keys(medicaidBusinessAreas).map(key => {
    if (
      key != 'other' &&
      key != 'otherMedicaidBusinessAreas' &&
      medicaidBusinessAreas[key]
    ) {
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

export const thId = (program, share) =>
  `program-budget-table-${program}${share ? `-${share}` : ''}`;

export const tdHdrs = (program, share) =>
  `program-budget-table-${program} program-budget-table-${program}-${share}`;

export const ffyList = ffys => {
  return Object.entries(ffys).map(
    ([ffy, { medicaid, federal, total: ffyTotal }], j) => (
      <div key={ffy} className={j === 0 ? 'ds-u-margin-top--2' : ''}>
        <strong>FFY {ffy}:</strong> <Dollars>{ffyTotal}</Dollars> |{' '}
        <strong>Total Computable Medicaid Cost:</strong>{' '}
        <Dollars>{medicaid}</Dollars> (<Dollars>{federal}</Dollars> Federal
        share)
      </div>
    )
  );
};
