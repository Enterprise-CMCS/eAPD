import React, { Component } from "react";
import { t } from '../i18n';

const { Provider, Consumer } = React.createContext();

class LinksContextProvider extends Component {

  getCurrentLinkIds = (links, activeId) => {
    // first look for active link among the top level links
    let activeIndex = links.findIndex(o => o.id === activeId);
    let activeChildIndex = 0;

    // if it's not a top level link, look in the children
    if (activeIndex < 0) {
      activeIndex = links.findIndex(o => o.hasOwnProperty('children') ? o.children.findIndex(c => c.id === activeId) >= 0 : false);
      if (activeIndex >= 0){
        activeChildIndex = links[activeIndex].children.findIndex(c => c.id === activeId);
      }
    }

    // if we can't find an active link, assume it's the first one
    if (activeIndex < 0) {
      activeIndex = 0;
      activeChildIndex = 0;
    }
    return [activeIndex, activeChildIndex];    
  }

  getPreviousLink = (links, activeId) => {
    const [activeIndex, activeChildIndex] = this.getCurrentLinkIds(links, activeId);

    // calculate the previous indeces
    const previousIndex = activeIndex > 0 ? activeIndex - 1 : activeIndex;
    
    // now get the previous link
    return links[previousIndex];
  }

  getNextLink = (links, activeId) => {
    const [activeIndex, activeChildIndex] = this.getCurrentLinkIds(links, activeId);

    // calculate the next indeces
    const nextIndex = activeIndex < links.length - 1 ? activeIndex + 1 : activeIndex;
    
    // now get the next link
     return links[nextIndex];
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
      return <Provider
          value={{ getLinks: this.getTheLinks, getPreviousLink: this.getPreviousLink, getNextLink: this.getNextLink }}
      >{this.props.children}</Provider>;
  }
}

export { LinksContextProvider, Consumer as LinksContextConsumer };
