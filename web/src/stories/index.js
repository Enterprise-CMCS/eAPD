import React, { Component } from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

import { DocumentItem, ProgressDot, ProgressLine } from './DashboardStory';
import { Instruction, Section, Subsection } from './content';
import FrozenTableStory from './FrozenTableStory';
import { DollarInput } from '../components/Inputs';

import '../styles/legacy.css';
import '../styles/index.scss';
import './story-styles.scss';

storiesOf('Content components', module)
  .add('Section', () => <Section />)
  .add('Subsection', () => <Subsection />)
  .add('Instruction', () => <Instruction />);

storiesOf('Frozen-pane tables', module).add('example', () => (
  <FrozenTableStory />
));

storiesOf('Dashboard components', module)
  .add('Document', () => <DocumentItem />)
  .add('Progress dot', () => <ProgressDot />)
  .add('Progress line', () => <ProgressLine />);

storiesOf('Numeric inputs', module).add('Dollars', () => {
  class Dollar extends Component {
    state = { value: 0 };

    change = e => {
      this.setState({ value: e.target.value });
    };

    render() {
      const { value } = this.state;

      return (
        <DollarInput
          hideLabel
          wrapperClass="m0"
          className="fake-spacer-input m0 input input-condensed mono right-align"
          label="fake-spacer-input"
          name="fake-spacer-input"
          value={value}
          onChange={this.change}
        />
      );
    }
  }

  return <Dollar />;
});
