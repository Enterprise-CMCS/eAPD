import PropTypes from 'prop-types';
import React from 'react';

import ActivityDescription from './ActivityDescription';
import ContractorResources from './ContractorResources';
import CostAllocation from './CostAllocation';
import Expenses from './Expenses';
import Section from './Section';
import SectionTitle from './SectionTitle';
import StatePersonnel from './StatePersonnel';
import Collapsible from '../Collapsible';
import FormActivityGoals from '../FormActivityGoals';
import FormActivitySchedule from '../FormActivitySchedule';
import { STANDARDS, activityDisplay } from '../../util';

const Activities = ({
  activities,
  addActivity,
  editActivityChecks,
  editActivityText
}) => (
  <Section>
    <SectionTitle>Program Activities</SectionTitle>
    <Collapsible title="Activity List">
      <div className="mb2">
        {activities.map((a, i) => (
          <div key={a.id} className="flex items-center mb1">
            <div className="mr1 bold mono">{i + 1}.</div>
            <div className="mr1 col-4">
              <input
                type="text"
                className="col-12 input m0"
                name={`${a.id}.name`}
                value={a.name}
                onChange={editActivityText}
              />
            </div>
            <div>
              {['HIT', 'HIE', 'MMIS'].map(aType => (
                <label key={aType} className="mr1">
                  <input
                    type="checkbox"
                    name={`${a.id}.type`}
                    value={aType}
                    checked={a.type.includes(aType)}
                    onChange={editActivityChecks}
                  />
                  {aType}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt2 btn btn-primary"
        onClick={addActivity}
      >
        Add activity
      </button>
    </Collapsible>

    {activities.map((a, i) => (
      <Collapsible
        key={a.id}
        title={`Program Activities › ${activityDisplay(a, i + 1)}`}
        bgColor="darken-1"
      >
        <Collapsible title="Activity Description">
          <ActivityDescription activity={a} />
        </Collapsible>

        <Collapsible title="Needs and Objectives">
          <FormActivityGoals form={`activity-${a.id}-goals`} />
        </Collapsible>

        <Collapsible title="Proposed Activity Schedule">
          <FormActivitySchedule form={`activity-${a.id}-schedule`} />
        </Collapsible>

        <Collapsible title="State Personnel">
          <StatePersonnel activity={a} />
        </Collapsible>

        <Collapsible title="Contractor Resources">
          <ContractorResources activity={a} />
        </Collapsible>

        <Collapsible title="Expenses">
          <Expenses activity={a} />
        </Collapsible>

        <Collapsible title="Cost Allocation and Other Funding Sources">
          <CostAllocation />
        </Collapsible>

        <Collapsible title="Standards & Conditions">
          <p>Tell us how you’ll meet the Medicaid standards and conditions.</p>
          {STANDARDS.map(std => {
            const inputId = `a-${a.id}-standards-${std.id}`;
            return (
              <div key={std.id}>
                <h3>{std.title}</h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto...
                </p>
                <div>
                  <label htmlFor={inputId}>
                    Describe how you’ll meet this condition
                  </label>
                  <textarea
                    className="m0 textarea md-col-8"
                    id={inputId}
                    rows="3"
                    spellCheck="true"
                  />
                </div>
              </div>
            );
          })}
        </Collapsible>
      </Collapsible>
    ))}
  </Section>
);

Activities.propTypes = {
  activities: PropTypes.array.isRequired,
  addActivity: PropTypes.func.isRequired,
  editActivityChecks: PropTypes.func.isRequired,
  editActivityText: PropTypes.func.isRequired
};

export default Activities;
