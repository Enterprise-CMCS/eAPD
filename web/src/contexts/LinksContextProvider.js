import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { t } from '../i18n';

const { Provider, Consumer } = React.createContext();

class LinksContextProvider extends Component {
  getPreviousNextLinks = (links, activeId) => {
    // first look for active link among the top level links
    let currentIndex = links.findIndex(o => o.id === activeId);
    let currentItemIndex = -1;
    let currentSubItemIndex = -1;

    // if we're not at a top-level index, see if we're at a first-tier item
    // identify index and item index
    if (currentIndex < 0) {
      currentIndex = links.findIndex(
        o => Array.isArray(o.items) && o.items.some(i => i.id === activeId)
      );
      if (currentIndex >= 0) {
        currentItemIndex = links[currentIndex].items.findIndex(
          i => i.id === activeId
        );
        currentSubItemIndex = -1;
      }
    }

    // if top level and second level don't match, check sub items
    // identify index, item index, and sub item index
    if (currentIndex < 0) {
      ({
        currentIndex,
        currentItemIndex,
        currentSubItemIndex
      } = this.getCurrentSubItemIndices(links, activeId));
    }

    // default case -- if we can't find an active link, use the first one
    if (currentIndex < 0) {
      currentIndex = 0;
      currentItemIndex = -1;
      currentSubItemIndex = -1;
    }

    // now get the next and previous links, along with booleans about whether to hide the link (for first and last page)
    const {
      link: previousLink,
      hideLink: hidePreviousLink
    } = this.getPreviousLink(
      links,
      currentIndex,
      currentItemIndex,
      currentSubItemIndex
    );
    const { link: nextLink, hideLink: hideNextLink } = this.getNextLink(
      links,
      currentIndex,
      currentItemIndex,
      currentSubItemIndex
    );

    return {
      previousLink,
      hidePreviousLink,
      nextLink,
      hideNextLink
    };
  };

  // deep dive to find a sub-item index that matches the active ID,
  // bringing back the associated top-level and item - level indices too
  getCurrentSubItemIndices = (links, activeId) => {
    // go through every top-level link
    const linkCount = links.length;
    for (let topLevelIndex = 0; topLevelIndex < linkCount; topLevelIndex += 1) {
      const topItem = links[topLevelIndex];
      // check for items
      if (Array.isArray(topItem.items) && topItem.items != null) {
        const itemCount = topItem.items.length;
        // go through every item link
        for (
          let itemLevelIndex = 0;
          itemLevelIndex < itemCount;
          itemLevelIndex += 1
        ) {
          // check for sub-items
          if (
            Array.isArray(topItem.items[itemLevelIndex].items) &&
            topItem.items[itemLevelIndex].items != null
          ) {
            const subItemCount = topItem.items[itemLevelIndex].items.length;
            // go through every sub-item
            for (
              let subItemIndex = 0;
              subItemIndex < subItemCount;
              subItemIndex += 1
            ) {
              // check for a match at the sub-item level
              if (
                topItem.items[itemLevelIndex].items[subItemIndex].id ===
                activeId
              ) {
                return {
                  currentIndex: topLevelIndex,
                  currentItemIndex: itemLevelIndex,
                  currentSubItemIndex: subItemIndex
                };
              }
            }
          }
        }
      }
    }
    // if none of the sub-items match, return failure condition
    return {
      currentIndex: -1,
      currentItemIndex: -1,
      currentSubItemIndex: -1
    };
  };

  getPreviousLink = (
    links,
    currentIndex,
    currentItemIndex,
    currentSubItemIndex
  ) => {
    // check deepest level first -- go to previous sub item
    if (currentSubItemIndex > 0) {
      return {
        link: this.prependActivityLabel(
          links[currentIndex].items[currentItemIndex].items[
            currentSubItemIndex - 1
          ],
          currentItemIndex
        ),
        hideLink: false
      };
    }

    // we're at the first sub item, go back up a level
    if (currentSubItemIndex === 0 && currentItemIndex > 0) {
      return {
        link: links[currentIndex].items[currentItemIndex - 1],
        hideLink: false
      };
    }

    // previous top level link (do this whether we're at the item level or top-level link, since the items are on the same page)
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    return {
      link: links[previousIndex],
      hideLink: currentIndex === previousIndex
    };
  };

