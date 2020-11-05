import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const formSubmitNoop = e => e.preventDefault();

class LoginMFAEnroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ''
    };    
  };
  
  handleOnChange = e => {
    this.setState({ selectedOption: e.target.value});
  };
  
  handleFactorSelection = e => {
    e.preventDefault();
    this.props.handleSelection(this.state.selectedOption);
  }
  
  render() {    
    const factorTypes = this.props.factors;
    
    return(
      <div id="start-main-content">
        <div className="ds-l-container">
          <div className="login-card">					
            <h1 className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center ds-u-margin--0">
              <span>Verify Your Identity</span>
            </h1>
            <form onSubmit={this.handleFactorSelection || formSubmitNoop}>
              <fieldset className="ds-c-fieldset ds-u-margin-top--1">
                <legend>Please choose Multi-Factor Authentication route.</legend>            
                  {factorTypes.map((choice, index) => (
                    <Fragment key={index}>
                      <input
                        className="ds-c-choice"
                        id={choice.factorType + choice.vendorName}
                        checked={this.state.selectedOption === choice.factorType + choice.vendorName}
                        type="radio"
                        name="mfa-choices"
                        value={choice.factorType + choice.vendorName}
                        onChange={this.handleOnChange} 
                      />
                      <label htmlFor={choice.factorType + choice.vendorName}><span>{choice.factorType + choice.vendorName}</span></label>
                    </Fragment>
                  ))}
              </fieldset>
              <div className="ds-u-display--flex ds-u-justify-content--end ds-u-margin-top--3 ds-u-padding-top--2 ds-u-border-top--2">
              <button type="submit" className="ds-c-button ds-c-button--primary">Submit</button>
              </div>	
            </form>
          </div>        
        </div>
      </div>
    );
  };
};


LoginMFAEnroll.propTypes = {
  handleSelection: PropTypes.func,
  selectedOption: PropTypes.string
};
 
LoginMFAEnroll.defaultProps = {
  selectedOption: 'sms'
}; 

export default withRouter(LoginMFAEnroll);

export { LoginMFAEnroll as plain };