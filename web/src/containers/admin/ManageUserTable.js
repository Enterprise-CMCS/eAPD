import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@cmsgov/design-system';

const ManageUserTable = ({
  tab,
  affiliations,
  isFetching,
  actions,
  currentUser
}) => {
  const { id: currentUserId, role: currentUserRole } = currentUser;

  const showActions = affiliation => {
    return (
      currentUserId !== affiliation.userId &&
      currentUserRole !== 'eAPD System Admin' &&
      affiliation.role !== 'eAPD System Admin'
    );
  };

  return (
    <Fragment>
      {isFetching && <p>Loading...</p>}
      {!isFetching && affiliations.length === 0 && (
        <p>No users on this tab at this time</p>
      )}
      {!isFetching && affiliations.length > 0 && (
        <Table borderless>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              {tab === 'active' ? <TableCell>Role</TableCell> : null}
              {tab === 'inactive' ? <TableCell>Status</TableCell> : null}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {affiliations.map(affiliation => (
              <TableRow key={affiliation.id}>
                <TableCell>{affiliation.displayName}</TableCell>
                <TableCell>{affiliation.email}</TableCell>
                <TableCell>{affiliation.primaryPhone}</TableCell>
                {tab === 'active' ? (
                  <TableCell>{affiliation.role}</TableCell>
                ) : null}
                {tab === 'inactive' ? (
                  <TableCell>
                    {affiliation.status.charAt(0).toUpperCase() +
                      affiliation.status.slice(1)}
                  </TableCell>
                ) : null}
                <TableCell>
                  <div className="ds-u-display--flex" data-id={affiliation.id}>
                    {showActions(affiliation) && actions}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Fragment>
  );
};

ManageUserTable.propTypes = {
  tab: PropTypes.string.isRequired,
  affiliations: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  actions: PropTypes.array,
  currentUser: PropTypes.object.isRequired
};

ManageUserTable.defaultProps = {
  actions: ''
};

export default ManageUserTable;
