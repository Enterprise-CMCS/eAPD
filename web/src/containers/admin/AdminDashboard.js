import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Icon, { faUserCog, faUserPlus } from '../../components/Icons';
import Footer from '../../components/Footer';

const AdminDashboard = () => {
  return (
    <Fragment>
      <div className="site-body ds-l-container">
        <div className="ds-l-row">
          <div className="ds-l-col--8 ds-u-margin-x--auto ds-u-padding-y--6">
            <h1 className="ds-h1">Administrator actions</h1>
            <ul className="ds-c-list--bare ds-l-row">
              <li className="ds-l-col--12 ds-l-md-col--6 ds-u-padding-left--0">
                <h2 className="ds-h2">
                  <div className="user-icon">
                    <Icon icon={faUserCog} />
                  </div>
                  <Link
                    to={{ pathname: '/create-account' }}
                    className="ds-u-display--block"
                  >
                    Create new user account
                  </Link>
                </h2>
                <p>Make new accounts for federal analysts and state filers</p>
              </li>
              <li className="ds-l-col--12 ds-l-md-col--6 ds-u-padding-right--0">
                <h2 className="ds-h2">
                  <div className="user-icon">
                    <Icon icon={faUserPlus} />
                  </div>
                  <Link
                    to={{ pathname: '/edit-account' }}
                    className="ds-u-display--block"
                  >
                    Manage user accounts
                  </Link>
                </h2>
                <p>
                  Edit account details and authorization levels for existing
                  user accounts
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default AdminDashboard;
