const {
  defaultAPDYears,
  defaultAPDYearOptions,
  APD_TYPE
} = require('@cms-eapd/common');
const getNewHitechApd = require('./post.hitech.data');
const getNewMmisApd = require('./post.mmis.data');

const getNewApd = apdType => {
  const years = defaultAPDYears();
  const yearOptions = defaultAPDYearOptions();

  let specific = {};
  switch (apdType) {
    case APD_TYPE.HITECH: {
      specific = getNewHitechApd();
      break;
    }
    case APD_TYPE.MMIS: {
      specific = getNewMmisApd();
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

module.exports = getNewApd;
