import { shallow } from 'enzyme';
import React from 'react';
import {
  plain as SecondaryNav,
  mapStateToProps,
  mapDispatchToProps
} from './SecondaryNav';
import { addActivity } from '../../actions/editActivity';

const defaultProps = {
  activityCount: 2,
  addActivity: jest.fn(),
  location: { pathname: '/apd/0123456789abcdef01234567/activity/1/ffp' },
  useParams: () => ({ apdId: '0123456789abcdef01234567', activityIndex: '1' })
};

const setup = (props = {}) => {
  return shallow(<SecondaryNav {...defaultProps} {...props} />);
};

describe('Secondary Nav component', () => {
  it('renders with add activity button when on the last activity on the FFP section', () => {
    const component = setup();
    expect(component.find('Link').exists()).toBe(true);
  });

  it('renders without add activity button when not on the last activity', () => {
    const component = setup({
      useParams: () => ({ activityIndex: '0' })
    });
    expect(component.find('Link').exists()).toBe(false);
  });

  it('renders without add activity button when on the last activity but not on the FFP section', () => {
    const component = setup({
      location: {
        pathname: '/apd/0123456789abcdef01234567/activity/1/overview'
      }
    });
    expect(component.find('Link').exists()).toBe(false);
  });

  it('handles add activity button click', () => {
    const component = setup();
    const link = component.find('.ds-c-button');
    expect(link.props().to).toBe(
      `/apd/${defaultProps.useParams().apdId}/activities`
    );

    link.simulate('click');

    expect(defaultProps.addActivity).toHaveBeenCalled();
  });

  it('renders <ContinuePreviousButtons />', () => {
    const component = setup();
    const result = component.find('Connect(ContinuePreviousButtons)').exists();
    expect(result).toBe(true);
  });

  it('maps state to props', () => {
    const state = {
      apd: {
        data: {
          activities: [
            { name: 'activity', key: '1' },
            { name: 'activity', key: '2' }
          ]
        }
      },
      router: {
        location: { pathname: '/apd/0123456789abcdef01234567/activity/1/ffp' }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      activities: [
        { anchor: 'activity-1', name: 'activity', key: '1' },
        { anchor: 'activity-2', name: 'activity', key: '2' }
      ],
      activityCount: 2,
      location: { pathname: '/apd/0123456789abcdef01234567/activity/1/ffp' }
    });
  });

  it('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      addActivity
    });
  });
});
