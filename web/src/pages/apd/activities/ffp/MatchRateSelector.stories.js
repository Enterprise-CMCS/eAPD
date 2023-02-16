import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import MatchRateSelector from './MatchRateSelector';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';
import { FUNDING_CATEGORY_TYPE } from '@cms-eapd/common';

export default {
  title: 'Pages/Apd/Activities/FFP/Match Rate Selector',
  component: MatchRateSelector,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  args: {}
};

const Template = args => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <MatchRateSelector {...args} />
    </FormProvider>
  );
};

export const DefaultMatchRateSelectorStory = Template.bind({});
DefaultMatchRateSelectorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=601%3A12578&t=3yR9pRvsMuvneKFi-1'
  }
};
DefaultMatchRateSelectorStory.args = {
  ffp: {
    federal: 0,
    state: 100
  },
  setFederalStateSplit: action('setFederalStateSplit')
};

export const Fed90State10SelectorStory = Template.bind({});
Fed90State10SelectorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A18041&t=i3lIkizqZLNdTnKe-1'
  }
};
Fed90State10SelectorStory.args = {
  ffp: {
    federal: 90,
    state: 10
  },
  setFederalStateSplit: action('setFederalStateSplit')
};

export const Fed75State25SelectorStory = Template.bind({});
Fed75State25SelectorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A17681&t=i3lIkizqZLNdTnKe-1'
  }
};
Fed75State25SelectorStory.args = {
  ffp: {
    federal: 75,
    state: 25
  },
  setFederalStateSplit: action('setFederalStateSplit')
};

export const Fed75State25DdiSelectorStory = Template.bind({});
Fed75State25DdiSelectorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A17681&t=i3lIkizqZLNdTnKe-1'
  }
};
Fed75State25DdiSelectorStory.args = {
  ffp: {
    federal: 75,
    state: 25,
    fundingCategory: FUNDING_CATEGORY_TYPE.DDI
  },
  setFederalStateSplit: action('setFederalStateSplit')
};

export const Fed75State25MoSelectorStory = Template.bind({});
Fed75State25MoSelectorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A17681&t=i3lIkizqZLNdTnKe-1'
  }
};
Fed75State25MoSelectorStory.args = {
  ffp: {
    federal: 75,
    state: 25,
    fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
  },
  setFederalStateSplit: action('setFederalStateSplit')
};

export const Fed50State50SelectorStory = Template.bind({});
Fed50State50SelectorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A18378&t=i3lIkizqZLNdTnKe-4'
  }
};
Fed50State50SelectorStory.args = {
  ffp: {
    federal: 50,
    state: 50
  },
  setFederalStateSplit: action('setFederalStateSplit')
};

export const Fed50State50DdiSelectorStory = Template.bind({});
Fed50State50DdiSelectorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A18378&t=i3lIkizqZLNdTnKe-4'
  }
};
Fed50State50DdiSelectorStory.args = {
  ffp: {
    federal: 50,
    state: 50,
    fundingCategory: FUNDING_CATEGORY_TYPE.DDI
  },
  setFederalStateSplit: action('setFederalStateSplit')
};

export const Fed50State50MoSelectorStory = Template.bind({});
Fed50State50MoSelectorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A18378&t=i3lIkizqZLNdTnKe-4'
  }
};
Fed50State50MoSelectorStory.args = {
  ffp: {
    federal: 50,
    state: 50,
    fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
  },
  setFederalStateSplit: action('setFederalStateSplit')
};
