function cov_1g5rian08n() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/overview.js";
  var hash = "3f2895a8334f25852ae09166a467184b8a6f116c";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/overview.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 35
        },
        end: {
          line: 7,
          column: 2
        }
      },
      "1": {
        start: {
          line: 3,
          column: 65
        },
        end: {
          line: 7,
          column: 1
        }
      },
      "2": {
        start: {
          line: 9,
          column: 38
        },
        end: {
          line: 13,
          column: 2
        }
      },
      "3": {
        start: {
          line: 9,
          column: 71
        },
        end: {
          line: 13,
          column: 1
        }
      },
      "4": {
        start: {
          line: 15,
          column: 39
        },
        end: {
          line: 19,
          column: 2
        }
      },
      "5": {
        start: {
          line: 15,
          column: 73
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
            column: 35
          },
          end: {
            line: 3,
            column: 36
          }
        },
        loc: {
          start: {
            line: 3,
            column: 65
          },
          end: {
            line: 7,
            column: 1
          }
        },
        line: 3
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 9,
            column: 38
          },
          end: {
            line: 9,
            column: 39
          }
        },
        loc: {
          start: {
            line: 9,
            column: 71
          },
          end: {
            line: 13,
            column: 1
          }
        },
        line: 9
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 15,
            column: 39
          },
          end: {
            line: 15,
            column: 40
          }
        },
        loc: {
          start: {
            line: 15,
            column: 73
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
      "3": 0,
      "4": 0,
      "5": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "3f2895a8334f25852ae09166a467184b8a6f116c"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1g5rian08n = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1g5rian08n();
import { EDIT_APD } from '../editApd/symbols';
cov_1g5rian08n().s[0]++;
export const setActivityOverview = (activityIndex, overview) => {
  cov_1g5rian08n().f[0]++;
  cov_1g5rian08n().s[1]++;
  return {
    type: EDIT_APD,
    path: `/activities/${activityIndex}/summary`,
    value: overview
  };
};
cov_1g5rian08n().s[2]++;
export const setActivityDescription = (activityIndex, description) => {
  cov_1g5rian08n().f[1]++;
  cov_1g5rian08n().s[3]++;
  return {
    type: EDIT_APD,
    path: `/activities/${activityIndex}/description`,
    value: description
  };
};
cov_1g5rian08n().s[4]++;
export const setActivityAlternatives = (activityIndex, alternatives) => {
  cov_1g5rian08n().f[2]++;
  cov_1g5rian08n().s[5]++;
  return {
    type: EDIT_APD,
    path: `/activities/${activityIndex}/alternatives`,
    value: alternatives
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFRElUX0FQRCIsInNldEFjdGl2aXR5T3ZlcnZpZXciLCJhY3Rpdml0eUluZGV4Iiwib3ZlcnZpZXciLCJ0eXBlIiwicGF0aCIsInZhbHVlIiwic2V0QWN0aXZpdHlEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwic2V0QWN0aXZpdHlBbHRlcm5hdGl2ZXMiLCJhbHRlcm5hdGl2ZXMiXSwic291cmNlcyI6WyJvdmVydmlldy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFRElUX0FQRCB9IGZyb20gJy4uL2VkaXRBcGQvc3ltYm9scyc7XG5cbmV4cG9ydCBjb25zdCBzZXRBY3Rpdml0eU92ZXJ2aWV3ID0gKGFjdGl2aXR5SW5kZXgsIG92ZXJ2aWV3KSA9PiAoe1xuICB0eXBlOiBFRElUX0FQRCxcbiAgcGF0aDogYC9hY3Rpdml0aWVzLyR7YWN0aXZpdHlJbmRleH0vc3VtbWFyeWAsXG4gIHZhbHVlOiBvdmVydmlld1xufSk7XG5cbmV4cG9ydCBjb25zdCBzZXRBY3Rpdml0eURlc2NyaXB0aW9uID0gKGFjdGl2aXR5SW5kZXgsIGRlc2NyaXB0aW9uKSA9PiAoe1xuICB0eXBlOiBFRElUX0FQRCxcbiAgcGF0aDogYC9hY3Rpdml0aWVzLyR7YWN0aXZpdHlJbmRleH0vZGVzY3JpcHRpb25gLFxuICB2YWx1ZTogZGVzY3JpcHRpb25cbn0pO1xuXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZpdHlBbHRlcm5hdGl2ZXMgPSAoYWN0aXZpdHlJbmRleCwgYWx0ZXJuYXRpdmVzKSA9PiAoe1xuICB0eXBlOiBFRElUX0FQRCxcbiAgcGF0aDogYC9hY3Rpdml0aWVzLyR7YWN0aXZpdHlJbmRleH0vYWx0ZXJuYXRpdmVzYCxcbiAgdmFsdWU6IGFsdGVybmF0aXZlc1xufSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTs7Ozs7Ozs7O0FBZlosU0FBU0EsUUFBVCxRQUF5QixvQkFBekI7O0FBRUEsT0FBTyxNQUFNQyxtQkFBbUIsR0FBRyxDQUFDQyxhQUFELEVBQWdCQyxRQUFoQixLQUE4QjtFQUFBO0VBQUE7RUFBQTtJQUMvREMsSUFBSSxFQUFFSixRQUR5RDtJQUUvREssSUFBSSxFQUFHLGVBQWNILGFBQWMsVUFGNEI7SUFHL0RJLEtBQUssRUFBRUg7RUFId0Q7QUFJaEUsQ0FKTTs7QUFNUCxPQUFPLE1BQU1JLHNCQUFzQixHQUFHLENBQUNMLGFBQUQsRUFBZ0JNLFdBQWhCLEtBQWlDO0VBQUE7RUFBQTtFQUFBO0lBQ3JFSixJQUFJLEVBQUVKLFFBRCtEO0lBRXJFSyxJQUFJLEVBQUcsZUFBY0gsYUFBYyxjQUZrQztJQUdyRUksS0FBSyxFQUFFRTtFQUg4RDtBQUl0RSxDQUpNOztBQU1QLE9BQU8sTUFBTUMsdUJBQXVCLEdBQUcsQ0FBQ1AsYUFBRCxFQUFnQlEsWUFBaEIsS0FBa0M7RUFBQTtFQUFBO0VBQUE7SUFDdkVOLElBQUksRUFBRUosUUFEaUU7SUFFdkVLLElBQUksRUFBRyxlQUFjSCxhQUFjLGVBRm9DO0lBR3ZFSSxLQUFLLEVBQUVJO0VBSGdFO0FBSXhFLENBSk0ifQ==