function cov_usq9yg562() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/standardsAndConditions.js";
  var hash = "608e24fc3acdd0c3273c358307d3cf317a435edc";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/standardsAndConditions.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 72
        },
        end: {
          line: 10,
          column: 2
        }
      },
      "1": {
        start: {
          line: 6,
          column: 6
        },
        end: {
          line: 10,
          column: 1
        }
      },
      "2": {
        start: {
          line: 12,
          column: 65
        },
        end: {
          line: 19,
          column: 2
        }
      },
      "3": {
        start: {
          line: 15,
          column: 6
        },
        end: {
          line: 19,
          column: 1
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 3,
            column: 72
          },
          end: {
            line: 3,
            column: 73
          }
        },
        loc: {
          start: {
            line: 6,
            column: 6
          },
          end: {
            line: 10,
            column: 1
          }
        },
        line: 6
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 12,
            column: 65
          },
          end: {
            line: 12,
            column: 66
          }
        },
        loc: {
          start: {
            line: 15,
            column: 6
          },
          end: {
            line: 19,
            column: 1
          }
        },
        line: 15
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "608e24fc3acdd0c3273c358307d3cf317a435edc"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_usq9yg562 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_usq9yg562();
import { EDIT_APD } from '../editApd/symbols';
cov_usq9yg562().s[0]++;
export const setActivityStandardAndConditionDoesNotSupportExplanation = (activityIndex, explanation) => {
  cov_usq9yg562().f[0]++;
  cov_usq9yg562().s[1]++;
  return {
    type: EDIT_APD,
    path: `/activities/${activityIndex}/standardsAndConditions/doesNotSupport`,
    value: explanation
  };
};
cov_usq9yg562().s[2]++;
export const setActivityStandardAndConditionSupportExplanation = (activityIndex, explanation) => {
  cov_usq9yg562().f[1]++;
  cov_usq9yg562().s[3]++;
  return {
    type: EDIT_APD,
    path: `/activities/${activityIndex}/standardsAndConditions/supports`,
    value: explanation
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFRElUX0FQRCIsInNldEFjdGl2aXR5U3RhbmRhcmRBbmRDb25kaXRpb25Eb2VzTm90U3VwcG9ydEV4cGxhbmF0aW9uIiwiYWN0aXZpdHlJbmRleCIsImV4cGxhbmF0aW9uIiwidHlwZSIsInBhdGgiLCJ2YWx1ZSIsInNldEFjdGl2aXR5U3RhbmRhcmRBbmRDb25kaXRpb25TdXBwb3J0RXhwbGFuYXRpb24iXSwic291cmNlcyI6WyJzdGFuZGFyZHNBbmRDb25kaXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVESVRfQVBEIH0gZnJvbSAnLi4vZWRpdEFwZC9zeW1ib2xzJztcblxuZXhwb3J0IGNvbnN0IHNldEFjdGl2aXR5U3RhbmRhcmRBbmRDb25kaXRpb25Eb2VzTm90U3VwcG9ydEV4cGxhbmF0aW9uID0gKFxuICBhY3Rpdml0eUluZGV4LFxuICBleHBsYW5hdGlvblxuKSA9PiAoe1xuICB0eXBlOiBFRElUX0FQRCxcbiAgcGF0aDogYC9hY3Rpdml0aWVzLyR7YWN0aXZpdHlJbmRleH0vc3RhbmRhcmRzQW5kQ29uZGl0aW9ucy9kb2VzTm90U3VwcG9ydGAsXG4gIHZhbHVlOiBleHBsYW5hdGlvblxufSk7XG5cbmV4cG9ydCBjb25zdCBzZXRBY3Rpdml0eVN0YW5kYXJkQW5kQ29uZGl0aW9uU3VwcG9ydEV4cGxhbmF0aW9uID0gKFxuICBhY3Rpdml0eUluZGV4LFxuICBleHBsYW5hdGlvblxuKSA9PiAoe1xuICB0eXBlOiBFRElUX0FQRCxcbiAgcGF0aDogYC9hY3Rpdml0aWVzLyR7YWN0aXZpdHlJbmRleH0vc3RhbmRhcmRzQW5kQ29uZGl0aW9ucy9zdXBwb3J0c2AsXG4gIHZhbHVlOiBleHBsYW5hdGlvblxufSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7Ozs7Ozs7OztBQWZaLFNBQVNBLFFBQVQsUUFBeUIsb0JBQXpCOztBQUVBLE9BQU8sTUFBTUMsd0RBQXdELEdBQUcsQ0FDdEVDLGFBRHNFLEVBRXRFQyxXQUZzRSxLQUdsRTtFQUFBO0VBQUE7RUFBQTtJQUNKQyxJQUFJLEVBQUVKLFFBREY7SUFFSkssSUFBSSxFQUFHLGVBQWNILGFBQWMsd0NBRi9CO0lBR0pJLEtBQUssRUFBRUg7RUFISDtBQUlMLENBUE07O0FBU1AsT0FBTyxNQUFNSSxpREFBaUQsR0FBRyxDQUMvREwsYUFEK0QsRUFFL0RDLFdBRitELEtBRzNEO0VBQUE7RUFBQTtFQUFBO0lBQ0pDLElBQUksRUFBRUosUUFERjtJQUVKSyxJQUFJLEVBQUcsZUFBY0gsYUFBYyxrQ0FGL0I7SUFHSkksS0FBSyxFQUFFSDtFQUhIO0FBSUwsQ0FQTSJ9