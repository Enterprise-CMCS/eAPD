import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Review from '../../components/Review';

const MilestoneReview = ({ idx, endDate, expand, name, onDelete }) => {
  const del = useMemo(() => (onDelete ? () => onDelete(idx) : null), [
    onDelete
  ]);

  return (
    <Review
      heading={`${idx + 1}. ${name}`}
      headingLevel={4}
      onDeleteClick={del}
      onEditClick={expand}
    >
      <p className="ds-u-margin-top--2">
        <strong>Planned end date:</strong> {endDate}
      </p>
    </Review>
  );
};

MilestoneReview.propTypes = {
  idx: PropTypes.number.isRequired,
  endDate: PropTypes.string.isRequired,
  expand: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default MilestoneReview;
