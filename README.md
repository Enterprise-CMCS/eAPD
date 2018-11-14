[![Build status](https://img.shields.io/circleci/project/github/18F/cms-hitech-apd.svg)](https://circleci.com/gh/18F/workflows/cms-hitech-apd)
[![Test coverage](https://img.shields.io/codecov/c/github/18F/cms-hitech-apd.svg)](https://codecov.io/gh/18F/cms-hitech-apd)
[![Known Vulnerabilities](https://snyk.io/test/github/18f/cms-hitech-apd/badge.svg?targetFile=web%2Fpackage.json)](https://snyk.io/test/github/18f/cms-hitech-apd?targetFile=web%2Fpackage.json)
[![Known Vulnerabilities](https://snyk.io/test/github/18f/cms-hitech-apd/badge.svg?targetFile=api%2Fpackage.json)](https://snyk.io/test/github/18f/cms-hitech-apd?targetFile=api%2Fpackage.json)

# CMS eAPD app

This project aims to create a user-friendly, modern product to streamline the
creation, submission, review, and approval of Medicaid APDs and their
associated contract documents. It is currently limited to HITECH but may
potentially be expanded to other Medicaid programs in the future.

## Developing

### Getting the code

First you'll need to get the code onto your computer. The easiest way is to
clone it with git. If you're not familiar with git, a tool like
[Github Desktop](https://desktop.github.com/) or
[SourceTree](https://www.sourcetreeapp.com/) can help make the experience
easier.

Most people will use the HTTPS link, but if you're a project contributor and
you have your SSH keys configured, you'll clone from the SSH link. You can
find the link by clicking the green "Clone or download" button above the file
listing on this page.

The HTTPS link is https://github.com/18F/cms-hitech-apd.git

If you're familiar with git and just want to work from the command line, you
just need to run:

```shell
git clone https://github.com/18F/cms-hitech-apd.git
```

If you can't use git for some reason, you can also download the most recent
code as [a ZIP file](https://github.com/18F/cms-hitech-apd/archive/master.zip).

### Making it run

There are a couple of ways to get the app running after you've got it on your
computer. If you have [Docker](https://www.docker.com), we provide a Docker
configuration that will quickly install and build everything you need, so don't
have to. It'll also take care of getting everything running and connected.
If you don't have or can't use Docker, you can also do it [manually](#manually).

### docker

From your command line, switch to the directory where you put the code and
then run `docker-compose up`. This will do several things:

1. create a PostgreSQL database in a container
2. create a container for the API server, download all of its dependencies, and
   hook it up to the database
3. create a container for the web application, download all of its
   dependencies, and build it
4. create a container for the component
   [Storybook](https://github.com/storybooks/storybook)

This could take a few minutes. Once it's finished, everything is installed,
configured, and running. However, the database will still be empty, so that
needs to be created and populated with starter data. To do that, run:

```shell
docker-compose exec api npm run migrate
docker-compose exec api npm run seed
```

This will create database tables and put in some data the app needs to run,
like the list of states and territories and a user account you can use to
log into the app.

You should now be able to open the app at
[http://localhost:8080](http://localhost:8080). You can log in with username
`em@il.com` and password `password`.

You can also view the component Storybook at
[http://localhost:8082](http://localhost:8082)

See the [testing documentation](docs/testing.md) for information about running tests.

### manually

From your command line, switch to the directory where you put the code and
then run these commands:

```
cd web
npm install
cd ../api
npm install
cd ..
```

This will download and install the dependencies for the web application and the
API server. They're not started yet, though. Next, you need to make sure
[PostgreSQL](https://www.postgresql.org/) is installed and running (or that you
have an available connection to a PostgreSQL database somewhere else).

The next step is to set your
[environment variables](docs/api-configuration.md). On Linux and MacOS, you
can just set them in your command line:

```shell
export VARIABLE_NAME=value
```

You will need to set _at least_ the `DEV_DB_HOST` environment variable. If
PostgreSQL is running on your computer, it should probably be `localhost`:

```shell
export DEV_DB_HOST=localhost
```

You can also play with setting any of the others you want, but be aware that
setting some of them incorrectly can cause the app to fail.

One you have PostgreSQL setup and your environment variables set, you can
setup the database by running:

```
cd api
npm run migrate
npm run seed
```

This will create database tables and put in some data the app needs to run,
like the list of states and territories and a user account you can use to
log into the app.

Now you're ready to run the app. You will need two command line windows,
because both the API server and the web application will run until you stop
them, so you can't run both in the same window (unless you want to put one in
the background, but that's beyond the scope of this README).

From one command line window, switch to the directory where you put the code,
then run:

```shell
cd api
npm start
```

That starts up the API server. From the other window, switch to the directory
where you put the code and run:

```shell
cd web
npm start
```

That starts up a special server that will build and serve the web application.

You should now be able to open the app at
[http://localhost:8080](http://localhost:8080). You can log in with username
`em@il.com` and password `password`.

The server should now be running at http://localhost:8000/

The component Storybook also runs in its own process, so if you want to run it
along with the web app and API, you'll need another terminal window. However,
the Storybook is optional - it can be useful for seeing what the various
components in the app look like and understanding how to use them.

```shell
cd web
npm run storybook
```

The Storybook is now running at http://localhost:9001

See the [testing documentation](docs/testing.md) for information about running tests.

### development

We would be happy to receive pull requests to fix bugs or make improvements,
though we can't make any promises about having time to review or accept them.
Pull requests should be made into the `master` branch. Be sure to check out
our [contributing](CONTRIBUTING.md) guide for info about our policies.

### deeper documentation

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
