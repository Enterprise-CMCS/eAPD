import PropTypes from 'prop-types';
import React from 'react';

import Expenses from './Expenses';
import StatePersonnel from './StatePersonnel';
import { Subsection } from '../../components/Section';
import { t } from '../../i18n';

const SubTitle = ({ children }) => (
  <h2 className="mt1 mb2 h3 fw-600 blue">{children}</h2>
);

SubTitle.propTypes = {
  children: PropTypes.node.isRequired
};

const Costs = ({ aKey }) => (
  <Subsection resource="activities.costs" nested>
    <div className="mb4 pb4 border-bottom border-grey">
      <SubTitle>{t('activities.costs.subtitles.personnel')}</SubTitle>
      <StatePersonnel aKey={aKey} />
    </div>
    <div>
      <SubTitle>{t('activities.costs.subtitles.nonPersonnel')}</SubTitle>
      <Expenses aKey={aKey} />
    </div>
  </Subsection>
);

Costs.propTypes = {
  aKey: PropTypes.string.isRequired
};

export default Costs;
