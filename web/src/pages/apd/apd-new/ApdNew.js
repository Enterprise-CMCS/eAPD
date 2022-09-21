import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { createApd } from '../../../redux/actions/app';

const ApdNew = () => {
  return <div>This is where create a new apd.</div>;
};

ApdNew.PropTypes = {
  fetching: PropType.bool.isRequired,
  error: PropType.string.isRequired,
  route: PropType.string,
  state: PropType.object.isRequired,
  createApd: PropType.func.isRequired
};

ApdNew.defaultProps = {
  route: '/apd'
};

const mapStateToProps = state => ({
  state: state.user.data.state || null,
  activities: state.user.data.activities
});

const mapDispatchToProps = {
  createApd
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdNew);
