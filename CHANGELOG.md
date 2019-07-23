# Next release

Anticipated release: TBD

#### 🚀 New features

- Attempt to alert users before automatically logging them out due to inactivity. The app will try to use built-in browser notifications as well as flashing the tab title. In browsers that support it, the app treats activity in any eAPD tab as valid, so all eAPD tabs will remain valid as long as at least one of them is getting activity. ([#1697])

#### 🐛 Bugs fixed

- Prompt for confirmation before deleting APD key personnel ([#1651], [#1647])
- Fixed accessibility issues on the login page and the dashboard ([#1688])
- Fixed semantic heading levels ([#1695])
- Fixed a keyboard focus order problem when adding new items to a list ([#1712])
- Fixed a keyboard focus order problem with the system use banner ([#1715])
- Removed the emoji button from the rich text editor ([#1649])

#### ⚙️ Behind the scenes

- Remove unused code
- Updated 3rd-party dependencies

# v1.0.1

Released: July 19, 2019

#### 🐛 Bugs fixed

- Added lightweight, simplistic date validation to indicate when years, months, or exact dates are invalid to help understand why a save may have failed. Placeholder until more thorough data validation is implemented. ([#1713])

# v1.0.0

Released: July 9, 2019

Pilot release to select state partners

[#1647]: https://github.com/18F/cms-hitech-apd/pull/1647
[#1649]: https://github.com/18F/cms-hitech-apd/issues/1649
[#1651]: https://github.com/18F/cms-hitech-apd/pull/1651
[#1688]: https://github.com/18F/cms-hitech-apd/pull/1688
[#1695]: https://github.com/18F/cms-hitech-apd/pull/1695
[#1697]: https://github.com/18F/cms-hitech-apd/pull/1697
[#1712]: https://github.com/18F/cms-hitech-apd/pull/1712
[#1713]: https://github.com/18F/cms-hitech-apd/pull/1713
[#1715]: https://github.com/18F/cms-hitech-apd/pull/1715
