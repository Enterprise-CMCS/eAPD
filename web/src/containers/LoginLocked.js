import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';

const LoginLocked = () => {

	return (
		<div id="start-main-content">
			<div className="ds-l-container">
				<div className="login-card">					
					<h1 className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center ds-u-margin--0">
						<img src="/static/icons/error.svg" height="40" />
						<span>Verify Your Identity</span>
					</h1>
					<h2 className="ds-h4 ds-u-margin-y--3">Account Locked</h2>
					<p>Please contact the <a>System Administrator</a> for account reset.</p>
					<p>Reset will occur in <span className="ds-u-color--error">60 minutes 00 seconds.</span></p>		
					<div className="ds-u-display--flex ds-u-justify-content--end ds-u-margin-top--3 ds-u-padding-top--2 ds-u-border-top--2">
						<a href="/" className="ds-c-button ds-c-button--transparent">Cancel</a>
					</div>	
				</div>
			</div>
		</div>
	);
};

export default LoginLocked;
