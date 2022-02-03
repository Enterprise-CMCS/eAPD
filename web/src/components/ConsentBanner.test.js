import { shallow } from 'enzyme';
import React from 'react';
import { render, axe } from 'apd-testing-library';

import ConsentBanner from './ConsentBanner';

describe('Consent banner component', () => {
  const onAgree = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
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
      component.find('Button').find({ variation: 'primary' }).simulate('click');

      expect(onAgree).toHaveBeenCalledTimes(1);
    });
  });

  describe('accesibility', () => {
    it('should not fail any accessibility tests', async () => {
      const { container } = render(<ConsentBanner onAgree={jest.fn()} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
