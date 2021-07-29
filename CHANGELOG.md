# Next release

Anticipated release: July 28, 2021

#### 🚀 New features

- manage affiliations and choose state page now make live calls for the list of affiliations ([#3264])
- Update the roles returned by the roles endpoint ([#3277])

#### 🐛 Bugs fixed

- resolved issue with invalid jwt throwing error ([#3283])
- Reduced the size of the JWT payload because sys admins had a 24KB payload and the max size is 4KB. ([#3246])
- fixed error for users with view-document permission not being able to load an APD([#3264])

#### ⚙️ Behind the scenes

- updated APD seed data used for testing ([#2863])
- created test tokens when database is seeded (development and test only) ([#3128])
- add tests for authentication ([#3188])
- install cypress for end-to-end testing ([#3226])
- updated APD seed data used for testing ([#2863])
- prevented some unexpected JSON parsing errors from being escalated to the error log. ([#3176])
- Reduced the size of the JWT payload because sys admins had a 24KB payload and the max size is 4KB. ([#3246])
- fixed error for users with view-document permission not being able to load an APD([#3264])
- added end-to-end test for APD overview section ([#3282])


# Previous releases

See our [release history](https://github.com/CMSgov/eAPD/releases)

[#3283]: https://github.com/CMSgov/eAPD/issues/3283
[#2863]: https://github.com/CMSgov/eAPD/issues/2863
[#3128]: https://github.com/CMSgov/eAPD/issues/3128
[#3188]: https://github.com/CMSgov/eAPD/issues/3188
[#3226]: https://github.com/CMSgov/eAPD/issues/3226
[#3246]: https://github.com/CMSgov/eAPD/issues/3246
[#3164]: https://github.com/CMSgov/eAPD/issues/3164
[#3176]: https://github.com/CMSgov/eAPD/issues/3176
[#3264]: https://github.com/CMSgov/eAPD/issues/3264
[#3277]: https://github.com/CMSgov/eAPD/issues/3277
[#3282]: https://github.com/CMSgov/eAPD/issues/3282
