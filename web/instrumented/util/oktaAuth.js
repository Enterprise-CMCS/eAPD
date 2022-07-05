function cov_1892sdzc13() {
  var path = "/home/dmirano/Developer/eAPD/web/src/util/oktaAuth.js";
  var hash = "6b30a4a726000455ed83f186b0b7a306b9b9bfdb";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/util/oktaAuth.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 20
        },
        end: {
          line: 3,
          column: 43
        }
      },
      "1": {
        start: {
          line: 4,
          column: 23
        },
        end: {
          line: 4,
          column: 49
        }
      },
      "2": {
        start: {
          line: 5,
          column: 23
        },
        end: {
          line: 5,
          column: 49
        }
      },
      "3": {
        start: {
          line: 6,
          column: 20
        },
        end: {
          line: 6,
          column: 61
        }
      },
      "4": {
        start: {
          line: 7,
          column: 26
        },
        end: {
          line: 7,
          column: 71
        }
      },
      "5": {
        start: {
          line: 10,
          column: 2
        },
        end: {
          line: 23,
          column: 10
        }
      },
      "6": {
        start: {
          line: 25,
          column: 0
        },
        end: {
          line: 25,
          column: 48
        }
      },
      "7": {
        start: {
          line: 26,
          column: 0
        },
        end: {
          line: 29,
          column: 1
        }
      },
      "8": {
        start: {
          line: 28,
          column: 2
        },
        end: {
          line: 28,
          column: 48
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 25,
            column: 38
          },
          end: {
            line: 25,
            column: 39
          }
        },
        loc: {
          start: {
            line: 25,
            column: 44
          },
          end: {
            line: 25,
            column: 46
          }
        },
        line: 25
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 23,
            column: 10
          }
        },
        type: "cond-expr",
        locations: [{
          start: {
            line: 11,
            column: 6
          },
          end: {
            line: 22,
            column: 8
          }
        }, {
          start: {
            line: 23,
            column: 6
          },
          end: {
            line: 23,
            column: 10
          }
        }],
        line: 10
      },
      "1": {
        loc: {
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 10,
            column: 49
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 10,
            column: 2
          },
          end: {
            line: 10,
            column: 13
          }
        }, {
          start: {
            line: 10,
            column: 17
          },
          end: {
            line: 10,
            column: 31
          }
        }, {
          start: {
            line: 10,
            column: 35
          },
          end: {
            line: 10,
            column: 49
          }
        }],
        line: 10
      },
      "2": {
        loc: {
          start: {
            line: 26,
            column: 0
          },
          end: {
            line: 29,
            column: 1
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 26,
            column: 0
          },
          end: {
            line: 29,
            column: 1
          }
        }, {
          start: {
            line: 26,
            column: 0
          },
          end: {
            line: 29,
            column: 1
          }
        }],
        line: 26
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
      "8": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0, 0],
      "2": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "6b30a4a726000455ed83f186b0b7a306b9b9bfdb"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1892sdzc13 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1892sdzc13();
import { OktaAuth } from '@okta/okta-auth-js';
const OKTA_DOMAIN = (cov_1892sdzc13().s[0]++, process.env.OKTA_DOMAIN); // eslint-disable-line prefer-destructuring

const OKTA_SERVER_ID = (cov_1892sdzc13().s[1]++, process.env.OKTA_SERVER_ID); // eslint-disable-line prefer-destructuring

const OKTA_CLIENT_ID = (cov_1892sdzc13().s[2]++, process.env.OKTA_CLIENT_ID); // eslint-disable-line prefer-destructuring

