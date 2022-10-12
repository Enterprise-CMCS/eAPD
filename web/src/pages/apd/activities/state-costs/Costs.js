import PropTypes from 'prop-types';
import React from 'react';

import { titleCase } from 'title-case';
import Expenses from './NonPersonnelCosts';
import StatePersonnel from './StatePersonnel';
import { Subsection } from '../../../../components/Section';
import { t } from '../../../../i18n';

const Costs = ({ activityIndex }) => (
  <Subsection
    resource="activities.costs"
    id={`activity-cost-categories-${activityIndex}`}
  >
    <h4 className="ds-h4">
      {titleCase(t('activities.costs.subtitles.personnel'))}
    </h4>
    <StatePersonnel activityIndex={activityIndex} />

    <h4 className="ds-h4">
      {titleCase(t('activities.costs.subtitles.nonPersonnel'))}
    </h4>
    <Expenses activityIndex={activityIndex} />
  </Subsection>
);

Costs.propTypes = {
  activityIndex: PropTypes.number.isRequired
};

export default Costs;
