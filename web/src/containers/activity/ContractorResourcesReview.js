import { Button, Review } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import Dollars from '../../components/Dollars';

const getHumanReadableDateRange = (startDate, endDate) => {
  const [startYear, startMonth, startDay] = startDate.split('-');
  const [endYear, endMonth, endDay] = endDate.split('-');

  if (startDay && startMonth && startYear && endDay && endMonth && endYear) {
    return `${startMonth}/${startDay}/${startYear} - ${endMonth}/${endDay}/${endYear}`;
  }
  return null;
};

const ContractorReview = ({
  idx,
  contractor,
  years,
  handleDelete,
  handleEdit
}) => {
  const dateRangeForHumans = useMemo(
    () => getHumanReadableDateRange(contractor.start, contractor.end),
    [contractor.end, contractor.start]
  );

  return (
    <Review
      heading={`${idx + 1}. ${contractor.name}`}
      editContent={
        <div>
          <Button size="small" variation="transparent" onClick={handleEdit}>
            Edit
          </Button>
          |
          <Button size="small" variation="transparent" onClick={handleDelete}>
            Remove
          </Button>
        </div>
      }
    >
      <p className="ds-u-margin-top--2">{contractor.desc}</p>
      <ul className="ds-c-list--bare">
        <li>
          <strong>Contract term:</strong>{' '}
          {dateRangeForHumans || (
            <span className="ds-u-color--gray">dates not completed</span>
          )}
        </li>
        <li>
          <strong>Total cost:</strong>{' '}
          <Dollars long>{contractor.totalCost}</Dollars>
        </li>
        {years.map(ffy => (
          <li key={ffy}>
            <strong>FFY {ffy} cost:</strong>{' '}
            <Dollars long>{contractor.years[ffy]}</Dollars>
          </li>
        ))}
      </ul>
    </Review>
  );
};

ContractorReview.propTypes = {
  idx: PropTypes.number.isRequired,
  contractor: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired
};

export default ContractorReview;
