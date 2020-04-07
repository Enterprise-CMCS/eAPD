import { shallow, mount } from 'enzyme';
import React from 'react';

import {
  LinksContextProvider,
  LinksContextConsumer
} from './LinksContextProvider';

describe('LinksContextProvider', () => {
  test('the provider renders correctly', () => {
    expect(shallow(
    <LinksContextProvider>
      <div>test</div>
      </LinksContextProvider>
    )).toMatchSnapshot();
  });

  test('the consumer renders correctly', () => {
    expect(shallow(
    <LinksContextProvider>
      <div>
      <LinksContextConsumer>
      {context => (
        <div className="next-prev-buttons">
          <NextPreviousButtons context={context} />
        </div>
      )}
    </LinksContextConsumer>
      </div>
      </LinksContextProvider>
    )).toMatchSnapshot();
  });

});
