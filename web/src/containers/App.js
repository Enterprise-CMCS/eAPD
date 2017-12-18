import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Counter from '../components/Counter';
import { decrement, increment } from '../actions';

const App = ({ dispatch, total }) => (
  <div>
    <Counter
      total={total}
      onIncrement={() => dispatch(increment())}
      onDecrement={() => dispatch(decrement())}
    />
  </div>
);

App.propTypes = {
  total: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  total: state
});

export default connect(mapStateToProps)(App);
