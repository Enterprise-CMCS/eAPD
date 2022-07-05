function cov_etubkd9u6() {
  var path = "/home/dmirano/Developer/eAPD/web/src/i18n/locales/en/index.js";
  var hash = "be065fbbc896cbbfa7def93e27e8953a143e25f0";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/i18n/locales/en/index.js",
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "be065fbbc896cbbfa7def93e27e8953a143e25f0"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_etubkd9u6 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_etubkd9u6();
import activities from './activities';
import apd from './apd';
import assurancesAndCompliance from './assurancesAndCompliance.yaml';
import base from './app.yaml';
import certifyAndSubmit from './certifyAndSubmit.yaml';
import errors from './errors.yaml';
import executiveSummary from './executiveSummary.yaml';
import previousActivities from './previousActivities.yaml';
import proposedBudget from './proposedBudget.yaml';
import scheduleSummary from './scheduleSummary.yaml';
import sidebar from './sidebar.yaml';
import stateDashboard from './stateDashboard.yaml';
import storybook from './storybook.yaml';
import table from './table.yaml';
export default { ...base,
  activities,
  apd,
  assurancesAndCompliance,
  certifyAndSubmit,
  errors,
  executiveSummary,
  previousActivities,
  proposedBudget,
  scheduleSummary,
  sidebar,
  stateDashboard,
  storybook,
  table
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhY3Rpdml0aWVzIiwiYXBkIiwiYXNzdXJhbmNlc0FuZENvbXBsaWFuY2UiLCJiYXNlIiwiY2VydGlmeUFuZFN1Ym1pdCIsImVycm9ycyIsImV4ZWN1dGl2ZVN1bW1hcnkiLCJwcmV2aW91c0FjdGl2aXRpZXMiLCJwcm9wb3NlZEJ1ZGdldCIsInNjaGVkdWxlU3VtbWFyeSIsInNpZGViYXIiLCJzdGF0ZURhc2hib2FyZCIsInN0b3J5Ym9vayIsInRhYmxlIl0sInNvdXJjZXMiOlsiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFjdGl2aXRpZXMgZnJvbSAnLi9hY3Rpdml0aWVzJztcbmltcG9ydCBhcGQgZnJvbSAnLi9hcGQnO1xuaW1wb3J0IGFzc3VyYW5jZXNBbmRDb21wbGlhbmNlIGZyb20gJy4vYXNzdXJhbmNlc0FuZENvbXBsaWFuY2UueWFtbCc7XG5pbXBvcnQgYmFzZSBmcm9tICcuL2FwcC55YW1sJztcbmltcG9ydCBjZXJ0aWZ5QW5kU3VibWl0IGZyb20gJy4vY2VydGlmeUFuZFN1Ym1pdC55YW1sJztcbmltcG9ydCBlcnJvcnMgZnJvbSAnLi9lcnJvcnMueWFtbCc7XG5pbXBvcnQgZXhlY3V0aXZlU3VtbWFyeSBmcm9tICcuL2V4ZWN1dGl2ZVN1bW1hcnkueWFtbCc7XG5pbXBvcnQgcHJldmlvdXNBY3Rpdml0aWVzIGZyb20gJy4vcHJldmlvdXNBY3Rpdml0aWVzLnlhbWwnO1xuaW1wb3J0IHByb3Bvc2VkQnVkZ2V0IGZyb20gJy4vcHJvcG9zZWRCdWRnZXQueWFtbCc7XG5pbXBvcnQgc2NoZWR1bGVTdW1tYXJ5IGZyb20gJy4vc2NoZWR1bGVTdW1tYXJ5LnlhbWwnO1xuaW1wb3J0IHNpZGViYXIgZnJvbSAnLi9zaWRlYmFyLnlhbWwnO1xuaW1wb3J0IHN0YXRlRGFzaGJvYXJkIGZyb20gJy4vc3RhdGVEYXNoYm9hcmQueWFtbCc7XG5pbXBvcnQgc3Rvcnlib29rIGZyb20gJy4vc3Rvcnlib29rLnlhbWwnO1xuaW1wb3J0IHRhYmxlIGZyb20gJy4vdGFibGUueWFtbCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLi4uYmFzZSxcbiAgYWN0aXZpdGllcyxcbiAgYXBkLFxuICBhc3N1cmFuY2VzQW5kQ29tcGxpYW5jZSxcbiAgY2VydGlmeUFuZFN1Ym1pdCxcbiAgZXJyb3JzLFxuICBleGVjdXRpdmVTdW1tYXJ5LFxuICBwcmV2aW91c0FjdGl2aXRpZXMsXG4gIHByb3Bvc2VkQnVkZ2V0LFxuICBzY2hlZHVsZVN1bW1hcnksXG4gIHNpZGViYXIsXG4gIHN0YXRlRGFzaGJvYXJkLFxuICBzdG9yeWJvb2ssXG4gIHRhYmxlXG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTs7Ozs7Ozs7O0FBZlosT0FBT0EsVUFBUCxNQUF1QixjQUF2QjtBQUNBLE9BQU9DLEdBQVAsTUFBZ0IsT0FBaEI7QUFDQSxPQUFPQyx1QkFBUCxNQUFvQyxnQ0FBcEM7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLFlBQWpCO0FBQ0EsT0FBT0MsZ0JBQVAsTUFBNkIseUJBQTdCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixlQUFuQjtBQUNBLE9BQU9DLGdCQUFQLE1BQTZCLHlCQUE3QjtBQUNBLE9BQU9DLGtCQUFQLE1BQStCLDJCQUEvQjtBQUNBLE9BQU9DLGNBQVAsTUFBMkIsdUJBQTNCO0FBQ0EsT0FBT0MsZUFBUCxNQUE0Qix3QkFBNUI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLGdCQUFwQjtBQUNBLE9BQU9DLGNBQVAsTUFBMkIsdUJBQTNCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixrQkFBdEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGNBQWxCO0FBRUEsZUFBZSxFQUNiLEdBQUdWLElBRFU7RUFFYkgsVUFGYTtFQUdiQyxHQUhhO0VBSWJDLHVCQUphO0VBS2JFLGdCQUxhO0VBTWJDLE1BTmE7RUFPYkMsZ0JBUGE7RUFRYkMsa0JBUmE7RUFTYkMsY0FUYTtFQVViQyxlQVZhO0VBV2JDLE9BWGE7RUFZYkMsY0FaYTtFQWFiQyxTQWJhO0VBY2JDO0FBZGEsQ0FBZiJ9