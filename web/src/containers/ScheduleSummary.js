import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';

import { t } from '../i18n';
import { Section, Subsection } from '../components/Section';

const ScheduleSummary = ({ tableData }) => (
  <Section id="schedule-summary" resource="scheduleSummary">
    <Subsection resource="scheduleSummary.main">
      {tableData.data.length === 0 ? (
        <div className="p1 h6 alert">{t('scheduleSummary.noDataMessage')}</div>
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
);

ScheduleSummary.propTypes = {
  tableData: PropTypes.shape({
    data: PropTypes.array,
    columns: PropTypes.array,
    defaultSorted: PropTypes.array
  }).isRequired
};

const Cell = row => row.value || 'N/A';

const mapStateToProps = ({ activities }) => {
  const data = [];

  Object.values(activities.byId).forEach(activity => {
    activity.milestones.forEach(milestone => {
      data.push({ ...milestone, activityName: activity.name });
    });
  });

  const columns = [
    {
      accessor: 'activityName',
      Header: t('scheduleSummary.main.table.activity')
    },
    {
      accessor: 'name',
      Header: t('scheduleSummary.main.table.milestone'),
      Cell
    },
    {
      accessor: 'start',
      Header: t('scheduleSummary.main.table.start'),
      Cell
    },
    {
      accessor: 'end',
      Header: t('scheduleSummary.main.table.end'),
      Cell
    }
  ];

  const defaultSorted = [{ id: 'start', desc: false }];

  return { tableData: { data, columns, defaultSorted } };
};

export default connect(mapStateToProps)(ScheduleSummary);
