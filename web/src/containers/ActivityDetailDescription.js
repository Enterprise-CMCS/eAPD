import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { updateActivity as updateActivityAction } from '../actions/activities';
import Collapsible from '../components/Collapsible';
import Icon, { faHelp } from '../components/Icons';
import { RichText } from '../components/Inputs';

const ActivityDetailDescription = props => {
  const { activity, updateActivity } = props;
  const { descLong, altApproach } = activity;

  const sync = name => html => {
    updateActivity(activity.id, { [name]: html });
  };

  return (
    <Collapsible title={t('activities.description.title')}>
      <div className="mb-tiny bold">
        {t('activities.description.summaryHeader')}
        <Icon icon={faHelp} className="ml-tiny teal" size="sm" />
      </div>
      <div className="mb3">
        <textarea
          className="m0 textarea"
          rows="5"
          maxLength="280"
          spellCheck="true"
          value={activity.descShort}
          onChange={e =>
            updateActivity(activity.id, { descShort: e.target.value })
          }
        />
      </div>

      <div className="mb3">
        <div className="mb-tiny bold">
          {t('activities.description.detailHeader')}
          <Icon icon={faHelp} className="ml-tiny teal" size="sm" />
        </div>
        <RichText content={descLong} onSync={sync('descLong')} />
      </div>

      <div className="mb3">
        <div className="mb-tiny bold">
          {t('activities.description.alternativesHeader')}
        </div>
        <RichText content={altApproach} onSync={sync('altApproach')} />
      </div>
    </Collapsible>
  );
};
// }

ActivityDetailDescription.propTypes = {
  activity: PropTypes.object.isRequired,
  updateActivity: PropTypes.func.isRequired
};

const mapStateToProps = ({ activities: { byId } }, { aId }) => ({
  activity: byId[aId]
});

const mapDispatchToProps = {
  updateActivity: updateActivityAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ActivityDetailDescription
);
