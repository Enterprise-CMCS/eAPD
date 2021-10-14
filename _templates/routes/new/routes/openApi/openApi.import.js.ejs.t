---
inject: true
to: api/routes/openApi/index.js
before: OPENAPI IMPORT INSERTION POINT
---
const <%= httpVerb %><%= h.changeCase.pascalCase(httpPath.replace('/', ' ')) %> = require('../<%= httpPath %>/<%= httpVerb %>OpenApi');
