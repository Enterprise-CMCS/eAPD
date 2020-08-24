import { LOCATION_CHANGE } from 'connected-react-router';
import { APD_ACTIVITIES_CHANGE } from '../actions/editApd/symbols';
import staticItems, { getItems } from './nav.items';

const flatten = (result, node) => {
  if (node === null) return result;
  if (Array.isArray(node)) return node.reduce(flatten, result);
  result.push(node);
  return flatten(result, node && node.items ? node.items : null);
};

export const getContinuePreviousLinks = (pathname, links) => {
  const flatLinks = flatten([], links);
  const pageLinks = flatLinks.filter(link => link && link.url && !link.url.includes('#'));
  const currentIndex = pageLinks.findIndex(link => link.url === pathname);
  let continueLink = currentIndex + 1 < pageLinks.length ? pageLinks[currentIndex + 1] : null;
  let previousLink = currentIndex - 1 >= 0 ? pageLinks[currentIndex - 1] : null;

  // don't navigate into individual activities
  if (pathname === '/apd/activities') {
    continueLink = pageLinks.find(link => link.url === '/apd/schedule-summary')
  }
  if (pathname === '/apd/schedule-summary') {
    previousLink = pageLinks.find(link => link.url === '/apd/activities')
  }

  return { continueLink, previousLink };
};

const initialState = {
  activities: [],
  continueLink: null,
  items: staticItems,
  previousLink: null
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case APD_ACTIVITIES_CHANGE: {
      return {
        ...state,
        activities: action.activities
      };
    }

    case LOCATION_CHANGE: {
      const { pathname, hash } = action.payload.location;
      const url = [pathname, hash].join('');

      const items = getItems({
        activities: state.activities,
        items: state.items,
        url
      });

      const { continueLink, previousLink } = getContinuePreviousLinks(
        pathname,
        items
      );

      return {
        ...state,
        continueLink,
        items,
        previousLink
      };
    }

    default:
      return state;
  }
};

export default reducer;
