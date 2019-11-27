# Docker

Our Docker configuration consists of four containers:

1. PostgreSQL database
2. API
3. Web app

The PostgreSQL database container is based on the official image from Docker
Hub, so there is no customization.

### API

The API image is built from the `/api/Dockerfile` config. The API
`package.json` and `package-lock.json` files are added to the container and
then `npm ci` is run. This installs packages and versions from the lockfile
so as to closely mirror the deployed environment. Once built, The image is
named `cms-eapd/api`. It is then tagged with the MD5 hash of the
`api/package-lock.json` file. This way, when the `package-lock.json` changes,
docker-compose will know to rebuild the image.

When started, the container will listen on your local machine's port 8081.
It uses [nodemon](https://npm.im/nodemon) to watch for file changes and will
restart the API whenever it detects changes in the API source code.

### Web app

The web app image is built from the `/web/Dockerfile` config. The web
`package.json` and `package-lock.json` files are added to the container and
then `npm ci` is run. This installs packages and versions from the lockfile
so as to closely mirror the deployed environment. Once built, The image is
named `cms-eapd/web`.

When started, the web app container will listen on your local machine's
port 8080. The web app container is using
[webpack-dev-server](https://npm.im/webpack-dev-server) to watch for file
changes and will rebuild the web app whenever they detect changes in the
app source code.
