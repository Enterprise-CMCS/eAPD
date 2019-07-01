import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import RichText from './RichText';

describe('RichText component', () => {
  // Can't test rendering against a snapshot because the react-draft-wysiwyg
  // component internally creates random IDs/keys, so it's nondeterministic.
  test('survives blurring if no onSync method is provided', () => {
    const component = shallow(<RichText />);
    component.simulate('blur');
  });

  test('synchronizes on blur', () => {
    const onSync = sinon.spy();
    const component = shallow(<RichText onSync={onSync} />);
    component.simulate('blur');
    expect(onSync.calledOnce).toBeTruthy();
  });

  // All the other tests are pretty tough because they rely on knowing
  // something about the internal behavior of react-draft-wysiwyg
});
