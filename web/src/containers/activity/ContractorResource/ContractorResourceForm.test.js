import { shallow } from 'enzyme';
import React from 'react';

import { plain as ContractorForm } from './ContractorResourceForm';

import {
  saveContractor as actualSaveContractor
} from '../../../actions/editActivity';

describe('the ContractorResourceForm component', () => {
  const props = {
    activityIndex: 43,
    index: 1,
    item: {
      description: 'They cleaned up the latrines after the Battle of Hastings',
      end: '1066-10-15',
      hourly: {
        useHourly: false,
        data: {
          1066: {
            hours: 10,
            rate: 100
          },
          1067: {
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
        1066: 300,
        1067: 400
      }
    },
    saveContractor: jest.fn(),
  };

  beforeEach(() => {
    props.saveContractor.mockClear();
  });

  test('renders correctly', () => {
    const component = shallow(<ContractorForm {...props} />);
    expect(component).toMatchSnapshot();
  });

//   test('renders if use hourly data is selected', () => {
//     props.item.hourly.useHourly = true;
//     const component = shallow(<ContractorForm {...props} />);
//     expect(component).toMatchSnapshot();
//   });
// 
//   test('handles changing the contractor name', () => {
//     const component = shallow(<ContractorForm {...props} />);
//     component
//       .findWhere(c => c.prop('name') === 'contractor-name')
//       .simulate('change', { target: { value: 'new value' } });
// 
//     expect(props.setName).toHaveBeenCalledWith(43, 1, 'new value');
//   });
// 
//   test('handles changing the contractor description', () => {
//     const component = shallow(<ContractorForm {...props} />);
//     component
//       .findWhere(c => c.prop('name') === 'contractor-description')
//       .simulate('sync', 'new value');
// 
//     expect(props.setDescription).toHaveBeenCalledWith(43, 1, 'new value');
//   });
// 
//   test('handles changing the contractor total cost', () => {
//     const component = shallow(<ContractorForm {...props} />);
//     component
//       .findWhere(c => c.prop('name') === 'contractor-total-cost')
//       .simulate('change', { target: { value: 'new value' } });
// 
//     expect(props.setTotalCost).toHaveBeenCalledWith(43, 1, 'new value');
//   });
// 
//   test('handles changing the contractor start date', () => {
//     const component = shallow(<ContractorForm {...props} />);
//     component
//       .findWhere(c => c.prop('label') === 'Contract start date')
//       .simulate('change', 'ignored stuff', 'new start date');
// 
//     expect(props.setStartDate).toHaveBeenCalledWith(43, 1, 'new start date');
//   });
// 
//   test('handles changing the contractor end date', () => {
//     const component = shallow(<ContractorForm {...props} />);
//     component
//       .findWhere(c => c.prop('label') === 'Contract end date')
//       .simulate('change', 'ignored stuff', 'new end date');
// 
//     expect(props.setEndDate).toHaveBeenCalledWith(43, 1, 'new end date');
//   });
// 
//   test('handles toggling hourly resource off', () => {
//     const component = shallow(<ContractorForm {...props} />);
//     component
//       .findWhere(
//         c => c.name() === 'ChoiceComponent' && c.prop('value') === 'no'
//       )
//       .simulate('change');
// 
//     expect(props.setIsHourly).toHaveBeenCalledWith(43, 1, false);
//   });
// 
//   test('handles toggling hourly resource on', () => {
//     const component = shallow(<ContractorForm {...props} />);
//     component
//       .findWhere(
//         c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes'
//       )
//       .simulate('change');
// 
//     expect(props.setIsHourly).toHaveBeenCalledWith(43, 1, true);
//   });
// 
//   test('handles changing the contractor yearly cost', () => {
//     props.item.hourly.useHourly = false;
//     const component = shallow(<ContractorForm {...props} />);
// 
//     component
//       .findWhere(c => c.prop('name') === 'contractor-cost-ffy-1066')
//       .simulate('change', { target: { value: 773 } });
// 
//     expect(props.setCostForYear).toHaveBeenCalledWith(43, 1, '1066', 773);
//   });
// 
//   test('handles changing the contractor yearly cost', () => {
//     props.item.hourly.useHourly = true;
//     const parentComponent = shallow(<ContractorForm {...props} />);
//     const component = shallow(
//       parentComponent
//         .findWhere(
//           c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes'
//         )
//         .prop('checkedChildren')
//     );
// 
//     component
//       .findWhere(c => c.prop('name') === 'contractor-num-hours-ffy-1066')
//       .simulate('change', { target: { value: 3752 } });
// 
//     expect(props.setNumberOfHoursForYear).toHaveBeenCalledWith(
//       43,
//       1,
//       '1066',
//       3752
//     );
//   });
// 
//   test('handles changing the contractor yearly cost', () => {
//     props.item.hourly.useHourly = true;
//     const parentComponent = shallow(<ContractorForm {...props} />);
//     const component = shallow(
//       parentComponent
//         .findWhere(
//           c => c.name() === 'ChoiceComponent' && c.prop('value') === 'yes'
//         )
//         .prop('checkedChildren')
//     );
// 
//     component
//       .findWhere(c => c.prop('name') === 'contractor-hourly-rate-ffy-1067')
//       .simulate('change', { target: { value: 9364 } });
// 
//     expect(props.setHourlyRateForYear).toHaveBeenCalledWith(
//       43,
//       1,
//       '1067',
//       9364
//     );
//   });
// 
//   test('handles changing from non-hourly to hourly and back, replacing cost totals', () => {
//     // start with non-hourly and fill in the total cost
//     props.item.hourly.useHourly = false;
//     const component = shallow(<ContractorForm {...props} />);
// 
//     component
//       .findWhere(
//         c =>
//           c.name() === 'DollarField' &&
//           c.prop('name') === 'contractor-cost-ffy-1066'
//       )
//       .simulate('change', { target: { value: '53792' } });
// 
//     // now we have the non-hourly cost
//     expect(props.setCostForYear).toHaveBeenCalledWith(43, 1, '1066', '53792');
// 
//     // switch to hourly and we have the hourly cost
//     component
//       .findWhere(
//         c =>
//           c.name() === 'ChoiceComponent' &&
//           c.prop('name') === 'apd-activity-contractor-hourly-key 1-yes'
//       )
//       .simulate('change');
//     expect(props.setIsHourly).toHaveBeenCalledWith(43, 1, true);
//     expect(props.setCostForYear).toHaveBeenCalledWith(43, 1, '1066', 1000);
// 
//     // switch back to non-hourly and we should have the original cost total
//     component
//       .findWhere(
//         c =>
//           c.name() === 'ChoiceComponent' &&
//           c.prop('name') === 'apd-activity-contractor-hourly-key 1-no'
//       )
//       .simulate('change');
//     expect(props.setIsHourly).toHaveBeenCalledWith(43, 1, false);
//     expect(props.setCostForYear).toHaveBeenCalledWith(43, 1, '1066', '53792');
//   });
});
