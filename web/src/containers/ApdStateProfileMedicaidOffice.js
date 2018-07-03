import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import { Section, Subsection } from '../components/Section';
import { Input } from '../components/Inputs';
import { t } from '../i18n';

class ApdStateProfile extends Component {
  handleChange = (area, field) => e => {
    const { updateApd } = this.props;
    updateApd({ stateProfile: { [area]: { [field]: e.target.value } } });
  };

  render() {
    const { medicaidDirector, medicaidOffice } = this.props.stateProfile;
    const dirTRoot = 'apd.stateProfile.directorAndAddress.director';
    const offTRoot = 'apd.stateProfile.directorAndAddress.address';

    return (
      <Fragment>
        <h3 className="mt0">{t(`${dirTRoot}.title`)}</h3>
        <div className="mb3">
          <Input
            name="apd-state-profile-mdname"
            label={t(`${dirTRoot}.labels.name`)}
            value={medicaidDirector.name}
            onChange={this.handleChange('medicaidDirector', 'name')}
          />
          <Input
            name="apd-state-profile-mdemail"
            label={t(`${dirTRoot}.labels.email`)}
            value={medicaidDirector.email}
            onChange={this.handleChange('medicaidDirector', 'email')}
          />
          <Input
            name="apd-state-profile-mdphone"
            label={t(`${dirTRoot}.labels.phone`)}
            value={medicaidDirector.phone}
            onChange={this.handleChange('medicaidDirector', 'phone')}
          />
        </div>
        <h3 className="mt0">{t(`${offTRoot}.title`)}</h3>
        <div>
          <Input
            name="apd-state-profile-addr1"
            label={t(`${offTRoot}.labels.address1`)}
            value={medicaidOffice.address1}
            onChange={this.handleChange('medicaidOffice', 'address1')}
          />
          <Input
            name="apd-state-profile-addr2"
            label={t(`${offTRoot}.labels.address2`)}
            value={medicaidOffice.address2}
            onChange={this.handleChange('medicaidOffice', 'address2')}
          />
          <div className="clearfix mxn1">
            <div className="col col-12 sm-col-6 px1">
              <Input
                name="apd-state-profile-city"
                label={t(`${offTRoot}.labels.city`)}
                value={medicaidOffice.city}
                onChange={this.handleChange('medicaidOffice', 'city')}
              />
            </div>
            <div className="col col-6 sm-col-3 px1">
              <Input
                name="apd-state-profile-state"
                label={t(`${offTRoot}.labels.state`)}
                value={medicaidOffice.state}
                onChange={this.handleChange('medicaidOffice', 'state')}
              />
            </div>
            <div className="col col-6 sm-col-3 px1">
              <Input
                name="apd-state-profile-zip"
                label={t(`${offTRoot}.labels.zip`)}
                value={medicaidOffice.zip}
                onChange={this.handleChange('medicaidOffice', 'zip')}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

ApdStateProfile.propTypes = {
  stateProfile: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd: { data: { stateProfile } } }) => ({
  stateProfile
});
const mapDispatchToProps = { updateApd: updateApdAction };

export default connect(mapStateToProps, mapDispatchToProps)(ApdStateProfile);
