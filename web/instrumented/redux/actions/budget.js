function cov_12hc9dwhfv() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/budget.js";
  var hash = "b2073659268d6b7d5fe2a854634adbc19f0761ae";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/budget.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 29
        },
        end: {
          line: 1,
          column: 44
        }
      },
      "1": {
        start: {
          line: 3,
          column: 28
        },
        end: {
          line: 4,
          column: 54
        }
      },
      "2": {
        start: {
          line: 3,
          column: 34
        },
        end: {
          line: 4,
          column: 54
        }
      },
      "3": {
        start: {
          line: 4,
          column: 2
        },
        end: {
          line: 4,
          column: 54
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 3,
            column: 28
          },
          end: {
            line: 3,
            column: 29
          }
        },
        loc: {
          start: {
            line: 3,
            column: 34
          },
          end: {
            line: 4,
            column: 54
          }
        },
        line: 3
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 3,
            column: 34
          },
          end: {
            line: 3,
            column: 35
          }
        },
        loc: {
          start: {
            line: 4,
            column: 2
          },
          end: {
            line: 4,
            column: 54
          }
        },
        line: 4
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
    hash: "b2073659268d6b7d5fe2a854634adbc19f0761ae"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_12hc9dwhfv = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_12hc9dwhfv();
export const UPDATE_BUDGET = (cov_12hc9dwhfv().s[0]++, 'UPDATE_BUDGET');
cov_12hc9dwhfv().s[1]++;
export const updateBudget = () => {
  cov_12hc9dwhfv().f[0]++;
  cov_12hc9dwhfv().s[2]++;
  return (dispatch, getState) => {
    cov_12hc9dwhfv().f[1]++;
    cov_12hc9dwhfv().s[3]++;
    return dispatch({
      type: UPDATE_BUDGET,
      state: getState()
    });
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVUERBVEVfQlVER0VUIiwidXBkYXRlQnVkZ2V0IiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInR5cGUiLCJzdGF0ZSJdLCJzb3VyY2VzIjpbImJ1ZGdldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgVVBEQVRFX0JVREdFVCA9ICdVUERBVEVfQlVER0VUJztcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUJ1ZGdldCA9ICgpID0+IChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+XG4gIGRpc3BhdGNoKHsgdHlwZTogVVBEQVRFX0JVREdFVCwgc3RhdGU6IGdldFN0YXRlKCkgfSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7Ozs7Ozs7OztBQWZaLE9BQU8sTUFBTUEsYUFBYSw2QkFBRyxlQUFILENBQW5COztBQUVQLE9BQU8sTUFBTUMsWUFBWSxHQUFHLE1BQU07RUFBQTtFQUFBO0VBQUEsUUFBQ0MsUUFBRCxFQUFXQyxRQUFYLEtBQ2hDO0lBQUE7SUFBQTtJQUFBLE9BQUFELFFBQVEsQ0FBQztNQUFFRSxJQUFJLEVBQUVKLGFBQVI7TUFBdUJLLEtBQUssRUFBRUYsUUFBUTtJQUF0QyxDQUFELENBQVI7RUFBb0QsQ0FEcEI7QUFDb0IsQ0FEL0MifQ==