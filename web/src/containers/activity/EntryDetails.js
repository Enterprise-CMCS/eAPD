import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContractorResources from './ContractorResources';
import CostAllocate from './CostAllocate';
import Costs from './Costs';
import Description from './Description';
import Goals from './Goals';
import Schedule from './Schedule';
import StandardsAndConditions from './StandardsAndConditions';
import {
  removeActivity as removeActivityAction,
  toggleActivitySection
} from '../../actions/activities';
import Collapsible from '../../components/Collapsible';
import DeleteButton from '../../components/DeleteConfirm';
import { t } from '../../i18n';

const makeTitle = (a, i) => {
  let title = `${t('activities.namePrefix')} ${i}`;
  if (a.name) title += `: ${a.name}`;
  if (a.fundingSource) title += ` (${a.fundingSource})`;
  return title;
};

const components = [
  Description,
  Goals,
  Schedule,
  Costs,
  ContractorResources,
  CostAllocate,
  StandardsAndConditions
];

class EntryDetails extends Component {
  handleChange = key => () => {
    this.props.toggleSection(key);
  };

  render() {
    const { aKey, expanded, num, removeActivity, title } = this.props;

    return (
      <Collapsible
        id={`activity-${aKey}`}
        title={title}
        bgColor="blue-light"
        btnBgColor="blue"
        btnColor="white"
        open={expanded}
        onChange={this.handleChange(aKey)}
      >
        {components.map((Comp, i) => (
          <Comp key={i} aKey={aKey} />
        ))}
        {num > 1 && (
          <DeleteButton
            remove={() => removeActivity(aKey)}
            resource="activities.delete"
          />
        )}
      </Collapsible>
    );
  }
}

EntryDetails.propTypes = {
  aKey: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  num: PropTypes.number.isRequired,
  removeActivity: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  toggleSection: PropTypes.func.isRequired
};

export const mapStateToProps = ({ activities: { byKey } }, { aKey, num }) => {
  const activity = byKey[aKey];
  const { expanded } = activity.meta;
  const title = `${t('activities.header')} › ${makeTitle(activity, num)}`;

  return { expanded, title };
};

export const mapDispatchToProps = {
  removeActivity: removeActivityAction,
  toggleSection: toggleActivitySection
};

export { EntryDetails as EntryDetailsRaw };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryDetails);
