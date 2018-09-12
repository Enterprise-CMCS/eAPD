import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { submitAPD as submitAPDAction, withdrawApd } from '../actions/apd';
import { Section, Subsection } from '../components/Section';
import AlreadySubmitted from '../components/submission/AlreadySubmitted';
import Submit from '../components/submission/Submit';
import Withdraw from '../components/submission/Withdraw';
import { STATES } from '../util';

const CertifyAndSubmit = ({
  canSubmit,
  pushRoute,
  state,
  status,
  submitAPD,
  withdrawApd: withdrawApdAction,
  year
}) => (
  <Section id="certify-submit" resource="certifyAndSubmit">
    <Subsection id="certify-submit-submit" resource="certifyAndSubmit.certify">
      {canSubmit ? (
        <Submit submitAPD={submitAPD} />
      ) : (
        <AlreadySubmitted
          dashboard={() => pushRoute('/dash')}
          state={state}
          year={year}
        />
      )}
      <Withdraw status={status} withdrawApd={withdrawApdAction} />
    </Subsection>
  </Section>
);

CertifyAndSubmit.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  pushRoute: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  submitAPD: PropTypes.func.isRequired,
  withdrawApd: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired
};

const mapStateToProps = ({ apd: { data: { state, status, years } } }) => ({
  canSubmit: status === 'draft',
  state: STATES.find(s => s.id === state).name,
  status,
  year: years[0]
});

const mapDispatchToProps = {
  submitAPD: submitAPDAction,
  pushRoute: push,
  withdrawApd
};

export default connect(mapStateToProps, mapDispatchToProps)(CertifyAndSubmit);
