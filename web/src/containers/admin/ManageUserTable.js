import React, { Fragment } from 'react';

import { 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody 
} from '@cmsgov/design-system';

// Todo: Need to handle empty state when there is no requests/active/inactive
const ManageUserTable = ({
  type,
  affiliations,
  isFetching,
  actions
}) => {
  return (
    <Fragment>
      {isFetching && (
        <p>Loading...</p>
      )}
      {!isFetching && affiliations.length > 0 && (
      <Table borderless>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            {type === 'active' ? <TableCell>Role</TableCell> : null}
            {type === 'inactive' ? <TableCell>Status</TableCell> : null}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {affiliations.map((affiliation, index) => (
            <TableRow key={index}>
              <TableCell>{affiliation.displayName}</TableCell>
              <TableCell>{affiliation.email}</TableCell>
              <TableCell>{affiliation.primaryPhone}</TableCell>
              {type === 'active' ? <TableCell>{affiliation.role}</TableCell> : null}
              {type === 'inactive' ? <TableCell>{affiliation.status.charAt(0).toUpperCase() + affiliation.status.slice(1)}</TableCell> : null}
              <TableCell>
                <div className="ds-u-display--flex" data-id={affiliation.id}>
                  {actions && (
                    actions
                  )}
                </div>
              </TableCell>
            </TableRow>  
          ))}
        </TableBody>
      </Table>
      )}
    </Fragment>
  )
}

export default ManageUserTable;