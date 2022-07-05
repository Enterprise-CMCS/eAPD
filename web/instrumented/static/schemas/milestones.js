function cov_1dpwgub5km() {
  var path = "/home/dmirano/Developer/eAPD/web/src/static/schemas/milestones.js";
  var hash = "704680f9b83547b0fdd8e7b6396abc797655ba99";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/static/schemas/milestones.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 12
        },
        end: {
          line: 1,
          column: 55
        }
      },
      "1": {
        start: {
          line: 3,
          column: 25
        },
        end: {
          line: 19,
          column: 2
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "704680f9b83547b0fdd8e7b6396abc797655ba99"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1dpwgub5km = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1dpwgub5km();
const Joi = (cov_1dpwgub5km().s[0]++, require('joi').extend(require('@joi/date')));
const milestonesSchema = (cov_1dpwgub5km().s[1]++, Joi.object({
  key: Joi.any(),
  milestone: Joi.string().required().messages({
    'string.base': 'Milestone is required.',
    'string.empty': 'Milestone is required.'
  }),
  endDate: Joi.date().format('YYYY-MM-DD').iso().required().messages({
    'date.required': 'Provide a completion date.',
    'date.base': 'Provide a completion date.',
    'date.empty': 'Provide a completion date.',
    'date.format': 'Provide a completion date.'
  })
}));
export default milestonesSchema;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJKb2kiLCJyZXF1aXJlIiwiZXh0ZW5kIiwibWlsZXN0b25lc1NjaGVtYSIsIm9iamVjdCIsImtleSIsImFueSIsIm1pbGVzdG9uZSIsInN0cmluZyIsInJlcXVpcmVkIiwibWVzc2FnZXMiLCJlbmREYXRlIiwiZGF0ZSIsImZvcm1hdCIsImlzbyJdLCJzb3VyY2VzIjpbIm1pbGVzdG9uZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgSm9pID0gcmVxdWlyZSgnam9pJykuZXh0ZW5kKHJlcXVpcmUoJ0Bqb2kvZGF0ZScpKTtcblxuY29uc3QgbWlsZXN0b25lc1NjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBrZXk6IEpvaS5hbnkoKSxcbiAgbWlsZXN0b25lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKS5tZXNzYWdlcyh7XG4gICAgJ3N0cmluZy5iYXNlJzogJ01pbGVzdG9uZSBpcyByZXF1aXJlZC4nLFxuICAgICdzdHJpbmcuZW1wdHknOiAnTWlsZXN0b25lIGlzIHJlcXVpcmVkLidcbiAgfSksXG4gIGVuZERhdGU6IEpvaS5kYXRlKClcbiAgICAuZm9ybWF0KCdZWVlZLU1NLUREJylcbiAgICAuaXNvKClcbiAgICAucmVxdWlyZWQoKVxuICAgIC5tZXNzYWdlcyh7XG4gICAgICAnZGF0ZS5yZXF1aXJlZCc6ICdQcm92aWRlIGEgY29tcGxldGlvbiBkYXRlLicsXG4gICAgICAnZGF0ZS5iYXNlJzogJ1Byb3ZpZGUgYSBjb21wbGV0aW9uIGRhdGUuJyxcbiAgICAgICdkYXRlLmVtcHR5JzogJ1Byb3ZpZGUgYSBjb21wbGV0aW9uIGRhdGUuJyxcbiAgICAgICdkYXRlLmZvcm1hdCc6ICdQcm92aWRlIGEgY29tcGxldGlvbiBkYXRlLidcbiAgICB9KVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1pbGVzdG9uZXNTY2hlbWE7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlWTs7Ozs7Ozs7O0FBZlosTUFBTUEsR0FBRyw2QkFBR0MsT0FBTyxDQUFDLEtBQUQsQ0FBUCxDQUFlQyxNQUFmLENBQXNCRCxPQUFPLENBQUMsV0FBRCxDQUE3QixDQUFILENBQVQ7QUFFQSxNQUFNRSxnQkFBZ0IsNkJBQUdILEdBQUcsQ0FBQ0ksTUFBSixDQUFXO0VBQ2xDQyxHQUFHLEVBQUVMLEdBQUcsQ0FBQ00sR0FBSixFQUQ2QjtFQUVsQ0MsU0FBUyxFQUFFUCxHQUFHLENBQUNRLE1BQUosR0FBYUMsUUFBYixHQUF3QkMsUUFBeEIsQ0FBaUM7SUFDMUMsZUFBZSx3QkFEMkI7SUFFMUMsZ0JBQWdCO0VBRjBCLENBQWpDLENBRnVCO0VBTWxDQyxPQUFPLEVBQUVYLEdBQUcsQ0FBQ1ksSUFBSixHQUNOQyxNQURNLENBQ0MsWUFERCxFQUVOQyxHQUZNLEdBR05MLFFBSE0sR0FJTkMsUUFKTSxDQUlHO0lBQ1IsaUJBQWlCLDRCQURUO0lBRVIsYUFBYSw0QkFGTDtJQUdSLGNBQWMsNEJBSE47SUFJUixlQUFlO0VBSlAsQ0FKSDtBQU55QixDQUFYLENBQUgsQ0FBdEI7QUFrQkEsZUFBZVAsZ0JBQWYifQ==