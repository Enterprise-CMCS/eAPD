import PropTypes from 'prop-types';
import React from 'react';

import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';

const StatePersonReview = ({
  item: { description, title, years },
  expand,
  index,
  onDeleteClick
}) => {
  return (
    <Review
      heading={`${index + 1}. ${title || 'Personnel title not specified'}`}
      headingLevel="5"
      onDeleteClick={onDeleteClick}
      onEditClick={expand}
      ariaLabel={`${index + 1}. ${title || 'Personnel title not specified'}`}
      objType="State Staff Expenses"
    >
      {description}
      <div className="ds-u-margin-top--2">
        {Object.entries(years).map(([year, { amt, perc }]) => (
          <div key={year}>
            <strong>FFY {year} Cost: </strong>
            <Dollars>{amt}</Dollars> | <strong>FTEs: </strong>
            {perc === '' ? '0' : perc} | <strong>Total: </strong>
            <Dollars>{amt * perc}</Dollars>
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
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    years: PropTypes.object.isRequired
  }).isRequired,
  onDeleteClick: PropTypes.func
};

StatePersonReview.defaultProps = {
  onDeleteClick: null
};

export default StatePersonReview;
