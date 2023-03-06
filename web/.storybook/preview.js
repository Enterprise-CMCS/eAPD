import '../src/styles/index.scss';

// eslint-disable-next-line import/no-extraneous-dependencies
import { addDecorator, addParameters } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import { DocsPage, DocsContainer } from '@storybook/addon-docs';
import { decorators } from 'storybook-addon-launchdarkly/dist';

import results from '../.jest-test-results.json';

addDecorator(
  withTests({
    results
  }),
  decorators
);

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};
