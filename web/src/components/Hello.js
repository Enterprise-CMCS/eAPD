import PropTypes from 'prop-types';
import React from 'react';

const Hello = props => (
  <div>
    <h1>
      Hello, {props.name}!!<br />👋
    </h1>
  </div>
);

Hello.propTypes = {
  name: PropTypes.string
};

Hello.defaultProps = {
  name: 'world'
};

export default Hello;
