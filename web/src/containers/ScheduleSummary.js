import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { Section, Subsection } from '../components/Section';

const ScheduleSummary = ({ milestones }) => (
  <Section id="schedule-summary" resource="scheduleSummary">
    <Subsection resource="scheduleSummary.main">
      {milestones.length > 0 && (
        <div className="overflow-auto">
          <table className="h6 table-bordered table-striped">
            <thead>
              <tr>
                <th>{t('scheduleSummary.main.table.activity')}</th>
                <th>{t('scheduleSummary.main.table.milestone')}</th>
                <th>{t('scheduleSummary.main.table.start')}</th>
                <th>{t('scheduleSummary.main.table.end')}</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map(m => (
                <tr key={m.id}>
                  <td>{m.activityName}</td>
                  <td>{m.name || 'N/A'}</td>
                  <td>{m.start || 'N/A'}</td>
                  <td>{m.end || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Subsection>
  </Section>
);

ScheduleSummary.propTypes = {
  milestones: PropTypes.array.isRequired
};

const mapStateToProps = ({ activities }) => {
  const milestones = [];

  Object.values(activities.byId).forEach(activity => {
    activity.milestones.forEach((milestone, i) => {
      milestones.push({
        ...milestone,
        id: `${activity.id}-${i + 1}`,
        activityId: activity.id,
        activityName: activity.name
      });
    });
  });

  milestones.sort((a, b) => a.start - b.start);

  return { milestones };
};

export default connect(mapStateToProps)(ScheduleSummary);
