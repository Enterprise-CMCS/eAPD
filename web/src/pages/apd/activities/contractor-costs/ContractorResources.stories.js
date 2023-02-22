import React from 'react';
import ContractorResources from './ContractorResources';
import { withDesign } from 'storybook-addon-designs';
import { renderWithProvider } from 'apd-storybook-library';

export default {
  title: 'Pages/Apd/Activities/Contractor Costs/ContractorResources (Redux)',
  component: ContractorResources,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['ContractorResources.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  args: {
    activityIndex: 0
  }
};

const Template = args => <ContractorResources {...args} />;

export const NoContractorStory = Template.bind({});
NoContractorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/6eVvo7JjvXiovGTR4BoVgK/CMS-eAPD-2022?node-id=3023%3A0'
  }
};
NoContractorStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: 'HITECH',
            activities: [
              {
                contractorResources: []
              }
            ],
            years: ['2022', '2023']
          }
        }
      },
      story
    })
];

export const SingleContractorStory = Template.bind({});
SingleContractorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/6eVvo7JjvXiovGTR4BoVgK/CMS-eAPD-2022?node-id=3024%3A24376'
  }
};
SingleContractorStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: 'HITECH',
            activities: [
              {
                contractorResources: [
                  {
                    description: 'Maintain SLR',
                    end: null,
                    hourly: {
                      2022: {
                        hours: null,
                        rate: null
                      },
                      2023: {
                        hours: null,
                        rate: null
                      }
                    },
                    useHourly: false,
                    name: 'Super SLR Incorporated',
                    start: null,
                    totalCost: 32423,
                    years: {
                      2022: 999756,
                      2023: 342444
                    },
                    key: '6a651f1c'
                  }
                ]
              }
            ],
            years: ['2022', '2023']
          }
        }
      },
      story
    })
];

export const MultipleContractorsStory = Template.bind({});
MultipleContractorsStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/6eVvo7JjvXiovGTR4BoVgK/CMS-eAPD-2022?node-id=3030%3A4'
  }
};
MultipleContractorsStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: 'HITECH',
            activities: [
              {
                contractorResources: [
                  {
                    description: 'Maintain SLR',
                    end: null,
                    hourly: {
                      2022: {
                        hours: null,
                        rate: null
                      },
                      2023: {
                        hours: null,
                        rate: null
                      }
                    },
                    useHourly: false,
                    name: 'Super SLR Incorporated',
                    start: null,
                    totalCost: 32423,
                    years: {
                      2022: 999756,
                      2023: 342444
                    },
                    key: '6a651f1c'
                  },
                  {
                    description: 'Technology consulting and planning services.',
                    end: null,
                    hourly: {
                      2022: {
                        hours: null,
                        rate: null
                      },
                      2023: {
                        hours: null,
                        rate: null
                      }
                    },
                    useHourly: false,
                    name: 'Tech Consulting Inc.',
                    start: null,
                    totalCost: 473573,
                    years: {
                      2022: 333000,
                      2023: 200000
                    },
                    key: 'd4688bc4'
                  }
                ]
              }
            ],
            years: ['2022', '2023']
          }
        }
      },
      story
    })
];
