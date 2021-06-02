import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Dollars from '../../components/Dollars';

const ApdStateProfile = ({ stateProfile, keyPersonnel }) => {
  const costByYear = person =>
    person.hasCosts ? (
      <div>
        {Object.keys(person.costs).map(year => (
          <div key={year}>
            <strong>FFY {year} Cost: </strong>
            <Dollars>{person.costs[year]}</Dollars> | <strong>FTE: </strong>
            {person.fte[year]} | <strong>Total: </strong>
            <Dollars>{person.costs[year] * person.fte[year]}</Dollars>
          </div>
        ))}
      </div>
    ) : (
      <div>
        <strong>Total cost:</strong> <Dollars>{0}</Dollars>
      </div>
    );

  const buildPerson = (person, index) => {
    let displayName = person.name;
    if (person.name === '') {
      displayName = person.isPrimary
        ? 'Primary Point of Contact name not specified'
        : 'Key Personnel name not specified';
    }
    return (
      <Fragment>
        <ul className="ds-c-list--bare">
          <li>
            <h3>
              {index + 1}. {displayName}
            </h3>
          </li>
          {person.isPrimary ? <li>Primary APD Point of Contact</li> : null}
          <li>{person.position || 'Role not specified'}</li>
          <li>
            <strong>Email: </strong>
            {person.email}
          </li>
          <li>{costByYear(person)}</li>
        </ul>
      </Fragment>
    );
  };

  const MedicaidOffice = ({ medicaidOffice }) => {
    const {address1, address2, city, state, zip } = medicaidOffice;

    // Since we provide a default State don't check if falsy
    if(!address1 && !address2 && !city && !zip) {
      return ( <span>No reponse was provided</span> ) ;
    }

    return (
      <address>
        {address1}
        <br />
        {address2 &&
          address2}
        {city}, {state}{' '}
        {zip}
      </address>
    )
  }

  return (
    <div>
      <h2>Key State Personnel</h2>
      <h3>Medicaid director</h3>
      <ul className="ds-c-list--bare">
        <li><strong>Name: </strong> {stateProfile.medicaidDirector.name}</li>
        <li><strong>Email: </strong>{stateProfile.medicaidDirector.email}</li>
        <li><strong>Phone: </strong>{stateProfile.medicaidDirector.phone}</li>
      </ul>
      <hr className="subsection-rule"/>
      <h3>Medicaid office address</h3>
      <MedicaidOffice medicaidOffice={stateProfile.medicaidOffice}/>
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
  keyPersonnel: PropTypes.array.isRequired,
  medicaidOffice: PropTypes.object.isRequired
};

export default ApdStateProfile;
