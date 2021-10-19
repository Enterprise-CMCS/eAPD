---
inject: true
to: api/routes/index.js
before: ROUTE IMPORT INSERTION POINT
---
const <%= httpVerb %><%= h.changeCase.pascalCase(httpPath.replace('/', ' ')) %> = require('./<%= httpPath %>/<%= httpVerb %>');
