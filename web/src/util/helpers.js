/* eslint-disable import/prefer-default-export */

import kebabCase from 'lodash.kebabcase';

// Converts array of strings into array of objects ({ label, value })
// that is easily digestable by CheckboxGroup component
export const stringsToFormOptions = (strings, kebab = false) =>
  strings.map(label => ({
    label,
    value: kebab ? kebabCase(label) : label
  }));
