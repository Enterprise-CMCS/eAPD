import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@cmsgov/design-system';

// Todo: Need to handle empty state when there is no requests/active/inactive
const ManageUserTable = ({ tab, affiliations, isFetching, actions }) => {
  return (
    <Fragment>
      {isFetching && <p>Loading...</p>}
      {!isFetching && affiliations.length === 0 && <p>No results</p>}
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
                    {actions && actions}
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
  affiliations: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  actions: PropTypes.array
};

ManageUserTable.defaultProps = {
  actions: ''
};

export default ManageUserTable;
