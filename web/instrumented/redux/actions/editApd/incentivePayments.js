function cov_12pv6bh21() {
  var path = "/home/dmirano/Developer/eAPD/web/src/redux/actions/editApd/incentivePayments.js";
  var hash = "fbcc26419b56902b5936e5a2c11bb2109f645b21";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/redux/actions/editApd/incentivePayments.js",
    statementMap: {
      "0": {
        start: {
          line: 9,
          column: 35
        },
        end: {
          line: 13,
          column: 2
        }
      },
      "1": {
        start: {
          line: 9,
          column: 62
        },
        end: {
          line: 13,
          column: 1
        }
      },
      "2": {
        start: {
          line: 21,
          column: 37
        },
        end: {
          line: 25,
          column: 2
        }
      },
      "3": {
        start: {
          line: 21,
          column: 64
        },
        end: {
          line: 25,
          column: 1
        }
      },
      "4": {
        start: {
          line: 33,
          column: 35
        },
        end: {
          line: 37,
          column: 2
        }
      },
      "5": {
        start: {
          line: 33,
          column: 62
        },
        end: {
          line: 37,
          column: 1
        }
      },
      "6": {
        start: {
          line: 45,
          column: 37
        },
        end: {
          line: 49,
          column: 2
        }
      },
      "7": {
        start: {
          line: 45,
          column: 64
        },
        end: {
          line: 49,
          column: 1
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 9,
            column: 35
          },
          end: {
            line: 9,
            column: 36
          }
        },
        loc: {
          start: {
            line: 9,
            column: 62
          },
          end: {
            line: 13,
            column: 1
          }
        },
        line: 9
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 21,
            column: 37
          },
          end: {
            line: 21,
            column: 38
          }
        },
        loc: {
          start: {
            line: 21,
            column: 64
          },
          end: {
            line: 25,
            column: 1
          }
        },
        line: 21
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 33,
            column: 35
          },
          end: {
            line: 33,
            column: 36
          }
        },
        loc: {
          start: {
            line: 33,
            column: 62
          },
          end: {
            line: 37,
            column: 1
          }
        },
        line: 33
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 45,
            column: 37
          },
          end: {
            line: 45,
            column: 38
          }
        },
        loc: {
          start: {
            line: 45,
            column: 64
          },
          end: {
            line: 49,
            column: 1
          }
        },
        line: 45
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
      "7": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "fbcc26419b56902b5936e5a2c11bb2109f645b21"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_12pv6bh21 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_12pv6bh21();
import { EDIT_APD } from './symbols';
/**
 * Set the EH count for a federal fiscal quarter
 * @param {String} year Year to update, four-digit
 * @param {Number} quarter Fiscal quarter to update
 * @param {Number} value New EH count value
 */

cov_12pv6bh21().s[0]++;
export const setIncentiveEHCount = (year, quarter, value) => {
  cov_12pv6bh21().f[0]++;
  cov_12pv6bh21().s[1]++;
  return {
    type: EDIT_APD,
    path: `/proposedBudget/incentivePayments/ehCt/${year}/${quarter}`,
    value
  };
};
/**
 * Set the EH payment for a federal fiscal quarter
 * @param {String} year Year to update, four-digit
 * @param {Number} quarter Fiscal quarter to update
 * @param {Number} value New EH payment value
 */

cov_12pv6bh21().s[2]++;
export const setIncentiveEHPayment = (year, quarter, value) => {
  cov_12pv6bh21().f[1]++;
  cov_12pv6bh21().s[3]++;
  return {
    type: EDIT_APD,
    path: `/proposedBudget/incentivePayments/ehAmt/${year}/${quarter}`,
    value
  };
};
/**
 * Set the EP count for a federal fiscal quarter
 * @param {String} year Year to update, four-digit
 * @param {Number} quarter Fiscal quarter to update
 * @param {Number} value New EP count value
 */

