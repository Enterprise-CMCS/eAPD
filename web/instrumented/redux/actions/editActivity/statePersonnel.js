function cov_2l6sgwd6il() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/statePersonnel.js";
  var hash = "94f119bd59d39141ddf1a93e753c655ead694c12";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/editActivity/statePersonnel.js",
    statementMap: {
      "0": {
        start: {
          line: 10,
          column: 29
        },
        end: {
          line: 31,
          column: 1
        }
      },
      "1": {
        start: {
          line: 10,
          column: 70
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
          column: 38
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
          column: 93
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
          column: 31
        },
        end: {
          line: 44,
          column: 1
        }
      },
      "10": {
        start: {
          line: 38,
          column: 66
        },
        end: {
          line: 44,
          column: 1
        }
      },
      "11": {
        start: {
          line: 39,
          column: 2
        },
        end: {
          line: 42,
          column: 5
        }
      },
      "12": {
        start: {
          line: 43,
          column: 2
        },
        end: {
          line: 43,
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
            column: 29
          },
          end: {
            line: 10,
            column: 30
          }
        },
        loc: {
          start: {
            line: 10,
            column: 70
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
            column: 70
          },
          end: {
            line: 10,
            column: 71
          }
        },
        loc: {
          start: {
            line: 10,
            column: 94
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
            column: 31
          },
          end: {
            line: 38,
            column: 32
          }
        },
        loc: {
          start: {
            line: 38,
            column: 66
          },
          end: {
            line: 44,
            column: 1
          }
        },
        line: 38
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 38,
            column: 66
          },
          end: {
            line: 38,
            column: 67
          }
        },
        loc: {
          start: {
            line: 38,
            column: 78
          },
          end: {
            line: 44,
            column: 1
          }
        },
        line: 38
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
    hash: "94f119bd59d39141ddf1a93e753c655ead694c12"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2l6sgwd6il = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_2l6sgwd6il();
import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../editApd';
import { updateBudget } from '../budget';
/**
 * Adds or updates a personnel resource from an activity
 * @param {Number} activityIndex Index of the activity the personnel is part of
 * @param {Number} personnelIndex Index of the personnel
 * @param {Object} data payload of the personnel to be saved
 */

cov_2l6sgwd6il().s[0]++;
export const savePersonnel = (activityIndex, personnelIndex, data) => {
  cov_2l6sgwd6il().f[0]++;
  cov_2l6sgwd6il().s[1]++;
  return (dispatch, getState) => {
    cov_2l6sgwd6il().f[1]++;
    const previousState = (cov_2l6sgwd6il().s[2]++, getState());
    let indexCalculated = (cov_2l6sgwd6il().s[3]++, personnelIndex);
    cov_2l6sgwd6il().s[4]++;

    if (previousState.apd.data.activities[activityIndex].statePersonnel[personnelIndex] === undefined) {
      cov_2l6sgwd6il().b[0][0]++;
      cov_2l6sgwd6il().s[5]++;
      indexCalculated = previousState.apd.data.activities[activityIndex].statePersonnel.length;
      cov_2l6sgwd6il().s[6]++;
      dispatch({
        type: ADD_APD_ITEM,
        path: `/activities/${activityIndex}/statePersonnel/-`,
        state: getState()
      });
    } else {
      cov_2l6sgwd6il().b[0][1]++;
    }

    cov_2l6sgwd6il().s[7]++;
    dispatch({
      type: EDIT_APD,
      path: `/activities/${activityIndex}/statePersonnel/${indexCalculated}`,
      value: data
    });
    cov_2l6sgwd6il().s[8]++;
    dispatch(updateBudget());
  };
};
/**
 * Remove a personnel resource from an activity
 * @param {Number} activityIndex Index of the activity to remove the personnel from
 * @param {Number} personnelIndex Index of the personnel to remove
 */

