function cov_diurbuckm() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/editApd/keyPersonnel.js";
  var hash = "21bf8be697a486adb988142f0b1fd078ce069f3a";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/editApd/keyPersonnel.js",
    statementMap: {
      "0": {
        start: {
          line: 9,
          column: 32
        },
        end: {
          line: 30,
          column: 1
        }
      },
      "1": {
        start: {
          line: 9,
          column: 49
        },
        end: {
          line: 30,
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
          column: 29
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
          column: 83
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
          line: 29,
          column: 2
        },
        end: {
          line: 29,
          column: 27
        }
      },
      "9": {
        start: {
          line: 37,
          column: 34
        },
        end: {
          line: 43,
          column: 1
        }
      },
      "10": {
        start: {
          line: 37,
          column: 43
        },
        end: {
          line: 43,
          column: 1
        }
      },
      "11": {
        start: {
          line: 38,
          column: 2
        },
        end: {
          line: 41,
          column: 5
        }
      },
      "12": {
        start: {
          line: 42,
          column: 2
        },
        end: {
          line: 42,
          column: 27
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 9,
            column: 32
          },
          end: {
            line: 9,
            column: 33
          }
        },
        loc: {
          start: {
            line: 9,
            column: 49
          },
          end: {
            line: 30,
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
            column: 49
          },
          end: {
            line: 9,
            column: 50
          }
        },
        loc: {
          start: {
            line: 9,
            column: 73
          },
          end: {
            line: 30,
            column: 1
          }
        },
        line: 9
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 37,
            column: 34
          },
          end: {
            line: 37,
            column: 35
          }
        },
        loc: {
          start: {
            line: 37,
            column: 43
          },
          end: {
            line: 43,
            column: 1
          }
        },
        line: 37
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 37,
            column: 43
          },
          end: {
            line: 37,
            column: 44
          }
        },
        loc: {
          start: {
            line: 37,
            column: 55
          },
          end: {
            line: 43,
            column: 1
          }
        },
        line: 37
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
    hash: "21bf8be697a486adb988142f0b1fd078ce069f3a"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_diurbuckm = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_diurbuckm();
import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from './symbols';
import { updateBudget } from '../budget';
/**
 * Adds or updates a key personnel resource from an apd
 * @param {Number} index Index of the key personnel
 * @param {Object} data payload of the key personnel to be saved
 */

cov_diurbuckm().s[0]++;
export const saveKeyPersonnel = (index, data) => {
  cov_diurbuckm().f[0]++;
  cov_diurbuckm().s[1]++;
  return (dispatch, getState) => {
    cov_diurbuckm().f[1]++;
    const previousState = (cov_diurbuckm().s[2]++, getState());
    let indexCalculated = (cov_diurbuckm().s[3]++, index);
    cov_diurbuckm().s[4]++;

    if (previousState.apd.data.keyStatePersonnel.keyPersonnel[index] === undefined) {
      cov_diurbuckm().b[0][0]++;
      cov_diurbuckm().s[5]++;
      indexCalculated = previousState.apd.data.keyStatePersonnel.keyPersonnel.length;
      cov_diurbuckm().s[6]++;
      dispatch({
        type: ADD_APD_ITEM,
        path: '/keyStatePersonnel/keyPersonnel/-',
        state: getState()
      });
    } else {
      cov_diurbuckm().b[0][1]++;
    }

    cov_diurbuckm().s[7]++;
    dispatch({
      type: EDIT_APD,
      path: `/keyStatePersonnel/keyPersonnel/${indexCalculated}`,
      value: data
    });
    cov_diurbuckm().s[8]++;
    dispatch(updateBudget());
  };
};
/**
 * Remove a key personnel from the APD
 * @param {Number} index Index of the key person to remove
 * @param {Object} di Dependency injection object
 */

