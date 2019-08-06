# Next release

Anticipated release: TBD

#### 🚀 New features

- Attempt to alert users before automatically logging them out due to inactivity. The app will try to use built-in browser notifications as well as flashing the tab title. In browsers that support it, the app treats activity in any eAPD tab as valid, so all eAPD tabs will remain valid as long as at least one of them is getting activity. ([#1697])
- Automatically select numeric form field contents when the field is focused if the current value is 0 ([#1736])

#### 🐛 Bugs fixed

- Prompt for confirmation before deleting APD key personnel ([#1651], [#1647])
- Fixed accessibility issues on the login page and the dashboard ([#1688])
- Fixed semantic heading levels ([#1695])
- Fixed a keyboard focus order problem when adding new items to a list ([#1712])
- Fixed a keyboard focus order problem with the system use banner ([#1715])
- Switched remaining text inputs (except for rich text) to Design System components and removed custom components ([#1686])
- For users in American Samoa, Guam, Northern Mariana Islands, or U.S. Virgin Islands, do not attempt to display a territory outline at the top of the sidebar because we don't have those outlines ([#1423]; see [#1730] for more information)
- Fixed a bug where adding a new contractor resource didn't expand the contractor form ([#1710])
- Make the navigation sidebar scrollable. ([#1475])
- Fixed the width on activity overview detail and statement of alternatives textbox labels ([#1640])
- Made the "manage account" and "login" text the same size in the header dropdown ([#1655], [#1680])
- Removed the emoji button from the rich text editor ([#1649])
- Adds spacing around the Medicaid director and Medicaid office address form headers ([#1646])
- Adds margin to the bottom of the state dashboard ([#1601])
- Adds an ARIA region component to prevent screen readers from prematurely announcing quarterly budget numbers ([#1731])
- Fixed alignment of the message if there are no APDs on the state dashboard ([#1602])
- Adds spacing between the login form and the "forgotten password" help link ([#1600])

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

[#1423]: https://github.com/18F/cms-hitech-apd/issues/1423
[#1475]: https://github.com/18F/cms-hitech-apd/issues/1475
[#1600]: https://github.com/18F/cms-hitech-apd/issues/1600
[#1601]: https://github.com/18F/cms-hitech-apd/pull/1601
[#1602]: https://github.com/18F/cms-hitech-apd/pull/1602
[#1640]: https://github.com/18F/cms-hitech-apd/issues/1640
[#1646]: https://github.com/18F/cms-hitech-apd/pull/1646
[#1647]: https://github.com/18F/cms-hitech-apd/pull/1647
[#1649]: https://github.com/18F/cms-hitech-apd/issues/1649
[#1651]: https://github.com/18F/cms-hitech-apd/pull/1651
[#1655]: https://github.com/18F/cms-hitech-apd/issues/1655
[#1680]: https://github.com/18F/cms-hitech-apd/issues/1680
[#1686]: https://github.com/18F/cms-hitech-apd/issues/1686
[#1688]: https://github.com/18F/cms-hitech-apd/pull/1688
[#1695]: https://github.com/18F/cms-hitech-apd/pull/1695
[#1697]: https://github.com/18F/cms-hitech-apd/pull/1697
[#1710]: https://github.com/18F/cms-hitech-apd/pull/1710
[#1712]: https://github.com/18F/cms-hitech-apd/pull/1712
[#1713]: https://github.com/18F/cms-hitech-apd/pull/1713
[#1715]: https://github.com/18F/cms-hitech-apd/pull/1715
[#1730]: https://github.com/18F/cms-hitech-apd/pull/1730
[#1736]: https://github.com/18F/cms-hitech-apd/issues/1736
