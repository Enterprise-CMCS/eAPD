# Testing

We're big fans of testing, so we're putting in lots of testing throughout this
app, both frontend and backend. Here are some notes describing the tests and
how to run them.

If you haven't gotten everything running yet, [the README](../README.md) has
good instructions on how to get started.

## Frontend

On the frontend, we use [Jest](https://facebook.github.io/jest/) as the test
runner and [Enzyme](http://airbnb.io/enzyme/) as a React renderer. This gives
us unit testing and a heads-up if any components suddenly start rendering
differently. We will also use Enzyme to do feature testing, where we render
a full page, click buttons, and verify expected behaviors.

To run the tests, after everything is installed, just open a command line
and run:

```bash
cd web # get into the right directory!
npm test
```

That's it! The test reporter will show a coverage table at the end so you
can see what parts of the code need more tests. It will also generate an
LCOV coverage report, along with an HTML render of the report, if that's the
sort of thing you like to look at. It gets written to
`web/coverage/lcov-report/index.html`.

## Backend

On the backend, we use [node-tap](http://www.node-tap.org/) as the test runner,
assertion library, coverage reporter, and more. It's a pretty full-featured
library, so we lean on it. We use this for unit tests as well as end-to-end
API tests.

#### Unit tests

The unit tests are pretty easy to run since all external interactions are
mocked. Open a command line and run:

```bash
cd api # get into the right directory!
npm test
```

This doesn't show you a coverage report table like the Jest tester, but it does
generate an LCOV report and HTML render at `api/coverage/lcov-report/index.html`.

#### API/endpoint tests

Running the API tests is a little more involved because it requires that the
backend actually be running with a real database setup and everything. If
you're using Docker, there's a script you can run that will set everything up
for you:

```bash
cd api
./endpoint-tests/endpoint.sh
```

If you're not using Docker, here are the steps:

1. Make sure you have a database called `hitech_apd_test` in your Postgres instance
2. set the `NODE_ENV` environment variable to `test`
3. et the `ENDPOINT_COVERAGE_CAPTURE` environment variable to `yes`
4. set the `TEST_DB_HOST` environment variable to the hostname/address of your Postgres instance
5. open a command line, and switch to the API directory (`cd api`)
6. run `npm run migrate` to create the database structures
7. run `npm run seed` to populate the database with test data
8. run the API, either in the background or in a separate tab/window
   * to run in the background, run `npm start &`
   * if running in a separate tab/window, be sure to set the `NODE_ENV` and `TEST_DB_HOST` in the new tab/window
9. run `npm run test-endpoints`
10. all done! You can kill the backgrounded API now

> I strongly recommend using Docker because it sets everything up for you, in
> a clean and isolated environment. It even takes care of killing the backgrounded
> API process.

The `ENDPOINT_COVERAGE_CAPTURE` environment variable lets the API know to capture
a few extra pieces of information: the list of all endpoints that are registered
with Express, and the list of all endpoints that are requested along with the HTTP
status code that is sent in response. When the endpoint tests are done, those two
lists are combined with the OpenAPI documentation to identify which registered
endpoints are not documented as well as which endpoint + response status combinations
are not tested.
