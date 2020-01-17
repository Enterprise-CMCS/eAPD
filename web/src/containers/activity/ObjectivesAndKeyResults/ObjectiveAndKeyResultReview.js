import PropTypes from 'prop-types';
import React from 'react';
import Review from '../../../components/Review';

const GoalReview = ({
  item: { keyResults, objective },
  expand,
  onDeleteClick
}) => (
  <Review
    heading="Objective:"
    headingLevel={6}
    onDeleteClick={onDeleteClick}
    onEditClick={expand}
  >
    <h5 className="ds-h4 ds-u-margin-top--2">{objective}</h5>
    {keyResults.map(({ baseline, keyResult, target }) => (
      <p key={keyResult} className="ds-u-margin-top--2">
        <strong>Key result:</strong> {keyResult}
        <br />
        <strong>Target:</strong> {target}
        <br />
        <strong>Baseline:</strong> {baseline}
      </p>
    ))}
  </Review>
);

GoalReview.propTypes = {
  expand: PropTypes.func.isRequired,
  item: PropTypes.shape({
    keyResults: PropTypes.array,
    objective: PropTypes.string
  }).isRequired,
  onDeleteClick: PropTypes.func
};

GoalReview.defaultProps = {
  onDeleteClick: null
};

export default GoalReview;
