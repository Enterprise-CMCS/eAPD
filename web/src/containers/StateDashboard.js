import { Button } from '@cmsgov/design-system-core';
import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Icon, { File, faPlusCircle, faSpinner } from '../components/Icons';
import Instruction from '../components/Instruction';
import { createApd, deleteApd, selectApd } from '../actions/apd';
import { t } from '../i18n';
import { selectApdDashboard, selectApds } from '../reducers/apd.selectors';

const Loading = () => (
  <div className="ds-h2 ds-u-padding--0 ds-u-padding-bottom--3 ds-u-text-align--center">
    <Icon icon={faSpinner} spin size="sm" className="ds-u-margin-right--1" />{' '}
    Loading APDs
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
    <div className="site-body ds-l-container">
      <div className="ds-l-row ds-u-margin--0">
        <div className="site-main ds-l-col--8 ds-u-margin-x--auto ">
          <h1 className="ds-h1 ds-u-margin-top--3">
            {t('stateDashboard.title', { state: state.name })}
          </h1>
          <Instruction source="stateDashboard.instruction" />

          <div className="ds-u-border-bottom--2 ds-u-margin-bottom--1 ds-u-margin-top--6 ds-u-padding-bottom--1">
            <Button
              variation="primary"
              className="ds-u-float--right"
              onClick={create}
            >
              Create new&nbsp;&nbsp;
              <Icon icon={faPlusCircle} />
            </Button>
            <h2 className="h2">{state.name} APDs</h2>
          </div>

          {fetching ? <Loading /> : null}
          {!fetching && apds.length === 0 ? t('stateDashboard.none') : null}
          <div className="ds-l-container">
            {apds.map(apd => (
              <div
                key={apd.id}
                className="ds-l-row ds-u-border-bottom--2 ds-u-margin-bottom--2 ds-u-padding-bottom--2"
              >
                <div
                  className="ds-l-col--1 ds-u-valign--middle ds-u-text-align--center"
                  style={{ alignSelf: 'center' }}
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
            ))}
          </div>
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
