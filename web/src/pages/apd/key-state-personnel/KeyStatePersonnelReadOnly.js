import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { APD_TYPE } from '@cms-eapd/common';

import Dollars from '../../../components/Dollars';

const ApdStateProfile = ({ keyStatePersonnel, apdType }) => {
  const { keyPersonnel } = keyStatePersonnel;

  const costByYear = ({ fte, hasCosts, costs, split, medicaidShare }) =>
    hasCosts ? (
      <div className="ds-u-padding-top--1">
        {Object.keys(costs).map(year => (
          <Fragment key={year}>
            <div key={year} className="ds-u-padding-top--1">
              <strong>FFY {year} Cost: </strong>
              <Dollars>{costs[year]}</Dollars> | <strong>FTE: </strong>
              {fte[year]} | <strong>Total: </strong>
              <Dollars>{costs[year] * fte[year]}</Dollars>
            </div>
            {apdType === APD_TYPE.MMIS && (
              <div>
                <strong>Total Computable Medicaid Cost: </strong>
                <Dollars>
                  {costs[year] * fte[year] * (medicaidShare[year] / 100)}
                </Dollars>{' '}
                ({medicaidShare[year]}% Medicaid Share) |{' '}
                <strong>Federal Share: </strong>
                <Dollars>
                  {costs[year] *
                    fte[year] *
                    (split[year].federal / 100) *
                    (medicaidShare[year] / 100)}
                  )
                </Dollars>
              </div>
            )}
          </Fragment>
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
      <ul className="ds-c-list--bare" key={person.name}>
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
          <br />
        </li>
        <li>{costByYear(person)}</li>
      </ul>
    );
  };

  const MedicaidDirector = ({ medicaidDirector }) => {
    const { name, email, phone } = medicaidDirector;
    if (!name && !email && !phone) {
      return <span>No Medicaid director was provided</span>;
    }

    return (
      <ul className="ds-c-list--bare">
        <li>{name}</li>
        <li>
          <strong>Email: </strong>
          {email}
        </li>
        <li>
          <strong>Phone: </strong>
          {phone}
        </li>
      </ul>
    );
  };
  MedicaidDirector.propTypes = {
    medicaidDirector: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string
    })
  };

  /* eslint-disable react/no-unstable-nested-components */
  const MedicaidOffice = ({ medicaidOffice }) => {
    const { address1, address2, city, state, zip } = medicaidOffice;

    // Since we provide a default State don't check if falsy
    if (!address1 && !address2 && !city && !zip) {
      return <span>No Medicaid office was provided</span>;
    }

    return (
      <p>
        {address1}
        <br />
        {!!address2 && address2}
        {!!address2 && <br />}
        {city}, {state} {zip}
      </p>
    );
  };

  MedicaidOffice.propTypes = {
    medicaidOffice: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired
  };

  const MedicaidInfo = ({ medicaidDirector, medicaidOffice }) => {
    if (
      !medicaidDirector.name &&
      !medicaidDirector.email &&
      !medicaidDirector.phone &&
      !medicaidOffice.address1 &&
      !medicaidOffice.address2 &&
      !medicaidOffice.city &&
      !medicaidOffice.zip
    ) {
      return (
        <span>
          No Medicaid director and corresponding Medicaid office address was
          provided
        </span>
      );
    }
    return (
      <Fragment>
        <h3>Medicaid director</h3>
        <MedicaidDirector medicaidDirector={medicaidDirector} />
        <br/>
        <h3>Medicaid office address</h3>
        <MedicaidOffice medicaidOffice={medicaidOffice} />
      </Fragment>
    );
  };
  MedicaidInfo.propTypes = {
    medicaidDirector: PropTypes.object,
    medicaidOffice: PropTypes.object
  };

  return (
    <div>
      <h2>Key State Personnel</h2>
      <MedicaidInfo
        medicaidDirector={keyStatePersonnel.medicaidDirector}
        medicaidOffice={keyStatePersonnel.medicaidOffice}
      />
      <hr className="section-rule" />
      <h2>Key Personnel and Program Management</h2>
      <ol className="ds-u-padding-left--0" key="key-personnel">
        {keyPersonnel.length > 0
          ? keyPersonnel.map((person, index) => buildPerson(person, index))
          : 'No key state personnel was provided'}
      </ol>
    </div>
  );
};

ApdStateProfile.propTypes = {
  keyStatePersonnel: PropTypes.shape({
    medicaidOffice: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired,
    medicaidDirector: PropTypes.object.isRequired,
    keyPersonnel: PropTypes.array.isRequired
  }).isRequired,
  apdType: PropTypes.string.isRequired
};

export default ApdStateProfile;
