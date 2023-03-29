import React from 'react';
import ExportReadOnly from './ExportReadOnly';
import { renderWithProvider } from 'apd-storybook-library';
import { APD_TYPE } from '@cms-eapd/common';

export default {
  title: 'Pages/Apd/Print/Export Read Only (Redux)',
  component: ExportReadOnly,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['ExportReadOnly.test.js']
  }
};

const Template = args => <ExportReadOnly {...args} />;

export const HitechExportReadOnlyStory = Template.bind({});
HitechExportReadOnlyStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.HITECH
          }
        }
      },
      story
    })
];

export const MmisExportReadOnlyStory = Template.bind({});
MmisExportReadOnlyStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS
          }
        }
      },
      story
    })
];
