import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import Dollars from '../../components/Dollars';
import Review from '../../components/Review';

const ApdStateKeyPerson = ({
  expand,
  index,
  item: { costs, email, hasCosts, name, fte, position },
  onDeleteClick
}) => {
  const primary = index === 0;

  const costByYear = useMemo(
    () => (
      <div className="ds-u-margin-top--2">
        {hasCosts ? (
          Object.keys(costs).map(year => (
            <div key={year}>
              <strong>{year} </strong>
              <strong>Costs: </strong>
              <Dollars>{costs[year]}</Dollars> | <strong>FTEs: </strong>
              {fte[year]} | <strong>Total: </strong>
              <Dollars>{costs[year] * fte[year]}</Dollars>
            </div>
          ))
        ) : (
          <div>
            <strong>Total cost:</strong> <Dollars>{0}</Dollars>
          </div>
        )}
      </div>
    ),
    [costs, fte]
  );

  return (
    <Fragment>
      <div className="visibility--screen">
        <Review
          heading={`${index + 1}. ${name}`}
          headingLevel="4"
          onDeleteClick={onDeleteClick}
          onEditClick={expand}
        >
          <ul className="ds-c-list--bare">
            {primary ? <li>Primary APD Point of Contact</li> : null}
            <li>{position}</li>
          </ul>
          {costByYear}
        </Review>
      </div>
      <div className="visibility--print">
        <Review heading={`${index + 1}. ${name}`}>
          <ul className="ds-c-list--bare">
            {primary ? <li>Primary APD Point of Contact</li> : null}
            <li>{position}</li>
            <li>{email}</li>
          </ul>
          {costByYear}
        </Review>
      </div>
    </Fragment>
  );
};

ApdStateKeyPerson.propTypes = {
  expand: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    costs: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    hasCosts: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    fte: PropTypes.object.isRequired,
    position: PropTypes.string.isRequired
  }).isRequired,
  onDeleteClick: PropTypes.func
};

ApdStateKeyPerson.defaultProps = {
  onDeleteClick: null
};

export default ApdStateKeyPerson;
