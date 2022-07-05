function cov_168po1b71g() {
  var path = "/home/dmirano/Developer/eAPD/web/src/lazy/zxcvbn.js";
  var hash = "23ed546536621d899564ca690b7c428d8b695f50";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/lazy/zxcvbn.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 13
        },
        end: {
          line: 1,
          column: 33
        }
      },
      "1": {
        start: {
          line: 1,
          column: 20
        },
        end: {
          line: 1,
          column: 32
        }
      },
      "2": {
        start: {
          line: 4,
          column: 2
        },
        end: {
          line: 6,
          column: 5
        }
      },
      "3": {
        start: {
          line: 5,
          column: 4
        },
        end: {
          line: 5,
          column: 26
        }
      },
      "4": {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 8,
          column: 25
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 1,
            column: 13
          },
          end: {
            line: 1,
            column: 14
          }
        },
        loc: {
          start: {
            line: 1,
            column: 20
          },
          end: {
            line: 1,
            column: 32
          }
        },
        line: 1
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 3,
            column: 15
          },
          end: {
            line: 3,
            column: 16
          }
        },
        loc: {
          start: {
            line: 3,
            column: 28
          },
          end: {
            line: 9,
            column: 1
          }
        },
        line: 3
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 4,
            column: 57
          },
          end: {
            line: 4,
            column: 58
          }
        },
        loc: {
          start: {
            line: 4,
            column: 65
          },
          end: {
            line: 6,
            column: 3
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
      "3": 0,
      "4": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "23ed546536621d899564ca690b7c428d8b695f50"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_168po1b71g = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_168po1b71g();
cov_168po1b71g().s[0]++;

let zxcvbn = () => {
  cov_168po1b71g().f[0]++;
  cov_168po1b71g().s[1]++;
  return {
    score: 0
  };
};

export default ((...args) => {
  cov_168po1b71g().f[1]++;
  cov_168po1b71g().s[2]++;
  import(
  /* webpackChunkName: "zxcvbn" */
  'zxcvbn').then(real => {
    cov_168po1b71g().f[2]++;
    cov_168po1b71g().s[3]++;
    zxcvbn = real.default;
  });
  cov_168po1b71g().s[4]++;
  return zxcvbn(...args);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ6eGN2Ym4iLCJzY29yZSIsImFyZ3MiLCJ0aGVuIiwicmVhbCIsImRlZmF1bHQiXSwic291cmNlcyI6WyJ6eGN2Ym4uanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHp4Y3ZibiA9ICgpID0+ICh7IHNjb3JlOiAwIH0pO1xuXG5leHBvcnQgZGVmYXVsdCAoLi4uYXJncykgPT4ge1xuICBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJ6eGN2Ym5cIiAqLyAnenhjdmJuJykudGhlbihyZWFsID0+IHtcbiAgICB6eGN2Ym4gPSByZWFsLmRlZmF1bHQ7XG4gIH0pO1xuXG4gIHJldHVybiB6eGN2Ym4oLi4uYXJncyk7XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZOzs7Ozs7Ozs7OztBQWZaLElBQUlBLE1BQU0sR0FBRyxNQUFPO0VBQUE7RUFBQTtFQUFBO0lBQUVDLEtBQUssRUFBRTtFQUFUO0FBQVksQ0FBaEM7O0FBRUEsZ0JBQWUsQ0FBQyxHQUFHQyxJQUFKLEtBQWE7RUFBQTtFQUFBO0VBQzFCO0VBQU87RUFBaUMsUUFBeEMsRUFBa0RDLElBQWxELENBQXVEQyxJQUFJLElBQUk7SUFBQTtJQUFBO0lBQzdESixNQUFNLEdBQUdJLElBQUksQ0FBQ0MsT0FBZDtFQUNELENBRkQ7RUFEMEI7RUFLMUIsT0FBT0wsTUFBTSxDQUFDLEdBQUdFLElBQUosQ0FBYjtBQUNELENBTkQifQ==