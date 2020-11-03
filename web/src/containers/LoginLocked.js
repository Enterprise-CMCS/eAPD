import React from 'react';

const LoginLocked = () => {
	return (
		<div id="start-main-content">
			<div className="ds-l-container">
				<div className="login-card">					
					<h1 className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center ds-u-margin--0">
						<img src="/static/icons/error.svg" alt="Error Icon" height="40" />
						<span>Verify Your Identity</span>
					</h1>
					<h2 className="ds-h4 ds-u-margin-y--3">Account Locked</h2>
					<p>Your account will be locked for one hour.</p>
					<p>If you need access sooner, please try to contact the System Administrator for a reset.</p>		
					<div className="ds-u-display--flex ds-u-justify-content--end ds-u-margin-top--3 ds-u-padding-top--2 ds-u-border-top--2">
						<a href="/" className="ds-c-button ds-c-button--transparent">Cancel</a>
					</div>	
				</div>
			</div>
		</div>
	);
};

export default LoginLocked;
