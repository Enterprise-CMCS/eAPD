import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Box, Button } from 'rebass';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

let BasicForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="firstName">First Name</label>
      <Field id="firstName" name="firstName" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="lastName">Last Name</label>
      <Field id="lastName" name="lastName" component="input" type="text" />
    </div>
    <div>
      <label htmlFor="email">Email</label>
      <Field id="email" name="email" component="input" type="email" />
    </div>
    <button type="submit">Submit</button>
  </form>
);

BasicForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

BasicForm = reduxForm({
  form: 'test'
})(BasicForm);

class StateStart extends Component {
  handleSubmit = data => {
    console.log(data);
  };

  render() {
    const { goTo } = this.props;

    return (
      <Box py={4}>
        <BasicForm onSubmit={this.handleSubmit} />

        <hr />

        <Button onClick={() => goTo('/')}>Continue</Button>
      </Box>
    );
  }
}

StateStart.propTypes = {
  goTo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ goTo: path => push(path) }, dispatch);

export default connect(null, mapDispatchToProps)(StateStart);
