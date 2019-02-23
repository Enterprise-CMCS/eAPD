import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { selectApd } from '../actions/apd';
import VerticalNav from '@cmsgov/design-system-core/dist/components/VerticalNav/VerticalNav';

class Sidebar extends Component {
  pickApd = id => () => this.props.selectApd(id);

  render() {
    const { apds, place } = this.props;

    return (
      <div className="ds-l-col--3">
        <aside className="site-sidebar">
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
            <VerticalNav
              selectedId="state-apds"
              items={[
                {
                  label: `${place.name} APDs`,
                  id: "state-apds",
                  items: apds.map(apd => (
                    {
                      id: `${apd.id}`,
                      label: `${apd.years.join(', ')} ${place.id.toUpperCase()} APD`,
                      url: 'javascript:void(0);',
                      onClick: this.pickApd(apd.id)
                    }
                  )),
                }
              ]}
            />
          </div>
        </aside>
      </div>
    );
  }
}

Sidebar.propTypes = {
  apds: PropTypes.array.isRequired,
  place: PropTypes.object.isRequired,
  selectApd: PropTypes.func.isRequired
};

const mapStateToProps = ({
  apd: { byId },
  user: {
    data: { state }
  }
}) => ({
  apds: Object.values(byId),
  place: state
});

const mapDispatchToProps = {
  selectApd
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export { Sidebar as plain, mapStateToProps, mapDispatchToProps };
