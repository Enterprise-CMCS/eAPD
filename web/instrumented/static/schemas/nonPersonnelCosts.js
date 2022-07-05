function cov_1brq33uen5() {
  var path = "/home/dmirano/Developer/eAPD/web/src/static/schemas/nonPersonnelCosts.js";
  var hash = "12486e6d386a3348c2fd98c7fb2102f8ff829bfe";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/static/schemas/nonPersonnelCosts.js",
    statementMap: {
      "0": {
        start: {
          line: 3,
          column: 32
        },
        end: {
          line: 30,
          column: 2
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
    hash: "12486e6d386a3348c2fd98c7fb2102f8ff829bfe"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1brq33uen5 = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1brq33uen5();
import Joi from 'joi';
const nonPersonnelCostsSchema = (cov_1brq33uen5().s[0]++, Joi.object({
  key: Joi.string(),
  category: Joi.string().valid('Hardware, software, and licensing', 'Equipment and supplies', 'Training and outreach', 'Travel', 'Administrative operations', 'Miscellaneous expenses for the project').messages({
    'any.only': 'Select a category.'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Provide a description of the selected non-personal category.'
  }),
  years: Joi.object().pattern(/\d{4}/, Joi.number().positive().allow(0).required().messages({
    'number.base': 'Provide an annual cost.',
    'number.empty': 'Provide an annual cost.',
    'number.format': 'Provide an annual cost greater than or equal to $0.',
    'number.positive': 'Provide an annual cost greater than or equal to $0.',
    'number.greater': 'Provide an annual cost greater than or equal to $0.',
    'number.allow': 'Provide an annual cost greater than or equal to $0.'
  }))
}));
export default nonPersonnelCostsSchema;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJKb2kiLCJub25QZXJzb25uZWxDb3N0c1NjaGVtYSIsIm9iamVjdCIsImtleSIsInN0cmluZyIsImNhdGVnb3J5IiwidmFsaWQiLCJtZXNzYWdlcyIsImRlc2NyaXB0aW9uIiwicmVxdWlyZWQiLCJ5ZWFycyIsInBhdHRlcm4iLCJudW1iZXIiLCJwb3NpdGl2ZSIsImFsbG93Il0sInNvdXJjZXMiOlsibm9uUGVyc29ubmVsQ29zdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpvaSBmcm9tICdqb2knO1xuXG5jb25zdCBub25QZXJzb25uZWxDb3N0c1NjaGVtYSA9IEpvaS5vYmplY3Qoe1xuXHRrZXk6IEpvaS5zdHJpbmcoKSxcblx0Y2F0ZWdvcnk6IEpvaS5zdHJpbmcoKVxuXHRcdC52YWxpZCgnSGFyZHdhcmUsIHNvZnR3YXJlLCBhbmQgbGljZW5zaW5nJywgJ0VxdWlwbWVudCBhbmQgc3VwcGxpZXMnLCAnVHJhaW5pbmcgYW5kIG91dHJlYWNoJywgJ1RyYXZlbCcsICdBZG1pbmlzdHJhdGl2ZSBvcGVyYXRpb25zJywgJ01pc2NlbGxhbmVvdXMgZXhwZW5zZXMgZm9yIHRoZSBwcm9qZWN0Jylcblx0XHQubWVzc2FnZXMoe1xuXHRcdFx0J2FueS5vbmx5JzogJ1NlbGVjdCBhIGNhdGVnb3J5LicsXG5cdFx0fSksXG5cdGRlc2NyaXB0aW9uOiBKb2kuc3RyaW5nKClcblx0XHQucmVxdWlyZWQoKVxuXHRcdC5tZXNzYWdlcyh7XG5cdFx0XHQnc3RyaW5nLmVtcHR5JzogJ1Byb3ZpZGUgYSBkZXNjcmlwdGlvbiBvZiB0aGUgc2VsZWN0ZWQgbm9uLXBlcnNvbmFsIGNhdGVnb3J5LicsXG5cdFx0fSksXG5cdHllYXJzOiBKb2kub2JqZWN0KCkucGF0dGVybihcblx0XHQvXFxkezR9Lyxcblx0XHRKb2kubnVtYmVyKClcblx0XHRcdC5wb3NpdGl2ZSgpXG5cdFx0XHQuYWxsb3coMClcblx0XHRcdC5yZXF1aXJlZCgpXG5cdFx0XHQubWVzc2FnZXMoe1xuXHRcdFx0XHQnbnVtYmVyLmJhc2UnOiAnUHJvdmlkZSBhbiBhbm51YWwgY29zdC4nLFxuXHRcdFx0XHQnbnVtYmVyLmVtcHR5JzogJ1Byb3ZpZGUgYW4gYW5udWFsIGNvc3QuJyxcblx0XHRcdFx0J251bWJlci5mb3JtYXQnOiAnUHJvdmlkZSBhbiBhbm51YWwgY29zdCBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJDAuJyxcblx0XHRcdFx0J251bWJlci5wb3NpdGl2ZSc6ICdQcm92aWRlIGFuIGFubnVhbCBjb3N0IGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAkMC4nLFxuXHRcdFx0XHQnbnVtYmVyLmdyZWF0ZXInOiAnUHJvdmlkZSBhbiBhbm51YWwgY29zdCBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJDAuJyxcblx0XHRcdFx0J251bWJlci5hbGxvdyc6ICdQcm92aWRlIGFuIGFubnVhbCBjb3N0IGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAkMC4nXG5cdFx0XHR9KVxuXHQpLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vblBlcnNvbm5lbENvc3RzU2NoZW1hOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZOzs7Ozs7Ozs7QUFmWixPQUFPQSxHQUFQLE1BQWdCLEtBQWhCO0FBRUEsTUFBTUMsdUJBQXVCLDZCQUFHRCxHQUFHLENBQUNFLE1BQUosQ0FBVztFQUMxQ0MsR0FBRyxFQUFFSCxHQUFHLENBQUNJLE1BQUosRUFEcUM7RUFFMUNDLFFBQVEsRUFBRUwsR0FBRyxDQUFDSSxNQUFKLEdBQ1JFLEtBRFEsQ0FDRixtQ0FERSxFQUNtQyx3QkFEbkMsRUFDNkQsdUJBRDdELEVBQ3NGLFFBRHRGLEVBQ2dHLDJCQURoRyxFQUM2SCx3Q0FEN0gsRUFFUkMsUUFGUSxDQUVDO0lBQ1QsWUFBWTtFQURILENBRkQsQ0FGZ0M7RUFPMUNDLFdBQVcsRUFBRVIsR0FBRyxDQUFDSSxNQUFKLEdBQ1hLLFFBRFcsR0FFWEYsUUFGVyxDQUVGO0lBQ1QsZ0JBQWdCO0VBRFAsQ0FGRSxDQVA2QjtFQVkxQ0csS0FBSyxFQUFFVixHQUFHLENBQUNFLE1BQUosR0FBYVMsT0FBYixDQUNOLE9BRE0sRUFFTlgsR0FBRyxDQUFDWSxNQUFKLEdBQ0VDLFFBREYsR0FFRUMsS0FGRixDQUVRLENBRlIsRUFHRUwsUUFIRixHQUlFRixRQUpGLENBSVc7SUFDVCxlQUFlLHlCQUROO0lBRVQsZ0JBQWdCLHlCQUZQO0lBR1QsaUJBQWlCLHFEQUhSO0lBSVQsbUJBQW1CLHFEQUpWO0lBS1Qsa0JBQWtCLHFEQUxUO0lBTVQsZ0JBQWdCO0VBTlAsQ0FKWCxDQUZNO0FBWm1DLENBQVgsQ0FBSCxDQUE3QjtBQTZCQSxlQUFlTix1QkFBZiJ9