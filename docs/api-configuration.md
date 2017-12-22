# API configuration

Currently, the API is configured entirely with environment
variables:

- ### `NODE_ENV`
  - This variable is used to determine which database connection
    configuration to use while the app is running.  Knex reads
    its config information from `/api/knexfile.js`, which exports
    a few different configurations.  Knex picks the configuration
    that matches the current `NODE_ENV`.
  - This variable also controls which seed data is applied to the
    database when using the Knex `seed` command.
  - Supported values:
    - `development` - used during development (surprise!).  If you're
      developing with Docker, this gets set by the Docker config.
    - `test` - used during testing, eventually. Not used right now.
    - `staging` - used in our cloud staging environment.
  - **default**: development

- ### `SESSION_SECRET`
  - This is the secret used to encrypt client session cookies. It
    should be cryptographically strong.  This secret should be
    protected.
  - If the secret is changed and the API process restarted, all
    users will be effectively logged out.  If the secret is not set
    and the default value is used, users will be logged out every
    time the process restarts.
  - **default**: cryptographically-strong 64-character random hex string

- ### `PORT`
  - This is the port that the API process should listen on.
  - **default**: 8000

- ### `DATABASE_URL`
  - This variable is only used if `NODE_ENV` is set to `staging`.
  - This is the connection URL for the staging environment database.
    In our current deployment setup, the cloud provider sets this
    for us.  If it has to be set manually, it must be something
    that the underlying database client understands.
  - **default**: none

- ### `DEV_DB_HOST`
  - This variable is only used if `NODE_ENV` is set to `development`.
  - If you are developing the API code and *not* using Docker, the
    default development database configuration won't work for you because
    it expects to use a database host that is provided by Docker.  To
    get around that, set this variable to the hostname of your local
    PostgreSQL instance.
  - **default**: none
