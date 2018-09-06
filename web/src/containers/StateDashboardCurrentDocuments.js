import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
          <div key={apd.id} className="sm-flex items-center mb2">
            <div className="sm-col-2">
              <div className="bold">{`APD for ${apd.years.join(', ')}`}</div>
            </div>
            <div className="sm-col-8 progress-bar-basic">
              <div>
                <Icon icon={faCircle} color="#124f81" size="2x" />
              </div>
              <div className="bar" />
              <div>
                <Icon icon={faCircle} color="#aaaaaa" size="2x" />
              </div>
              <div className="bar" />
              <div>
                <Icon icon={faCircle} color="#aaaaaa" size="2x" />
              </div>
            </div>
            <div className="sm-col-2 sm-right-align">
              <Btn
                size="small"
                extraCss="col-12 m2 p1 bg-blue white"
                onClick={this.open(apd.id)}
              >
                Open <Icon icon={faEdit} className="ml1" />
              </Btn>
            </div>
          </div>
        ))}
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
