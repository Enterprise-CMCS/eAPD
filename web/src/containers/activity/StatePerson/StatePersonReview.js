import PropTypes from 'prop-types';
import React from 'react';

import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';

const StatePersonReview = ({
  desc,
  expand,
  handleDelete,
  idx,
  title,
  years
}) => {
  return (
    <Review
      heading={`${idx + 1}. ${title}`}
      headingLevel={6}
      onDeleteClick={handleDelete}
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
  desc: PropTypes.string.isRequired,
  expand: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  years: PropTypes.object.isRequired
};

export default StatePersonReview;
