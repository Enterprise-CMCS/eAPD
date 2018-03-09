import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { fetchStateDataIfNeeded, updateState } from '../actions/state';
import FormStateContacts from '../components/FormStateContacts';
import PageNavButtons from '../components/PageNavButtons';
import withSidebar from '../components/withSidebar';
import FormLogger from '../util/formLogger';

class StateContacts extends Component {
  componentDidMount() {
    this.props.fetchStateDataIfNeeded();
  }

  updateForm = data => {
    this.props.updateState(this.props.state.data.id, data);
  };

  render() {
    const { goTo, state } = this.props;

    return (
      <div>
        <FormLogger />
        <h1>Review your state contact information</h1>
        {!state.loaded ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <FormStateContacts
              initialValues={state.data}
              onSubmit={this.updateForm}
              stateName={state.data.name}
            />
            <PageNavButtons
              goTo={goTo}
              prev="/state-start"
              next="/apd-overview"
            />
          </Fragment>
        )}
      </div>
    );
  }
}

StateContacts.propTypes = {
  goTo: PropTypes.func.isRequired,
  fetchStateDataIfNeeded: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

const mapStateToProps = ({ state }) => ({ state });

const mapDispatchToProps = {
  goTo: push,
  fetchStateDataIfNeeded,
  updateState
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withSidebar(StateContacts)
);

export {
  StateContacts as RawStateContacts,
  mapStateToProps,
  mapDispatchToProps
};
