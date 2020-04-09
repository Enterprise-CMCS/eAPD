import PropTypes from 'prop-types';
import React, { Component } from "react";
import { t } from '../i18n';

const { Provider, Consumer } = React.createContext();

class LinksContextProvider extends Component {

  getPreviousNextLinks = (links, activeId) => {
    // first look for active link among the top level links
    let currentIndex = links.findIndex(o => o.id === activeId);
    let currentActivityIndex = -1;
    let currentActivityItemIndex = -1;

    // if it's not a top level link, look in the children
    if (currentIndex < 0) {
      currentIndex = links.findIndex(o => Object.prototype.hasOwnProperty.call(o, 'children') && o.children != null ? o.children.findIndex(c => c.id === activeId) >= 0 : false);
    }

    // if it's not in the children, check the activities
    if (currentIndex < 0) {
      currentIndex = links.findIndex(o => Object.prototype.hasOwnProperty.call(o, 'items') && o.items != null ? o.items.findIndex(i => i.id === activeId) >= 0 : false);
      if (currentIndex >= 0){
        currentActivityIndex = links[currentIndex].items.findIndex(i => i.id === activeId);
        currentActivityItemIndex = -1;
        }
    }

    // if it's not in the activities, check the activity items
    if (currentIndex < 0) {
      [currentIndex, currentActivityIndex, currentActivityItemIndex] = this.getCurrentActivtyItem(links, activeId);
    }
    
    // if we can't find an active link, use the first one
    if (currentIndex < 0) {
      currentIndex = 0;
      currentActivityIndex = -1;
      currentActivityItemIndex = -1;
      }

    const [previousLink, hidePreviousLink] = this.getPreviousLink(links, currentIndex, currentActivityIndex, currentActivityItemIndex);
    const [nextLink,  hideNextLink] = this.getNextLink(links, currentIndex, currentActivityIndex, currentActivityItemIndex);

    return [previousLink, hidePreviousLink, nextLink, hideNextLink];
  }

  getCurrentActivtyItem = (links, activeId) => {
    const linkCount = links.length;
    for(let i = 0 ; i < linkCount; i+=1) {
      if (Object.prototype.hasOwnProperty.call(links[i], 'items') && links[i].items != null) {
        const activityCount = links[i].items.length;
        for(let j = 0; j < activityCount; j+=1) {
          if (Object.prototype.hasOwnProperty.call(links[i].items[j], 'items') && links[i].items[j].items != null) {
            const itemCount = links[i].items[j].items.length;
            for(let k = 0; k < itemCount; k+=1) {
              if (links[i].items[j].items[k].id === activeId) {
                return [i, j, k];
              }
            }  
          }
        }
      }
    }
    return [-1, -1, -1];
  }

  getPreviousLink = (links, currentIndex, currentActivityIndex, currentActivityItemIndex) => {
    // previous activity item
    if (currentActivityItemIndex > 0) {
      return [links[currentIndex].items[currentActivityIndex].items[currentActivityItemIndex - 1], false];
    }

    // previous activity
    if (currentActivityItemIndex === 0 && currentActivityIndex > 0) {
      return [links[currentIndex].items[currentActivityIndex - 1], false];
    }

    // previous top level link
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    return [links[previousIndex], currentIndex === previousIndex];
  }

  getNextLink = (links, currentIndex, currentActivityIndex, currentActivityItemIndex) => {
    // next activity item
    if (currentActivityItemIndex >= 0) {
      const itemCount = links[currentIndex].items[currentActivityIndex].items.length;
      if (currentActivityItemIndex < itemCount - 1) {
        return [links[currentIndex].items[currentActivityIndex].items[currentActivityItemIndex + 1], false];
      }
      const activityCount = links[currentIndex].items.length;
      if (currentActivityIndex < activityCount - 1) {
        return [links[currentIndex].items[currentActivityIndex + 1], false];
      }
      const linkCount = links.length;
      if (currentIndex < linkCount - 1) {
        return [links[currentIndex + 1], false];
      }
      return [links[linkCount - 1], true];
    }

    // next activity
    if (currentActivityIndex >= 0) {
      const activityCount = links[currentIndex].items.length;
      if (currentActivityIndex < activityCount - 1) {
        return [links[currentIndex].items[currentActivityIndex + 1], false];
      }
      const linkCount = links.length;
      if (currentIndex < linkCount - 1) {
        return [links[currentIndex + 1], false];
      }
      return [links[linkCount - 1], true];
    }

    // special case - after activities-list, go down into activities sub-pages
    if ((links[currentIndex].id === 'activities-list' || links[currentIndex].id === 'activities') && links[currentIndex].items != null && links[currentIndex].items[1] != null) {
      return[links[currentIndex].items[1], false];
    }

    // next top level link
    const nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : currentIndex;
    return [links[nextIndex], nextIndex === currentIndex];
  }

  getTheLinks = (pageNav, anchorNav, activeSection, activities) => {
    const links = [
      {
        id: 'apd-state-profile',
        label: t('apd.stateProfile.title'),
        onClick: pageNav('apd-state-profile-office', 'state-profile'),
        children: [
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
        children: [
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
        children: [
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
        children: [
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
        children: [
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
      if (topLevel.children) {
        ids.push(...topLevel.children.map(child => child.id));
  
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
  
      if (selected) {
        // Selected nav items should not have a URL; otherwise, they get
        // rendered twice - once in this nav item and once as the first child.
        topLevel.url = undefined;
  
        // If this item is defined as having children, turn those into
        // sidebar items.
        if (topLevel.children) {
          topLevel.items = topLevel.children.map(child => ({
            onClick: anchorNav(child.id),
            url: `#${child.id}`,
            ...child
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
                  label: t(`sidebar.titles.activity-${name ? 'set' : 'unset'}`, {
                    number: i + 1,
                    name
                  }),
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
    const {children} = this.props;
    return <Provider
        value={{ getLinks: this.getTheLinks, getPreviousNextLinks: this.getPreviousNextLinks }}
    >{children}</Provider>;
  }
}

LinksContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { LinksContextProvider, Consumer as LinksContextConsumer };
