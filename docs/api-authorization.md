# Authorization model

We're using a combination of role-based and activity-based authorization:
the actual logic of authorizing requests is purely activity-based, but to
simplify administration, we're using roles to group activities.  A user
has a role, and that role identifies what activities they have permission
to perform.

We'll put the list of activities and roles here as we figure them out.

## How it works technically

#### Data model

There are three tables to support this authorization model.  `auth_activites`
is the full list of activities known to the system.  `auth_roles` is,
likewise, the full list of rules.  Finally, there is
`auth_role_activity_mapping` that maps a role to a set of activities.

#### The server

A user is assigned a role.  When a request arrives from the user, the
session cookie is decrypted and a user object is created, as described
in the [API authentication](api-authentication.md) documentation.  During
that user creation step, the user's role is fetched from the database,
and that role is then mapped to a list of activities.  Finally, the
list of activities is attached directly to the user object.

From there, we have an authorization middleware called `can`.  Each
endpoint can register that it needs authorization by adding a call to
the `can` endpoint during its setup, along with the activity the user
needs in order to be authorized:

```javascript
express.get('/my/path', can('dance-like-nobody-is-watching'), function(req, res, next) { ...
```

The `can` middleware will first use the `loggedIn` middleware to make
sure the user is logged in, and then it will verify that the user object
has the requested activity.

|case|result|
|---|---|
|not logged in|an HTTP 403 status is sent, and the endpoint handler is never called|
|logged in, does not have permission|an HTTP 401 status is sent, and the endpoint handler is never called
|logged in, has permission|the endpoint handler is called
