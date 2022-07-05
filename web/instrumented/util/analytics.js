function cov_1oaivv0gsn() {
  var path = "/home/dmirano/Developer/eAPD/web/src/util/analytics.js";
  var hash = "40c102a690cb7a63687db47cd79c213e046b9e7d";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/util/analytics.js",
    statementMap: {
      "0": {
        start: {
          line: 7,
          column: 24
        },
        end: {
          line: 35,
          column: 1
        }
      },
      "1": {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 34,
          column: 3
        }
      },
      "2": {
        start: {
          line: 9,
          column: 27
        },
        end: {
          line: 9,
          column: 51
        }
      },
      "3": {
        start: {
          line: 10,
          column: 24
        },
        end: {
          line: 10,
          column: 44
        }
      },
      "4": {
        start: {
          line: 13,
          column: 19
        },
        end: {
          line: 18,
          column: 5
        }
      },
      "5": {
        start: {
          line: 19,
          column: 18
        },
        end: {
          line: 19,
          column: 66
        }
      },
      "6": {
        start: {
          line: 19,
          column: 39
        },
        end: {
          line: 19,
          column: 65
        }
      },
      "7": {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 33,
          column: 5
        }
      },
      "8": {
        start: {
          line: 22,
          column: 63
        },
        end: {
          line: 22,
          column: 68
        }
      },
      "9": {
        start: {
          line: 23,
          column: 6
        },
        end: {
          line: 32,
          column: 9
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 7,
            column: 24
          },
          end: {
            line: 7,
            column: 25
          }
        },
        loc: {
          start: {
            line: 7,
            column: 36
          },
          end: {
            line: 35,
            column: 1
          }
        },
        line: 7
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 19,
            column: 30
          },
          end: {
            line: 19,
            column: 31
          }
        },
        loc: {
          start: {
            line: 19,
            column: 39
          },
          end: {
            line: 19,
            column: 65
          }
        },
        line: 19
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 8,
            column: 2
          },
          end: {
            line: 34,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 8,
            column: 2
          },
          end: {
            line: 34,
            column: 3
          }
        }, {
          start: {
            line: 8,
            column: 2
          },
          end: {
            line: 34,
            column: 3
          }
        }],
        line: 8
      },
      "1": {
        loc: {
          start: {
            line: 21,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 21,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        }, {
          start: {
            line: 21,
            column: 4
          },
          end: {
            line: 33,
            column: 5
          }
        }],
        line: 21
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "40c102a690cb7a63687db47cd79c213e046b9e7d"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1oaivv0gsn = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1oaivv0gsn();
import { matchPath } from 'react-router-dom';
import mainRoutes from '../pages/mainRoutesList';
import apdRoutes from '../pages/apd/apdRoutesList';
import activityRoutesCreator from '../pages/apd/activities/activityRoutesList';
import loginRoutesCreator from '../pages/login/loginRoutesList';
cov_1oaivv0gsn().s[0]++;
export const pageView = pathname => {
  cov_1oaivv0gsn().f[0]++;
  cov_1oaivv0gsn().s[1]++;

  if (global.utag) {
    cov_1oaivv0gsn().b[0][0]++;
    const activityRoutes = (cov_1oaivv0gsn().s[2]++, activityRoutesCreator(0));
    const loginRoutes = (cov_1oaivv0gsn().s[3]++, loginRoutesCreator()); // main has to go last because we want
    // the most specific routes earlier in the list

    const routes = (cov_1oaivv0gsn().s[4]++, [...activityRoutes, ...apdRoutes, ...loginRoutes, ...mainRoutes]);
    const found = (cov_1oaivv0gsn().s[5]++, routes.find(route => {
      cov_1oaivv0gsn().f[1]++;
      cov_1oaivv0gsn().s[6]++;
      return matchPath(pathname, route);
    }));
    cov_1oaivv0gsn().s[7]++;

    if (found) {
      cov_1oaivv0gsn().b[1][0]++;
      const {
        isPublic,
        contentType,
        siteSection,
        pageName
      } = (cov_1oaivv0gsn().s[8]++, found);
      cov_1oaivv0gsn().s[9]++;
      global.utag.view({
        content_language: 'en',
        content_type: contentType,
        page_name: `${siteSection}: ${pageName}`,
        page_path: pathname,
        site_domain: window.location.origin,
        site_environment: process.env.WEB_ENV,
        site_section: '',
        // Which tool or area did this take place in? e.g. "app 3.0", "window shop", "my account"
        logged_in: !isPublic
      });
    } else {
      cov_1oaivv0gsn().b[1][1]++;
    }
  } else {
    cov_1oaivv0gsn().b[0][1]++;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYXRjaFBhdGgiLCJtYWluUm91dGVzIiwiYXBkUm91dGVzIiwiYWN0aXZpdHlSb3V0ZXNDcmVhdG9yIiwibG9naW5Sb3V0ZXNDcmVhdG9yIiwicGFnZVZpZXciLCJwYXRobmFtZSIsImdsb2JhbCIsInV0YWciLCJhY3Rpdml0eVJvdXRlcyIsImxvZ2luUm91dGVzIiwicm91dGVzIiwiZm91bmQiLCJmaW5kIiwicm91dGUiLCJpc1B1YmxpYyIsImNvbnRlbnRUeXBlIiwic2l0ZVNlY3Rpb24iLCJwYWdlTmFtZSIsInZpZXciLCJjb250ZW50X2xhbmd1YWdlIiwiY29udGVudF90eXBlIiwicGFnZV9uYW1lIiwicGFnZV9wYXRoIiwic2l0ZV9kb21haW4iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9yaWdpbiIsInNpdGVfZW52aXJvbm1lbnQiLCJwcm9jZXNzIiwiZW52IiwiV0VCX0VOViIsInNpdGVfc2VjdGlvbiIsImxvZ2dlZF9pbiJdLCJzb3VyY2VzIjpbImFuYWx5dGljcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYXRjaFBhdGggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBtYWluUm91dGVzIGZyb20gJy4uL3BhZ2VzL21haW5Sb3V0ZXNMaXN0JztcbmltcG9ydCBhcGRSb3V0ZXMgZnJvbSAnLi4vcGFnZXMvYXBkL2FwZFJvdXRlc0xpc3QnO1xuaW1wb3J0IGFjdGl2aXR5Um91dGVzQ3JlYXRvciBmcm9tICcuLi9wYWdlcy9hcGQvYWN0aXZpdGllcy9hY3Rpdml0eVJvdXRlc0xpc3QnO1xuaW1wb3J0IGxvZ2luUm91dGVzQ3JlYXRvciBmcm9tICcuLi9wYWdlcy9sb2dpbi9sb2dpblJvdXRlc0xpc3QnO1xuXG5leHBvcnQgY29uc3QgcGFnZVZpZXcgPSBwYXRobmFtZSA9PiB7XG4gIGlmIChnbG9iYWwudXRhZykge1xuICAgIGNvbnN0IGFjdGl2aXR5Um91dGVzID0gYWN0aXZpdHlSb3V0ZXNDcmVhdG9yKDApO1xuICAgIGNvbnN0IGxvZ2luUm91dGVzID0gbG9naW5Sb3V0ZXNDcmVhdG9yKCk7XG4gICAgLy8gbWFpbiBoYXMgdG8gZ28gbGFzdCBiZWNhdXNlIHdlIHdhbnRcbiAgICAvLyB0aGUgbW9zdCBzcGVjaWZpYyByb3V0ZXMgZWFybGllciBpbiB0aGUgbGlzdFxuICAgIGNvbnN0IHJvdXRlcyA9IFtcbiAgICAgIC4uLmFjdGl2aXR5Um91dGVzLFxuICAgICAgLi4uYXBkUm91dGVzLFxuICAgICAgLi4ubG9naW5Sb3V0ZXMsXG4gICAgICAuLi5tYWluUm91dGVzXG4gICAgXTtcbiAgICBjb25zdCBmb3VuZCA9IHJvdXRlcy5maW5kKHJvdXRlID0+IG1hdGNoUGF0aChwYXRobmFtZSwgcm91dGUpKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgY29uc3QgeyBpc1B1YmxpYywgY29udGVudFR5cGUsIHNpdGVTZWN0aW9uLCBwYWdlTmFtZSB9ID0gZm91bmQ7XG4gICAgICBnbG9iYWwudXRhZy52aWV3KHtcbiAgICAgICAgY29udGVudF9sYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgY29udGVudF90eXBlOiBjb250ZW50VHlwZSxcbiAgICAgICAgcGFnZV9uYW1lOiBgJHtzaXRlU2VjdGlvbn06ICR7cGFnZU5hbWV9YCxcbiAgICAgICAgcGFnZV9wYXRoOiBwYXRobmFtZSxcbiAgICAgICAgc2l0ZV9kb21haW46IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4sXG4gICAgICAgIHNpdGVfZW52aXJvbm1lbnQ6IHByb2Nlc3MuZW52LldFQl9FTlYsXG4gICAgICAgIHNpdGVfc2VjdGlvbjogJycsIC8vIFdoaWNoIHRvb2wgb3IgYXJlYSBkaWQgdGhpcyB0YWtlIHBsYWNlIGluPyBlLmcuIFwiYXBwIDMuMFwiLCBcIndpbmRvdyBzaG9wXCIsIFwibXkgYWNjb3VudFwiXG4gICAgICAgIGxvZ2dlZF9pbjogIWlzUHVibGljXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZOzs7Ozs7Ozs7QUFmWixTQUFTQSxTQUFULFFBQTBCLGtCQUExQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIseUJBQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQiw0QkFBdEI7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQyw0Q0FBbEM7QUFDQSxPQUFPQyxrQkFBUCxNQUErQixnQ0FBL0I7O0FBRUEsT0FBTyxNQUFNQyxRQUFRLEdBQUdDLFFBQVEsSUFBSTtFQUFBO0VBQUE7O0VBQ2xDLElBQUlDLE1BQU0sQ0FBQ0MsSUFBWCxFQUFpQjtJQUFBO0lBQ2YsTUFBTUMsY0FBYyw2QkFBR04scUJBQXFCLENBQUMsQ0FBRCxDQUF4QixDQUFwQjtJQUNBLE1BQU1PLFdBQVcsNkJBQUdOLGtCQUFrQixFQUFyQixDQUFqQixDQUZlLENBR2Y7SUFDQTs7SUFDQSxNQUFNTyxNQUFNLDZCQUFHLENBQ2IsR0FBR0YsY0FEVSxFQUViLEdBQUdQLFNBRlUsRUFHYixHQUFHUSxXQUhVLEVBSWIsR0FBR1QsVUFKVSxDQUFILENBQVo7SUFNQSxNQUFNVyxLQUFLLDZCQUFHRCxNQUFNLENBQUNFLElBQVAsQ0FBWUMsS0FBSyxJQUFJO01BQUE7TUFBQTtNQUFBLE9BQUFkLFNBQVMsQ0FBQ00sUUFBRCxFQUFXUSxLQUFYLENBQVQ7SUFBMEIsQ0FBL0MsQ0FBSCxDQUFYO0lBWGU7O0lBYWYsSUFBSUYsS0FBSixFQUFXO01BQUE7TUFDVCxNQUFNO1FBQUVHLFFBQUY7UUFBWUMsV0FBWjtRQUF5QkMsV0FBekI7UUFBc0NDO01BQXRDLDhCQUFtRE4sS0FBbkQsQ0FBTjtNQURTO01BRVRMLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZVyxJQUFaLENBQWlCO1FBQ2ZDLGdCQUFnQixFQUFFLElBREg7UUFFZkMsWUFBWSxFQUFFTCxXQUZDO1FBR2ZNLFNBQVMsRUFBRyxHQUFFTCxXQUFZLEtBQUlDLFFBQVMsRUFIeEI7UUFJZkssU0FBUyxFQUFFakIsUUFKSTtRQUtma0IsV0FBVyxFQUFFQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLE1BTGQ7UUFNZkMsZ0JBQWdCLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxPQU5mO1FBT2ZDLFlBQVksRUFBRSxFQVBDO1FBT0c7UUFDbEJDLFNBQVMsRUFBRSxDQUFDbEI7TUFSRyxDQUFqQjtJQVVELENBWkQ7TUFBQTtJQUFBO0VBYUQsQ0ExQkQ7SUFBQTtFQUFBO0FBMkJELENBNUJNIn0=