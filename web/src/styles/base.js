import { injectGlobal } from 'styled-components';

// Base elemental resets / styles
// (Please keep additions to a minimum)

const sansSerif =
  "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, sans-serif";

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${sansSerif};
    font-size: 100%;
    line-height: 1.5;
    margin: 0;
  }

  img {
    max-width: 100%;
  }

  svg {
    max-height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${sansSerif};
    font-weight: bold;
    line-height: 1.25;
    margin-top: 1em;
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  h4 {
    font-size: 1rem;
  }

  h5 {
    font-size: 0.875rem;
  }

  h6 {
    font-size: 0.75rem;
  }

  p,
  dl,
  ol,
  ul {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  input,
  select,
  textarea,
  fieldset {
    font-family: inherit;
    font-size: 1rem;
    box-sizing: border-box;
    margin-top: 0;
    margin-bottom: 0;
  }

  textarea {
    line-height: 1.75;
    resize: vertical;
  }

  button {
    cursor: pointer;
  }
`;
