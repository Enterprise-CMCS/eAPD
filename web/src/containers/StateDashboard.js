import { Button } from '@cmsgov/design-system-core';
import PropType from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon, { File, faPlusCircle, faSpinner } from '../components/Icons';
import Instruction from '../components/Instruction';
import Md from '../components/Md';
import { createApd, deleteApd, selectApd } from '../actions/apd';
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
    if (global.confirm(`Delete ${apd.name}?`)) {
      del(apd.id);
    }
  };

  return (
    <div className="ds-l-container ds-u-margin-top--7">
      <div className="ds-l-row">
        <div className="ds-l-col--8 ds-u-margin-x--auto ">
          <h1 className="ds-h1">
            {t('stateDashboard.title', { state: state.name })}
          </h1>
          <Instruction source="stateDashboard.instruction" />

          <div className="ds-u-margin-top--5 ds-u-padding-bottom--1 ds-u-border-bottom--2">
            <h2 className="ds-h2 ds-u-display--inline-block">{state.name} APDs</h2>
            <Button
              variation="primary"
              className="ds-u-float--right"
              onClick={create}
            >
              Create new&nbsp;&nbsp;
              <Icon icon={faPlusCircle} />
            </Button>
          </div>
        </div>
      </div>
      {fetching ? <Loading /> : null}
      {!fetching && apds.length === 0 ? t('stateDashboard.none') : null}
        {apds.map((apd, i) => (
          <div
            key={apd.id}
            className="ds-l-row"
          >
            <div className="ds-l-col--8 ds-u-margin-x--auto ds-u-padding-top--2">
              <div className="ds-u-border-bottom--2 ds-u-padding-bottom--3">
                <div
                  className="ds-u-display--inline-block ds-u-float--left ds-u-fill--primary-alt-lightest ds-u-padding--2 ds-u-margin-right--2"
                >
                  <File size="lg" color="#046b99" />
                </div>
                <div className="ds-u-display--inline-block">
                  <h3 className="ds-u-margin-top--0">
                    <a href="#!" onClick={open(apd.id)}>
                      {apd.name}
                    </a>
                  </h3>
                  <ul className="ds-c-list--bare">
                    <li>
                      <strong>Last edited:</strong> {apd.updated}
                    </li>
                  </ul>
                </div>
                <div className="ds-u-display--inline-block ds-u-float--right ds-u-text-align--right">
                  <Button
                    variation="transparent"
                    size="small"
                    onClick={delApd(apd)}
                  >
                    <span
                      className="ds-u-fill--primary-alt-lightest ds-u-padding--2"
                      style={{ marginLeft: '-16px' }}
                    >
                      <File size="lg" color="#046b99" />
                    </span>
                  </div>
                  <div className="ds-l-col--9">
                    <h3 className="ds-u-margin-top--0">
                      <a href="#!" onClick={open(apd.id)}>
                        {apd.name}
                      </a>
                    </h3>
                    <ul className="ds-c-list--bare">
                      <li>
                        <strong>Last edited:</strong> {apd.updated}
                      </li>
                    </ul>
                  </div>
                  <div className="ds-l-col--2 ds-u-text-align--right">
                    <Button
                      variation="transparent"
                      size="small"
                      onClick={delApd(apd)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      ))}
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
