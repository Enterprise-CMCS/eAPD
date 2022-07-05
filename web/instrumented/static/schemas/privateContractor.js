function cov_vbz7patjl() {
  var path = "/home/dmirano/Developer/eAPD/web/src/static/schemas/privateContractor.js";
  var hash = "0a783ea61d5579fa9155a02feaed59717d594cfa";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/static/schemas/privateContractor.js",
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
          column: 16
        },
        end: {
          line: 92,
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
    hash: "0a783ea61d5579fa9155a02feaed59717d594cfa"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_vbz7patjl = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_vbz7patjl();
const Joi = (cov_vbz7patjl().s[0]++, require('joi').extend(require('@joi/date')));
const schemas = (cov_vbz7patjl().s[1]++, Joi.object({
  key: Joi.any(),
  name: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a private contractor or vendor name.',
    'string.empty': 'Provide a private contractor or vendor name.',
    'string.min': 'Provide a private contractor or vendor name.'
  }),
  description: Joi.string().trim().min(1).required().messages({
    'string.base': 'Provide a procurement methodology and description of services.',
    'string.empty': 'Provide a procurement methodology and description of services.',
    'string.min': 'Provide a procurement methodology and description of services.'
  }),
  start: Joi.date().format('YYYY-MM-DD').iso().required().messages({
    'date.required': 'Provide a start date.',
    'date.base': 'Provide a start date.',
    'date.empty': 'Provide a start date.',
    'date.format': 'Provide a start date.'
  }),
  end: Joi.date().format('YYYY-MM-DD').iso().min(Joi.ref('start')).required().messages({
    'date.required': 'Provide an end date.',
    'date.base': 'Provide an end date.',
    'date.empty': 'Provide an end date.',
    'date.format': 'Provide an end date.',
    'date.min': 'Provide an end date that is after the start date.',
    'any.ref': 'Provide an end date that is after the start date.'
  }),
  totalCost: Joi.number().positive().allow(0).required().messages({
    'number.base': 'Provide a contract cost greater than or equal to $0.',
    'number.empty': 'Provide a contract cost greater than or equal to $0.',
    'number.format': 'Provide a contract cost greater than or equal to $0.',
    'number.positive': 'Provide a contract cost greater than or equal to $0.',
    'number.allow': 'Provide a contract cost greater than or equal to $0.'
  }),
  useHourly: Joi.string().required().messages({
    'string.base': 'Must select hourly or yearly.',
    'string.empty': 'Must select hourly or yearly.'
  }),
  hourly: Joi.alternatives().conditional('useHourly', {
    is: 'yes',
    then: Joi.object().pattern(/\d{4}/, Joi.object({
      hours: Joi.number().positive().allow(0).required().messages({
        'number.base': 'Provide a number of hours greater than or equal to 0.',
        'number.positive': 'Provide a number of hours greater than or equal to 0.',
        'number.allow': 'Provide a number of hours greater than or equal to 0.',
        'number.empty': 'Provide a number of hours greater than or equal to 0.',
        'number.format': 'Provide a valid number of hours.'
      }),
      rate: Joi.number().positive().allow(0).required().messages({
        'number.base': 'Provide an hourly rate greater than or equal to $0.',
        'number.empty': 'Provide an hourly rate greater than or equal to $0.',
        'number.positive': 'Provide an hourly rate greater than or equal to $0.',
        'number.allow': 'Provide an hourly rate greater than or equal to $0.',
        'number.format': 'Provide a valid dollar value.'
      })
    })),
    otherwise: Joi.any()
  }),
  years: Joi.alternatives().conditional('useHourly', {
    is: 'no',
    then: Joi.object().pattern(/\d{4}/, Joi.number().positive().allow(0).required().messages({
      'number.base': 'Provide an annual cost greater than or equal to $0.',
      'number.empty': 'Provide an annual cost greater than or equal to $0.',
      'number.positive': 'Provide an annual cost greater than or equal to $0.',
      'number.allow': 'Provide an annual cost greater than or equal to $0.',
      'number.format': 'Provide a valid dollar value.'
    })),
    otherwise: Joi.any()
  }),
  files: Joi.any()
}));
export default schemas;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJKb2kiLCJyZXF1aXJlIiwiZXh0ZW5kIiwic2NoZW1hcyIsIm9iamVjdCIsImtleSIsImFueSIsIm5hbWUiLCJzdHJpbmciLCJ0cmltIiwibWluIiwicmVxdWlyZWQiLCJtZXNzYWdlcyIsImRlc2NyaXB0aW9uIiwic3RhcnQiLCJkYXRlIiwiZm9ybWF0IiwiaXNvIiwiZW5kIiwicmVmIiwidG90YWxDb3N0IiwibnVtYmVyIiwicG9zaXRpdmUiLCJhbGxvdyIsInVzZUhvdXJseSIsImhvdXJseSIsImFsdGVybmF0aXZlcyIsImNvbmRpdGlvbmFsIiwiaXMiLCJ0aGVuIiwicGF0dGVybiIsImhvdXJzIiwicmF0ZSIsIm90aGVyd2lzZSIsInllYXJzIiwiZmlsZXMiXSwic291cmNlcyI6WyJwcml2YXRlQ29udHJhY3Rvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBKb2kgPSByZXF1aXJlKCdqb2knKS5leHRlbmQocmVxdWlyZSgnQGpvaS9kYXRlJykpO1xuXG5jb25zdCBzY2hlbWFzID0gSm9pLm9iamVjdCh7XG4gIGtleTogSm9pLmFueSgpLFxuICBuYW1lOiBKb2kuc3RyaW5nKCkudHJpbSgpLm1pbigxKS5yZXF1aXJlZCgpLm1lc3NhZ2VzKHtcbiAgICAnc3RyaW5nLmJhc2UnOiAnUHJvdmlkZSBhIHByaXZhdGUgY29udHJhY3RvciBvciB2ZW5kb3IgbmFtZS4nLFxuICAgICdzdHJpbmcuZW1wdHknOiAnUHJvdmlkZSBhIHByaXZhdGUgY29udHJhY3RvciBvciB2ZW5kb3IgbmFtZS4nLFxuICAgICdzdHJpbmcubWluJzogJ1Byb3ZpZGUgYSBwcml2YXRlIGNvbnRyYWN0b3Igb3IgdmVuZG9yIG5hbWUuJ1xuICB9KSxcbiAgZGVzY3JpcHRpb246IEpvaS5zdHJpbmcoKS50cmltKCkubWluKDEpLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xuICAgICdzdHJpbmcuYmFzZSc6XG4gICAgICAnUHJvdmlkZSBhIHByb2N1cmVtZW50IG1ldGhvZG9sb2d5IGFuZCBkZXNjcmlwdGlvbiBvZiBzZXJ2aWNlcy4nLFxuICAgICdzdHJpbmcuZW1wdHknOlxuICAgICAgJ1Byb3ZpZGUgYSBwcm9jdXJlbWVudCBtZXRob2RvbG9neSBhbmQgZGVzY3JpcHRpb24gb2Ygc2VydmljZXMuJyxcbiAgICAnc3RyaW5nLm1pbic6XG4gICAgICAnUHJvdmlkZSBhIHByb2N1cmVtZW50IG1ldGhvZG9sb2d5IGFuZCBkZXNjcmlwdGlvbiBvZiBzZXJ2aWNlcy4nXG4gIH0pLFxuICBzdGFydDogSm9pLmRhdGUoKS5mb3JtYXQoJ1lZWVktTU0tREQnKS5pc28oKS5yZXF1aXJlZCgpLm1lc3NhZ2VzKHtcbiAgICAnZGF0ZS5yZXF1aXJlZCc6ICdQcm92aWRlIGEgc3RhcnQgZGF0ZS4nLFxuICAgICdkYXRlLmJhc2UnOiAnUHJvdmlkZSBhIHN0YXJ0IGRhdGUuJyxcbiAgICAnZGF0ZS5lbXB0eSc6ICdQcm92aWRlIGEgc3RhcnQgZGF0ZS4nLFxuICAgICdkYXRlLmZvcm1hdCc6ICdQcm92aWRlIGEgc3RhcnQgZGF0ZS4nXG4gIH0pLFxuICBlbmQ6IEpvaS5kYXRlKClcbiAgICAuZm9ybWF0KCdZWVlZLU1NLUREJylcbiAgICAuaXNvKClcbiAgICAubWluKEpvaS5yZWYoJ3N0YXJ0JykpXG4gICAgLnJlcXVpcmVkKClcbiAgICAubWVzc2FnZXMoe1xuICAgICAgJ2RhdGUucmVxdWlyZWQnOiAnUHJvdmlkZSBhbiBlbmQgZGF0ZS4nLFxuICAgICAgJ2RhdGUuYmFzZSc6ICdQcm92aWRlIGFuIGVuZCBkYXRlLicsXG4gICAgICAnZGF0ZS5lbXB0eSc6ICdQcm92aWRlIGFuIGVuZCBkYXRlLicsXG4gICAgICAnZGF0ZS5mb3JtYXQnOiAnUHJvdmlkZSBhbiBlbmQgZGF0ZS4nLFxuICAgICAgJ2RhdGUubWluJzogJ1Byb3ZpZGUgYW4gZW5kIGRhdGUgdGhhdCBpcyBhZnRlciB0aGUgc3RhcnQgZGF0ZS4nLFxuICAgICAgJ2FueS5yZWYnOiAnUHJvdmlkZSBhbiBlbmQgZGF0ZSB0aGF0IGlzIGFmdGVyIHRoZSBzdGFydCBkYXRlLidcbiAgICB9KSxcbiAgdG90YWxDb3N0OiBKb2kubnVtYmVyKCkucG9zaXRpdmUoKS5hbGxvdygwKS5yZXF1aXJlZCgpLm1lc3NhZ2VzKHtcbiAgICAnbnVtYmVyLmJhc2UnOiAnUHJvdmlkZSBhIGNvbnRyYWN0IGNvc3QgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICQwLicsXG4gICAgJ251bWJlci5lbXB0eSc6ICdQcm92aWRlIGEgY29udHJhY3QgY29zdCBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJDAuJyxcbiAgICAnbnVtYmVyLmZvcm1hdCc6ICdQcm92aWRlIGEgY29udHJhY3QgY29zdCBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJDAuJyxcbiAgICAnbnVtYmVyLnBvc2l0aXZlJzogJ1Byb3ZpZGUgYSBjb250cmFjdCBjb3N0IGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAkMC4nLFxuICAgICdudW1iZXIuYWxsb3cnOiAnUHJvdmlkZSBhIGNvbnRyYWN0IGNvc3QgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICQwLidcbiAgfSksXG4gIHVzZUhvdXJseTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xuICAgICdzdHJpbmcuYmFzZSc6ICdNdXN0IHNlbGVjdCBob3VybHkgb3IgeWVhcmx5LicsXG4gICAgJ3N0cmluZy5lbXB0eSc6ICdNdXN0IHNlbGVjdCBob3VybHkgb3IgeWVhcmx5LidcbiAgfSksXG4gIGhvdXJseTogSm9pLmFsdGVybmF0aXZlcygpLmNvbmRpdGlvbmFsKCd1c2VIb3VybHknLCB7XG4gICAgaXM6ICd5ZXMnLFxuICAgIHRoZW46IEpvaS5vYmplY3QoKS5wYXR0ZXJuKFxuICAgICAgL1xcZHs0fS8sXG4gICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgaG91cnM6IEpvaS5udW1iZXIoKS5wb3NpdGl2ZSgpLmFsbG93KDApLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xuICAgICAgICAgICdudW1iZXIuYmFzZSc6XG4gICAgICAgICAgICAnUHJvdmlkZSBhIG51bWJlciBvZiBob3VycyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMC4nLFxuICAgICAgICAgICdudW1iZXIucG9zaXRpdmUnOlxuICAgICAgICAgICAgJ1Byb3ZpZGUgYSBudW1iZXIgb2YgaG91cnMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDAuJyxcbiAgICAgICAgICAnbnVtYmVyLmFsbG93JzpcbiAgICAgICAgICAgICdQcm92aWRlIGEgbnVtYmVyIG9mIGhvdXJzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAwLicsXG4gICAgICAgICAgJ251bWJlci5lbXB0eSc6XG4gICAgICAgICAgICAnUHJvdmlkZSBhIG51bWJlciBvZiBob3VycyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMC4nLFxuICAgICAgICAgICdudW1iZXIuZm9ybWF0JzogJ1Byb3ZpZGUgYSB2YWxpZCBudW1iZXIgb2YgaG91cnMuJ1xuICAgICAgICB9KSxcbiAgICAgICAgcmF0ZTogSm9pLm51bWJlcigpLnBvc2l0aXZlKCkuYWxsb3coMCkucmVxdWlyZWQoKS5tZXNzYWdlcyh7XG4gICAgICAgICAgJ251bWJlci5iYXNlJzogJ1Byb3ZpZGUgYW4gaG91cmx5IHJhdGUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICQwLicsXG4gICAgICAgICAgJ251bWJlci5lbXB0eSc6ICdQcm92aWRlIGFuIGhvdXJseSByYXRlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAkMC4nLFxuICAgICAgICAgICdudW1iZXIucG9zaXRpdmUnOlxuICAgICAgICAgICAgJ1Byb3ZpZGUgYW4gaG91cmx5IHJhdGUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICQwLicsXG4gICAgICAgICAgJ251bWJlci5hbGxvdyc6ICdQcm92aWRlIGFuIGhvdXJseSByYXRlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAkMC4nLFxuICAgICAgICAgICdudW1iZXIuZm9ybWF0JzogJ1Byb3ZpZGUgYSB2YWxpZCBkb2xsYXIgdmFsdWUuJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICApLFxuICAgIG90aGVyd2lzZTogSm9pLmFueSgpXG4gIH0pLFxuICB5ZWFyczogSm9pLmFsdGVybmF0aXZlcygpLmNvbmRpdGlvbmFsKCd1c2VIb3VybHknLCB7XG4gICAgaXM6ICdubycsXG4gICAgdGhlbjogSm9pLm9iamVjdCgpLnBhdHRlcm4oXG4gICAgICAvXFxkezR9LyxcbiAgICAgIEpvaS5udW1iZXIoKS5wb3NpdGl2ZSgpLmFsbG93KDApLnJlcXVpcmVkKCkubWVzc2FnZXMoe1xuICAgICAgICAnbnVtYmVyLmJhc2UnOiAnUHJvdmlkZSBhbiBhbm51YWwgY29zdCBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJDAuJyxcbiAgICAgICAgJ251bWJlci5lbXB0eSc6ICdQcm92aWRlIGFuIGFubnVhbCBjb3N0IGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAkMC4nLFxuICAgICAgICAnbnVtYmVyLnBvc2l0aXZlJzpcbiAgICAgICAgICAnUHJvdmlkZSBhbiBhbm51YWwgY29zdCBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJDAuJyxcbiAgICAgICAgJ251bWJlci5hbGxvdyc6ICdQcm92aWRlIGFuIGFubnVhbCBjb3N0IGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAkMC4nLFxuICAgICAgICAnbnVtYmVyLmZvcm1hdCc6ICdQcm92aWRlIGEgdmFsaWQgZG9sbGFyIHZhbHVlLidcbiAgICAgIH0pXG4gICAgKSxcbiAgICBvdGhlcndpc2U6IEpvaS5hbnkoKVxuICB9KSxcbiAgZmlsZXM6IEpvaS5hbnkoKVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNjaGVtYXM7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZOzs7Ozs7Ozs7QUFmWixNQUFNQSxHQUFHLDRCQUFHQyxPQUFPLENBQUMsS0FBRCxDQUFQLENBQWVDLE1BQWYsQ0FBc0JELE9BQU8sQ0FBQyxXQUFE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