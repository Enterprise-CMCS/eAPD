# Authentication

The API uses [Passport](https://passportjs.org) to simplify authentication.
Currently, we only support authentication against a local database. Users are
stored in a `users` table, uniquely identified by an email address, with a
SHA256-hashed password using PBKDF2 with a random salt and a number of
iterations calibrated to take about 300 ms.

Authentication is a two-step process. First, users obtain a nonce based on
their username (usernames are users' email addresses). This nonce is
cryptographically signed by the server and expires 3 seconds after it is
issued. To get a nonce, send an HTTP `POST` request to the `/auth/login/nonce`
endpoint. The body of the request must be a JSON object containing a
`username` property. The response will be a JSON object containing a `nonce`
property.

**_NOTE:_** Nonces are issued for _any_ request containing a username property.
Obtaining a nonce does not indicate a valid username.

The second step is to send an HTTP `POST` request to the `/auth/login`
endpoint. The body of the request must be form-encoded or JSON, and contain
`username` and `password` fields. The `username` field must be the nonce
retrieved earlier. The API response is primarily just a status code: 200 for
a successful login, 400 for invalid request, 401 for invalid login, or 500 for
a server error. There is no response body for successful logins or server
errors.

On a successful login, an authenticatino token is generated and stored in its
entirety in a cryptographically-signed JWT cookie. The cookie is signed with
the contents of the `SESSION_SECRET` environment variable (see
the [API configuration documentation](api-configuration.md) for more info on
environment variables). On subsequent calls to the API, the token is verified
and used to create a full user object from the database.
