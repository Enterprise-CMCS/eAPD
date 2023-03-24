import { mount, shallow } from 'enzyme';
import React from 'react';

import ChoiceList from './ChoiceList';

const checkedChildren = (
  <div className="ds-c-choiceList__checkedChild">
    <ChoiceList
      label="checkedChlildrenChoiceList"
      choices={[
        {
          label: 'firstChild',
          value: 'firstChild',
          checked: true
        },
        {
          label: 'secondChild',
          value: 'secondChild',
          checked: false
        }
      ]}
      type="radio"
      size="small"
    />
  </div>
);

describe('ChoiceList wrapper component', () => {
  it('renders correctly without checkedChildren', () => {
    const component = shallow(
      <ChoiceList
        label="choiceList-no-children"
        choices={[
          {
            label: 'firstChoice',
            value: 'first',
            checked: false
          },
          {
            label: 'secondChoice',
            value: 'second',
            checked: false
          },
          {
            label: 'thirdChoice',
            value: 'third',
            checked: true
          }
        ]}
        type="radio"
        size="small"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with checkedChildren when unchecked', () => {
    const component = shallow(
      <ChoiceList
        label="choiceList-with-children"
        choices={[
          {
            label: 'firstChoice',
            value: 'first',
            checked: false,
            checkedChildren
          },
          {
            label: 'secondChoice',
            value: 'second',
            checked: false,
            checkedChildren
          },
          {
            label: 'thirdChoice',
            value: 'third',
            checked: false,
            checkedChildren
          }
        ]}
        type="radio"
        name="choiceList-with-children"
        size="small"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with checkedChildren when checked', () => {
    const component = shallow(
      <ChoiceList
        label="choiceList-with-children"
        choices={[
          {
            label: 'firstChoice',
            value: 'first',
            checked: true,
            checkedChildren
          },
          {
            label: 'secondChoice',
            value: 'second',
            checked: false,
            checkedChildren
          },
          {
            label: 'thirdChoice',
            value: 'third',
            checked: false,
            checkedChildren
          }
        ]}
        type="radio"
        name="choiceList-with-children"
        size="small"
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('removes ARIA components from checkedChildren', () => {
    const component = mount(
      <div className="ds-c-choiceList">
        <ChoiceList
          label="choiceList-no-children"
          choices={[
            {
              label: 'firstChoice',
              value: 'first',
              checked: false
            },
            {
              label: 'secondChoice',
              value: 'second',
              checked: false
            },
            {
              label: 'thirdChoice',
              value: 'third',
              checked: true
            }
          ]}
          type="radio"
          size="small"
        />
      </div>
    );

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const child = component.find('.ds-c-choiceList').render();
    expect(child[0].attribs['aria-live']).toBeFalsy();
    expect(child[0].attribs['aria-relevant']).toBeFalsy();
    expect(child[0].attribs['aria-atomic']).toBeFalsy();
  });
});
