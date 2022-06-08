---
to: web/src/<%= componentPath %>/<%= componentName %>.stories.js
---

import React from 'react';
import <%= componentName %> from './<%= componentName %>';

export default {
    title: '<%= componentPath.split('/').map(name => h.changeCase.title(name)).join('/') %>/<%= componentName %>',
    component: <%= componentName %>,
    includeStories: /.*Story$/,
    parameters: {
        jest: ['<%= componentName %>.test.js'],
        controls: {
            hideNoControlsWarning: true
        }
    }
};

const Template = args => <<%= componentName %> {...args} />;

export const DefaultStory = Template.bind({});