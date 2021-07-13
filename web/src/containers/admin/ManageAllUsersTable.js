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
              <TableCell>State</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Todo: Add description on why we have to do the tables this way */}
            {affiliations.map(affiliation => (
              <Fragment>
                <TableRow key={affiliation.id}>
                  <TableCell component='th' style= {{ 'vertical-align': 'top' }} rowSpan={affiliation.affiliations.length}>{affiliation.displayName}</TableCell>
                  <TableCell component='td' style= {{ 'vertical-align': 'top' }} rowSpan={affiliation.affiliations.length}>{affiliation.email}</TableCell>
                  <TableCell component='td' style= {{ 'vertical-align': 'top' }} rowSpan={affiliation.affiliations.length}>{affiliation.primaryPhone}</TableCell>
                  <TableCell>
                      {affiliation.affiliations[0].role}
                    </TableCell>
                    <TableCell>
                      {affiliation.affiliations[0].stateId}
                    </TableCell>
                    <TableCell>
                      <div className="ds-u-display--flex" data-id={affiliation.affiliations[0].id}>
                        {showActions(affiliation) && actions} 
                      </div>
                    </TableCell>
                </TableRow>
                {/* Filter out the first item since we use it in the above */}
                {affiliation.affiliations.filter((item, index) => {
                  if(index === 0) {
                    return false;
                  }
                  return true;
                }).map(stateAffiliation => (
                  <TableRow key={stateAffiliation.stateId}>
                    <TableCell>
                      {stateAffiliation.role}
                    </TableCell>
                    <TableCell>
                      {stateAffiliation.stateId}
                    </TableCell>
                    <TableCell>
                      <div className="ds-u-display--flex" data-id={stateAffiliation.stateId}>
                        {showActions(stateAffiliation) && actions}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
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
