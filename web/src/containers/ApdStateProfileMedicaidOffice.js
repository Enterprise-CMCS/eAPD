import { FormLabel, Select, TextField } from '@cmsgov/design-system-core';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import { t } from '../i18n';
import { STATES } from '../util';

class ApdStateProfile extends Component {
  handleChange = (area, field) => e => {
    const { updateApd } = this.props;
    updateApd({ stateProfile: { [area]: { [field]: e.target.value } } });
  };

  render() {
    const {
      defaultStateID,
      stateProfile: { medicaidDirector, medicaidOffice }
    } = this.props;
    const dirTRoot = 'apd.stateProfile.directorAndAddress.director';
    const offTRoot = 'apd.stateProfile.directorAndAddress.address';

    return (
      <Fragment>
        <fieldset>
          <legend>{t(`${dirTRoot}.title`)}</legend>
          <TextField
            name="apd-state-profile-mdname"
            label={t(`${dirTRoot}.labels.name`)}
            value={medicaidDirector.name}
            onChange={this.handleChange('medicaidDirector', 'name')}
          />
          <TextField
            name="apd-state-profile-mdemail"
            label={t(`${dirTRoot}.labels.email`)}
            value={medicaidDirector.email}
            onChange={this.handleChange('medicaidDirector', 'email')}
          />
          <TextField
            name="apd-state-profile-mdphone"
            label={t(`${dirTRoot}.labels.phone`)}
            value={medicaidDirector.phone}
            onChange={this.handleChange('medicaidDirector', 'phone')}
          />
        </fieldset>

        <fieldset>
          <legend>{t(`${offTRoot}.title`)}</legend>
          <TextField
            name="apd-state-profile-addr1"
            label={t(`${offTRoot}.labels.address1`)}
            value={medicaidOffice.address1}
            onChange={this.handleChange('medicaidOffice', 'address1')}
          />
          <TextField
            name="apd-state-profile-addr2"
            label={t(`${offTRoot}.labels.address2`)}
            hint="Optional"
            value={medicaidOffice.address2}
            onChange={this.handleChange('medicaidOffice', 'address2')}
          />
          <div className="ds-l-row">
            <TextField
              name="apd-state-profile-city"
              label={t(`${offTRoot}.labels.city`)}
              value={medicaidOffice.city}
              className="ds-l-col--6"
              onChange={this.handleChange('medicaidOffice', 'city')}
            />
            <div className="ds-u-clearfix ds-l-col--6">
              <FormLabel component="label">
                {t(`${offTRoot}.labels.state`)}
              </FormLabel>
              <Select
                name="apd-state-profile-state"
                label={t(`${offTRoot}.labels.state`)}
                value={medicaidOffice.state || defaultStateID}
                onChange={this.handleChange('medicaidOffice', 'state')}
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
            onChange={this.handleChange('medicaidOffice', 'zip')}
          />
        </fieldset>
      </Fragment>
    );
  }
}

ApdStateProfile.propTypes = {
  defaultStateID: PropTypes.string.isRequired,
  stateProfile: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({
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
});
const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdStateProfile);

export { ApdStateProfile as plain, mapStateToProps, mapDispatchToProps };
