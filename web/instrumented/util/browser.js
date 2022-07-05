function cov_c9lnzu7mn() {
  var path = "/home/dmirano/Developer/eAPD/web/src/util/browser.js";
  var hash = "528163c3d95133ef836d153bce00eceda78c76a5";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/util/browser.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 16
        },
        end: {
          line: 3,
          column: 30
        }
      },
      "1": {
        start: {
          line: 4,
          column: 0
        },
        end: {
          line: 7,
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
          column: 76
        }
      },
      "3": {
        start: {
          line: 13,
          column: 2
        },
        end: {
          line: 17,
          column: 34
        }
      },
      "4": {
        start: {
          line: 22,
          column: 24
        },
        end: {
          line: 22,
          column: 49
        }
      },
      "5": {
        start: {
          line: 27,
          column: 21
        },
        end: {
          line: 27,
          column: 56
        }
      }
    },
    fnMap: {},
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 3,
            column: 16
          },
          end: {
            line: 3,
            column: 30
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 3,
            column: 16
          },
          end: {
            line: 3,
            column: 24
          }
        }, {
          start: {
            line: 3,
            column: 28
          },
          end: {
            line: 3,
            column: 30
          }
        }],
        line: 3
      },
      "1": {
        loc: {
          start: {
            line: 4,
            column: 0
          },
          end: {
            line: 7,
            column: 1
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 4,
            column: 0
          },
          end: {
            line: 7,
            column: 1
          }
        }, {
          start: {
            line: 4,
            column: 0
          },
          end: {
            line: 7,
            column: 1
          }
        }],
        line: 4
      },
      "2": {
        loc: {
          start: {
            line: 4,
            column: 4
          },
          end: {
            line: 4,
            column: 30
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 4,
            column: 4
          },
          end: {
            line: 4,
            column: 11
          }
        }, {
          start: {
            line: 4,
            column: 15
          },
          end: {
            line: 4,
            column: 30
          }
        }],
        line: 4
      },
      "3": {
        loc: {
          start: {
            line: 13,
            column: 2
          },
          end: {
            line: 17,
            column: 34
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 13,
            column: 3
          },
          end: {
            line: 13,
            column: 28
          }
        }, {
          start: {
            line: 13,
            column: 32
          },
          end: {
            line: 13,
            column: 53
          }
        }, {
          start: {
            line: 15,
            column: 3
          },
          end: {
            line: 15,
            column: 29
          }
        }, {
          start: {
            line: 15,
            column: 33
          },
          end: {
            line: 15,
            column: 54
          }
        }, {
          start: {
            line: 17,
            column: 2
          },
          end: {
            line: 17,
            column: 34
          }
        }],
        line: 13
      },
      "4": {
        loc: {
          start: {
            line: 27,
            column: 21
          },
          end: {
            line: 27,
            column: 56
          }
        },
        type: "binary-expr",
        locations: [{
          start: {
            line: 27,
            column: 21
          },
          end: {
            line: 27,
            column: 36
          }
        }, {
          start: {
            line: 27,
            column: 40
          },
          end: {
            line: 27,
            column: 56
          }
        }],
        line: 27
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
    f: {},
    b: {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0],
      "3": [0, 0, 0, 0, 0],
      "4": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "528163c3d95133ef836d153bce00eceda78c76a5"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_c9lnzu7mn = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_c9lnzu7mn();
import { detect } from 'detect-browser';
const browser = (cov_c9lnzu7mn().s[0]++, (cov_c9lnzu7mn().b[0][0]++, detect()) || (cov_c9lnzu7mn().b[0][1]++, {}));
cov_c9lnzu7mn().s[1]++;

if ((cov_c9lnzu7mn().b[2][0]++, browser) && (cov_c9lnzu7mn().b[2][1]++, browser.version)) {
  cov_c9lnzu7mn().b[1][0]++;
  cov_c9lnzu7mn().s[2]++;
  // We're only interested in major versions, not all the minor ones.
  browser.version = Number.parseInt(browser.version.split('.').shift(), 10);
} else {
  cov_c9lnzu7mn().b[1][1]++;
} // Green support is for browsers where we we intend all functionality to work as
// well as all visual and style features to be correct.


const browserIsGreen = ( // Current major version as of April 2020 is 80, but we need to support back to 78 because Jerome's work machine can't be updated.
cov_c9lnzu7mn().s[3]++, (cov_c9lnzu7mn().b[3][0]++, browser.name === 'chrome') && (cov_c9lnzu7mn().b[3][1]++, browser.version >= 78) || // Most recent Firefox extended support release as of April 2020.
(cov_c9lnzu7mn().b[3][2]++, browser.name === 'firefox') && (cov_c9lnzu7mn().b[3][3]++, browser.version >= 68) || (cov_c9lnzu7mn().b[3][4]++, // First Chromium build of Edge. No longer support pre-Chromium builds.
browser.name === 'edge-chromium')); // Yellow support is for browsers we think should support all the basic
// functionality of the app, though more advanced features and some visual
// styles may be broken. Our yellow-level browser is Safari.

const browserIsYellow = (cov_c9lnzu7mn().s[4]++, browser.name === 'safari'); // Red support is for browsers we don't support at all.
// We no longer support any IE browsers. User will see prompt to download
// a more modern browser.

const browserIsRed = (cov_c9lnzu7mn().s[5]++, (cov_c9lnzu7mn().b[4][0]++, !browserIsGreen) && (cov_c9lnzu7mn().b[4][1]++, !browserIsYellow));
export { browserIsGreen, browserIsYellow, browserIsRed };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkZXRlY3QiLCJicm93c2VyIiwidmVyc2lvbiIsIk51bWJlciIsInBhcnNlSW50Iiwic3BsaXQiLCJzaGlmdCIsImJyb3dzZXJJc0dyZWVuIiwibmFtZSIsImJyb3dzZXJJc1llbGxvdyIsImJyb3dzZXJJc1JlZCJdLCJzb3VyY2VzIjpbImJyb3dzZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGV0ZWN0IH0gZnJvbSAnZGV0ZWN0LWJyb3dzZXInO1xuXG5jb25zdCBicm93c2VyID0gZGV0ZWN0KCkgfHwge307XG5pZiAoYnJvd3NlciAmJiBicm93c2VyLnZlcnNpb24pIHtcbiAgLy8gV2UncmUgb25seSBpbnRlcmVzdGVkIGluIG1ham9yIHZlcnNpb25zLCBub3QgYWxsIHRoZSBtaW5vciBvbmVzLlxuICBicm93c2VyLnZlcnNpb24gPSBOdW1iZXIucGFyc2VJbnQoYnJvd3Nlci52ZXJzaW9uLnNwbGl0KCcuJykuc2hpZnQoKSwgMTApO1xufVxuXG4vLyBHcmVlbiBzdXBwb3J0IGlzIGZvciBicm93c2VycyB3aGVyZSB3ZSB3ZSBpbnRlbmQgYWxsIGZ1bmN0aW9uYWxpdHkgdG8gd29yayBhc1xuLy8gd2VsbCBhcyBhbGwgdmlzdWFsIGFuZCBzdHlsZSBmZWF0dXJlcyB0byBiZSBjb3JyZWN0LlxuY29uc3QgYnJvd3NlcklzR3JlZW4gPVxuICAvLyBDdXJyZW50IG1ham9yIHZlcnNpb24gYXMgb2YgQXByaWwgMjAyMCBpcyA4MCwgYnV0IHdlIG5lZWQgdG8gc3VwcG9ydCBiYWNrIHRvIDc4IGJlY2F1c2UgSmVyb21lJ3Mgd29yayBtYWNoaW5lIGNhbid0IGJlIHVwZGF0ZWQuXG4gIChicm93c2VyLm5hbWUgPT09ICdjaHJvbWUnICYmIGJyb3dzZXIudmVyc2lvbiA+PSA3OCkgfHxcbiAgLy8gTW9zdCByZWNlbnQgRmlyZWZveCBleHRlbmRlZCBzdXBwb3J0IHJlbGVhc2UgYXMgb2YgQXByaWwgMjAyMC5cbiAgKGJyb3dzZXIubmFtZSA9PT0gJ2ZpcmVmb3gnICYmIGJyb3dzZXIudmVyc2lvbiA+PSA2OCkgfHxcbiAgLy8gRmlyc3QgQ2hyb21pdW0gYnVpbGQgb2YgRWRnZS4gTm8gbG9uZ2VyIHN1cHBvcnQgcHJlLUNocm9taXVtIGJ1aWxkcy5cbiAgYnJvd3Nlci5uYW1lID09PSAnZWRnZS1jaHJvbWl1bSc7XG5cbi8vIFllbGxvdyBzdXBwb3J0IGlzIGZvciBicm93c2VycyB3ZSB0aGluayBzaG91bGQgc3VwcG9ydCBhbGwgdGhlIGJhc2ljXG4vLyBmdW5jdGlvbmFsaXR5IG9mIHRoZSBhcHAsIHRob3VnaCBtb3JlIGFkdmFuY2VkIGZlYXR1cmVzIGFuZCBzb21lIHZpc3VhbFxuLy8gc3R5bGVzIG1heSBiZSBicm9rZW4uIE91ciB5ZWxsb3ctbGV2ZWwgYnJvd3NlciBpcyBTYWZhcmkuXG5jb25zdCBicm93c2VySXNZZWxsb3cgPSBicm93c2VyLm5hbWUgPT09ICdzYWZhcmknO1xuXG4vLyBSZWQgc3VwcG9ydCBpcyBmb3IgYnJvd3NlcnMgd2UgZG9uJ3Qgc3VwcG9ydCBhdCBhbGwuXG4vLyBXZSBubyBsb25nZXIgc3VwcG9ydCBhbnkgSUUgYnJvd3NlcnMuIFVzZXIgd2lsbCBzZWUgcHJvbXB0IHRvIGRvd25sb2FkXG4vLyBhIG1vcmUgbW9kZXJuIGJyb3dzZXIuXG5jb25zdCBicm93c2VySXNSZWQgPSAhYnJvd3NlcklzR3JlZW4gJiYgIWJyb3dzZXJJc1llbGxvdztcblxuZXhwb3J0IHsgYnJvd3NlcklzR3JlZW4sIGJyb3dzZXJJc1llbGxvdywgYnJvd3NlcklzUmVkIH07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZOzs7Ozs7Ozs7QUFmWixTQUFTQSxNQUFULFFBQXVCLGdCQUF2QjtBQUVBLE1BQU1DLE9BQU8sNEJBQUcsNEJBQUFELE1BQU0sbUNBQU0sRUFBTixDQUFULENBQWI7OztBQUNBLElBQUksNEJBQUFDLE9BQU8saUNBQUlBLE9BQU8sQ0FBQ0MsT0FBWixDQUFYLEVBQWdDO0VBQUE7RUFBQTtFQUM5QjtFQUNBRCxPQUFPLENBQUNDLE9BQVIsR0FBa0JDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkgsT0FBTyxDQUFDQyxPQUFSLENBQWdCRyxLQUFoQixDQUFzQixHQUF0QixFQUEyQkMsS0FBM0IsRUFBaEIsRUFBb0QsRUFBcEQsQ0FBbEI7QUFDRCxDQUhEO0VBQUE7QUFBQSxDLENBS0E7QUFDQTs7O0FBQ0EsTUFBTUMsY0FBYyxLQUNsQjtBQURrQix3QkFFakIsNEJBQUFOLE9BQU8sQ0FBQ08sSUFBUixLQUFpQixRQUFqQixpQ0FBNkJQLE9BQU8sQ0FBQ0MsT0FBUixJQUFtQixFQUFoRCxDQUFELElBQ0E7QUFDQyw0QkFBQUQsT0FBTyxDQUFDTyxJQUFSLEtBQWlCLFNBQWpCLGlDQUE4QlAsT0FBTyxDQUFDQyxPQUFSLElBQW1CLEVBQWpELENBRkQsZ0NBR0E7QUFDQUQsT0FBTyxDQUFDTyxJQUFSLEtBQWlCLGVBSmpCLENBRmtCLENBQXBCLEMsQ0FRQTtBQUNBO0FBQ0E7O0FBQ0EsTUFBTUMsZUFBZSw0QkFBR1IsT0FBTyxDQUFDTyxJQUFSLEtBQWlCLFFBQXBCLENBQXJCLEMsQ0FFQTtBQUNBO0FBQ0E7O0FBQ0EsTUFBTUUsWUFBWSw0QkFBRyw2QkFBQ0gsY0FBRCxpQ0FBbUIsQ0FBQ0UsZUFBcEIsQ0FBSCxDQUFsQjtBQUVBLFNBQVNGLGNBQVQsRUFBeUJFLGVBQXpCLEVBQTBDQyxZQUExQyJ9