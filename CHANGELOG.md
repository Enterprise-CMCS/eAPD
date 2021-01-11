# Next release

Anticipated release: January XX, 2021

#### 🚀 New features

- Update endpoint for affiliations to filter by status ([#2682])
- Adds State Admin panel ([#2583])
- Updated roles and add roles endpoint ([#2692])
- Update session management to warn users that their session is about to expire ([#2702])

#### 🐛 Bugs fixed

- fixed security headers
- displays images within the tinymce editor ([#2348])
- fixed session expiring warning bug ([#2720])
- fixed Estimated Quarterly Expenditure table is overwriting across Activities ([#2421])
- updates footer email address to correct one ([#2353])

#### ⚙️ Behind the scenes

- patches tinymce XSS vulnerability; enables media plugin ([GHSA-vrv8-v4w8-f95h])
- upgrades `@okta/okta-sdk-nodejs`; resolves ([GHSA-w7rc-rwvf-8q5r])

# Previous releases

See our [release history](https://github.com/CMSgov/eAPD/releases)

[#2348]: https://github.com/CMSgov/eAPD/issues/2348
[#2682]: https://github.com/CMSgov/eAPD/issues/2682
[#2583]: https://github.com/CMSgov/eAPD/issues/2583
[#2692]: https://github.com/CMSgov/eAPD/issues/2692
[#2702]: https://github.com/CMSgov/eAPD/issues/2702
[#2720]: https://github.com/CMSgov/eAPD/issues/2720
[#2421]: https://github.com/CMSgov/eAPD/issues/2720
[#2353]: https://github.com/CMSgov/eAPD/issues/2353
[ghsa-vrv8-v4w8-f95h]: https://github.com/advisories/GHSA-vrv8-v4w8-f95h
[ghsa-w7rc-rwvf-8q5r]: https://github.com/advisories/GHSA-w7rc-rwvf-8q5r
