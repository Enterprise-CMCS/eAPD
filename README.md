[![Build status](https://img.shields.io/circleci/project/github/18F/cms-hitech-apd.svg)](https://circleci.com/gh/18F/cms-hitech-apd)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/18F/cms-hitech-apd.svg)](https://codeclimate.com/github/18F/cms-hitech-apd/maintainability)
[![Test coverage](https://img.shields.io/codecov/c/github/18F/cms-hitech-apd.svg)](https://codecov.io/gh/18F/cms-hitech-apd)
[![Dependency status](https://img.shields.io/gemnasium/18F/cms-hitech-apd.svg)](https://gemnasium.com/github.com/18F/cms-hitech-apd)

# CMS HITECH APD app

This project aims to create a user-friendly, modern product to allow states to
submit their Medicaid HITECH APD information to CMS easily and help CMS
analysts review the requests more efficiently.

## Developing

After you clone the repo, you can use [Docker](https://www.docker.com/) to get your local environment
up and running quickly, or you can just install your [Node.js](https://nodejs.org) dependencies directly.

### docker

Just run `docker-compose up`, wait until it's done, and then open http://localhost:8080/ in your browser.

### direct

Run these commands from the repo root to get the web app going:

```
cd web
npm install
npm start
```

Then open http://localhost:8080/ in your browser.

## Public domain

This project is in the worldwide [public domain](LICENSE.md).   As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within   the United States, and copyright and related rights in the
> work worldwide are waived through the
> [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).  
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request,
> you are agreeing to comply with this waiver of copyright interest.
