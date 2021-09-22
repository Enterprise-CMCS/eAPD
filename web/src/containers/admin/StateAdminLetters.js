import React, { Fragment, useMemo, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useTable, useFilters, useGlobalFilter, useSortBy, useAsyncDebounce } from 'react-table';

import {
  Button,
  Dropdown,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField
} from '@cmsgov/design-system';

import { PDFFileBlue } from '../../components/Icons';


const mockapi = [
  {
      "id": 47,
      "name": "State Admin",
      "email": "stateadmin@fearless.tech",
      "phone": "4105555555",
      "state": "ak",
      "ffy": "2020",
      "file": "/auth/certifications/09e2109ei",
      "affiliationId": null,
      "potentialMatches": "1"
  },
  {
      "id": 48,
      "name": "Test Okta",
      "email": "testokta@fearless.tech",
      "phone": "4105554444",
      "state": "md",
      "ffy": "2019",
      "file": "/auth/certifications/09e2109ei",
      "affiliationId": null,
      "potentialMatches": "1"
  },
  {
      "id": 49,
      "name": "State Contractor",
      "email": "statecontractor@fearless.tech",
      "phone": "4105553333",
      "state": "ga",
      "ffy": "2021",
      "file": "/auth/certifications/09e2109ei",
      "affiliationId": null,
      "potentialMatches": "1"
  },
  {
      "id": 50,
      "name": "State Staff",
      "email": "statestaff@fearless.tech",
      "phone": "4105552222",
      "state": "ak",
      "ffy": "2021",
      "file": "/auth/certifications/09e2109ei",
      "affiliationId": null,
      "potentialMatches": "1"
  },
  {
      "id": 51,
      "name": "Reese Set",
      "email": "resetmfa@fearless.tech",
      "phone": "4105551111",
      "state": "tn",
      "ffy": "2021",
      "file": "/auth/certifications/09123098",
      "affiliationId": null,
      "potentialMatches": "0"
  }
];

// Using React-Table we will need to format the data before
// supplying it to the table. Consider moving this step to
// a redux action or a utility file.
const certificationRow = record => {
  const statusCalculated = record.potentialMatches > 0 ? 'Pending' : 'Unmatched';
  return {
    name: record.name,
    email: record.email,
    phone: record.phone,
    state: record.state.toUpperCase(),
    ffy: record.ffy,
    file: record.file,
    status: statusCalculated,
    actions: record.affiliationId
  };
}

function makeData(payload) {
  return payload.map(record => {
    return {
      ...certificationRow(record)
    };
  });
};

const StateAdminLetters = () => {  
  const history = useHistory();
  
  const handleAddStateButton = () => {
    history.push("/delegate-state-admin");
  };
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
      },
      {
        Header: 'State',
        accessor: 'state',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'FFY',
        accessor: 'ffy',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'View',
        accessor: 'file',
        disableFilters: true,
        disableSortBy: true
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        disableSortBy: true,
        disableFilters: true
      },
    ],
    []
  );
  
  const data = React.useMemo(() => makeData(mockapi), [])
  
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        <TextField
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          label={`Search all`}
        />
      </span>
    )
  };
  
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id, Header },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <Dropdown
        label={Header}
        value={filterValue}
        options={options}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Dropdown>
    )
  }
  
  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <TextField
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
      />
    )
  }  
  
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
  
  const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
   state,
   preGlobalFilteredRows,
   setGlobalFilter,
  } = useTable(
   { 
     columns, 
     data,
     defaultColumn
   },
   useFilters,
   useGlobalFilter,
   useSortBy
  )  
  
  return (
    <div>
      <Button onClick={handleAddStateButton} variation="primary">Add State Admin Letter</Button>
      
      <div className="ds-u-display--flex ds-u-justify-content--between" style={{maxWidth: '30rem'}}>
        {headerGroups[0].headers.find(item => item.Header === 'Status').render('Filter')}
        {headerGroups[0].headers.find(item => item.Header === 'State').render('Filter')}
        <GlobalFilter
         preGlobalFilteredRows={preGlobalFilteredRows}
         globalFilter={state.globalFilter}
         setGlobalFilter={setGlobalFilter}
        />
      </div>
      
      <Table {...getTableProps()} className="ds-u-margin-top--1" borderless>
       <TableHead>
          <TableRow>
         </TableRow>
         {headerGroups.map(headerGroup => (
           <TableRow {...headerGroup.getHeaderGroupProps()}>
             {/* {console.log("headerGroup.headers", headerGroup.headers)} */}
             {headerGroup.headers.map(column => (
               <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                 {column.render('Header')}
                 <span>
                   {/* Todo: make this not awful and unreadable */}
                   {column.canSort ?
                      column.isSorted
                       ? column.isSortedDesc
                         ? ' ▼'
                         : ' ▲'
                       : '⬍'
                     : ''}
                 </span>
               </TableCell>
             ))}
           </TableRow>
         ))}
       </TableHead>
       <TableBody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <TableRow {...row.getRowProps()}>
               {row.cells.map(cell => {
                 if(cell.column.id === 'file') {
                   return (
                     <TableCell {...cell.getCellProps()}>
                       <a href={`${cell.value}`}><PDFFileBlue /></a>
                     </TableCell>
                   )
                 }
                 if (cell.column.id === 'actions') {
                   return (
                     <TableCell {...cell.getCellProps()}>
                      <Button>OK</Button>
                     </TableCell>
                   )
                 } 
                 return (
                   <TableCell {...cell.getCellProps()}>
                     {cell.render('Cell')}
                   </TableCell>
                 )

               })}
             </TableRow>
           )
         })}
       </TableBody>
      </Table>
    </div>
  )
}

export default StateAdminLetters;