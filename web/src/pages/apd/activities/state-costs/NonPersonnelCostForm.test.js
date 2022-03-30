import { mount } from 'enzyme';
import React from 'react';

import {
  plain as NonPersonnelCostForm,
  mapDispatchToProps
} from './NonPersonnelCostForm';

import { saveNonPersonnelCost as actualSaveNonPersonnelCost } from '../../../../actions/editActivity';

describe('the NonPersonnelCostForm component', () => {
  const saveNonPersonnelCost = jest.fn();

  const component = mount(
    <NonPersonnelCostForm
      activityIndex={44}
      index={83}
      item={{
        category: 'cost category',
        description: 'cost desc',
        years: {
          7473: 2398235,
          7474: 72323
        }
      }}
      saveNonPersonnelCost={saveNonPersonnelCost}
    />
  );

  beforeEach(() => {
    saveNonPersonnelCost.mockClear();
  });

  it('matches the snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    test('handles saving the non personnel cost', () => {
      component.find('form').simulate('submit');
      expect(saveNonPersonnelCost).toHaveBeenCalled();
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      saveNonPersonnelCost: actualSaveNonPersonnelCost
    });
  });
});
