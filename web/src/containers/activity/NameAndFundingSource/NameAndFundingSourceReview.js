import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Review from '../../../components/Review';

const NameAndFundingSourceReview = ({
  disableExpand,
  item: { fundingSource, name },
  expand,
  index
}) => {
  return (
    <div
      className={`ds-u-padding-y--1 activity--body activity--body__collapsed activity--body__${
        index === -1 ? 'first' : 'notfirst'
      }`}
    >
      <Review
        heading={
          <Fragment>
            {index + 2}. {name}{' '}
            {index === -1 && (
              <em style={{ fontWeight: 'normal' }}>(required activity)</em>
            )}{' '}
            | {fundingSource}
          </Fragment>
        }
        headingLevel="4"
        onEditClick={disableExpand ? null : expand}
        objType="Funding Source"
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
  index: PropTypes.number.isRequired
};

NameAndFundingSourceReview.defaultProps = {
  disableExpand: false,
  expand: () => {}
};

export default NameAndFundingSourceReview;
