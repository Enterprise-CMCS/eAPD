function cov_1x1b5pnkfn() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/outcomes.js";
  var hash = "4232bddeef76e0b0ad5827eccfb3ede7fdc28e50";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/outcomes.js",
    statementMap: {
      "0": {
        start: {
          line: 9,
          column: 27
        },
        end: {
          line: 28,
          column: 1
        }
      },
      "1": {
        start: {
          line: 9,
          column: 66
        },
        end: {
          line: 28,
          column: 1
        }
      },
      "2": {
        start: {
          line: 10,
          column: 24
        },
        end: {
          line: 10,
          column: 34
        }
      },
      "3": {
        start: {
          line: 12,
          column: 24
        },
        end: {
          line: 12,
          column: 36
        }
      },
      "4": {
        start: {
          line: 14,
          column: 2
        },
        end: {
          line: 21,
          column: 3
        }
      },
      "5": {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 15,
          column: 87
        }
      },
      "6": {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 20,
          column: 7
        }
      },
      "7": {
        start: {
          line: 23,
          column: 2
        },
        end: {
          line: 27,
          column: 5
        }
      },
      "8": {
        start: {
          line: 35,
          column: 29
        },
        end: {
          line: 40,
          column: 1
        }
      },
      "9": {
        start: {
          line: 35,
          column: 62
        },
        end: {
          line: 40,
          column: 1
        }
      },
      "10": {
        start: {
          line: 36,
          column: 2
        },
        end: {
          line: 39,
          column: 5
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 9,
            column: 27
          },
          end: {
            line: 9,
            column: 28
          }
        },
        loc: {
          start: {
            line: 9,
            column: 66
          },
          end: {
            line: 28,
            column: 1
          }
        },
        line: 9
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 9,
            column: 66
          },
          end: {
            line: 9,
            column: 67
          }
        },
        loc: {
          start: {
            line: 9,
            column: 90
          },
          end: {
            line: 28,
            column: 1
          }
        },
        line: 9
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 35,
            column: 29
          },
          end: {
            line: 35,
            column: 30
          }
        },
        loc: {
          start: {
            line: 35,
            column: 62
          },
          end: {
            line: 40,
            column: 1
          }
        },
        line: 35
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 35,
            column: 62
          },
          end: {
            line: 35,
            column: 63
          }
        },
        loc: {
          start: {
            line: 35,
            column: 74
          },
          end: {
            line: 40,
            column: 1
          }
        },
        line: 35
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 21,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 21,
            column: 3
          }
        }, {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 21,
            column: 3
          }
        }],
        line: 14
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
      "10": 0
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
    hash: "4232bddeef76e0b0ad5827eccfb3ede7fdc28e50"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1x1b5pnkfn = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1x1b5pnkfn();
import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';
/**
 * Adds or updates an outcome resource from an activity
 * @param {Number} activityIndex Index of the activity the outcome is part of
 * @param {Number} outcomeIndex Index of the outcome
 * @param {Object} data payload of the outcome to be saved
 */

cov_1x1b5pnkfn().s[0]++;
export const saveOutcome = (activityIndex, outcomeIndex, data) => {
  cov_1x1b5pnkfn().f[0]++;
  cov_1x1b5pnkfn().s[1]++;
  return (dispatch, getState) => {
    cov_1x1b5pnkfn().f[1]++;
    const previousState = (cov_1x1b5pnkfn().s[2]++, getState());
    let indexCalculated = (cov_1x1b5pnkfn().s[3]++, outcomeIndex);
    cov_1x1b5pnkfn().s[4]++;

    if (previousState.apd.data.activities[activityIndex].outcomes[outcomeIndex] === undefined) {
      cov_1x1b5pnkfn().b[0][0]++;
      cov_1x1b5pnkfn().s[5]++;
      indexCalculated = previousState.apd.data.activities[activityIndex].outcomes.length;
      cov_1x1b5pnkfn().s[6]++;
      dispatch({
        type: ADD_APD_ITEM,
        path: `/activities/${activityIndex}/outcomes/-`,
        state: getState()
      });
    } else {
      cov_1x1b5pnkfn().b[0][1]++;
    }

    cov_1x1b5pnkfn().s[7]++;
    dispatch({
      type: EDIT_APD,
      path: `/activities/${activityIndex}/outcomes/${indexCalculated}`,
      value: data
    });
  };
};
/**
 * Remove an outcome resource from an activity
 * @param {Number} activityIndex Index of the activity to remove the outcome from
 * @param {Number} outcomeIndex Index of the outcome to remove
 */

