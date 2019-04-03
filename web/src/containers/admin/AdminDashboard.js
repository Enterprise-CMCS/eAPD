import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';

const AdminDashboard = () => {
  return (
    <Fragment>
      <Header />
      <div className="site-body ds-l-container">
        <div className="ds-l-row">
          <div className="ds-l-col--8 ds-u-margin-x--auto">
            <h1 className="ds-h1">
              Administrator actions
            </h1>
            <ul className="ds-c-list--bare ds-l-row">
              <li className="ds-l-col--12 ds-l-md-col--6 ds-u-padding-left--0">
                <h2 className="ds-h2">
                  <Link
                    to={{ pathname: '/admin/create-account' }}
                  >
                      Create new user account
                    </Link>
                </h2>
                <p>
                  Make new accounts for federal analysts and state filers
                </p>
              </li>
              <li className="ds-l-col--12 ds-l-md-col--6 ds-u-padding-right--0">
                <h2 className="ds-h2">
                  <Link
                    to={{ pathname: '/admin/edit-account' }}
                  >
                    Manage user accounts
                  </Link>
                </h2>
                <p>
                  Edit account details and authorization levels for existing user accounts
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
};

export default AdminDashboard;
