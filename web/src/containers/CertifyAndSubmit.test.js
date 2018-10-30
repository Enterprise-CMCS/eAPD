import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { push } from 'react-router-redux';

import {
  plain as CertifyAndSubmit,
  mapStateToProps,
  mapDispatchToProps
} from './CertifyAndSubmit';

import { submitAPD, withdrawApd } from '../actions/apd';

describe('certify and submit component', () => {
  const sandbox = sinon.createSandbox();

  const props = {
    dirty: false,
    pushRoute: sandbox.spy(),
    state: 'Arizona',
    status: 'draft',
    submitAPD: sandbox.spy(),
    withdrawApd: sandbox.spy(),
    year: '1066'
  };

  test('renders correctly', () => {
    expect(shallow(<CertifyAndSubmit {...props} />)).toMatchSnapshot();
    expect(
      shallow(<CertifyAndSubmit {...props} status="submitted" />)
    ).toMatchSnapshot();
  });

  test('changes rendering when an APD is withdrawn and then modified', () => {
    const component = shallow(
      <CertifyAndSubmit {...props} status="submitted" />
    );
    component.find('Withdraw').prop('withdrawApd')();
    component.setProps({ ...props, dirty: true });

    expect(component).toMatchSnapshot();
  });

  test('redirects to dashboard when submitted', () => {
    const component = shallow(
      <CertifyAndSubmit {...props} status="submitted" />
    );
    component.find('AlreadySubmitted').prop('dashboard')();

    expect(props.pushRoute.calledWith('/dash')).toBeTruthy();
  });

  test('dispatches when the APD is submitted', () => {
    const component = shallow(<CertifyAndSubmit {...props} />);
    component.find('Submit').prop('submitAPD')();

    expect(props.submitAPD.called).toBeTruthy();
  });

  test('dispatches when the APD is withdrawn', () => {
    const component = shallow(
      <CertifyAndSubmit {...props} status="submitted" />
    );
    component.find('Withdraw').prop('withdrawApd')();

    expect(props.withdrawApd.called).toBeTruthy();
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: {
          state: 'az',
          status: 'status',
          years: ['1', '2']
        }
      },
      dirty: {
        dirty: 'dirty flag'
      }
    };

    expect(mapStateToProps(state)).toEqual({
      dirty: 'dirty flag',
      state: 'Arizona',
      status: 'status',
      year: '1'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      pushRoute: push,
      submitAPD,
      withdrawApd
    });
  });
});
