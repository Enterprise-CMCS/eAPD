import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as HeaderSaveMessage,
  mapStateToProps
} from './HeaderSaveMessage';
import Header from './Header';

describe('Header save message component', () => {
  it('renders when actively saving', () => {
    expect(
      shallow(
        <HeaderSaveMessage isSaving lastSaved="2020-01-01T17:00:00.000Z" />
      )
    ).toMatchSnapshot();
  });

  it('renders when not currently saving', () => {
    expect(
      shallow(
        <HeaderSaveMessage
          isSaving={false}
          lastSaved="2020-01-01T17:00:00.000Z"
        />
      )
    ).toMatchSnapshot();
  });

  it('maps redux state to component props', () => {
    const state = {
      saving: {
        lastSaved: 'blorp',
        saving: 'bloop'
      }
    };

    expect(mapStateToProps(state)).toEqual({
      isSaving: 'bloop',
      lastSaved: 'blorp'
    });
  });
});
