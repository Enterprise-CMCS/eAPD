import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { plain as LoginApplication } from './LoginApplication';
import ConsentBanner from '../components/ConsentBanner';
import LoginPageRoutes from './LoginPageRoutes';
import { setConsented } from '../util/auth';

const history = { goBack: sinon.spy(), push: sinon.spy() };

const props = {
  mfaConfig: jest.fn(),
  mfaAddPhone: jest.fn(),
  mfaActivate: jest.fn(),
  createAccessRequest: jest.fn(),
  completeAccessToState: jest.fn(),
  login: jest.fn(),
  loginOtp: jest.fn(),
  location: {},
  hasEverLoggedOn: false,
  authenticated: false,
  error: null,
  fetching: false,
  factorsList: [],
  mfaEnrollType: '',
  verifyData: {}
};

describe('Login Application', () => {
  beforeEach(() => {
    history.goBack.resetHistory();
    history.push.resetHistory();
  });

  afterEach(() => {
    document.cookie = null;
  });

  it('should show the consent banner if the user does not have a cookie', () => {
    const component = shallow(
      <LoginApplication {...props} history={history} />
    );
    expect(component.type()).toEqual(ConsentBanner);
  });

  it('should redirect to root if authenticated', () => {
    setConsented();
    const component = shallow(
      <LoginApplication {...props} authenticated history={history} />
    );
    expect(component.props().to.pathname).toEqual('/');
  });

  it('should redirect to where it came from if authenticated', () => {
    setConsented();
    const location = {
      to: '/',
      state: { from: { pathname: '/dashboard' } }
    };
    const component = shallow(
      <LoginApplication
        {...props}
        authenticated
        history={history}
        location={location}
      />
    );
    expect(component.props().to.pathname).toEqual('/dashboard');
  });

  it('should show the LoginPageRoutes if user is not logged in but has consented', () => {
    setConsented();
    const component = shallow(
      <LoginApplication {...props} history={history} />
    );
    expect(component.type()).toEqual(LoginPageRoutes);
  });
});
