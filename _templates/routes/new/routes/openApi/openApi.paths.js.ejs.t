---
inject: true
to: api/routes/openApi/index.js
before: OPENAPI PATH INSERTION POINT
---
    ...<%= httpVerb %><%= h.changeCase.pascalCase(httpPath.replace('/', ' ')) %>,
