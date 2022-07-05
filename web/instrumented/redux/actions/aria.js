function cov_akor1gjee() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/aria.js";
  var hash = "355b64a37f9c5f790fe4a9dfae579385be59b8f6";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/aria.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 36
        },
        end: {
          line: 1,
          column: 58
        }
      },
      "1": {
        start: {
          line: 3,
          column: 40
        },
        end: {
          line: 12,
          column: 1
        }
      },
      "2": {
        start: {
          line: 3,
          column: 65
        },
        end: {
          line: 12,
          column: 1
        }
      },
      "3": {
        start: {
          line: 7,
          column: 2
        },
        end: {
          line: 11,
          column: 5
        }
      },
      "4": {
        start: {
          line: 14,
          column: 38
        },
        end: {
          line: 17,
          column: 2
        }
      },
      "5": {
        start: {
          line: 14,
          column: 45
        },
        end: {
          line: 17,
          column: 1
        }
      },
      "6": {
        start: {
          line: 19,
          column: 37
        },
        end: {
          line: 23,
          column: 2
        }
      },
      "7": {
        start: {
          line: 19,
          column: 44
        },
        end: {
          line: 23,
          column: 1
        }
      },
      "8": {
        start: {
          line: 25,
          column: 45
        },
        end: {
          line: 28,
          column: 2
        }
      },
      "9": {
        start: {
          line: 25,
          column: 55
        },
        end: {
          line: 28,
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
            column: 40
          },
          end: {
            line: 3,
            column: 41
          }
        },
        loc: {
          start: {
            line: 3,
            column: 65
          },
          end: {
            line: 12,
            column: 1
          }
        },
        line: 3
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 3,
            column: 65
          },
          end: {
            line: 3,
            column: 66
          }
        },
        loc: {
          start: {
            line: 6,
            column: 5
          },
          end: {
            line: 12,
            column: 1
          }
        },
        line: 6
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 14,
            column: 38
          },
          end: {
            line: 14,
            column: 39
          }
        },
        loc: {
          start: {
            line: 14,
            column: 45
          },
          end: {
            line: 17,
            column: 1
          }
        },
        line: 14
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 19,
            column: 37
          },
          end: {
            line: 19,
            column: 38
          }
        },
        loc: {
          start: {
            line: 19,
            column: 44
          },
          end: {
            line: 23,
            column: 1
          }
        },
        line: 19
      },
      "4": {
        name: "(anonymous_4)",
        decl: {
          start: {
            line: 25,
            column: 45
          },
          end: {
            line: 25,
            column: 46
          }
        },
        loc: {
          start: {
            line: 25,
            column: 55
          },
          end: {
            line: 28,
            column: 1
          }
        },
        line: 25
      }
    },
    branchMap: {},
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
      "9": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "355b64a37f9c5f790fe4a9dfae579385be59b8f6"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_akor1gjee = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_akor1gjee();
