import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { submitAPD as submitAPDAction, withdrawApd } from '../actions/apd';
import { Section, Subsection } from '../components/Section';
import AlreadySubmitted from '../components/submission/AlreadySubmitted';
import Submit from '../components/submission/Submit';
import Withdraw from '../components/submission/Withdraw';
import { STATES } from '../util';

class CertifyAndSubmit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wasWithdrawn: false
    };
  }

  submit = () => {
    this.props.submitAPD();
    this.setState({ wasWithdrawn: false });
  };

  withdraw = () => {
    this.props.withdrawApd();
    this.setState({ wasWithdrawn: true });
  };

  render() {
    const { dirty, pushRoute, state, status, year } = this.props;
    const { wasWithdrawn } = this.state;

    // We only want to show the "submit" section if this APD was
    // a draft when the page was loaded; or if the APD was
    // withdrawn and the user has edited something.
    let showSubmit = status === 'draft';
    if (wasWithdrawn) {
      showSubmit = dirty && showSubmit;
    }

    // If the APD is not a draft, then we show the "thank you"
    // section, regardless.
    const showNextInfo = status !== 'draft';

    // And we show the "withdraw" section if this APD is not a
    // draft, or if it was withdrawn but has not yet been edited.
    let showWithdrawal = status !== 'draft';
    if (wasWithdrawn) {
      showWithdrawal = !dirty;
    }

    return (
      <Section id="certify-submit" resource="certifyAndSubmit">
        <Subsection
          id="certify-submit-submit"
          resource="certifyAndSubmit.certify"
        >
          {showSubmit && <Submit submitAPD={this.submit} />}
          {showNextInfo && (
            <AlreadySubmitted
              dashboard={() => pushRoute('/dash')}
              state={state}
              year={year}
            />
          )}
          {showWithdrawal && (
            <Withdraw
              dirty={dirty}
              status={status}
              withdrawApd={this.withdraw}
            />
          )}
        </Subsection>
      </Section>
    );
  }
}

CertifyAndSubmit.propTypes = {
  dirty: PropTypes.bool.isRequired,
  pushRoute: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  submitAPD: PropTypes.func.isRequired,
  withdrawApd: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired
};

const mapStateToProps = ({
  apd: { data: { state, status, years } },
  dirty: { dirty }
}) => ({
  dirty,
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

export { CertifyAndSubmit as plain, mapStateToProps, mapDispatchToProps };
