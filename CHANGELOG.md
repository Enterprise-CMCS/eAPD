# Next release

Anticipated release: July 28, 2021

#### 🚀 New features

- manage affiliations and choose state page now make live calls for the list of affiliations ([#3264])
- Federal admin panel ([#2812])
- Update the roles returned by the roles endpoint ([#3277])
- added alerts to each section if no FFY has been selected ([#3202])

#### 🐛 Bugs fixed

- Activity Summary displaying incorrectly in Executive Summary ([#3338])
- "Add Activity" button in activity page links to wrong APD ([#3334])
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
- remove sys admins being returned in affiliations ([#3295])
- added end-to-end test for APD overview section ([#3282])
- added end-to-end tests for filling out key personnel page ([#3284])
- added end-to-end tests for previous activities page ([#3312])

# Previous releases

See our [release history](https://github.com/CMSgov/eAPD/releases)

[#2812]: https://github.com/CMSgov/eAPD/issues/2812
[#3283]: https://github.com/CMSgov/eAPD/issues/3283
[#2863]: https://github.com/CMSgov/eAPD/issues/2863
[#3128]: https://github.com/CMSgov/eAPD/issues/3128
[#3188]: https://github.com/CMSgov/eAPD/issues/3188
[#3226]: https://github.com/CMSgov/eAPD/issues/3226
[#3246]: https://github.com/CMSgov/eAPD/issues/3246
[#3202]: https://github.com/CMSgov/eAPD/issues/3202
[#3164]: https://github.com/CMSgov/eAPD/issues/3164
[#3176]: https://github.com/CMSgov/eAPD/issues/3176
[#3264]: https://github.com/CMSgov/eAPD/issues/3264
[#3295]: https://github.com/CMSgov/eAPD/issues/3295
[#3334]: https://github.com/CMSgov/eAPD/issues/3334
[#3338]: https://github.com/CMSgov/eAPD/issues/3338
[#3277]: https://github.com/CMSgov/eAPD/issues/3277
[#3282]: https://github.com/CMSgov/eAPD/issues/3282
[#3284]: https://github.com/CMSgov/eAPD/issues/3284
[#3312]: https://github.com/CMSgov/eAPD/issues/3312
