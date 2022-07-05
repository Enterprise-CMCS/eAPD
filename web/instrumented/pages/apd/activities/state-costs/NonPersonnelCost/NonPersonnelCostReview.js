import PropTypes from 'prop-types';
import React from 'react';

import Dollars from '../../../../../components/Dollars';
import Review from '../../../../../components/Review';

const NonPersonnelCostReview = ({
  item: { category, description, years },
  expand,
  index,
  onDeleteClick
}) => {
  return (
    <Review
      heading={`${index + 1}. ${category || 'Category not specified'}`}
      headingLevel="5"
      onDeleteClick={onDeleteClick}
      onEditClick={expand}
      ariaLabel={`${index + 1}. ${category}`}
      objType="Other State Expense"
    >
      {description}
      <div className="ds-u-margin-top--2">
        {Object.entries(years).map(([year, cost]) => (
          <div key={year}>
            <strong>FFY {year} Cost:</strong> <Dollars>{cost}</Dollars>
          </div>
        ))}
      </div>
    </Review>
  );
};

NonPersonnelCostReview.propTypes = {
  item: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    years: PropTypes.object.isRequired
  }).isRequired,
  expand: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func
};

NonPersonnelCostReview.defaultProps = {
  onDeleteClick: null
};

export default NonPersonnelCostReview;
