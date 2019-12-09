import { shallow } from 'enzyme';
import React from 'react';

import RichText from './RichText';

describe('RichText component', () => {
  test('renders as expected', () => {
    expect(
      shallow(<RichText content="initial rich text value" />)
    ).toMatchSnapshot();
  });

  test('calls the change handler when the content changes', () => {
    const onSync = jest.fn();
    const component = shallow(<RichText onSync={onSync} />);
    component.prop('onEditorChange')('this is the new stuff');
    expect(onSync).toHaveBeenCalledWith('this is the new stuff');
  });
});
