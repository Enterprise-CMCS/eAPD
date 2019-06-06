import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import ContractorReview from './ContractorResourcesReview';

describe('the ContractorResourcesReview component', () => {
  const sandbox = sinon.createSandbox();

  const props = {
    contractor: {
      desc: 'They cleaned up the latrines after the Battle of Hastings',
      end: '1066-10-15',
      hourly: {
        useHourly: false,
        data: {
          '1066': {
            hours: 10,
            rate: 100
          },
          '1067': {
            hours: 20,
            rate: 200
          }
        }
      },
      id: 'contractor 1',
      key: 'key 1',
      name: 'Honey Dipper Dan',
      start: '1066-10-14',
      totalCost: 12345,
      years: {
        '1066': 300,
        '1067': 400
      }
    },
    handleDelete: sandbox.spy(),
    handleEdit: sandbox.spy(),
    idx: 1,
    years: ['1066', '1067']
  };

  beforeEach(() => {
    sandbox.resetHistory();
  });

  test('renders correctly', () => {
    const component = shallow(<ContractorReview {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('edits a contractor', () => {
    const component = shallow(<ContractorReview {...props} />);
    component
      .find('Review')
      .dive()
      .find('Button[children="Edit"]')
      .simulate('click');
    expect(props.handleEdit.calledOnce).toEqual(true);
  });

  test('deletes a contractor', () => {
    const component = shallow(<ContractorReview {...props} />);
    component
      .find('Review')
      .dive()
      .find('Button[children="Remove"]')
      .simulate('click');
    expect(props.handleDelete.calledOnce).toEqual(true);
  });
});
