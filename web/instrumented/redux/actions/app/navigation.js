function cov_2n3awkmkkr() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/app/navigation.js";
  var hash = "3586b3f215945d71f32896cbecdbbba12d090fda";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/app/navigation.js",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 29
        },
        end: {
          line: 8,
          column: 1
        }
      },
      "1": {
        start: {
          line: 5,
          column: 60
        },
        end: {
          line: 8,
          column: 1
        }
      },
      "2": {
        start: {
          line: 6,
          column: 2
        },
        end: {
          line: 6,
          column: 28
        }
      },
      "3": {
        start: {
          line: 7,
          column: 2
        },
        end: {
          line: 7,
          column: 27
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 5,
            column: 29
          },
          end: {
            line: 5,
            column: 30
          }
        },
        loc: {
          start: {
            line: 5,
            column: 60
          },
          end: {
            line: 8,
            column: 1
          }
        },
        line: 5
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 5,
            column: 60
          },
          end: {
            line: 5,
            column: 61
          }
        },
        loc: {
          start: {
            line: 5,
            column: 72
          },
          end: {
            line: 8,
            column: 1
          }
        },
        line: 5
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 5,
            column: 30
          },
          end: {
            line: 5,
            column: 55
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 5,
            column: 53
          },
          end: {
            line: 5,
            column: 55
          }
        }],
        line: 5
      },
      "1": {
        loc: {
          start: {
            line: 5,
            column: 32
          },
          end: {
            line: 5,
            column: 48
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 5,
            column: 44
          },
          end: {
            line: 5,
            column: 48
          }
        }],
        line: 5
      }
    },
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
    b: {
      "0": [0],
      "1": [0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "3586b3f215945d71f32896cbecdbbba12d090fda"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2n3awkmkkr = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_2n3awkmkkr();
import { push } from 'connected-react-router';
import { RESET } from './symbols'; // eslint-disable-next-line import/prefer-default-export

cov_2n3awkmkkr().s[0]++;
export const goToDashboard = ({
  pushRoute = (cov_2n3awkmkkr().b[1][0]++, push)
} = (cov_2n3awkmkkr().b[0][0]++, {})) => {
  cov_2n3awkmkkr().f[0]++;
  cov_2n3awkmkkr().s[1]++;
  return dispatch => {
    cov_2n3awkmkkr().f[1]++;
    cov_2n3awkmkkr().s[2]++;
    dispatch({
      type: RESET
    });
    cov_2n3awkmkkr().s[3]++;
    dispatch(pushRoute('/'));
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwdXNoIiwiUkVTRVQiLCJnb1RvRGFzaGJvYXJkIiwicHVzaFJvdXRlIiwiZGlzcGF0Y2giLCJ0eXBlIl0sInNvdXJjZXMiOlsibmF2aWdhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwdXNoIH0gZnJvbSAnY29ubmVjdGVkLXJlYWN0LXJvdXRlcic7XG5pbXBvcnQgeyBSRVNFVCB9IGZyb20gJy4vc3ltYm9scyc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0XG5leHBvcnQgY29uc3QgZ29Ub0Rhc2hib2FyZCA9ICh7IHB1c2hSb3V0ZSA9IHB1c2ggfSA9IHt9KSA9PiBkaXNwYXRjaCA9PiB7XG4gIGRpc3BhdGNoKHsgdHlwZTogUkVTRVQgfSk7XG4gIGRpc3BhdGNoKHB1c2hSb3V0ZSgnLycpKTtcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZOzs7Ozs7Ozs7QUFmWixTQUFTQSxJQUFULFFBQXFCLHdCQUFyQjtBQUNBLFNBQVNDLEtBQVQsUUFBc0IsV0FBdEIsQyxDQUVBOzs7QUFDQSxPQUFPLE1BQU1DLGFBQWEsR0FBRyxDQUFDO0VBQUVDLFNBQVMsZ0NBQUdILElBQUg7QUFBWCxpQ0FBdUIsRUFBdkIsQ0FBRCxLQUErQjtFQUFBO0VBQUE7RUFBQSxPQUFBSSxRQUFRLElBQUk7SUFBQTtJQUFBO0lBQ3RFQSxRQUFRLENBQUM7TUFBRUMsSUFBSSxFQUFFSjtJQUFSLENBQUQsQ0FBUjtJQURzRTtJQUV0RUcsUUFBUSxDQUFDRCxTQUFTLENBQUMsR0FBRCxDQUFWLENBQVI7RUFDRCxDQUgyRDtBQUczRCxDQUhNIn0=