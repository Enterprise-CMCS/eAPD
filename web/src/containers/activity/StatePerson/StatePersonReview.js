import PropTypes from 'prop-types';
import React from 'react';

import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';

const StatePersonReview = ({
  item: { desc, title, years },
  expand,
  index,
  onDeleteClick
}) => {
  return (
    <Review
      heading={`${index + 1}. ${title}`}
      headingLevel={6}
      onDeleteClick={onDeleteClick}
      onEditClick={expand}
    >
      {desc}
      <div className="ds-u-margin-top--2">
        {Object.entries(years).map(([year, { amt, perc }]) => (
          <div key={year}>
            <strong>{year} Costs:</strong> <Dollars>{amt}</Dollars> |{' '}
            <strong>FTEs:</strong> {perc}
          </div>
        ))}
      </div>
    </Review>
  );
};

StatePersonReview.propTypes = {
  expand: PropTypes.func.isRequired,

  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    years: PropTypes.object.isRequired
  }).isRequired,
  onDeleteClick: PropTypes.func
};

StatePersonReview.defaultProps = {
  onDeleteClick: null
};

export default StatePersonReview;
