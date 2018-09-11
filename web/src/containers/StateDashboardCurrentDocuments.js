import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { selectApd } from '../actions/apd';
import Btn from '../components/Btn';
import Icon, {
  faArrowRight,
  faCheckCircle,
  faCircle,
  faEdit,
  faSpinner
} from '../components/Icons';

const ProgressDot = ({ done, started, text }) => {
  let color = '#aaaaaa';
  if (done) {
    color = '#9dd887';
  } else if (started) {
    color = '#124f81';
  }

  let labelColor = '';
  if (!done && !started) {
    labelColor = ' light gray';
  }

  return (
    <div className="center">
      <Icon icon={done ? faCheckCircle : faCircle} color={color} size="2x" />
      <div
        className={`absolute left-align h5 ${labelColor}`.trim()}
        style={{ maxWidth: '7rem' }}
      >
        <div className="bold">{text}</div>
        {done && <div>10/1/1904</div>}
      </div>
    </div>
  );
};

ProgressDot.propTypes = {
  done: PropTypes.bool,
  started: PropTypes.bool,
  text: PropTypes.bool
};

ProgressDot.defaultProps = {
  done: false,
  started: false,
  text: null
};

const ProgressLine = ({ done }) => (
  <div
    className={`flex-auto bg-${done ? 'blue' : 'gray'}`}
    style={{ height: '3px' }}
  />
);

ProgressLine.propTypes = {
  done: PropTypes.bool
};

ProgressLine.defaultProps = {
  done: false
};

const DocumentItem = ({ name, status, buttonClick }) => {
  // const states = {
  //   one: {
  //     done: false,
  //     started: true,
  //     title: 'Submitted'
  //   },
  //   two: {
  //     done: false,
  //     started: false,
  //     title: 'Received'
  //   },
  //   three: {
  //     done: false,
  //     started: false,
  //     title: 'Under Review'
  //   },
  //   four: {
  //     done: false,
  //     started: false,
  //     title: 'In Clearance'
  //   },
  //   five: {
  //     done: false,
  //     started: false,
  //     title: 'Approved'
  //   }
  // };

  let actionButtonText = 'View';
  let actionButtonIcon = faArrowRight;

  switch (status) {
    case 'draft':
      actionButtonText = 'Open';
      actionButtonIcon = faEdit;
      break;

    case 'approved':
      actionButtonText = 'Approval letter';
      break;

    case 'disapproved':
      actionButtonText = 'Disapproval letter?';
      break;

    default:
      break;
  }

  const apdPipelineSteps = [
    {
      text: status === 'draft' ? 'Draft' : 'Submitted',
      started: true,
      done: [
        'in review',
        'awaiting state response',
        'in clearance',
        'approved',
        'disapproved'
      ].includes(status)
    }
  ];

  if (status !== 'withdrawn') {
    apdPipelineSteps.push(JSON.parse(JSON.stringify(apdPipelineSteps[0])));
    apdPipelineSteps[1].text = 'Received';
    apdPipelineSteps[1].started = false;

    apdPipelineSteps.push({
      text:
        status === 'awaiting state response' ? 'Pending Comments' : 'Review',
      started: ['in review', 'awaiting state response'].includes(status),
      done: ['in clearance', 'approved', 'disapproved'].includes(status)
    });
    apdPipelineSteps.push({
      text: 'Clearance',
      started: status === 'in clearance',
      done: ['approved', 'disapproved'].includes(status)
    });
  }

  const decisionTexts = {
    approved: 'Approved',
    disapproved: 'Disapproved',
    withdrawn: 'Withdrawn'
  };

  apdPipelineSteps.push({
    text: ['withdrawn', 'approved', 'disapproved'].includes(status)
      ? decisionTexts[status]
      : 'Decision',
    started: false,
    done: ['withdrawn', 'approved', 'disapproved'].includes(status)
  });

  return (
    <Fragment>
      <div className="sm-flex items-center justify-between mb4 pb4">
        <div className="bold sm-col-2">{name}</div>
        <div className="sm-col-7 flex items-center">
          {apdPipelineSteps.map((step, i) => (
            <Fragment key={step.name}>
              {i > 0 && <ProgressLine done={step.started || step.done} />}
              <ProgressDot {...step} />
            </Fragment>
          ))}
        </div>
        <div className="sm-col-2 sm-right-align">
          <Btn
            size="small"
            extraCss="col-8 p1 bg-blue white"
            onClick={buttonClick}
          >
            {actionButtonText} <Icon icon={actionButtonIcon} className="ml1" />
          </Btn>
        </div>
      </div>
    </Fragment>
  );
};

DocumentItem.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  buttonClick: PropTypes.func
};

DocumentItem.defaultProps = {
  buttonClick: () => {}
};

class CurrentDocuments extends Component {
  open = id => () => this.props.selectApd(id);

  render() {
    const { apds, fetching } = this.props;

    if (fetching) {
      return (
        <div className="h2 center">
          <Icon icon={faSpinner} spin size="sm" className="mr1" /> Loading APDs
        </div>
      );
    }

    return (
      <div>
        {apds.map(apd => (
          <DocumentItem
            key={apd.id}
            name={`APD for ${apd.years.join(', ')}`}
            status={apd.status}
            buttonClick={this.open(apd.id)}
          />
        ))}
        <DocumentItem name="Ex: APD in draft" status="draft" />
        <DocumentItem name="Ex: APD in review" status="in review" />
        <DocumentItem
          name="Ex: Reviewed, with comments"
          status="awaiting state response"
        />
        <DocumentItem name="Ex: In clearance" status="in clearance" />
        <DocumentItem name="Ex: Approved" status="approved" />
        <DocumentItem name="Ex: Disapproved" status="disapproved" />
        <DocumentItem name="Ex: Withdrawn" status="withdrawn" />
      </div>
    );
  }
}

CurrentDocuments.propTypes = {
  apds: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  selectApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd: { byId, fetching } }) => ({
  apds: Object.values(byId),
  fetching
});
const mapDispatchToProps = { selectApd };

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDocuments);
