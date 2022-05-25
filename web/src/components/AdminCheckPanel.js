import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { toggleAdminCheck } from '../redux/actions/app/apd';

import { Accordion, AccordionItem, Badge, Button, Drawer } from '@cmsgov/design-system';

import Icon, { faExclamationTriangle, faArrowRight } from '../components/Icons';

const AdminCheckPanel = ({showAdminCheck, metadata, toggleAdmin}) => {
  
  const [miniCheck, setMiniReview] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const handleClose = () => {
    toggleAdmin(false);
  };
  
  const toggleCollapse = () => {
    console.log("collapse the panel");
    miniCheck ? setMiniReview(false) : setMiniReview(true);
    // toggleAdminCollapse(true);
  };
  
  const toggleComplete = () => {
    isComplete ? setIsComplete(false) : setIsComplete(true);
  };

  return (
    <Fragment>
      {showAdminCheck && (
        <Drawer
          className={`eapd-admin-check ${miniCheck ? " eapd-admin-check--collapsed" : ""}`}
          heading={null}
          onCloseClick={null}
          // isFooterSticky={true}
          footerBody={
            miniCheck === false && (
              <Fragment>
                <div className="ds-u-padding-bottom--1">
                  <Icon className="ds-u-color--error ds-u-margin-right--1" icon={faExclamationTriangle} size="lg" />
                  <button onClick={handleClose} className="cursor-pointer ds-u-padding-left--0 ds-c-button--transparent ds-u-color--error ds-u-font-size--lg">Stop Administrative Check</button> 
                </div>
                <p className="ds-u-margin--0">
                  APDs cannot be submitted until all required fields are complete. Exiting the required fields review will pause the review until you choose to restart the review or complete all required fields.
                </p>
                
              </Fragment>
            )
          }
        >
          <div className="eapd-admin-check__header">
            <h2 className="ds-c-drawer__header-heading">Administrative Check</h2> {/* need to make this have a tabindex=0 at some point, the linter doesn't like it but we need it for initial focus */}
            {!isComplete && (
              <Button variation="transparent" onClick={toggleCollapse}>{miniCheck ? "Expand" : "Collapse"}</Button>
            )}
            {isComplete && (
              <Button variation="transparent" onClick={handleClose} aria-label="Close help drawer">Close</Button>
            )}
          </div>
          {miniCheck && (
            <div className="eapd-admin-mini">
              <div className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center">
                <Badge size="big" variation={`${isComplete ? "success" : "alert"}`}>{isComplete ? "0" : "3"}</Badge>
                <span className={`ds-h4 ds-u-margin-y--1 ds-u-padding-left--1 ${isComplete ? "ds-u-color--success" : "ds-u-color--error"}`}>Incomplete Required Fields Total</span>
              </div>
              {isComplete && (
                <Fragment>
                  <p>Well Done! The Administrative Check is complete.</p>
                  <p>Return to the <a href="#">Export and Submit page.</a></p>
                </Fragment>
              )}
              {!isComplete && (
                <Fragment>
                  <h3 className="ds-u-font-size--base">
                    <strong>Key State Personnel: </strong> 
                    <span className="ds-u-font-weight--normal">2 field(s) to complete on page</span>
                  </h3>
                  <ol className="ds-u-padding-top--0 ds-u-padding-bottom--1 ds-c-list">
                    <li><strong>Email address: </strong>Provide the email address of the Medicaid Director.</li>
                    <li><strong>Phone number: </strong>Provide a valid phone number for the Medicaid Director.</li>
                  </ol>
                  <Button size="big" variation="primary">
                    Continue to Results of Previous Activities
                    <Icon className="ds-u-padding-left--1" icon={faArrowRight} />
                  </Button>
                </Fragment>
              )}
              <a className="ds-u-font-size--small" onClick={toggleComplete}> [Demo: Toggle Complete]</a>
            </div>
          )}
          {miniCheck === false && (
            <Fragment>
              <p>
                Review the list below for any required fields in this APD which are missing content. These fields must be completed before submission to CMS. <a className="ds-u-font-size--small" onClick={toggleComplete}> [Demo: Toggle Complete]</a>
              </p>
              <div className="ds-u-border--2 ds-u-padding--2">
                <div className="ds-u-display--flex ds-u-justify-content--end ds-u-text-align--right ds-u-align-items--center">
                  <span className={`${isComplete ? "ds-u-color--success" : "ds-u-color--error"} ds-u-font-weight--bold ds-u-margin-right--2`}>Incomplete<br/>Required Fields</span>
                  <span className={`${isComplete ? "ds-u-fill--success" : "ds-u-fill--error"} ds-u-color--white ds-u-radius ds-u-padding-x--3 ds-u-padding-y--2 ds-u-font-size--2xl ds-u-font-weight--bold`}>{isComplete ? "0" : metadata.incomplete}</span>
                </div>
                <hr className="eapd-admin-check__divider" />
                {isComplete && (
                  <Fragment>
                    <h3 className="ds-u-text-align--center ds-text-heading--2xl ds-u-font-weight--normal ds-u-margin-top--1">Administrative Check is Complete</h3>
                    <p className="ds-u-text-align--center ds-h4 ds-u-margin-top--1 ds-u-font-weight--normal">Return to the <a href="#">export and submit</a> page.</p>
                    <div className="ds-u-display--flex ds-u-justify-content--center ds-u-padding--5">
                      <svg id="complete-check" width="168" height="140" viewBox="0 0 168 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M161.993 5.00315L57.072 136.621L4.22056 15.7833L55.6805 62.9824L56.478 63.7139L57.4237 63.1877L161.993 5.00315Z" stroke="#FDB124" stroke-width="3"/>
                      </svg>
                    </div>
                  </Fragment>
                )}
                {!isComplete && (
                  <Fragment>
                    <h3>To Do</h3>
                    <Accordion bordered>
                      {Object.keys(metadata.todo).map((key) => (
                          <AccordionItem
                            key={key}
                            heading={
                              <Fragment key={key}>
                                <h3 className="ds-u-margin--0">{metadata.todo[key].name}: <span className="ds-u-font-weight--normal">{metadata.todo[key].incomplete} field(s) to complete</span></h3>
                                <Link to={metadata.todo[key].link}>Go to the {metadata.todo[key].name} page.</Link>
                              </Fragment>
                            }
                            defaultOpen={false}
                          >
                          <ol>
                            {metadata.todo[key].fields.map((field) => (
                              <li key={field.name} className="ds-h5">
                                {field.name} <br />
                                <span className="ds-u-font-weight--normal">{field.description}</span>
                              </li>
                            ))}
                          </ol>
                          </AccordionItem>
                      ))}
                    </Accordion>
                    <h3>Recently Completed</h3>
                    {metadata.recents.length > 0 && (
                      <div>
                      {metadata.recents.map((item) => (
                        <div key={item.section} className="ds-u-border--1 ds-u-margin-bottom--2 ds-u-padding--2">
                          <h3 className="ds-u-margin--0">{item.page}</h3>
                          <Link to={item.link}>Go to the {item.section} page.</Link>
                        </div>
                      ))}
                      </div>
                    )}
                    {metadata.recents.length === 0 && (
                      <p>No sections recently completed</p>
                    )}
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
  showAdminCheck: PropTypes.bool.isRequired,
  metadata: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  showAdminCheck: state.apd.adminCheck,
  metadata: state.apd.data.metadata
});

const mapDispatchToProps = {
  toggleAdmin: toggleAdminCheck
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCheckPanel);

export { AdminCheckPanel as plain, mapDispatchToProps, AdminCheckPanel, mapStateToProps };
