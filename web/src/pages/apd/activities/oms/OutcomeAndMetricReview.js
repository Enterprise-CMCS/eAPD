import PropTypes from 'prop-types';
import React from 'react';
import Review from '../../../../components/Review';

const OutcomeAndMetricReview = ({
  item: { metrics, outcome },
  expand,
  onDeleteClick
}) => (
  <Review
    onDeleteClick={onDeleteClick}
    onEditClick={expand}
    ariaLabel={outcome || 'Outcome not specified'}
    objType="Outcome and Metrics"
  >
    <p className="ds-u-margin-top--2">
      <strong>Outcome:</strong> {outcome || 'Outcome not specified'}
    </p>
    {metrics.length > 0 ? (
      <p className="ds-u-margin-top--2">
        <ul className="ds-c-list--bare">
          <strong>Metrics:</strong>
          {metrics.map(({ key, metric }, index) => (
            <li key={key} className="ds-u-margin-bottom--2">
              {index + 1}. {metric || 'Metric not specified'}
            </li>
          ))}
        </ul>
      </p>
    ) : null}
  </Review>
);

OutcomeAndMetricReview.propTypes = {
  expand: PropTypes.func.isRequired,
  item: PropTypes.shape({
    metrics: PropTypes.array,
    outcome: PropTypes.string
  }).isRequired,
  onDeleteClick: PropTypes.func
};

OutcomeAndMetricReview.defaultProps = {
  onDeleteClick: null
};

export default OutcomeAndMetricReview;
