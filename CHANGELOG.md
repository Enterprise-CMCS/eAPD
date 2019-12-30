# Next release

Anticipated release: January 6, 2019

#### 🚀 New features

#### 🐛 Bugs fixed

- Fixed a bug where the login and admin screens could have a white box at the bottom in tall browser windows ([#1766])

#### ⚙️ Behind the scenes

# 2.2.0

Released: December 18, 2019

#### 🚀 New features

- Make disabled button state more explicit ([#1957])
- Upload files from the rich text editor instead of embedding them directly into the text ([#1735])
- Made the rich text areas resize to fit their contents
- Automatically save APDs as changes are made
- Removed the 11 Standards and Conditions text fields in favor of two simpler fields ([#1947])

#### 🐛 Bugs fixed

- Fixed an issue with the sidebar scrolling into the footer ([#1967])

#### ⚙️ Behind the scenes

- Added OWASP ZAP active security scan in continuous integration and deployment ([#1928])

# 2.1.0

Released: December 3, 2019

#### 🚀 New features

- Added a print preview page ([#1921])
- Display a loading screen while waiting for the APD to load so users can tell the app is doing something. ([#1368])

#### 🐛 Bugs fixed

- Fixed a bug where contractor hourly rates were not used in budget calculations ([#1925])
- Switches to a new rich text editor that is better supported ([#1871])

#### ⚙️ Behind the scenes

- Removed unused code ([#1801], [#1802], [#1803])

# 2.0.1

Released: November 18, 2019

#### 🐛 Bugs fixed

- Updated dependencies with known vulnerabilities

# 2.0.0

Released: November 18, 2019

#### 🚀 New features

- Alert users on yellow support browsers that they should upgrade ([#1904])
- Don't try to load the page on unsupported browsers ([#1882])

#### 🐛 Bugs fixed

- Fixed an issue where the label for the state name dropdown in the State Profile section was not correctly associated ([#1779])
- Fixed an issue where some table header cells were empty ([#1780])
- Fixed an issue where the account management and logout links in the header were unresponsive from the APD page ([#1914])

#### ⚙️ Behind the scenes

- Switched from a relational data model for APDs to a document-oriented model ([#1793], [#1794], [#1796], [#1798], [#1800], [#1826])
- Removed unused code ([#1799])

# v1.1.0

Released: September 27, 2019

#### 🚀 New features

- Attempt to alert users before automatically logging them out due to inactivity. The app will try to use built-in browser notifications as well as flashing the tab title. In browsers that support it, the app treats activity in any eAPD tab as valid, so all eAPD tabs will remain valid as long as at least one of them is getting activity. ([#1697])
- Scroll the collapsed activity review panel into view after collapsing an activity form. This way, when you collapse an activity, you end up essentially looking at the list of activities again instead of being pushed way down the page. ([#1732])
- Automatically select numeric form field contents when the field is focused if the current value is 0 ([#1736])
- Add spellcheck to rich text fields ([#1769])

#### 🐛 Bugs fixed

- Add a "skip to main content" link ([#1304])
- Prompt for confirmation before deleting APD key personnel ([#1651], [#1647])
- Fixed accessibility issues on the login page and the dashboard ([#1688])
- Fixed semantic heading levels ([#1695])
- Fixed a keyboard focus order problem when adding new items to a list ([#1712])
- Fixed a keyboard focus order problem with the system use banner ([#1715])
- Fixed the save button so it doesn't go into the footer ([#1524])
- Switched remaining text inputs (except for rich text) to Design System components and removed custom components ([#1686])
- For users in American Samoa, Guam, Northern Mariana Islands, or U.S. Virgin Islands, do not attempt to display a territory outline at the top of the sidebar because we don't have those outlines ([#1423]; see [#1730] for more information)
- Fixed a bug where adding a new contractor resource didn't expand the contractor form ([#1710])
- Make the navigation sidebar scrollable. ([#1475])
- Fixed the width on activity overview detail and statement of alternatives textbox labels ([#1640])
- Made the "manage account" and "login" text the same size in the header dropdown ([#1655], [#1680])
- Removed the emoji button from the rich text editor ([#1649])
- Extend user sessions on API activity ([#1728])
- Adds spacing around the Medicaid director and Medicaid office address form headers ([#1646])
- Adds margin to the bottom of the state dashboard ([#1601])
- Adds an ARIA region component to prevent screen readers from prematurely announcing quarterly budget numbers ([#1731])
- Fixed alignment of the message if there are no APDs on the state dashboard ([#1602])
- Adds spacing between the login form and the "forgotten password" help link ([#1600])
- Adds per-year APD key personnel costs to the review view ([#1747])
- Adds a more informative error message if attempting to save an APD while logged out ([#1729])
- Use a dollar field for the "other funding" field in the cost allocation form ([#1754])
- Fixes a screen reader bug by adding a wrapper around the CMS Design System's Choice component ([#1760])
- Round off dollar input fields when they lose focus ([#1739])
- Fixed a bug where multiline plain text fields (such as the activity overview) gets exported as a text field, and the content is truncated within it. ([#1767])
- Fixed a bug where the session authentication cookie would expire at the end of the browser session instead of at the scheduled time. ([#1756])
- Fixed the spacing in the activity overview section. ([#1648])
- Disabled cacheing of the index page, so that clients always get the latest. ([#1775])
- Fixed a bug where the APD Key Personnel section asked for a person's percent time using a plain number input box instead of a percent box ([#1753])
- Improved ARIA metadata on the account management dropdown button for screen readers ([#1681])
- Fixed a bug where the sidebar would change width during scrolling in IE. ([#1434])
- Changed the APD title to include the full year range instead of just the start year ([#1820])

#### ⚙️ Behind the scenes

- Removed old styles ([#1770])
- Remove unused code
- Updated 3rd-party dependencies
- Refactored the activity quarterly cost allocation tables ([#1574])

# v1.0.3

Released: August 14, 2019

#### 🐛 Bugs fixed

- Fixes a bug where adding a federal fiscal year to the APD causes the app to crash when users attempt to edit existing activity contractor resources. ([#1762])
- Fixes a bug where entering a date and then backing it out would make it impossible to save the APD. ([#1765])
- Fixes a bug where adding a federal fiscal year to the APD while an activity contractor resource form was expanded would cause the app to crash.

# v1.0.2

Released: August 2, 2019

#### 🐛 Bugs fixed

- Fixes a bug where the summary budget table individual line items would show $0 if any single activity's total cost was $0. ([#1745])

# v1.0.1

Released: July 19, 2019

#### 🐛 Bugs fixed

- Added lightweight, simplistic date validation to indicate when years, months, or exact dates are invalid to help understand why a save may have failed. Placeholder until more thorough data validation is implemented. ([#1713])

# v1.0.0

Released: July 9, 2019

Pilot release to select state partners

[#1304]: https://github.com/18F/cms-hitech-apd/issues/1304
[#1368]: https://github.com/18F/cms-hitech-apd/issues/1368
[#1423]: https://github.com/18F/cms-hitech-apd/issues/1423
[#1434]: https://github.com/18F/cms-hitech-apd/issues/1434
[#1475]: https://github.com/18F/cms-hitech-apd/issues/1475
[#1524]: https://github.com/18F/cms-hitech-apd/issues/1524
[#1574]: https://github.com/18F/cms-hitech-apd/issues/1574
[#1600]: https://github.com/18F/cms-hitech-apd/issues/1600
[#1601]: https://github.com/18F/cms-hitech-apd/pull/1601
[#1602]: https://github.com/18F/cms-hitech-apd/pull/1602
[#1640]: https://github.com/18F/cms-hitech-apd/issues/1640
[#1646]: https://github.com/18F/cms-hitech-apd/pull/1646
[#1647]: https://github.com/18F/cms-hitech-apd/pull/1647
[#1648]: https://github.com/18F/cms-hitech-apd/issues/1648
[#1649]: https://github.com/18F/cms-hitech-apd/issues/1649
[#1651]: https://github.com/18F/cms-hitech-apd/pull/1651
[#1655]: https://github.com/18F/cms-hitech-apd/issues/1655
[#1680]: https://github.com/18F/cms-hitech-apd/issues/1680
[#1681]: https://github.com/18F/cms-hitech-apd/issues/1681
[#1686]: https://github.com/18F/cms-hitech-apd/issues/1686
[#1688]: https://github.com/18F/cms-hitech-apd/pull/1688
[#1695]: https://github.com/18F/cms-hitech-apd/pull/1695
[#1697]: https://github.com/18F/cms-hitech-apd/pull/1697
[#1710]: https://github.com/18F/cms-hitech-apd/pull/1710
[#1712]: https://github.com/18F/cms-hitech-apd/pull/1712
[#1713]: https://github.com/18F/cms-hitech-apd/pull/1713
[#1715]: https://github.com/18F/cms-hitech-apd/pull/1715
[#1728]: https://github.com/18F/cms-hitech-apd/issues/1728
[#1730]: https://github.com/18F/cms-hitech-apd/pull/1730
[#1729]: https://github.com/18F/cms-hitech-apd/issues/1729
[#1732]: https://github.com/18F/cms-hitech-apd/issues/1732
[#1735]: https://github.com/18F/cms-hitech-apd/issues/1735
[#1736]: https://github.com/18F/cms-hitech-apd/issues/1736
[#1739]: https://github.com/18F/cms-hitech-apd/issues/1739
[#1745]: https://github.com/18F/cms-hitech-apd/pull/1745
[#1747]: https://github.com/18F/cms-hitech-apd/issues/1747
[#1753]: https://github.com/18F/cms-hitech-apd/issues/1753
[#1754]: https://github.com/18F/cms-hitech-apd/issues/1754
[#1756]: https://github.com/18F/cms-hitech-apd/issues/1756
[#1762]: https://github.com/18F/cms-hitech-apd/issues/1762
[#1765]: https://github.com/18F/cms-hitech-apd/issues/1765
[#1766]: https://github.com/18F/cms-hitech-apd/issues/1766
[#1767]: https://github.com/18F/cms-hitech-apd/issues/1767
[#1769]: https://github.com/18F/cms-hitech-apd/issues/1769
[#1770]: https://github.com/18F/cms-hitech-apd/pull/1770
[#1775]: https://github.com/18F/cms-hitech-apd/issues/1775
[#1779]: https://github.com/18F/cms-hitech-apd/issues/1779
[#1780]: https://github.com/18F/cms-hitech-apd/issues/1780
[#1793]: https://github.com/18F/cms-hitech-apd/issues/1793
[#1794]: https://github.com/18F/cms-hitech-apd/issues/1794
[#1796]: https://github.com/18F/cms-hitech-apd/issues/1796
[#1798]: https://github.com/18F/cms-hitech-apd/issues/1798
[#1799]: https://github.com/18F/cms-hitech-apd/issues/1799
[#1800]: https://github.com/18F/cms-hitech-apd/issues/1800
[#1801]: https://github.com/18F/cms-hitech-apd/issues/1801
[#1802]: https://github.com/18F/cms-hitech-apd/issues/1802
[#1803]: https://github.com/18F/cms-hitech-apd/issues/1803
[#1820]: https://github.com/18F/cms-hitech-apd/issues/1820
[#1826]: https://github.com/18F/cms-hitech-apd/issues/1826
[#1871]: https://github.com/18F/cms-hitech-apd/issues/1871
[#1882]: https://github.com/18F/cms-hitech-apd/issues/1882
[#1904]: https://github.com/18F/cms-hitech-apd/pull/1904
[#1921]: https://github.com/18F/cms-hitech-apd/pull/1921
[#1914]: https://github.com/18F/cms-hitech-apd/issues/1914
[#1925]: https://github.com/18F/cms-hitech-apd/issues/1925
[#1928]: https://github.com/18F/cms-hitech-apd/issues/1928
[#1947]: https://github.com/18F/cms-hitech-apd/issues/1947
[#1957]: https://github.com/18F/cms-hitech-apd/pull/1957
[#1967]: https://github.com/18F/cms-hitech-apd/pull/1967
