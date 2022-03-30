import { shallow, mount } from 'enzyme';
import React from 'react';

import {
  plain as StatePersonForm,
  mapDispatchToProps
} from './StatePersonForm';

import { savePersonnel as actualSavePersonnel } from '../../../../actions/editActivity';

describe('the StatePersonForm component', () => {
  const savePersonnel = jest.fn();

  const component = shallow(
    <StatePersonForm
      activityIndex={6}
      index={83}
      item={{
        description: 'personnel desc',
        title: 'personnel title',
        years: {
          7473: { amt: 2398235, perc: 3 },
          7474: { amt: 72323, perc: 1 }
        }
      }}
      savePersonnel={savePersonnel}
    />
  );

  beforeEach(() => {
    savePersonnel.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    test('handles saving the state personnel', () => {
      mount(
        <StatePersonForm
          activityIndex={6}
          index={83}
          item={{
            description: 'personnel desc',
            title: 'personnel title',
            years: {
              7473: { amt: 2398235, perc: 3 },
              7474: { amt: 72323, perc: 1 }
            }
          }}
          savePersonnel={savePersonnel}
        />
      )
        .find('form')
        .first()
        .simulate('submit');
      expect(savePersonnel).toHaveBeenCalled();
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      savePersonnel: actualSavePersonnel
    });
  });
});
