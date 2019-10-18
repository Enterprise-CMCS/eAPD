import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';
import { stateDateRangeToDisplay } from '../../../util';

const ContractorResourceReview = ({
  index,
  item: { description, end, name, start, totalCost, years },
  expand,
  onDeleteClick
}) => {
  const apdFFYs = useMemo(() => Object.keys(years), [years]);

  const dateRangeForHumans = useMemo(
    () => stateDateRangeToDisplay(start, end),
    [end, start]
  );

  return (
    <Review
      heading={`${index + 1}. ${name || 'Contractor Name not specified'}`}
      headingLevel={6}
      onDeleteClick={onDeleteClick}
      onEditClick={expand}
    >
      <p className="ds-u-margin-top--0">
        {description || 'Description of Services not specified'}
      </p>
      <ul className="ds-c-list--bare">
        <li>
          <strong>Contract term:</strong> {dateRangeForHumans}
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
  item: PropTypes.shape({
    description: PropTypes.string,
    end: PropTypes.string,
    name: PropTypes.string,
    start: PropTypes.string,
    totalCost: PropTypes.number,
    years: PropTypes.array
  }).isRequired,
  onDeleteClick: PropTypes.func
};

ContractorResourceReview.defaultProps = {
  onDeleteClick: null
};

export default ContractorResourceReview;