cov_diurbuckm().s[9]++;
export const removeKeyPersonnel = index => {
  cov_diurbuckm().f[2]++;
  cov_diurbuckm().s[10]++;
  return dispatch => {
    cov_diurbuckm().f[3]++;
    cov_diurbuckm().s[11]++;
    dispatch({
      type: REMOVE_APD_ITEM,
      path: `/keyStatePersonnel/keyPersonnel/${index}`
    });
    cov_diurbuckm().s[12]++;
    dispatch(updateBudget());
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBRERfQVBEX0lURU0iLCJFRElUX0FQRCIsIlJFTU9WRV9BUERfSVRFTSIsInVwZGF0ZUJ1ZGdldCIsInNhdmVLZXlQZXJzb25uZWwiLCJpbmRleCIsImRhdGEiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwicHJldmlvdXNTdGF0ZSIsImluZGV4Q2FsY3VsYXRlZCIsImFwZCIsImtleVN0YXRlUGVyc29ubmVsIiwia2V5UGVyc29ubmVsIiwidW5kZWZpbmVkIiwibGVuZ3RoIiwidHlwZSIsInBhdGgiLCJzdGF0ZSIsInZhbHVlIiwicmVtb3ZlS2V5UGVyc29ubmVsIl0sInNvdXJjZXMiOlsia2V5UGVyc29ubmVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFERF9BUERfSVRFTSwgRURJVF9BUEQsIFJFTU9WRV9BUERfSVRFTSB9IGZyb20gJy4vc3ltYm9scyc7XG5pbXBvcnQgeyB1cGRhdGVCdWRnZXQgfSBmcm9tICcuLi9idWRnZXQnO1xuXG4vKipcbiAqIEFkZHMgb3IgdXBkYXRlcyBhIGtleSBwZXJzb25uZWwgcmVzb3VyY2UgZnJvbSBhbiBhcGRcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBJbmRleCBvZiB0aGUga2V5IHBlcnNvbm5lbFxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgcGF5bG9hZCBvZiB0aGUga2V5IHBlcnNvbm5lbCB0byBiZSBzYXZlZFxuICovXG5leHBvcnQgY29uc3Qgc2F2ZUtleVBlcnNvbm5lbCA9IChpbmRleCwgZGF0YSkgPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICBjb25zdCBwcmV2aW91c1N0YXRlID0gZ2V0U3RhdGUoKTtcblxuICBsZXQgaW5kZXhDYWxjdWxhdGVkID0gaW5kZXg7XG4gIFxuICBpZihwcmV2aW91c1N0YXRlLmFwZC5kYXRhLmtleVN0YXRlUGVyc29ubmVsLmtleVBlcnNvbm5lbFtpbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgIGluZGV4Q2FsY3VsYXRlZCA9IHByZXZpb3VzU3RhdGUuYXBkLmRhdGEua2V5U3RhdGVQZXJzb25uZWwua2V5UGVyc29ubmVsLmxlbmd0aDtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBBRERfQVBEX0lURU0sXG4gICAgICBwYXRoOiAnL2tleVN0YXRlUGVyc29ubmVsL2tleVBlcnNvbm5lbC8tJyxcbiAgICAgIHN0YXRlOiBnZXRTdGF0ZSgpXG4gICAgfSk7XG4gIH1cbiAgXG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBFRElUX0FQRCxcbiAgICBwYXRoOiBgL2tleVN0YXRlUGVyc29ubmVsL2tleVBlcnNvbm5lbC8ke2luZGV4Q2FsY3VsYXRlZH1gLFxuICAgIHZhbHVlOiBkYXRhXG4gIH0pO1xuICBcbiAgZGlzcGF0Y2godXBkYXRlQnVkZ2V0KCkpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYSBrZXkgcGVyc29ubmVsIGZyb20gdGhlIEFQRFxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IEluZGV4IG9mIHRoZSBrZXkgcGVyc29uIHRvIHJlbW92ZVxuICogQHBhcmFtIHtPYmplY3R9IGRpIERlcGVuZGVuY3kgaW5qZWN0aW9uIG9iamVjdFxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlS2V5UGVyc29ubmVsID0gaW5kZXggPT4gZGlzcGF0Y2ggPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogUkVNT1ZFX0FQRF9JVEVNLFxuICAgIHBhdGg6IGAva2V5U3RhdGVQZXJzb25uZWwva2V5UGVyc29ubmVsLyR7aW5kZXh9YFxuICB9KTtcbiAgZGlzcGF0Y2godXBkYXRlQnVkZ2V0KCkpO1xufTsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTs7Ozs7Ozs7O0FBZlosU0FBU0EsWUFBVCxFQUF1QkMsUUFBdkIsRUFBaUNDLGVBQWpDLFFBQXdELFdBQXhEO0FBQ0EsU0FBU0MsWUFBVCxRQUE2QixXQUE3QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE9BQU8sTUFBTUMsZ0JBQWdCLEdBQUcsQ0FBQ0MsS0FBRCxFQUFRQyxJQUFSLEtBQWlCO0VBQUE7RUFBQTtFQUFBLFFBQUNDLFFBQUQsRUFBV0MsUUFBWCxLQUF3QjtJQUFBO0lBQ3ZFLE1BQU1DLGFBQWEsNEJBQUdELFFBQVEsRUFBWCxDQUFuQjtJQUVBLElBQUlFLGVBQWUsNEJBQUdMLEtBQUgsQ0FBbkI7SUFIdUU7O0lBS3ZFLElBQUdJLGFBQWEsQ0FBQ0UsR0FBZCxDQUFrQkwsSUFBbEIsQ0FBdUJNLGlCQUF2QixDQUF5Q0MsWUFBekMsQ0FBc0RSLEtBQXRELE1BQWlFUyxTQUFwRSxFQUErRTtNQUFBO01BQUE7TUFDN0VKLGVBQWUsR0FBR0QsYUFBYSxDQUFDRSxHQUFkLENBQWtCTCxJQUFsQixDQUF1Qk0saUJBQXZCLENBQXlDQyxZQUF6QyxDQUFzREUsTUFBeEU7TUFENkU7TUFFN0VSLFFBQVEsQ0FBQztRQUNQUyxJQUFJLEVBQUVoQixZQURDO1FBRVBpQixJQUFJLEVBQUUsbUNBRkM7UUFHUEMsS0FBSyxFQUFFVixRQUFRO01BSFIsQ0FBRCxDQUFSO0lBS0QsQ0FQRDtNQUFBO0lBQUE7O0lBTHVFO0lBY3ZFRCxRQUFRLENBQUM7TUFDUFMsSUFBSSxFQUFFZixRQURDO01BRVBnQixJQUFJLEVBQUcsbUNBQWtDUCxlQUFnQixFQUZsRDtNQUdQUyxLQUFLLEVBQUViO0lBSEEsQ0FBRCxDQUFSO0lBZHVFO0lBb0J2RUMsUUFBUSxDQUFDSixZQUFZLEVBQWIsQ0FBUjtFQUNELENBckJnRDtBQXFCaEQsQ0FyQk07QUF1QlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsT0FBTyxNQUFNaUIsa0JBQWtCLEdBQUdmLEtBQUssSUFBSTtFQUFBO0VBQUE7RUFBQSxPQUFBRSxRQUFRLElBQUk7SUFBQTtJQUFBO0lBQ3JEQSxRQUFRLENBQUM7TUFDUFMsSUFBSSxFQUFFZCxlQURDO01BRVBlLElBQUksRUFBRyxtQ0FBa0NaLEtBQU07SUFGeEMsQ0FBRCxDQUFSO0lBRHFEO0lBS3JERSxRQUFRLENBQUNKLFlBQVksRUFBYixDQUFSO0VBQ0QsQ0FOMEM7QUFNMUMsQ0FOTSJ9