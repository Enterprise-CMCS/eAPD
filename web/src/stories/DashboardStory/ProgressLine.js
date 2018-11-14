import React, { Component, Fragment } from 'react';

import { ProgressLine } from '../../containers/StateDashboardCurrentDocuments';

class ProgressLineStory extends Component {
  state = { done: false };

  toggleDone = () => this.setState({ done: !this.state.done });

  render = () => (
    <Fragment>
      <h1>Document progress line</h1>
      <h2>It renders like this:</h2>

      <ProgressLine done={this.state.done} />

      <p className="mt4">
        <label>
          <input
            type="checkbox"
            value={this.state.done}
            onChange={this.toggleDone}
          />Done
        </label>
      </p>
      <hr />
      <p>
        This is the thing that connects progress dots together and indicates
        movement between states.
      </p>
      <p>
        <code>{`<ProgressLine done={${this.state.done}} />`}</code>
      </p>
      <p>
        The <code>done</code> prop indicates if the thing represented by this
        line is finished.
      </p>
    </Fragment>
  );
}

export default ProgressLineStory;
