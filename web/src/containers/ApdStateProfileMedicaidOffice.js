import { FormLabel, Select, TextField } from '@cmsgov/design-system-core';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateApd } from '../actions/apd';
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

  const handleChange = (action, area, field) => ({ target: { value } }) => {
    dispatch(updateApd({ stateProfile: { [area]: { [field]: value } } }));
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
          onChange={handleChange(
            setMedicaidDirectorName,
            'medicaidDirector',
            'name'
          )}
        />
        <TextField
          name="apd-state-profile-mdemail"
          label={t(`${dirTRoot}.labels.email`)}
          value={medicaidDirector.email}
          onChange={handleChange(
            setMedicaidDirectorEmail,
            'medicaidDirector',
            'email'
          )}
        />
        <TextField
          name="apd-state-profile-mdphone"
          label={t(`${dirTRoot}.labels.phone`)}
          value={medicaidDirector.phone}
          onChange={handleChange(
            setMedicaidDirectorPhoneNumber,
            'medicaidDirector',
            'phone'
          )}
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
          onChange={handleChange(
            setMedicaidOfficeAddress1,
            'medicaidOffice',
            'address1'
          )}
        />
        <TextField
          name="apd-state-profile-addr2"
          label={t(`${offTRoot}.labels.address2`)}
          hint="Optional"
          value={medicaidOffice.address2}
          onChange={handleChange(
            setMedicaidOfficeAddress2,
            'medicaidOffice',
            'address2'
          )}
        />
        <div className="ds-l-row">
          <TextField
            name="apd-state-profile-city"
            label={t(`${offTRoot}.labels.city`)}
            value={medicaidOffice.city}
            className="ds-l-col--6"
            onChange={handleChange(
              setMedicaidOfficeCity,
              'medicaidOffice',
              'city'
            )}
          />
          <div className="ds-u-clearfix ds-l-col--6">
            <FormLabel component="label">
              {t(`${offTRoot}.labels.state`)}
            </FormLabel>
            <Select
              name="apd-state-profile-state"
              label={t(`${offTRoot}.labels.state`)}
              value={medicaidOffice.state || defaultStateID}
              onChange={handleChange(
                setMedicaidOfficeState,
                'medicaidOffice',
                'state'
              )}
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
          onChange={handleChange(setMedicaidOfficeZip, 'medicaidOffice', 'zip')}
        />
      </fieldset>
    </Fragment>
  );
};

export default ApdStateProfile;
