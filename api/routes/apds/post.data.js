import {
  defaultAPDYearOptions,
  defaultAPDYears,
  APD_TYPE
} from '@cms-eapd/common';
import getNewHitechApd from './post.hitech.data.js';
import getNewMmisApd from './post.mmis.data.js';

const getNewApd = (apdType, years = [...defaultAPDYears()]) => {
  const yearOptions = defaultAPDYearOptions();

  let specific = {};
  switch (apdType) {
    case APD_TYPE.HITECH: {
      specific = getNewHitechApd(years, yearOptions);
      break;
    }
    case APD_TYPE.MMIS: {
      specific = getNewMmisApd(years, yearOptions);
      break;
    }
    default:
      break;
  }

  return {
    years,
    yearOptions,
    keyStatePersonnel: {
      medicaidDirector: {
        email: '',
        name: '',
        phone: ''
      },
      medicaidOffice: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
      },
      keyPersonnel: []
    },
    ...specific
  };
};

export default getNewApd;
