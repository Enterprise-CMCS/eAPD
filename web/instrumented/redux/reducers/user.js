function cov_bpa0sve2k() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/reducers/user.js";
  var hash = "b8388b0786e9e5c64c199ee897c1c6a8bb9640e0";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/reducers/user.js",
    statementMap: {
      "0": {
        start: {
          line: 9,
          column: 15
        },
        end: {
          line: 9,
          column: 68
        }
      },
      "1": {
        start: {
          line: 10,
          column: 18
        },
        end: {
          line: 10,
          column: 70
        }
      },
      "2": {
        start: {
          line: 10,
          column: 56
        },
        end: {
          line: 10,
          column: 67
        }
      },
      "3": {
        start: {
          line: 12,
          column: 21
        },
        end: {
          line: 17,
          column: 1
        }
      },
      "4": {
        start: {
          line: 20,
          column: 13
        },
        end: {
          line: 40,
          column: 1
        }
      },
      "5": {
        start: {
          line: 21,
          column: 2
        },
        end: {
          line: 39,
          column: 3
        }
      },
      "6": {
        start: {
          line: 23,
          column: 6
        },
        end: {
          line: 23,
          column: 56
        }
      },
      "7": {
        start: {
          line: 26,
          column: 6
        },
        end: {
          line: 32,
          column: 8
        }
      },
      "8": {
        start: {
          line: 34,
          column: 6
        },
        end: {
          line: 34,
          column: 56
        }
      },
      "9": {
        start: {
          line: 36,
          column: 6
        },
        end: {
          line: 36,
          column: 26
        }
      },
      "10": {
        start: {
          line: 38,
          column: 6
        },
        end: {
          line: 38,
          column: 19
        }
      },
      "11": {
        start: {
          line: 42,
          column: 27
        },
        end: {
          line: 42,
          column: 57
        }
      },
      "12": {
        start: {
          line: 42,
          column: 36
        },
        end: {
          line: 42,
          column: 57
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 10,
            column: 50
          },
          end: {
            line: 10,
            column: 51
          }
        },
        loc: {
          start: {
            line: 10,
            column: 56
          },
          end: {
            line: 10,
            column: 67
          }
        },
        line: 10
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 20,
            column: 13
          },
          end: {
            line: 20,
            column: 14
          }
        },
        loc: {
          start: {
            line: 20,
            column: 47
          },
          end: {
            line: 40,
            column: 1
          }
        },
        line: 20
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 42,
            column: 27
          },
          end: {
            line: 42,
            column: 28
          }
        },
        loc: {
          start: {
            line: 42,
            column: 36
          },
          end: {
            line: 42,
            column: 57
          }
        },
        line: 42
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 20,
            column: 14
          },
          end: {
            line: 20,
            column: 34
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 20,
            column: 22
          },
          end: {
            line: 20,
            column: 34
          }
        }],
        line: 20
      },
      "1": {
        loc: {
          start: {
            line: 21,
            column: 2
          },
          end: {
            line: 39,
            column: 3
          }
        },
        type: "switch",
        locations: [{
          start: {
            line: 22,
            column: 4
          },
          end: {
            line: 23,
            column: 56
          }
        }, {
          start: {
            line: 24,
            column: 4
          },
          end: {
            line: 24,
            column: 26
          }
        }, {
          start: {
            line: 25,
            column: 4
          },
          end: {
            line: 32,
            column: 8
          }
        }, {
          start: {
            line: 33,
            column: 4
          },
          end: {
            line: 34,
            column: 56
          }
        }, {
          start: {
            line: 35,
            column: 4
          },
          end: {
            line: 36,
            column: 26
          }
        }, {
          start: {
            line: 37,
            column: 4
          },
          end: {
            line: 38,
            column: 19
          }
        }],
        line: 21
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
      "2": 0
    },
    b: {
      "0": [0],
      "1": [0, 0, 0, 0, 0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "b8388b0786e9e5c64c199ee897c1c6a8bb9640e0"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_bpa0sve2k = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_bpa0sve2k();
import { LOGOUT_SUCCESS, UPDATE_USER_INFO } from '../actions/auth';
import { ADMIN_EDIT_ME_ERROR, ADMIN_EDIT_ME_REQUEST, ADMIN_EDIT_ME_SUCCESS } from '../actions/admin';
const fields = (cov_bpa0sve2k().s[0]++, ['id', 'email', 'name', 'position', 'phone', 'state']);
const fieldsObj = (cov_bpa0sve2k().s[1]++, Object.assign({}, ...fields.map(f => {
  cov_bpa0sve2k().f[0]++;
  cov_bpa0sve2k().s[2]++;
  return {
    [f]: ''
  };
})));
const initialState = (cov_bpa0sve2k().s[3]++, {
  data: { ...fieldsObj
  },
  fetching: false,
  loaded: false,
  error: false
}); // eslint-disable-next-line default-param-last

cov_bpa0sve2k().s[4]++;

const user = (state = (cov_bpa0sve2k().b[0][0]++, initialState), action) => {
  cov_bpa0sve2k().f[1]++;
  cov_bpa0sve2k().s[5]++;

  switch (action.type) {
    case ADMIN_EDIT_ME_REQUEST:
      cov_bpa0sve2k().b[1][0]++;
      cov_bpa0sve2k().s[6]++;
      return { ...state,
        error: false,
        fetching: true
      };

    case UPDATE_USER_INFO:
      cov_bpa0sve2k().b[1][1]++;

    case ADMIN_EDIT_ME_SUCCESS:
      cov_bpa0sve2k().b[1][2]++;
      cov_bpa0sve2k().s[7]++;
      return { ...state,
        error: false,
        fetching: false,
        loaded: true,
        data: { ...action.data
        }
      };

    case ADMIN_EDIT_ME_ERROR:
      cov_bpa0sve2k().b[1][3]++;
      cov_bpa0sve2k().s[8]++;
      return { ...state,
        error: true,
        fetching: false
      };

    case LOGOUT_SUCCESS:
      cov_bpa0sve2k().b[1][4]++;
      cov_bpa0sve2k().s[9]++;
      return initialState;

    default:
      cov_bpa0sve2k().b[1][5]++;
      cov_bpa0sve2k().s[10]++;
      return state;
  }
};

cov_bpa0sve2k().s[11]++;
export const selectState = state => {
  cov_bpa0sve2k().f[2]++;
  cov_bpa0sve2k().s[12]++;
  return state.user.data.state;
};
export default user;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJMT0dPVVRfU1VDQ0VTUyIsIlVQREFURV9VU0VSX0lORk8iLCJBRE1JTl9FRElUX01FX0VSUk9SIiwiQURNSU5fRURJVF9NRV9SRVFVRVNUIiwiQURNSU5fRURJVF9NRV9TVUNDRVNTIiwiZmllbGRzIiwiZmllbGRzT2JqIiwiT2JqZWN0IiwiYXNzaWduIiwibWFwIiwiZiIsImluaXRpYWxTdGF0ZSIsImRhdGEiLCJmZXRjaGluZyIsImxvYWRlZCIsImVycm9yIiwidXNlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsInNlbGVjdFN0YXRlIl0sInNvdXJjZXMiOlsidXNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMT0dPVVRfU1VDQ0VTUywgVVBEQVRFX1VTRVJfSU5GTyB9IGZyb20gJy4uL2FjdGlvbnMvYXV0aCc7XG5cbmltcG9ydCB7XG4gIEFETUlOX0VESVRfTUVfRVJST1IsXG4gIEFETUlOX0VESVRfTUVfUkVRVUVTVCxcbiAgQURNSU5fRURJVF9NRV9TVUNDRVNTXG59IGZyb20gJy4uL2FjdGlvbnMvYWRtaW4nO1xuXG5jb25zdCBmaWVsZHMgPSBbJ2lkJywgJ2VtYWlsJywgJ25hbWUnLCAncG9zaXRpb24nLCAncGhvbmUnLCAnc3RhdGUnXTtcbmNvbnN0IGZpZWxkc09iaiA9IE9iamVjdC5hc3NpZ24oe30sIC4uLmZpZWxkcy5tYXAoZiA9PiAoeyBbZl06ICcnIH0pKSk7XG5cbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgZGF0YTogeyAuLi5maWVsZHNPYmogfSxcbiAgZmV0Y2hpbmc6IGZhbHNlLFxuICBsb2FkZWQ6IGZhbHNlLFxuICBlcnJvcjogZmFsc2Vcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZWZhdWx0LXBhcmFtLWxhc3RcbmNvbnN0IHVzZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBRE1JTl9FRElUX01FX1JFUVVFU1Q6XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZXJyb3I6IGZhbHNlLCBmZXRjaGluZzogdHJ1ZSB9O1xuICAgIGNhc2UgVVBEQVRFX1VTRVJfSU5GTzpcbiAgICBjYXNlIEFETUlOX0VESVRfTUVfU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgIGZldGNoaW5nOiBmYWxzZSxcbiAgICAgICAgbG9hZGVkOiB0cnVlLFxuICAgICAgICBkYXRhOiB7IC4uLmFjdGlvbi5kYXRhIH1cbiAgICAgIH07XG4gICAgY2FzZSBBRE1JTl9FRElUX01FX0VSUk9SOlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGVycm9yOiB0cnVlLCBmZXRjaGluZzogZmFsc2UgfTtcbiAgICBjYXNlIExPR09VVF9TVUNDRVNTOlxuICAgICAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0U3RhdGUgPSBzdGF0ZSA9PiBzdGF0ZS51c2VyLmRhdGEuc3RhdGU7XG5cbmV4cG9ydCBkZWZhdWx0IHVzZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTs7Ozs7Ozs7O0FBZlosU0FBU0EsY0FBVCxFQUF5QkMsZ0JBQXpCLFFBQWlELGlCQUFqRDtBQUVBLFNBQ0VDLG1CQURGLEVBRUVDLHFCQUZGLEVBR0VDLHFCQUhGLFFBSU8sa0JBSlA7QUFNQSxNQUFNQyxNQUFNLDRCQUFHLENBQUMsSUFBRCxFQUFPLE9BQVAsRUFBZ0IsTUFBaEIsRUFBd0IsVUFBeEIsRUFBb0MsT0FBcEMsRUFBNkMsT0FBN0MsQ0FBSCxDQUFaO0FBQ0EsTUFBTUMsU0FBUyw0QkFBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQixHQUFHSCxNQUFNLENBQUNJLEdBQVAsQ0FBV0MsQ0FBQyxJQUFLO0VBQUE7RUFBQTtFQUFBO0lBQUUsQ0FBQ0EsQ0FBRCxHQUFLO0VBQVA7QUFBVyxDQUE1QixDQUFyQixDQUFILENBQWY7QUFFQSxNQUFNQyxZQUFZLDRCQUFHO0VBQ25CQyxJQUFJLEVBQUUsRUFBRSxHQUFHTjtFQUFMLENBRGE7RUFFbkJPLFFBQVEsRUFBRSxLQUZTO0VBR25CQyxNQUFNLEVBQUUsS0FIVztFQUluQkMsS0FBSyxFQUFFO0FBSlksQ0FBSCxDQUFsQixDLENBT0E7Ozs7QUFDQSxNQUFNQyxJQUFJLEdBQUcsQ0FBQ0MsS0FBSywrQkFBR04sWUFBSCxDQUFOLEVBQXVCTyxNQUF2QixLQUFrQztFQUFBO0VBQUE7O0VBQzdDLFFBQVFBLE1BQU0sQ0FBQ0MsSUFBZjtJQUNFLEtBQUtoQixxQkFBTDtNQUFBO01BQUE7TUFDRSxPQUFPLEVBQUUsR0FBR2MsS0FBTDtRQUFZRixLQUFLLEVBQUUsS0FBbkI7UUFBMEJGLFFBQVEsRUFBRTtNQUFwQyxDQUFQOztJQUNGLEtBQUtaLGdCQUFMO01BQUE7O0lBQ0EsS0FBS0cscUJBQUw7TUFBQTtNQUFBO01BQ0UsT0FBTyxFQUNMLEdBQUdhLEtBREU7UUFFTEYsS0FBSyxFQUFFLEtBRkY7UUFHTEYsUUFBUSxFQUFFLEtBSEw7UUFJTEMsTUFBTSxFQUFFLElBSkg7UUFLTEYsSUFBSSxFQUFFLEVBQUUsR0FBR00sTUFBTSxDQUFDTjtRQUFaO01BTEQsQ0FBUDs7SUFPRixLQUFLVixtQkFBTDtNQUFBO01BQUE7TUFDRSxPQUFPLEVBQUUsR0FBR2UsS0FBTDtRQUFZRixLQUFLLEVBQUUsSUFBbkI7UUFBeUJGLFFBQVEsRUFBRTtNQUFuQyxDQUFQOztJQUNGLEtBQUtiLGNBQUw7TUFBQTtNQUFBO01BQ0UsT0FBT1csWUFBUDs7SUFDRjtNQUFBO01BQUE7TUFDRSxPQUFPTSxLQUFQO0VBakJKO0FBbUJELENBcEJEOzs7QUFzQkEsT0FBTyxNQUFNRyxXQUFXLEdBQUdILEtBQUssSUFBSTtFQUFBO0VBQUE7RUFBQSxPQUFBQSxLQUFLLENBQUNELElBQU4sQ0FBV0osSUFBWCxDQUFnQkssS0FBaEI7QUFBcUIsQ0FBbEQ7QUFFUCxlQUFlRCxJQUFmIn0=