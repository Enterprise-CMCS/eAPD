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
  const { id: currentUserId, role: currentUserRole } = currentUser;

  const showActions = affiliation => {
    return (
      currentUserId !== affiliation.userId &&
      currentUserRole !== 'eAPD System Admin' &&
      affiliation.role !== 'eAPD System Admin'
    );
  };
  
  const AffiliationFirstRow = ({ primaryAffiliation, affiliation }) => {
    return (
      <TableRow className={primaryAffiliation.affiliations.length > 1 ? "all-users-table--first-row" : ""} key={affiliation.id}>
        <TableCell component='th' style= {{ 'verticalAlign': 'middle' }} rowSpan={primaryAffiliation.affiliations.length}>{primaryAffiliation.displayName}</TableCell>
        <TableCell component='td' style= {{ 'verticalAlign': 'middle' }} rowSpan={primaryAffiliation.affiliations.length}>{primaryAffiliation.email}</TableCell>
        <TableCell component='td' style= {{ 'verticalAlign': 'middle' }} rowSpan={primaryAffiliation.affiliations.length}>{primaryAffiliation.primaryPhone}</TableCell>
          <TableCell>{affiliation.stateId}</TableCell>
          {tab === 'active' ? <TableCell>{affiliation.role}</TableCell> : null}
          {tab === 'inactive' ? <TableCell>{affiliation.status}</TableCell> : null}
          <TableCell>
            <AffiliationActions primaryAffiliation={primaryAffiliation} affiliation={affiliation} />
          </TableCell>
      </TableRow>
    )
  }
  const AffiliationRow = ({ primaryAffiliation, affiliation }) => {
    return (
      <TableRow className="all-users-table--row" key={affiliation.id}>
        <TableCell>{affiliation.stateId}</TableCell>
        {tab === 'active' ? <TableCell>{affiliation.role}</TableCell> : null}
        {tab === 'inactive' ? <TableCell>{affiliation.status}</TableCell> : null}
        <TableCell>
          <AffiliationActions primaryAffiliation={primaryAffiliation} affiliation={affiliation} />
        </TableCell>
      </TableRow>
    )
  }

  const AffiliationActions = ({ primaryAffiliation, affiliation }) => {
    return (
      <div className="ds-u-display--flex" data-primary-affiliation-id={primaryAffiliation.id} data-id={affiliation.id} data-state={affiliation.stateId} >
        {showActions(affiliation) && actions}
       </div>
    )
  }
  
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
            {/* The data structure is such that we have a top-level "affiliations" object that 
                contains another affiliations objects which contains additional affiliations 
                if the user has multiple. */}
            {affiliations.map(primaryAffiliation => (
              <Fragment>
                {primaryAffiliation.affiliations.map((affiliation, index) => {
                  if (index === 0) {
                    return (<AffiliationFirstRow primaryAffiliation={primaryAffiliation} affiliation={affiliation} />)
                  }
                  return (<AffiliationRow primaryAffiliation={primaryAffiliation} affiliation={affiliation} />)
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
