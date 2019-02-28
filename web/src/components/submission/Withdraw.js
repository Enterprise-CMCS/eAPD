import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Btn from '../Btn';
import Instruction from '../Instruction';
import { t } from '../../i18n';

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

class Withdraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // If this document is or has been submitted, during
      // our session, then we should show the withdrawal
      // confirmation if it is NO LONGER submitted (i.e.,
      // we want to show that confirmation if the document
      // is withdrawn during the active session.
      showWithdrawlConfirmation: props.status !== 'draft'
    };

    this.withdraw = this.withdraw.bind(this);
  }

  withdraw() {
    this.setState({ showWithdrawlConfirmation: true });
    this.props.withdrawApd();
  }

  render() {
    const { dirty, status } = this.props;

    if (status !== 'draft') {
      return (
        <div className="ml3 border-top mt3 pt3">
          <Instruction source="certifyAndSubmit.withdraw.prompt.instruction" />
          <Btn extraCss="bg-gray" onClick={this.withdraw}>
            {t('certifyAndSubmit.withdraw.prompt.buttonText')}
          </Btn>
        </div>
      );
    } else if (this.state.showWithdrawlConfirmation && !dirty) {
      return (
        <div className="ml3">
          <Instruction source="certifyAndSubmit.withdraw.confirmation.instruction" />
          <p className="right-align">
            <Btn onClick={scrollToTop}>
              {t('certifyAndSubmit.withdraw.confirmation.buttonText')}
            </Btn>
          </p>
        </div>
      );
    }
    return <div />;
  }
}

Withdraw.propTypes = {
  dirty: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  withdrawApd: PropTypes.func.isRequired
};

export default Withdraw;
