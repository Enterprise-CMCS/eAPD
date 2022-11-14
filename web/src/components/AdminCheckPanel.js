import PropTypes from 'prop-types';
import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  toggleAdminCheck,
  toggleMiniCheck,
  toggleAdminCheckComplete
} from '../redux/actions/app/apd';

import { Button, Drawer } from '@cmsgov/design-system';

import Icon, { faExclamationTriangle } from '../components/Icons';

import {
  selectAdminCheckErrors,
  selectAdminCheckEnabled,
  selectAdminCheckCollapsed,
  selectAdminCheckComplete
} from '../redux/selectors/apd.selectors';

const RequiredFieldsComponent = ({ adminCheckData, adminCheckComplete }) => (
  <Fragment>
    <div className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center">
      <span
        className={`${
          adminCheckComplete ? 'ds-u-fill--success' : 'ds-u-fill--error'
        } ds-u-color--white ds-u-radius ds-u-padding-x--1 ds-u-padding-y--0 ds-u-font-weight--bold`}
        data-cy="numRequired"
      >
        {adminCheckData.length}
      </span>
      <span
        className={`${
          adminCheckComplete ? 'ds-u-color--success' : 'ds-u-color--error'
        } ds-u-font-weight--bold ds-u-padding-left--1`}
      >
        Incomplete Required Fields
      </span>
    </div>
  </Fragment>
);

RequiredFieldsComponent.propTypes = {
  adminCheckData: PropTypes.array.isRequired,
  adminCheckComplete: PropTypes.bool.isRequired
};

const AdminCheckPanel = ({
  adminCheckEnabled,
  adminCheckCollapsed,
  adminCheckComplete,
  adminCheckData,
  toggleAdmin,
  toggleCollapsed,
  toggleAdminComplete
}) => {
  const handleClose = () => {
    toggleAdmin(false);
  };

  const toggleCollapse = () => {
    adminCheckCollapsed ? toggleCollapsed(false) : toggleCollapsed(true);
  };

  useEffect(() => {
    adminCheckData?.length === 0
      ? toggleAdminComplete(true)
      : toggleAdminComplete(false);
  }, [adminCheckData]);

  return (
    <Fragment>
      {adminCheckEnabled && (
        <Drawer
          className={`eapd-admin-check ${
            adminCheckCollapsed ? ' eapd-admin-check--collapsed' : ''
          }`}
          heading={''}
          onCloseClick={() => {}}
          isFooterSticky={true}
          footerBody={
            !adminCheckCollapsed && (
              <Fragment>
                <div className="ds-u-padding-bottom--1">
                  <Icon
                    className="ds-u-margin-right--1"
                    icon={faExclamationTriangle}
                    size="lg"
                  />
                  <button
                    onClick={handleClose}
                    className="cursor-pointer ds-u-padding-left--0 ds-c-button--transparent ds-u-font-size--lg"
                  >
                    Stop Administrative Check
                  </button>
                </div>
                <p className="ds-u-margin--0">
                  APDs cannot be submitted until all required fields are
                  complete. Exiting the required fields review will pause the
                  review until you choose to restart the review or complete all
                  required fields.
                </p>
              </Fragment>
            )
          }
        >
          <div className="eapd-admin-check__header">
            <h2 className="ds-c-drawer__header-heading">
              Administrative Check
            </h2>{' '}
            {/* need to make this have a tabindex=0 at some point, the linter doesn't like it but we need it for initial focus */}
            {!adminCheckComplete && (
              <Button
                variation="transparent"
                onClick={toggleCollapse}
                aria-label="Expand or collapse the administrative check"
              >
                {adminCheckCollapsed ? 'Expand' : 'Collapse'}
              </Button>
            )}
            {adminCheckComplete && (
              <Button
                variation="transparent"
                onClick={handleClose}
                aria-label="Close help drawer"
              >
                Close
              </Button>
            )}
          </div>
          {adminCheckCollapsed && (
            <div className="eapd-admin-check--collapsed_content">
              <RequiredFieldsComponent
                adminCheckData={adminCheckData}
                adminCheckComplete={adminCheckComplete}
              />
            </div>
          )}
          {!adminCheckCollapsed && (
            <Fragment>
              <p>
                Review the list below for any required fields in this APD which
                are missing content. These fields must be completed before
                submission to CMS.
              </p>
              <div className="eapd-admin-check-list">
                <RequiredFieldsComponent
                  adminCheckData={adminCheckData}
                  adminCheckComplete={adminCheckComplete}
                />
                <hr className="eapd-admin-check__divider" />
                {adminCheckComplete && (
                  <Fragment>
                    <h3
                      role="alert"
                      className="ds-u-text-align--center ds-text-heading--2xl ds-u-font-weight--normal ds-u-margin-top--4"
                    >
                      Administrative Check is Complete
                    </h3>
                    <p className="ds-u-text-align--center ds-h4 ds-u-margin-top--1 ds-u-font-weight--normal">
                      Return to the <Link to="export">export and submit</Link>{' '}
                      page.
                    </p>
                    <div className="ds-u-display--flex ds-u-justify-content--center ds-u-padding--5">
                      <svg
                        id="complete-check"
                        width="168"
                        height="140"
                        viewBox="0 0 168 140"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M161.993 5.00315L57.072 136.621L4.22056 15.7833L55.6805 62.9824L56.478 63.7139L57.4237 63.1877L161.993 5.00315Z"
                          stroke="#FDB124"
                          strokeWidth="3"
                        />
                      </svg>
                    </div>
                  </Fragment>
                )}
                {!adminCheckComplete && (
                  <Fragment>
                    <ol className="ds-u-margin-y--1">
                      {adminCheckData.map(item => (
                        <li
                          key={item.name}
                          className={`ds-h5 ds-u-margin--0 ds-u-padding-y--3 ds-u-border-bottom--1 ${
                            item.complete
                              ? 'eapd-admin-check--completed-item'
                              : ''
                          }`}
                        >
                          <div className="ds-u-display--flex ds-u-justify-content--between">
                            <Fragment>
                              <Link
                                to={item.link}
                                className="ds-text-heading--lg ds-u-margin--0"
                              >
                                {item.section} {item.subSection}
                              </Link>
                              <Link
                                to={item.link}
                                className="ds-u-font-weight--normal"
                              >
                                Edit
                              </Link>
                            </Fragment>
                          </div>
                          <div className="ds-u-font-weight--normal">
                            {item.fieldDescription}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </Fragment>
                )}
              </div>
            </Fragment>
          )}
        </Drawer>
      )}
    </Fragment>
  );
};

AdminCheckPanel.propTypes = {
  toggleAdmin: PropTypes.func.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
  toggleAdminComplete: PropTypes.func.isRequired,
  adminCheckData: PropTypes.array.isRequired,
  adminCheckEnabled: PropTypes.bool.isRequired,
  adminCheckCollapsed: PropTypes.bool.isRequired,
  adminCheckComplete: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  adminCheckData: selectAdminCheckErrors(state),
  adminCheckEnabled: selectAdminCheckEnabled(state),
  adminCheckCollapsed: selectAdminCheckCollapsed(state),
  adminCheckComplete: selectAdminCheckComplete(state)
});

const mapDispatchToProps = {
  toggleAdmin: toggleAdminCheck,
  toggleCollapsed: toggleMiniCheck,
  toggleAdminComplete: toggleAdminCheckComplete
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCheckPanel);

export { AdminCheckPanel as plain, mapDispatchToProps, mapStateToProps };
