import React from 'react';
import ActivitySummaryReadOnly from './ActivitySummaryReadOnly';
import { render, screen } from 'apd-testing-library';
import { APD_TYPE } from '@cms-eapd/common';

const defaultProps = {
  activityIndex: 0,
  years: ['2023', '2024']
};

const setup = async (props = {}) =>
  render(<ActivitySummaryReadOnly {...defaultProps} {...props} />);

/* eslint-disable testing-library/no-node-access */
describe('the ActivitySummaryReadOnly component', () => {
  it('displays a HITECH APD Activity Summary correctly', async () => {
    const activity = {
      activityOverview: {
        summary:
          '1 Continued Operations of the Medicaid EHR Incentive Payment Program, includes modifications to the SLR, HIT staff, auditing, outreach, and non-personnel expenses for administering the program.',
        description:
          '<p><strong><ins>III.A.1: Modifications to the State Level Repository</ins></strong></p>\n<p>Tycho Medicaid is seeking funding to design, develop, and implement modifications to the existing State Level Repository (SLR) for continued administration of the EHR Incentive Program. The modifications of the SLR for CMS program rule changes and guidance changes (Stage 3, IPPS, and OPPS) will require extensive development and implementation efforts and is essential to the effective administration of the Medicaid EHR Incentive Program. Modifications to the SLR are done in phases depending on how CMS rule changes occur. The implementation of the design elements will require provider onboarding activities to be initiated and completed including outreach and training for all program participants. The SLR will increase the efficiency with which Tycho Medicaid administers the program; allow for increased oversight and assure that the program is operated in accordance with the complex and evolving program rules and requirements.</p>\n<p>&nbsp;</p>\n<p>Additionally, Tycho Medicaid is seeking funding to complete a security risk assessment for the State Level Repository to ensure the SLR meets the required system security standards for HIPAA, MARSe, NIST and other state and federal security requirements for information technology.</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.B.1 Administrative and Technical Support Consulting</ins></strong></p>\n<p>The DHSS is requesting funding to support activities under the Medicaid EHR Incentive Payment Program to provide technical assistance for statewide activities and implementations. Activities of this initiative will include support of the activities included in this IAPDU, SMPHU development, eCQM implementation, project management services, and assistance with the public health expansion modernization initiative.</p>',
        alternatives:
          '<p>Modifications to State Level Registry (SLR)</p>\n<ul>\n<li>Minimize Modifications</li>\n<li>Minimize cost</li>\n<li>Decreased implementation time.</li>\n</ul>\n<p>The 2015-2017 rule changes are significant and wide ranging; minimally accommodating the new attestations will be problematic for the remainder of the program. Program benefits will potentially not be maximized. To be prepared for Stage 3 and to properly implement all 2015-2017 rule changes; Tycho plans to implement all necessary modifications.</p>\n<ul>\n<li>Modifications to State Level Registry (SLR)</li>\n<li>Implement the changes as outlined</li>\n<li>The EHR Incentive Program will have the ability to be fully supported.</li>\n<li>Support of electronic submission of CQMs, enhancing the support of the emphasis on interoperability.</li>\n</ul>\n<p>There are no significant disadvantages to this option.</p>\n<p>&nbsp;</p>\n<p>Implementing the changes as outlined provide the optimal opportunity to maximize the benefits of the EHR program and its impact on the delivery of health care with improved quality and outcomes.</p>',
        standardsAndConditions: {
          doesNotSupport: '',
          supports:
            '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
        }
      },
      fundingSource: 'HIT',
      name: 'Program Administration',
      activitySchedule: {
        plannedStartDate: '2017-10-01T00:00:00.000Z',
        plannedEndDate: '2023-09-30T00:00:00.000Z'
      }
    };
    await setup({
      apdType: APD_TYPE.HITECH,
      activity
    });

    expect(screen.getByText(/Start date/i).closest('p')).toHaveTextContent(
      /Start date: 10\/1\/2017/
    );
    expect(screen.getByText(/End date/i).closest('p')).toHaveTextContent(
      /End date: 9\/30\/2023/
    );
  });

  it('displays an empty HITECH APD Activity Summary correctly', async () => {
    await setup({
      apdType: APD_TYPE.HITECH,
      activity: {
        activityOverview: {
          summary: '',
          description: '',
          alternatives: '',
          standardsAndConditions: {
            doesNotSupport: '',
            supports: ''
          }
        },
        fundingSource: '',
        name: '',
        activitySchedule: {
          plannedStartDate: '',
          plannedEndDate: ''
        }
      }
    });
    expect(
      screen.getByText(/Provide a short overview/i).closest('div')
    ).toHaveTextContent('No response was provided.');
    expect(screen.getByText(/Start date/i).closest('p')).toHaveTextContent(
      /Start date: Date not specified/
    );
    expect(screen.getByText(/End date/i).closest('p')).toHaveTextContent(
      /End date: Date not specified/
    );
    expect(
      screen.getByText(/Activity Overview/i).closest('div')
    ).toHaveTextContent('No response was provided.');
    expect(
      screen
        .getByText(/Statement of Alternative Considerations/i)
        .closest('div')
    ).toHaveTextContent('No response was provided.');
    expect(
      screen.getByText(/This activity supports/i).closest('div')
    ).toHaveTextContent(
      'No response was provided for how this activity will support the Medicaid standards and conditions.'
    );
    expect(
      screen.getByText(/This activity does not support/i).closest('div')
    ).toHaveTextContent(
      'No response was provided for how this activity will support the Medicaid standards and conditions.'
    );
  });

  it('displays a MMIS APD Activity Summary correctly', async () => {
    await setup({
      apdType: APD_TYPE.MMIS,
      activity: {
        activityOverview: {
          activitySnapshot:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
          problemStatement:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus sed viverra tellus in hac habitasse platea. Vulputate sapien nec sagittis aliquam malesuada bibendum. Iaculis urna id volutpat lacus laoreet. Urna duis convallis convallis tellus id interdum velit. Facilisi cras fermentum odio eu feugiat pretium. Sed enim ut sem viverra aliquet eget sit amet tellus. At ultrices mi tempus imperdiet nulla malesuada. Sit amet risus nullam eget felis eget nunc. Aliquam sem et tortor consequat id.</p><p>Accumsan tortor posuere ac ut consequat semper viverra nam. Lacus viverra vitae congue eu consequat. Nibh ipsum consequat nisl vel pretium lectus. At tellus at urna condimentum mattis. Diam vel quam elementum pulvinar. Fermentum iaculis eu non diam phasellus vestibulum. Leo a diam sollicitudin tempor id eu nisl nunc mi. Mauris pellentesque pulvinar pellentesque habitant. Id velit ut tortor pretium viverra suspendisse. Tellus integer feugiat scelerisque varius morbi enim. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Molestie nunc non blandit massa enim nec dui nunc mattis. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Ut consequat semper viverra nam libero. Eu volutpat odio facilisis mauris sit amet massa vitae. Feugiat nisl pretium fusce id velit. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Aenean sed adipiscing diam donec adipiscing tristique risus. Lorem ipsum dolor sit amet.</p>',
          proposedSolution:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue interdum velit euismod in pellentesque massa placerat duis. Sit amet nisl purus in mollis nunc sed. Fames ac turpis egestas sed. Leo in vitae turpis massa sed elementum. Leo duis ut diam quam nulla porttitor massa id. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Massa vitae tortor condimentum lacinia quis vel eros. Porttitor leo a diam sollicitudin tempor id. Quam id leo in vitae turpis massa.</p><p>Gravida quis blandit turpis cursus in hac habitasse platea. Facilisis gravida neque convallis a cras semper auctor. Blandit aliquam etiam erat velit scelerisque in. Urna id volutpat lacus laoreet non. Tempus iaculis urna id volutpat. Faucibus in ornare quam viverra orci sagittis eu. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Turpis egestas sed tempus urna et pharetra pharetra massa. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Egestas diam in arcu cursus euismod. Placerat orci nulla pellentesque dignissim enim sit amet. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Nulla facilisi morbi tempus iaculis urna id volutpat. Sapien et ligula ullamcorper malesuada. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Eu lobortis elementum nibh tellus molestie nunc non blandit.</p>'
        },
        name: 'Activity 1',
        activitySchedule: {
          plannedStartDate: '2017-10-01T00:00:00.000Z',
          plannedEndDate: '2023-09-30T00:00:00.000Z'
        },
        costAllocation: {
          2023: {
            ffp: {
              federal: 90,
              state: 10,
              fundingCategory: 'DDI'
            },
            other: 105000
          },
          2024: {
            ffp: {
              federal: 75,
              state: 25,
              fundingCategory: 'MO'
            },
            other: 0
          }
        }
      }
    });
    expect(screen.getByText(/Start date/i).closest('p')).toHaveTextContent(
      /Start date: 10\/1\/2017/
    );
    expect(screen.getByText(/End date/i).closest('p')).toHaveTextContent(
      /End date: 9\/30\/2023/
    );
    expect(
      screen.getByText(/Federal Fiscal Years/i).closest('p')
    ).toHaveTextContent('Federal Fiscal Years requested: FFY 2023, 2024');
    expect(screen.getByText(/FFY 2023:/i).closest('span')).toHaveTextContent(
      'FFY 2023: 90/10 Design, Development, and Installation (DDI)'
    );
    expect(screen.getByText(/FFY 2024:/i).closest('span')).toHaveTextContent(
      'FFY 2024: 75/25 Maintenance & Operations (M&O)'
    );
  });

  it('displays a MMIS APD Federal-State Split correctly', async () => {
    await setup({
      apdType: APD_TYPE.MMIS,
      activity: {
        activityOverview: {
          activitySnapshot:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
          problemStatement:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus sed viverra tellus in hac habitasse platea. Vulputate sapien nec sagittis aliquam malesuada bibendum. Iaculis urna id volutpat lacus laoreet. Urna duis convallis convallis tellus id interdum velit. Facilisi cras fermentum odio eu feugiat pretium. Sed enim ut sem viverra aliquet eget sit amet tellus. At ultrices mi tempus imperdiet nulla malesuada. Sit amet risus nullam eget felis eget nunc. Aliquam sem et tortor consequat id.</p><p>Accumsan tortor posuere ac ut consequat semper viverra nam. Lacus viverra vitae congue eu consequat. Nibh ipsum consequat nisl vel pretium lectus. At tellus at urna condimentum mattis. Diam vel quam elementum pulvinar. Fermentum iaculis eu non diam phasellus vestibulum. Leo a diam sollicitudin tempor id eu nisl nunc mi. Mauris pellentesque pulvinar pellentesque habitant. Id velit ut tortor pretium viverra suspendisse. Tellus integer feugiat scelerisque varius morbi enim. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Molestie nunc non blandit massa enim nec dui nunc mattis. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Ut consequat semper viverra nam libero. Eu volutpat odio facilisis mauris sit amet massa vitae. Feugiat nisl pretium fusce id velit. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Aenean sed adipiscing diam donec adipiscing tristique risus. Lorem ipsum dolor sit amet.</p>',
          proposedSolution:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue interdum velit euismod in pellentesque massa placerat duis. Sit amet nisl purus in mollis nunc sed. Fames ac turpis egestas sed. Leo in vitae turpis massa sed elementum. Leo duis ut diam quam nulla porttitor massa id. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Massa vitae tortor condimentum lacinia quis vel eros. Porttitor leo a diam sollicitudin tempor id. Quam id leo in vitae turpis massa.</p><p>Gravida quis blandit turpis cursus in hac habitasse platea. Facilisis gravida neque convallis a cras semper auctor. Blandit aliquam etiam erat velit scelerisque in. Urna id volutpat lacus laoreet non. Tempus iaculis urna id volutpat. Faucibus in ornare quam viverra orci sagittis eu. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Turpis egestas sed tempus urna et pharetra pharetra massa. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Egestas diam in arcu cursus euismod. Placerat orci nulla pellentesque dignissim enim sit amet. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Nulla facilisi morbi tempus iaculis urna id volutpat. Sapien et ligula ullamcorper malesuada. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Eu lobortis elementum nibh tellus molestie nunc non blandit.</p>'
        },
        name: 'Activity 1',
        activitySchedule: {
          plannedStartDate: '2017-10-01T00:00:00.000Z',
          plannedEndDate: '2023-09-30T00:00:00.000Z'
        },
        costAllocation: {
          2023: {
            ffp: {
              federal: 0,
              state: 0,
              fundingCategory: null
            },
            other: 105000
          },
          2024: {
            ffp: {
              federal: 75,
              state: 25,
              fundingCategory: 'MO'
            },
            other: 0
          }
        }
      }
    });
    expect(screen.getByText(/FFY 2023:/i).closest('span')).toHaveTextContent(
      'FFY 2023: No Federal-State Split was specified.'
    );
    expect(screen.getByText(/FFY 2024:/i).closest('span')).toHaveTextContent(
      'FFY 2024: 75/25 Maintenance & Operations (M&O)'
    );
  });

  it('displays an empty MMIS APD Activity Summary correctly', async () => {
    await setup({
      apdType: APD_TYPE.MMIS,
      activity: {
        activityOverview: {
          activitySnapshot: '',
          problemStatement: '',
          proposedSolution: ''
        },
        name: '',
        activitySchedule: {
          plannedStartDate: '',
          plannedEndDate: ''
        },
        costAllocation: {
          2023: {
            ffp: {
              federal: 0,
              state: 0,
              fundingCategory: null
            },
            other: 0
          },
          2024: {
            ffp: {
              federal: 0,
              state: 0,
              fundingCategory: null
            },
            other: 0
          }
        }
      }
    });
    expect(screen.getByText(/Start date/i).closest('p')).toHaveTextContent(
      /Start date: Date not specified/
    );
    expect(screen.getByText(/End date/i).closest('p')).toHaveTextContent(
      /End date: Date not specified/
    );
    expect(
      screen.getByText(/Federal Fiscal Years requested/i).closest('p')
    ).toHaveTextContent('Federal Fiscal Years requested: FFY 2023, 2024');
    expect(
      screen.getAllByText(/Federal-State Split/i)[0].closest('div')
    ).toHaveTextContent('No Federal-State Split was specified.');
    expect(
      screen.getByText(/Activity snapshot/i).closest('div')
    ).toHaveTextContent('No response was provided.');
    expect(
      screen.getByText(/Problem statement/i).closest('div')
    ).toHaveTextContent('No response was provided.');
    expect(
      screen.getByText(/Proposed solution/i).closest('div')
    ).toHaveTextContent('No response was provided.');
  });
});
