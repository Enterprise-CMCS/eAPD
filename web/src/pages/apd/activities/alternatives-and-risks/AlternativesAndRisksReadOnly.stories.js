import React from 'react';
import AlternativesAndRisksReadOnly from './AlternativesAndRisksReadOnly';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Pages/Apd/Activities/Alternatives and Risks Read-Only',
  component: AlternativesAndRisksReadOnly,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['AlternativesAndRisksReadOnly.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  }
};

const Template = args => <AlternativesAndRisksReadOnly {...args} />;

export const DataAlternativesAndRisksReadOnlyStory = Template.bind({});
DataAlternativesAndRisksReadOnlyStory.args = {
  activityIndex: 0,
  activity: {
    name: 'Pharmacy Management',
    analysisOfAlternativesAndRisks: {
      alternativeAnalysis:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis. Turpis tincidunt id aliquet risus feugiat in ante metus dictum. Placerat in egestas erat imperdiet sed euismod nisi. At tempor commodo ullamcorper a lacus vestibulum sed arcu non. Duis convallis convallis tellus id interdum velit laoreet id donec. Est ullamcorper eget nulla facilisi etiam. Porta non pulvinar neque laoreet suspendisse. Donec et odio pellentesque diam volutpat commodo sed egestas. Sed nisi lacus sed viverra tellus in. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. In mollis nunc sed id semper risus in. Tincidunt arcu non sodales neque sodales ut etiam sit. Adipiscing enim eu turpis egestas pretium aenean. Commodo odio aenean sed adipiscing. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Dolor purus non enim praesent elementum. Porta nibh venenatis cras sed felis eget velit.</p>',
      costBenefitAnalysis:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis aenean et tortor at. Eget felis eget nunc lobortis mattis. Tortor at auctor urna nunc id. Id donec ultrices tincidunt arcu non sodales. Faucibus a pellentesque sit amet. Molestie at elementum eu facilisis. Feugiat sed lectus vestibulum mattis ullamcorper. Duis at tellus at urna. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim. Sit amet consectetur adipiscing elit. Ut morbi tincidunt augue interdum velit euismod in pellentesque. Urna cursus eget nunc scelerisque viverra mauris in aliquam. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Urna cursus eget nunc scelerisque viverra mauris in aliquam. Blandit massa enim nec dui nunc mattis enim.</p>',
      feasibilityStudy:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis nunc sed augue lacus viverra. A diam sollicitudin tempor id eu nisl nunc mi ipsum. Ultrices sagittis orci a scelerisque purus semper. Sit amet justo donec enim diam vulputate. Tristique nulla aliquet enim tortor at auctor urna. Ut eu sem integer vitae justo. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus. A iaculis at erat pellentesque adipiscing commodo. Lectus urna duis convallis convallis. Id diam maecenas ultricies mi eget mauris pharetra et ultrices. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Malesuada pellentesque elit eget gravida cum sociis natoque.</p>',
      requirementsAnalysis:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas pretium aenean pharetra magna ac placerat vestibulum. Natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Et netus et malesuada fames ac. Mauris commodo quis imperdiet massa tincidunt. Ullamcorper a lacus vestibulum sed arcu. Eget nullam non nisi est sit. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Nibh nisl condimentum id venenatis.</p>',
      forseeableRisks:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc. Semper auctor neque vitae tempus. Sed velit dignissim sodales ut eu sem. In hac habitasse platea dictumst. Purus in massa tempor nec feugiat nisl. Dictum sit amet justo donec. Et netus et malesuada fames. Gravida rutrum quisque non tellus. Massa id neque aliquam vestibulum morbi blandit. Maecenas ultricies mi eget mauris pharetra et ultrices neque. Ac auctor augue mauris augue neque gravida in fermentum. Donec ultrices tincidunt arcu non sodales neque sodales ut. Feugiat sed lectus vestibulum mattis ullamcorper. Tellus at urna condimentum mattis pellentesque id. Faucibus a pellentesque sit amet porttitor. Eu sem integer vitae justo eget magna fermentum iaculis. Interdum velit laoreet id donec ultrices tincidunt arcu non sodales.</p>'
    }
  }
};
DataAlternativesAndRisksReadOnlyStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=3605%3A19349&t=OOZ1DilB3Gqul26O-1'
  }
};
export const DefaultAlternativesAndRisksReadOnlyStory = Template.bind({});
DefaultAlternativesAndRisksReadOnlyStory.args = {
  activityIndex: 0,
  activity: {
    name: 'Pharmacy Management',
    analysisOfAlternativesAndRisks: {
      alternativeAnalysis: '',
      costBenefitAnalysis: '',
      feasibilityStudy: '',
      requirementsAnalysis: '',
      forseeableRisks: ''
    }
  }
};
DefaultAlternativesAndRisksReadOnlyStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=3605%3A19395&t=OOZ1DilB3Gqul26O-1'
  }
};
