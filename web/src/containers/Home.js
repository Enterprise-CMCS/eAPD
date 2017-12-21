import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { ButtonOutline, Divider } from 'rebass';

import { decrement, increment } from '../actions';
import Counter from '../components/Counter';

const Home = ({ actions, total }) => (
  <div>
    <Counter
      total={total}
      onIncrement={actions.increment}
      onDecrement={actions.decrement}
    />

    <Divider my={4} />

    <ButtonOutline onClick={actions.goToHelloPage}>
      Go to Hello component via Redux Action
    </ButtonOutline>
  </div>
);

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  total: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  total: state.counter
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      increment,
      decrement,
      goToHelloPage: () => push('/hello')
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
