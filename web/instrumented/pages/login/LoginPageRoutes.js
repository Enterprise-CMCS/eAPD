import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  useRouteMatch as actualUseRouteMatch
} from 'react-router-dom';

import routeCreator from './loginRoutesList';

const LoginPageRoutes = ({
  useRouteMatch,
  hasEverLoggedOn,
  fetching,
  factorsList,
  verifyData,
  errorMessage,
  handleFactorSelection,
  handlePhoneSubmit,
  handleVerificationCode,
  handleCreateAccessRequest,
  handleCompleteAccessRequest,
  handleLogin,
  handleLoginOtp,
  handleLogout
}) => {
  const { path } = useRouteMatch();
  const routes = routeCreator({
    path,
    hasEverLoggedOn,
    fetching,
    factorsList,
    verifyData,
    errorMessage,
    handleFactorSelection,
    handlePhoneSubmit,
    handleVerificationCode,
    handleCreateAccessRequest,
    handleCompleteAccessRequest,
    handleLogin,
    handleLoginOtp,
    handleLogout
  });

  return (
    <Switch>
      <Route path={path}>
        {routes.map(({ path, exact = false, children, ...routeProps }) => {
          return (
            <Route exact={exact} path={path} key={path} {...routeProps}>
              {children}
            </Route>
          );
        })}
      </Route>
    </Switch>
  );
};

LoginPageRoutes.propTypes = {
  useRouteMatch: PropTypes.func,
  hasEverLoggedOn: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  factorsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  verifyData: PropTypes.object.isRequired,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  handleFactorSelection: PropTypes.func.isRequired,
  handlePhoneSubmit: PropTypes.func.isRequired,
  handleVerificationCode: PropTypes.func.isRequired,
  handleCreateAccessRequest: PropTypes.func.isRequired,
  handleCompleteAccessRequest: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLoginOtp: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

LoginPageRoutes.defaultProps = {
  useRouteMatch: actualUseRouteMatch,
  errorMessage: null
};

export default LoginPageRoutes;
