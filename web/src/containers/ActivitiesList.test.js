import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';

import {
  RawActivitiesList as ActivitiesList,
  mapStateToProps,
  mapDispatchToProps
} from './ActivitiesList';

describe('APD activities list container', () => {
  const sandbox = sinon.createSandbox();

  const goTo = sandbox.spy();
  const fetchApdDataIfNeeded = sandbox.spy();
  const apd = { loaded: true };
  const activities = [
    {
      name: 'activity 1'
    },
    {
      name: 'activity 2'
    }
  ];

  beforeEach(() => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    apd.loaded = true;
  });

  const getComponent = () =>
    shallow(
      <ActivitiesList
        activities={activities}
        apd={apd}
        fetchApdDataIfNeeded={fetchApdDataIfNeeded}
        goTo={goTo}
      />
    );

  describe('mapping state and actions to props', () => {
    it('maps app APD state to component props', () => {
      const state = {
        goop: 'junk that should not pass through',
        apd: {
          this: 'is real',
          data: {
            activities: [
              {
                id: 1,
                name: 'one',
                goals: ['hello']
              },
              {
                id: 2,
                name: 'two'
              }
            ]
          }
        }
      };

      const props = mapStateToProps(state);

      expect(props).toMatchObject({
        apd: { this: 'is real' },
        activities: [
          {
            id: 1,
            name: 'one',
            started: true
          },
          {
            id: 2,
            name: 'two',
            started: false
          }
        ]
      });
    });

    it('maps actions to component props', () => {
      expect(typeof mapDispatchToProps.goTo).toEqual('function');
      expect(typeof mapDispatchToProps.fetchApdDataIfNeeded).toEqual(
        'function'
      );
    });
  });

  it('renders correctly when data is not loaded', () => {
    apd.loaded = false;
    const component = getComponent();
    expect(component).toMatchSnapshot();
    expect(fetchApdDataIfNeeded.calledOnce).toBe(true);
  });

  it('renders correctly when data is loaded', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
    expect(fetchApdDataIfNeeded.calledOnce).toBe(true);
  });

  it('navigates back when the back button is clicked', () => {
    const component = getComponent();
    const backButton = component.find('button.blue.mr1');
    backButton.simulate('click');

    expect(goTo.calledWith('/activities-start')).toBe(true);
  });
});
