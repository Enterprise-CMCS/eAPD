import React, { Component, Fragment } from 'react';

import RenderViewbox from '../RenderViewbox';
import { DocumentItem } from '../../containers/StateDashboardCurrentDocuments';
import { APD_STATUS } from '../../constants';

class DocumentItemStory extends Component {
  state = {
    name: 'Document Name',
    status: APD_STATUS.DRAFT,
    statusKey: 'DRAFT'
  };

  setName = e => this.setState({ name: e.target.value });

  setStatus = e =>
    this.setState({
      status: APD_STATUS[e.target.value],
      statusKey: e.target.value
    });

  render = () => {
    const { name, status, statusKey } = this.state;
    return (
      <Fragment>
        <h1>Dashboard document item</h1>
        <h2>It renders like this:</h2>
        <RenderViewbox>
          <DocumentItem name={name} status={status} />
        </RenderViewbox>

        <p>
          <label htmlFor="story_document_item_inputx">
            Name:{' '}
            <input
              type="text"
              value={name}
              onChange={this.setName}
              id="story_document_item_input"
            />
          </label>
        </p>

        <p>
          <label htmlFor="story_document_item_select">
            Status:{' '}
            <select
              value={statusKey}
              onChange={this.setStatus}
              id="story_document_item_select"
            >
              {Object.entries(APD_STATUS).map(([key, symbol]) => (
                <option value={key}>
                  {symbol.toString().replace(/Symbol\((.+)\)/, '$1')}
                </option>
              ))}
            </select>
          </label>
        </p>

        <hr />
        <p>
          This represents a document on the dashboard, showing its name, a
          visual representation of its current state, and a link/button to the
          next action.
        </p>
        <p>
          <code>
            {`<DocumentItem name={${name}} status={${status.toString()}}/>`}
          </code>
        </p>
      </Fragment>
    );
  };
}

export default DocumentItemStory;
