import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Dollars from '../../components/Dollars';

const ApdStateProfile = ({ stateProfile, keyPersonnel }) => {
  const totalCost = person =>
    Object.values(person.costs).reduce((sum, value) => sum + +value, 0);
  const costByYear = person =>
    Object.keys(person.costs).map(year => (
      <li key={year}>
        <strong>FFY {year} cost:</strong>{' '}
        <Dollars>{person.costs[year]}</Dollars>
      </li>
    ));
  const buildPerson = (person, index) => {
    return (
      <Fragment>
        <ul className="ds-c-list--bare">
          <li>
            <h3>
              {index + 1}. {person.name}
            </h3>
          </li>
          {person.isPrimary ? <li>Primary APD Point of Contact</li> : null}
          <li>{person.position}</li>
          <li>
            <strong>Email: </strong>
            {person.email}
          </li>
          <li>
            <strong>Percent time allocated to project: </strong>
            {person.percentTime}%
          </li>
          <li>
            <strong>Total costs: </strong>
            <Dollars>{person.hasCosts ? totalCost(person) : '0'}</Dollars>
            {person.hasCosts ? costByYear(person) : null}
          </li>
        </ul>
      </Fragment>
    );
  };

  return (
    <div>
      <h2>Key State Personnel</h2>
      <h3>Medicaid director</h3>
      <ul className="ds-c-list--bare">
        <li>{stateProfile.medicaidDirector.name}</li>
        <li>
          <strong>Email: </strong>
          {stateProfile.medicaidDirector.email}
        </li>
        <li>
          <strong>Phone: </strong>
          {stateProfile.medicaidDirector.phone}
        </li>
      </ul>

      <h3>Medicaid office address</h3>
      <addr>
        {stateProfile.medicaidOffice.address1}
        <br />
        {stateProfile.medicaidOffice.address2 &&
          stateProfile.medicaidOffice.address2}
        {stateProfile.medicaidOffice.city}, {stateProfile.medicaidOffice.state}{' '}
        {stateProfile.medicaidOffice.zip}
      </addr>
      <hr className="section-rule" />
      <h2>Key Personnel and Program Management</h2>
      <ol className="ds-u-padding-left--0">
        {keyPersonnel.map((person, index) => buildPerson(person, index))}
      </ol>
    </div>
  );
};

ApdStateProfile.propTypes = {
  stateProfile: PropTypes.object.isRequired,
  keyPersonnel: PropTypes.array.isRequired
};

export default ApdStateProfile;
