import PropTypes from 'prop-types';
import React from 'react';
import Review from '../../../components/Review';

const ObjectiveAndKeyResultReview = ({
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
    {keyResults.map(({ baseline, key, keyResult, target }) => (
      <p key={key} className="ds-u-margin-top--2">
        <strong>Key result:</strong> {keyResult}
        <br />
        <strong>Target:</strong> {target}
        <br />
        <strong>Baseline:</strong> {baseline}
      </p>
    ))}
  </Review>
);

ObjectiveAndKeyResultReview.propTypes = {
  expand: PropTypes.func.isRequired,
  item: PropTypes.shape({
    keyResults: PropTypes.array,
    objective: PropTypes.string
  }).isRequired,
  onDeleteClick: PropTypes.func
};

ObjectiveAndKeyResultReview.defaultProps = {
  onDeleteClick: null
};

export default ObjectiveAndKeyResultReview;
