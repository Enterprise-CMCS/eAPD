import { shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import ContractorForm from './ContractorResourcesForm';

describe('the ContractorResourcesForm component', () => {
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
    handleChange: sandbox.spy(),
    handleDelete: sandbox.spy(),
    handleHourlyChange: sandbox.spy(),
    handleTermChange: sandbox.spy(),
    handleUseHourly: sandbox.spy(),
    handleYearChange: sandbox.spy(),
    idx: 1,
    initialCollapsed: false,
    years: ['1066', '1067']
  };

  beforeEach(() => {
    sandbox.resetHistory();
  });

  test('renders correctly when initially collapsed', () => {
    const component = shallow(<ContractorForm {...props} initialCollapsed />);
    expect(component).toMatchSnapshot();
  });

  test('renders correctly when not collapsed', () => {
    const component = shallow(<ContractorForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('renders if use hourly data is selected', () => {
    props.contractor.hourly.useHourly = true;
    const component = shallow(<ContractorForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