  getNextLink = (
    links,
    currentIndex,
    currentItemIndex,
    currentSubItemIndex
  ) => {
    // check deepest levels first -- next sub item
    if (currentSubItemIndex >= 0) {
      const subItemCount =
        links[currentIndex].items[currentItemIndex].items.length;
      if (currentSubItemIndex < subItemCount - 1) {
        return {
          link: this.prependActivityLabel(
            links[currentIndex].items[currentItemIndex].items[
              currentSubItemIndex + 1
            ],
            currentItemIndex
          ),
          hideLink: false
        };
      }
      // we hit the last sub-item, so go up a level and get the next one
      const itemCount = links[currentIndex].items.length;
      if (currentItemIndex < itemCount - 1) {
        return {
          link: links[currentIndex].items[currentItemIndex + 1],
          hideLink: false
        };
      }
      // we hit the last item, jump up a level and get the next top-level link
      const linkCount = links.length;
      if (currentIndex < linkCount - 1) {
        return { link: links[currentIndex + 1], hideLink: false };
      }
      return { link: links[linkCount - 1], hideLink: true };
    }

    // next top level link (do this whether we're at the item level or top-level link, since the items are on the same page)
    const nextIndex =
      currentIndex < links.length - 1 ? currentIndex + 1 : currentIndex;
    return { link: links[nextIndex], hideLink: nextIndex === currentIndex };
  };

  prependActivityLabel = (link, activity) => {
    const newLabel = `Activity ${activity}: ${link.label}`;
    return { ...link, label: newLabel };
  };

