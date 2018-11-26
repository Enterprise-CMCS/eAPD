import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Icon, { faPlusCircle, faSpinner } from '../components/Icons';
import Sidebar from './StateDashboardSidebar';
import TopBtns from './TopBtns';
import { createApd, selectApd } from '../actions/apd';
import { Section } from '../components/Section';
import { t } from '../i18n';

const Loading = () => (
  <div className="h2 p0 pb3 center">
    <Icon icon={faSpinner} spin size="sm" className="mr1" /> Loading APDs
  </div>
);

const StateDashboard = ({
  apds,
  createApd: create,
  fetching,
  selectApd: select,
  state
}) => {
  const open = id => e => {
    e.preventDefault();
    select(id);
  };

  return (
    <div className="site-body">
      <Sidebar />
      <div className="site-main p2 sm-p4 md-px0">
        <TopBtns hideDashboard />

        <Section resource="stateDashboard">
          <div className="mb3 bg-white rounded shadow accordian">
            <div className="px3 py2 border-bottom border-bottom-darken-1 blue">
              <span className="h2">{state.name} APDs</span>
              <button
                className="btn bg-blue white rounded p1 right inline-block"
                size="small"
                onClick={create}
              >
                Create new&nbsp;&nbsp;
                <Icon icon={faPlusCircle} />
              </button>
            </div>
            <div className="p3">
              {fetching ? <Loading /> : null}
              {!fetching && apds.length === 0 ? t('stateDashboard.none') : null}
              {apds.map(apd => (
                <div key={apd.id} className="p2 mb2 bg-gray-lightest">
                  <div className="inline-block p2 mr2 bg-white blue">
                    <img
                      src="/static/img/icon-document.svg"
                      alt=""
                      className="align-middle"
                    />
                  </div>
                  <h3 className="inline-block">
                    <a href="#!" onClick={open(apd.id)}>
                      HITECH APD for FFY {apd.years.join(', ')}
                    </a>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

StateDashboard.propTypes = {
  apds: PropType.array.isRequired,
  fetching: PropType.bool.isRequired,
  state: PropType.object.isRequired,
  createApd: PropType.func.isRequired,
  selectApd: PropType.func.isRequired
};

const mapStateToProps = ({
  apd: { byId, fetching },
  user: {
    data: { state }
  }
}) => ({
  apds: Object.values(byId),
  fetching,
  state
});

const mapDispatchToProps = {
  createApd,
  selectApd
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateDashboard);
