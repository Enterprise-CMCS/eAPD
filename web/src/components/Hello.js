import React from 'react';
import PropTypes from 'prop-types';

const Hello = props => <div>Hello {props.name}!</div>;

Hello.propTypes = {
  name: PropTypes.string
};

Hello.defaultProps = {
  name: 'Unidentified Person'
};

export default Hello;
