import React, { Component, Fragment } from 'react';

import RenderViewbox from '../RenderViewbox';
import { ProgressDot } from '../../containers/StateDashboardCurrentDocuments';

class DashboardStory extends Component {
  state = { done: false, started: false, text: null };

  setText = e => this.setState({ text: e.target.value });
  toggleDone = () => this.setState({ done: !this.state.done });
  toggleStarted = () => this.setState({ started: !this.state.started });

  render = () => (
    <Fragment>
      <h1>Document progress dot</h1>
      <h2>It renders like this:</h2>
      <RenderViewbox>
        <ProgressDot
          done={this.state.done}
          started={this.state.started}
          text={this.state.text}
        />
      </RenderViewbox>

      <p className="mt4">
        <label>
          <input
            type="checkbox"
            value={this.state.done}
            onChange={this.toggleDone}
          />Done
        </label>
      </p>

      <p>
        <label>
          <input
            type="checkbox"
            value={this.state.started}
            onChange={this.toggleStarted}
          />Started
        </label>
      </p>

      <p>
        <label>
          Text:{' '}
          <input type="text" value={this.state.text} onChange={this.setText} />
        </label>
      </p>

      <hr />
      <p>
        <code>
          {`<ProgressDot done={${this.state.done}} started={${
            this.state.started
          }} text=${this.state.text ? `"${this.state.text}"` : '{null}'}/>`}
        </code>
      </p>
      <p>
        The <code>done</code> prop indicates if the thing represented by this
        dot is finished. It affects the presentation of the dot, changing its
        style and displaying the finished date (currently hardcoded!).
      </p>
      <p>
        The <code>started</code> prop indicates if the thing represented by this
        dot has been started. It affects the presentation of the dot.
      </p>
      <p>
        The <code>text</code> prop is what to display beneath the dot.
      </p>
    </Fragment>
  );
}

export default DashboardStory;