export const ARIA_ANNOUNCE_CHANGE = (cov_akor1gjee().s[0]++, 'ARIA_ANNOUNCE_CHANGE');
cov_akor1gjee().s[1]++;
export const ariaAnnounceFFPQuarterly = (aKey, year, q, name) => {
  cov_akor1gjee().f[0]++;
  cov_akor1gjee().s[2]++;
  return (dispatch, getState) => {
    cov_akor1gjee().f[1]++;
    cov_akor1gjee().s[3]++;
    dispatch({
      type: ARIA_ANNOUNCE_CHANGE,
      message: getState().budget.activities[aKey].quarterlyFFP[year][q][name].dollars
    });
  };
};
cov_akor1gjee().s[4]++;
export const ariaAnnounceApdLoading = () => {
  cov_akor1gjee().f[2]++;
  cov_akor1gjee().s[5]++;
  return {
    type: ARIA_ANNOUNCE_CHANGE,
    message: 'Your APD is loading.'
  };
};
cov_akor1gjee().s[6]++;
export const ariaAnnounceApdLoaded = () => {
  cov_akor1gjee().f[3]++;
  cov_akor1gjee().s[7]++;
  return {
    type: ARIA_ANNOUNCE_CHANGE,
    message: 'Your APD is loaded and ready to edit. Changes to this APD will be saved automatically.'
  };
};
cov_akor1gjee().s[8]++;
export const ariaAnnounceApdLoadingFailure = error => {
  cov_akor1gjee().f[4]++;
  cov_akor1gjee().s[9]++;
  return {
    type: ARIA_ANNOUNCE_CHANGE,
    message: error
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBUklBX0FOTk9VTkNFX0NIQU5HRSIsImFyaWFBbm5vdW5jZUZGUFF1YXJ0ZXJseSIsImFLZXkiLCJ5ZWFyIiwicSIsIm5hbWUiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwidHlwZSIsIm1lc3NhZ2UiLCJidWRnZXQiLCJhY3Rpdml0aWVzIiwicXVhcnRlcmx5RkZQIiwiZG9sbGFycyIsImFyaWFBbm5vdW5jZUFwZExvYWRpbmciLCJhcmlhQW5ub3VuY2VBcGRMb2FkZWQiLCJhcmlhQW5ub3VuY2VBcGRMb2FkaW5nRmFpbHVyZSIsImVycm9yIl0sInNvdXJjZXMiOlsiYXJpYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQVJJQV9BTk5PVU5DRV9DSEFOR0UgPSAnQVJJQV9BTk5PVU5DRV9DSEFOR0UnO1xuXG5leHBvcnQgY29uc3QgYXJpYUFubm91bmNlRkZQUXVhcnRlcmx5ID0gKGFLZXksIHllYXIsIHEsIG5hbWUpID0+IChcbiAgZGlzcGF0Y2gsXG4gIGdldFN0YXRlXG4pID0+IHtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IEFSSUFfQU5OT1VOQ0VfQ0hBTkdFLFxuICAgIG1lc3NhZ2U6IGdldFN0YXRlKCkuYnVkZ2V0LmFjdGl2aXRpZXNbYUtleV0ucXVhcnRlcmx5RkZQW3llYXJdW3FdW25hbWVdXG4gICAgICAuZG9sbGFyc1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcmlhQW5ub3VuY2VBcGRMb2FkaW5nID0gKCkgPT4gKHtcbiAgdHlwZTogQVJJQV9BTk5PVU5DRV9DSEFOR0UsXG4gIG1lc3NhZ2U6ICdZb3VyIEFQRCBpcyBsb2FkaW5nLidcbn0pO1xuXG5leHBvcnQgY29uc3QgYXJpYUFubm91bmNlQXBkTG9hZGVkID0gKCkgPT4gKHtcbiAgdHlwZTogQVJJQV9BTk5PVU5DRV9DSEFOR0UsXG4gIG1lc3NhZ2U6XG4gICAgJ1lvdXIgQVBEIGlzIGxvYWRlZCBhbmQgcmVhZHkgdG8gZWRpdC4gQ2hhbmdlcyB0byB0aGlzIEFQRCB3aWxsIGJlIHNhdmVkIGF1dG9tYXRpY2FsbHkuJ1xufSk7XG5cbmV4cG9ydCBjb25zdCBhcmlhQW5ub3VuY2VBcGRMb2FkaW5nRmFpbHVyZSA9IGVycm9yID0+ICh7XG4gIHR5cGU6IEFSSUFfQU5OT1VOQ0VfQ0hBTkdFLFxuICBtZXNzYWdlOiBlcnJvclxufSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7Ozs7Ozs7OztBQWZaLE9BQU8sTUFBTUEsb0JBQW9CLDRCQUFHLHNCQUFILENBQTFCOztBQUVQLE9BQU8sTUFBTUMsd0JBQXdCLEdBQUcsQ0FBQ0MsSUFBRCxFQUFPQyxJQUFQLEVBQWFDLENBQWIsRUFBZ0JDLElBQWhCLEtBQXlCO0VBQUE7RUFBQTtFQUFBLFFBQy9EQyxRQUQrRCxFQUUvREMsUUFGK0QsS0FHNUQ7SUFBQTtJQUFBO0lBQ0hELFFBQVEsQ0FBQztNQUNQRSxJQUFJLEVBQUVSLG9CQURDO01BRVBTLE9BQU8sRUFBRUYsUUFBUSxHQUFHRyxNQUFYLENBQWtCQyxVQUFsQixDQUE2QlQsSUFBN0IsRUFBbUNVLFlBQW5DLENBQWdEVCxJQUFoRCxFQUFzREMsQ0FBdEQsRUFBeURDLElBQXpELEVBQ05RO0lBSEksQ0FBRCxDQUFSO0VBS0QsQ0FUZ0U7QUFTaEUsQ0FUTTs7QUFXUCxPQUFPLE1BQU1DLHNCQUFzQixHQUFHLE1BQU87RUFBQTtFQUFBO0VBQUE7SUFDM0NOLElBQUksRUFBRVIsb0JBRHFDO0lBRTNDUyxPQUFPLEVBQUU7RUFGa0M7QUFHNUMsQ0FITTs7QUFLUCxPQUFPLE1BQU1NLHFCQUFxQixHQUFHLE1BQU87RUFBQTtFQUFBO0VBQUE7SUFDMUNQLElBQUksRUFBRVIsb0JBRG9DO0lBRTFDUyxPQUFPLEVBQ0w7RUFId0M7QUFJM0MsQ0FKTTs7QUFNUCxPQUFPLE1BQU1PLDZCQUE2QixHQUFHQyxLQUFLLElBQUs7RUFBQTtFQUFBO0VBQUE7SUFDckRULElBQUksRUFBRVIsb0JBRCtDO0lBRXJEUyxPQUFPLEVBQUVRO0VBRjRDO0FBR3RELENBSE0ifQ==