import React, { Fragment, useMemo, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination, useAsyncDebounce } from 'react-table';

import axios, { apiUrl } from '../../util/api';

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
      "affiliationId": 12345,
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
  },
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
  }
];

const calculateStatus = record => {  
  if(record.affiliationId) {
    return 'Matched';
  }
  if(!record.affiliationId && record.potentialMatches > 0) {
    return 'Pending Match';
  }
  if(!record.affiliationId && record.potentialMatches == 0) {
    return 'No Match';
  }
  return '';
}
// Using React-Table we will need to format the data before
// supplying it to the table. Consider moving this step to
// a redux action or a utility file.
const certificationRow = record => {
  return {
    name: record.name,
    email: record.email,
    state: record.state.toUpperCase(),
    ffy: record.ffy,
    file: record.fileUrl,
    status: calculateStatus(record),
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


function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  
  const onChange = useAsyncDebounce(value => {
    console.log("whats happening here");
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      <TextField
        name="globalFilter"
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
      name="dropdownFilter"
      label={Header}
      value={filterValue}
      options={[]}
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
};

const StateAdminLetters = () => {  
  const history = useHistory();
  
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const certificationLetters = await axios.get('/auth/certifications');
      setTableData(certificationLetters.data);
    }
    fetchData();
  }, []);
  
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
        Header: 'FFY',
        accessor: 'ffy',
        disableSortBy: true,
      },
      {
        Header: 'State',
        accessor: 'state',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter,
        filter: 'includes',
        disableSortBy: true,
      },
      {
        Header: 'View',
        accessor: 'file',
        disableSortBy: true,
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        disableSortBy: true,
      },
    ],
    []
  );
  
  const data = React.useMemo(() => makeData(tableData), [tableData]);
  
  const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   prepareRow,
   state: { globalFilter, pageIndex, pageSize },
   page,
   canPreviousPage,
   canNextPage,
   pageOptions,
   pageCount,
   gotoPage,
   nextPage,
   previousPage,
   setPageSize,
   
   preGlobalFilteredRows,
   setGlobalFilter,
  } = useTable(
   { 
     columns, 
     data
   },
   useFilters,
   useGlobalFilter,
   useSortBy,
   usePagination
  )  
  
  return (
    <div>     
      <Button onClick={handleAddStateButton} variation="primary">Add State Admin Letter</Button>
      
      <div className="ds-u-display--flex ds-u-justify-content--between" style={{maxWidth: '30rem'}}>
        {headerGroups[0].headers.find(item => item.Header === 'Status').render('Filter')}
        {headerGroups[0].headers.find(item => item.Header === 'State').render('Filter')}
        <GlobalFilter
           preGlobalFilteredRows={preGlobalFilteredRows}
           globalFilter={globalFilter}
           setGlobalFilter={setGlobalFilter}
        />
      </div>
      
      <Table {...getTableProps()} className="ds-u-margin-top--1" borderless>
       <TableHead>
          <TableRow>
         </TableRow>
         {headerGroups.map(headerGroup => (
           <TableRow {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                 {column.render('Header')}
                 <span>
                   {/* Todo: make this not awful and unreadable */}
                   {column.canSort ?
                      column.isSorted
                       ? column.isSortedDesc
                         ? ' ▾'
                         : ' ▴'
                       : ' ⬍'
                     : ''}
                 </span>
               </TableCell>
             ))}
           </TableRow>
         ))}
       </TableHead>
       <TableBody {...getTableBodyProps()}>
         {page.map((row, i) => {
           prepareRow(row)
           return (
             <TableRow {...row.getRowProps()}>
               {row.cells.map(cell => {
                 if(cell.column.id === 'file') {
                   return (
                     <TableCell {...cell.getCellProps()}>
                       <a href={`${cell.value}`} ><PDFFileBlue /></a>
                     </TableCell>
                   )
                 }
                 if (cell.column.id === 'actions') {
                   return (
                     <TableCell {...cell.getCellProps()}>
                        {/* Todo: Add actions here */}
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
      
      <div className="ds-u-display--flex ds-u-justify-content--end ds-u-padding-y--2">
        <label htmlFor="rowSizeSelect">Rows per page:</label>
        <select
          id="rowSizeSelect"
          value={pageSize}
          className="ds-u-margin-left--1 ds-u-margin-right--2"
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        
        <span className="ds-u-padding-x--1">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        
        <button style={{border: "none", background: "transparent"}} onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button style={{border: "none", background: "transparent"}} onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
      </div>
      
    </div>
  )
}

export default StateAdminLetters;