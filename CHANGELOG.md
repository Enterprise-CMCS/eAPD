# Next release

Anticipated release: January 20, 2021

#### 🚀 New features

- Adds confirmation dialog before unchecking FFY year([#2445])
- Update endpoint for affiliations to filter by status ([#2682])
- Adds State Admin panel ([#2583])
- Updated roles and add roles endpoint ([#2692])
- Update session management to warn users that their session is about to expire ([#2702])
- Updates logos in footer ([#2716])
- Increases outcomes and metrics field size to be multiline (4) ([#2724])
- Restrict file uploads ([#2740])
- Resolve TinyMCE XSS vulnerabilities ([#2741])
- Update form field labels for the Activity Private Contractor Costs form ([#2742])

#### 🐛 Bugs fixed

- fixed security headers
- displays images within the tinymce editor ([#2348])
- updates footer email address to correct one ([#2353])
- fixed Estimated Quarterly Expenditure table is overwriting across Activities ([#2421])
- fixed issue with Back to APD link not displaying ([#2712])
- fixes issue where removing a FFY from program summary wouldn't remove it from the read-only view ([#2715])
- fixed session expiring warning bug ([#2720])

#### ⚙️ Behind the scenes

- patches tinymce XSS vulnerability; enables media plugin ([GHSA-vrv8-v4w8-f95h])
- upgrades `@okta/okta-sdk-nodejs`; resolves ([GHSA-w7rc-rwvf-8q5r])

# Previous releases

See our [release history](https://github.com/CMSgov/eAPD/releases)

[#2348]: https://github.com/CMSgov/eAPD/issues/2348
[#2353]: https://github.com/CMSgov/eAPD/issues/2353
[#2421]: https://github.com/CMSgov/eAPD/issues/2421
[#2445]: https://github.com/CMSgov/eAPD/issues/2445
[#2583]: https://github.com/CMSgov/eAPD/issues/2583
[#2682]: https://github.com/CMSgov/eAPD/issues/2682
[#2692]: https://github.com/CMSgov/eAPD/issues/2692
[#2702]: https://github.com/CMSgov/eAPD/issues/2702
[#2712]: https://github.com/CMSgov/eAPD/issues/2712
[#2715]: https://github.com/CMSgov/eAPD/issues/2715
[#2716]: https://github.com/CMSgov/eAPD/issues/2716
[#2720]: https://github.com/CMSgov/eAPD/issues/2720
[#2724]: https://github.com/CMSgov/eAPD/issues/2724
[#2740]: https://github.com/CMSgov/eAPD/issues/2740
[#2741]: https://github.com/CMSgov/eAPD/issues/2741
[#2742]: https://github.com/CMSgov/eAPD/issues/2742
[ghsa-vrv8-v4w8-f95h]: https://github.com/advisories/GHSA-vrv8-v4w8-f95h
[ghsa-w7rc-rwvf-8q5r]: https://github.com/advisories/GHSA-w7rc-rwvf-8q5r
