---
inject: true
to: api/routes/index.js
before: ROUTE REGISTRATION INSERTION POINT
---
  logger.debug('setting up routes for <%=httpVerb %> <%=httpPath %>');
  <%= httpVerb %><%= h.changeCase.pascalCase(httpPath.replace('/', ' ')) %>(app);
