import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import ConsentBanner from './ConsentBanner';

describe('Consent banner component', () => {
  const onAgree = sinon.spy();

  beforeEach(() => {
    onAgree.resetHistory();
  });

  describe('when there is no cookie', () => {
    test('renders the banner', () => {
      const component = shallow(<ConsentBanner onAgree={onAgree} />);
      expect(component).toMatchSnapshot();
    });

    test('toggles consent details on', () => {
      const component = shallow(<ConsentBanner onAgree={onAgree} />);
      expect(component).toMatchSnapshot();

      // toggle on the details
      component
        .find('Button')
        .find({ variation: 'transparent' })
        .simulate('click');
      expect(component).toMatchSnapshot();
    });

    test('dismisses on agreement', () => {
      const component = shallow(<ConsentBanner onAgree={onAgree} />);
      component
        .find('Button')
        .find({ variation: 'primary' })
        .simulate('click');

      expect(onAgree.calledOnce).toEqual(true);
    });
  });

  describe('when there is a consent cookie', () => {
    beforeEach(() => {
      document.cookie = 'gov.cms.eapd.hasConsented=true';
    });

    test('calls onAgree prop and does not render anything', () => {
      const component = shallow(<ConsentBanner onAgree={onAgree} />);

      expect(component).toMatchSnapshot();
      expect(onAgree.calledOnce).toEqual(true);
    });
  });
});
