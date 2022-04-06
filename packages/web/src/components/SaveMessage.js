import moment from 'moment';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Configure moment to display '1 time-unit ago' instead of 'a time-unit ago'
// https://github.com/moment/moment/issues/3764
moment.updateLocale('en', {
  relativeTime: {
    s: 'seconds',
    m: '1 minute',
    mm: '%d minutes',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years'
  }
});

const SaveMessage = ({ lastSaved, error }) => {
  const [currentMoment, setCurrentMoment] = useState(() => moment());

  useEffect(() => {
    const timerID = setInterval(() => setCurrentMoment(moment()), 1000);
    return () => clearInterval(timerID);
  });

  const lastSavedMoment = moment(lastSaved);
  const difference = currentMoment.diff(lastSavedMoment);
  const duration = moment.duration(difference);
  let result = 'Last saved ';

  if (!error && duration.asMinutes() < 1) {
    return 'Saved';
  }

  if (duration.asDays() < 1) {
    result += lastSavedMoment.format('h:mm a');
  } else if (duration.asYears() < 1) {
    result += lastSavedMoment.format('MMMM D');
  } else {
    result += lastSavedMoment.format('MMMM D, YYYY');
  }

  result += ` (${lastSavedMoment.fromNow()})`;
  return result;
};

SaveMessage.propTypes = {
  lastSaved: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
    PropTypes.string
  ]).isRequired
};

export default SaveMessage;