cov_12pv6bh21().s[4]++;
export const setIncentiveEPCount = (year, quarter, value) => {
  cov_12pv6bh21().f[2]++;
  cov_12pv6bh21().s[5]++;
  return {
    type: EDIT_APD,
    path: `/proposedBudget/incentivePayments/epCt/${year}/${quarter}`,
    value
  };
};
/**
 * Set the EP payment for a federal fiscal quarter
 * @param {String} year Year to update, four-digit
 * @param {Number} quarter Fiscal quarter to update
 * @param {Number} value New EP payment value
 */

cov_12pv6bh21().s[6]++;
export const setIncentiveEPPayment = (year, quarter, value) => {
  cov_12pv6bh21().f[3]++;
  cov_12pv6bh21().s[7]++;
  return {
    type: EDIT_APD,
    path: `/proposedBudget/incentivePayments/epAmt/${year}/${quarter}`,
    value
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJFRElUX0FQRCIsInNldEluY2VudGl2ZUVIQ291bnQiLCJ5ZWFyIiwicXVhcnRlciIsInZhbHVlIiwidHlwZSIsInBhdGgiLCJzZXRJbmNlbnRpdmVFSFBheW1lbnQiLCJzZXRJbmNlbnRpdmVFUENvdW50Iiwic2V0SW5jZW50aXZlRVBQYXltZW50Il0sInNvdXJjZXMiOlsiaW5jZW50aXZlUGF5bWVudHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRURJVF9BUEQgfSBmcm9tICcuL3N5bWJvbHMnO1xuXG4vKipcbiAqIFNldCB0aGUgRUggY291bnQgZm9yIGEgZmVkZXJhbCBmaXNjYWwgcXVhcnRlclxuICogQHBhcmFtIHtTdHJpbmd9IHllYXIgWWVhciB0byB1cGRhdGUsIGZvdXItZGlnaXRcbiAqIEBwYXJhbSB7TnVtYmVyfSBxdWFydGVyIEZpc2NhbCBxdWFydGVyIHRvIHVwZGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIE5ldyBFSCBjb3VudCB2YWx1ZVxuICovXG5leHBvcnQgY29uc3Qgc2V0SW5jZW50aXZlRUhDb3VudCA9ICh5ZWFyLCBxdWFydGVyLCB2YWx1ZSkgPT4gKHtcbiAgdHlwZTogRURJVF9BUEQsXG4gIHBhdGg6IGAvcHJvcG9zZWRCdWRnZXQvaW5jZW50aXZlUGF5bWVudHMvZWhDdC8ke3llYXJ9LyR7cXVhcnRlcn1gLFxuICB2YWx1ZVxufSk7XG5cbi8qKlxuICogU2V0IHRoZSBFSCBwYXltZW50IGZvciBhIGZlZGVyYWwgZmlzY2FsIHF1YXJ0ZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSB5ZWFyIFllYXIgdG8gdXBkYXRlLCBmb3VyLWRpZ2l0XG4gKiBAcGFyYW0ge051bWJlcn0gcXVhcnRlciBGaXNjYWwgcXVhcnRlciB0byB1cGRhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSBOZXcgRUggcGF5bWVudCB2YWx1ZVxuICovXG5leHBvcnQgY29uc3Qgc2V0SW5jZW50aXZlRUhQYXltZW50ID0gKHllYXIsIHF1YXJ0ZXIsIHZhbHVlKSA9PiAoe1xuICB0eXBlOiBFRElUX0FQRCxcbiAgcGF0aDogYC9wcm9wb3NlZEJ1ZGdldC9pbmNlbnRpdmVQYXltZW50cy9laEFtdC8ke3llYXJ9LyR7cXVhcnRlcn1gLFxuICB2YWx1ZVxufSk7XG5cbi8qKlxuICogU2V0IHRoZSBFUCBjb3VudCBmb3IgYSBmZWRlcmFsIGZpc2NhbCBxdWFydGVyXG4gKiBAcGFyYW0ge1N0cmluZ30geWVhciBZZWFyIHRvIHVwZGF0ZSwgZm91ci1kaWdpdFxuICogQHBhcmFtIHtOdW1iZXJ9IHF1YXJ0ZXIgRmlzY2FsIHF1YXJ0ZXIgdG8gdXBkYXRlXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgTmV3IEVQIGNvdW50IHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRJbmNlbnRpdmVFUENvdW50ID0gKHllYXIsIHF1YXJ0ZXIsIHZhbHVlKSA9PiAoe1xuICB0eXBlOiBFRElUX0FQRCxcbiAgcGF0aDogYC9wcm9wb3NlZEJ1ZGdldC9pbmNlbnRpdmVQYXltZW50cy9lcEN0LyR7eWVhcn0vJHtxdWFydGVyfWAsXG4gIHZhbHVlXG59KTtcblxuLyoqXG4gKiBTZXQgdGhlIEVQIHBheW1lbnQgZm9yIGEgZmVkZXJhbCBmaXNjYWwgcXVhcnRlclxuICogQHBhcmFtIHtTdHJpbmd9IHllYXIgWWVhciB0byB1cGRhdGUsIGZvdXItZGlnaXRcbiAqIEBwYXJhbSB7TnVtYmVyfSBxdWFydGVyIEZpc2NhbCBxdWFydGVyIHRvIHVwZGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIE5ldyBFUCBwYXltZW50IHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRJbmNlbnRpdmVFUFBheW1lbnQgPSAoeWVhciwgcXVhcnRlciwgdmFsdWUpID0+ICh7XG4gIHR5cGU6IEVESVRfQVBELFxuICBwYXRoOiBgL3Byb3Bvc2VkQnVkZ2V0L2luY2VudGl2ZVBheW1lbnRzL2VwQW10LyR7eWVhcn0vJHtxdWFydGVyfWAsXG4gIHZhbHVlXG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7Ozs7Ozs7OztBQWZaLFNBQVNBLFFBQVQsUUFBeUIsV0FBekI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE9BQU8sTUFBTUMsbUJBQW1CLEdBQUcsQ0FBQ0MsSUFBRCxFQUFPQyxPQUFQLEVBQWdCQyxLQUFoQixLQUEyQjtFQUFBO0VBQUE7RUFBQTtJQUM1REMsSUFBSSxFQUFFTCxRQURzRDtJQUU1RE0sSUFBSSxFQUFHLDBDQUF5Q0osSUFBSyxJQUFHQyxPQUFRLEVBRko7SUFHNURDO0VBSDREO0FBSTdELENBSk07QUFNUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE9BQU8sTUFBTUcscUJBQXFCLEdBQUcsQ0FBQ0wsSUFBRCxFQUFPQyxPQUFQLEVBQWdCQyxLQUFoQixLQUEyQjtFQUFBO0VBQUE7RUFBQTtJQUM5REMsSUFBSSxFQUFFTCxRQUR3RDtJQUU5RE0sSUFBSSxFQUFHLDJDQUEwQ0osSUFBSyxJQUFHQyxPQUFRLEVBRkg7SUFHOURDO0VBSDhEO0FBSS9ELENBSk07QUFNUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE9BQU8sTUFBTUksbUJBQW1CLEdBQUcsQ0FBQ04sSUFBRCxFQUFPQyxPQUFQLEVBQWdCQyxLQUFoQixLQUEyQjtFQUFBO0VBQUE7RUFBQTtJQUM1REMsSUFBSSxFQUFFTCxRQURzRDtJQUU1RE0sSUFBSSxFQUFHLDBDQUF5Q0osSUFBSyxJQUFHQyxPQUFRLEVBRko7SUFHNURDO0VBSDREO0FBSTdELENBSk07QUFNUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLE9BQU8sTUFBTUsscUJBQXFCLEdBQUcsQ0FBQ1AsSUFBRCxFQUFPQyxPQUFQLEVBQWdCQyxLQUFoQixLQUEyQjtFQUFBO0VBQUE7RUFBQTtJQUM5REMsSUFBSSxFQUFFTCxRQUR3RDtJQUU5RE0sSUFBSSxFQUFHLDJDQUEwQ0osSUFBSyxJQUFHQyxPQUFRLEVBRkg7SUFHOURDO0VBSDhEO0FBSS9ELENBSk0ifQ==