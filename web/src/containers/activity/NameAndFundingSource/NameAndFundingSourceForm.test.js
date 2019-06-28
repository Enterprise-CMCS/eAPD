import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import NameAndFundingSource from './NameAndFundingSourceForm';

describe('the ContractorResourceForm component', () => {
  const sandbox = sinon.createSandbox();

  const props = {
    handleChange: sandbox.spy(),
    index: 1,
    item: {
      fundingSource: 'Uncle Scrooge',
      key: 'key 1',
      name: 'Buying bikes for Huey, Dewey, and Louie'
    }
  };

  beforeEach(() => {
    sandbox.resetHistory();
  });

  it('renders correctly', () => {
    const component = shallow(<NameAndFundingSource {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('handles changing the activity name', () => {
    const component = shallow(<NameAndFundingSource {...props} />);

    component
      .find('TextField')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.handleChange.calledWith(1, { name: 'new value ' }));
  });

  it('handles changing the funding source/program type', () => {
    const component = shallow(<NameAndFundingSource {...props} />);

    component
      .find('ChoiceList')
      .simulate('change', { target: { value: 'new value' } });

    expect(props.handleChange.calledWith(1, { fundingSource: 'new value ' }));
  });
});
