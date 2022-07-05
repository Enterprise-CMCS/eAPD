function cov_nuwd3cnpw() {
  var path = "/home/dmirano/Developer/eAPD/web/src/lazy/__mocks__/zxcvbn.js";
  var hash = "61599f1cdbda57d98b5586db2ac4e8a8c269df52";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/lazy/__mocks__/zxcvbn.js",
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "61599f1cdbda57d98b5586db2ac4e8a8c269df52"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_nuwd3cnpw = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_nuwd3cnpw();
import zxcvbn from 'zxcvbn'; // In a weird twist, the mock version of the lazy-loading zxcvbn wrapper should
// simply return the real zxcvbn immediately. ¯\_(ツ)_/¯

export default zxcvbn;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ6eGN2Ym4iXSwic291cmNlcyI6WyJ6eGN2Ym4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHp4Y3ZibiBmcm9tICd6eGN2Ym4nO1xuXG4vLyBJbiBhIHdlaXJkIHR3aXN0LCB0aGUgbW9jayB2ZXJzaW9uIG9mIHRoZSBsYXp5LWxvYWRpbmcgenhjdmJuIHdyYXBwZXIgc2hvdWxkXG4vLyBzaW1wbHkgcmV0dXJuIHRoZSByZWFsIHp4Y3ZibiBpbW1lZGlhdGVseS4gwq9cXF8o44OEKV8vwq9cbmV4cG9ydCBkZWZhdWx0IHp4Y3ZibjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7Ozs7Ozs7OztBQWZaLE9BQU9BLE1BQVAsTUFBbUIsUUFBbkIsQyxDQUVBO0FBQ0E7O0FBQ0EsZUFBZUEsTUFBZiJ9