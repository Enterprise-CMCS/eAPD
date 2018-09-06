import PropTypes from 'prop-types';
import React from 'react';

import Btn from './Btn';
import Container from './Container';
import { SectionTitle } from './Section';
import Icon, {
  faArrowRight,
  faCheckCircle,
  faCircle,
  faEdit,
  faPlusCircle
} from './Icons';

const ActivityEntry = () => (
  <div className="flex items-center mb2">
    <div className="flex-none mr1">
      <div
        className="flex items-center h6 center white bg-blue-bright rounded"
        style={{ width: 40, height: 40 }}
      >
        <div className="mx-auto center line-height-1">
          Jun<br />23
        </div>
      </div>
    </div>
    <div className="flex-auto">Tim Smith commented on 2018 IAPD-U.</div>
  </div>
);

const Events = ({ month, events }) => (
  <div>
    <div className="mb1 bold">{month}</div>
    {events.map((e, i) => (
      <div key={i} className="mb1 flex items-center">
        <div>{e.day}</div>
        <div className="ml2 flex-auto p1 bg-teal-light rounded">{e.title}</div>
      </div>
    ))}
  </div>
);

Events.propTypes = {
  month: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired
};

const StatusEntry = () => (
  <div>
    <div className="sm-flex items-center mb2">
      <div className="sm-col-2">
        <div className="bold">Example one</div>
      </div>
      <div className="sm-col-8 progress-bar-basic">
        <div>
          <Icon icon={faCheckCircle} color="#9dd887" size="2x" />
        </div>
        <div className="bar complete" />
        <div>
          <Icon icon={faCheckCircle} color="#9dd887" size="2x" />
        </div>
        <div className="bar" />
        <div>
          <Icon icon={faCircle} color="#aaaaaa" size="2x" />
        </div>
      </div>
      <div className="sm-col-2 sm-right-align">
        <Btn size="small" extraCss="col-12 m2 p1 bg-blue white">
          View <Icon icon={faArrowRight} className="ml1" />
        </Btn>
      </div>
    </div>
    <div className="sm-flex items-center mb2">
      <div className="sm-col-2">
        <div className="bold">Example two</div>
      </div>
      <div className="sm-col-8 progress-bar-basic">
        <div>
          <Icon icon={faCheckCircle} color="#9dd887" size="2x" />
        </div>
        <div className="bar complete" />
        <div>
          <Icon icon={faCircle} color="#124f81" size="2x" />
        </div>
        <div className="bar" />
        <div>
          <Icon icon={faCircle} color="#aaaaaa" size="2x" />
        </div>
      </div>
      <div className="sm-col-2 sm-right-align">
        <Btn size="small" extraCss="col-12 m2 p1 bg-blue white">
          View <Icon icon={faArrowRight} className="ml1" />
        </Btn>
      </div>
    </div>
    <div className="sm-flex items-center mb2">
      <div className="sm-col-2">
        <div className="bold">Example 3</div>
      </div>
      <div className="sm-col-8 progress-bar-basic">
        <div>
          <Icon icon={faCheckCircle} color="#9dd887" size="2x" />
        </div>
        <div className="bar complete" />
        <div>
          <Icon icon={faCheckCircle} color="#9dd887" size="2x" />
        </div>
        <div className="bar complete" />
        <div>
          <Icon icon={faCheckCircle} color="#9dd887" size="2x" />
        </div>
      </div>
      <div className="sm-col-2 sm-right-align">
        <Btn size="small" extraCss="col-12 m2 p1 bg-blue white">
          View <Icon icon={faArrowRight} className="ml1" />
        </Btn>
      </div>
    </div>
  </div>
);

const TaskTable = () => (
  <table className="table-fixed">
    <thead>
      <tr className="bg-blue-bright white">
        <th className="col-2 regular">Document type</th>
        <th className="col-4 regular">Status</th>
        <th className="col-2 regular">Due date</th>
        <th className="col-2 regular">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        className="align-middle bg-grey-light border-top border-bottom border-white"
        style={{ borderWidth: '0.5rem' }}
      >
        <td>APD</td>
        <td>Awaiting state response</td>
        <td>09/10/2018</td>
        <td>
          <Btn size="small" extraCss="col-12 p1 bg-blue white">
            Respond <Icon icon={faArrowRight} className="ml1" />
          </Btn>
        </td>
      </tr>
      <tr
        className="align-middle bg-grey-light border-top border-bottom border-white"
        style={{ borderWidth: '0.5rem' }}
      >
        <td>Contract</td>
        <td>Awaiting state response</td>
        <td>ASAP</td>
        <td>
          <Btn size="small" extraCss="col-12 p1 bg-blue white">
            Response <Icon icon={faArrowRight} className="ml1" />
          </Btn>
        </td>
      </tr>
      <tr
        className="align-middle bg-grey-light border-top border-bottom border-white"
        style={{ borderWidth: '0.5rem' }}
      >
        <td>APD</td>
        <td>Submission in progress</td>
        <td>08/01/2018</td>
        <td>
          <Btn size="small" extraCss="col-12 p1 bg-blue white">
            Open <Icon icon={faEdit} className="ml1" />
          </Btn>
        </td>
      </tr>
      <tr
        className="align-middle bg-grey-light border-top border-bottom border-white"
        style={{ borderWidth: '0.5rem' }}
      >
        <td>Contract</td>
        <td>Submission not started</td>
        <td>12/01/2018</td>
        <td>
          <Btn size="small" extraCss="col-12 p1 bg-blue white">
            Start <Icon icon={faPlusCircle} className="ml1" />
          </Btn>
        </td>
      </tr>
    </tbody>
  </table>
);

const DashboardSection = ({ title, children }) => (
  <div id="dashboard-tasks" className="mb3 bg-white rounded shadow accordian">
    <h1 className="col-12 py2 sm-px3 h3 sm-h2 line-height-1 left-align regular blue">
      {title}
    </h1>
    <div className="p2 sm-p3 has-sticky-header">{children}</div>
  </div>
);
DashboardSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const StateDash = () => (
  <Container>
    <SectionTitle>My Dashboard</SectionTitle>

    <DashboardSection title="My Tasks">
      <TaskTable />
    </DashboardSection>

    <DashboardSection title="Current Statuses">
      <StatusEntry />
    </DashboardSection>

    <div className="sm-flex mxn2">
      <div className="sm-col-6 px2">
        <DashboardSection title="Recent Activity">
          <ActivityEntry />
          <ActivityEntry />
          <ActivityEntry />
        </DashboardSection>
      </div>
      <div className="sm-col-6 px2">
        <DashboardSection title="Upcoming events">
          <h3 className="mt0 pb1 light border-bottom">2018</h3>
          <Events
            month="June"
            events={[
              { day: 26, title: 'Quarterly Report Due' },
              { day: 30, title: 'Performance Progress CoP' }
            ]}
          />
          <Events month="July" events={[{ day: 7, title: 'Annual APD Due' }]} />
        </DashboardSection>
      </div>
    </div>
  </Container>
);

export default StateDash;
