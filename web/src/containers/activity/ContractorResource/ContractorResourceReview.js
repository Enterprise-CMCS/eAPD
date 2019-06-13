import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Review from '../../../components/Review';

import Dollars from '../../../components/Dollars';

const getHumanReadableDateRange = (startDate, endDate) => {
  const [startYear, startMonth, startDay] = startDate.split('-');
  const [endYear, endMonth, endDay] = endDate.split('-');

  if (startDay && startMonth && startYear && endDay && endMonth && endYear) {
    return `${startMonth}/${startDay}/${startYear} - ${endMonth}/${endDay}/${endYear}`;
  }
  return null;
};

const ContractorResourceReview = ({
  index,
  item: { desc, end, name, start, totalCost, years },
  expand,
  onDeleteClick
}) => {
  const apdFFYs = useMemo(() => Object.keys(years), [years]);

  const dateRangeForHumans = useMemo(
    () => getHumanReadableDateRange(start, end),
    [end, start]
  );

  return (
    <Review
      heading={`${index + 1}. ${name || 'Contractor Name not specified'}`}
      onDeleteClick={onDeleteClick}
      onEditClick={expand}
    >
      <p className="ds-u-margin-top--0">
        {desc || 'Description of Services not specified'}
      </p>
      <ul className="ds-c-list--bare">
        <li>
          <strong>Contract term:</strong>{' '}
          {dateRangeForHumans || (
            <span className="ds-u-color--gray">Dates not specified</span>
          )}
        </li>
        <li>
          <strong>Total cost:</strong> <Dollars long>{totalCost}</Dollars>
        </li>
        {apdFFYs.map(ffy => (
          <li key={ffy}>
            <strong>FFY {ffy} cost:</strong>{' '}
            <Dollars long>{years[ffy]}</Dollars>
          </li>
        ))}
      </ul>
    </Review>
  );
};

ContractorResourceReview.propTypes = {
  expand: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({}).isRequired,
  onDeleteClick: PropTypes.func
};

ContractorResourceReview.defaultProps = {
  onDeleteClick: null
};

export default ContractorResourceReview;
