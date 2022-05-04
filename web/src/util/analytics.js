import { matchPath } from 'react-router-dom';
import mainRoutes from '../pages/routesList';
import apdRoutes from '../pages/apd/apdRoutesList';
import activityRoutesCreator from '../pages/apd/activities/activityRoutesList';
import loginRoutesCreator from '../pages/login/loginRoutesList';

export const pageView = pathname => {
  if (global.utag) {
    const activityRoutes = activityRoutesCreator(0);
    const loginRoutes = loginRoutesCreator();
    // main has to go last because we want
    // the most specific routes earlier in the list
    const routes = [
      ...activityRoutes,
      ...apdRoutes,
      ...loginRoutes,
      ...mainRoutes
    ];
    const found = routes.find(route => matchPath(pathname, route));

    if (found) {
      const { isPublic, contentType, siteSection, pageName } = found;
      global.utag.view({
        content_language: 'en',
        content_type: contentType,
        page_name: `${siteSection}: ${pageName}`,
        page_path: pathname,
        site_domain: window.location.origin,
        site_environment: process.env.ENV,
        site_section: '', // Which tool or area did this take place in? e.g. "app 3.0", "window shop", "my account"
        logged_in: !isPublic
      });
    }
  }
};
