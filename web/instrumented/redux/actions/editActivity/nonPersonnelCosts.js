function cov_8weteh5f2() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/nonPersonnelCosts.js";
  var hash = "50b01301d3855cd945239aaa615bb96e7f68c7cc";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/nonPersonnelCosts.js",
    statementMap: {
      "0": {
        start: {
          line: 10,
          column: 36
        },
        end: {
          line: 31,
          column: 1
        }
      },
      "1": {
        start: {
          line: 10,
          column: 80
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
          column: 41
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
          column: 87
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
          column: 38
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
            column: 36
          },
          end: {
            line: 10,
            column: 37
          }
        },
        loc: {
          start: {
            line: 10,
            column: 80
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
            column: 80
          },
          end: {
            line: 10,
            column: 81
          }
        },
        loc: {
          start: {
            line: 10,
            column: 104
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
            column: 38
          },
          end: {
            line: 38,
            column: 39
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
    hash: "50b01301d3855cd945239aaa615bb96e7f68c7cc"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_8weteh5f2 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_8weteh5f2();
import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';
import { updateBudget } from '../budget';
/**
 * Adds or updates a expense resource from an activity
 * @param {Number} activityIndex Index of the activity the expense is part of
 * @param {Number} nonPersonnelIndex Index of the expense
 * @param {Object} data payload of the expense to be saved
 */

cov_8weteh5f2().s[0]++;
export const saveNonPersonnelCost = (activityIndex, nonPersonnelIndex, data) => {
  cov_8weteh5f2().f[0]++;
  cov_8weteh5f2().s[1]++;
  return (dispatch, getState) => {
    cov_8weteh5f2().f[1]++;
    const previousState = (cov_8weteh5f2().s[2]++, getState());
    let indexCalculated = (cov_8weteh5f2().s[3]++, nonPersonnelIndex);
    cov_8weteh5f2().s[4]++;

    if (previousState.apd.data.activities[activityIndex].expenses[nonPersonnelIndex] === undefined) {
      cov_8weteh5f2().b[0][0]++;
      cov_8weteh5f2().s[5]++;
      indexCalculated = previousState.apd.data.activities[activityIndex].expenses.length;
      cov_8weteh5f2().s[6]++;
      dispatch({
        type: ADD_APD_ITEM,
        path: `/activities/${activityIndex}/expenses/-`,
        state: getState()
      });
    } else {
      cov_8weteh5f2().b[0][1]++;
    }

    cov_8weteh5f2().s[7]++;
    dispatch({
      type: EDIT_APD,
      path: `/activities/${activityIndex}/expenses/${indexCalculated}`,
      value: data
    });
    cov_8weteh5f2().s[8]++;
    dispatch(updateBudget());
  };
};
/**
 * Remove an expense resource from an activity
 * @param {Number} activityIndex Index of the activity to remove the expense from
 * @param {Number} nonPersonnelIndex Index of the expense to remove
 */

cov_8weteh5f2().s[9]++;
export const removeNonPersonnelCost = (activityIndex, nonPersonnelIndex) => {
  cov_8weteh5f2().f[2]++;
  cov_8weteh5f2().s[10]++;
  return dispatch => {
    cov_8weteh5f2().f[3]++;
    cov_8weteh5f2().s[11]++;
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/activities/${activityIndex}/expenses/${nonPersonnelIndex}`
    });
    cov_8weteh5f2().s[12]++;
    dispatch(updateBudget());
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBRERfQVBEX0lURU0iLCJFRElUX0FQRCIsIlJFTU9WRV9BUERfSVRFTSIsInVwZGF0ZUJ1ZGdldCIsInNhdmVOb25QZXJzb25uZWxDb3N0IiwiYWN0aXZpdHlJbmRleCIsIm5vblBlcnNvbm5lbEluZGV4IiwiZGF0YSIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJwcmV2aW91c1N0YXRlIiwiaW5kZXhDYWxjdWxhdGVkIiwiYXBkIiwiYWN0aXZpdGllcyIsImV4cGVuc2VzIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwidHlwZSIsInBhdGgiLCJzdGF0ZSIsInZhbHVlIiwicmVtb3ZlTm9uUGVyc29ubmVsQ29zdCJdLCJzb3VyY2VzIjpbIm5vblBlcnNvbm5lbENvc3RzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFERF9BUERfSVRFTSwgRURJVF9BUEQsIFJFTU9WRV9BUERfSVRFTSB9IGZyb20gJy4uL2VkaXRBcGQnO1xuaW1wb3J0IHsgdXBkYXRlQnVkZ2V0IH0gZnJvbSAnLi4vYnVkZ2V0JztcblxuLyoqXG4gKiBBZGRzIG9yIHVwZGF0ZXMgYSBleHBlbnNlIHJlc291cmNlIGZyb20gYW4gYWN0aXZpdHlcbiAqIEBwYXJhbSB7TnVtYmVyfSBhY3Rpdml0eUluZGV4IEluZGV4IG9mIHRoZSBhY3Rpdml0eSB0aGUgZXhwZW5zZSBpcyBwYXJ0IG9mXG4gKiBAcGFyYW0ge051bWJlcn0gbm9uUGVyc29ubmVsSW5kZXggSW5kZXggb2YgdGhlIGV4cGVuc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIHBheWxvYWQgb2YgdGhlIGV4cGVuc2UgdG8gYmUgc2F2ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IHNhdmVOb25QZXJzb25uZWxDb3N0ID0gKGFjdGl2aXR5SW5kZXgsIG5vblBlcnNvbm5lbEluZGV4LCBkYXRhKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGNvbnN0IHByZXZpb3VzU3RhdGUgPSBnZXRTdGF0ZSgpO1xuXG4gIGxldCBpbmRleENhbGN1bGF0ZWQgPSBub25QZXJzb25uZWxJbmRleDtcblxuICBpZihwcmV2aW91c1N0YXRlLmFwZC5kYXRhLmFjdGl2aXRpZXNbYWN0aXZpdHlJbmRleF0uZXhwZW5zZXNbbm9uUGVyc29ubmVsSW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICBpbmRleENhbGN1bGF0ZWQgPSBwcmV2aW91c1N0YXRlLmFwZC5kYXRhLmFjdGl2aXRpZXNbYWN0aXZpdHlJbmRleF0uZXhwZW5zZXMubGVuZ3RoO1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IEFERF9BUERfSVRFTSxcbiAgICAgIHBhdGg6IGAvYWN0aXZpdGllcy8ke2FjdGl2aXR5SW5kZXh9L2V4cGVuc2VzLy1gLFxuICAgICAgc3RhdGU6IGdldFN0YXRlKClcbiAgICB9KTtcbiAgfVxuICBcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IEVESVRfQVBELFxuICAgIHBhdGg6IGAvYWN0aXZpdGllcy8ke2FjdGl2aXR5SW5kZXh9L2V4cGVuc2VzLyR7aW5kZXhDYWxjdWxhdGVkfWAsXG4gICAgdmFsdWU6IGRhdGFcbiAgfSk7XG4gIFxuICBkaXNwYXRjaCh1cGRhdGVCdWRnZXQoKSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBleHBlbnNlIHJlc291cmNlIGZyb20gYW4gYWN0aXZpdHlcbiAqIEBwYXJhbSB7TnVtYmVyfSBhY3Rpdml0eUluZGV4IEluZGV4IG9mIHRoZSBhY3Rpdml0eSB0byByZW1vdmUgdGhlIGV4cGVuc2UgZnJvbVxuICogQHBhcmFtIHtOdW1iZXJ9IG5vblBlcnNvbm5lbEluZGV4IEluZGV4IG9mIHRoZSBleHBlbnNlIHRvIHJlbW92ZVxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlTm9uUGVyc29ubmVsQ29zdCA9IChcbiAgYWN0aXZpdHlJbmRleCxcbiAgbm9uUGVyc29ubmVsSW5kZXhcbikgPT4gZGlzcGF0Y2ggPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogUkVNT1ZFX0FQRF9JVEVNLFxuICAgIHBhdGg6IGAvYWN0aXZpdGllcy8ke2FjdGl2aXR5SW5kZXh9L2V4cGVuc2VzLyR7bm9uUGVyc29ubmVsSW5kZXh9YFxuICB9KTtcbiAgZGlzcGF0Y2godXBkYXRlQnVkZ2V0KCkpO1xufTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTs7Ozs7Ozs7O0FBZlosU0FBU0EsWUFBVCxFQUF1QkMsUUFBdkIsRUFBaUNDLGVBQWpDLFFBQXdELFlBQXhEO0FBQ0EsU0FBU0MsWUFBVCxRQUE2QixXQUE3QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsT0FBTyxNQUFNQyxvQkFBb0IsR0FBRyxDQUFDQyxhQUFELEVBQWdCQyxpQkFBaEIsRUFBbUNDLElBQW5DLEtBQTRDO0VBQUE7RUFBQTtFQUFBLFFBQUNDLFFBQUQsRUFBV0MsUUFBWCxLQUF3QjtJQUFBO0lBQ3RHLE1BQU1DLGFBQWEsNEJBQUdELFFBQVEsRUFBWCxDQUFuQjtJQUVBLElBQUlFLGVBQWUsNEJBQUdMLGlCQUFILENBQW5CO0lBSHNHOztJQUt0RyxJQUFHSSxhQUFhLENBQUNFLEdBQWQsQ0FBa0JMLElBQWxCLENBQXVCTSxVQUF2QixDQUFrQ1IsYUFBbEMsRUFBaURTLFFBQWpELENBQTBEUixpQkFBMUQsTUFBaUZTLFNBQXBGLEVBQStGO01BQUE7TUFBQTtNQUM3RkosZUFBZSxHQUFHRCxhQUFhLENBQUNFLEdBQWQsQ0FBa0JMLElBQWxCLENBQXVCTSxVQUF2QixDQUFrQ1IsYUFBbEMsRUFBaURTLFFBQWpELENBQTBERSxNQUE1RTtNQUQ2RjtNQUU3RlIsUUFBUSxDQUFDO1FBQ1BTLElBQUksRUFBRWpCLFlBREM7UUFFUGtCLElBQUksRUFBRyxlQUFjYixhQUFjLGFBRjVCO1FBR1BjLEtBQUssRUFBRVYsUUFBUTtNQUhSLENBQUQsQ0FBUjtJQUtELENBUEQ7TUFBQTtJQUFBOztJQUxzRztJQWN0R0QsUUFBUSxDQUFDO01BQ1BTLElBQUksRUFBRWhCLFFBREM7TUFFUGlCLElBQUksRUFBRyxlQUFjYixhQUFjLGFBQVlNLGVBQWdCLEVBRnhEO01BR1BTLEtBQUssRUFBRWI7SUFIQSxDQUFELENBQVI7SUFkc0c7SUFvQnRHQyxRQUFRLENBQUNMLFlBQVksRUFBYixDQUFSO0VBQ0QsQ0FyQitFO0FBcUIvRSxDQXJCTTtBQXVCUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxPQUFPLE1BQU1rQixzQkFBc0IsR0FBRyxDQUNwQ2hCLGFBRG9DLEVBRXBDQyxpQkFGb0MsS0FHakM7RUFBQTtFQUFBO0VBQUEsT0FBQUUsUUFBUSxJQUFJO0lBQUE7SUFBQTtJQUNmQSxRQUFRLENBQUM7TUFDUFMsSUFBSSxFQUFFZixlQURDO01BRVBnQixJQUFJLEVBQUcsZUFBY2IsYUFBYyxhQUFZQyxpQkFBa0I7SUFGMUQsQ0FBRCxDQUFSO0lBRGU7SUFLZkUsUUFBUSxDQUFDTCxZQUFZLEVBQWIsQ0FBUjtFQUNELENBTkk7QUFNSixDQVRNIn0=