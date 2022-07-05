function cov_1oghg1h74c() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/reducers/index.js";
  var hash = "06c954f17a782d260ec231fe120be3ce7d3efac3";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/reducers/index.js",
    statementMap: {
      "0": {
        start: {
          line: 16,
          column: 20
        },
        end: {
          line: 30,
          column: 4
        }
      },
      "1": {
        start: {
          line: 17,
          column: 2
        },
        end: {
          line: 30,
          column: 4
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 16,
            column: 20
          },
          end: {
            line: 16,
            column: 21
          }
        },
        loc: {
          start: {
            line: 17,
            column: 2
          },
          end: {
            line: 30,
            column: 4
          }
        },
        line: 17
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {
      "0": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "06c954f17a782d260ec231fe120be3ce7d3efac3"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1oghg1h74c = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1oghg1h74c();
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import admin from './admin';
import aria from './aria';
import apd from './apd';
import auth from './auth';
import budget from './budget';
import errors from './errors';
import nav from './nav';
import patch from './patch';
import saving from './saving';
import user from './user';
import working from './working';
cov_1oghg1h74c().s[0]++;

const rootReducer = history => {
  cov_1oghg1h74c().f[0]++;
  cov_1oghg1h74c().s[1]++;
  return combineReducers({
    admin,
    aria,
    apd,
    auth,
    budget,
    errors,
    nav,
    patch,
    saving,
    user,
    working,
    router: connectRouter(history)
  });
};

export default rootReducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb25uZWN0Um91dGVyIiwiY29tYmluZVJlZHVjZXJzIiwiYWRtaW4iLCJhcmlhIiwiYXBkIiwiYXV0aCIsImJ1ZGdldCIsImVycm9ycyIsIm5hdiIsInBhdGNoIiwic2F2aW5nIiwidXNlciIsIndvcmtpbmciLCJyb290UmVkdWNlciIsImhpc3RvcnkiLCJyb3V0ZXIiXSwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25uZWN0Um91dGVyIH0gZnJvbSAnY29ubmVjdGVkLXJlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCBhZG1pbiBmcm9tICcuL2FkbWluJztcbmltcG9ydCBhcmlhIGZyb20gJy4vYXJpYSc7XG5pbXBvcnQgYXBkIGZyb20gJy4vYXBkJztcbmltcG9ydCBhdXRoIGZyb20gJy4vYXV0aCc7XG5pbXBvcnQgYnVkZ2V0IGZyb20gJy4vYnVkZ2V0JztcbmltcG9ydCBlcnJvcnMgZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IG5hdiBmcm9tICcuL25hdic7XG5pbXBvcnQgcGF0Y2ggZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgc2F2aW5nIGZyb20gJy4vc2F2aW5nJztcbmltcG9ydCB1c2VyIGZyb20gJy4vdXNlcic7XG5pbXBvcnQgd29ya2luZyBmcm9tICcuL3dvcmtpbmcnO1xuXG5jb25zdCByb290UmVkdWNlciA9IGhpc3RvcnkgPT5cbiAgY29tYmluZVJlZHVjZXJzKHtcbiAgICBhZG1pbixcbiAgICBhcmlhLFxuICAgIGFwZCxcbiAgICBhdXRoLFxuICAgIGJ1ZGdldCxcbiAgICBlcnJvcnMsXG4gICAgbmF2LFxuICAgIHBhdGNoLFxuICAgIHNhdmluZyxcbiAgICB1c2VyLFxuICAgIHdvcmtpbmcsXG4gICAgcm91dGVyOiBjb25uZWN0Um91dGVyKGhpc3RvcnkpXG4gIH0pO1xuXG5leHBvcnQgZGVmYXVsdCByb290UmVkdWNlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7Ozs7Ozs7OztBQWZaLFNBQVNBLGFBQVQsUUFBOEIsd0JBQTlCO0FBQ0EsU0FBU0MsZUFBVCxRQUFnQyxPQUFoQztBQUVBLE9BQU9DLEtBQVAsTUFBa0IsU0FBbEI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLFFBQWpCO0FBQ0EsT0FBT0MsR0FBUCxNQUFnQixPQUFoQjtBQUNBLE9BQU9DLElBQVAsTUFBaUIsUUFBakI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLFVBQW5CO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixVQUFuQjtBQUNBLE9BQU9DLEdBQVAsTUFBZ0IsT0FBaEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLFNBQWxCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixVQUFuQjtBQUNBLE9BQU9DLElBQVAsTUFBaUIsUUFBakI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLFdBQXBCOzs7QUFFQSxNQUFNQyxXQUFXLEdBQUdDLE9BQU8sSUFDekI7RUFBQTtFQUFBO0VBQUEsT0FBQWIsZUFBZSxDQUFDO0lBQ2RDLEtBRGM7SUFFZEMsSUFGYztJQUdkQyxHQUhjO0lBSWRDLElBSmM7SUFLZEMsTUFMYztJQU1kQyxNQU5jO0lBT2RDLEdBUGM7SUFRZEMsS0FSYztJQVNkQyxNQVRjO0lBVWRDLElBVmM7SUFXZEMsT0FYYztJQVlkRyxNQUFNLEVBQUVmLGFBQWEsQ0FBQ2MsT0FBRDtFQVpQLENBQUQsQ0FBZjtBQWFFLENBZEo7O0FBZ0JBLGVBQWVELFdBQWYifQ==