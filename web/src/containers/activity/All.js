import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import EntryBasic from './EntryBasic';
import EntryDetails from './EntryDetails';
import Waypoint from '../ConnectedWaypoint';
import { addActivity as addActivityAction } from '../../actions/activities';
import Btn from '../../components/Btn';
import { Section, Subsection } from '../../components/Section';
import { t } from '../../i18n';

const All = ({ activityKeys, addActivity }) => (
  <Waypoint id="activities-overview">
    <Section isNumbered id="activities" resource="activities">
      <Waypoint id="activities-list" />
      <Subsection id="activities-list" resource="activities.list" open>
        {activityKeys.length === 0 ? (
          <div className="mb2 p1 h6 alert">
            {t('activities.noActivityMessage')}
          </div>
        ) : (
          <div className="mb3">
            {activityKeys.map((key, idx) => (
              <EntryBasic key={key} aKey={key} num={idx + 1} />
            ))}
          </div>
        )}
        <Btn extraCss="visibility--screen" onClick={addActivity}>
          {t('activities.addActivityButtonText')}
        </Btn>
      </Subsection>
      {activityKeys.map((key, idx) => (
        <Waypoint id={key}>
          <EntryDetails key={key} aKey={key} num={idx + 1} />
        </Waypoint>
      ))}
    </Section>
  </Waypoint>
);

All.propTypes = {
  activityKeys: PropTypes.array.isRequired,
  addActivity: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities }) => ({
  activityKeys: activities.allKeys
});

export const mapDispatchToProps = {
  addActivity: addActivityAction
};

export { All as AllRaw };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(All);
