# Next release

Anticipated release: January 8, 2021

#### 🚀 New features

- Adds State Admin panel ([#2583])
- Update endpoint for affiliations to filter by status ([#2682])
- Updated roles and add roles endpoint ([#2692])
- Update session management to warn users that their session is about to expire ([#2702])
- Increases outcomes and metrics field size to be multiline (4) ([#2724])
- Resolve TinyMCE XSS vulnerabilities ([#2741])


#### 🐛 Bugs fixed

- fixed security headers
- displays images within the tinymce editor ([#2348])
- updates footer email address to correct one ([#2353])
- fixed session expiring warning bug ([#2720])

#### ⚙️ Behind the scenes

- patches tinymce XSS vulnerability; enables media plugin ([GHSA-vrv8-v4w8-f95h])
- upgrades `@okta/okta-sdk-nodejs`; resolves ([GHSA-w7rc-rwvf-8q5r])

# Previous releases

See our [release history](https://github.com/CMSgov/eAPD/releases)

[#2348]: https://github.com/CMSgov/eAPD/issues/2348
[#2353]: https://github.com/CMSgov/eAPD/issues/2353
[#2583]: https://github.com/CMSgov/eAPD/issues/2583
[#2682]: https://github.com/CMSgov/eAPD/issues/2682
[#2692]: https://github.com/CMSgov/eAPD/issues/2692
[#2702]: https://github.com/CMSgov/eAPD/issues/2702
[#2720]: https://github.com/CMSgov/eAPD/issues/2720
[#2724]: https://github.com/CMSgov/eAPD/issues/2724
[#2741]: https://github.com/CMSgov/eAPD/issues/2741
[#2353]: https://github.com/CMSgov/eAPD/issues/2353
[ghsa-vrv8-v4w8-f95h]: https://github.com/advisories/GHSA-vrv8-v4w8-f95h
[ghsa-w7rc-rwvf-8q5r]: https://github.com/advisories/GHSA-w7rc-rwvf-8q5r
