import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { decrement, increment } from '../actions';
import Counter from '../components/Counter';

const Home = ({ actions, total }) => (
  <div>
    <Counter
      total={total}
      onIncrement={actions.increment}
      onDecrement={actions.decrement}
    />
  </div>
);

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  total: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  total: state.counter
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      increment,
      decrement
    },
    dispatch
  )
});

export { Home as Pure };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
