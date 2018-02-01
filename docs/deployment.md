# Deployment

Currently we deploy two instances of the app to [cloud.gov](cloud.gov)
prototyping sandboxes.  The deployments are largely automated with
CircleCI, though there is one manual step to deploy the UX testing
instance.

### UX testing instance

The UX testing instance exists so that we can conduct user tests without
worrying that the app is going to change in the middle of the tests.  Once
users have started poking around on the app, it should stay the same for
the duration of the tests.  New features or design changes appearing in the
middle could interfere pretty severely with the user testing.

The UX testing instance is deployed *almost* automatically from the
`master` branch - almost because there is a manual approval required
first.  The basic flow of deployment is as follows:

1. new code is merged into `master`
2. all tests are run
3. staging instance is deployed
4. wait for approval to deploy UX testing instance
  - if approved, UX testing instance is deployed
  - otherwise, UX testing instance is not changed

We are using this manual approval step so that we don't have to maintain a
separate branch for the UX testing instance.  That gets to be cumbersome
quickly from a dev perspective.  With a separate branch, we would have to
periodically merge from `master` into the UX testing branch.  While that's
not strictly *difficult*, for people who don't use git or Github often, it
can be pretty complicated or confusing.  With this approach, there's a big
purple button you click when you want the UX testing instance to update.
This allows us to put designers and UX testers in charge of that environment
without requiring that they know git or Github.

### Staging instance

The staging instance deploys automatically with every commit to the `master`
branch.  That's all.
