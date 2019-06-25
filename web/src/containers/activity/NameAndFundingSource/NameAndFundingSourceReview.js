import PropTypes from 'prop-types';
import React from 'react';

import Review from '../../../components/Review';

const NameAndFundingSourceReview = ({
  item: { fundingSource, name },
  expand,
  index,
  onDeleteClick
}) => {
  return (
    <Review
      heading={`${index + 1}. ${name}`}
      headingLevel={3}
      onDeleteClick={onDeleteClick}
      onEditClick={expand}
    >
      Program type: {fundingSource}
    </Review>
  );
};

NameAndFundingSourceReview.propTypes = {
  item: PropTypes.shape({
    fundingSource: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  expand: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func
};

NameAndFundingSourceReview.defaultProps = {
  onDeleteClick: null
};

export default NameAndFundingSourceReview;
