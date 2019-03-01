import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Btn from '../Btn';
import Icon, { faCheckCircle, faClock } from '../Icons';
import Instruction from '../Instruction';
import { t } from '../../i18n';

const AlreadySubmitted = ({ dashboard, state, year }) => (
  <Fragment>
    <div className="flex">
      <Icon icon={faCheckCircle} color="green" className="mt3" />
      <div className="ml1">
        <Instruction
          source="certifyAndSubmit.certify.submitted.thanks.instruction"
          args={{ state, year, date: 'ddd', time: 'time' }}
        />
      </div>
    </div>
    <div className="flex">
      <Icon icon={faClock} color="blue" className="mt3" />
      <div className="ml1">
        <Instruction source="certifyAndSubmit.certify.submitted.next.instruction" />
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
