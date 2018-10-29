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
import { APD_STATUS, DASHBOARD_TASK_BUTTON_TEXT } from '../constants';

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
  text: PropTypes.string
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
  const actionButtonText = DASHBOARD_TASK_BUTTON_TEXT[status];
  const actionButtonIcon = status === APD_STATUS.DRAFT ? faEdit : faArrowRight;

  const apdPipelineSteps = [
    {
      text: status === APD_STATUS.DRAFT ? 'Draft' : 'Submitted',
      started: true,
      done: [
        APD_STATUS.IN_REVIEW,
        APD_STATUS.STATE_RESPONSE,
        APD_STATUS.IN_CLEARANCE,
        APD_STATUS.APPROVED,
        APD_STATUS.DISAPPROVED
      ].includes(status)
    }
  ];

  if (status !== APD_STATUS.WITHDRAWN) {
    apdPipelineSteps.push(JSON.parse(JSON.stringify(apdPipelineSteps[0])));
    apdPipelineSteps[1].text = 'Received';
    apdPipelineSteps[1].started = false;

    apdPipelineSteps.push({
      text:
        status === APD_STATUS.STATE_RESPONSE ? 'Pending Comments' : 'Review',
      started: [APD_STATUS.IN_REVIEW, APD_STATUS.STATE_RESPONSE].includes(
        status
      ),
      done: [
        APD_STATUS.IN_CLEARANCE,
        APD_STATUS.APPROVED,
        APD_STATUS.DISAPPROVED
      ].includes(status)
    });
    apdPipelineSteps.push({
      text: 'Clearance',
      started: status === APD_STATUS.IN_CLEARANCE,
      done: [APD_STATUS.APPROVED, APD_STATUS.DISAPPROVED].includes(status)
    });
  }

  const decisionTexts = {
    [APD_STATUS.APPROVED]: 'Approved',
    [APD_STATUS.DISAPPROVED]: 'Disapproved',
    [APD_STATUS.WITHDRAWN]: 'Withdrawn'
  };

  const doneStatuses = [
    APD_STATUS.WITHDRAWN,
    APD_STATUS.APPROVED,
    APD_STATUS.DISAPPROVED
  ];

  apdPipelineSteps.push({
    text: doneStatuses.includes(status) ? decisionTexts[status] : 'Decision',
    started: false,
    done: doneStatuses.includes(status)
  });

  return (
    <Fragment>
      <div className="sm-flex items-center justify-between mb4 pb4">
        <div className="bold sm-col-2">{name}</div>
        <div className="sm-col-7 flex items-center">
          {apdPipelineSteps.map((step, i) => (
            <Fragment key={step.text}>
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
  status: PropTypes.symbol.isRequired,
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
            status={APD_STATUS.DRAFT}
            buttonClick={this.open(apd.id)}
          />
        ))}
        <DocumentItem name="Ex: APD in draft" status={APD_STATUS.DRAFT} />
        <DocumentItem name="Ex: APD in review" status={APD_STATUS.IN_REVIEW} />
        <DocumentItem
          name="Ex: Reviewed, with comments"
          status={APD_STATUS.STATE_RESPONSE}
        />
        <DocumentItem
          name="Ex: In clearance"
          status={APD_STATUS.IN_CLEARANCE}
        />
        <DocumentItem name="Ex: Approved" status={APD_STATUS.APPROVED} />
        <DocumentItem name="Ex: Disapproved" status={APD_STATUS.DISAPPROVED} />
        <DocumentItem name="Ex: Withdrawn" status={APD_STATUS.WITHDRAWN} />
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

export {
  CurrentDocuments as raw,
  DocumentItem,
  ProgressDot,
  ProgressLine,
  mapStateToProps,
  mapDispatchToProps
};
