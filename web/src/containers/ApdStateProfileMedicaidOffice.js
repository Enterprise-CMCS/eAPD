import { FormLabel, Select, TextField } from '@cmsgov/design-system-core';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { STATES } from '../util';

const dirTRoot = 'apd.stateProfile.directorAndAddress.director';
const offTRoot = 'apd.stateProfile.directorAndAddress.address';

const ApdStateProfile = () => {
  const dispatch = useDispatch();

  const handleChange = action => ({ target: { value } }) => {
    dispatch(action(value));
  };

  const {
    defaultStateID,
    stateProfile: { medicaidDirector, medicaidOffice }
  } = useSelector(
    ({
      apd: {
        data: { stateProfile }
      },
      user: {
        data: {
          state: { id }
        }
      }
    }) => ({
      defaultStateID: id.toUpperCase(),
      stateProfile
    })
  );

  return (
    <Fragment>
      <fieldset>
        <legend className="ds-u-padding-bottom--1">
          {t(`${dirTRoot}.title`)}
        </legend>
        <TextField
          name="apd-state-profile-mdname"
          label={t(`${dirTRoot}.labels.name`)}
          value={medicaidDirector.name}
          onChange={handleChange(setMedicaidDirectorName)}
        />
        <TextField
          name="apd-state-profile-mdemail"
          label={t(`${dirTRoot}.labels.email`)}
          value={medicaidDirector.email}
          onChange={handleChange(setMedicaidDirectorEmail)}
        />
        <TextField
          name="apd-state-profile-mdphone"
          label={t(`${dirTRoot}.labels.phone`)}
          value={medicaidDirector.phone}
          onChange={handleChange(setMedicaidDirectorPhoneNumber)}
        />
      </fieldset>

      <fieldset>
        <legend className="ds-u-padding-bottom--1">
          {t(`${offTRoot}.title`)}
        </legend>
        <TextField
          name="apd-state-profile-addr1"
          label={t(`${offTRoot}.labels.address1`)}
          value={medicaidOffice.address1}
          onChange={handleChange(setMedicaidOfficeAddress1)}
        />
        <TextField
          name="apd-state-profile-addr2"
          label={t(`${offTRoot}.labels.address2`)}
          hint="Optional"
          value={medicaidOffice.address2}
          onChange={handleChange(setMedicaidOfficeAddress2)}
        />
        <div className="ds-l-row">
          <TextField
            name="apd-state-profile-city"
            label={t(`${offTRoot}.labels.city`)}
            value={medicaidOffice.city}
            className="ds-l-col--6"
            onChange={handleChange(setMedicaidOfficeCity)}
          />
          <div className="ds-u-clearfix ds-l-col--6">
            <FormLabel component="label">
              {t(`${offTRoot}.labels.state`)}
            </FormLabel>
            <Select
              name="apd-state-profile-state"
              label={t(`${offTRoot}.labels.state`)}
              value={medicaidOffice.state || defaultStateID}
              onChange={handleChange(setMedicaidOfficeState)}
            >
              {STATES.map(({ id, name }) => (
                <option key={name} value={id.toUpperCase()}>
                  {name}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <TextField
          name="apd-state-profile-zip"
          label={t(`${offTRoot}.labels.zip`)}
          value={medicaidOffice.zip}
          mask="zip"
          onChange={handleChange(setMedicaidOfficeZip)}
        />
      </fieldset>
    </Fragment>
  );
};

export default ApdStateProfile;
