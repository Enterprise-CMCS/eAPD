function cov_11wheaxwmu() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/reducers/aria.js";
  var hash = "49031034721e4d0f466db56c94c83b4e531a15b9";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/reducers/aria.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 21
        },
        end: {
          line: 5,
          column: 1
        }
      },
      "1": {
        start: {
          line: 8,
          column: 16
        },
        end: {
          line: 15,
          column: 1
        }
      },
      "2": {
        start: {
          line: 9,
          column: 2
        },
        end: {
          line: 14,
          column: 3
        }
      },
      "3": {
        start: {
          line: 11,
          column: 6
        },
        end: {
          line: 11,
          column: 51
        }
      },
      "4": {
        start: {
          line: 13,
          column: 6
        },
        end: {
          line: 13,
          column: 19
        }
      },
      "5": {
        start: {
          line: 17,
          column: 35
        },
        end: {
          line: 17,
          column: 72
        }
      },
      "6": {
        start: {
          line: 17,
          column: 44
        },
        end: {
          line: 17,
          column: 72
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 8,
            column: 16
          },
          end: {
            line: 8,
            column: 17
          }
        },
        loc: {
          start: {
            line: 8,
            column: 50
          },
          end: {
            line: 15,
            column: 1
          }
        },
        line: 8
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 17,
            column: 35
          },
          end: {
            line: 17,
            column: 36
          }
        },
        loc: {
          start: {
            line: 17,
            column: 44
          },
          end: {
            line: 17,
            column: 72
          }
        },
        line: 17
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 8,
            column: 17
          },
          end: {
            line: 8,
            column: 37
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 8,
            column: 25
          },
          end: {
            line: 8,
            column: 37
          }
        }],
        line: 8
      },
      "1": {
        loc: {
          start: {
            line: 9,
            column: 2
          },
          end: {
            line: 14,
            column: 3
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 10,
            column: 4
          },
          end: {
            line: 11,
            column: 51
          }
        }, {
          start: {
            line: 12,
            column: 4
          },
          end: {
            line: 13,
            column: 19
          }
        }],
        line: 9
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {
      "0": [0],
      "1": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "49031034721e4d0f466db56c94c83b4e531a15b9"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_11wheaxwmu = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_11wheaxwmu();
import { ARIA_ANNOUNCE_CHANGE } from '../actions/aria';
const initialState = (cov_11wheaxwmu().s[0]++, {
  ariaRegionMessage: ''
}); // eslint-disable-next-line default-param-last

cov_11wheaxwmu().s[1]++;

const reducer = (state = (cov_11wheaxwmu().b[0][0]++, initialState), action) => {
  cov_11wheaxwmu().f[0]++;
  cov_11wheaxwmu().s[2]++;

  switch (action.type) {
    case ARIA_ANNOUNCE_CHANGE:
      cov_11wheaxwmu().b[1][0]++;
      cov_11wheaxwmu().s[3]++;
      return {
        ariaRegionMessage: action.message
      };

    default:
      cov_11wheaxwmu().b[1][1]++;
      cov_11wheaxwmu().s[4]++;
      return state;
  }
};

cov_11wheaxwmu().s[5]++;
export const getAriaAnnouncement = state => {
  cov_11wheaxwmu().f[1]++;
  cov_11wheaxwmu().s[6]++;
  return state.aria.ariaRegionMessage;
};
export default reducer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBUklBX0FOTk9VTkNFX0NIQU5HRSIsImluaXRpYWxTdGF0ZSIsImFyaWFSZWdpb25NZXNzYWdlIiwicmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsIm1lc3NhZ2UiLCJnZXRBcmlhQW5ub3VuY2VtZW50IiwiYXJpYSJdLCJzb3VyY2VzIjpbImFyaWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVJJQV9BTk5PVU5DRV9DSEFOR0UgfSBmcm9tICcuLi9hY3Rpb25zL2FyaWEnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIGFyaWFSZWdpb25NZXNzYWdlOiAnJ1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtcGFyYW0tbGFzdFxuY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFSSUFfQU5OT1VOQ0VfQ0hBTkdFOlxuICAgICAgcmV0dXJuIHsgYXJpYVJlZ2lvbk1lc3NhZ2U6IGFjdGlvbi5tZXNzYWdlIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEFyaWFBbm5vdW5jZW1lbnQgPSBzdGF0ZSA9PiBzdGF0ZS5hcmlhLmFyaWFSZWdpb25NZXNzYWdlO1xuXG5leHBvcnQgZGVmYXVsdCByZWR1Y2VyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTs7Ozs7Ozs7O0FBZlosU0FBU0Esb0JBQVQsUUFBcUMsaUJBQXJDO0FBRUEsTUFBTUMsWUFBWSw2QkFBRztFQUNuQkMsaUJBQWlCLEVBQUU7QUFEQSxDQUFILENBQWxCLEMsQ0FJQTs7OztBQUNBLE1BQU1DLE9BQU8sR0FBRyxDQUFDQyxLQUFLLGdDQUFHSCxZQUFILENBQU4sRUFBdUJJLE1BQXZCLEtBQWtDO0VBQUE7RUFBQTs7RUFDaEQsUUFBUUEsTUFBTSxDQUFDQyxJQUFmO0lBQ0UsS0FBS04sb0JBQUw7TUFBQTtNQUFBO01BQ0UsT0FBTztRQUFFRSxpQkFBaUIsRUFBRUcsTUFBTSxDQUFDRTtNQUE1QixDQUFQOztJQUNGO01BQUE7TUFBQTtNQUNFLE9BQU9ILEtBQVA7RUFKSjtBQU1ELENBUEQ7OztBQVNBLE9BQU8sTUFBTUksbUJBQW1CLEdBQUdKLEtBQUssSUFBSTtFQUFBO0VBQUE7RUFBQSxPQUFBQSxLQUFLLENBQUNLLElBQU4sQ0FBV1AsaUJBQVg7QUFBNEIsQ0FBakU7QUFFUCxlQUFlQyxPQUFmIn0=