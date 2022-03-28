import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ExportInstructions,
  mapDispatchToProps
} from './ExportReadOnly';
import { printApd, saveApdEvent } from '../../../actions/app';

describe('apd export component', () => {
  test('renders correctly', () => {
    expect(
      shallow(
        <ExportInstructions printApd={() => {}} saveApdEvent={() => {}} />
      )
    ).toMatchSnapshot();
  });

  test('triggers a print action', () => {
    const print = jest.fn();
    const log = jest.fn();
    const component = shallow(
      <ExportInstructions printApd={print} saveApdEvent={log} />
    );
    component.find('Button').first().simulate('click');

    expect(print).toHaveBeenCalledTimes(1);
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ printApd, saveApdEvent });
  });
});
