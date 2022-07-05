function cov_xy43u6umz() {
  var path = "/home/dmirano/Developer/eAPD/web/src/util/api.js";
  var hash = "aab90a70451a4048d7c903d980b27bfca7fceaf7";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/util/api.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 22
        },
        end: {
          line: 4,
          column: 68
        }
      },
      "1": {
        start: {
          line: 6,
          column: 14
        },
        end: {
          line: 8,
          column: 2
        }
      },
      "2": {
        start: {
          line: 11,
          column: 43
        },
        end: {
          line: 16,
          column: 1
        }
      },
      "3": {
        start: {
          line: 13,
          column: 22
        },
        end: {
          line: 13,
          column: 51
        }
      },
      "4": {
        start: {
          line: 14,
          column: 2
        },
        end: {
          line: 14,
          column: 74
        }
      },
      "5": {
        start: {
          line: 14,
          column: 19
        },
        end: {
          line: 14,
          column: 74
        }
      },
      "6": {
        start: {
          line: 15,
          column: 2
        },
        end: {
          line: 15,
          column: 16
        }
      },
      "7": {
        start: {
          line: 17,
          column: 0
        },
        end: {
          line: 17,
          column: 67
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 11,
            column: 43
          },
          end: {
            line: 11,
            column: 44
          }
        },
        loc: {
          start: {
            line: 11,
            column: 59
          },
          end: {
            line: 16,
            column: 1
          }
        },
        line: 11
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 4,
            column: 22
          },
          end: {
            line: 4,
            column: 68
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 4,
            column: 22
          },
          end: {
            line: 4,
            column: 41
          }
        }, {
          start: {
            line: 4,
            column: 45
          },
          end: {
            line: 4,
            column: 68
          }
        }],
        line: 4
      },
      "1": {
        loc: {
          start: {
            line: 13,
            column: 22
          },
          end: {
            line: 13,
            column: 51
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 13,
            column: 22
          },
          end: {
            line: 13,
            column: 43
          }
        }, {
          start: {
            line: 13,
            column: 47
          },
          end: {
            line: 13,
            column: 51
          }
        }],
        line: 13
      },
      "2": {
        loc: {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 14,
            column: 74
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 14,
            column: 74
          }
        }, {
          start: {
            line: 14,
            column: 2
          },
          end: {
            line: 14,
            column: 74
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
      "7": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "aab90a70451a4048d7c903d980b27bfca7fceaf7"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_xy43u6umz = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_xy43u6umz();
import axiosClient from 'axios';
import { getLocalAccessToken } from './auth';
export const apiUrl = (cov_xy43u6umz().s[0]++, (cov_xy43u6umz().b[0][0]++, process.env.API_URL) || (cov_xy43u6umz().b[0][1]++, 'http://localhost:8000'));
const axios = (cov_xy43u6umz().s[1]++, axiosClient.create({
  baseURL: apiUrl
})); // add Authorization header to axios request if jwt is present in localStorage

cov_xy43u6umz().s[2]++;

const presentTokenViaAuthorizationHeader = async config => {
  cov_xy43u6umz().f[0]++;
  // retrieve access token from local storage
  const accessToken = (cov_xy43u6umz().s[3]++, (cov_xy43u6umz().b[1][0]++, getLocalAccessToken()) || (cov_xy43u6umz().b[1][1]++, null));
  cov_xy43u6umz().s[4]++;

  if (accessToken) {
    cov_xy43u6umz().b[2][0]++;
    cov_xy43u6umz().s[5]++;
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    cov_xy43u6umz().b[2][1]++;
  }

  cov_xy43u6umz().s[6]++;
  return config;
};

cov_xy43u6umz().s[7]++;
axios.interceptors.request.use(presentTokenViaAuthorizationHeader);
export default axios;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJheGlvc0NsaWVudCIsImdldExvY2FsQWNjZXNzVG9rZW4iLCJhcGlVcmwiLCJwcm9jZXNzIiwiZW52IiwiQVBJX1VSTCIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsInByZXNlbnRUb2tlblZpYUF1dGhvcml6YXRpb25IZWFkZXIiLCJjb25maWciLCJhY2Nlc3NUb2tlbiIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiaW50ZXJjZXB0b3JzIiwicmVxdWVzdCIsInVzZSJdLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3NDbGllbnQgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgZ2V0TG9jYWxBY2Nlc3NUb2tlbiB9IGZyb20gJy4vYXV0aCc7XG5cbmV4cG9ydCBjb25zdCBhcGlVcmwgPSBwcm9jZXNzLmVudi5BUElfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnO1xuXG5jb25zdCBheGlvcyA9IGF4aW9zQ2xpZW50LmNyZWF0ZSh7XG4gIGJhc2VVUkw6IGFwaVVybFxufSk7XG5cbi8vIGFkZCBBdXRob3JpemF0aW9uIGhlYWRlciB0byBheGlvcyByZXF1ZXN0IGlmIGp3dCBpcyBwcmVzZW50IGluIGxvY2FsU3RvcmFnZVxuY29uc3QgcHJlc2VudFRva2VuVmlhQXV0aG9yaXphdGlvbkhlYWRlciA9IGFzeW5jIGNvbmZpZyA9PiB7XG4gIC8vIHJldHJpZXZlIGFjY2VzcyB0b2tlbiBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgY29uc3QgYWNjZXNzVG9rZW4gPSBnZXRMb2NhbEFjY2Vzc1Rva2VuKCkgfHwgbnVsbDtcbiAgaWYgKGFjY2Vzc1Rva2VuKSBjb25maWcuaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke2FjY2Vzc1Rva2VufWA7XG4gIHJldHVybiBjb25maWc7XG59O1xuYXhpb3MuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKHByZXNlbnRUb2tlblZpYUF1dGhvcml6YXRpb25IZWFkZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBheGlvcztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTs7Ozs7Ozs7O0FBZlosT0FBT0EsV0FBUCxNQUF3QixPQUF4QjtBQUNBLFNBQVNDLG1CQUFULFFBQW9DLFFBQXBDO0FBRUEsT0FBTyxNQUFNQyxNQUFNLDRCQUFHLDRCQUFBQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsT0FBWixpQ0FBdUIsdUJBQXZCLENBQUgsQ0FBWjtBQUVQLE1BQU1DLEtBQUssNEJBQUdOLFdBQVcsQ0FBQ08sTUFBWixDQUFtQjtFQUMvQkMsT0FBTyxFQUFFTjtBQURzQixDQUFuQixDQUFILENBQVgsQyxDQUlBOzs7O0FBQ0EsTUFBTU8sa0NBQWtDLEdBQUcsTUFBTUMsTUFBTixJQUFnQjtFQUFBO0VBQ3pEO0VBQ0EsTUFBTUMsV0FBVyw0QkFBRyw0QkFBQVYsbUJBQW1CLG1DQUFNLElBQU4sQ0FBdEIsQ0FBakI7RUFGeUQ7O0VBR3pELElBQUlVLFdBQUosRUFBaUI7SUFBQTtJQUFBO0lBQUFELE1BQU0sQ0FBQ0UsT0FBUCxDQUFlQyxhQUFmLEdBQWdDLFVBQVNGLFdBQVksRUFBckQ7RUFBdUQsQ0FBeEU7SUFBQTtFQUFBOztFQUh5RDtFQUl6RCxPQUFPRCxNQUFQO0FBQ0QsQ0FMRDs7O0FBTUFKLEtBQUssQ0FBQ1EsWUFBTixDQUFtQkMsT0FBbkIsQ0FBMkJDLEdBQTNCLENBQStCUCxrQ0FBL0I7QUFFQSxlQUFlSCxLQUFmIn0=