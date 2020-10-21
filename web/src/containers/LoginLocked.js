import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';

const LoginLocked = () => {

	return (
		<div className="card--container" id="start-main-content">
			<div className="ds-l-container">
				<div className="ds-l-row card">
					<div className="ds-l-col--1 ds-u-margin-left--auto" />
					<div className="ds-l-col--12 ds-l-sm-col--10 ds-l-lg-col--6">
						<img src="/static/icons/error.svg" />
						<h1>Verify Your Identity</h1>
						<p>Please contact the System Administrator for account reset.</p>
						<p>Reset will occur in 60 minutes 00 seconds.</p>			
					</div>					
					<div className="ds-l-col--1 ds-u-margin-right--auto" />
				</div>
			</div>
		</div>
	);
};

export default LoginLocked;