cov_2l6sgwd6il().s[9]++;
export const removePersonnel = (activityIndex, personnelIndex) => {
  cov_2l6sgwd6il().f[2]++;
  cov_2l6sgwd6il().s[10]++;
  return dispatch => {
    cov_2l6sgwd6il().f[3]++;
    cov_2l6sgwd6il().s[11]++;
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/activities/${activityIndex}/statePersonnel/${personnelIndex}`
    });
    cov_2l6sgwd6il().s[12]++;
    dispatch(updateBudget());
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBRERfQVBEX0lURU0iLCJFRElUX0FQRCIsIlJFTU9WRV9BUERfSVRFTSIsInVwZGF0ZUJ1ZGdldCIsInNhdmVQZXJzb25uZWwiLCJhY3Rpdml0eUluZGV4IiwicGVyc29ubmVsSW5kZXgiLCJkYXRhIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInByZXZpb3VzU3RhdGUiLCJpbmRleENhbGN1bGF0ZWQiLCJhcGQiLCJhY3Rpdml0aWVzIiwic3RhdGVQZXJzb25uZWwiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJ0eXBlIiwicGF0aCIsInN0YXRlIiwidmFsdWUiLCJyZW1vdmVQZXJzb25uZWwiXSwic291cmNlcyI6WyJzdGF0ZVBlcnNvbm5lbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBRERfQVBEX0lURU0sIEVESVRfQVBELCBSRU1PVkVfQVBEX0lURU0gfSBmcm9tICcuLi9lZGl0QXBkJztcbmltcG9ydCB7IHVwZGF0ZUJ1ZGdldCB9IGZyb20gJy4uL2J1ZGdldCc7XG5cbi8qKlxuICogQWRkcyBvciB1cGRhdGVzIGEgcGVyc29ubmVsIHJlc291cmNlIGZyb20gYW4gYWN0aXZpdHlcbiAqIEBwYXJhbSB7TnVtYmVyfSBhY3Rpdml0eUluZGV4IEluZGV4IG9mIHRoZSBhY3Rpdml0eSB0aGUgcGVyc29ubmVsIGlzIHBhcnQgb2ZcbiAqIEBwYXJhbSB7TnVtYmVyfSBwZXJzb25uZWxJbmRleCBJbmRleCBvZiB0aGUgcGVyc29ubmVsXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSBwYXlsb2FkIG9mIHRoZSBwZXJzb25uZWwgdG8gYmUgc2F2ZWRcbiAqL1xuZXhwb3J0IGNvbnN0IHNhdmVQZXJzb25uZWwgPSAoYWN0aXZpdHlJbmRleCwgcGVyc29ubmVsSW5kZXgsIGRhdGEpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgY29uc3QgcHJldmlvdXNTdGF0ZSA9IGdldFN0YXRlKCk7XG5cbiAgbGV0IGluZGV4Q2FsY3VsYXRlZCA9IHBlcnNvbm5lbEluZGV4O1xuXG4gIGlmKHByZXZpb3VzU3RhdGUuYXBkLmRhdGEuYWN0aXZpdGllc1thY3Rpdml0eUluZGV4XS5zdGF0ZVBlcnNvbm5lbFtwZXJzb25uZWxJbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgIGluZGV4Q2FsY3VsYXRlZCA9IHByZXZpb3VzU3RhdGUuYXBkLmRhdGEuYWN0aXZpdGllc1thY3Rpdml0eUluZGV4XS5zdGF0ZVBlcnNvbm5lbC5sZW5ndGg7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogQUREX0FQRF9JVEVNLFxuICAgICAgcGF0aDogYC9hY3Rpdml0aWVzLyR7YWN0aXZpdHlJbmRleH0vc3RhdGVQZXJzb25uZWwvLWAsXG4gICAgICBzdGF0ZTogZ2V0U3RhdGUoKVxuICAgIH0pO1xuICB9XG4gIFxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogRURJVF9BUEQsXG4gICAgcGF0aDogYC9hY3Rpdml0aWVzLyR7YWN0aXZpdHlJbmRleH0vc3RhdGVQZXJzb25uZWwvJHtpbmRleENhbGN1bGF0ZWR9YCxcbiAgICB2YWx1ZTogZGF0YVxuICB9KTtcbiAgXG4gIGRpc3BhdGNoKHVwZGF0ZUJ1ZGdldCgpKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgcGVyc29ubmVsIHJlc291cmNlIGZyb20gYW4gYWN0aXZpdHlcbiAqIEBwYXJhbSB7TnVtYmVyfSBhY3Rpdml0eUluZGV4IEluZGV4IG9mIHRoZSBhY3Rpdml0eSB0byByZW1vdmUgdGhlIHBlcnNvbm5lbCBmcm9tXG4gKiBAcGFyYW0ge051bWJlcn0gcGVyc29ubmVsSW5kZXggSW5kZXggb2YgdGhlIHBlcnNvbm5lbCB0byByZW1vdmVcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZVBlcnNvbm5lbCA9IChhY3Rpdml0eUluZGV4LCBwZXJzb25uZWxJbmRleCkgPT4gZGlzcGF0Y2ggPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogUkVNT1ZFX0FQRF9JVEVNLFxuICAgIHBhdGg6IGAvYWN0aXZpdGllcy8ke2FjdGl2aXR5SW5kZXh9L3N0YXRlUGVyc29ubmVsLyR7cGVyc29ubmVsSW5kZXh9YFxuICB9KTtcbiAgZGlzcGF0Y2godXBkYXRlQnVkZ2V0KCkpO1xufTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTs7Ozs7Ozs7O0FBZlosU0FBU0EsWUFBVCxFQUF1QkMsUUFBdkIsRUFBaUNDLGVBQWpDLFFBQXdELFlBQXhEO0FBQ0EsU0FBU0MsWUFBVCxRQUE2QixXQUE3QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsT0FBTyxNQUFNQyxhQUFhLEdBQUcsQ0FBQ0MsYUFBRCxFQUFnQkMsY0FBaEIsRUFBZ0NDLElBQWhDLEtBQXlDO0VBQUE7RUFBQTtFQUFBLFFBQUNDLFFBQUQsRUFBV0MsUUFBWCxLQUF3QjtJQUFBO0lBQzVGLE1BQU1DLGFBQWEsNkJBQUdELFFBQVEsRUFBWCxDQUFuQjtJQUVBLElBQUlFLGVBQWUsNkJBQUdMLGNBQUgsQ0FBbkI7SUFINEY7O0lBSzVGLElBQUdJLGFBQWEsQ0FBQ0UsR0FBZCxDQUFrQkwsSUFBbEIsQ0FBdUJNLFVBQXZCLENBQWtDUixhQUFsQyxFQUFpRFMsY0FBakQsQ0FBZ0VSLGNBQWhFLE1BQW9GUyxTQUF2RixFQUFrRztNQUFBO01BQUE7TUFDaEdKLGVBQWUsR0FBR0QsYUFBYSxDQUFDRSxHQUFkLENBQWtCTCxJQUFsQixDQUF1Qk0sVUFBdkIsQ0FBa0NSLGFBQWxDLEVBQWlEUyxjQUFqRCxDQUFnRUUsTUFBbEY7TUFEZ0c7TUFFaEdSLFFBQVEsQ0FBQztRQUNQUyxJQUFJLEVBQUVqQixZQURDO1FBRVBrQixJQUFJLEVBQUcsZUFBY2IsYUFBYyxtQkFGNUI7UUFHUGMsS0FBSyxFQUFFVixRQUFRO01BSFIsQ0FBRCxDQUFSO0lBS0QsQ0FQRDtNQUFBO0lBQUE7O0lBTDRGO0lBYzVGRCxRQUFRLENBQUM7TUFDUFMsSUFBSSxFQUFFaEIsUUFEQztNQUVQaUIsSUFBSSxFQUFHLGVBQWNiLGFBQWMsbUJBQWtCTSxlQUFnQixFQUY5RDtNQUdQUyxLQUFLLEVBQUViO0lBSEEsQ0FBRCxDQUFSO0lBZDRGO0lBb0I1RkMsUUFBUSxDQUFDTCxZQUFZLEVBQWIsQ0FBUjtFQUNELENBckJxRTtBQXFCckUsQ0FyQk07QUF1QlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsT0FBTyxNQUFNa0IsZUFBZSxHQUFHLENBQUNoQixhQUFELEVBQWdCQyxjQUFoQixLQUFtQztFQUFBO0VBQUE7RUFBQSxPQUFBRSxRQUFRLElBQUk7SUFBQTtJQUFBO0lBQzVFQSxRQUFRLENBQUM7TUFDUFMsSUFBSSxFQUFFZixlQURDO01BRVBnQixJQUFJLEVBQUcsZUFBY2IsYUFBYyxtQkFBa0JDLGNBQWU7SUFGN0QsQ0FBRCxDQUFSO0lBRDRFO0lBSzVFRSxRQUFRLENBQUNMLFlBQVksRUFBYixDQUFSO0VBQ0QsQ0FOaUU7QUFNakUsQ0FOTSJ9