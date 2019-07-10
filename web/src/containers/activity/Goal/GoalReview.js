import PropTypes from 'prop-types';
import React from 'react';
import Review from '../../../components/Review';

const GoalReview = ({
  item: { description, objective },
  index,
  expand,
  onDeleteClick
}) => (
  <Review
    heading={`${index + 1}. ${description || ''}`}
    headingLevel={6}
    onDeleteClick={onDeleteClick}
    onEditClick={expand}
  >
    <p className="ds-u-margin-top--2">
      <strong>Benchmark:</strong> {objective}
    </p>
  </Review>
);

GoalReview.propTypes = {
  expand: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string,
    key: PropTypes.string,
    objective: PropTypes.string
  }).isRequired,
  onDeleteClick: PropTypes.func
};

GoalReview.defaultProps = {
  onDeleteClick: null
};

export default GoalReview;