cov_1x1b5pnkfn().s[8]++;
export const removeOutcome = (activityIndex, outcomeIndex) => {
  cov_1x1b5pnkfn().f[2]++;
  cov_1x1b5pnkfn().s[9]++;
  return dispatch => {
    cov_1x1b5pnkfn().f[3]++;
    cov_1x1b5pnkfn().s[10]++;
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/activities/${activityIndex}/outcomes/${outcomeIndex}`
    });
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBRERfQVBEX0lURU0iLCJFRElUX0FQRCIsIlJFTU9WRV9BUERfSVRFTSIsInNhdmVPdXRjb21lIiwiYWN0aXZpdHlJbmRleCIsIm91dGNvbWVJbmRleCIsImRhdGEiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwicHJldmlvdXNTdGF0ZSIsImluZGV4Q2FsY3VsYXRlZCIsImFwZCIsImFjdGl2aXRpZXMiLCJvdXRjb21lcyIsInVuZGVmaW5lZCIsImxlbmd0aCIsInR5cGUiLCJwYXRoIiwic3RhdGUiLCJ2YWx1ZSIsInJlbW92ZU91dGNvbWUiXSwic291cmNlcyI6WyJvdXRjb21lcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBRERfQVBEX0lURU0sIEVESVRfQVBELCBSRU1PVkVfQVBEX0lURU0gfSBmcm9tICcuLi9lZGl0QXBkJztcblxuLyoqXG4gKiBBZGRzIG9yIHVwZGF0ZXMgYW4gb3V0Y29tZSByZXNvdXJjZSBmcm9tIGFuIGFjdGl2aXR5XG4gKiBAcGFyYW0ge051bWJlcn0gYWN0aXZpdHlJbmRleCBJbmRleCBvZiB0aGUgYWN0aXZpdHkgdGhlIG91dGNvbWUgaXMgcGFydCBvZlxuICogQHBhcmFtIHtOdW1iZXJ9IG91dGNvbWVJbmRleCBJbmRleCBvZiB0aGUgb3V0Y29tZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgcGF5bG9hZCBvZiB0aGUgb3V0Y29tZSB0byBiZSBzYXZlZFxuICovXG5leHBvcnQgY29uc3Qgc2F2ZU91dGNvbWUgPSAoYWN0aXZpdHlJbmRleCwgb3V0Y29tZUluZGV4LCBkYXRhKSA9PiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gIGNvbnN0IHByZXZpb3VzU3RhdGUgPSBnZXRTdGF0ZSgpO1xuXG4gIGxldCBpbmRleENhbGN1bGF0ZWQgPSBvdXRjb21lSW5kZXg7XG5cbiAgaWYocHJldmlvdXNTdGF0ZS5hcGQuZGF0YS5hY3Rpdml0aWVzW2FjdGl2aXR5SW5kZXhdLm91dGNvbWVzW291dGNvbWVJbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgIGluZGV4Q2FsY3VsYXRlZCA9IHByZXZpb3VzU3RhdGUuYXBkLmRhdGEuYWN0aXZpdGllc1thY3Rpdml0eUluZGV4XS5vdXRjb21lcy5sZW5ndGg7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogQUREX0FQRF9JVEVNLFxuICAgICAgcGF0aDogYC9hY3Rpdml0aWVzLyR7YWN0aXZpdHlJbmRleH0vb3V0Y29tZXMvLWAsXG4gICAgICBzdGF0ZTogZ2V0U3RhdGUoKVxuICAgIH0pO1xuICB9XG4gIFxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogRURJVF9BUEQsXG4gICAgcGF0aDogYC9hY3Rpdml0aWVzLyR7YWN0aXZpdHlJbmRleH0vb3V0Y29tZXMvJHtpbmRleENhbGN1bGF0ZWR9YCxcbiAgICB2YWx1ZTogZGF0YVxuICB9KTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYW4gb3V0Y29tZSByZXNvdXJjZSBmcm9tIGFuIGFjdGl2aXR5XG4gKiBAcGFyYW0ge051bWJlcn0gYWN0aXZpdHlJbmRleCBJbmRleCBvZiB0aGUgYWN0aXZpdHkgdG8gcmVtb3ZlIHRoZSBvdXRjb21lIGZyb21cbiAqIEBwYXJhbSB7TnVtYmVyfSBvdXRjb21lSW5kZXggSW5kZXggb2YgdGhlIG91dGNvbWUgdG8gcmVtb3ZlXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVPdXRjb21lID0gKGFjdGl2aXR5SW5kZXgsIG91dGNvbWVJbmRleCkgPT4gZGlzcGF0Y2ggPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogUkVNT1ZFX0FQRF9JVEVNLFxuICAgIHBhdGg6IGAvYWN0aXZpdGllcy8ke2FjdGl2aXR5SW5kZXh9L291dGNvbWVzLyR7b3V0Y29tZUluZGV4fWBcbiAgfSk7XG59OyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7Ozs7Ozs7OztBQWZaLFNBQVNBLFlBQVQsRUFBdUJDLFFBQXZCLEVBQWlDQyxlQUFqQyxRQUF3RCxZQUF4RDtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsT0FBTyxNQUFNQyxXQUFXLEdBQUcsQ0FBQ0MsYUFBRCxFQUFnQkMsWUFBaEIsRUFBOEJDLElBQTlCLEtBQXVDO0VBQUE7RUFBQTtFQUFBLFFBQUNDLFFBQUQsRUFBV0MsUUFBWCxLQUF3QjtJQUFBO0lBQ3hGLE1BQU1DLGFBQWEsNkJBQUdELFFBQVEsRUFBWCxDQUFuQjtJQUVBLElBQUlFLGVBQWUsNkJBQUdMLFlBQUgsQ0FBbkI7SUFId0Y7O0lBS3hGLElBQUdJLGFBQWEsQ0FBQ0UsR0FBZCxDQUFrQkwsSUFBbEIsQ0FBdUJNLFVBQXZCLENBQWtDUixhQUFsQyxFQUFpRFMsUUFBakQsQ0FBMERSLFlBQTFELE1BQTRFUyxTQUEvRSxFQUEwRjtNQUFBO01BQUE7TUFDeEZKLGVBQWUsR0FBR0QsYUFBYSxDQUFDRSxHQUFkLENBQWtCTCxJQUFsQixDQUF1Qk0sVUFBdkIsQ0FBa0NSLGFBQWxDLEVBQWlEUyxRQUFqRCxDQUEwREUsTUFBNUU7TUFEd0Y7TUFFeEZSLFFBQVEsQ0FBQztRQUNQUyxJQUFJLEVBQUVoQixZQURDO1FBRVBpQixJQUFJLEVBQUcsZUFBY2IsYUFBYyxhQUY1QjtRQUdQYyxLQUFLLEVBQUVWLFFBQVE7TUFIUixDQUFELENBQVI7SUFLRCxDQVBEO01BQUE7SUFBQTs7SUFMd0Y7SUFjeEZELFFBQVEsQ0FBQztNQUNQUyxJQUFJLEVBQUVmLFFBREM7TUFFUGdCLElBQUksRUFBRyxlQUFjYixhQUFjLGFBQVlNLGVBQWdCLEVBRnhEO01BR1BTLEtBQUssRUFBRWI7SUFIQSxDQUFELENBQVI7RUFLRCxDQW5CaUU7QUFtQmpFLENBbkJNO0FBcUJQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE9BQU8sTUFBTWMsYUFBYSxHQUFHLENBQUNoQixhQUFELEVBQWdCQyxZQUFoQixLQUFpQztFQUFBO0VBQUE7RUFBQSxPQUFBRSxRQUFRLElBQUk7SUFBQTtJQUFBO0lBQ3hFQSxRQUFRLENBQUM7TUFDUFMsSUFBSSxFQUFFZCxlQURDO01BRVBlLElBQUksRUFBRyxlQUFjYixhQUFjLGFBQVlDLFlBQWE7SUFGckQsQ0FBRCxDQUFSO0VBSUQsQ0FMNkQ7QUFLN0QsQ0FMTSJ9