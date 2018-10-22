[![Build status](https://img.shields.io/circleci/project/github/18F/cms-hitech-apd.svg)](https://circleci.com/gh/18F/workflows/cms-hitech-apd)
[![Test coverage](https://img.shields.io/codecov/c/github/18F/cms-hitech-apd.svg)](https://codecov.io/gh/18F/cms-hitech-apd)
[![Known Vulnerabilities](https://snyk.io/test/github/18f/cms-hitech-apd/badge.svg?targetFile=web%2Fpackage.json)](https://snyk.io/test/github/18f/cms-hitech-apd?targetFile=web%2Fpackage.json)
[![Known Vulnerabilities](https://snyk.io/test/github/18f/cms-hitech-apd/badge.svg?targetFile=api%2Fpackage.json)](https://snyk.io/test/github/18f/cms-hitech-apd?targetFile=api%2Fpackage.json)

# CMS HITECH APD app

This project aims to create a user-friendly, modern product to allow states to
submit their Medicaid HITECH APD information to CMS easily and help CMS analysts
review requests more efficiently.

## Developing

After you clone the repo, you can use [Docker](https://www.docker.com/) to get
your local environment up and running quickly, or you can install the
[Node.js](https://nodejs.org) dependencies directly.

If you follow the instructions here, you'll end up with a functioning app and
an initialized database. A default dev user is created as well, with username
`em@il.com` and password `password`.

See the [testing documentation](docs/testing.md) for information about running tests.

### docker

Run `docker-compose up`, wait until it's done, and then run the following
command to create and seed your database:

```
docker-compose exec api bash -c "npm run migrate && npm run seed"
```

Once that finishes, you should be good to go. Open http://localhost:8080/
in your browser.

### direct

Run these commands from the repo root to get the web app going:

```
cd web
npm install
npm start
```

Then, open http://localhost:8001/ in your browser.

To start the API server, make sure (a) your environment variables are
[configured](docs/api-configuration.md), (b) Postgres is running (i.e., `brew services start postgresql`), and (c) the development database exists
([db settings](api/knexfile.js)). Then, run these commands from the repo root:

```
cd api
npm install
npm run migrate
npm start
```

The server should now be running at http://localhost:8000/

### Documentation

Check out the [technical documentation](docs/index.md) for a deeper dive into
how the app works.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in
[CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright
> and related rights in the work worldwide are waived through the
> [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication.
> By submitting a pull request, you are agreeing to comply with this waiver of
> copyright interest.
