# Authentication

The API uses [Passport](https://passportjs.org) to simplify authentication.
Currently, we only support authentication against a local database. Users are
stored in a `users` table, uniquely identified by an email address, with a
bcrypt-hashed password.

To authenticate, users send an HTTP `POST` request to the `/auth/login`
endpoint. The body of the request must be form-encoded and contain `username`
and `password` fields. The API response is primarily just a status code: 200 for
a successful login, 400 for invalid request, 401 for invalid login, or 500 for a
server error. There is no response body for successful logins or server errors.

On a successful login, a session is generated and stored in its entirety in an
encrypted cookie using
[client-sessions](https://www.npmjs.com/package/client-sessions). The cookie is
encrypted with the contents of the `SESSION_SECRET` environment variable (see
the [API configuration documentation](api-configuration.md) for more info on
environment variables). At the moment, the session only contains a user's unique
database ID. On subsequent calls to the API, the session is decrypted and a full
user object is reconstructed by calling the database.
