import PropTypes from 'prop-types';
import React from 'react';

import Review from '../../../components/Review';

const NameAndFundingSourceReview = ({
  disableExpand,
  item: { fundingSource, name },
  expand,
  index,
  onDeleteClick
}) => {
  return (
    <Review
      heading={`${index + 2}. ${name}`}
      headingLevel={3}
      onDeleteClick={disableExpand ? null : onDeleteClick}
      onEditClick={disableExpand ? null : expand}
    >
      Program type: {fundingSource}
    </Review>
  );
};

NameAndFundingSourceReview.propTypes = {
  disableExpand: PropTypes.bool,
  item: PropTypes.shape({
    fundingSource: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  expand: PropTypes.func,
  index: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func
};

NameAndFundingSourceReview.defaultProps = {
  disableExpand: false,
  expand: () => {},
  onDeleteClick: null
};

export default NameAndFundingSourceReview;
