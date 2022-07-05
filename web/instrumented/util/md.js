function cov_12h1uksrz4() {
  var path = "/home/dmirano/Developer/eAPD/web/src/util/md.js";
  var hash = "8af294568a4b4a27d3db1dc52eeec75f110aa2d8";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/util/md.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 11
        },
        end: {
          line: 3,
          column: 71
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "8af294568a4b4a27d3db1dc52eeec75f110aa2d8"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_12h1uksrz4 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_12h1uksrz4();
import MarkdownIt from 'markdown-it';
const md = (cov_12h1uksrz4().s[0]++, new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true
}));
export default md;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNYXJrZG93bkl0IiwibWQiLCJodG1sIiwieGh0bWxPdXQiLCJicmVha3MiXSwic291cmNlcyI6WyJtZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCc7XG5cbmNvbnN0IG1kID0gbmV3IE1hcmtkb3duSXQoeyBodG1sOiB0cnVlLCB4aHRtbE91dDogdHJ1ZSwgYnJlYWtzOiB0cnVlIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBtZDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZOzs7Ozs7Ozs7QUFmWixPQUFPQSxVQUFQLE1BQXVCLGFBQXZCO0FBRUEsTUFBTUMsRUFBRSw2QkFBRyxJQUFJRCxVQUFKLENBQWU7RUFBRUUsSUFBSSxFQUFFLElBQVI7RUFBY0MsUUFBUSxFQUFFLElBQXhCO0VBQThCQyxNQUFNLEVBQUU7QUFBdEMsQ0FBZixDQUFILENBQVI7QUFFQSxlQUFlSCxFQUFmIn0=