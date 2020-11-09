import React, { Component } from 'react';

class LoginMFAVerifyAuthApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationCode: ''
    };    
  };
  
  handleOnChange = e => {
    this.setState({ verificationCode: e.target.value});
  };
  
  handleVerificationCodeSubmit = e => {
    e.preventDefault();
    this.props.handleVerificationCode(this.state.verificationCode);
  }

  handleCancelButton = () => {
    this.props.handleReturnToSelection();
  }
  
  render() {
    const {verificationData} = this.props;
    
    return (
      <div id="start-main-content">
        <div className="ds-l-container">
          <div className="login-card login-card__auth_app">					
            <h1 className="ds-u-margin--0">Configure Multi-Factor Authentication</h1>          
            <p>Enter the Passcode sent to you.</p>
            {/*  Note: For accessibility a label is required for all inputs. 
              <label class="ds-c-label ds-u-margin-top--0" for="input-singleline">
            <span>Single line field</span>
            </label> */}
            <form onSubmit={this.handleVerificationCodeSubmit}>
              <input
                className="ds-c-field ds-c-field--medium"
                id="input-singleline"
                name="singleline"
                value={this.state.verificationCode}
                type="text"
                onChange={this.handleOnChange} 
              />
              <div className="ds-u-display--flex ds-u-justify-content--end ds-u-margin-top--3 ds-u-padding-top--2 ds-u-border-top--2">
                <button type="submit" className="ds-c-button ds-c-button--primary">Submit</button> 
                <button 
                  type="button" 
                  id="returnToMFASelection" 
                  className="ds-c-button ds-c-button--transparent"
                  onClick={this.handleCancelButton}
                  >Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
};

export default LoginMFAVerifyAuthApp;
