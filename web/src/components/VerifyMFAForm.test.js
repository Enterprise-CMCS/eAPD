import { shallow, mount } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import sinon from 'sinon';

import { plain as VerifyMFAForm } from './VerifyMFAForm';

const history = { goBack: sinon.spy() };

const defaultProps = {
  title: "test",
  history: history,
  children: ""
};

const setup = (props = {}) => {
  return mount(
    <VerifyMFAForm {...defaultProps} {...props} />
  );
};

describe('card form wrapper', () => {
  beforeEach(() => {
    history.goBack.resetHistory();
  });

  test('renders without an id on the container if id prop is null', () => {
    expect(
      shallow(
        <VerifyMFAForm id={null} title="test" history={history}>
          hello world
        </VerifyMFAForm>
      )
    ).toMatchSnapshot();
  });

  test('renders with the provided id on the container if id prop is set', () => {
    expect(
      shallow(
        <VerifyMFAForm id="my custom id" title="test" history={history}>
          hello world
        </VerifyMFAForm>
      )
    ).toMatchSnapshot();
  });

  test('renders with the default id on the container if id prop is not set', () => {
    expect(
      shallow(
        <VerifyMFAForm title="test" history={history}>
          hello world
        </VerifyMFAForm>
      )
    ).toMatchSnapshot();
  });

  test('renders without a save button if onSave prop is missing', () => {
    expect(
      shallow(
        <VerifyMFAForm title="test" history={history}>
          hello world
        </VerifyMFAForm>
      )
    ).toMatchSnapshot();
  });

  test('renders with a save button if onSave prop is provided', () => {
    expect(
      shallow(
        <VerifyMFAForm title="test" history={history} onSave={sinon.spy()}>
          hello world
        </VerifyMFAForm>
      )
    ).toMatchSnapshot();
  });

  test('disables the save button if canSubmit is false', () => {
    expect(
      shallow(
        <VerifyMFAForm
          title="test"
          history={history}
          onSave={sinon.spy()}
          canSubmit={false}
        >
          hello world
        </VerifyMFAForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a legend if provided', () => {
    const props = {
      legend: "hidden temple"
    };
    
    const component = setup(props);
    
    expect(component.find('legend').exists()).toBe(true);
  });

  test('renders an error alert if message provided', () => {
    expect(
      shallow(
        <VerifyMFAForm title="test" history={history} error="oh noes!">
          hello world
        </VerifyMFAForm>
      )
    ).toMatchSnapshot();
  });

  test('renders a success alert if message provided', () => {
    expect(
      shallow(
        <VerifyMFAForm title="test" history={history} success="oh yeah!">
          hello world
        </VerifyMFAForm>
      )
    ).toMatchSnapshot();
  });

  test('does not render a cancel button if form is not cancelable', () => {
    expect(
      shallow(
        <VerifyMFAForm title="test" history={history} cancelable={false}>
          hello world
        </VerifyMFAForm>
      )
    ).toMatchSnapshot();
  });

});
