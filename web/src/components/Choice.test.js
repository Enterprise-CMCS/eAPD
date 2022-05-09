import { mount, shallow } from 'enzyme';
import React from 'react';

import Choice from './Choice';

describe('Choice wrapper component', () => {
  it('renders correctly without checkedChildren', () => {
    const component = shallow(
      <Choice
        type="radio"
        value="radio-no-children"
        name="radio-no-children"
        size="small"
      >
        I have no checkedChildren
      </Choice>
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with checkedChildren when unchecked', () => {
    const component = shallow(
      <Choice
        type="radio"
        value="radio-with-children"
        name="radio-with-children"
        size="small"
        checkedChildren={
          <div className="ds-c-choice__checkedChild">
            <p>I am the child element</p>
          </div>
        }
      >
        I have checkedChildren
      </Choice>
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with checkedChildren when checked', () => {
    const component = shallow(
      <Choice
        type="radio"
        value="radio-with-children"
        name="radio-with-children"
        size="small"
        checked
        checkedChildren={
          <div className="ds-c-choice__checkedChild">
            <p>I am the child element</p>
          </div>
        }
      >
        I have checkedChildren
      </Choice>
    );
    expect(component).toMatchSnapshot();
  });

  it('removes ARIA components from checkedChildren', () => {
    const component = mount(
      <Choice
        type="radio"
        value="radio-with-children"
        name="radio-with-children"
        size="small"
        checked
        checkedChildren={
          <div className="ds-c-choice__checkedChild">
            <p>I am the child element</p>
          </div>
        }
      >
        I have checkedChildren
      </Choice>
    );

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const child = component.find('.ds-c-choice__checkedChild').render();
    expect(child[0].attribs['aria-live']).toBeFalsy();
  });
});
