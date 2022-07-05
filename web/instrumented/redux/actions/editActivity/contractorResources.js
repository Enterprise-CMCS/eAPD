function cov_1ekp4uazvv() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/contractorResources.js";
  var hash = "c647b3e388c6ca69ca1a5fc2ec2adfb4d5eac5d6";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/contractorResources.js",
    statementMap: {
      "0": {
        start: {
          line: 10,
          column: 30
        },
        end: {
          line: 31,
          column: 1
        }
      },
      "1": {
        start: {
          line: 10,
          column: 72
        },
        end: {
          line: 31,
          column: 1
        }
      },
      "2": {
        start: {
          line: 11,
          column: 24
        },
        end: {
          line: 11,
          column: 34
        }
      },
      "3": {
        start: {
          line: 13,
          column: 24
        },
        end: {
          line: 13,
          column: 39
        }
      },
      "4": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 22,
          column: 3
        }
      },
      "5": {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 16,
          column: 98
        }
      },
      "6": {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 21,
          column: 7
        }
      },
      "7": {
        start: {
          line: 24,
          column: 2
        },
        end: {
          line: 28,
          column: 5
        }
      },
      "8": {
        start: {
          line: 30,
          column: 2
        },
        end: {
          line: 30,
          column: 27
        }
      },
      "9": {
        start: {
          line: 38,
          column: 32
        },
        end: {
          line: 47,
          column: 1
        }
      },
      "10": {
        start: {
          line: 41,
          column: 5
        },
        end: {
          line: 47,
          column: 1
        }
      },
      "11": {
        start: {
          line: 42,
          column: 2
        },
        end: {
          line: 45,
          column: 5
        }
      },
      "12": {
        start: {
          line: 46,
          column: 2
        },
        end: {
          line: 46,
          column: 27
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 10,
            column: 30
          },
          end: {
            line: 10,
            column: 31
          }
        },
        loc: {
          start: {
            line: 10,
            column: 72
          },
          end: {
            line: 31,
            column: 1
          }
        },
        line: 10
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 10,
            column: 72
          },
          end: {
            line: 10,
            column: 73
          }
        },
        loc: {
          start: {
            line: 10,
            column: 96
          },
          end: {
            line: 31,
            column: 1
          }
        },
        line: 10
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 38,
            column: 32
          },
          end: {
            line: 38,
            column: 33
          }
        },
        loc: {
          start: {
            line: 41,
            column: 5
          },
          end: {
            line: 47,
            column: 1
          }
        },
        line: 41
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 41,
            column: 5
          },
          end: {
            line: 41,
            column: 6
          }
        },
        loc: {
          start: {
            line: 41,
            column: 17
          },
          end: {
            line: 47,
            column: 1
          }
        },
        line: 41
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 22,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 22,
            column: 3
          }
        }, {
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 22,
            column: 3
          }
        }],
        line: 15
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
      "9": 0,
      "10": 0,
      "11": 0,
      "12": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "c647b3e388c6ca69ca1a5fc2ec2adfb4d5eac5d6"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1ekp4uazvv = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1ekp4uazvv();
import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';
import { updateBudget } from '../budget';
/**
 * Adds or updates a contractor resource from an activity
 * @param {Number} activityIndex Index of the activity the contractor is part of
 * @param {Number} contractorIndex Index of the contractor
 * @param {Object} data payload of the contractor to be saved
 */

cov_1ekp4uazvv().s[0]++;
export const saveContractor = (activityIndex, contractorIndex, data) => {
  cov_1ekp4uazvv().f[0]++;
  cov_1ekp4uazvv().s[1]++;
  return (dispatch, getState) => {
    cov_1ekp4uazvv().f[1]++;
    const previousState = (cov_1ekp4uazvv().s[2]++, getState());
    let indexCalculated = (cov_1ekp4uazvv().s[3]++, contractorIndex);
    cov_1ekp4uazvv().s[4]++;

    if (previousState.apd.data.activities[activityIndex].contractorResources[contractorIndex] === undefined) {
      cov_1ekp4uazvv().b[0][0]++;
      cov_1ekp4uazvv().s[5]++;
      indexCalculated = previousState.apd.data.activities[activityIndex].contractorResources.length;
      cov_1ekp4uazvv().s[6]++;
      dispatch({
        type: ADD_APD_ITEM,
        path: `/activities/${activityIndex}/contractorResources/-`,
        state: getState()
      });
    } else {
      cov_1ekp4uazvv().b[0][1]++;
    }

    cov_1ekp4uazvv().s[7]++;
    dispatch({
      type: EDIT_APD,
      path: `/activities/${activityIndex}/contractorResources/${indexCalculated}`,
      value: data
    });
    cov_1ekp4uazvv().s[8]++;
    dispatch(updateBudget());
  };
};
/**
 * Remove a contractor resource from an activity
 * @param {Number} activityIndex Index of the activity to remove the contractor from
 * @param {Number} contractorIndex Index of the contractor to remove
 */

