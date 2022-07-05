function cov_1bjalo1n96() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/app/print.js";
  var hash = "784317e761f80bb0c372302251125d7861be5375";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/app/print.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 24
        },
        end: {
          line: 6,
          column: 1
        }
      },
      "1": {
        start: {
          line: 3,
          column: 54
        },
        end: {
          line: 6,
          column: 1
        }
      },
      "2": {
        start: {
          line: 4,
          column: 2
        },
        end: {
          line: 4,
          column: 32
        }
      },
      "3": {
        start: {
          line: 5,
          column: 2
        },
        end: {
          line: 5,
          column: 17
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 3,
            column: 24
          },
          end: {
            line: 3,
            column: 25
          }
        },
        loc: {
          start: {
            line: 3,
            column: 54
          },
          end: {
            line: 6,
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
            column: 54
          },
          end: {
            line: 3,
            column: 55
          }
        },
        loc: {
          start: {
            line: 3,
            column: 66
          },
          end: {
            line: 6,
            column: 1
          }
        },
        line: 3
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 3,
            column: 25
          },
          end: {
            line: 3,
            column: 49
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 3,
            column: 47
          },
          end: {
            line: 3,
            column: 49
          }
        }],
        line: 3
      },
      "1": {
        loc: {
          start: {
            line: 3,
            column: 27
          },
          end: {
            line: 3,
            column: 42
          }
        },
        type: "default-arg",
        locations: [{
          start: {
            line: 3,
            column: 36
          },
          end: {
            line: 3,
            column: 42
          }
        }],
        line: 3
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
    hash: "784317e761f80bb0c372302251125d7861be5375"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1bjalo1n96 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1bjalo1n96();
import { PRINT_APD } from './symbols';
cov_1bjalo1n96().s[0]++;
export const printApd = ({
  global = (cov_1bjalo1n96().b[1][0]++, window)
} = (cov_1bjalo1n96().b[0][0]++, {})) => {
  cov_1bjalo1n96().f[0]++;
  cov_1bjalo1n96().s[1]++;
  return dispatch => {
    cov_1bjalo1n96().f[1]++;
    cov_1bjalo1n96().s[2]++;
    dispatch({
      type: PRINT_APD
    });
    cov_1bjalo1n96().s[3]++;
    global.print();
  };
};
export default {
  printApd
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQUklOVF9BUEQiLCJwcmludEFwZCIsImdsb2JhbCIsIndpbmRvdyIsImRpc3BhdGNoIiwidHlwZSIsInByaW50Il0sInNvdXJjZXMiOlsicHJpbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUFJJTlRfQVBEIH0gZnJvbSAnLi9zeW1ib2xzJztcblxuZXhwb3J0IGNvbnN0IHByaW50QXBkID0gKHsgZ2xvYmFsID0gd2luZG93IH0gPSB7fSkgPT4gZGlzcGF0Y2ggPT4ge1xuICBkaXNwYXRjaCh7IHR5cGU6IFBSSU5UX0FQRCB9KTtcbiAgZ2xvYmFsLnByaW50KCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7IHByaW50QXBkIH07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZOzs7Ozs7Ozs7QUFmWixTQUFTQSxTQUFULFFBQTBCLFdBQTFCOztBQUVBLE9BQU8sTUFBTUMsUUFBUSxHQUFHLENBQUM7RUFBRUMsTUFBTSxnQ0FBR0MsTUFBSDtBQUFSLGlDQUFzQixFQUF0QixDQUFELEtBQThCO0VBQUE7RUFBQTtFQUFBLE9BQUFDLFFBQVEsSUFBSTtJQUFBO0lBQUE7SUFDaEVBLFFBQVEsQ0FBQztNQUFFQyxJQUFJLEVBQUVMO0lBQVIsQ0FBRCxDQUFSO0lBRGdFO0lBRWhFRSxNQUFNLENBQUNJLEtBQVA7RUFDRCxDQUhxRDtBQUdyRCxDQUhNO0FBS1AsZUFBZTtFQUFFTDtBQUFGLENBQWYifQ==