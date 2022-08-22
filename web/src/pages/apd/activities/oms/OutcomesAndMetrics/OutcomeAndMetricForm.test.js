import { shallow, mount } from 'enzyme';
import React from 'react';

import {
  plain as OutcomeAndMetricForm,
  mapDispatchToProps
} from './OutcomeAndMetricForm';

import { saveOutcome as actualSaveOutcome } from '../../../../../redux/actions/editActivity';

describe('the OutcomeAndMetricForm component', () => {
  const saveOutcome = jest.fn();
  const setFormValid = jest.fn();

  const component = shallow(
    <OutcomeAndMetricForm
      activityIndex={93}
      index={1}
      item={{
        key: 'outcome key',
        outcome: 'outcome description',
        metrics: [
          {
            key: 'om key 1',
            metric: 'metric 1'
          },
          {
            key: 'om key 2',
            metric: 'metric 2'
          }
        ]
      }}
      saveOutcome={saveOutcome}
      setFormValid={setFormValid}
    />
  );

  beforeEach(() => {
    saveOutcome.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    test('handles saving the outcome', () => {
      mount(
        <OutcomeAndMetricForm
          activityIndex={93}
          index={1}
          item={{
            key: 'outcome key',
            outcome: 'outcome description',
            metrics: [
              {
                key: 'om key 1',
                metric: 'metric 1'
              },
              {
                key: 'om key 2',
                metric: 'metric 2'
              }
            ]
          }}
          saveOutcome={saveOutcome}
          setFormValid={setFormValid}
        />
      )
        .find('form')
        .first()
        .simulate('submit');
      expect(saveOutcome).toHaveBeenCalled();
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      saveOutcome: actualSaveOutcome
    });
  });
});
