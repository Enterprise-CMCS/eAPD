import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { submitAPD as submitAPDAction } from '../actions/apd';
import Btn from '../components/Btn';
import Icon, {
  faCheckCircle,
  faClock,
  faExclamationTriangle
} from '../components/Icons';
import { Input } from '../components/Inputs';
import { Section, Subsection } from '../components/Section';
import { t } from '../i18n';
import { STATES } from '../util';

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

const CertifyAndSubmit = ({ canSubmit, pushRoute, state, submitAPD, year }) => (
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
    </Subsection>
  </Section>
);

CertifyAndSubmit.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  pushRoute: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
  submitAPD: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired
};

const mapStateToProps = ({
  apd: {
    data: { state, status, years }
  }
}) => ({
  canSubmit: status === 'draft',
  state: STATES.find(s => s.id === state).name,
  year: years[0]
});

const mapDispatchToProps = { submitAPD: submitAPDAction, pushRoute: push };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CertifyAndSubmit);
