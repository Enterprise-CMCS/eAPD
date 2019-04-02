import { Button } from '@cmsgov/design-system-core';
import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Icon, { faPlusCircle, faSpinner } from '../components/Icons';
import Sidebar from './StateDashboardSidebar';
import TopBtns from './TopBtns';
import { createApd, deleteApd, selectApd } from '../actions/apd';
import { Section } from '../components/Section';
import { t } from '../i18n';
import { selectApdDashboard, selectApds } from '../reducers/apd.selectors';

const Loading = () => (
  <div className="h2 p0 pb3 center">
    <Icon icon={faSpinner} spin size="sm" className="mr1" /> Loading APDs
  </div>
);

const StateDashboard = (
  {
    apds,
    createApd: create,
    deleteApd: del,
    fetching,
    selectApd: select,
    state
  },
  { global = window } = {}
) => {
  const open = id => e => {
    e.preventDefault();
    select(id);
  };

  const delApd = apd => () => {
    if (global.confirm(`Delete HITECH APD for FFY ${apd.years.join(', ')}?`)) {
      del(apd.id);
    }
  };

  return (
    <div className="site-body ds-l-container">
      <div className="ds-l-row ds-u-margin--0">
        <Sidebar />
        <div className="site-main p2 sm-p4 md-px0 ds-l-col--9">
          <TopBtns hideDashboard />

          <Section resource="stateDashboard">
            <div className="mb3 bg-white rounded shadow accordian">
              <div className="px3 py2 border-bottom border-bottom-darken-1 blue">
                <span className="h2">{state.name} APDs</span>
                <Button
                  variation="primary"
                  size="small"
                  className="right inline-block"
                  onClick={create}
                >
                  Create new&nbsp;&nbsp;
                  <Icon icon={faPlusCircle} />
                </Button>
              </div>
              <div className="p3">
                {fetching ? <Loading /> : null}
                {!fetching && apds.length === 0
                  ? t('stateDashboard.none')
                  : null}
                {apds.map(apd => (
                  <div key={apd.id} className="p2 mb2 bg-gray-lightest">
                    <div className="inline-block p2 mr2 bg-white blue rounded left">
                      <img
                        src="/static/img/icon-document.svg"
                        alt=""
                        className="align-middle"
                        style={{ minWidth: '33px' }}
                      />
                    </div>
                    <h3 className="inline-block">
                      <a href="#!" onClick={open(apd.id)}>
                        HITECH APD for FFY {apd.years.join(', ')}
                      </a>
                    </h3>
                    <Button
                      variation="danger"
                      size="small"
                      className="right"
                      onClick={delApd(apd)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

StateDashboard.propTypes = {
  apds: PropType.array.isRequired,
  fetching: PropType.bool.isRequired,
  state: PropType.object.isRequired,
  createApd: PropType.func.isRequired,
  deleteApd: PropType.func.isRequired,
  selectApd: PropType.func.isRequired
};

const mapStateToProps = state => ({
  apds: selectApdDashboard(state),
  fetching: selectApds(state).fetching,
  state: state.user.data.state
});

const mapDispatchToProps = {
  createApd,
  deleteApd,
  selectApd
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateDashboard);
