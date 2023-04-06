import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Dollars from '../../../../../components/Dollars';
import Review from '../../../../../components/Review';
import { stateDateRangeToDisplay } from '../../../../../util';

const ContractorResourceReview = ({
  index,
  item: { description, end, hourly, name, start, totalCost, useHourly, years },
  expand,
  onDeleteClick
}) => {
  const apdFFYs = useMemo(() => Object.keys(years), [years]);

  const dateRangeForHumans = useMemo(
    () => stateDateRangeToDisplay(start, end),
    [end, start]
  );

  return (
    <Review
      heading={`${index + 1}. ${
        name || 'Private Contractor or Vendor Name not specified'
      }`}
      headingLevel="5"
      objType="Private Contractor"
      onDeleteClick={onDeleteClick}
      onEditClick={expand}
      ariaLabel={`${index + 1}. ${
        name || 'Private Contractor or Vendor Name not specified'
      }`}
    >
      {/* eslint-disable react/no-danger */}
      <p
        dangerouslySetInnerHTML={{
          __html:
            description ||
            'Procurement Methodology and Description of Services not specified'
        }}
        className="ds-u-margin-top--0"
      />
      <ul className="ds-c-list--bare">
        <li>
          <strong>Full Contract Term:</strong> {dateRangeForHumans}
        </li>
        <li>
          <strong>Total Contract Cost:</strong> <Dollars>{totalCost}</Dollars>
        </li>
        {apdFFYs.map(ffy =>
          useHourly === 'false' || useHourly == false ? (
            <li key={ffy}>
              <strong>FFY {ffy} Cost:</strong> <Dollars>{years[ffy]}</Dollars>
            </li>
          ) : (
            <li key={ffy} className="ds-u-margin-left--3">
              <strong>FFY {ffy} Cost:</strong>
              <div className="subform__container ds-u-margin-y--1">
                <div className="ds-u-margin-y--1">
                  <strong>Number of Hours:</strong> {hourly[ffy].hours}
                </div>
                <div className="ds-u-margin-y--1">
                  <strong>Hourly Rate:</strong>{' '}
                  <Dollars>{hourly[ffy].rate}</Dollars>/hour
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </Review>
  );
};

ContractorResourceReview.propTypes = {
  expand: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    description: PropTypes.string,
    end: PropTypes.string,
    hourly: PropTypes.object,
    name: PropTypes.string,
    start: PropTypes.string,
    totalCost: PropTypes.number,
    useHourly: PropTypes.bool,
    years: PropTypes.object
  }).isRequired,
  onDeleteClick: PropTypes.func
};

ContractorResourceReview.defaultProps = {
  onDeleteClick: null
};

export default ContractorResourceReview;
