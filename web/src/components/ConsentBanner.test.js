import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

describe('Consent banner component', () => {
  let ConsentBanner;
  const onAgree = sinon.spy();

  beforeEach(() => {
    jest.resetModules();
    onAgree.resetHistory();
    ConsentBanner = require('./ConsentBanner').default; // eslint-disable-line global-require
  });

  describe('when there is no cookie', () => {
    test('renders the banner', () => {
      const component = shallow(<ConsentBanner onAgree={onAgree} />);
      expect(component).toMatchSnapshot();
    });

    test('toggles consent details on and off', () => {
      const component = shallow(<ConsentBanner onAgree={onAgree} />);
      expect(component).toMatchSnapshot();

      // toggle on the details
      component
        .find('Button')
        .find({ variation: 'transparent' })
        .simulate('click');
      expect(component).toMatchSnapshot();

      // toggle them off
      component.find('Button').simulate('click');
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
