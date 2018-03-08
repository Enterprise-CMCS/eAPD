import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';

import {
  RawStateContacts as StateContacts,
  mapStateToProps,
  mapDispatchToProps
} from './StateContacts';

describe('the state contacts container', () => {
  const sandbox = sinon.createSandbox();
  const goTo = sandbox.spy();
  const fetchStateDataIfNeeded = sandbox.spy();
  const state = {
    loaded: true,
    data: {}
  };
  const updateState = sandbox.spy();

  beforeEach(() => {
    sandbox.resetHistory();
    state.loaded = true;
    state.data = {
      id: 'fr'
    };
  });

  const getComponent = () =>
    shallow(
      <StateContacts
        goTo={goTo}
        fetchStateDataIfNeeded={fetchStateDataIfNeeded}
        state={state}
        updateState={updateState}
      />
    );

  it('maps redux state to component props', () => {
    const reduxState = {
      extraneousData: {},
      state: {
        name: 'Franklin',
        id: 'fr'
      }
    };
    const props = mapStateToProps(reduxState);

    expect(props).toMatchObject({ state: reduxState.state });
  });

  it('maps redux actions to component props', () => {
    expect(typeof mapDispatchToProps.goTo).toEqual('function');
    expect(typeof mapDispatchToProps.fetchStateDataIfNeeded).toEqual(
      'function'
    );
    expect(typeof mapDispatchToProps.updateState).toEqual('function');
  });

  it('renders correctly when data is not loaded', () => {
    state.loaded = false;
    const component = getComponent();
    expect(component).toMatchSnapshot();
    expect(fetchStateDataIfNeeded.callCount).toEqual(1);
  });

  it('renders correctly when data is loaded', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
    expect(fetchStateDataIfNeeded.callCount).toEqual(1);
  });

  it('dispatches a state update event when the form is saved', () => {
    const component = getComponent();
    const form = component.find('ReduxForm');
    const newData = {};
    form.simulate('submit', newData);

    expect(updateState.calledWith('fr', newData));
  });
});
