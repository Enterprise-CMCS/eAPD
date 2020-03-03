# Next release

Anticipated release: February 18, 2020

#### 🚀 New features

- Updates the cost allocation section to make it clearer how the various numbers are related to each other, and updates the help text describing "other funding." ([#1935], [#1992])
- The executive summary for activities now includes activity costs per federal fiscal year ([#1927])
- Activity state personnel now show calculated total cost instead of just rate and FTEs. ([#2013])
- Moves the activity FFP section into a separate tab ([#2010])

#### 🐛 Bugs fixed

- Fixed a bug where APD Key Personnel weren't being counted as state personnel for the Program Administration activity for some budget calculations. - ([#2037])
- Updated the text describing in-house cost categories to be more clear ([#1936])
- Fixed a bug where autosave happened too often, causing performance issues, and potentially inconsistent saved data.
- Fixed a bug where the FFY subtotal for each cost category in the quarterly FFP table was based on the percent of funding requested, meaning it could be different from the actual activity total if the user requests more or less than 100%. ([#2056])
- Fixed a bug that prevented creating new activities.
- Fixed a typo in the cost allocation instructions
- Updated the explanation for how the budget summary table is calculated ([#2058])

#### ⚙️ Behind the scenes

- Made the code for removing list items a bit simpler ([#2014])
- Change how uploaded files get IDs ([#2018])
- Cleaned up some inconsistencies in the way things were named internally ([#2044])
- Got rid of some old code that no longer made sense ([#2021])

# Previous releases

See our [release history](https://github.com/18F/cms-hitech-apd/releases)

[#1935]: https://github.com/18F/cms-hitech-apd/issues/1935
[#1992]: https://github.com/18F/cms-hitech-apd/issues/1992
[#1927]: https://github.com/18F/cms-hitech-apd/issues/1927
[#2037]: https://github.com/18F/cms-hitech-apd/issues/2037
[#1936]: https://github.com/18F/cms-hitech-apd/issues/1936
[#2013]: https://github.com/18F/cms-hitech-apd/issues/2013
[#2014]: https://github.com/18F/cms-hitech-apd/issues/2014
[#2018]: https://github.com/18F/cms-hitech-apd/issues/2018
[#2010]: https://github.com/18F/cms-hitech-apd/issues/2010
[#2044]: https://github.com/18F/cms-hitech-apd/issues/2044
[#2056]: https://github.com/18F/cms-hitech-apd/issues/2056
[#2021]: https://github.com/18F/cms-hitech-apd/issues/2021
[#2036]: https://github.com/18F/cms-hitech-apd/issues/2036
[#2058]: https://github.com/18F/cms-hitech-apd/issues/2058
