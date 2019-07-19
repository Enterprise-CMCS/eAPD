import PropTypes from 'prop-types';
import React from 'react';

import Expenses from './NonPersonnelCosts';
import StatePersonnel from './StatePersonnel';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

const Costs = ({ aKey }) => (
  <Subsection resource="activities.costs" nested>
    <h6 className="ds-h4">{t('activities.costs.subtitles.personnel')}</h6>
    <StatePersonnel aKey={aKey} />

    <h6 className="ds-h4">{t('activities.costs.subtitles.nonPersonnel')}</h6>
    <Expenses aKey={aKey} />
  </Subsection>
);

Costs.propTypes = {
  aKey: PropTypes.string.isRequired
};

export default Costs;
