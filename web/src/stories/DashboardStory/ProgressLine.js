import React, { Component, Fragment } from 'react';

import { ProgressLine } from '../../containers/StateDashboardCurrentDocuments';

class ProgressLineStory extends Component {
  state = { done: false };

  toggleDone = () => this.setState(prev => ({ done: !prev.done }));

  render = () => {
    const { done } = this.state;

    return (
      <Fragment>
        <h1>Document progress line</h1>
        <h2>It renders like this:</h2>

        <ProgressLine done={done} />

        <p className="mt4">
          <label>
            <input
              id="storybook_progressline"
              type="checkbox"
              value={done}
              onChange={this.toggleDone}
            />
            Done
          </label>
        </p>
        <hr />
        <p>
          This is the thing that connects progress dots together and indicates
          movement between states.
        </p>
        <p>
          <code>{`<ProgressLine done={${done}} />`}</code>
        </p>
        <p>
          The <code>done</code> prop indicates if the thing represented by this
          line is finished.
        </p>
      </Fragment>
    );
  };
}

export default ProgressLineStory;
