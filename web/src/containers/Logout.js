import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout as dispatchLogout } from '../actions/auth';

const Logout = async ({ logout }) => {
  await logout();
  return null;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = { logout: dispatchLogout };

export default connect(null, mapDispatchToProps)(Logout);

export { Logout as plain, mapDispatchToProps };
