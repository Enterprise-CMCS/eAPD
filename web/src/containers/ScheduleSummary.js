import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import { t } from '../i18n';
import Waypoint from './ConnectedWaypoint';
import { Section, Subsection } from '../components/Section';
import { selectActivitySchedule } from '../reducers/activities.selectors';

const ScheduleSummary = ({ tableData }) => (
  <Waypoint id="schedule-summary">
    <Section isNumbered id="schedule-summary" resource="scheduleSummary">
      <Subsection id="schedule-summary-table" resource="scheduleSummary.main">
        {tableData.data.length === 0 ? (
          <div className="p1 h6 alert">
            {t('scheduleSummary.noDataMessage')}
          </div>
        ) : (
          <ReactTable
            showPagination={false}
            resizable={false}
            minRows={0}
            className="h6 -striped"
            {...tableData}
          />
        )}
      </Subsection>
    </Section>
  </Waypoint>
);

ScheduleSummary.propTypes = {
  tableData: PropTypes.shape({
    data: PropTypes.array,
    columns: PropTypes.array,
    defaultSorted: PropTypes.array
  }).isRequired
};

const Cell = row => row.value || 'N/A';

const mapStateToProps = state => {
  const data = selectActivitySchedule(state);

  const columns = [
    {
      accessor: 'activityName',
      Header: t('scheduleSummary.main.table.activity')
    },
    {
      accessor: 'milestone',
      Header: t('scheduleSummary.main.table.milestone'),
      Cell
    },
    {
      accessor: 'startDate',
      Header: t('scheduleSummary.main.table.start'),
      Cell
    },
    {
      accessor: 'endDate',
      Header: t('scheduleSummary.main.table.end'),
      Cell
    }
  ];

  const defaultSorted = [{ id: 'plannedStart', desc: false }];

  return { tableData: { data, columns, defaultSorted } };
};

export default connect(mapStateToProps)(ScheduleSummary);

export { ScheduleSummary as plain, mapStateToProps };