const OKTA_ISSUER = (cov_1892sdzc13().s[3]++, `${OKTA_DOMAIN}/oauth2/${OKTA_SERVER_ID}`);
const OKTA_REDIRECT_URI = (cov_1892sdzc13().s[4]++, `${window.location.origin}/implicit/callback`);
const oktaAuth = (cov_1892sdzc13().s[5]++, (cov_1892sdzc13().b[1][0]++, OKTA_DOMAIN) && (cov_1892sdzc13().b[1][1]++, OKTA_SERVER_ID) && (cov_1892sdzc13().b[1][2]++, OKTA_CLIENT_ID) ? (cov_1892sdzc13().b[0][0]++, new OktaAuth({
  issuer: OKTA_ISSUER,
  url: OKTA_DOMAIN,
  clientId: OKTA_CLIENT_ID,
  redirectUri: OKTA_REDIRECT_URI,
  tokenManager: {
    storage: 'localStorage',
    expireEarlySeconds: 305,
    // alerts the user 5 minutes and 5 seconds before session ends
    // the 5 seconds gives users the full 5 minutes to select continue
    autoRenew: false // renewing based on user interactions

  }
})) : (cov_1892sdzc13().b[0][1]++, null));
cov_1892sdzc13().s[6]++;
oktaAuth?.authStateManager?.subscribe(() => {
  cov_1892sdzc13().f[0]++;
});
cov_1892sdzc13().s[7]++;

if (!oktaAuth?.isLoginRedirect()) {
  cov_1892sdzc13().b[2][0]++;
  cov_1892sdzc13().s[8]++;
  // Trigger an initial authState change event when the app startup
  oktaAuth?.authStateManager?.updateAuthState();
} else {
  cov_1892sdzc13().b[2][1]++;
}

