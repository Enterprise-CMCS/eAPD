import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { plain as LoginForm } from './LoginForm';

const history = { goBack: sinon.spy() };

describe('card form wrapper', () => {
	beforeEach(() => {
		history.goBack.resetHistory();
	});

	test('renders without an id on the container if id prop is null', () => {
		expect(
			shallow(
				<LoginForm id={null} title="test" history={history}>
					hello world
				</LoginForm>
			)
		).toMatchSnapshot();
	});

	test('renders with the provided id on the container if id prop is set', () => {
		expect(
			shallow(
				<LoginForm id="my custom id" title="test" history={history}>
					hello world
				</LoginForm>
			)
		).toMatchSnapshot();
	});

	test('renders with the default id on the container if id prop is not set', () => {
		expect(
			shallow(
				<LoginForm title="test" history={history}>
					hello world
				</LoginForm>
			)
		).toMatchSnapshot();
	});

	test('renders without a save button if onSave prop is missing', () => {
		expect(
			shallow(
				<LoginForm title="test" history={history}>
					hello world
				</LoginForm>
			)
		).toMatchSnapshot();
	});

	test('renders with a save button if onSave prop is provided', () => {
		expect(
			shallow(
				<LoginForm title="test" history={history} onSave={sinon.spy()}>
					hello world
				</LoginForm>
			)
		).toMatchSnapshot();
	});

	test('disables the save button if canSubmit is false', () => {
		expect(
			shallow(
				<LoginForm
					title="test"
					history={history}
					onSave={sinon.spy()}
					canSubmit={false}
				>
					hello world
				</LoginForm>
			)
		).toMatchSnapshot();
	});

	test('renders a legend if provided', () => {
		expect(
			shallow(
				<LoginForm title="test" history={history} legend="of zelda">
					hello world
				</LoginForm>
			)
		).toMatchSnapshot();
	});

	test('renders an error alert if message provided', () => {
		expect(
			shallow(
				<LoginForm title="test" history={history} error="oh noes!">
					hello world
				</LoginForm>
			)
		).toMatchSnapshot();
	});

	test('renders a success alert if message provided', () => {
		expect(
			shallow(
				<LoginForm title="test" history={history} success="oh yeah!">
					hello world
				</LoginForm>
			)
		).toMatchSnapshot();
	});

	test('does not render a cancel button if form is not cancelable', () => {
		expect(
			shallow(
				<LoginForm title="test" history={history} cancelable={false}>
					hello world
				</LoginForm>
			)
		).toMatchSnapshot();
	});

	test('renders a spinny-wheel on the save button and disables it if the form is busy', () => {
		expect(
			shallow(
				<LoginForm title="test" history={history} onSave={sinon.spy()} working>
					hello world
				</LoginForm>
			)
		).toMatchSnapshot();
	});

	test('calls the onSave prop when the form is submitted', () => {
		const onSave = sinon.spy();
		const component = shallow(
			<LoginForm title="test" history={history} onSave={onSave}>
				hello world
			</LoginForm>
		);

		component.find('form').simulate('submit');

		expect(onSave.calledOnce).toEqual(true);
	});

	test('calls the onCancel prop when the form is canceled', () => {
		const component = shallow(
			<LoginForm title="test" history={history}>
				hello world
			</LoginForm>
		);

		component
			.find('Button')
			.findWhere(b => b.prop('variation') === 'transparent')
			.simulate('click');

		expect(history.goBack.calledOnce).toEqual(true);
	});
});
