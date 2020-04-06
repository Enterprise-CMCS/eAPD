import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as UnexpectedError,
  mapStateToProps,
  mapDispatchToProps
} from './UnexpectedError';
import { saveApd } from '../actions/app';

describe('the unexpected error alert component', () => {
  it('renders as expected if there is no error and not saving', () => {
    expect(
      shallow(
        <UnexpectedError hasError={false} isSaving={false} save={jest.fn()} />
      )
    ).toMatchSnapshot();
  });

  it('renders as expected if there is an error and not saving', () => {
    expect(
      shallow(<UnexpectedError hasError isSaving={false} save={jest.fn()} />)
    ).toMatchSnapshot();
  });

  it('renders as expected if there is and error and is saving', () => {
    expect(
      shallow(<UnexpectedError hasError isSaving save={jest.fn()} />)
    ).toMatchSnapshot();
  });

  it('maps redux state to component props', () => {
    expect(
      mapStateToProps({
        saving: {
          error: 'this is the error',
          saving: 'this is whether we are saving'
        }
      })
    ).toEqual({
      hasError: true,
      isSaving: 'this is whether we are saving'
    });
  });

  it('maps redux actions to component props', () => {
    expect(mapDispatchToProps).toEqual({ save: saveApd });
  });
});
