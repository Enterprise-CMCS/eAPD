import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import VerticalNav from '@cmsgov/design-system-core/dist/components/VerticalNav/VerticalNav';

import { t } from '../i18n';
import { selectApd } from '../actions/apd';

class Sidebar extends Component {
  pickApd = id => () => {
    const { selectApd: action } = this.props;
    action(id);
  };

  render() {
    const { apds, place } = this.props;

    return (
      <div className="ds-l-col--3 bg-white">
        <aside className="site-sidebar">
          <div className="xs-hide sm-hide">
            <div className="flex items-center ds-u-border-bottom--1 ds-u-padding-y--2 ds-u-margin-bottom--4">
              <img
                src={`/static/img/states/${place.id}.svg`}
                alt={place.name}
                className="align-middle mr2"
                width="40"
                height="40"
              />
              <h1 className="text-xl">
                {place.name} <br />
                {t('title', { year: '' })}
              </h1>
            </div>
            <VerticalNav
              selectedId="state-apds"
              items={[
                {
                  label: `${place.name} APDs`,
                  id: 'state-apds',
                  items: apds.map(apd => ({
                    id: `${apd.id}`,
                    label: `${apd.years.join(
                      ', '
                    )} ${place.id.toUpperCase()} APD`,
                    url: 'javascript:void(0);', // eslint-disable-line no-script-url
                    onClick: this.pickApd(apd.id)
                  }))
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
