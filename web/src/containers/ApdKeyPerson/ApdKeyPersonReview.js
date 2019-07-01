import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import Dollars from '../../components/Dollars';
import Review from '../../components/Review';

const ApdStateKeyPerson = ({
  expand,
  index,
  item: { costs, email, hasCosts, name, percentTime, position },
  onDeleteClick
}) => {
  const primary = index === 0;

  const totalCost = useMemo(
    () => Object.values(costs).reduce((sum, value) => sum + +value, 0),
    [costs]
  );

  return (
    <Fragment>
      <div className="visibility--screen">
        <Review
          heading={`${index + 1}. ${name}`}
          onDeleteClick={onDeleteClick}
          onEditClick={expand}
        >
          <ul className="ds-c-list--bare">
            <li>{position}</li>
            <li>
              Total cost: <Dollars>{hasCosts ? totalCost : 0}</Dollars>
            </li>
            {primary ? <li>Primary APD Point of Contact</li> : null}
          </ul>
        </Review>
      </div>
      <div className="visibility--print">
        <Review heading={`${index + 1}. ${name}`}>
          <ul className="ds-c-list--bare">
            <li>{email}</li>
            <li>{position}</li>
            <li>Time commitment to project: {percentTime}%</li>
            <li>
              Total cost: <Dollars>{hasCosts ? totalCost : 0}</Dollars>
            </li>
            {primary ? <li>Primary APD Point of Contact</li> : null}
          </ul>
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
    percentTime: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired
  }).isRequired,
  onDeleteClick: PropTypes.func
};

ApdStateKeyPerson.defaultProps = {
  onDeleteClick: null
};

export default ApdStateKeyPerson;
