import { Dropdown, TextField } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
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
} from '../../../redux/actions/editApd';
import { t } from '../../../i18n';
import { selectKeyStatePersonnel } from '../../../redux/selectors/apd.selectors';
import { selectState } from '../../../redux/reducers/user';
import { STATES } from '../../../util';

import Joi from 'joi';

const dirTRoot = 'apd.stateProfile.directorAndAddress.director';
const offTRoot = 'apd.stateProfile.directorAndAddress.address';

const stateProfileSchema = Joi.object({
  apdStateProfileName: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide the name of the State Medicaid Director.',
    'string.empty': 'Provide the name of the State Medicaid Director.',
    'string.min': 'Provide the name of the State Medicaid Director.'
  }),
  apdStateProfileEmail: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide the email address of the State Medicaid Director.',
    'string.empty': 'Provide the email address of the State Medicaid Director.',
    'string.min': 'Provide the email address of the State Medicaid Director.'
  }),
  apdStateProfilePhone: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a valid phone number for the State Medicaid Director.',
    'string.empty': 'Provide a valid phone number for the State Medicaid Director.',
    'string.min': 'Provide a valid phone number for the State Medicaid Director.'
  }),
  apdStateProfileAddr1: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a mailing street address for the Medicaid office.',
    'string.empty': 'Provide a mailing street address for the Medicaid office.',
    'string.min': 'Provide a mailing street address for the Medicaid office.'
  }),
  apdStateProfileAddr2: Joi.any(),
  apdStateProfileCity: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a city name.',
    'string.empty': 'Provide a city name.',
    'string.min': 'Provide a city name.'
  }),
  apdStateProfileState: Joi.any(),
  apdStateProfileZip: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a zip code.',
    'string.empty': 'Provide a zip code.',
    'string.min': 'Provide a zip code.'
  })
})

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
  ApdStateProfile.displayName = 'ApdStateProfile';

  const { medicaidDirector, medicaidOffice } = keyStatePersonnel;


  const handleChange =
    action =>
    ({ target: { value } }) => {
      action(value);
    };

  return (
    <Fragment>
      <fieldset>
        <legend className="ds-u-padding-bottom--1">
          {titleCase(t(`${dirTRoot}.title`))}
        </legend>
        <TextField
          name="apdStateProfileName"
          label={t(`${dirTRoot}.labels.name`)}
          value={medicaidDirector.name}
          onChange={handleChange(setName)}
        />
        <TextField
          name="apdStateProfileEmail"
          label={t(`${dirTRoot}.labels.email`)}
          value={medicaidDirector.email}
          onChange={handleChange(setEmail)}
        />
        <TextField
          name="apdStateProfilePhone"
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
          name="apdStateProfileAddr1"
          label={t(`${offTRoot}.labels.address1`)}
          value={medicaidOffice.address1}
          onChange={handleChange(setAddress1)}
        />
        <TextField
          name="apdStateProfileAddr2"
          label={t(`${offTRoot}.labels.address2`)}
          hint="Optional"
          value={medicaidOffice.address2}
          onChange={handleChange(setAddress2)}
        />
        <div className="ds-l-row">
          <TextField
            name="apdStateProfileCity"
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
          name="apdStateProfileZip"
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
