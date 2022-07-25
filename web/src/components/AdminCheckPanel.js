import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  toggleAdminCheck,
  toggleMiniCheck,
  toggleAdminCheckComplete
} from '../redux/actions/app/apd';

import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Drawer
} from '@cmsgov/design-system';

import Icon, { faExclamationTriangle, faArrowRight } from '../components/Icons';

const AdminCheckPanel = ({
  adminCheckEnabled,
  adminCheckMini,
  adminCheckComplete,
  metadata,
  toggleAdmin,
  toggleAdminMini,
  toggleAdminComplete
}) => {
  const handleClose = () => {
    toggleAdmin(false);
  };

  const toggleCollapse = () => {
    adminCheckMini ? toggleAdminMini(false) : toggleAdminMini(true);
  };

  const toggleComplete = () => {
    adminCheckComplete ? toggleAdminComplete(false) : toggleAdminComplete(true);
  };

  return (
    <Fragment>
      {adminCheckEnabled && (
        <Drawer
          className={`eapd-admin-check ${
            adminCheckMini ? ' eapd-admin-check--collapsed' : ''
          }`}
          heading={''}
          onCloseClick={() => {}}
          isFooterSticky={true}
          footerBody={
            !adminCheckMini && (
              <Fragment>
                <div className="ds-u-padding-bottom--1">
                  <Icon
                    className="ds-u-color--error ds-u-margin-right--1"
                    icon={faExclamationTriangle}
                    size="lg"
                  />
                  <button
                    onClick={handleClose}
                    className="cursor-pointer ds-u-padding-left--0 ds-c-button--transparent ds-u-color--error ds-u-font-size--lg"
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
              <Button variation="transparent" onClick={toggleCollapse}>
                {adminCheckMini ? 'Expand' : 'Collapse'}
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
          {adminCheckMini && (
            <div className="eapd-admin-mini">
              <div className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center">
                <Badge
                  size="big"
                  variation={`${adminCheckComplete ? 'success' : 'alert'}`}
                >
                  {adminCheckComplete ? '0' : '3'}
                </Badge>
                <span
                  className={`ds-h4 ds-u-margin-y--1 ds-u-padding-left--1 ${
                    adminCheckComplete
                      ? 'ds-u-color--success'
                      : 'ds-u-color--error'
                  }`}
                >
                  Incomplete Required Fields Total
                </span>
              </div>
              <button
                onClick={toggleComplete}
                className="cursor-pointer ds-u-padding-left--0 ds-c-button--transparent"
              >
                [Demo: Toggle Complete]
              </button>
            </div>
          )}
          {!adminCheckMini && (
            <Fragment>
              <p>
                Review the list below for any required fields in this APD which
                are missing content. These fields must be completed before
                submission to CMS.
              </p>
              <div className="eapd-admin-check-list">
                <div className="ds-u-display--flex ds-u-justify-content--start ds-u-text-align--right ds-u-align-items--center">
                  <span
                    className={`${
                      adminCheckComplete
                        ? 'ds-u-fill--success'
                        : 'ds-u-fill--error'
                    } ds-u-color--white ds-u-radius ds-u-padding-x--1 ds-u-padding-y--0 ds-u-font-weight--bold`}
                  >
                    {adminCheckComplete ? '0' : metadata.incomplete}
                  </span>
                  <span
                    className={`${
                      adminCheckComplete
                        ? 'ds-u-color--success'
                        : 'ds-u-color--error'
                    } ds-u-font-weight--bold ds-u-padding-left--1`}
                  >
                    Incomplete Required Fields
                  </span>
                </div>
                <hr className="eapd-admin-check__divider" />
                {adminCheckComplete && (
                  <Fragment>
                    <h3
                      role="alert"
                      className="ds-u-text-align--center ds-text-heading--2xl ds-u-font-weight--normal ds-u-margin-top--1"
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
                      {Object.keys(metadata.todo).map(key => (
                        <Fragment>
                          {metadata.todo[key].fields.map(field => (
                            <li
                              key={field.name}
                              className="ds-h5 ds-u-margin--0 ds-u-padding-y--3 ds-u-border-bottom--1"
                            >
                              <div class="ds-u-display--flex ds-u-justify-content--between">
                                <Link to={metadata.todo[key].link}>
                                  {metadata.todo[key].name}
                                </Link>
                                <a href="">Edit</a>
                              </div>
                              <div className="ds-u-font-weight--normal">
                                {field.description}
                              </div>
                            </li>
                          ))}
                        </Fragment>
                      ))}
                    </ol>
                    {/* <Accordion bordered>
                      {Object.keys(metadata.todo).map(key => (
                        <AccordionItem
                          key={key}
                          heading={
                            <Fragment key={key}>
                              <div className="ds-u-display--flex ds-u-flex-direction--column">
                                <h3 className="ds-u-margin--0">
                                  {metadata.todo[key].name}:{' '}
                                  <span className="ds-u-font-weight--normal">
                                    {metadata.todo[key].incomplete} field(s) to
                                    complete
                                  </span>
                                </h3>
                                <Link to={metadata.todo[key].link}>
                                  Go to the {metadata.todo[key].name} page.
                                </Link>
                              </div>
                            </Fragment>
                          }
                          defaultOpen={false}
                        >
                          <ol>
                            {metadata.todo[key].fields.map(field => (
                              <li key={field.name} className="ds-h5">
                                {field.name} <br />
                                <span className="ds-u-font-weight--normal">
                                  {field.description}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </AccordionItem>
                      ))}
                    </Accordion> */}
                  </Fragment>
                )}
              </div>
              <button
                onClick={toggleComplete}
                className="cursor-pointer ds-u-margin-top--2 ds-u-padding-left--0 ds-c-button--transparent"
              >
                [Demo: Toggle Complete]
              </button>
            </Fragment>
          )}
        </Drawer>
      )}
    </Fragment>
  );
};

AdminCheckPanel.propTypes = {
  toggleAdmin: PropTypes.func.isRequired,
  toggleAdminMini: PropTypes.func.isRequired,
  toggleAdminComplete: PropTypes.func.isRequired,
  adminCheckEnabled: PropTypes.bool.isRequired,
  adminCheckMini: PropTypes.bool.isRequired,
  adminCheckComplete: PropTypes.bool.isRequired,
  metadata: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  adminCheckEnabled: state.apd.adminCheck,
  adminCheckMini: state.apd.adminCheckMini,
  adminCheckComplete: state.apd.adminCheckComplete,
  metadata: state.apd.data.metadata
});

const mapDispatchToProps = {
  toggleAdmin: toggleAdminCheck,
  toggleAdminMini: toggleMiniCheck,
  toggleAdminComplete: toggleAdminCheckComplete
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCheckPanel);

export { AdminCheckPanel as plain, mapDispatchToProps, mapStateToProps };
