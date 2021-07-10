# Next release

Anticipated release: July 9, 2021

#### 🚀 New features

- Update the delete process for FFY ([#2996])
- updated Assurance and Compliance text on APD review and export screen to show more detailed information. ([#3169]))

#### 🐛 Bugs fixed

- Images don't load unless you refresh page after logging in ([#3180])
- Removes "Federal" as an option for State Medicaid address ([#3181])
- Revoking a user's access is causing them to disappear and not show in the Inactive tab ([#3238])

#### ⚙️ Behind the scenes

- Created endpoint to allow a user to switch states ([#3030])
- Added security check to state/:id endpoint so only users with access to that state can get the data ([#3129])

# Previous releases

See our [release history](https://github.com/CMSgov/eAPD/releases)

[#2996]: https://github.com/CMSgov/eAPD/issues/2996
[#3030]: https://github.com/CMSgov/eAPD/issues/3030
[#3180]: https://github.com/CMSgov/eAPD/issues/3180
[#3181]: https://github.com/CMSgov/eAPD/issues/3181
[#3169]: https://github.com/CMSgov/eAPD/issues/3169
[#3238]: https://github.com/CMSgov/eAPD/issues/3238
