[![Build status](https://img.shields.io/circleci/project/github/18F/cms-hitech-apd.svg)](https://circleci.com/gh/18F/workflows/cms-hitech-apd)
[![Test coverage](https://img.shields.io/codecov/c/github/18F/cms-hitech-apd.svg)](https://codecov.io/gh/18F/cms-hitech-apd)
![Node.js >= 10.14](https://img.shields.io/badge/node-%3E%3D%2010.14-brightgreen.svg)

# CMS eAPD app

This project aims to create a user-friendly, modern product to streamline the
creation, submission, review, and approval of Medicaid APDs and their
associated contract documents. It is currently limited to HITECH but may
potentially be expanded to other Medicaid programs in the future.

_Please note:_ Any content contained in screenshots from the application within
the `cms-hitech-apd` repo should be considered test data being used for
development purposes ONLY. Project, financial, and timeline information is NOT
representative of any production data from actual users.

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

We recommend using [Docker](https://www.docker.com) to run the app locally. We
provide a Docker configuration that will quickly install and build everything
you need, so don't have to. It'll also take care of getting everything running
and connected. For more details, [see our wiki](/wiki/Dev%3A-Index#Docker). If
you don't have or can't use Docker, you can also run everything
[manually](#/wiki/Dev%3A-Index#Manually).

From your command line, switch to the directory where you put the code and
then run `docker-compose up`. This step could take a few minutes. Once it's
finished, run:

```shell
docker-compose exec api npm run migrate
docker-compose exec api npm run seed
```

You should now be able to open the app at
[http://localhost:8080](http://localhost:8080). You can log in with username
`em@il.com` and password `password` to view a state account, complete with
a filled-in APD. There is also an admin account with username `admin` and
password `password`.

See the [testing documentation](/wiki/Dev%3A-Testing) for information about
running tests.

### More technical documentation

Check out the [technical documentation](/wiki/Dev%3A-Index) for a deeper dive into
how the app works.

## Contributing

We would be happy to receive pull requests to fix bugs or make improvements,
though we can't make any promises about having time to review or accept them.
Pull requests should be made into the `master` branch. Be sure to check out
our [contributing](CONTRIBUTING.md) guide for info about our policies.

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
