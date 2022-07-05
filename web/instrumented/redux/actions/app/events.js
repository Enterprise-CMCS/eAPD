function cov_1pvnhlygx8() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/app/events.js";
  var hash = "8f4170e110187aa50c24fb5c8eb1531084be53cc";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/app/events.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 2
        },
        end: {
          line: 13,
          column: 3
        }
      },
      "1": {
        start: {
          line: 6,
          column: 2
        },
        end: {
          line: 13,
          column: 3
        }
      },
      "2": {
        start: {
          line: 7,
          column: 18
        },
        end: {
          line: 7,
          column: 28
        }
      },
      "3": {
        start: {
          line: 8,
          column: 26
        },
        end: {
          line: 8,
          column: 46
        }
      },
      "4": {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 12,
          column: 49
        }
      },
      "5": {
        start: {
          line: 12,
          column: 20
        },
        end: {
          line: 12,
          column: 46
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 5,
            column: 2
          },
          end: {
            line: 5,
            column: 3
          }
        },
        loc: {
          start: {
            line: 6,
            column: 2
          },
          end: {
            line: 13,
            column: 3
          }
        },
        line: 6
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 6,
            column: 2
          },
          end: {
            line: 6,
            column: 3
          }
        },
        loc: {
          start: {
            line: 6,
            column: 26
          },
          end: {
            line: 13,
            column: 3
          }
        },
        line: 6
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 12,
            column: 12
          },
          end: {
            line: 12,
            column: 13
          }
        },
        loc: {
          start: {
            line: 12,
            column: 20
          },
          end: {
            line: 12,
            column: 46
          }
        },
        line: 12
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 5,
            column: 14
          },
          end: {
            line: 5,
            column: 29
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 5,
            column: 25
          },
          end: {
            line: 5,
            column: 29
          }
        }],
        line: 5
      },
      "1": {
        loc: {
          start: {
            line: 12,
            column: 20
          },
          end: {
            line: 12,
            column: 46
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 12,
            column: 31
          },
          end: {
            line: 12,
            column: 39
          }
        }, {
          start: {
            line: 12,
            column: 42
          },
          end: {
            line: 12,
            column: 46
          }
        }],
        line: 12
      }
    },
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
    b: {
      "0": [0],
      "1": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "8f4170e110187aa50c24fb5c8eb1531084be53cc"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1pvnhlygx8 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1pvnhlygx8();
import axios from '../../../util/api';
import { selectApdData } from '../../selectors/apd.selectors';
cov_1pvnhlygx8().s[0]++;
export const saveApdEvent = (eventType, metadata = (cov_1pvnhlygx8().b[0][0]++, null)) => {
  cov_1pvnhlygx8().f[0]++;
  cov_1pvnhlygx8().s[1]++;
  return (dispatch, getState) => {
    cov_1pvnhlygx8().f[1]++;
    const state = (cov_1pvnhlygx8().s[2]++, getState());
    const {
      id: apdID
    } = (cov_1pvnhlygx8().s[3]++, selectApdData(state));
    cov_1pvnhlygx8().s[4]++;
    return axios.post(`/apds/${apdID}/events`, {
      eventType,
      metadata
    }).then(res => {
      cov_1pvnhlygx8().f[2]++;
      cov_1pvnhlygx8().s[5]++;
      return res.data ? (cov_1pvnhlygx8().b[1][0]++, res.data) : (cov_1pvnhlygx8().b[1][1]++, null);
    });
  };
}; // Stryker disable next-line ObjectLiteral

export default {
  saveApdEvent
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJheGlvcyIsInNlbGVjdEFwZERhdGEiLCJzYXZlQXBkRXZlbnQiLCJldmVudFR5cGUiLCJtZXRhZGF0YSIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsImlkIiwiYXBkSUQiLCJwb3N0IiwidGhlbiIsInJlcyIsImRhdGEiXSwic291cmNlcyI6WyJldmVudHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJy4uLy4uLy4uL3V0aWwvYXBpJztcbmltcG9ydCB7IHNlbGVjdEFwZERhdGEgfSBmcm9tICcuLi8uLi9zZWxlY3RvcnMvYXBkLnNlbGVjdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBzYXZlQXBkRXZlbnQgPVxuICAoZXZlbnRUeXBlLCBtZXRhZGF0YSA9IG51bGwpID0+XG4gIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKCk7XG4gICAgY29uc3QgeyBpZDogYXBkSUQgfSA9IHNlbGVjdEFwZERhdGEoc3RhdGUpO1xuXG4gICAgcmV0dXJuIGF4aW9zXG4gICAgICAucG9zdChgL2FwZHMvJHthcGRJRH0vZXZlbnRzYCwgeyBldmVudFR5cGUsIG1ldGFkYXRhIH0pXG4gICAgICAudGhlbihyZXMgPT4gKHJlcy5kYXRhID8gcmVzLmRhdGEgOiBudWxsKSk7XG4gIH07XG5cbi8vIFN0cnlrZXIgZGlzYWJsZSBuZXh0LWxpbmUgT2JqZWN0TGl0ZXJhbFxuZXhwb3J0IGRlZmF1bHQgeyBzYXZlQXBkRXZlbnQgfTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTs7Ozs7Ozs7O0FBZlosT0FBT0EsS0FBUCxNQUFrQixtQkFBbEI7QUFDQSxTQUFTQyxhQUFULFFBQThCLCtCQUE5Qjs7QUFFQSxPQUFPLE1BQU1DLFlBQVksR0FDdkIsQ0FBQ0MsU0FBRCxFQUFZQyxRQUFRLGdDQUFHLElBQUgsQ0FBcEIsS0FDQTtFQUFBO0VBQUE7RUFBQSxRQUFDQyxRQUFELEVBQVdDLFFBQVgsS0FBd0I7SUFBQTtJQUN0QixNQUFNQyxLQUFLLDZCQUFHRCxRQUFRLEVBQVgsQ0FBWDtJQUNBLE1BQU07TUFBRUUsRUFBRSxFQUFFQztJQUFOLDhCQUFnQlIsYUFBYSxDQUFDTSxLQUFELENBQTdCLENBQU47SUFGc0I7SUFJdEIsT0FBT1AsS0FBSyxDQUNUVSxJQURJLENBQ0UsU0FBUUQsS0FBTSxTQURoQixFQUMwQjtNQUFFTixTQUFGO01BQWFDO0lBQWIsQ0FEMUIsRUFFSk8sSUFGSSxDQUVDQyxHQUFHLElBQUs7TUFBQTtNQUFBO01BQUEsT0FBQUEsR0FBRyxDQUFDQyxJQUFKLGdDQUFXRCxHQUFHLENBQUNDLElBQWYsaUNBQXNCLElBQXRCO0lBQTBCLENBRm5DLENBQVA7RUFHRCxDQVBEO0FBT0MsQ0FUSSxDLENBV1A7O0FBQ0EsZUFBZTtFQUFFWDtBQUFGLENBQWYifQ==