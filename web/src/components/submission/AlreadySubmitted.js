import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Btn from '../Btn';
import Icon, { faCheckCircle, faClock } from '../Icons';
import { t } from '../../i18n';

const AlreadySubmitted = ({ dashboard, state, year }) => (
  <Fragment>
    <div className="flex">
      <Icon icon={faCheckCircle} color="green" className="mt-tiny" />
      <div className="ml1">
        <p className="bold">
          {t('certifyAndSubmit.certify.submitted.thanks.header')}
        </p>
        <p>
          {t('certifyAndSubmit.certify.submitted.thanks.helpText', {
            state,
            year,
            date: 'ddd',
            time: 'time'
          })}
        </p>
      </div>
    </div>
    <div className="flex">
      <Icon icon={faClock} color="blue" className="mt-tiny" />
      <div className="ml1">
        <p className="bold">
          {t('certifyAndSubmit.certify.submitted.next.header')}
        </p>
        <p>{t('certifyAndSubmit.certify.submitted.next.helpText')}</p>
        <Btn onClick={() => dashboard()}>
          {t('certifyAndSubmit.certify.submitted.buttonText')}
        </Btn>
      </div>
    </div>
  </Fragment>
);

AlreadySubmitted.propTypes = {
  dashboard: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired
};

export default AlreadySubmitted;
