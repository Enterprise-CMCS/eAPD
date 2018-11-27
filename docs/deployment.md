# Deployment

Currently we deploy a staging instance of the app to [cloud.gov](cloud.gov)
prototyping sandboxes. The deployments are automated with CircleCI.

### Staging instance

The staging instance deploys automatically with every commit to the `master`
branch. This deployment builds the web app then performs a zero downtime
deployment of both the web app and the API. Once the AP is deployed, the
deployment runs a one-time database migration and seed task on the API to make
sure the database is properly updated and any new required data is added.
