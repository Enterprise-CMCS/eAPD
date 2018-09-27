import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Btn from '../Btn';
import Icon, { faExclamationTriangle } from '../Icons';
import { Input } from '../Inputs';
import { t } from '../../i18n';

class Submit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitter: ''
    };
  }

  render() {
    const { submitAPD } = this.props;
    const { submitter } = this.state;

    return (
      <div className="flex">
        <Icon icon={faExclamationTriangle} color="orange" className="mt-tiny" />
        <div className="ml1">
          <p className="bold">{t('certifyAndSubmit.certify.draft.header')}</p>
          <p>{t('certifyAndSubmit.certify.draft.helpText')}</p>
          <Input
            name="submit_submitter_name"
            label="First and last name"
            value={submitter}
            onChange={e => this.setState({ submitter: e.target.value })}
          />
          <Btn onClick={() => submitAPD()} disabled={submitter.length === 0}>
            {t('certifyAndSubmit.certify.buttonText')}
          </Btn>
        </div>
      </div>
    );
  }
}

Submit.propTypes = { submitAPD: PropTypes.func.isRequired };

export default Submit;
