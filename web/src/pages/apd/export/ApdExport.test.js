import { shallow } from 'enzyme';
import React from 'react';
import { push } from 'connected-react-router';
import Router from 'react-router-dom';

import { plain as ExportAndSubmit, mapDispatchToProps } from './ApdExport';

import { toggleAdminCheck } from '../../../redux/actions/app/apd';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

const setup = (push = () => {}) => {
  jest
    .spyOn(Router, 'useParams')
    .mockReturnValue({ apdId: '0123456789abcdef01234567' });
  return shallow(<ExportAndSubmit push={push} years={['2021', '2022']} />);
};

describe('apd export component', () => {
  test('renders correctly', () => {
    expect(setup()).toMatchSnapshot();
  });

  test('routes to print preview', () => {
    const fakePush = jest.fn();
    const component = setup(fakePush);
    component.find('Button[children="Continue to Review"]').simulate('click');

    expect(fakePush).toHaveBeenCalledTimes(1);
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      push,
      toggleAdminCheck: toggleAdminCheck
    });
  });
});
