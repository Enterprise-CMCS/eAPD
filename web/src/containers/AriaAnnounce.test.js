import { shallow } from 'enzyme';
import React from 'react';
import { plain as AriaAnnounce } from './AriaAnnounce';

describe('aria announce component', () => {
    const props = {
        ariaMessage: 'No. No. No. No.'
    };

    it('renders correctly', () => {
        const component = shallow(<AriaAnnounce />);
        expect(component).toMatchSnapshot();
    });
});