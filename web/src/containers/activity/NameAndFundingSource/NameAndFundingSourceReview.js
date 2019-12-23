import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Review from '../../../components/Review';

const NameAndFundingSourceReview = ({
  disableExpand,
  item: { fundingSource, name },
  expand,
  index,
  onDeleteClick
}) => {
  return (
    <div
      className={`activity--body activity--body__collapsed activity--body__${
        index === -1 ? 'first' : 'notfirst'
      }`}
    >
      <Review
        heading={
          <Fragment>
            {index + 2}. {name}{' '}
            <span style={{ fontWeight: 'normal' }}>
              {index === -1 && <em>(required activity)</em>} |
            </span>{' '}
            <span>{fundingSource}</span>
          </Fragment>
        }
        headingLevel={4}
        // onDeleteClick={disableExpand ? null : onDeleteClick}
        onEditClick={disableExpand ? null : expand}
      />
    </div>
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
