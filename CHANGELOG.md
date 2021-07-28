# Next release

Anticipated release: July 26, 2021

#### 🚀 New features

- manage affiliations and choose state page now make live calls for the list of affiliations ([#3264])

#### 🐛 Bugs fixed

- "Add Activity" button in activity page links to wrong APD ([#3334])

#### ⚙️ Behind the scenes

- updated APD seed data used for testing ([#2863])
- created test tokens when database is seeded (development and test only) ([#3128])
- add tests for authentication ([#3188])
- install cypress for end-to-end testing ([#3226])
- Reduced the size of the JWT payload because sys admins had a 24KB payload and the max size is 4KB. ([#3246])
- fixed error for users with view-document permission not being able to load an APD([#3264])

# Previous releases

See our [release history](https://github.com/CMSgov/eAPD/releases)

[#2863]: https://github.com/CMSgov/eAPD/issues/2863
[#3128]: https://github.com/CMSgov/eAPD/issues/3128
[#3188]: https://github.com/CMSgov/eAPD/issues/3188
[#3226]: https://github.com/CMSgov/eAPD/issues/3226
[#3246]: https://github.com/CMSgov/eAPD/issues/3246
[#3264]: https://github.com/CMSgov/eAPD/issues/3264
[#3334]: https://github.com/CMSgov/eAPD/issues/3334
