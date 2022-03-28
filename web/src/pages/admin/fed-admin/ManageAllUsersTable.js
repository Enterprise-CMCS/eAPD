/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@cmsgov/design-system';

const ManageAllUsersTable = ({
  tab,
  affiliations,
  isFetching,
  actions,
  currentUser
}) => {
  const { id: currentUserId, activities: currentUserActivities } = currentUser;

  const showActions = affiliation => {
    return (
      currentUserId !== affiliation.userId &&
      currentUserActivities.indexOf('edit-affiliations') !== -1
    );
  };

  /* eslint-disable react/no-unstable-nested-components */
  const AffiliationFirstRow = ({ primaryAffiliation, affiliation }) => {
    return (
      <TableRow
        className={
          primaryAffiliation.affiliations.length > 1
            ? 'all-users-table--first-row-multi'
            : ''
        }
        key={affiliation.id}
      >
        <TableCell
          component="th"
          style={{ verticalAlign: 'top' }}
          rowSpan={primaryAffiliation.affiliations.length}
        >
          {primaryAffiliation.displayName}
        </TableCell>
        <TableCell
          component="td"
          style={{ verticalAlign: 'top' }}
          rowSpan={primaryAffiliation.affiliations.length}
        >
          {primaryAffiliation.email}
        </TableCell>
        <TableCell
          component="td"
          style={{ verticalAlign: 'top' }}
          rowSpan={primaryAffiliation.affiliations.length}
        >
          {primaryAffiliation.primaryPhone}
        </TableCell>
        <TableCell className="all-users-table--state">
          {affiliation.stateId.toUpperCase()}
        </TableCell>
        {tab === 'active' ? (
          <TableCell className="all-users-table--role">
            {affiliation.role}
          </TableCell>
        ) : null}
        {tab === 'inactive' ? (
          <TableCell className="all-users-table--status">
            {affiliation.status}
          </TableCell>
        ) : null}
        <TableCell className="all-users-table--actions">
          <AffiliationActions
            primaryAffiliation={primaryAffiliation}
            affiliation={affiliation}
          />
        </TableCell>
      </TableRow>
    );
  };
  const AffiliationRow = ({ primaryAffiliation, affiliation }) => {
    return (
      <TableRow
        className={
          primaryAffiliation.affiliations.length > 1
            ? 'all-users-table--row-multi'
            : ''
        }
        key={affiliation.id}
      >
        <TableCell className="all-users-table--state">
          {affiliation.stateId.toUpperCase()}
        </TableCell>
        {tab === 'active' ? (
          <TableCell className="all-users-table--role">
            {affiliation.role}
          </TableCell>
        ) : null}
        {tab === 'inactive' ? (
          <TableCell className="all-users-table--status">
            {affiliation.status}
          </TableCell>
        ) : null}
        <TableCell className="all-users-table--actions">
          <AffiliationActions
            primaryAffiliation={primaryAffiliation}
            affiliation={affiliation}
          />
        </TableCell>
      </TableRow>
    );
  };

  const AffiliationActions = ({ primaryAffiliation, affiliation }) => {
    // Only show revoked for the active tab
    let displayedActions;
    if (tab !== 'active') {
      displayedActions = [...actions];
    }
    if (tab === 'active') {
      displayedActions = [actions[1]];
    }
    return (
      <div
        className="ds-u-display--flex"
        data-primary-affiliation-id={primaryAffiliation.id}
        data-id={affiliation.id}
        data-state={affiliation.stateId}
      >
        {showActions(primaryAffiliation) && displayedActions}
      </div>
    );
  };

  return (
    <Fragment>
      {isFetching && <p>Loading...</p>}
      {!isFetching && affiliations.length === 0 && (
        <p>No users on this tab at this time</p>
      )}
      {!isFetching && affiliations.length > 0 && (
        <Table borderless className="all-users-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>State</TableCell>
              {tab === 'active' ? <TableCell>Role</TableCell> : null}
              {tab === 'inactive' ? <TableCell>Status</TableCell> : null}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {affiliations.map(primaryAffiliation => (
              <Fragment key={primaryAffiliation.id}>
                {primaryAffiliation.affiliations.map((affiliation, index) => {
                  if (index === 0) {
                    return (
                      <AffiliationFirstRow
                        key={affiliation.id}
                        primaryAffiliation={primaryAffiliation}
                        affiliation={affiliation}
                      />
                    );
                  }
                  return (
                    <AffiliationRow
                      key={affiliation.id}
                      primaryAffiliation={primaryAffiliation}
                      affiliation={affiliation}
                    />
                  );
                })}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </Fragment>
  );
};

ManageAllUsersTable.propTypes = {
  tab: PropTypes.string.isRequired,
  affiliations: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  actions: PropTypes.array,
  currentUser: PropTypes.object.isRequired
};

ManageAllUsersTable.defaultProps = {
  actions: ''
};

export default ManageAllUsersTable;
