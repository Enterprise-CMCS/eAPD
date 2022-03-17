import { Dropdown, TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { titleCase } from 'title-case';
import {
  setMedicaidDirectorEmail,
  setMedicaidDirectorName,
  setMedicaidDirectorPhoneNumber,
  setMedicaidOfficeAddress1,
  setMedicaidOfficeAddress2,
  setMedicaidOfficeCity,
  setMedicaidOfficeState,
  setMedicaidOfficeZip
} from '../actions/editApd';
import { t } from '../i18n';
import { selectKeyStatePersonnel } from '../reducers/apd.selectors';
import { selectState } from '../reducers/user';
import { STATES } from '../util';

const dirTRoot = 'apd.stateProfile.directorAndAddress.director';
const offTRoot = 'apd.stateProfile.directorAndAddress.address';

const ApdStateProfile = ({
  defaultStateID,
  setEmail,
  setName,
  setPhone,
  setAddress1,
  setAddress2,
  setCity,
  setState,
  setZip,
  keyStatePersonnel
}) => {
  const { medicaidDirector, medicaidOffice } = keyStatePersonnel;
  
  const handleChange = action => ({ target: { value } }) => {
    action(value);
  };

  return (
    <Fragment>
      <fieldset>
        <legend className="ds-u-padding-bottom--1">
          {titleCase(t(`${dirTRoot}.title`))}
        </legend>
        <TextField
          name="apd-state-profile-mdname"
          label={t(`${dirTRoot}.labels.name`)}
          value={medicaidDirector.name}
          onChange={handleChange(setName)}
        />
        <TextField
          name="apd-state-profile-mdemail"
          label={t(`${dirTRoot}.labels.email`)}
          value={medicaidDirector.email}
          onChange={handleChange(setEmail)}
        />
        <TextField
          name="apd-state-profile-mdphone"
          label={t(`${dirTRoot}.labels.phone`)}
          value={medicaidDirector.phone}
          onChange={handleChange(setPhone)}
        />
      </fieldset>

      <fieldset>
        <legend className="ds-u-padding-bottom--1">
          {titleCase(t(`${offTRoot}.title`))}
        </legend>
        <TextField
          name="apd-state-profile-addr1"
          label={t(`${offTRoot}.labels.address1`)}
          value={medicaidOffice.address1}
          onChange={handleChange(setAddress1)}
        />
        <TextField
          name="apd-state-profile-addr2"
          label={t(`${offTRoot}.labels.address2`)}
          hint="Optional"
          value={medicaidOffice.address2}
          onChange={handleChange(setAddress2)}
        />
        <div className="ds-l-row">
          <TextField
            name="apd-state-profile-city"
            label={t(`${offTRoot}.labels.city`)}
            value={medicaidOffice.city}
            className="ds-l-col--6"
            onChange={handleChange(setCity)}
          />
          <div className="ds-u-clearfix ds-l-col--6">
            <Dropdown
              id="apd-state-profile-state"
              name="apd-state-profile-state"
              label={t(`${offTRoot}.labels.state`)}
              value={medicaidOffice.state || defaultStateID}
              onChange={handleChange(setState)}
              options={STATES.map(({ id, name }) => ({
                label: name,
                value: id.toUpperCase()
              }))}
            />
          </div>
        </div>
        <TextField
          name="apd-state-profile-zip"
          label={t(`${offTRoot}.labels.zip`)}
          value={medicaidOffice.zip}
          mask="zip"
          onChange={handleChange(setZip)}
        />
      </fieldset>
    </Fragment>
  );
};

ApdStateProfile.propTypes = {
  defaultStateID: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setPhone: PropTypes.func.isRequired,
  setAddress1: PropTypes.func.isRequired,
  setAddress2: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  setZip: PropTypes.func.isRequired,
  keyStatePersonnel: PropTypes.shape({
    medicaidDirector: PropTypes.object,
    medicaidOffice: PropTypes.object,
    keyPersonnel: PropTypes.array
  }).isRequired
};

const mapStateToProps = state => ({
  defaultStateID: selectState(state).id,
  keyStatePersonnel: selectKeyStatePersonnel(state)
});

const mapDispatchToProps = {
  setEmail: setMedicaidDirectorEmail,
  setName: setMedicaidDirectorName,
  setPhone: setMedicaidDirectorPhoneNumber,
  setAddress1: setMedicaidOfficeAddress1,
  setAddress2: setMedicaidOfficeAddress2,
  setCity: setMedicaidOfficeCity,
  setState: setMedicaidOfficeState,
  setZip: setMedicaidOfficeZip
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdStateProfile);

export { ApdStateProfile as plain, mapStateToProps, mapDispatchToProps };
