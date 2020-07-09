import PropTypes from 'prop-types';
import React, { Component } from 'react';

const { Provider, Consumer } = React.createContext();

class LinksContextProvider extends Component {
  render() {
    const { children } = this.props;
    return (
      <Provider
        value={{
          getLinks: this.getTheLinks,
          getPreviousNextLinks: this.getPreviousNextLinks
        }}
      >
        {children}
      </Provider>
    );
  }
}

LinksContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { LinksContextProvider, Consumer as LinksContextConsumer };
