import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';

import {
  RawApdOverview as ApdOverview,
  mapStateToProps,
  mapDispatchToProps
} from './ApdOverview';

describe('the apd overview container', () => {
  const sandbox = sinon.createSandbox();
  const goTo = sandbox.spy();
  const fetchStateDataIfNeeded = sandbox.spy();
  const state = { loaded: true };
  const stateInfo = { loaded: true, id: 'ny' };
  const formData = { program_vision: 'foo', program_benefits: 'bar' };
  const updateState = sandbox.spy();

  beforeEach(() => {
    sandbox.resetHistory();
    state.loaded = true;
  });

  const getComponent = () =>
    shallow(
      <ApdOverview
        goTo={goTo}
        fetchStateDataIfNeeded={fetchStateDataIfNeeded}
        updateState={updateState}
        formData={formData}
        stateInfo={stateInfo}
      />
    );

  it('maps redux state to component props', () => {
    const reduxState = {
      extraneousData: {},
      state: {
        loaded: true,
        data: {
          id: 'fr',
          program_vision: 'foo'
        }
      }
    };
    const props = mapStateToProps(reduxState);

    expect(props).toMatchObject({
      stateInfo: { loaded: true, id: 'fr' },
      formData: { program_vision: 'foo', program_benefits: '' }
    });
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