export default oktaAuth;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJPa3RhQXV0aCIsIk9LVEFfRE9NQUlOIiwicHJvY2VzcyIsImVudiIsIk9LVEFfU0VSVkVSX0lEIiwiT0tUQV9DTElFTlRfSUQiLCJPS1RBX0lTU1VFUiIsIk9LVEFfUkVESVJFQ1RfVVJJIiwid2luZG93IiwibG9jYXRpb24iLCJvcmlnaW4iLCJva3RhQXV0aCIsImlzc3VlciIsInVybCIsImNsaWVudElkIiwicmVkaXJlY3RVcmkiLCJ0b2tlbk1hbmFnZXIiLCJzdG9yYWdlIiwiZXhwaXJlRWFybHlTZWNvbmRzIiwiYXV0b1JlbmV3IiwiYXV0aFN0YXRlTWFuYWdlciIsInN1YnNjcmliZSIsImlzTG9naW5SZWRpcmVjdCIsInVwZGF0ZUF1dGhTdGF0ZSJdLCJzb3VyY2VzIjpbIm9rdGFBdXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9rdGFBdXRoIH0gZnJvbSAnQG9rdGEvb2t0YS1hdXRoLWpzJztcblxuY29uc3QgT0tUQV9ET01BSU4gPSBwcm9jZXNzLmVudi5PS1RBX0RPTUFJTjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuY29uc3QgT0tUQV9TRVJWRVJfSUQgPSBwcm9jZXNzLmVudi5PS1RBX1NFUlZFUl9JRDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuY29uc3QgT0tUQV9DTElFTlRfSUQgPSBwcm9jZXNzLmVudi5PS1RBX0NMSUVOVF9JRDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuY29uc3QgT0tUQV9JU1NVRVIgPSBgJHtPS1RBX0RPTUFJTn0vb2F1dGgyLyR7T0tUQV9TRVJWRVJfSUR9YDtcbmNvbnN0IE9LVEFfUkVESVJFQ1RfVVJJID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vaW1wbGljaXQvY2FsbGJhY2tgO1xuXG5jb25zdCBva3RhQXV0aCA9XG4gIE9LVEFfRE9NQUlOICYmIE9LVEFfU0VSVkVSX0lEICYmIE9LVEFfQ0xJRU5UX0lEXG4gICAgPyBuZXcgT2t0YUF1dGgoe1xuICAgICAgICBpc3N1ZXI6IE9LVEFfSVNTVUVSLFxuICAgICAgICB1cmw6IE9LVEFfRE9NQUlOLFxuICAgICAgICBjbGllbnRJZDogT0tUQV9DTElFTlRfSUQsXG4gICAgICAgIHJlZGlyZWN0VXJpOiBPS1RBX1JFRElSRUNUX1VSSSxcbiAgICAgICAgdG9rZW5NYW5hZ2VyOiB7XG4gICAgICAgICAgc3RvcmFnZTogJ2xvY2FsU3RvcmFnZScsXG4gICAgICAgICAgZXhwaXJlRWFybHlTZWNvbmRzOiAzMDUsIC8vIGFsZXJ0cyB0aGUgdXNlciA1IG1pbnV0ZXMgYW5kIDUgc2Vjb25kcyBiZWZvcmUgc2Vzc2lvbiBlbmRzXG4gICAgICAgICAgLy8gdGhlIDUgc2Vjb25kcyBnaXZlcyB1c2VycyB0aGUgZnVsbCA1IG1pbnV0ZXMgdG8gc2VsZWN0IGNvbnRpbnVlXG4gICAgICAgICAgYXV0b1JlbmV3OiBmYWxzZSAvLyByZW5ld2luZyBiYXNlZCBvbiB1c2VyIGludGVyYWN0aW9uc1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIDogbnVsbDtcblxub2t0YUF1dGg/LmF1dGhTdGF0ZU1hbmFnZXI/LnN1YnNjcmliZSgoKSA9PiB7fSk7XG5pZiAoIW9rdGFBdXRoPy5pc0xvZ2luUmVkaXJlY3QoKSkge1xuICAvLyBUcmlnZ2VyIGFuIGluaXRpYWwgYXV0aFN0YXRlIGNoYW5nZSBldmVudCB3aGVuIHRoZSBhcHAgc3RhcnR1cFxuICBva3RhQXV0aD8uYXV0aFN0YXRlTWFuYWdlcj8udXBkYXRlQXV0aFN0YXRlKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9rdGFBdXRoO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7Ozs7Ozs7OztBQWZaLFNBQVNBLFFBQVQsUUFBeUIsb0JBQXpCO0FBRUEsTUFBTUMsV0FBVyw2QkFBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlGLFdBQWYsQ0FBakIsQyxDQUE2Qzs7QUFDN0MsTUFBTUcsY0FBYyw2QkFBR0YsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGNBQWYsQ0FBcEIsQyxDQUFtRDs7QUFDbkQsTUFBTUMsY0FBYyw2QkFBR0gsT0FBTyxDQUFDQyxHQUFSLENBQVlFLGNBQWYsQ0FBcEIsQyxDQUFtRDs7QUFDbkQsTUFBTUMsV0FBVyw2QkFBSSxHQUFFTCxXQUFZLFdBQVVHLGNBQWUsRUFBM0MsQ0FBakI7QUFDQSxNQUFNRyxpQkFBaUIsNkJBQUksR0FBRUMsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxNQUFPLG9CQUE3QixDQUF2QjtBQUVBLE1BQU1DLFFBQVEsNkJBQ1osNkJBQUFWLFdBQVcsa0NBQUlHLGNBQUosQ0FBWCxpQ0FBaUNDLGNBQWpDLGlDQUNJLElBQUlMLFFBQUosQ0FBYTtFQUNYWSxNQUFNLEVBQUVOLFdBREc7RUFFWE8sR0FBRyxFQUFFWixXQUZNO0VBR1hhLFFBQVEsRUFBRVQsY0FIQztFQUlYVSxXQUFXLEVBQUVSLGlCQUpGO0VBS1hTLFlBQVksRUFBRTtJQUNaQyxPQUFPLEVBQUUsY0FERztJQUVaQyxrQkFBa0IsRUFBRSxHQUZSO0lBRWE7SUFDekI7SUFDQUMsU0FBUyxFQUFFLEtBSkMsQ0FJSzs7RUFKTDtBQUxILENBQWIsQ0FESixpQ0FhSSxJQWJKLENBRFksQ0FBZDs7QUFnQkFSLFFBQVEsRUFBRVMsZ0JBQVYsRUFBNEJDLFNBQTVCLENBQXNDLE1BQU07RUFBQTtBQUFFLENBQTlDOzs7QUFDQSxJQUFJLENBQUNWLFFBQVEsRUFBRVcsZUFBVixFQUFMLEVBQWtDO0VBQUE7RUFBQTtFQUNoQztFQUNBWCxRQUFRLEVBQUVTLGdCQUFWLEVBQTRCRyxlQUE1QjtBQUNELENBSEQ7RUFBQTtBQUFBOztBQUtBLGVBQWVaLFFBQWYifQ==