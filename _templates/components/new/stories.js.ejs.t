---
to: "web/src/<%= componentType %>/<%= componentPath ? `${componentPath}/` : ''%><%= componentName %>.stories.js"
---

import React from 'react';
import <%= componentName %> from './<%= componentName %>';

export default {
    title: '<%= h.capitalize(componentType) %>/<%= componentPath ? `${componentPath.split('/').map(name => h.capitalize(name)).join('/')}/` : "" %><%= componentName %>',
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