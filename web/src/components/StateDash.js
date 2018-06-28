import PropTypes from 'prop-types';
import React from 'react';

import Collapsible from './Collapsible';
import Container from './Container';
import SectionTitle from './SectionTitle';

const ActivityEntry = () => (
  <div className="flex items-center mb2">
    <div className="flex-none mr1">
      <div
        className="flex items-center h6 center white bg-teal rounded"
        style={{ width: 40, height: 40 }}
      >
        <div className="mx-auto center line-height-1">
          Jun<br />23
        </div>
      </div>
    </div>
    <div className="flex-auto">Tim Smith created a new document.</div>
  </div>
);

const Events = ({ month, events }) => (
  <div>
    <div className="mb1 bold">{month}</div>
    {events.map((e, i) => (
      <div key={i} className="mb1 flex items-center">
        <div>{e.day}</div>
        <div className="ml2 flex-auto p1 bg-yellow rounded">{e.title}</div>
      </div>
    ))}
  </div>
);

Events.propTypes = {
  month: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired
};

const StateDash = () => (
  <Container>
    <SectionTitle>My Dashboard</SectionTitle>
    <Collapsible title="My tasks" open>
      ...
    </Collapsible>
    <Collapsible title="Current statuses" open>
      ...
    </Collapsible>
    <div className="sm-flex mxn2">
      <div className="sm-col-6 px2">
        <Collapsible title="Recent activity" open>
          <ActivityEntry />
          <ActivityEntry />
          <ActivityEntry />
        </Collapsible>
      </div>
      <div className="sm-col-6 px2">
        <Collapsible title="Upcoming events" open>
          <h3 className="mt0 pb1 light border-bottom">2018</h3>
          <Events
            month="June"
            events={[
              { day: 26, title: 'Something amazing I guess' },
              { day: 30, title: 'Pretzel Day' }
            ]}
          />
          <Events
            month="July"
            events={[{ day: 7, title: 'Half price apps' }]}
          />
        </Collapsible>
      </div>
    </div>
  </Container>
);

export default StateDash;
