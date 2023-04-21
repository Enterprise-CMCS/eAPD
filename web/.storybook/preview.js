import '../src/styles/index.scss';

// eslint-disable-next-line import/no-extraneous-dependencies
import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};
