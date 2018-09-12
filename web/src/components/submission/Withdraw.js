import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Btn from '../Btn';
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
    const { status } = this.props;

    if (status !== 'draft') {
      return (
        <div className="ml3 border-top mt3 pt3">
          <p className="bold">Withdraw submission</p>
          <p>
            Withdrawing an APD submission resets the review process by CMS. APD
            submissions can be withdrawn to make changes.
          </p>
          <p className="italic">
            Note: Withdrawing this submission will reset the APD review process.
          </p>
          <Btn extraCss="bg-gray" onClick={this.withdraw}>
            Withdraw Submission
          </Btn>
        </div>
      );
    } else if (this.state.showWithdrawlConfirmation) {
      return (
        <div className="ml3 border-top mt3 pt3">
          <p className="bold">Your APD submission has been withdrawn</p>
          <p>
            The document is now editable. It will need to be resubmitted before
            it can be reviewed by CMS.
          </p>
          <p className="right-align">
            <Btn onClick={scrollToTop}>Back to top</Btn>
          </p>
        </div>
      );
    }
    return <div />;
  }
}

Withdraw.propTypes = {
  status: PropTypes.string.isRequired,
  withdrawApd: PropTypes.func.isRequired
};

export default Withdraw;
