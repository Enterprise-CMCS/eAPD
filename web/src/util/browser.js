/* eslint-disable import/prefer-default-export */

import is from 'is_js';

export const isBrowserOutdated = () => (is.safari() || is.ie());