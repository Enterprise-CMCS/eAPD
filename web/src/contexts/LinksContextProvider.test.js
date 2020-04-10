import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import React from 'react';

import {plain as Sidebar} from '../containers/Sidebar';
import { LinksContextProvider, LinksContextConsumer } from './LinksContextProvider';

let mockPush;

jest.mock('react-router-dom', () => {
  mockPush = jest.fn();
  return {
    useHistory: jest.fn().mockReturnValue({ push: mockPush }),
    useRouteMatch: jest.fn().mockReturnValue({ path: '---path---' })
  };
});

global.scrollTo = jest.fn();

const NextPreviousButtonsTest = (props) => {
  const { activeSection, activities, context } = props;
  const { getLinks, getPreviousNextLinks } = context;
  const pageNav = jest.fn();
  const anchorNav = jest.fn();      
  const links = getLinks(pageNav, anchorNav, activeSection, activities);
  const [previousLink, hidePreviousLink, nextLink, hideNextLink] = getPreviousNextLinks(links, activeSection);

  return (
    <div>
      <div className={hidePreviousLink ? 'next-prev-button-left hidden-button' : 'next-prev-button-left'}> 
        <div className="prev-id">{previousLink.id}</div>
      </div>
      <div className={hideNextLink ? 'next-prev-button-right hidden-button' : 'next-prev-button-right'}>
        <div className="next-id">{nextLink.id}</div>
      </div>
    </div>
  );
}

NextPreviousButtonsTest.propTypes = {
  activeSection: PropTypes.string.isRequired,
  activities: PropTypes.array.isRequired,
  context: PropTypes.object.isRequired,
};

describe('LinksContextProvider', () => {
  const props = {
    activities: [
      { anchor: '#key1', key: 'key-1234' },
      { anchor: '#key2', key: 'key-5678' },
      { anchor: '#key3', key: 'key-9012' }
    ],
    activeSection: 'some section',
    jumpTo: jest.fn(),
    place: { id: 'place id', name: 'place name' }
  };

  const SecondaryNavTest = () => {
    return (
      <LinksContextConsumer>
        {context => (
          <NextPreviousButtonsTest {...props} context={context} />
        )}
      </LinksContextConsumer>
      );
    };

  beforeEach(() => {
    global.scrollTo.mockReset();
    if (mockPush) {
      mockPush.mockReset();
    }
    props.jumpTo.mockReset();
  });

  it('creates sidebar correctly', () => {
    const container = mount(
      <LinksContextProvider>
          <Sidebar {...props} />
      </LinksContextProvider>
      );

    // if we got items for the Sidebar that proves we successfully executed the getLinks() function
    const item = container
      .find('VerticalNav')
      .prop('items')[0];
    expect(item.id).toEqual('apd-state-profile');
  });

  it('creates SecondaryNav currectly', () => {

    // note: I tried doing the above with the SecondaryNav control but it complained about not having the redux store provider
    // so this barebones component uses the context with minimum setup
    
    const container = mount(
      <LinksContextProvider>
        <SecondaryNavTest {...props} />
      </LinksContextProvider>
    );

    // if we got items for the SecondaryNavTest that proves we successfully executed the getPreviousNextLinks() function
    const prevDiv = container.find('.prev-id');
    expect(prevDiv.text()).toEqual('apd-state-profile');
    const nextDiv = container.find('.next-id');
    expect(nextDiv.text()).toEqual('apd-summary');
  });

  it('creates SecondaryNav currectly when the selected link is the first activity', () => {
    props.activeSection = 'activities';
    
    const container = mount(
      <LinksContextProvider>
        <SecondaryNavTest {...props} />
      </LinksContextProvider>
    );

    // if we got items for the SecondaryNavTest that proves we successfully executed the getPreviousNextLinks() function
    const prevDiv = container.find('.prev-id');
    expect(prevDiv.text()).toEqual('previous-activities');
    const nextDiv = container.find('.next-id');
    expect(nextDiv.text()).toEqual('activity-key-1234');
  });

  it('creates SecondaryNav currectly when the selected link is a subsequent activity', () => {
    props.activeSection = 'activity-key-5678';
    
    const container = mount(
      <LinksContextProvider>
        <SecondaryNavTest {...props} />
      </LinksContextProvider>
    );

    const prevDiv = container.find('.prev-id');
    expect(prevDiv.text()).toEqual('previous-activities');
    const nextDiv = container.find('.next-id');
    expect(nextDiv.text()).toEqual('activity-key-9012');
  });

  it('creates SecondaryNav currectly when the selected link is an activity sub-section', () => {
    props.activeSection = 'activity-key-5678-okrs';
    
    const container = mount(
      <LinksContextProvider>
        <SecondaryNavTest {...props} />
      </LinksContextProvider>
    );

    const prevDiv = container.find('.prev-id');
    expect(prevDiv.text()).toEqual('activity-key-5678-overview');
    const nextDiv = container.find('.next-id');
    expect(nextDiv.text()).toEqual('activity-key-5678-state-costs');
  });

  it('creates SecondaryNav currectly when the selected link is the last sub-item', () => {
    props.activeSection = 'activity-key-5678-ffp';
    
    const container = mount(
      <LinksContextProvider>
        <SecondaryNavTest {...props} />
      </LinksContextProvider>
    );

    const prevDiv = container.find('.prev-id');
    expect(prevDiv.text()).toEqual('activity-key-5678-cost-allocation');
    const nextDiv = container.find('.next-id');
    expect(nextDiv.text()).toEqual('activity-key-9012');
  });

  it('creates SecondaryNav currectly when the selected link is the last sub-item of the last activity', () => {
    props.activeSection = 'activity-key-9012-ffp';
    
    const container = mount(
      <LinksContextProvider>
        <SecondaryNavTest {...props} />
      </LinksContextProvider>
    );

    const prevDiv = container.find('.prev-id');
    expect(prevDiv.text()).toEqual('activity-key-9012-cost-allocation');
    const nextDiv = container.find('.next-id');
    expect(nextDiv.text()).toEqual('schedule-summary');
  });
  
});