  getTheLinks = (pageNav, anchorNav, activeSection, activities) => {
    // Note: children is the list of potential child links of a top-level nav item; items is the list of child links to actually display
    const links = [
      {
        id: 'apd-state-profile',
        label: t('apd.stateProfile.title'),
        onClick: pageNav('apd-state-profile-office', 'state-profile'),
        items: [
          {
            id: 'apd-state-profile-office',
            label: t('apd.stateProfile.directorAndAddress.title')
          },
          {
            id: 'apd-state-profile-key-personnel',
            label: t('apd.stateProfile.keyPersonnel.title')
          }
        ]
      },
      {
        id: 'apd-summary',
        label: t('apd.title'),
        onClick: pageNav('apd-summary', 'program-summary')
      },
      {
        id: 'previous-activities',
        label: t('previousActivities.title'),
        onClick: pageNav('prev-activities-outline', 'previous-activities'),
        items: [
          {
            id: 'prev-activities-outline',
            label: t('previousActivities.outline.title')
          },
          {
            id: 'prev-activities-table',
            label: t('previousActivities.actualExpenses.title')
          }
        ]
      },
      {
        id: 'activities',
        label: t('activities.title'),
        onClick: pageNav('activities-list', 'activities'),
        items: [
          {
            id: 'activities-list',
            label: t('activities.list.title'),
            onClick: pageNav('activities-list', 'activities'),
            url: `activities`
          }
        ]
      },
      {
        id: 'schedule-summary',
        label: t('scheduleSummary.title'),
        onClick: pageNav('schedule-summary', 'schedule-summary')
      },
      {
        id: 'proposed-budget',
        label: t('proposedBudget.title'),
        onClick: pageNav('budget-summary-table', 'proposed-budget'),
        items: [
          {
            id: 'budget-summary-table',
            label: t('proposedBudget.summaryBudget.title')
          },
          {
            id: 'budget-federal-by-quarter',
            label: t('proposedBudget.quarterlyBudget.title')
          },
          {
            id: 'budget-incentive-by-quarter',
            label: t('proposedBudget.paymentsByFFYQuarter.title')
          }
        ]
      },
      {
        id: 'assurances-compliance',
        label: t('assurancesAndCompliance.title'),
        onClick: pageNav('assurances-compliance', 'assurances-and-compliance')
      },
      {
        id: 'executive-summary',
        label: t('executiveSummary.title'),
        onClick: pageNav('executive-summary-summary', 'executive-summary'),
        items: [
          {
            id: 'executive-summary-summary',
            label: t('executiveSummary.summary.title')
          },
          {
            id: 'executive-summary-budget-table',
            label: t('executiveSummary.budgetTable.title')
          }
        ]
      },
      {
        id: 'export',
        label: t('exportAndSubmit.title'),
        onClick: pageNav('export', 'export')
      }
    ];

    links.forEach(topLevel => {
      // Gather up a list of all the nav item IDs that belong to this top-level
      // item. We'll use that list to determine if this item should show as being
      // selected, which would mean we need to show its child elements.
      const ids = [topLevel.id];
      if (topLevel.items) {
        ids.push(...topLevel.items.map(child => child.id));

        if (topLevel.id === 'activities') {
          ids.push(...activities.map(({ key }) => `activity-${key}`));
          activities.forEach(({ key }) =>
            ids.push(
              `activity-${key}-overview`,
              `activity-${key}-okrs`,
              `activity-${key}-state-costs`,
              `activity-${key}-contractor-costs`,
              `activity-${key}-cost-allocation`,
              `activity-${key}-ffp`
            )
          );
        }
      }

      const selected = ids.indexOf(activeSection) >= 0;
      topLevel.defaultCollapsed = true;

      if (selected) {
        // expand selected section
        topLevel.defaultCollapsed = false;

        // Selected nav items should not have a URL; otherwise, they get
        // rendered twice - once in this nav item and once as the first child.
        topLevel.url = undefined;

        // If this item is defined as having sub-items, turn those into
        // sidebar items.
        if (topLevel.items) {
          topLevel.items = topLevel.items.map(item => ({
            onClick: anchorNav(item.id),
            url: `#${item.id}`,
            ...item
          }));

          // If we're on the activities sidebar item, we should also push a list
          // of activities into its items.
          if (topLevel.id === 'activities') {
            topLevel.items.push(
              ...activities.map(({ key, name }, i) => {
                // But what if the selected item is an activity? Or within one?!
                // Well let's check for that too, okay?
                const activitySelected =
                  activeSection.substr(0, 17) === `activity-${key}`;

                return {
                  id: `activity-${key}`,
                  // Remove the url property if this activity is selected. Same
                  // reason as above: otherwise it'll show up twice.
                  url: activitySelected ? null : `activity/${i}`,
                  label: t(
                    `sidebar.titles.activity-${name ? 'set' : 'unset'}`,
                    {
                      number: i + 1,
                      name
                    }
                  ),
                  onClick: pageNav(`activity-${key}-overview`, `activity/${i}`),

                  // For the selected activity, also show the activity sections.
                  items: activitySelected
                    ? [
                        {
                          id: `activity-${key}-overview`,
                          label: 'Activity overview',
                          url: `activity/${i}/overview`,
                          onClick: pageNav(
                            `activity-${key}-overview`,
                            `activity/${i}/overview`
                          )
                        },
                        {
                          id: `activity-${key}-okrs`,
                          label: 'Objectives and key results',
                          url: `activity/${i}/okrs`,
                          onClick: pageNav(
                            `activity-${key}-okrs`,
                            `activity/${i}/okrs`
                          )
                        },
                        {
                          id: `activity-${key}-state-costs`,
                          label: 'State cost categories',
                          url: `activity/${i}/state-costs`,
                          onClick: pageNav(
                            `activity-${key}-state-costs`,
                            `activity/${i}/state-costs`
                          )
                        },
                        {
                          id: `activity-${key}-contractor-costs`,
                          label: 'Private contractor costs',
                          url: `activity/${i}/contractor-costs`,
                          onClick: pageNav(
                            `activity-${key}-contractor-costs`,
                            `activity/${i}/contractor-costs`
                          )
                        },
                        {
                          id: `activity-${key}-cost-allocation`,
                          label: 'Cost allocation',
                          url: `activity/${i}/cost-allocation`,
                          onClick: pageNav(
                            `activity-${key}-cost-allocation`,
                            `activity/${i}/cost-allocation`
                          )
                        },
                        {
                          id: `activity-${key}-ffp`,
                          label: 'FFP and budget',
                          url: `activity/${i}/ffp`,
                          onClick: pageNav(
                            `activity-${key}-ffp`,
                            `activity/${i}/ffp`
                          )
                        }
                      ]
                    : null
                };
              })
            );
          }
        }
      } else {
        topLevel.url = '#';
      }
    });
    return links;
  };

  render() {
    const { children } = this.props;
    return (
      <Provider
        value={{
          getLinks: this.getTheLinks,
          getPreviousNextLinks: this.getPreviousNextLinks
        }}
      >
        {children}
      </Provider>
    );
  }
}

LinksContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { LinksContextProvider, Consumer as LinksContextConsumer };
