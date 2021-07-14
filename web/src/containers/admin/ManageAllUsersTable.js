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
  
  const AffiliationFirstRow = ({ activeAffiliation, affiliation }) => {
    return (
      <TableRow key={affiliation.id}>
        <TableCell component='th' style= {{ 'verticalAlign': 'top' }} rowSpan={activeAffiliation.affiliations.length}>{activeAffiliation.displayName}</TableCell>
        <TableCell component='td' style= {{ 'verticalAlign': 'top' }} rowSpan={activeAffiliation.affiliations.length}>{activeAffiliation.email}</TableCell>
        <TableCell component='td' style= {{ 'verticalAlign': 'top' }} rowSpan={activeAffiliation.affiliations.length}>{activeAffiliation.primaryPhone}</TableCell>
          <TableCell>{affiliation.stateId}</TableCell>
          {tab === 'active' ? <TableCell>{affiliation.role}</TableCell> : null}
          {tab === 'inactive' ? <TableCell>{affiliation.status}</TableCell> : null}
          <TableCell>
            <AffiliationActions affiliation={affiliation} />
          </TableCell>
      </TableRow>
    )
  }
  const AffiliationRow = ({ affiliation }) => {
    return (
      <TableRow key={affiliation.id}>
        <TableCell>{affiliation.stateId}</TableCell>
        <TableCell>{affiliation.role}</TableCell>
        {tab === 'inactive' ? <TableCell>{affiliation.status}</TableCell> : null}
        <TableCell>
          <AffiliationActions affiliation={affiliation} />
        </TableCell>
      </TableRow>
    )
  }

  const AffiliationActions = ({ affiliation }) => {
    return (
      <div className="ds-u-display--flex" data-id={affiliation.id} data-state={affiliation.stateId} >
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
        <Table borderless>
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
            {affiliations.map(activeAffiliation => (
              <Fragment>
                {activeAffiliation.affiliations.map((affiliation, index) => {
                  if (index === 0) {
                    return (<AffiliationFirstRow activeAffiliation={activeAffiliation} affiliation={affiliation} />)
                  }
                  return (<AffiliationRow affiliation={affiliation} />)
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
