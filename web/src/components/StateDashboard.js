import PropTypes from 'prop-types';
import React from 'react';

import Btn from './Btn';
import Icon, { faArrowRight, faEdit, faPlusCircle } from './Icons';
import Sidebar from '../containers/StateDashboardSidebar';
import { SectionTitle } from './Section';
import TopBtns from '../containers/TopBtns';
import CurrentDocuments from '../containers/StateDashboardCurrentDocuments';

const ActivityEntry = () => (
  <div className="flex items-center mb3">
    <div className="flex-none mr1">
      <div
        className="flex items-center h4 center white bg-blue-bright rounded"
        style={{ width: 40, height: 40 }}
      >
        <div className="mx-auto center line-height-1">
          Jun<br />23
        </div>
      </div>
    </div>
    <div className="flex-auto">(ex.) Tim Smith commented on 2018 IAPD-U.</div>
  </div>
);

const Events = ({ month, events }) => (
  <div>
    <div className="mb1 bold">{month}</div>
    {events.map((e, i) => (
      <div key={i} className="mb1 flex items-center">
        <div>{e.day}</div>
        <div className="ml2 flex-auto p1 bg-teal-light rounded">
          (ex.) {e.title}
        </div>
      </div>
    ))}
  </div>
);

Events.propTypes = {
  month: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired
};

const TaskRow = ({ btnIcon, btnText, status, type }) => (
  <tr
    className="align-middle bg-grey-light border-top border-bottom border-white"
    style={{ borderWidth: '0.5rem' }}
  >
    <td>{type}</td>
    <td>{status}</td>
    <td>
      <Btn size="small" extraCss="col-12 p1 bg-blue white">
        {btnText} <Icon icon={btnIcon} className="ml1" />
      </Btn>
    </td>
  </tr>
);
TaskRow.propTypes = {
  btnIcon: PropTypes.object.isRequired,
  btnText: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

const TaskTable = () => (
  <table className="table-fixed">
    <thead>
      <tr className="bg-blue-bright white">
        <th className="col-2 light">Document type</th>
        <th className="col-4 light">Status</th>
        <th className="col-2 light">Action</th>
      </tr>
    </thead>
    <tbody>
      <TaskRow
        type="(ex. APD)"
        status="Awaiting state response"
        btnText="Respond"
        btnIcon={faArrowRight}
      />
      <TaskRow
        type="(ex. Contract)"
        status="Awaiting state response"
        btnText="Response"
        btnIcon={faArrowRight}
      />
      <TaskRow
        type="(ex. APD)"
        status="Submission in progress"
        btnText="Open"
        btnIcon={faEdit}
      />
      <TaskRow
        type="(ex. Contract)"
        status="Submission not started"
        btnText="Start"
        btnIcon={faPlusCircle}
      />
    </tbody>
  </table>
);

const DashboardSection = ({ title, children }) => (
  <section
    id="dashboard-tasks"
    className="mb3 bg-white rounded shadow accordian"
  >
    <h1 className="col-12 py2 sm-px3 h3 sm-h2 line-height-1 left-align regular blue">
      {title}
    </h1>
    <div className="p2 sm-p3 has-sticky-header">{children}</div>
  </section>
);
DashboardSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const StateDashboard = () => (
  <div className="site-body">
    <Sidebar />
    <div className="site-main p2 sm-p4 md-px0">
      <TopBtns hideDashboard />

      <SectionTitle>My Dashboard</SectionTitle>

      <DashboardSection title="Current Statuses">
        <CurrentDocuments />
      </DashboardSection>

      <DashboardSection title="My Tasks">
        <TaskTable />
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
            <h2 className="mt0 h3 pb1 light border-bottom">2018</h2>
            <Events
              month="June"
              events={[
                { day: 26, title: 'Quarterly Report Due' },
                { day: 30, title: 'Performance Progress CoP' }
              ]}
            />
            <Events
              month="July"
              events={[{ day: 7, title: 'Annual APD Due' }]}
            />
          </DashboardSection>
        </div>
      </div>
    </div>
  </div>
);

export default StateDashboard;
