import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { createApd, selectApd } from '../actions/apd';
import Btn from '../components/Btn';
import SidebarLink from '../components/SidebarLink';

class Sidebar extends Component {
  createApd = () => this.props.createApd();

  pickApd = id => () => this.props.selectApd(id);

  render() {
    const { apds, place } = this.props;

    return (
      <aside className="site-sidebar bg-teal relative">
        <div className="xs-hide sm-hide">
          <div className="px2 py3 lg-px3 lg-py4 bg-white flex items-center">
            <img
              src={`/static/img/states/${place.id}.svg`}
              alt={place.name}
              className="align-middle mr2"
              width="40"
              height="40"
            />
            <h1 className="m0 blue h3 light caps line-height-2">
              {place.name} <br />
              {t('title', { year: '' })}
            </h1>
          </div>
          <div className="p2 lg-p3">
            <ul className="list-reset">
              <SidebarLink>My Documents</SidebarLink>
              {apds.map(apd => (
                <SidebarLink
                  key={apd.id}
                  hash={`${apd.id}`}
                  onClick={this.pickApd(apd.id)}
                >
                  {`${apd.years.join(', ')} ${place.id.toUpperCase()} APD`}
                </SidebarLink>
              ))}
            </ul>
            <div className="mt3">
              <Btn
                kind="outline"
                extraCss="bg-white blue"
                onClick={this.createApd}
              >
                Create new
              </Btn>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  apds: PropTypes.array.isRequired,
  place: PropTypes.object.isRequired,
  createApd: PropTypes.func.isRequired,
  selectApd: PropTypes.func.isRequired
};

const mapStateToProps = ({ apd: { byId }, user: { data: { state } } }) => ({
  apds: Object.values(byId),
  place: state
});

const mapDispatchToProps = {
  createApd,
  selectApd
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
