import { mount, shallow } from 'enzyme';
import React from 'react';

import ChoiceList from './ChoiceList';

describe('ChoiceList wrapper component', () => {
  it('renders correctly without checkedChildren', () => {
    const component = shallow(
      <ChoiceList
        type="radio"
        value="radio-no-children"
        name="radio-no-children"
        size="small"
      >
        I have no checkedChildren
      </ChoiceList>
    );

    expect(component).toMatchSnapshot();
  });

  it('renders correctly with checkedChildren when unchecked', () => {
    const component = shallow(
      <ChoiceList
        type="radio"
        value="radio-with-children"
        name="radio-with-children"
        size="small"
        checkedChildren={
          <div className="ds-c-choiceList__checkedChild">
            <p>I am the child element</p>
          </div>
        }
      >
        I have checkedChildren
      </ChoiceList>
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with checkedChildren when checked', () => {
    const component = shallow(
      <ChoiceList
        type="radio"
        value="radio-with-children"
        name="radio-with-children"
        size="small"
        checked
        checkedChildren={
          <div className="ds-c-choiceList__checkedChild">
            <p>I am the child element</p>
          </div>
        }
      >
        I have checkedChildren
      </ChoiceList>
    );
    expect(component).toMatchSnapshot();
  });

  it('removes ARIA components from checkedChildren', () => {
    const component = mount(
      <ChoiceList
        type="radio"
        value="radio-with-children"
        name="radio-with-children"
        size="small"
        checked
        checkedChildren={
          <div className="ds-c-choiceList__checkedChild">
            <p>I am the child element</p>
          </div>
        }
      >
        I have checkedChildren
      </ChoiceList>
    );

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const child = component.find('.ds-c-choiceList__checkedChild').render();
    expect(child[0].attribs['aria-live']).toBeFalsy();
  });
});
