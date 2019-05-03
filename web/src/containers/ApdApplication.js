import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Prompt, Redirect } from 'react-router-dom';

import Activities from './activity/All';
import AssurancesAndCompliance from './AssurancesAndCompliance';
import Export from './ApdExport';
import ApdSummary from './ApdSummary';
import ExecutiveSummary from './ExecutiveSummary';
import PreviousActivities from './PreviousActivities';
import SaveButton from './SaveButton';
import ScheduleSummary from './ScheduleSummary';
import Sidebar from './Sidebar';
import { selectApdOnLoad } from '../actions/apd';
import StateProfile from '../components/ApdStateProfile';
import ProposedBudget from '../components/ProposedBudget';

import {
  getAPDName,
  getAPDFirstYear,
  getIsAnAPDSelected
} from '../reducers/apd';
import { getIsDirty } from '../reducers/dirty';
import { getIsAdmin, getUserStateOrTerritory } from '../reducers/user';

const unsavedPrompt =
  'You have unsaved changes to your APD. Do you want to leave this page without saving?';

class ApdApplication extends Component {
  componentDidMount() {
    // Hook the browser's beforeunload event to catch page reloads or manual
    // changes to the URL bar while the APD is loaded.
    this.unloadListener = window.addEventListener('beforeunload', e => {
      const { dirty } = this.props;
      if (dirty) {
        e.preventDefault();
        e.returnValue = unsavedPrompt;
      }
    });
  }

  componentWillUnmount() {
    // Clean up our event handler when the component unloads, so we don't keep
    // prompting the user about the same dirty APD they already said to reload
    if (this.unloadListener) {
      window.removeEventListener('beforeunload', this.unloadListener);
      this.unloadListener = null;
    }
  }

  render() {
    const {
      apdName,
      apdSelected,
      dirty,
      isAdmin,
      place,
      selectApdOnLoad: dispatchSelectApdOnLoad,
      year
    } = this.props;

    if (isAdmin) {
      return <Redirect to="/" />;
    }

    if (!apdSelected) {
      dispatchSelectApdOnLoad('/apd');
      return <Redirect to="/" />;
    }

    return (
      <div className="site-body ds-l-container">
        {/* Use a redux-router prompt to hook in-app navigations */}
        <Prompt
          when={dirty}
          message={location => {
            // If we're navigating to a hash but on the same page, don't do the
            // prompt - nothing is reloading, so we're good.
            if (location.pathname === '/apd') {
              return true;
            }
            return unsavedPrompt;
          }}
        />
        <div className="ds-l-row ds-u-margin--0">
          <Sidebar place={place} />
          <div className="site-main p2 sm-p4 md-px0 ds-l-col--9">
            <h1 className="ds-h1 apd--title">
              <span className="ds-h6 ds-u-display--block">{apdName}</span>
              {place.name} {year} APD
            </h1>
            <StateProfile />
            <ApdSummary />
            <PreviousActivities />
            <Activities />
            <ScheduleSummary />
            <ProposedBudget />
            <AssurancesAndCompliance />
            <ExecutiveSummary />
            <Export />
          </div>
        </div>

        <SaveButton />
      </div>
    );
  }
}

ApdApplication.propTypes = {
  apdName: PropTypes.string.isRequired,
  apdSelected: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  place: PropTypes.object.isRequired,
  selectApdOnLoad: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  apdName: getAPDName(state),
  apdSelected: getIsAnAPDSelected(state),
  dirty: getIsDirty(state),
  isAdmin: getIsAdmin(state),
  place: getUserStateOrTerritory(state),
  year: getAPDFirstYear(state)
});

const mapDispatchToProps = { selectApdOnLoad };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApdApplication);

export { ApdApplication as plain, mapStateToProps, mapDispatchToProps };