cov_1ekp4uazvv().s[9]++;
export const removeContractor = (activityIndex, contractorIndex) => {
  cov_1ekp4uazvv().f[2]++;
  cov_1ekp4uazvv().s[10]++;
  return dispatch => {
    cov_1ekp4uazvv().f[3]++;
    cov_1ekp4uazvv().s[11]++;
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/activities/${activityIndex}/contractorResources/${contractorIndex}`
    });
    cov_1ekp4uazvv().s[12]++;
    dispatch(updateBudget());
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBRERfQVBEX0lURU0iLCJFRElUX0FQRCIsIlJFTU9WRV9BUERfSVRFTSIsInVwZGF0ZUJ1ZGdldCIsInNhdmVDb250cmFjdG9yIiwiYWN0aXZpdHlJbmRleCIsImNvbnRyYWN0b3JJbmRleCIsImRhdGEiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwicHJldmlvdXNTdGF0ZSIsImluZGV4Q2FsY3VsYXRlZCIsImFwZCIsImFjdGl2aXRpZXMiLCJjb250cmFjdG9yUmVzb3VyY2VzIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwidHlwZSIsInBhdGgiLCJzdGF0ZSIsInZhbHVlIiwicmVtb3ZlQ29udHJhY3RvciJdLCJzb3VyY2VzIjpbImNvbnRyYWN0b3JSZXNvdXJjZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQUREX0FQRF9JVEVNLCBFRElUX0FQRCwgUkVNT1ZFX0FQRF9JVEVNIH0gZnJvbSAnLi4vZWRpdEFwZCc7XG5pbXBvcnQgeyB1cGRhdGVCdWRnZXQgfSBmcm9tICcuLi9idWRnZXQnO1xuXG4vKipcbiAqIEFkZHMgb3IgdXBkYXRlcyBhIGNvbnRyYWN0b3IgcmVzb3VyY2UgZnJvbSBhbiBhY3Rpdml0eVxuICogQHBhcmFtIHtOdW1iZXJ9IGFjdGl2aXR5SW5kZXggSW5kZXggb2YgdGhlIGFjdGl2aXR5IHRoZSBjb250cmFjdG9yIGlzIHBhcnQgb2ZcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb250cmFjdG9ySW5kZXggSW5kZXggb2YgdGhlIGNvbnRyYWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIHBheWxvYWQgb2YgdGhlIGNvbnRyYWN0b3IgdG8gYmUgc2F2ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IHNhdmVDb250cmFjdG9yID0gKGFjdGl2aXR5SW5kZXgsIGNvbnRyYWN0b3JJbmRleCwgZGF0YSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCBwcmV2aW91c1N0YXRlID0gZ2V0U3RhdGUoKTtcbiAgXG4gIGxldCBpbmRleENhbGN1bGF0ZWQgPSBjb250cmFjdG9ySW5kZXg7XG4gIFxuICBpZihwcmV2aW91c1N0YXRlLmFwZC5kYXRhLmFjdGl2aXRpZXNbYWN0aXZpdHlJbmRleF0uY29udHJhY3RvclJlc291cmNlc1tjb250cmFjdG9ySW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICBpbmRleENhbGN1bGF0ZWQgPSBwcmV2aW91c1N0YXRlLmFwZC5kYXRhLmFjdGl2aXRpZXNbYWN0aXZpdHlJbmRleF0uY29udHJhY3RvclJlc291cmNlcy5sZW5ndGg7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogQUREX0FQRF9JVEVNLFxuICAgICAgcGF0aDogYC9hY3Rpdml0aWVzLyR7YWN0aXZpdHlJbmRleH0vY29udHJhY3RvclJlc291cmNlcy8tYCxcbiAgICAgIHN0YXRlOiBnZXRTdGF0ZSgpXG4gICAgfSk7XG4gIH1cbiAgXG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBFRElUX0FQRCxcbiAgICBwYXRoOiBgL2FjdGl2aXRpZXMvJHthY3Rpdml0eUluZGV4fS9jb250cmFjdG9yUmVzb3VyY2VzLyR7aW5kZXhDYWxjdWxhdGVkfWAsXG4gICAgdmFsdWU6IGRhdGFcbiAgfSk7XG4gIFxuICBkaXNwYXRjaCh1cGRhdGVCdWRnZXQoKSk7ICBcbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgY29udHJhY3RvciByZXNvdXJjZSBmcm9tIGFuIGFjdGl2aXR5XG4gKiBAcGFyYW0ge051bWJlcn0gYWN0aXZpdHlJbmRleCBJbmRleCBvZiB0aGUgYWN0aXZpdHkgdG8gcmVtb3ZlIHRoZSBjb250cmFjdG9yIGZyb21cbiAqIEBwYXJhbSB7TnVtYmVyfSBjb250cmFjdG9ySW5kZXggSW5kZXggb2YgdGhlIGNvbnRyYWN0b3IgdG8gcmVtb3ZlXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVDb250cmFjdG9yID0gKFxuICBhY3Rpdml0eUluZGV4LFxuICBjb250cmFjdG9ySW5kZXhcbikgPT4gZGlzcGF0Y2ggPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogUkVNT1ZFX0FQRF9JVEVNLFxuICAgIHBhdGg6IGAvYWN0aXZpdGllcy8ke2FjdGl2aXR5SW5kZXh9L2NvbnRyYWN0b3JSZXNvdXJjZXMvJHtjb250cmFjdG9ySW5kZXh9YFxuICB9KTtcbiAgZGlzcGF0Y2godXBkYXRlQnVkZ2V0KCkpO1xufTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTs7Ozs7Ozs7O0FBZlosU0FBU0EsWUFBVCxFQUF1QkMsUUFBdkIsRUFBaUNDLGVBQWpDLFFBQXdELFlBQXhEO0FBQ0EsU0FBU0MsWUFBVCxRQUE2QixXQUE3QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsT0FBTyxNQUFNQyxjQUFjLEdBQUcsQ0FBQ0MsYUFBRCxFQUFnQkMsZUFBaEIsRUFBaUNDLElBQWpDLEtBQTBDO0VBQUE7RUFBQTtFQUFBLFFBQUNDLFFBQUQsRUFBV0MsUUFBWCxLQUF3QjtJQUFBO0lBQzlGLE1BQU1DLGFBQWEsNkJBQUdELFFBQVEsRUFBWCxDQUFuQjtJQUVBLElBQUlFLGVBQWUsNkJBQUdMLGVBQUgsQ0FBbkI7SUFIOEY7O0lBSzlGLElBQUdJLGFBQWEsQ0FBQ0UsR0FBZCxDQUFrQkwsSUFBbEIsQ0FBdUJNLFVBQXZCLENBQWtDUixhQUFsQyxFQUFpRFMsbUJBQWpELENBQXFFUixlQUFyRSxNQUEwRlMsU0FBN0YsRUFBd0c7TUFBQTtNQUFBO01BQ3RHSixlQUFlLEdBQUdELGFBQWEsQ0FBQ0UsR0FBZCxDQUFrQkwsSUFBbEIsQ0FBdUJNLFVBQXZCLENBQWtDUixhQUFsQyxFQUFpRFMsbUJBQWpELENBQXFFRSxNQUF2RjtNQURzRztNQUV0R1IsUUFBUSxDQUFDO1FBQ1BTLElBQUksRUFBRWpCLFlBREM7UUFFUGtCLElBQUksRUFBRyxlQUFjYixhQUFjLHdCQUY1QjtRQUdQYyxLQUFLLEVBQUVWLFFBQVE7TUFIUixDQUFELENBQVI7SUFLRCxDQVBEO01BQUE7SUFBQTs7SUFMOEY7SUFjOUZELFFBQVEsQ0FBQztNQUNQUyxJQUFJLEVBQUVoQixRQURDO01BRVBpQixJQUFJLEVBQUcsZUFBY2IsYUFBYyx3QkFBdUJNLGVBQWdCLEVBRm5FO01BR1BTLEtBQUssRUFBRWI7SUFIQSxDQUFELENBQVI7SUFkOEY7SUFvQjlGQyxRQUFRLENBQUNMLFlBQVksRUFBYixDQUFSO0VBQ0QsQ0FyQnVFO0FBcUJ2RSxDQXJCTTtBQXVCUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxPQUFPLE1BQU1rQixnQkFBZ0IsR0FBRyxDQUM5QmhCLGFBRDhCLEVBRTlCQyxlQUY4QixLQUczQjtFQUFBO0VBQUE7RUFBQSxPQUFBRSxRQUFRLElBQUk7SUFBQTtJQUFBO0lBQ2ZBLFFBQVEsQ0FBQztNQUNQUyxJQUFJLEVBQUVmLGVBREM7TUFFUGdCLElBQUksRUFBRyxlQUFjYixhQUFjLHdCQUF1QkMsZUFBZ0I7SUFGbkUsQ0FBRCxDQUFSO0lBRGU7SUFLZkUsUUFBUSxDQUFDTCxZQUFZLEVBQWIsQ0FBUjtFQUNELENBTkk7QUFNSixDQVRNIn0=