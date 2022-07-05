function cov_1tu9q12qtq() {
  var path = "/home/dmirano/Developer/eAPD/web/src/util/regulations.js";
  var hash = "090242cae085aaddfb68014dd179d14d4eeb4e08";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/util/regulations.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 26
        },
        end: {
          line: 13,
          column: 1
        }
      },
      "1": {
        start: {
          line: 4,
          column: 33
        },
        end: {
          line: 11,
          column: 3
        }
      },
      "2": {
        start: {
          line: 6,
          column: 49
        },
        end: {
          line: 10,
          column: 5
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 4,
            column: 2
          },
          end: {
            line: 4,
            column: 3
          }
        },
        loc: {
          start: {
            line: 4,
            column: 33
          },
          end: {
            line: 11,
            column: 3
          }
        },
        line: 4
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 6,
            column: 41
          },
          end: {
            line: 6,
            column: 42
          }
        },
        loc: {
          start: {
            line: 6,
            column: 49
          },
          end: {
            line: 10,
            column: 5
          }
        },
        line: 6
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    f: {
      "0": 0,
      "1": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "090242cae085aaddfb68014dd179d14d4eeb4e08"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1tu9q12qtq = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1tu9q12qtq();
import assurancesList from '../data/assurancesAndCompliance.yaml';
const initialAssurances = (cov_1tu9q12qtq().s[0]++, Object.entries(assurancesList).reduce((acc, [name, regulations]) => {
  cov_1tu9q12qtq().f[0]++;
  cov_1tu9q12qtq().s[1]++;
  return { ...acc,
    [name]: Object.keys(regulations).map(reg => {
      cov_1tu9q12qtq().f[1]++;
      cov_1tu9q12qtq().s[2]++;
      return {
        title: reg,
        checked: null,
        explanation: ''
      };
    })
  };
}, {}));
export default initialAssurances;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhc3N1cmFuY2VzTGlzdCIsImluaXRpYWxBc3N1cmFuY2VzIiwiT2JqZWN0IiwiZW50cmllcyIsInJlZHVjZSIsImFjYyIsIm5hbWUiLCJyZWd1bGF0aW9ucyIsImtleXMiLCJtYXAiLCJyZWciLCJ0aXRsZSIsImNoZWNrZWQiLCJleHBsYW5hdGlvbiJdLCJzb3VyY2VzIjpbInJlZ3VsYXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3N1cmFuY2VzTGlzdCBmcm9tICcuLi9kYXRhL2Fzc3VyYW5jZXNBbmRDb21wbGlhbmNlLnlhbWwnO1xuXG5jb25zdCBpbml0aWFsQXNzdXJhbmNlcyA9IE9iamVjdC5lbnRyaWVzKGFzc3VyYW5jZXNMaXN0KS5yZWR1Y2UoXG4gIChhY2MsIFtuYW1lLCByZWd1bGF0aW9uc10pID0+ICh7XG4gICAgLi4uYWNjLFxuICAgIFtuYW1lXTogT2JqZWN0LmtleXMocmVndWxhdGlvbnMpLm1hcChyZWcgPT4gKHtcbiAgICAgIHRpdGxlOiByZWcsXG4gICAgICBjaGVja2VkOiBudWxsLFxuICAgICAgZXhwbGFuYXRpb246ICcnXG4gICAgfSkpXG4gIH0pLFxuICB7fVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgaW5pdGlhbEFzc3VyYW5jZXM7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZOzs7Ozs7Ozs7QUFmWixPQUFPQSxjQUFQLE1BQTJCLHNDQUEzQjtBQUVBLE1BQU1DLGlCQUFpQiw2QkFBR0MsTUFBTSxDQUFDQyxPQUFQLENBQWVILGNBQWYsRUFBK0JJLE1BQS9CLENBQ3hCLENBQUNDLEdBQUQsRUFBTSxDQUFDQyxJQUFELEVBQU9DLFdBQVAsQ0FBTixLQUErQjtFQUFBO0VBQUE7RUFBQSxTQUM3QixHQUFHRixHQUQwQjtJQUU3QixDQUFDQyxJQUFELEdBQVFKLE1BQU0sQ0FBQ00sSUFBUCxDQUFZRCxXQUFaLEVBQXlCRSxHQUF6QixDQUE2QkMsR0FBRyxJQUFLO01BQUE7TUFBQTtNQUFBO1FBQzNDQyxLQUFLLEVBQUVELEdBRG9DO1FBRTNDRSxPQUFPLEVBQUUsSUFGa0M7UUFHM0NDLFdBQVcsRUFBRTtNQUg4QjtJQUk1QyxDQUpPO0VBRnFCO0FBTzlCLENBUnVCLEVBU3hCLEVBVHdCLENBQUgsQ0FBdkI7QUFZQSxlQUFlWixpQkFBZiJ9