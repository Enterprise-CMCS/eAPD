import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as HeaderSaveMessage,
  mapStateToProps
} from './HeaderSaveMessage';

describe('Header save message component', () => {
  it('renders when actively saving', () => {
    expect(
      shallow(
        <HeaderSaveMessage
          isSaving
          error={false}
          lastSaved="2020-01-01T17:00:00.000Z"
        />
      )
    ).toMatchSnapshot();
  });

  it('renders correctly when an error saving occurs', () => {
    expect(
      shallow(
        <HeaderSaveMessage
          isSaving={false}
          error
          lastSaved="2020-01-01T17:00:00.000Z"
        />
      )
    ).toMatchSnapshot();
  });

  it('renders when not currently saving', () => {
    expect(
      shallow(
        <HeaderSaveMessage
          isSaving={false}
          error={false}
          lastSaved="2020-01-01T17:00:00.000Z"
        />
      )
    ).toMatchSnapshot();
  });

  it('waits a minimum time to visually switch from saving to not saving', () => {
    jest.useFakeTimers();

    const component = shallow(
      <HeaderSaveMessage
        isSaving={false}
        error={false}
        lastSaved="2020-01-01T17:00:00.000Z"
      />
    );

    // Expect to begin in a "not saving" state
    expect(component).toMatchSnapshot();

    component.setProps({ isSaving: true });
    component.update();

    // Should immediately switch to the "saving" state
    expect(component).toMatchSnapshot();

    component.setProps({
      isSaving: false,
      lastSaved: '2020-02-02T14:00:00.000Z'
    });
    component.update();

    // Should still be in the "saving" state. It should remain in this state
    // until the  750ms delay has passed.
    expect(component).toMatchSnapshot();

    jest.advanceTimersByTime(700);
    // Should still be in the "saving" state.
    expect(component).toMatchSnapshot();

    jest.advanceTimersByTime(50);
    // Should now have switched back to the "saved" state.
    expect(component).toMatchSnapshot();

    jest.useRealTimers()
  });

  it('maps redux state to component props', () => {
    const state = {
      saving: {
        lastSaved: 'blorp',
        saving: 'bloop',
        error: false
      }
    };

    expect(mapStateToProps(state)).toEqual({
      isSaving: 'bloop',
      lastSaved: 'blorp',
      error: false
    });
  });
});
