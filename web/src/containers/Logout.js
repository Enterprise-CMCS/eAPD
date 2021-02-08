import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';

import { logout as dispatchLogout } from '../actions/auth';

const Logout = ({ logout }) => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies([
    'gov.cms.eapd.api-token'
  ]);
  removeCookie('gov.cms.eapd.api-token');
  logout();
  return null;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = { logout: dispatchLogout };

export default connect(null, mapDispatchToProps)(Logout);

export { Logout as plain, mapDispatchToProps };
