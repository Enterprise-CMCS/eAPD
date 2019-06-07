import PropTypes from 'prop-types';
import React from 'react';

import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';

const NonPersonnelCostReview = ({
  category,
  desc,
  expand,
  handleDelete,
  idx,
  years
}) => {
  return (
    <Review
      heading={`${idx + 1}. ${category}`}
      headingLevel={4}
      onDeleteClick={handleDelete}
      onEditClick={expand}
    >
      {desc}
      <div className="ds-u-margin-top--2">
        {Object.entries(years).map(([year, cost]) => (
          <div key={year}>
            <strong>{year} Costs:</strong> <Dollars>{cost}</Dollars>
          </div>
        ))}
      </div>
    </Review>
  );
};

NonPersonnelCostReview.propTypes = {
  category: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  expand: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  years: PropTypes.object.isRequired
};

export default NonPersonnelCostReview;
