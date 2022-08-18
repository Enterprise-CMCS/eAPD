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

import keyMedicaidSchema from '../../../../../common/schemas/keyMedicaid';

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
  keyStatePersonnel,
  adminCheck
}) => {
  const { medicaidDirector, medicaidOffice } = keyStatePersonnel;

  const {
    control,
    trigger,
    formState: { errors }
  } = useForm({
    defaultValues: {
      medicaidDirector: {
        name: medicaidDirector.name,
        email: medicaidDirector.email,
        phone: medicaidDirector.phone
      },
      medicaidOffice: {
        address1: medicaidOffice.address1,
        address2: medicaidOffice.address2,
        city: medicaidOffice.city,
        zip: medicaidOffice.zip
      }
    },
    resolver: joiResolver(keyMedicaidSchema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <fieldset>
        <legend className="ds-u-padding-bottom--1">
          {titleCase(t(`${dirTRoot}.title`))}
        </legend>
        <Controller
          name={`medicaidDirector.name`}
          control={control}
          value={medicaidDirector.name}
          render={({ field: { onChange, ...props } }) => (
            <TextField
              {...props}
              id="apd-state-profile-mdname"
              label={t(`${dirTRoot}.labels.name`)}
              onChange={({ target: { value } }) => {
                setName(value);
                onChange(value);

                if (adminCheck) {
                  trigger();
                }
              }}
              errorMessage={errors?.medicaidDirector?.name?.message}
              errorPlacement="bottom"
            />
          )}
        />
        <Controller
          name={`medicaidDirector.email`}
          control={control}
          value={medicaidDirector.email}
          render={({ field: { onChange, ...props } }) => (
            <TextField
              {...props}
              id="apd-state-profile-mdemail"
              label={t(`${dirTRoot}.labels.email`)}
              onChange={({ target: { value } }) => {
                setEmail(value);
                onChange(value);

                if (adminCheck) {
                  trigger();
                }
              }}
              errorMessage={errors?.medicaidDirector?.email?.message}
              errorPlacement="bottom"
            />
          )}
        />
        <Controller
          name={`medicaidDirector.phone`}
          control={control}
          value={medicaidDirector.phone}
          render={({ field: { onChange, ...props } }) => (
            <TextField
              {...props}
              id="apd-state-profile-mdphone"
              label={t(`${dirTRoot}.labels.phone`)}
              onChange={({ target: { value } }) => {
                setPhone(value);
                onChange(value);

                if (adminCheck) {
                  trigger();
                }
              }}
              errorMessage={errors?.medicaidDirector?.phone?.message}
              errorPlacement="bottom"
            />
          )}
        />
      </fieldset>

      <fieldset>
        <legend className="ds-u-padding-bottom--1">
          {titleCase(t(`${offTRoot}.title`))}
        </legend>
        <Controller
          name={`medicaidOffice.address1`}
          control={control}
          value={medicaidOffice.address1}
          render={({ field: { onChange, ...props } }) => (
            <TextField
              {...props}
              id="apd-state-profile-addr1"
              label={t(`${offTRoot}.labels.address1`)}
              onChange={({ target: { value } }) => {
                setAddress1(value);
                onChange(value);

                if (adminCheck) {
                  trigger();
                }
              }}
              errorMessage={errors?.medicaidOffice?.address1?.message}
              errorPlacement="bottom"
            />
          )}
        />
        <TextField
          name={`medicaidOffice.address2`}
          id="apd-state-profile-addr2"
          label={t(`${offTRoot}.labels.address2`)}
          hint="Optional"
          value={medicaidOffice.address2}
          onChange={({ target: { value } }) => {
            setAddress2(value);
          }}
        />
        <div className="ds-l-row">
          <Controller
            name={`medicaidOffice.city`}
            control={control}
            value={medicaidOffice.city}
            render={({ field: { onChange, ...props } }) => (
              <TextField
                {...props}
                label={t(`${offTRoot}.labels.city`)}
                className="ds-l-col--6"
                onChange={({ target: { value } }) => {
                  setCity(value);
                  onChange(value);

                  if (adminCheck) {
                    trigger();
                  }
                }}
                errorMessage={errors?.medicaidOffice?.city?.message}
                errorPlacement="bottom"
              />
            )}
          />
          <div className="ds-u-clearfix ds-l-col--6">
            <Dropdown
              id="apd-state-profile-state"
              name={`medicaidOffice.state`}
              label={t(`${offTRoot}.labels.state`)}
              value={medicaidOffice.state || defaultStateID}
              onChange={({ target: { value } }) => {
                setState(value);
              }}
              options={STATES.map(({ id, name }) => ({
                label: name,
                value: id.toUpperCase()
              }))}
            />
          </div>
        </div>
        <Controller
          name={`medicaidOffice.zip`}
          control={control}
          value={medicaidOffice.zip}
          render={({ field: { onChange, ...props } }) => (
            <TextField
              {...props}
              label={t(`${offTRoot}.labels.zip`)}
              mask="zip"
              onChange={({ target: { value } }) => {
                setZip(value);
                onChange(value);

                if (adminCheck) {
                  trigger();
                }
              }}
              errorMessage={errors?.medicaidOffice?.zip?.message}
              errorPlacement="bottom"
            />
          )}
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
  }).isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  defaultStateID: selectState(state).id,
  keyStatePersonnel: selectKeyStatePersonnel(state),
  adminCheck: state.apd.adminCheck
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
